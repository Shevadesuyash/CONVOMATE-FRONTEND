import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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
    <section id="intro">
      <div className="intro-content">
        <form onSubmit={handleSubmit}>
          <div className="container text-right" style={{ maxWidth: '400px', margin: '0 auto' }}>
            <h1 className="text-primary" style={{ padding: '25px' }}>Registration</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="form-group">
              <label htmlFor="username"><b>Username</b></label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="form-control"
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="name"><b>Name</b></label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="form-control"
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email"><b>Email</b></label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-control"
                disabled={loading}
              />
            </div>
            <div className="form-group text-center">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Registering...' : 'Register'}
              </button>
            </div>
            <div className="text-center mt-2">
              <span>Already registered? <a href="/login">Login here</a></span>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RegisterPage;