import Navbar from "../../navbar/Navbar.jsx";
import SideBarClient from "../sideBarClient/SideBarClient.jsx";
import {Route, Routes} from "react-router-dom";
import ProfileClient from "../profileClient/ProfileClient.jsx";
import ModifierClientProfile from "../modifierClientProfile/ModifierClientProfile.jsx";
import ListeCoach from "../ListeCoach/ListeCoach.jsx";

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
                   </Routes>
                </div>
            </div>
        </div>
    );
};

export default DashboardClient;