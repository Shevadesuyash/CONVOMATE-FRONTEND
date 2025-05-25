// convomate/src/components/Sections/VoiceInput.jsx
import React, { useState, useEffect } from "react";
import "font-awesome/css/font-awesome.min.css";

const VoiceInput = ({
  onResult,
  language = "en-US",
  buttonStyle = {},
  disabled = false,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognizer = new SpeechRecognition();
      recognizer.continuous = false;
      recognizer.interimResults = false;
      recognizer.lang = language;
      setRecognition(recognizer);

      recognizer.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
        setIsListening(false);
      };

      recognizer.onerror = (event) => {
        console.error("Voice input error:", event.error);
        setIsListening(false);
      };

      recognizer.onend = () => {
        if (isListening) setIsListening(false);
      };
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [language, onResult]);

  const startListening = () => {
    if (!recognition || disabled) return;
    recognition.start();
    setIsListening(true);
  };

  const stopListening = () => {
    if (recognition && isListening) {
      recognition.stop();
      setIsListening(false);
    }
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {!isListening ? (
        <button
          type="button"
          onClick={startListening}
          disabled={!recognition || disabled}
          style={{
            backgroundColor: "#007bff",
            border: "none",
            color: "#fff",
            padding: "10px 15px",
            borderRadius: "50%",
            cursor: "pointer",
            ...buttonStyle,
          }}
          title="Start voice input"
        >
          <i className="fa fa-microphone"></i>
        </button>
      ) : (
        <button
          type="button"
          onClick={stopListening}
          style={{
            backgroundColor: "#dc3545",
            border: "none",
            color: "#fff",
            padding: "10px 15px",
            borderRadius: "50%",
            cursor: "pointer",
            ...buttonStyle,
          }}
          title="Stop listening"
        >
          <i className="fa fa-microphone-slash"></i>
        </button>
      )}
      {isListening && (
        <span
          style={{
            position: "absolute",
            top: "-5px",
            right: "-5px",
            width: "10px",
            height: "10px",
            backgroundColor: "red",
            borderRadius: "50%",
            animation: "pulse 1.5s infinite",
          }}
        ></span>
      )}
    </div>
  );
};

export default VoiceInput;
