import "./intro.css"
import {Link} from "react-router-dom";

const Intro = () => {
    return (
        <div className="introCont">
        <header className="hero">
            <div className="overlay">
                <nav className="navbar1">
                    <h1 className="logo">Fit<span>2A2S</span></h1>
                </nav>
                <div className="hero-content">
                    <h2>Bienvenue chez Fit2A2S</h2>
                    <p>Améliorez votre santé et performance avec nos coachs professionnels.</p>
                    <div className="buttons">
                        <Link to="/login" className="btn login-btn">Se connecter</Link>
                        <a href="/signUp" className="btn signup-btn">S&#39;inscrire</a>
                    </div>
                </div>
            </div>
        </header>
        </div>
    );
};

export default Intro;