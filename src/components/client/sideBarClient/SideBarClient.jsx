import "./sideBarClient.css"
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../../redux/user/userSlice.js";
const SideBarClient = () => {
    const {current}=useSelector(state => (state.user))
    console.log(current)
    const dispatch=useDispatch();
    const handleLogout = () => {
        dispatch(logout())
    }
    return (
        <div className="sidebar">
            <h2 className="menu-title">Fit2A2S</h2>
            <ul className="menu-links">
                <li><Link to="/client/dashboard/acceuille"><i className="fas fa-home"></i> Accueil</Link></li>
                <li><Link to="/client/dashboard/listeProgramme"><i className="fas fa-calendar"></i> Programme</Link></li>
                <li><Link to={`/client/dashboard/${current.client.coach?.userId!==null && current.client.status==="accepted"?"coach/"+current.client.coach.userId:"acceuille"}`}><i className="fas fa-dumbbell"></i> Coach personnelle</Link></li>
                <li><Link to="/client/dashboard/listeCoachs"><i className="fas fa-users"></i> Liste des Coachs</Link></li>
            </ul>
            <div className="logout-container" onClick={handleLogout}>
                <Link to="/intro" className="logout"><i className="fas fa-sign-out-alt"></i> Déconnexion</Link>
            </div>
        </div>
    )
        ;
};

export default SideBarClient;