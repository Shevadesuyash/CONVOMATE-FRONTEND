import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import bgImage from '../assets/img/intro-carousel/bg1.jpg';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { register, error, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !name || !email) {
      return;
    }
    try {
      await register(username, name, email);
      navigate('/'); // Redirect to home after registration (since it logs in automatically)
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        {/* Heading */}
        <h2 style={styles.heading}>Registration</h2>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Username Field */}
          <div style={styles.inputGroup}>
            <label htmlFor="username" style={styles.label}>Username</label>
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
            <label htmlFor="name" style={styles.label}>Name</label>
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
            <label htmlFor="email" style={styles.label}>Email</label>
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
          <button
            type="submit"
            disabled={loading}
            style={styles.button}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>

          {/* Already registered? */}
          <p style={styles.registerText}>
            Already registered? <a href="/login" style={styles.link}>Login here</a>
          </p>
        </form>
      </div>
    </div>
  );
};

/* INLINE CSS STYLES */
const styles = {
  container: {
    display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundImage: `url(${bgImage})`, // ✅ Use imported image
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
  },
  formContainer: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '400px',
    display: 'flex',
    flexDirection: 'column',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '20px',
    color:'#5DDAB4',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '20px', // Increased spacing between fields
  },
  label: {
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '8px', // Added gap between label and input
    display: 'block',
  },
  input: {
    width: '100%',
    padding: '12px', // Increased padding inside input
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    marginTop: '5px', // Extra gap after label
  },
  button: {
    padding: '12px',
    backgroundColor: '#033452',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '15px', // More space above button
  },
  registerText: {
    textAlign: 'center',
    marginTop: '20px',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: '10px',
  },
};

export default RegisterPage;
