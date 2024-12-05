import { CiDumbbell } from "react-icons/ci";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./signUpCoach.scss";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUpCoach, signUpCoachFailure } from "../../../redux/user/userSlice.js";

const SignUpCoach = () => {
    const [description, setDescription] = useState("");
    const [descriptionError, setDescriptionError] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, error } = useSelector((state) => state.user);

    // Validation schema
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
        cv: Yup.mixed()
            .test("fileSize", "CV must be smaller than 5MB", (value) => {
                return value && value[0] && value[0].size <= 5 * 1024 * 1024;
            })
            .required("Upload your CV"),
        diplome: Yup.mixed()
            .test("fileSize", "diplome must be smaller than 5MB", (value) => {
                return value && value[0] && value[0].size <= 5 * 1024 * 1024;
            })
            .required("Upload your diplome"),
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const handleInputChange = (value) => {
        setDescription(value);
        if (value.trim() !== "") {
            setDescriptionError(false);
        }
    };

    const onSubmit = async (data) => {
        if (description.trim() === "") {
            setDescriptionError(true);
            return;
        }

        const payload = {
            ...data,
            description,
            cv: data.cv[0],
            diplome: data.diplome[0],
        };

        try {
            await dispatch(signUpCoach(payload, navigate));
            reset();
        } catch (err) {
            console.error("Error during sign-up:", err);
            dispatch(signUpCoachFailure(err.message));
        }
    };

    return (
        <div className="coachSU">
            {loading && <div className="loader">Loading...</div>}
            <div className="containerCoachSU">
                <div className="headerSuc">
                    <p>Sign Up and Start Coaching</p>
                    <div className="logo-su">
                        <h1>N7Bk W7CH</h1>
                        <span>
                            <CiDumbbell />
                        </span>
                    </div>
                </div>
                <div className="formSuCoach">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="formFieldDouble">
                            <div className="formField">
                                <input
                                    type="text"
                                    {...register("nom")}
                                    className={`form-control ${errors.nom ? "is-invalid" : ""}`}
                                    placeholder="First Name"
                                />
                                <p className="error">{errors.nom?.message}</p>
                            </div>
                            <div className="formField">
                                <input
                                    type="text"
                                    {...register("prenom")}
                                    className={`form-control ${errors.prenom ? "is-invalid" : ""}`}
                                    placeholder="Last Name"
                                />
                                <p className="error">{errors.prenom?.message}</p>
                            </div>
                        </div>
                        <div className="formField">
                            <input
                                type="text"
                                {...register("email")}
                                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                placeholder="example@gmail.com"
                            />
                            <p className="error">{errors.email?.message}</p>
                        </div>
                        <div className="formField">
                            <input
                                type="password"
                                {...register("password")}
                                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                                placeholder="Password"
                            />
                            <p className="error">{errors.password?.message}</p>
                        </div>
                        <div className="formField">
                            <input
                                type="password"
                                {...register("passwordConfirm")}
                                className={`form-control ${errors.passwordConfirm ? "is-invalid" : ""}`}
                                placeholder="Confirm Password"
                            />
                            <p className="error">{errors.passwordConfirm?.message}</p>
                        </div>
                        <div style={{width:"50%"}}>
                            <ReactQuill
                                value={description}
                                onChange={handleInputChange}
                                placeholder="Insert your course description."
                                modules={{
                                    toolbar: [
                                        ["bold", "italic", "underline"],
                                        [{ list: "ordered" }, { list: "bullet" }],
                                    ],
                                }}
                                style={{
                                    height: "200px",
                                    width: "100%",
                                    marginBottom: "10px",
                                }}
                            />
                            {descriptionError && <p className="error">Course description is required</p>}
                        </div>
                        <div className="uploadDouble">
                            <div className="formField1">
                                <label htmlFor="cv">Upload Your CV</label>
                                <input
                                    type="file"
                                    {...register("cv")}
                                    id="cv"
                                    className={`form-control ${errors.cv ? "is-invalid" : ""}`}
                                />
                                <p className="error">{errors.cv?.message}</p>
                            </div>
                            <div className="formField1">
                                <label htmlFor="diplome">Upload Your diplome</label>
                                <input
                                    type="file"
                                    {...register("diplome")}
                                    id="diplome"
                                    className={`form-control ${errors.diplome ? "is-invalid" : ""}`}
                                />
                                <p className="error">{errors.diplome?.message}</p>
                            </div>
                        </div>
                        <div className="btnSubmitForm">
                            <button type="submit" className="btn btn-primary">
                                Sign Up
                            </button>
                        </div>
                        {error && <p className="error">{error}</p>}
                        <div className="signUpNav">
                            <p>
                                Already Have An Account? <a href="/signin">Sign In</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUpCoach;
