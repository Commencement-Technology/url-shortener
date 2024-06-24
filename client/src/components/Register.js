import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.register(name, email, password);

      if (response) {
        navigate("/login");
      }
    } catch (err) {
      setError("Error during registration");
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "300px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Register</h2>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <div style={{ marginBottom: "15px" }}>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            />
          </div>
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#007BFF",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Register
          </button>
        </form>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        <div style={{ marginTop: "10px", textAlign: "center" }}>
          <span>Already have an account? </span>
          <button
            onClick={handleLogin}
            style={{
              background: "none",
              border: "none",
              color: "#007BFF",
              textDecoration: "underline",
              cursor: "pointer",
              padding: "0",
              fontSize: "inherit",
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
