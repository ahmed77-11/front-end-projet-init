import "./detailExercices.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DetailExercice = () => {
    const [exercice, setExercice] = useState(null); // Initialize as null to handle loading state
    const { id } = useParams();

    const fetchData = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/api/exercice/getExercice/${id}`, {
                withCredentials: true,
            });
            if (!res.data) throw new Error("No data received from API");
            console.log(res.data);
            setExercice(res.data);
        } catch (error) {
            console.error("Error fetching exercise:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (!exercice) {
        // Show a loading spinner or placeholder while data is being fetched
        return <div className="loading">Loading...</div>;
    }

    const imageUrl = `http://localhost:3000/${exercice?.image}`;
    console.log("Image URL:", imageUrl); // Debug image URL

    return (
        <div className="containerDE">
            <div
                className="detHeader"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("${imageUrl}")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <h1>{exercice.nom || "Nom indisponible"}</h1>
                <p>{exercice.description || "Description indisponible"}</p>
                <button>Modifier</button>
            </div>
            <div className="detContent">
                <div className="left">
                    <video controls className="exercise-video">
                        <source src={exercice.video || ""} type="video/mp4" />
                        Votre navigateur ne supporte pas la lecture de vidéos.
                    </video>
                </div>
                <div className="right1">
                    <h1>Information</h1>
                    <div className="box">
                        <h4>Category</h4>
                        <p>{exercice.category?.nom || "Catégorie indisponible"}</p>
                    </div>
                    <div className="box">
                        <h4>Difficulté</h4>
                        <p>{exercice.difficulte || "Difficulté non spécifiée"}</p>
                    </div>
                    <div className="box">
                        <h4>Répétition</h4>
                        <p>{exercice.repetition || "Répétitions non spécifiées"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailExercice;
