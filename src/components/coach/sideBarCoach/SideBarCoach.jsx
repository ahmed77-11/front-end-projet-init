import './sidebarCoach.css';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logout} from "../../../redux/user/userSlice.js";
const SideBarCoach = () => {
    const dispatch=useDispatch();

    const handleLogout = () => {
        dispatch(logout())
    }
    return (
        <div className="sidebar">
            <h2 className="menu-title">Fit2A2S</h2>
            <ul className="menu-links">
                <li><Link to="/coach/dashboard/addExercice"><i className="fas fa-plus"></i> Ajouter Exercice</Link></li>
                <li><Link to="/coach/dashboard/listeDemande"><i className="fas fa-clipboard-list"></i> Liste Demandes</Link></li>
                <li><Link to="/coach/dashboard/myExercices"><i className="fas fa-dumbbell"></i> Mes Exercices</Link></li>
                <li><Link to="/coach/dashboard/myClients"><i className="fas fa-users"></i> Liste des Clients</Link></li>
            </ul>
            <div className="logout-container" onClick={handleLogout}>
                <Link to="/intro" className="logout"><i className="fas fa-sign-out-alt"></i> Déconnexion</Link>
            </div>
        </div>

    );
};

export default SideBarCoach;