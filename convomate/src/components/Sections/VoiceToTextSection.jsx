import React, { useState, useEffect } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import '../../assets/css/style.css';

const VoiceToTextSection = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [voices, setVoices] = useState([]); // Available voices
  const [selectedVoice, setSelectedVoice] = useState(null); // Selected voice

  // Load available voices
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0) {
        setSelectedVoice(availableVoices[0]); // Set default voice
      }
    };

    // Load voices when the component mounts
    loadVoices();

    // Add event listener for when voices are loaded
    window.speechSynthesis.onvoiceschanged = loadVoices;

    // Cleanup event listener
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  // Function to handle voice input
  const handleVoiceInput = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.start();
    setIsListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Error occurred in recognition:', event.error);
      setIsListening(false);
    };
  };

  // Function to handle text submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      setMessages([...messages, { text: inputText, sender: 'user' }]);
      setInputText('');
    }
  };

  // Function to handle text-to-speech
  const handleTextToSpeech = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US'; // Set language
    utterance.voice = selectedVoice; // Set selected voice
    synth.speak(utterance);
  };

  return (
    <div className="chatbot-container">
      <div id="header">
        <h2>Voice-to-Text Chat</h2>
        <div className="voice-selection">
          <label htmlFor="voice-select">Select Voice:</label>
          <select
            id="voice-select"
            value={selectedVoice ? selectedVoice.name : ''}
            onChange={(e) => {
              const voice = voices.find((v) => v.name === e.target.value);
              setSelectedVoice(voice);
            }}
          >
            {voices.map((voice) => (
              <option key={voice.name} value={voice.name}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>
        </div>
      </div>
      <div id="chatbot">
        <div id="conversation">
          {messages.map((message, index) => (
            <div key={index} className={`chatbot-message ${message.sender}`}>
              <p className="chatbot-text">{message.text}</p>
              <button
                className="speaker-button"
                onClick={() => handleTextToSpeech(message.text)}
              >
                <i className="fa fa-volume-up"></i>
              </button>
            </div>
          ))}
        </div>
        <form id="input-form" onSubmit={handleSubmit}>
          <div className="message-container">
            <input
              id="input-field"
              type="text"
              placeholder="Type your message here"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button
              id="voice-recorder"
              type="button"
              onClick={handleVoiceInput}
              disabled={isListening}
            >
              <i className={`fa ${isListening ? 'fa-microphone-slash' : 'fa-microphone'}`}></i>
            </button>
            <button id="submit-button" type="submit">
              <i className="fa fa-paper-plane"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VoiceToTextSection;