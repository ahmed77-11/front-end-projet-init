import "./profileCoach.css";
import { HiCheckBadge } from "react-icons/hi2";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
const ProfileCoach = () => {
    const {current}=useSelector((state)=>state.user)

    return (
        <div className="container">

                <div className="profile-content">
                    <div className="header">
                        <h1>Profil du Coach</h1>
                    </div>

                    <div className="coach-profile">
                        <img
                            src={`http://localhost:3000/${current.photo}`} // Assuming the response might contain a photo URL
                            alt="Photo du Coach"
                            className="profile-picture-large"
                        />
                        <div className="coach-details">
                            <div className="coach-details1">
                                <h2>{current.nom} {current.prenom}</h2>
                                <Link to="/coach/dashboard/modifierCoach">
                                    <button className="btnModif">modifier</button>
                                </Link>
                            </div>
                            <h3 style={{display: "flex", alignItems: "center"}} className="emailVerified">Top 3 Recommandé {current.verified==="verified" && <HiCheckBadge />} </h3>
                            <table className="profile-table">
                                <tbody>
                                <tr>
                                    <td><strong>Email :</strong></td>
                                    <td >{current.email }</td>
                                </tr>
                                <tr>
                                    <td><strong>description :</strong></td>
                                    <td >
                                        {current.coach && current.coach.description && <div dangerouslySetInnerHTML={{ __html:current.coach.description }}/>}
                                    </td >
                                </tr>

                                </tbody>
                            </table>
                        </div>
                        <div className="downloads">
                            <button className="download-btn">
                                <a href={`http://localhost:3000/${current.coach.diplome || ""}`} download>Télécharger Diplôme</a>
                            </button>
                            <button className="download-btn">
                                <a href={`http://localhost:3000/${current.coach.cv || ""}`} download>Télécharger CV</a>
                            </button>
                        </div>
                    </div>

                    <div className="client-reviews">
                        <h4>Avis des Clients</h4>
                        <div className="review">
                            <h5>Client 1</h5>
                            <p>&#34;Marie est une coach incroyable. Très professionnelle et motivante !&#34;</p>
                            <p><strong>Note :</strong> ⭐⭐⭐⭐⭐</p>
                        </div>
                        <div className="review">
                            <h5>Client 2</h5>
                            <p>&#34;Les sessions avec elle sont dynamiques et bien préparées. Je la recommande movement.&#34;</p>
                            <p><strong>Note :</strong> ⭐⭐⭐⭐</p>
                        </div>
                        <div className="review">
                            <h5>Client 3</h5>
                            <p>&#34;Excellente communication et très attentive à mes besoins.&#34;</p>
                            <p><strong>Note :</strong> ⭐⭐⭐⭐⭐</p>
                        </div>
                    </div>
                </div>

        </div>
    );
};

export default ProfileCoach;
