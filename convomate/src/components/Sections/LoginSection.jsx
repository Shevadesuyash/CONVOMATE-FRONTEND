import React from 'react';
import bgImage from '../../assets/img/intro-carousel/bg1.jpg';

const LoginSection = ({
  email,
  setEmail,
  otp,
  setOtp,
  otpSent,
  timer,
  error,
  loading,
  handleGenerateOtp,
  handleResendOtp,
  handleSubmit,
}) => {
  return (
    <div style={styles.container}>
      {/* Central Error Popup */}
      {error && (
        <div style={styles.popup}>
          <p style={styles.popupText}>{error}</p>
        </div>
      )}

      <div style={styles.formContainer}>
        <div style={styles.headingContainer}>
          <h2 style={styles.heading}>Login</h2>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Email Input */}
          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              style={styles.input}
            />
          </div>

          {/* Send OTP Button */}
          {!otpSent && (
            <button
              type="button"
              onClick={handleGenerateOtp}
              disabled={loading}
              style={styles.button}
            >
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
          )}

          {/* OTP Input and Buttons */}
          {otpSent && (
            <>
              <div style={styles.inputGroup}>
                <label htmlFor="otp" style={styles.label}>OTP</label>
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  disabled={loading}
                  style={styles.input}
                />
              </div>

              <button
                type="button"
                onClick={handleResendOtp}
                disabled={timer > 0 || loading}
                style={{ ...styles.button, backgroundColor: '#6c757d', marginTop: '10px' }}
              >
                Resend OTP {timer > 0 ? `(${timer}s)` : ''}
              </button>

              <button
                type="submit"
                disabled={loading}
                style={{ ...styles.button, marginTop: '10px' }}
              >
                {loading ? 'Submitting...' : 'Submit OTP'}
              </button>
            </>
          )}

          <p style={styles.registerText}>
            Not registered? <a href="/register" style={styles.link}>Register/Signup here</a>
          </p>
        </form>
      </div>
    </div>
  );
};

/* Styles */
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: `url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
  },
  popup: {
    position: 'absolute',
    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#f44336',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '8px',
    zIndex: 1000,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
    fontWeight: 'bold',
  },
  popupText: {
    margin: 0,
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
  headingContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginBottom: '20px',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#5DDAB4',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  label: {
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '8px',
    display: 'block',
  },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    marginTop: '5px',
  },
  button: {
    padding: '12px',
    backgroundColor: '#033452',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '15px',
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
};

export default LoginSection;
