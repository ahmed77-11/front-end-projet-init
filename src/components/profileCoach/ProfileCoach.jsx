import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HiCheckBadge } from "react-icons/hi2";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {toast,ToastContainer} from "react-toastify";
import {followCoach} from "../../redux/user/userSlice.js";
import log from "eslint-plugin-react/lib/util/log.js";

const ProfileCoach = () => {
    const { id } = useParams();
    const {current,role}=useSelector((state)=>state.user);
    const dispatch=useDispatch();


    const [coach, setCoach] = useState({
        nom: "",
        prenom: "",
        email: "",
        photo: "",
        coach: {
            id:-1,
            verified: "",
            description: "",
            diplome: "",
            cv: "",
        },
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const sendReqToCoach=async ()=>{
        await dispatch(followCoach(coach.coach.id));
        toast.warning("You Request sended Succesfully");
    }

    const fetchCoach = async () => {
        try {
            setLoading(true);
            const res = await axios.get(
                "http://localhost:3000/api/user/coach/getCoachById/" + id,
                { withCredentials: true }
            );
            if (!res.data) {
                throw new Error("No data received from API");
            }
            setCoach(res.data);
            setLoading(false);
        } catch (e) {
            console.error(e);
            setLoading(false);
            setError(e.message || "An error occurred while fetching data");
        }
    };
    useEffect(() => {
        fetchCoach();
    }, []);
    return (
        <div className="container">
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className="profile-content">
                    <div className="header">
                        <h1>Profil du Coach</h1>
                    </div>

                    <div className="coach-profile">
                        <img
                            src={`http://localhost:3000/${coach.photo}`} // Assuming the response might contain a photo URL
                            alt="Photo du Coach"
                            className="profile-picture-large"
                        />
                        <div className="coach-details">
                            <div className="coach-details1">
                                <h2>
                                    {coach.nom} {coach.prenom}
                                </h2>
                                {role === "CLIENT" && coach.coach.id !== current.client.coachId && (
                                    <button className="btnModif" onClick={()=>sendReqToCoach()}>S&#39;abonner</button>
                                )}
                                {role === "CLIENT" && coach.coach.id === current.client.coachId && current.client.status==="pending" &&(
                                    <button className="btnModif" style={{ background: "grey" }}>
                                        en attente
                                    </button>
                                )}
                                {role === "CLIENT" && coach.coach.id === current.client.coachId && current.client.status==="accepted" &&(
                                    <button className="btnModif" style={{ background: "green" }}>
                                        Abonné
                                    </button>
                                )}

                            </div>
                            <h3
                                style={{ display: "flex", alignItems: "center" }}
                                className="emailVerified"
                            >
                                Top 3 Recommandé{" "}
                                {coach.coach.verified === "verified" && <HiCheckBadge />}{" "}
                            </h3>
                            <table className="profile-table">
                                <tbody>
                                <tr>
                                    <td>
                                        <strong>Email :</strong>
                                    </td>
                                    <td>{coach.email}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <strong>description :</strong>
                                    </td>
                                    <td>
                                        {coach.coach && coach.coach?.description && (
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html: coach.coach.description,
                                                }}
                                            />
                                        )}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="downloads">
                            <button className="download-btn">
                                <a
                                    href={`http://localhost:3000/${coach.coach?.diplome || ""}`}
                                    download
                                >
                                    Télécharger Diplôme
                                </a>
                            </button>
                            <button className="download-btn">
                                <a
                                    href={`http://localhost:3000/${coach.coach?.cv || ""}`}
                                    download
                                >
                                    Télécharger CV
                                </a>
                            </button>
                        </div>
                    </div>

                    <div className="client-reviews">
                        <h4>Avis des Clients</h4>
                        <div className="review">
                            <h5>Client 1</h5>
                            <p>
                                &#34;Marie est une coach incroyable. Très professionnelle et
                                motivante !&#34;
                            </p>
                            <p>
                                <strong>Note :</strong> ⭐⭐⭐⭐⭐
                            </p>
                        </div>
                        <div className="review">
                            <h5>Client 2</h5>
                            <p>
                                &#34;Les sessions avec elle sont dynamiques et bien préparées.
                                Je la recommande movement.&#34;
                            </p>
                            <p>
                                <strong>Note :</strong> ⭐⭐⭐⭐
                            </p>
                        </div>
                        <div className="review">
                            <h5>Client 3</h5>
                            <p>
                                &#34;Excellente communication et très attentive à mes
                                besoins.&#34;
                            </p>
                            <p>
                                <strong>Note :</strong> ⭐⭐⭐⭐⭐
                            </p>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer/>
        </div>
    );
};

export default ProfileCoach;
