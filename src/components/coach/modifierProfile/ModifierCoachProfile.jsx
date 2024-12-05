import  { useRef } from "react";
import ReactQuill from "react-quill";
import "./modifierCoachProfile.css";
import {useDispatch, useSelector} from "react-redux";
import {updateCoachData, updateCoachDataFailure} from "../../../redux/user/userSlice.js";
import {useNavigate} from "react-router-dom";

const ModifierCoachProfile = () => {
    const { current } = useSelector((state) => state.user);
    const dispatch=useDispatch();
    const navigate=useNavigate();

    // Refs to manage form inputs
    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const emailRef = useRef(null);
    const descriptionRef = useRef(current.coach.description || "");
    const photoRef = useRef(null);
    const cvRef = useRef(null);
    const diplomaRef = useRef(null);

    // Function to handle ReactQuill changes
    const handleQuillChange = (value) => {
        descriptionRef.current = value; // Update the ref value
    };

    const handleSubmit =async (e) => {
        e.preventDefault();

        // Collect data from refs
        const formData = {
            nom: firstNameRef.current.value,
            prenom: lastNameRef.current.value,
            email: emailRef.current.value,
            description: descriptionRef.current,
            photo: photoRef.current.files[0],
            cv: cvRef.current.files[0],
            diplome: diplomaRef.current.files[0],
        };
        try{
            await dispatch(updateCoachData(formData,navigate));


        }catch (err){
            console.error("Error during sign-in:",err);
            dispatch(updateCoachDataFailure(err.message));
        }

        console.log("Form submitted:", formData);
    };

    return (
        <div className="container">
            <h1>Modifier Profil Coach</h1>
            <form className="profile-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="first-name">Prénom :</label>
                    <input
                        type="text"
                        id="first-name"
                        name="firstName"
                        ref={firstNameRef}
                        defaultValue={current.nom}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="last-name">Nom :</label>
                    <input
                        type="text"
                        id="last-name"
                        name="lastName"
                        ref={lastNameRef}
                        defaultValue={current.prenom}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email :</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        ref={emailRef}
                        defaultValue={current.email}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description :</label>
                    <div style={{ width: "100%" }}>
                        <ReactQuill
                            value={descriptionRef.current}
                            onChange={handleQuillChange}
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
                                marginBottom: "30px",
                            }}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="photo">Photo de Profil :</label>
                    <input type="file" id="photo" name="photo" ref={photoRef} />
                </div>
                <div className="form-group">
                    <label htmlFor="cv">Ajouter CV :</label>
                    <input type="file" id="cv" name="cv" ref={cvRef} accept=".pdf, .doc, .docx" />
                </div>
                <div className="form-group">
                    <label htmlFor="diploma">Ajouter Diplôme :</label>
                    <input type="file" id="diploma" name="diploma" ref={diplomaRef} accept=".pdf, .jpg, .png" />
                </div>
                <div>
                    <button className="submit-btn" type="submit">
                        Modifier
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ModifierCoachProfile;
