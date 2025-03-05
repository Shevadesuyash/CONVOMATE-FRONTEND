import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(30);
  const { generateOtp, login, error, loading } = useAuth();
  const navigate = useNavigate();

  const handleGenerateOtp = async (e) => {
    e.preventDefault();
    try {
      await generateOtp(email);
      setOtpSent(true);
      setTimer(30); // Reset timer
    } catch (err) {
      console.error('OTP generation failed:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp) {
      return;
    }
    try {
      await login(email, otp);
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  const handleResendOtp = async () => {
    try {
      await generateOtp(email);
      setTimer(30); // Reset timer
    } catch (err) {
      console.error('OTP resend failed:', err);
    }
  };

  useEffect(() => {
    if (otpSent && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [otpSent, timer]);

  return (
    <section id="intro">
      <div className="intro-content">
        <form onSubmit={handleSubmit}>
          <div className="container" style={{ maxWidth: '400px', margin: '0 auto' }}>
            <h1 className="text-primary text-center mb-4" style={{ fontWeight: 700 }}>Login</h1>
            {error && <div className="alert alert-danger">{error}</div>}
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
            {otpSent && (
              <div className="form-group">
                <label htmlFor="otp"><b>OTP</b></label>
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  className="form-control"
                  disabled={loading}
                />
              </div>
            )}
            {!otpSent && (
              <div className="form-group text-center">
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  onClick={handleGenerateOtp}
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send OTP'}
                </button>
              </div>
            )}
            {otpSent && (
              <>
                <div className="form-group text-center">
                  <button
                    type="button"
                    className="btn btn-secondary btn-block"
                    onClick={handleResendOtp}
                    disabled={timer > 0 || loading}
                  >
                    Resend OTP {timer > 0 ? `(${timer}s)` : ''}
                  </button>
                </div>
                <div className="form-group text-center">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={loading}
                  >
                    {loading ? 'Submitting...' : 'Submit OTP'}
                  </button>
                </div>
              </>
            )}
            <div className="text-center mt-2">
              <span>Not registered? <a href="/register">Register/Signup here</a></span>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;