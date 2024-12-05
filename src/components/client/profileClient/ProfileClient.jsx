import {useSelector} from "react-redux";
import "./profileClient.css"
import {Link, useParams} from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";

const ProfileClient = () => {
    const {current}=useSelector((state)=>state.user);

    return (
        <div className="container">
            <div className="header">
                <h1>Mon Profil</h1>
            </div>
            <div className="profile-example">
                <img src={`http://localhost:3000/${current.photo}`} alt="Photo de Profil" className="profile-picture-large"/>
                <div className="profile-details">
                    <h2>{current.nom} {current.prenom}</h2>
                    <table className="profile-table">
                        <tr>
                            <td><strong>Email :</strong></td>
                            <td>{current.email}</td>
                        </tr>

                        <tr>
                            <td><strong>Adresse :</strong></td>
                            <td>${current.client.adr}</td>
                        </tr>
                        <tr>
                            <td><strong>Poids :</strong></td>
                            <td>{current.client.pods} Kg</td>
                        </tr>
                        <tr>
                            <td><strong>Taille :</strong></td>
                            <td>{current.client.taille} m</td>
                        </tr>
                    </table>
                </div>
                <Link to="/client/dashboard/modifierClient">
                    <button className="edit-profile-btn">Modifier le Profil</button>
                </Link>
            </div>
        </div>
    );
};

export default ProfileClient;