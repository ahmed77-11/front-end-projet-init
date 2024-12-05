import Navbar from "../../navbar/Navbar.jsx";
import { Route, Routes } from "react-router-dom";
import ProfileCoach from "../profilCoach/ProfileCoach.jsx";
import ModifierCoachProfile from "../modifierProfile/ModifierCoachProfile.jsx";
import SideBarCoach from "../sideBarCoach/SideBarCoach.jsx";
import ListeRequest from "../listRequest/ListeRequest.jsx";
import ProfileClient from "../profileClient/ProfileClient.jsx";
import MyExercices from "../myExercices/MyExercices.jsx";
import UpdateExercice from "../../exercice/updateExercice/UpdateExercice.jsx";
import DetailExercice from "../../exercice/detailExercice/DetailExercice.jsx";

const DashboardCoach = () => {
    return (
        <div>
            <Navbar />
            <div style={{ display:"flex"}}>
                <div style={{display:"flex",flex:1,width:"20%"}}>
                    <SideBarCoach />
                </div>

                {/* Main content area, making sure it's adjusted for sidebar width */}
                <div style={{display:"flex",width:"80%",flex:6}}>
                    <Routes>
                        <Route path="/profile" element={<ProfileCoach />} />
                        <Route path="/modifierCoach" element={<ModifierCoachProfile />} />
                        <Route path="/listeDemande" element={<ListeRequest />} />
                        <Route path={"/client/:clientId"} element={<ProfileClient />} />
                        <Route path={"/myExercices"} element={<MyExercices/>}/>
                        <Route path={"/updateExercice/:id"} element={<UpdateExercice/>}/>
                        <Route path={"/detailExercice/:id"} element={<DetailExercice/>}/>

                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default DashboardCoach;
