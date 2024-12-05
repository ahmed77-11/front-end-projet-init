import  { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateExerciceData } from "../../../redux/exercice/exerciceSlice.js";
import axios from "axios";
import "./updateExercice.css";

const UpdateExercice = () => {
    const [categories, setCategories] = useState([{ type: "", cats: [] }]);
    const [exercice, setExercice] = useState({});
    const [imagePreview, setImagePreview] = useState(null);
    const [videoFile, setVideoFile] = useState(null); // Video file state
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    // Fetch exercise details
    const fetchExercice = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/api/exercice/getExercice/${id}`, {
                withCredentials: true,
            });
            if (!res.data) throw new Error("No data received from API");
            setExercice(res.data);
            if (res.data.image) {
                setImagePreview(`http://localhost:3000/${res.data.image}`); // Adjust path as needed
            }
        } catch (error) {
            console.error("Error fetching exercise:", error);
        }
    };

    // Fetch categories
    const fetchCategories = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/exercice/getAllCategories", {
                withCredentials: true,
            });
            const groupedCategories = res.data.reduce((acc, item) => {
                const { Type, id, nom } = item;
                if (!acc[Type]) acc[Type] = [];
                acc[Type].push({ id, name: nom });
                return acc;
            }, {});

            setCategories(
                Object.entries(groupedCategories).map(([type, cats]) => ({
                    type,
                    cats,
                }))
            );
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchExercice();
    }, []);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedExercice = {
            ...exercice,
            videoUrl:exercice.video,
            video: videoFile, // Add video file
        };
        if (!exercice.image || typeof exercice.image !== "object") {
            delete updatedExercice.image; // Remove the image field if not uploaded
        }

        dispatch(updateExerciceData(id, updatedExercice, navigate));
    };

    // Handle image preview
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
            setExercice({ ...exercice, image: file });

        } else {
            setImagePreview(null);
        }
    };

    // Handle video file selection
    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        setVideoFile(file);
    };

    return (
        <div className="containerUE">
            <h1>Modifier Exercice</h1>
            <form className="profile-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="exercise-name">Nom de l&#39;exercice :</label>
                    <input
                        type="text"
                        id="exercise-name"
                        name="exercise-name"
                        value={exercice.nom || ""}
                        onChange={(e) => setExercice({ ...exercice, nom: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description :</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={exercice.description || ""}
                        onChange={(e) => setExercice({ ...exercice, description: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Catégorie :</label>
                    <select
                        id="category"
                        name="category"
                        value={exercice.categoryId || ""}
                        onChange={(e) => setExercice({ ...exercice, categoryId: e.target.value })}
                        required
                    >
                        <option value="">-- Sélectionner une catégorie --</option>
                        {categories.map((categoryGroup, index) => (
                            <optgroup key={index} label={categoryGroup.type}>
                                {categoryGroup.cats.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </optgroup>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="difficulty">Difficulté :</label>
                    <select
                        id="difficulty"
                        name="difficulty"
                        value={exercice.diffuculte || ""}
                        onChange={(e) => setExercice({ ...exercice, diffuculte: e.target.value })}
                        required
                    >
                        <option value="">-- Sélectionner une difficulté --</option>
                        <option value="facile">Facile</option>
                        <option value="moyen">Moyen</option>
                        <option value="difficile">Difficile</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="repetition">Répétition :</label>
                    <input
                        type="number"
                        id="repetition"
                        name="repetition"
                        value={exercice.repetion || ""}
                        onChange={(e) => setExercice({ ...exercice, repetion: e.target.value })}
                        min="1"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="image-upload">Télécharger une image :</label>
                    <input
                        type="file"
                        id="image-upload"
                        name="image-upload"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    {imagePreview && (
                        <div className="image-preview">
                            <img src={imagePreview} alt="Prévisualisation" />
                        </div>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="video-upload">Télécharger une vidéo :</label>
                    <input
                        type="file"
                        id="video-upload"
                        name="video-upload"
                        accept="video/*"
                        onChange={handleVideoChange}
                    />
                </div>
                <div>
                    <button className="submit-btn" type="submit">
                        Modifier
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateExercice;
