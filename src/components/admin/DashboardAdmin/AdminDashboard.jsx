import Navbar from "../../navbar/Navbar.jsx";
import {Route, Routes} from "react-router-dom";
import SideBarAdmin from "../sideBarAdmin/SideBarAdmin.jsx";
import ListeVerifCoach from "../ListeVerifCoach/ListeVerifCoach.jsx";
import AddExercice from "../../exercice/addExercice/AddExercice.jsx";
import UpdateExercice from "../../exercice/updateExercice/UpdateExercice.jsx";
import ListExercice from "../../exercice/listExercice/ListExercice.jsx";
import DetailExercice from "../../exercice/detailExercice/DetailExercice.jsx";

const DashboardClient = () => {
    return (
        <div>
            <Navbar/>
            <div style={{display: "flex"}}>
                <div style={{display: "flex", flex: 1, width: "20%"}}>
                    <SideBarAdmin/>
                </div>
                <div style={{display: "flex", width: "80%", flex: 6}}>
                    <Routes>
                        <Route path={"/listeVerifCoach"} element={<ListeVerifCoach/>}/>
                        <Route path={"/addExercice"} element={<AddExercice/>}/>
                        <Route path={"/updateExercice/:id"} element={<UpdateExercice/>}/>
                        <Route path={"/listExercices"} element={<ListExercice/>}/>
                        <Route path={"/detailExercice/:id"} element={<DetailExercice/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default DashboardClient;