import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContextInfo";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const { auth, SetAuth } = useAuthContext();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${API_BASE_URL}api/v1/auth/login`, {
                email,
                password,
            });

            if (res && res.data.success) {
                SetAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
                localStorage.setItem("auth", JSON.stringify(res.data));
                navigate(location.state || "/home");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
                <h3 className="text-center mb-3">Login</h3>
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
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-control"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <a href="/forgot-password" className="text-primary">
                            Change Password
                        </a>
                    </div>
                    <button type="submit" className=" btn text-white button-css w-100">
                Login
            </button>
                </form>
                <p className="text-center mt-3">
                    Don't have an account?{" "}
                    <a href="/register" className="text-primary">
                        Register here
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
