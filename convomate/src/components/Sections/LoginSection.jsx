import React from 'react';
import bgImage from '../../assets/img/intro-carousel/bg1.jpg';
const LoginSection = ({
  email,
  setEmail,
  otp,
  setOtp,
  otpSent,
  error,
  loading,
  handleGenerateOtp,
  handleSubmit,
}) => {
  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        {/* Heading with Proper Alignment */}
        <div style={styles.headingContainer}>
          <h2 style={styles.heading}>Login</h2>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Email Section with More Spacing */}
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
          <button
            type="button"
            onClick={handleGenerateOtp}
            disabled={loading}
            style={styles.button}
          >
            {loading ? 'Sending...' : 'Send OTP'}
          </button>

          {/* OTP Input Field (Visible only after sending OTP) */}
          {otpSent && (
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
          )}

          {/* Registration Link */}
          <p style={styles.registerText}>
            Not registered? <a href="/register" style={styles.link}>Register/Signup here</a>
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
    backgroundImage: "url('/bg1.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      zIndex: 1,

  },
  headingContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginBottom: '20px',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    color:'#5DDAB4',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '20px', // ⬅ Increased spacing between fields
  },
  label: {
    fontSize: '14px',
    fontWeight: 'bold',
    marginBottom: '8px', // ⬅ Added gap between label and input
    display: 'block',
  },
  input: {
    width: '100%',
    padding: '12px', // ⬅ Increased padding inside input
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    marginTop: '5px', // ⬅ Extra gap after label
  },
  button: {
    padding: '12px',
    backgroundColor: '#033452',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '15px', // ⬅ More space above button
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

export default LoginSection;
