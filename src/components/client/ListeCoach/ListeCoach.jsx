import "./listeCoach.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

const ListeCoach = () => {
    const {coachs, loading, error} = useSelector((state) => state.coach);


    return (
        <div className="container1">
            {loading ? (
                <p className="loader">Loading...</p>
            ) : error ? (
                <p className="error">{error}</p>
            ) : (
                <>
                    <div className="header">
                        <h1>List of Coaches</h1>
                    </div>
                    <div className="coaches-list">
                        {coachs.map((coach) => (
                            <div className="coach-row" key={coach.id}>
                                <img
                                    src={"http://localhost:3000/" + coach.photo}
                                    alt={`${coach.nom}'s Picture`}
                                    className="coach-picture"
                                />
                                <div className="coach-details">
                                    <h2>{coach.nom} {coach.prenom}</h2>
                                    {coach.coach && coach.coach?.description && (
                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: coach.coach.description,
                                            }}
                                        />
                                    )}
                                </div>
                                <Link to={"/client/dashboard/coach/" + coach.id}>
                                    <button className="view-profile-btn">
                                        View Profile
                                    </button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default ListeCoach;
