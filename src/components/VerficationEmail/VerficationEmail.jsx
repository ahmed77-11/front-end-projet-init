import  { useState } from 'react';
import './VerficationEmail.scss';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const VerificationEmail = () => {
    const [formData, setFormData] = useState({ email: '', code: '' });
    const [message, setMessage] = useState('');
    const [loading,setLoading]=useState(false);
    const [error, setError] = useState('');
    const navigate=useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setError('');
    };

    const handleVerifyCode = async () => {
        if (formData.code.trim() === '') {
            setError('Please enter the verification code.');
            return;
        }

        try{
            setLoading(true);
            const res=await axios.post("http://localhost:3000/api/auth/verifEmail",formData, {
                headers:
                    {"Content-Type":"application/json",},
                withCredentials:true
            });
            if(!res.data){
                throw new Error("Verification failed");
            }
            setFormData({});
            setMessage("Verification successful");
            navigate("/dashboard");
            setLoading(false)
        }catch (error){
            setError(error.message);
            console.error("Error:",error);
            setLoading(false);

        }
    };

    const handleResendCode = () => {
        setMessage('Verification code has been resent. Please check your email!');
    };

    return (
        <div className="verify-email-container">
            {loading && <div className="loader">loading</div>}
            <div className="verify-email-card">
                <h2 className="title">Verify Your Email</h2>
                <p className="description">
                    Enter the verification code sent to your email.
                </p>
                <input
                    type="email"
                    name="email"
                    className="code-input"
                    placeholder="Enter Your Email"
                    value={formData.email}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="code"
                    className="code-input"
                    placeholder="Enter verification code"
                    value={formData.code}
                    onChange={handleInputChange}
                />
                {error && <p className="error-message">{error}</p>}
                {message && <p className="success-message">{message}</p>}
                <div className="buttonsVerif">
                    <button className="verify-button" onClick={handleVerifyCode}>
                        Verify Code
                    </button>
                    <button className="resend-button" onClick={handleResendCode}>
                        Resend Code
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VerificationEmail;
