import "./loginCoach.scss";
import { CiDumbbell } from "react-icons/ci";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginCoach, signInFailure } from "../../../redux/user/userSlice.js";
import {Link, useNavigate} from "react-router-dom";

const LoginCoach = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Define Yup validation schema for coach login
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

    const { loading, error } = useSelector((state) => state.user);

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
            await dispatch(loginCoach(data, navigate)); // Dispatch with user data
            reset(); // Reset form after successful submission
        } catch (err) {
            console.error("Error during sign-in:", err);
            dispatch(signInFailure(err.message)); // Handle sign-in failure
        }
    };

    return (
        <div className="containerLoginCoach">
            {loading && <div className="loader">loading</div>}
            <div className="left">
                <div className="logo-login">
                    <h1>Fit2A2S</h1>
                    <span>
          </span>
                </div>
                <div className="formLogin">
                    <h1>Connectez-vous à notre site Web en tant que coach</h1>
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
                            <input
                                type="submit"
                                value={loading ? "Submitting" : "Sign In"}
                                disabled={loading}
                            />
                        </div>
                        {error && <p className="error">{error}</p>}
                        <div className="signUpNav">
                            <p>
                                Tu n&#39;as pas de compte? <Link to="/signUpCoach">s'inscrire</Link>
                            </p>
                            <p>
                                Connecter en tant que Client  <Link to="/login">Se Connecter Client</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
            <div className="right">
                <img src="/assets/images/bgLoginCoach.jpg" alt="" />
                <div className="contentRight">
                    <h1>
                        Bienvenue Dans{""}<span>Fit2A2S</span>
                    </h1>
                    <p>Rester En Forme</p>
                </div>
            </div>
        </div>
    );
};

export default LoginCoach;
