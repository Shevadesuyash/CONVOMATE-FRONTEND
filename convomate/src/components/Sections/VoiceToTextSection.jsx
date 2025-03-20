import React, { useState, useEffect } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import '../../assets/css/style.css';

const VoiceToTextSection = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  // Load available voices for text-to-speech
  useEffect(() => {
    const loadVoices = () => {
      const allVoices = window.speechSynthesis.getVoices();
      // Filter only Google voices
      const googleVoices = allVoices.filter((voice) =>
        voice.name.toLowerCase().includes('google')
      );
      setVoices(googleVoices);
      if (googleVoices.length > 0) {
        setSelectedVoice(googleVoices[0]);
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

  // Handle voice-to-text input
  const handleVoiceInput = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = true; // Keep listening
    recognition.interimResults = true; // Get real-time results
    recognition.lang = 'en-US';

    let timeout;
    recognition.onresult = (event) => {
      clearTimeout(timeout); // Reset timeout on new input
      timeout = setTimeout(() => {
        recognition.stop(); // Stop after 5 seconds of silence
        setIsListening(false);
      }, 5000); // 5 seconds

      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }

      // Append the new transcript to the existing inputText
      setInputText((prevText) => (prevText ? `${prevText} ${transcript}` : transcript));
    };

    recognition.onerror = (event) => {
      console.error('Error occurred in recognition:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
    setIsListening(true);
  };

  // Handle text submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      setMessages([...messages, { text: inputText, sender: 'user' }]);
      setInputText('');
    }
  };

  // Handle text-to-speech
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