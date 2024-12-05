import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addExercice } from "../../../redux/exercice/exerciceSlice"; // Redux action for adding exercice

import "./addExercice.css";
import axios from "axios";

const AddExercice = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [imagePreview, setImagePreview] = useState(null);
    const [categories, setCategories] = useState([{ type: "", cats: [] }]);

    // Validation schema for form
    const validationSchema = Yup.object().shape({
        exerciseName: Yup.string()
            .required("Exercise name is required")
            .min(3, "Exercise name must be at least 3 characters"),
        description: Yup.string()
            .required("Description is required")
            .min(10, "Description must be at least 10 characters"),
        category: Yup.number()
            .required("Category selection is required")
            .typeError("Category must be selected"),
        difficulty: Yup.string().required("Difficulty level is required"),
        repetition: Yup.number()
            .required("Repetition is required")
            .min(1, "Repetition must be at least 1"),
        image: Yup.mixed()
            .required("Image is required")
            .test(
                "fileSize",
                "Image file is too large",
                (value) => value && value[0]?.size <= 5 * 1024 * 1024
            )
            .test(
                "fileType",
                "Unsupported file format",
                (value) =>
                    value &&
                    ["image/jpeg", "image/png", "image/gif"].includes(value[0]?.type)
            ),
        video: Yup.mixed()
            .required("Video is required")
            .test(
                "fileSize",
                "Video file is too large",
                (value) => value && value[0]?.size <= 100 * 1024 * 1024
            )
            .test(
                "fileType",
                "Unsupported video format",
                (value) =>
                    value &&
                    ["video/mp4", "video/mpeg", "video/quicktime"].includes(value[0]?.type)
            ),
    });

    // Fetch categories for select options
    const fetchCategories = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/exercice/getAllCategories", {
                withCredentials: true,
            });
            const groupedCategories = res.data.reduce((acc, item) => {
                const { Type, id, nom } = item;
                if (!acc[Type]) {
                    acc[Type] = [];
                }
                acc[Type].push({ id, name: nom }); // Include ID and name
                return acc;
            }, {});

            const formattedCategories = Object.entries(groupedCategories).map(([type, cats]) => ({
                type,
                cats,
            }));
            setCategories(formattedCategories);
        } catch (e) {
            console.error("Error fetching categories:", e);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    // Handle image preview
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const onSubmit = (data) => {
        const exerciceData = {
            exerciseName: data.exerciseName,
            description: data.description,
            category: Number(data.category), // Use ID as number
            difficulty: data.difficulty,
            repetition: data.repetition,
            image: data.image[0],
            video: data.video[0],
        };
        console.log(exerciceData);
        dispatch(addExercice(exerciceData, navigate));
    };

    return (
        <div className="container">
            <h1>Ajouter Exercice</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="profile-form">
                {/* Exercise Name */}
                <div className="form-group">
                    <label htmlFor="exercise-name">Nom de l&#39;exercice :</label>
                    <input
                        type="text"
                        id="exercise-name"
                        {...register("exerciseName")}
                        className="form-control"
                    />
                    {errors.exerciseName && <p className="error">{errors.exerciseName.message}</p>}
                </div>

                {/* Description */}
                <div className="form-group">
                    <label htmlFor="description">Description :</label>
                    <textarea
                        id="description"
                        {...register("description")}
                        className="form-control"
                    />
                    {errors.description && <p className="error">{errors.description.message}</p>}
                </div>

                {/* Category */}
                <div className="form-group">
                    <label htmlFor="category">Catégorie :</label>
                    <select
                        id="category"
                        {...register("category")}
                        className="form-control"
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
                    {errors.category && <p className="error">{errors.category.message}</p>}
                </div>

                {/* Difficulty */}
                <div className="form-group">
                    <label htmlFor="difficulty">Difficulté :</label>
                    <select
                        id="difficulty"
                        {...register("difficulty")}
                        className="form-control"
                    >
                        <option value="">-- Sélectionner une difficulté --</option>
                        <option value="facile">Facile</option>
                        <option value="moyen">Moyen</option>
                        <option value="difficile">Difficile</option>
                    </select>
                    {errors.difficulty && <p className="error">{errors.difficulty.message}</p>}
                </div>

                {/* Repetition */}
                <div className="form-group">
                    <label htmlFor="repetition">Répétition :</label>
                    <input
                        type="number"
                        id="repetition"
                        {...register("repetition")}
                        min="1"
                        className="form-control"
                    />
                    {errors.repetition && <p className="error">{errors.repetition.message}</p>}
                </div>

                {/* Image Upload */}
                <div className="form-group">
                    <label htmlFor="image-upload">Télécharger une image :</label>
                    <input
                        type="file"
                        id="image-upload"
                        {...register("image")}
                        accept="image/*"
                        onChange={handleImageChange}
                        className="form-control"
                    />
                    {errors.image && <p className="error">{errors.image.message}</p>}
                    {imagePreview && (
                        <div className="image-preview">
                            <img src={imagePreview} alt="Prévisualisation" />
                        </div>
                    )}
                </div>

                {/* Video Upload */}
                <div className="form-group">
                    <label htmlFor="video-upload">Télécharger une vidéo :</label>
                    <input
                        type="file"
                        id="video-upload"
                        {...register("video")}
                        accept="video/*"
                        className="form-control"
                    />
                    {errors.video && <p className="error">{errors.video.message}</p>}
                </div>

                {/* Submit Button */}
                <div>
                    <button className="submit-btn" type="submit">
                        Ajouter
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddExercice;
