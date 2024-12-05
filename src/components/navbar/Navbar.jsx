import "./navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAllCoachs, searchCoachsByNom } from "../../redux/coach/coachSlice.js";

const Navbar = () => {
    const { current, role } = useSelector((state) => state.user);
    const {coachs}=useSelector((state)=>state.coach);
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const location = useLocation();
    const dispatch = useDispatch();

    // Fetch coaches based on route and search term
    useEffect(() => {
        if (location.pathname === "/client/dashboard/listeCoachs") {
            const fetchData = async () => {
                await dispatch(fetchAllCoachs());
            };
            fetchData();
        }
    }, [location.pathname, dispatch]);

    // Filter suggestions dynamically based on search term
    useEffect(() => {
        if (searchTerm.trim() && location.pathname === "/client/dashboard/listeCoachs") {
            // Dispatch the action to search coaches by name

            dispatch(searchCoachsByNom(searchTerm))
                .then(() => {
                    const filteredCoaches = coachs || []; // Ensure that response is correct
                    setSuggestions(filteredCoaches);
                    console.log("Suggestions:", filteredCoaches);
                    setShowDropdown(true);
                })
                .catch((error) => {
                    console.error("Error fetching coaches:", error);
                    setSuggestions([]);
                    setShowDropdown(false);
                });
        } else {
            setSuggestions([]);
            setShowDropdown(false);
        }
    }, [searchTerm, location.pathname, dispatch]);

    const handleSuggestionClick = (suggestion) => {
        setSearchTerm(suggestion.nom); // Assume `nom` is a property of coach
        setShowDropdown(false);
    };

    // Profile link based on role
    const getProfileLink = () => {
        switch (role) {
            case "COACH":
                return "/coach/dashboard/profile";
            case "CLIENT":
                return "/client/dashboard/profile";
            case "ADMIN":
                return "/admin/dashboard/";
            default:
                return "/";
        }
    };

    return (
        <div className="navbar">
            {/* Search Bar with Suggestions */}
                <input
                    type="text"
                    placeholder="Rechercher..."
                    className="search-bar nav-search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setShowDropdown(suggestions.length > 0)}
                />
                {showDropdown && (
                    <ul className="dropdown1">
                        {suggestions.map((suggestion) => (
                          <Link  to={"/coach/" + suggestion.id} style={{color:"orange",textDecoration:"none"}} key={suggestion.id} >
                            <li
                               // Assume each coach has a unique `id`
                                onClick={() => handleSuggestionClick(suggestion)}
                            >
                                {suggestion.nom} {suggestion.prenom}
                            </li>
                          </Link>

                        ))}

                    </ul>
                )}

            {/* Notification Icon */}
            <div className="notification-icon">
                <i className="fas fa-bell"></i>
            </div>

            {/* Settings Icon */}
            <div className="settings-icon">
                <i className="fas fa-cogs"></i>
            </div>

            {/* Profile Picture */}
            <Link to={getProfileLink()}>
                <img
                    src={`http://localhost:3000/${current.photo}`}
                    alt="Profil"
                    className="profile-picture"
                />
            </Link>
        </div>
    );
};

export default Navbar;
