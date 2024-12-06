import './sidebarAdmin.css';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logout} from "../../../redux/user/userSlice.js";
const SideBarAdmin = () => {
    const dispatch=useDispatch();
    const handleLogout = () => {
        dispatch(logout())
    }
    return (
        <div className="sidebar">
            <h2 className="menu-title">Fit2A2S</h2>
            <ul className="menu-links">
                <li><Link to="#"><i className="fas fa-home"></i> Accueil</Link></li>
                <li><Link to="/admin/dashboard/listeVerifCoach"><i className="fas fa-dumbbell"></i>Verifer Coach</Link></li>
                <li><Link to="/admin/dashboard/addExercice"><i className="fas fa-plus"></i> Ajouter Exercice</Link></li>
                <li><Link to="/admin/dashboard/listExercices"><i className="fas fa-list"></i> Liste des Exercices</Link></li>
            </ul>
            <div className="logout-container" onClick={handleLogout}>
                <Link to="/intro" className="logout"><i className="fas fa-sign-out-alt"></i> Déconnexion</Link>
            </div>
        </div>

    );
};

export default SideBarAdmin;