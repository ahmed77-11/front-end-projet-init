import "./programme.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Programme = () => {
    const [programme, setProgramme] = useState(null); // Initial state is null, waiting for the fetched data
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    // Fetch the programme data from the API
    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`http://localhost:3000/api/programme/getProgramme/${id}`, { withCredentials: true });
            if (!res.data) {
                throw new Error("No data received from API");
            }
            setProgramme(res.data); // Set the fetched data into the state
            setLoading(false);
        } catch (e) {
            console.log(e);
            setError(e.message); // Set error message if something goes wrong
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(); // Fetch data when the component mounts
    }, []);

    // Handle the checkbox change (complete/uncomplete exercice)
    const handleCheckboxChange = async (exerciseId, isChecked) => {
        if (!programme?.id) return; // Ensure the programme ID is available before making the request

        const requestBody = { exerciceId: exerciseId };

        // Find the exercise in the local state and update its completion state
        const updatedExercises = programme.exercicePrograme.map((exercise) => {
            if (exercise.exercice._id === exerciseId) {
                return {
                    ...exercise,
                    completed: isChecked, // Update the completion status in the local state
                };
            }
            return exercise;
        });

        // Update the local state with the new exercises list
        setProgramme((prevProgramme) => ({
            ...prevProgramme,
            exercicePrograme: updatedExercises,
        }));

        try {
            console.log("Request Body: ", requestBody); // Log the request body to check if it has the correct data

            // Construct the URL for the complete/uncomplete action
            const endpoint = isChecked
                ? `http://localhost:3000/api/programme/completeExercice/${programme.id}`
                : `http://localhost:3000/api/programme/uncompleteExercice/${programme.id}`;

            // Make the PATCH request
            const res = await axios.patch(endpoint, requestBody, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });

            if (res.status === 200) {
                // Handle the success response here
                toast.success(isChecked ? "Exercice complété" : "Exercice non complété");
                fetchData();
            }
        } catch (error) {
            console.error("Error in updating exercise completion", error);
            toast.error("Une erreur s'est produite");
        }
    };

    // Checking if the programme and exercices are loaded properly
    if (loading) {
        return <p>Loading...</p>; // Loading message
    }

    if (error) {
        return <p>Error: {error}</p>; // Error message if there's a problem
    }

    // Ensure that the data exists and that 'exercicePrograme' is an array
    const exercises = programme?.exercicePrograme || [];

    return (
        <div className="container">
            <div className="header">
                <h1>Mon Programme</h1>
            </div>

            <div className="coaches-list">
                {/* Loop over the exercises only if exercicePrograme exists */}
                {exercises.length > 0 ? (
                    exercises.map((exerciseData, index) => (
                        <div key={index} className="coach-card">
                            <div className="image-container5">
                                <img
                                    src={`http://localhost:3000/${exerciseData.exercice.image}`} // Dynamically set the image URL
                                    alt={exerciseData.exercice.nom}
                                    className="coach-picture5"
                                />
                            </div>
                            <div className="coach-details">
                                <h2>{exerciseData.exercice.nom}</h2> {/* Display exercise name */}
                                <p>{exerciseData.exercice.description}</p> {/* Display exercise description */}
                            </div>
                            <div className="coach-actions">
                                <button className="button-details" onClick={()=>{navigate("/client/dashboard/detailExercice/"+exerciseData.exercice.id)}}>Voir détails</button>
                                <input
                                    type="checkbox"
                                    className="checkbox"
                                    checked={exerciseData.completed} // Reflect the current state of completion
                                    onChange={(e) => handleCheckboxChange(exerciseData.exercice.id, e.target.checked)} // Handle checkbox change
                                />
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No exercises available for this programme.</p> // Message if no exercises are available
                )}
            </div>

            {/* Submit Button */}
            {/*<button className="submit-btn">Terminer</button>*/}

            {/* Back Button */}
            <div className="back-button">
                <a href="javascript:history.back();">
                    <i className="fas fa-arrow-left"></i> Retour
                </a>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Programme;
