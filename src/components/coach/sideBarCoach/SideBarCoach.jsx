import React from 'react';
import './sidebarCoach.css';
const SideBarCoach = () => {
    return (
        <div className="sidebar">
            <h2 className="menu-title">NHEBEK WA7CH</h2>
            <ul className="menu-links">
                <li><a href="#"><i className="fas fa-home"></i> Accueil</a></li>
                <li><a href="#"><i className="fas fa-calendar"></i> Programme</a></li>
                <li><a href="#"><i className="fas fa-clipboard-list"></i> Routine</a></li>
                <li><a href="#"><i className="fas fa-dumbbell"></i> Coach personnelle</a></li>
                <li><a href="#"><i className="fas fa-users"></i> Liste des Coachs</a></li>
            </ul>
            <div className="logout-container">
                <a href="#" className="logout"><i className="fas fa-sign-out-alt"></i> Déconnexion</a>
            </div>
        </div>

    );
};

export default SideBarCoach;