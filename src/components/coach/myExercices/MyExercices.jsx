import  {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteExercice, getMyExercices} from "../../../redux/exercice/exerciceSlice.js";
import {useNavigate} from "react-router-dom";

const MyExercices = () => {

    const {exercices, loading, error} = useSelector((state) => state.exercice);
    const dispatch = useDispatch();
    const navigate=useNavigate();

    // Fetch exercises when the component mounts
    useEffect(() => {
        dispatch(getMyExercices());
    }, [dispatch]);

    const handleEdit = (id) => {
        // Navigate to the edit page for the selected exercise
        window.location.href = `/coach/dashboard/updateExercice/${id}`;
    };

    const handleDelete = (id) => {
        // Confirm and dispatch a delete action
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cet exercice?")) {
            dispatch(deleteExercice(id));
            console.log("Deleting exercise:", id);
        }
        // Loading spinner
        if (loading) {
            return <div className="loading-spinner">Chargement...</div>;
        }

        // Error handling
        if (error) {
            return <div className="error-message">Erreur: {error}</div>;
        }

    }
    return (
        <div className="containerLE">
            <div className="header">
                <h1>Liste des Exercices</h1>
            </div>
            <table className="profile-table">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Nom de l&#39;Exercice</th>
                    <th>Catégorie</th>
                    <th>Difficulté</th>
                    <th>Ajouté le</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {exercices.length > 0 ? (
                    exercices.map((exercice) => (
                        <tr key={exercice.id} style={{cursor:"pointer"}} onClick={()=>{navigate("/coach/dashboard/detailExercice/"+exercice.id)}}>
                            <td>{exercice.id}</td>
                            <td>{exercice.nom}</td>
                            <td>{exercice.category?.nom}</td>
                            <td>{exercice.diffuculte}</td>
                            <td>{new Date(exercice.addedTime).toLocaleDateString()}</td>
                            <td>
                                <button
                                    className="edit-btn"
                                    onClick={() => handleEdit(exercice.id)}
                                >
                                    Modifier
                                </button>
                                <button
                                    className="delete-btn"
                                    onClick={() => handleDelete(exercice.id)}
                                >
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6" className="no-data">
                            Aucun exercice trouvé.
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default MyExercices;