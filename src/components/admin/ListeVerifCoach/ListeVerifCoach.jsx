import "./listeVerifCoach.css";
import { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const ListeVerifCoach = () => {
    const [coachs, setCoachs] = useState([]); // Stores coach data
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state

    const navigate=useNavigate()
    // Fetch coach data from the API
    const fetchCoach = async () => {
        try {
            setLoading(true);
            const res = await axios.get(
                "http://localhost:3000/api/admin/getNotVerfiedCoaches",
                {
                    withCredentials: true,
                }
            );

            if (!res.data) {
                throw new Error("No data received from API");
            }

            setCoachs(res.data); // Set coach data
            setLoading(false);
        } catch (e) {
            setLoading(false);
            console.error(e);
            setError(e.message || "An error occurred while fetching data");
        }
    };

    // Handle accepting a coach
    const handleAccept = async (id) => {
        try {
            const res=await axios.patch("http://localhost:3000/api/admin/verifierCoach/"+id,{},{withCredentials:true});
            if (!res.data){
                throw new Error("No data received from API");
            }
           await fetchCoach();
        } catch (e) {
            console.error(e);
            alert("Failed to accept the coach");
        }
    };

    // Handle rejecting a coach
    const handleReject = async (id) => {
        try {
            const res=await axios.patch("http://localhost:3000/api/admin/rejectCoach/"+id,{},{withCredentials:true});
            if (!res.data){
                throw new Error("No data received from API");
            }
            await fetchCoach();
        } catch (e) {
            console.error(e);
            alert("Failed to reject the coach");
        }
    };

    // Fetch coach data when the component mounts
    useEffect(() => {
        fetchCoach();
    }, []);

    const handleNavigate=(id)=> {
        navigate("/coach/"+id)
    }

    return (
        <div className="container">
            {!coachs.length?<p className="noDataFound">No Coachs...</p>:loading ? (
                <p className="loader">Loading...</p>
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : (
                <div>
                    <div className="header">
                        <h1>Liste des demandes</h1>
                    </div>
                    <table className="profile-table">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Prénom</th>
                            <th>Nom</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {coachs.map((coach) => (
                            <tr  key={coach.id} onClick={()=>handleNavigate(coach.id)} style={{cursor:"pointer"}}>
                                <td>{coach.id}</td>
                                <td>{coach.nom}</td>
                                <td>{coach.prenom}</td>
                                <td>{coach.email}</td>
                                <td>
                                    <button
                                        className="accept-btn"

                                        onClick={() => handleAccept(coach.id)}
                                    >
                                        Accepter
                                    </button>

                                    <button
                                        className="reject-btn"
                                        onClick={() => handleReject(coach.id)}
                                    >
                                        Refuser
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ListeVerifCoach;
