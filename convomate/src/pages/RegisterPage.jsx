import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import bgImage from "../assets/img/intro-carousel/bg1.jpg";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const { register, error, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !name || !email) {
      setPopupMessage("All fields are required.");
      return;
    }

    try {
      await register(username, name, email);
      setPopupMessage("Successfully registered! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000); // wait 2 seconds before redirect
    } catch (err) {
      console.error("Registration failed:", err);
      setPopupMessage(error || "Registration failed.");
    }
  };

  return (
    <div style={styles.container}>
      {/* Central popup message */}
      {popupMessage && (
        <div style={styles.popup}>
          <p style={styles.popupText}>{popupMessage}</p>
        </div>
      )}

      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Registration</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Username Field */}
          <div style={styles.inputGroup}>
            <label htmlFor="username" style={styles.label}>
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
              style={styles.input}
            />
          </div>

          {/* Name Field */}
          <div style={styles.inputGroup}>
            <label htmlFor="name" style={styles.label}>
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}
              style={styles.input}
            />
          </div>

          {/* Email Field */}
          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              style={styles.input}
            />
          </div>

          {/* Register Button */}
          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Registering..." : "Register"}
          </button>

          <p style={styles.registerText}>
            Already registered?{" "}
            <a href="/login" style={styles.link}>
              Login here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

/* Styles */
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "relative",
  },
  popup: {
    position: "absolute",
    top: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "#f44336",
    color: "white",
    padding: "10px 20px",
    borderRadius: "8px",
    zIndex: 1000,
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
    fontWeight: "bold",
  },
  popupText: {
    margin: 0,
  },
  formContainer: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "400px",
    display: "flex",
    flexDirection: "column",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "20px",
    color: "#5DDAB4",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  inputGroup: {
    marginBottom: "20px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "bold",
    marginBottom: "8px",
    display: "block",
  },
  input: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    marginTop: "5px",
  },
  button: {
    padding: "12px",
    backgroundColor: "#033452",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "15px",
  },
  registerText: {
    textAlign: "center",
    marginTop: "20px",
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default RegisterPage;
