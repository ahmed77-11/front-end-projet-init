import React, { useState } from 'react';
import './resetPassword.scss';

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
        setError('');
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setError('');
    };

    const handleResetPassword = () => {
        if (newPassword === '' || confirmPassword === '') {
            setError('Both fields are required.');
            return;
        }
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }
        if (newPassword.length < 8) {
            setError('Password should be at least 8 characters.');
            return;
        }

        // Simulate password reset logic
        setMessage('Password has been successfully reset.');
        setError('');
    };

    return (
        <div className="reset-password-container">
            <div className="reset-password-card">
                <h2 className="title">Reset Your Password</h2>
                <p className="description">Enter and confirm your new password.</p>
                <input
                    type="password"
                    className="password-input"
                    placeholder="New password"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                />
                <input
                    type="password"
                    className="password-input"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                />
                {error && <p className="error-message">{error}</p>}
                {message && <p className="success-message">{message}</p>}
                <div className="buttonsReset">
                    <button className="reset-button" onClick={handleResetPassword}>
                        Reset Password
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
