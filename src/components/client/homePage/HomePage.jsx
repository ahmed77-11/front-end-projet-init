import "./homePage.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllExercices } from "../../../redux/exercice/exerciceSlice";
import { useEffect } from "react";
import {useNavigate} from "react-router-dom";

const HomePage = () => {
    const dispatch = useDispatch();
    const navigate=useNavigate();

    // Accessing state from the Redux store
    const { exercices, loading, error } = useSelector(state => state.exercice);

    // Fetch the exercises on component mount
    const fetchData = async () => {
        dispatch(getAllExercices());
    };

    useEffect(() => {
        fetchData(); // Trigger fetching of exercises when the component mounts
    }, [dispatch]);

    // Handling loading and error states
    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="main-container">
            <div className="main-header">
                <h1>Liste des exercices</h1>
            </div>
            <div className="exercise-list">
                {/* Looping through the exercises and rendering them */}
                {exercices && exercices.length > 0 ? (
                    exercices.map((exercise, index) => (
                        <div key={index} className="coach-card6" style={{cursor:"pointer"}} onClick={()=> {navigate("/client/dashboard/detailExercice/"+exercise.id)}}>
                            <div className="image-container">
                                {/* Dynamically setting the image URL */}
                                <img
                                    src={`http://localhost:3000/${exercise.image}`} // Full URL to the image
                                    alt={exercise.nom}
                                    className="coach-picture6"
                                />
                            </div>
                            <div className="coach-details6">
                                <h2>{exercise.nom}</h2>
                                <h3>{exercise.repetion} reps</h3> {/* Displaying repetitions */}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No exercises available</p>

                )}
            </div>
        </div>
    );
};

export default HomePage;
