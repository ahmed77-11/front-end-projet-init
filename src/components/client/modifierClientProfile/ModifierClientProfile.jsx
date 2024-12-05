import  { useRef } from "react";
import "./modifierClientProfile.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {updateClientData, updateClientDataFailure} from "../../../redux/user/userSlice.js";

const ModifierClientProfile = () => {
    const { current } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Refs for managing inputs
    const nameRef = useRef(null);
    const prenomRef = useRef(null);
    const emailRef = useRef(null);
    const addressRef = useRef(null);
    const poidsRef = useRef(null);
    const tailleRef = useRef(null);
    const photoRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Collect data from refs
        const formData = {
            nom: nameRef.current.value,
            prenom: prenomRef.current.value,
            email: emailRef.current.value,
            adr: addressRef.current.value,
            pods: poidsRef.current.value,
            taille: tailleRef.current.value,
            photo: photoRef.current.files[0],
        };

        try {
            await dispatch(updateClientData(formData, navigate));
        } catch (err) {
            console.error("Error updating client profile:", err);
            dispatch(updateClientDataFailure(err.message));
        }

        console.log("Form submitted:", formData);
    };

    return (
        <div className="container">
            <div className="header">
                <h1>Modifier Profil Client</h1>
            </div>
            <form className="profile-form" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="form-group">
                        <label htmlFor="name">Nom :</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            ref={nameRef}
                            defaultValue={current.nom}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="prenom">Prénom :</label>
                        <input
                            type="text"
                            id="prenom"
                            name="prenom"
                            ref={prenomRef}
                            defaultValue={current.prenom}
                            required
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="form-group">
                        <label htmlFor="email">Email :</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            ref={emailRef}
                            defaultValue={current.email}
                            required
                        />
                    </div>

                </div>

                <div className="form-group">
                    <label htmlFor="address">Adresse :</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        ref={addressRef}
                        defaultValue={current?.client.adr}
                    />
                </div>

                <div className="row-poids-taille">
                    <div className="form-group">
                        <label htmlFor="poids">Poids (kg) :</label>
                        <input
                            type="number"
                            id="poids"
                            name="poids"
                            ref={poidsRef}
                            defaultValue={current.client?.pods || ""}
                            placeholder="Poids en kg"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="taille">Taille (m) :</label>
                        <input
                            type="number"
                            id="taille"
                            name="taille"
                            ref={tailleRef}
                            defaultValue={current.client?.taille || ""}
                            placeholder="Taille en mètres"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="photo">Photo de Profil :</label>
                    <input
                        type="file"
                        id="photo"
                        name="photo"
                        ref={photoRef}
                    />
                </div>

                <button className="submit-btn" type="submit">
                    Modifier
                </button>
            </form>
        </div>
    );
};

export default ModifierClientProfile;
