import Navbar from "../../navbar/Navbar.jsx";
import SideBarClient from "../sideBarClient/SideBarClient.jsx";
import {Route, Routes} from "react-router-dom";
import ProfileClient from "../profileClient/ProfileClient.jsx";
import ModifierClientProfile from "../modifierClientProfile/ModifierClientProfile.jsx";
import ListeCoach from "../ListeCoach/ListeCoach.jsx";
import ListeProgramme from "../listeProgramme/ListeProgramme.jsx";
import Programme from "../programme/Programme.jsx";
import DetailExercice from "../../exercice/detailExercice/DetailExercice.jsx";
import HomePage from "../homePage/HomePage.jsx";
import ProfileCoach from "../../profileCoach/ProfileCoach.jsx";

const DashboardClient = () => {
    return (
        <div>
            <Navbar/>
            <div style={{display: "flex"}}>
                <div style={{display: "flex", flex: 1, width: "20%"}}>
                    <SideBarClient/>
                </div>
                <div style={{display: "flex", width: "80%", flex: 6}}>
                   <Routes>
                       <Route path={"/profile"} element={<ProfileClient/>}/>
                       <Route path={"/modifierClient"} element={<ModifierClientProfile/>}/>
                       <Route path={"/listeCoachs"} element={<ListeCoach/>}/>
                       <Route path={"/listeProgramme"} element={<ListeProgramme/>}/>
                       <Route path={"/detailExercice/:id"} element={<DetailExercice/>}/>
                       <Route path={"/acceuille"} element={<HomePage/>}/>
                       <Route path={"/coach/:id"} element={<ProfileCoach/>}/>

                       <Route path={"/monprogramme/:id"} element={<Programme/>}/>
                   </Routes>
                </div>
            </div>
        </div>
    );
};

export default DashboardClient;