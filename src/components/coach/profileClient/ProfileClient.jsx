import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./profileClient.css";

const ProfileClient = () => {
    const { clientId } = useParams();
    const [client, setClient] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchClient = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/api/user/client/getClientById/${clientId}`, {
                withCredentials: true,
            });
            if (!res.data) {
                throw new Error("No data received from API");
            }
            setClient(res.data);
            setLoading(false);
        } catch (e) {
            setError(e.message || "An error occurred while fetching data.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClient();
    }, []);

    return (
        <div className="container">
            {loading ? (
                <p className="loader">Loading...</p>
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : (
                <div>
                    <div className="header">
                        <h1>Client Profile</h1>
                    </div>
                    <div className="profile-example">
                        <img
                            src={`http://localhost:3000/${client.photo || "uploads/photo-du-profile.png"}`}
                            alt="Photo de Profil"
                            className="profile-picture-large"
                        />
                        <div className="profile-details">
                            <h2>
                                {client.nom} {client.prenom}
                            </h2>
                            <table className="profile-table">
                                <tbody>
                                <tr>
                                    <td><strong>Email :</strong></td>
                                    <td>{client.email}</td>
                                </tr>
                                <tr>
                                    <td><strong>Adresse :</strong></td>
                                    <td>{client.client?.adr || "Non spécifiée"}</td>
                                </tr>
                                <tr>
                                    <td><strong>Poids :</strong></td>
                                    <td>{client.client?.pods || "Non spécifié"} Kg</td>
                                </tr>
                                <tr>
                                    <td><strong>Taille :</strong></td>
                                    <td>{client.client?.taille || "Non spécifiée"} m</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        {/*<Link to="/client/dashboard/modifierClient">*/}
                        {/*    <button className="edit-profile-btn">Modifier le Profil</button>*/}
                        {/*</Link>*/}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileClient;
