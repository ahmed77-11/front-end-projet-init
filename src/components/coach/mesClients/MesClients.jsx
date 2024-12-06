import "./mesClient.css"
import  {useEffect, useState} from 'react';
import {ToastContainer} from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import {useNavigate} from "react-router-dom";

const MesClients = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate=useNavigate();

    const fetchClients = async () => {
        setLoading(true); // Start loading before the request
        try {
            const response = await axios.get("http://localhost:3000/api/user/coach/getClientAccepted", {
                withCredentials: true
            });
            if (response.data.length === 0) {
                setClients([]);
                setLoading(false);
                return;
            }
            setClients(response.data);
        } catch (error) {
            setError("An error occurred. Please try again later.");
            console.error(error);
        } finally {
            setLoading(false); // Stop loading after the request
        }
    };

    const handleNavigate = (clientId) => {
        // Redirect to client profile page, e.g., using React Router
        console.log(`Navigate to client profile with ID: ${clientId}`);
    };



    useEffect(() => {
        fetchClients();
    }, []);

    return (
        <div className="containerLC">
            <div className="header">
                <h1>Liste des Profils</h1>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : clients.length === 0 ? (
                <p>No clients found.</p>
            ) : (
                <table className="profile-table">
                    <thead>
                    <tr>
                        <th>nom</th>
                        <th>prenom</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {clients.map((request) => (
                        <tr
                            key={request.id}
                            onClick={() => handleNavigate(request.id)}
                            style={{cursor: "pointer"}}
                        >
                            <td>{request.nom}</td>
                            <td>{request.prenom}</td>
                            <td>{request.email}</td>
                            <td>{request.enabled ? "Active" : "Not Active"}</td>
                            <td>
                                <button
                                    className="accept-btn5"
                                    style={{background:"orange",color:"white"}}
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        navigate("/coach/dashboard/ajouterProgramme/"+request.id)// Prevents row click

                                    }}
                                >
                                    Add Programme
                                </button>

                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
            <ToastContainer/>
        </div>
    );
};

export default MesClients;
