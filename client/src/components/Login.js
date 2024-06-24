import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login(email, password);
      const token = response.token;
      console.log(`token: ${token}`);
      localStorage.setItem("token", token);
      const userResponse = await authService.getUser(token);
      const user = userResponse.user;
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/home");
    } catch (err) {
      console.log(err);
      setError("Invalid credentials");
    }
  };

  const handleRegister = () => {
    navigate("/register");
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
        <h2 style={{ textAlign: "center" }}>Login</h2>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
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
            Login
          </button>
        </form>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        <div style={{ marginTop: "10px", textAlign: "center" }}>
          <span>Don't have an account? </span>
          <button
            onClick={handleRegister}
            style={{
              background: "none",
              border: "none",
              color: "#007BFF",
              textDecoration: "underline",
              cursor: "pointer",
              padding: "0",
            }}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
