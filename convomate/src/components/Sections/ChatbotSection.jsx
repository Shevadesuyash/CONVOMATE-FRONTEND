import React, { useState, useEffect, useRef } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import '../../assets/css/style.css';
import api from '../../api';

const ChatbotSection = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [conversationStarted, setConversationStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  const startConversation = async () => {
    setIsLoading(true);
    try {
      const response = await api.startChat(
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` } }
      );

      if (response && response.next_question) {
        setMessages([{ text: response.next_question, sender: 'bot' }]);
        setConversationStarted(true);
      }
    } catch (error) {
      console.error('Error starting conversation:', error);
      setMessages([{ text: 'Failed to start conversation. Please try again.', sender: 'bot' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage = { text: inputText, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await api.chatWithBot(
        { message: inputText },
        { headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` } }
      );

      if (response) {
        // Show correction if needed
        if (response.is_corrected) {
          setMessages(prev => [
            ...prev,
            {
              text: `Correction: ${response.corrected_text}`,
              sender: 'bot',
              isCorrection: true
            }
          ]);
        }

        // Show compliment if available
        if (response.compliment) {
          setMessages(prev => [
            ...prev,
            {
              text: response.compliment,
              sender: 'bot',
              isCompliment: true
            }
          ]);
        }

        // Show next question
        if (response.next_question) {
          setMessages(prev => [
            ...prev,
            {
              text: response.next_question,
              sender: 'bot'
            }
          ]);
        }
      }
    } catch (error) {
      console.error('Error in chat:', error);
      setMessages(prev => [
        ...prev,
        {
          text: 'Sorry, there was an error processing your message.',
          sender: 'bot',
          isError: true
        }
      ]);
    } finally {
      setIsLoading(false);
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
      <h2 style={{ textAlign: 'center' }}>Chat-bot Chat</h2>

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
          {!conversationStarted && messages.length === 0 && (
            <div className="start-conversation-prompt" style={{
              textAlign: 'center',
              padding: '20px',
              color: '#666'
            }}>
              <p>Click "Start Conversation" to begin chatting with the bot</p>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={`chatbot-message ${message.sender}`}
              style={{
                display: 'flex',
                justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                marginBottom: '10px'
              }}
            >
              <div
                style={{
                  backgroundColor: message.isCorrection ? '#fff3cd' :
                                    message.isCompliment ? '#d4edda' :
                                    message.isError ? '#f8d7da' :
                                    message.sender === 'user' ? '#007bff' : '#e9ecef',
                  color: message.sender === 'user' ? '#fff' : '#000',
                  padding: '10px 15px',
                  borderRadius: '20px',
                  maxWidth: '70%',
                  position: 'relative',
                  border: message.isCorrection ? '1px solid #ffc107' :
                         message.isCompliment ? '1px solid #28a745' :
                         message.isError ? '1px solid #dc3545' : 'none'
                }}
              >
                <p style={{ margin: 0 }}>{message.text}</p>
                {message.sender === 'bot' && (
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
                      color: message.isCorrection ? '#ffc107' :
                            message.isCompliment ? '#28a745' :
                            message.isError ? '#dc3545' : '#000'
                    }}
                  >
                    <i className="fa fa-volume-up"></i>
                  </button>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div style={{ textAlign: 'center', padding: '10px' }}>
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        {!conversationStarted ? (
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={startConversation}
              disabled={isLoading}
              style={{
                backgroundColor: '#28a745',
                border: 'none',
                color: '#fff',
                padding: '10px 20px',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              {isLoading ? 'Starting...' : 'Start Conversation'}
            </button>
          </div>
        ) : (
          <form
            id="input-form"
            onSubmit={handleSubmit}
            style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}
          >
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
              disabled={isListening || isLoading}
              style={{
                backgroundColor: isListening ? '#dc3545' : '#007bff',
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
              disabled={isLoading}
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

            {/* Voice selector */}
            <select
              title="Select Voice"
              value={selectedVoice ? selectedVoice.name : ''}
              onChange={(e) => {
                const voice = voices.find((v) => v.name === e.target.value);
                setSelectedVoice(voice);
              }}
              disabled={isLoading}
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
        )}
      </div>
    </div>
  );
};

export default ChatbotSection;