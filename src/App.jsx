import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginClient from "./components/client/loginClient/LoginClient.jsx";
import SignUpClient from "./components/client/SignUpClient/SignUpClient.jsx";
import VerficationEmail from "./components/VerficationEmail/VerficationEmail.jsx";
import ResetPassword from "./components/ResetPassword/ResetPassword.jsx";
import LoginCoach from "./components/coach/loginCoach/LoginCoach.jsx";
import SignUpCoach from "./components/coach/SignUpCoach/SignUpCoach.jsx";
import LoginAdmin from "./components/admin/login/LoginAdmin.jsx";
import DashboardCoach from "./components/coach/coachDashborad/DashboardCoach.jsx";
import DashboardClient from "./components/client/clientDashborad/DashboardClient.jsx";
import AdminDashboard from "./components/admin/DashboardAdmin/AdminDashboard.jsx";
import ProfileCoach from "./components/profileCoach/ProfileCoach.jsx";
import Intro from "./components/intro/Intro.jsx";
import {useSelector} from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
    const {current} = useSelector(state => (state.user))

    const isAuthenticated = current !== null && current.id !== null;
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/login"} element={<LoginClient/>}/>
                <Route path={"/signUp"} element={<SignUpClient/>}/>
                <Route path={"/signInCoach"} element={<LoginCoach/>}/>
                <Route path={"/signUpCoach"} element={<SignUpCoach/>}/>
                <Route path={"/verifyEmail"} element={<VerficationEmail/>}/>
                <Route path={"/resetPassword"} element={<ResetPassword/>}/>
                <Route path={"/admin/dashboard/login"} element={<LoginAdmin/>}/>
                <Route path={"/coach/dashboard/*"}
                       element={
                           <ProtectedRoute isisAuthenticated={isAuthenticated} userRole={"COACH"}>
                               <DashboardCoach/>
                           </ProtectedRoute>
                       }/>
                <Route path={"/client/dashboard/*"}
                       element={
                           <ProtectedRoute isisAuthenticated={isAuthenticated} userRole={"CLIENT"}>
                               <DashboardClient/>
                           </ProtectedRoute>
                       }/>
                <Route path={"/admin/dashboard/*"}
                       element={
                           <ProtectedRoute isisAuthenticated={isAuthenticated} userRole={"ADMIN"}>
                               <AdminDashboard/>
                           </ProtectedRoute>
                       }/>
                <Route path={"/coach/:id"} element={<ProfileCoach/>}/>
                <Route path={"/"} element={<Intro/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
