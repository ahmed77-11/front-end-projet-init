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

function App() {

    return (
      <BrowserRouter>
          <Routes>
              <Route path={"/login"} element={<LoginClient />} />
              <Route path={"/signUp"} element={<SignUpClient />} />
              <Route path={"/signInCoach"} element={<LoginCoach/>} />
              <Route path={"/signUpCoach"} element={<SignUpCoach/>}/>
              <Route path={"/verifyEmail"} element={<VerficationEmail />} />
              <Route path={"/resetPassword"} element={<ResetPassword />} />
              <Route path={"/admin/dashboard/login"} element={<LoginAdmin/>}/>
              <Route path={"/coach/dashboard/*"} element={<DashboardCoach />} />
              <Route path={"/client/dashboard/*"} element={<DashboardClient />} />
              <Route path={"/admin/dashboard/*"} element={<AdminDashboard />} />
              <Route path={"/coach/:id"} element={<ProfileCoach/>}/>
          </Routes>
      </BrowserRouter>
  )
}

export default App
