import React, { useState } from 'react'


import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();
  const handleSubmit = async(e)=>{
    e.preventDefault()

    try {
      const res = await axios.post(`${API_BASE_URL}/api/v1/auth/register`, {
        name,
        email,
        password,
        answer,
      });
      console.log(res)

      if(res && res.data.success){
        navigate("/login");
      
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (

    <div className="container d-flex justify-content-center align-items-center vh-100">
    <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-3">Register</h3>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    placeholder="Enter your name"
                    required
                    autoFocus
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Email Address</label>
                <input
                    type="email"
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
            <div className="mb-3">
                <label className="form-label">Security Question</label>
                <input
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="form-control"
                    placeholder="What is your favorite sport?"
                    required
                />
            </div>
            <button type="submit" className=" btn text-white button-css w-100">
                Register
            </button>
        </form>
        <p className="text-center mt-3">
            Already have an account? <a href="/login" className="text-primary">Login</a>
        </p>
    </div>
</div>
  )
}

export default Register
