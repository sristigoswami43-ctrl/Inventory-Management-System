import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", {
        username,
        password,
      });

      console.log("Login response:", response.data);

      const token = response.data.token;

      if (!token) {
        setError("Login successful, but no token was received.");
        return;
      }

      // Save JWT token
      localStorage.setItem("token", token);

      // Go to dashboard
      navigate("/dashboard");

    } catch (error) {
      console.error("Login error:", error);

      setError(
        error.response?.data?.message ||
        "Login failed. Please check your username and password."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <h1>Cloud ERP</h1>

        <p>Inventory Management System</p>

        <h2>Login</h2>

        <form onSubmit={handleLogin}>

          {/* Username */}
          <div className="form-group">

            <label htmlFor="username">
              Username
            </label>

            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />

          </div>


          {/* Password */}
          <div className="form-group">

            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />

          </div>


          {/* Error message */}
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}


          {/* Login button */}
          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>


        {/* Register link */}
        <p>
          Don't have an account?{" "}

          <Link to="/register">
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;