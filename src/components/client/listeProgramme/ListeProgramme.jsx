import "./listeProgramme.css"
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";

const ListeProgramme = () => {
    const [programmes, setProgrammes] = useState([]);  // List of fetched programmes
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate=useNavigate();
    const { current } = useSelector((state) => state.user); // Get the current user

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await axios.get("http://localhost:3000/api/programme/getProgrammeByClient/" + current.id, { withCredentials: true });
            if (!res.data) {
                throw new Error("No data received from API");
            }
            setProgrammes(res.data);  // Set the programmes data
            setLoading(false);
        } catch (e) {
            console.log(e);
            setError(e.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();  // Fetch the data on component mount
    }, []);

    console.log(programmes);  // To check the fetched data in the console

    return (
        <div className="containerLP">
            <div className="header1">
                <h1>Mes programmes</h1>
            </div>
            <div className="coaches-list1">
                {loading ? (
                    <p>Loading...</p> // Display loading text while data is being fetched
                ) : error ? (
                    <p>Error: {error}</p> // Display error if fetching data fails
                ) : (
                    programmes.map((programme, index) => (
                        <div key={index} className="coach-card1" onClick={()=>{navigate("/client/dashboard/monprogramme/"+programme.id)}}>
                            <div className="image-container1">
                                {/* Assuming each programme has an 'image' URL */}
                                <img src={"http://localhost:3000/"+programme.exercicePrograme[0].exercice.image || "/assets/images/bgSignUP.jpg"} alt={programme.name} className="coach-picture1" />
                            </div>
                            <div className="coach-details">
                                <h2>{programme.nom}</h2> {/* Dynamic program name */}
                                <progress className="progress-bar1" value={programme.terminer} max={programme.exercicePrograme.length}></progress> {/* Dynamic progress */}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ListeProgramme;
