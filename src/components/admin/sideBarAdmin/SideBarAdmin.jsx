import './sidebarAdmin.css';
const SideBarAdmin = () => {
    return (
        <div className="sidebar">
            <h2 className="menu-title">NHEBEK WA7CH</h2>
            <ul className="menu-links">
                <li><a href="#"><i className="fas fa-home"></i> Accueil</a></li>
                <li><a href="#"><i className="fas fa-dumbbell"></i>Verifer Coach</a></li>
            </ul>
            <div className="logout-container">
                <a href="#" className="logout"><i className="fas fa-sign-out-alt"></i> Déconnexion</a>
            </div>
        </div>

    );
};

export default SideBarAdmin;