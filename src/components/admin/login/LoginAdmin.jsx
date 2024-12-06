import "./loginAdmin.scss"; // Link to a SCSS file to apply consistent styles
import { CiDumbbell } from "react-icons/ci";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {loginAdmin, signInFailure} from "../../../redux/user/userSlice.js";

const LoginAdmin = () => {
    const [formData,setFormData]=useState({});
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {loading,error}=useSelector((state)=>state.user);
    const handleChange=(e)=>{
        setFormData({...formData,[e.target.id]:e.target.value});
    }
    const handleSubmit= async (e)=>{
        e.preventDefault();
        try{
            await dispatch(loginAdmin(formData,navigate));
            setFormData({});
        }catch (error){
            console.log("Error during sign-in:",error);
            dispatch(signInFailure(error.message));
        }
    }
    return (
        <div className="adminLogin">
            {loading && <div className="loader"> loading</div>}
            <div className="containerAdminLogin">
                <div className="headerLogin">
                    <p>Admin Login</p>
                    <div className="logo-login">
                        <h1>Fit2A2S</h1>
                        <span>
                        </span>
                    </div>
                </div>
                <div className="formAdminLogin">
                    <form onSubmit={handleSubmit}>
                        <div className="formField">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Email"
                                id="email"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="formField">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                id="password"
                                required
                                onChange={handleChange}
                            />
                        </div>
                        {error && <p className="error">{error}</p>}
                        <div className="btnSubmitForm">
                            <input type="submit" value="Login" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginAdmin;
