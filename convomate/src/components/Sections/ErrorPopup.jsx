import React from "react";

const ErrorPopup = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <>
      <style>{`
        .error-popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
        }

        .error-popup {
          background: white;
          padding: 20px 30px;
          border-radius: 10px;
          max-width: 400px;
          text-align: center;
          box-shadow: 0 0 20px rgba(0,0,0,0.3);
        }

        .error-popup button {
          margin-top: 15px;
          background-color: #dc3545;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 8px;
          cursor: pointer;
        }

        .error-popup button:hover {
          background-color: #c82333;
        }
      `}</style>

      <div className="error-popup-overlay">
        <div className="error-popup">
          <h3>⚠️ Something went wrong</h3>
          <p>{message}</p>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </>
  );
};

export default ErrorPopup;
