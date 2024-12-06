import "./ajouterProgramme.css"
import { useState, useEffect } from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

const AjouterProgramme = () => {
    const [exercices, setExercices] = useState([]);  // List of fetched exercises
    const [formData, setFormData] = useState({ nom: "", exercices: [] });  // Form data (program name and selected exercises)
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const {clientId}=useParams();

    // Fetching exercises from the server on component mount
    useEffect(() => {
        fetchDatas();
    }, []);

    // Function to fetch exercises from the server
    const fetchDatas = async () => {
        try {
            setLoading(true);
            const res = await axios.get("http://localhost:3000/api/exercice/getExercices/", { withCredentials: true });
            if (!res.data) {
                throw new Error("No data received from API");
            }
            setExercices(res.data);  // Set fetched exercises into state
            setLoading(false);
        } catch (e) {
            console.log(e);
            setError(e.message);  // Handle any error that occurred during fetching
            setLoading(false);
        }
    };

    // Handle input changes for programme name
    const handleNameChange = (e) => {
        setFormData({
            ...formData,
            nom: e.target.value
        });
    };
    console.log(exercices)

    // Handle checkbox changes (select/deselect exercises)
    const handleCheckboxChange = (e, exerciceId) => {
        const isChecked = e.target.checked;
        const updatedExercices = isChecked
            ? [...formData.exercices, exerciceId]  // Add exercise if checked
            : formData.exercices.filter(id => id !== exerciceId);  // Remove exercise if unchecked

        setFormData({
            ...formData,
            exercices: updatedExercices  // Update the selected exercises list
        });
    };
    console.log(formData)

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Perform the submission logic (for now, just log the form data)
        try {
            const response = await axios.post("http://localhost:3000/api/programme/addPrograme/"+clientId, formData, { withCredentials: true });
            console.log(response.data);  // Handle the response as needed
        } catch (error) {
            console.error(error);
            setError("An error occurred while adding the program");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="containerAP">
            <div className="header">
                <h1>Ajouter un Programme</h1>
            </div>

            <div className="programme-form">
                <label htmlFor="programme-name" className="form-label">Nom du programme :</label>
                <input
                    type="text"
                    id="nom"
                    value={formData.nom}
                    onChange={handleNameChange}
                    placeholder="Nom du programme"
                    className="form-input"
                />

                <h2>Liste des Exercices</h2>
                <div className="exercises-list">
                    {/* Loop through the fetched exercises and render a checkbox for each */}
                    {exercices.map(exercice => (
                        <div key={exercice.id} className="exercise-card">
                            <input
                                type="checkbox"
                                id={`ex${exercice.id}`}
                                className="exercise-checkbox"
                                checked={formData.exercices.includes(exercice.id)}  // Check if this exercise is selected
                                onChange={(e) => handleCheckboxChange(e, exercice.id)}  // Handle checkbox change
                            />
                            <label htmlFor={`ex${exercice.id}`}>
                                <div className="exercise-content">
                                    <img
                                        src={"http://localhost:3000/"+exercice.image || "/public/assets/images/bgSignUP.jpg"}  // Use a fallback image if none provided
                                        alt={`Exercice ${exercice.nom}`}
                                        className="exercise-picture"
                                    />
                                    <p className="exercise-name">{exercice.nom}</p>
                                </div>
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Submit Button */}
            <button
                className="add-program-btn"
                onClick={handleSubmit}
                disabled={loading || !formData.nom || formData.exercices.length === 0}  // Disable if no program name or no exercises selected
            >
                {loading ? "Chargement..." : "Ajouter programme"}
            </button>

            {/* Error Message */}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default AjouterProgramme;
