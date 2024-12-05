import { CiDumbbell } from "react-icons/ci";
import "./signUpClient.scss";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {signUpClient, signUpFailure} from "../../../redux/user/userSlice.js";

const SignUpClient = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Define Yup validation schema
    const validationSchema = Yup.object().shape({
        nom: Yup.string().required("First Name is required"),
        prenom: Yup.string().required("Last Name is required"),
        email: Yup.string()
            .email("Invalid email format")
            .required("Email is required"),
        password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
            .matches(/[a-z]/, "Password must contain at least one lowercase letter")
            .matches(/\d/, "Password must contain at least one number")
            .matches(
                /[@$!%*?&]/,
                "Password must contain at least one special character"
            )
            .required("Password is required"),
        passwordConfirm: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Confirm your password"),
        adr: Yup.string().required("Address is required"),
        taille: Yup.string().required("Length is required"),
        pods: Yup.string().required("Weight is required"),
    });

    // Initialize React Hook Form
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const { loading, error } = useSelector((state) => state.user);

    const onSubmit = async (data) => {
        try {
            await dispatch(signUpClient(data)); // Dispatch with user data
            reset(); // Reset form after successful submission
            navigate("/verifyEmail"); // Navigate to a specific route
        } catch (err) {
            console.error("Error during sign-up:", err);
            dispatch(signUpFailure(err.message));
        }
    };

    return (
        <div className="containerSignUp">
            {loading ? (
                <div>Loading...</div> // Show a loading indicator
            ) : (
                <>
                    <div className="left">
                        <div className="logo-login">
                            <h1>N7Bk W7CH</h1>
                            <span>
                <CiDumbbell />
              </span>
                        </div>
                        <div className="formLogin">
                            <h1>Sign Up To Our Website</h1>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="formFieldDouble">
                                    <div className="formField">
                                        <input
                                            type="text"
                                            {...register("nom")}
                                            className="form-control"
                                            placeholder="First Name"
                                        />
                                        <p className="error">{errors.nom?.message}</p>
                                    </div>
                                    <div className="formField">
                                        <input
                                            type="text"
                                            {...register("prenom")}
                                            className="form-control"
                                            placeholder="Last Name"
                                        />
                                        <p className="error">{errors.prenom?.message}</p>
                                    </div>
                                </div>
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
                                <div className="formField">
                                    <input
                                        type="password"
                                        {...register("passwordConfirm")}
                                        className="form-control"
                                        placeholder="••••••••"
                                    />
                                    <p className="error">{errors.passwordConfirm?.message}</p>
                                </div>
                                <div className="formField">
                                    <input
                                        type="text"
                                        {...register("adr")}
                                        className="form-control"
                                        placeholder="Your Address"
                                    />
                                    <p className="error">{errors.adr?.message}</p>
                                </div>
                                <div className="formFieldDouble">
                                    <div className="formField">
                                        <input
                                            type="number"
                                            {...register("taille")}
                                            className="form-control"
                                            placeholder="Your Length"
                                        />
                                        <p className="error">{errors.taille?.message}</p>
                                    </div>
                                    <div className="formField">
                                        <input
                                            type="number"
                                            {...register("pods")}
                                            className="form-control"
                                            placeholder="Your Weight"
                                        />
                                        <p className="error">{errors.pods?.message}</p>
                                    </div>
                                </div>
                                <div className="btnSubimtForm">
                                    <input
                                        type="submit"
                                        value={loading ? "Submitting..." : "Sign Up"}
                                        disabled={loading}
                                    />
                                </div>
                                {error && <p className="error">{error}</p>}
                                <div className="signUpNav">
                                    <p>
                                        Already Have An Account?{" "}
                                        <a onClick={() => navigate("/signin")}>Sign In</a>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="right">
                        <img src="/assets/images/bgSignUP.jpg" alt="Sign Up Background" />
                        <div className="contentRight">
                            <h1>
                                Find Your Coach in <span>N7Bk W7CH</span>
                            </h1>
                            <p>Get Fit And Always Remember (Bch Tradhi Loumima)</p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default SignUpClient;
