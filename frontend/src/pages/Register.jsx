import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await api.post("/auth/register", {
        username,
        password,
        role,
      });

      setSuccess("Registration successful! Redirecting to login...");

      setUsername("");
      setPassword("");
      setRole("employee");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">

      <div className="register-card">

        <h1>Create Account</h1>

        <p>Cloud ERP Inventory Management System</p>

        <form onSubmit={handleRegister}>

          {/* Username */}
          <div className="form-group">
            <label>Username</label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>


          {/* Password */}
          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>


          {/* Role */}
          <div className="form-group">
            <label>Role</label>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
          </div>


          {/* Error */}
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}


          {/* Success */}
          {success && (
            <div className="success-message">
              {success}
            </div>
          )}


          {/* Register button */}
          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

        </form>


        {/* Login link */}
        <p>
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Register;