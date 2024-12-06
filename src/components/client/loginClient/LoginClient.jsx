import "./loginClient.scss";
import { CiDumbbell } from "react-icons/ci";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {loginClient, signInFailure} from "../../../redux/user/userSlice.js";
import {Link, useNavigate} from "react-router-dom";

const LoginClient = () => {
    
    const  dispatch=useDispatch();
    const navigate = useNavigate();
    // Define Yup validation schema for login
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email format")
            .required("Email is required"),
        password: Yup.string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters")
            .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
            .matches(/[a-z]/, "Password must contain at least one lowercase letter")
            .matches(/\d/, "Password must contain at least one number")
            .matches(
                /[@$!%*?&]/,
                "Password must contain at least one special character"
            ),
    });
    
    
    const {loading,error}=useSelector((state)=>state.user);

    // Initialize React Hook Form
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = async (data) => {
        try {
            await dispatch(loginClient(data,navigate)); // Dispatch with user data
            reset();


        }catch (err){
            console.error("Error during sign-in:",err);
            dispatch(signInFailure(err.message));
        }
    };

    return (
        <div className="containerLogin">
            <div className="left">
                <div className="logo-login">
                    <h1>Fit2A2S</h1>
                    <span>
                    </span>
                </div>
                <div className="formLogin">
                    <h1>Connectez-vous à notre site Web</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="formField">
                            <input
                                type="text"
                                {...register("email")}
                                className="form-control"
                                placeholder="example@gmail.com"
                            />
                            <p className="error">{errors.email?.message}</p>
                        </div>
                        <div className="formField">
                            <input
                                type="password"
                                {...register("password")}
                                className="form-control"
                                placeholder="••••••••"
                            />
                            <p className="error">{errors.password?.message}</p>
                        </div>
                        <div className="btnSubmitForm">
                            <input type="submit" className={"btnSubmitForm"} value={loading ? "Submitting" : "S'inscrier"}
                                   disabled={loading}/>
                        </div>
                        {error && <p className="error">{error}</p>}
                        <div className="signUpNav">
                            <p>
                                Tu n&#39;as pas de compte? <Link to="/signUp">S'inscrier</Link>
                            </p>
                        </div>
                        <div className="signUpNav">
                            <p>
                               Connecter en tant que Coach <Link to="/signInCoach">Se Connecter</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
            <div className="right">
                <img src="/assets/images/bgLogin.jpeg" alt=""/>
                <div className="contentRight">
                    <h1>
                    Bienvenue à nouveau <span>Fit2A2S</span>
                    </h1>
                    <p>Continuez à être en forme</p>
                </div>
            </div>
        </div>
    );
};

export default LoginClient;
