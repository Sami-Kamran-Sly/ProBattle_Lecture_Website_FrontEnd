import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [answer, setAnswer] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${API_BASE_URL}/api/v1/auth/forgot-password`, {
                email,
                answer,
                currentPassword,
                newPassword,
                confirmPassword,
            });

            if (res && res.data.success) {
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
                <h3 className="text-center mb-3">Reset Password</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Email Address</label>
                        <input
                            type="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Security Question</label>
                        <input
                            type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="form-control"
                            placeholder="Enter your favorite sport name"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Current Password</label>
                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="form-control"
                            placeholder="Enter current password"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">New Password</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="form-control"
                            placeholder="Enter new password"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Confirm New Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="form-control"
                            placeholder="Confirm new password"
                            required
                        />
                    </div>
                    <button type="submit" className=" btn text-white button-css w-100">
                Reset Password
            </button>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;
