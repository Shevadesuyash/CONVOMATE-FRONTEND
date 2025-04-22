import React, { useState, useEffect, useRef } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import '../../assets/css/style.css';

const VoiceToTextSection = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const conversationRef = useRef(null);

  useEffect(() => {
    const loadVoices = () => {
      const allVoices = window.speechSynthesis.getVoices();
      const googleVoices = allVoices.filter((voice) =>
        voice.name.toLowerCase().includes('google')
      );
      setVoices(googleVoices);
      if (googleVoices.length > 0) {
        setSelectedVoice(googleVoices[0]);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  useEffect(() => {
    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  }, [messages]);

  const handleVoiceInput = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    let timeout;
    recognition.onresult = (event) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        recognition.stop();
        setIsListening(false);
      }, 5000);

      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }

      setInputText((prevText) => (prevText ? `${prevText} ${transcript}` : transcript));
    };

    recognition.onerror = (event) => {
      console.error('Error in recognition:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);

    recognition.start();
    setIsListening(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      const userMessage = { text: inputText, sender: 'user' };
      setMessages((prev) => [...prev, userMessage]);
      setInputText('');

      setTimeout(() => {
        const botReply = {
          text: `You said: "${userMessage.text}"`,
          sender: 'bot',
        };
        setMessages((prev) => [...prev, botReply]);
      }, 1000);
    }
  };

  const handleTextToSpeech = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.voice = selectedVoice;
    synth.speak(utterance);
  };

  return (
    <div className="chatbot-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>Voice-to-Text Chat</h2>

      <div id="chatbot" style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '20px', backgroundColor: '#fdfdfd' }}>

        {/* Conversation Box */}
        <div
          id="conversation"
          ref={conversationRef}
          style={{
            height: '400px',
            overflowY: 'auto',
            padding: '10px',
            border: '1px solid #ddd',
            background: '#fff',
            borderRadius: '8px',
            marginBottom: '10px'
          }}
        >
          {messages.map((message, index) => (
            <div key={index} className={`chatbot-message ${message.sender}`} style={{
              display: 'flex',
              justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
              marginBottom: '10px'
            }}>
              <div style={{
                backgroundColor: message.sender === 'user' ? '#007bff' : '#e9ecef',
                color: message.sender === 'user' ? '#fff' : '#000',
                padding: '10px 15px',
                borderRadius: '20px',
                maxWidth: '70%',
                position: 'relative'
              }}>
                <p style={{ margin: 0 }}>{message.text}</p>
                <button
                  className="speaker-button"
                  onClick={() => handleTextToSpeech(message.text)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    position: 'absolute',
                    bottom: '5px',
                    right: '10px',
                    cursor: 'pointer',
                    color: message.sender === 'user' ? '#fff' : '#000'
                  }}
                >
                  <i className="fa fa-volume-up"></i>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Input form */}
        <form id="input-form" onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            id="input-field"
            type="text"
            placeholder="Type your message here"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            style={{
              flexGrow: 1,
              padding: '10px',
              borderRadius: '20px',
              border: '1px solid #ccc',
              outline: 'none'
            }}
          />

          <button
            id="voice-recorder"
            type="button"
            onClick={handleVoiceInput}
            disabled={isListening}
            style={{
              backgroundColor: '#007bff',
              border: 'none',
              color: '#fff',
              padding: '10px 15px',
              borderRadius: '50%',
              cursor: 'pointer'
            }}
          >
            <i className={`fa ${isListening ? 'fa-microphone-slash' : 'fa-microphone'}`}></i>
          </button>

          <button
            id="submit-button"
            type="submit"
            style={{
              backgroundColor: '#007bff',
              border: 'none',
              color: '#fff',
              padding: '10px 15px',
              borderRadius: '50%',
              cursor: 'pointer'
            }}
          >
            <i className="fa fa-paper-plane"></i>
          </button>

          {/* Voice selector after send button */}
          <select
            title="Select Voice"
            value={selectedVoice ? selectedVoice.name : ''}
            onChange={(e) => {
              const voice = voices.find((v) => v.name === e.target.value);
              setSelectedVoice(voice);
            }}
            style={{
              padding: '6px 8px',
              borderRadius: '10px',
              fontSize: '0.85rem',
              border: '1px solid #ccc',
              maxWidth: '180px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {voices.map((voice) => (
              <option key={voice.name} value={voice.name}>
                {voice.name}
              </option>
            ))}
          </select>
        </form>
      </div>
    </div>
  );
};

export default VoiceToTextSection;
