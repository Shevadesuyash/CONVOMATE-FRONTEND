import React, { useState, useEffect, useRef } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import '../../assets/css/style.css';
import api from '../../api';
import VoiceInput from './VoiceInput';
import { loadVoices, getDefaultVoice } from './voiceUtils';
import ErrorPopup from './ErrorPopup';

const ChatbotSection = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [conversationStarted, setConversationStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const conversationRef = useRef(null);

  useEffect(() => {
    const initializeVoices = async () => {
      const loadedVoices = await loadVoices();
      setVoices(loadedVoices);
      setSelectedVoice(getDefaultVoice(loadedVoices));
    };
    initializeVoices();
  }, []);

  useEffect(() => {
    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  }, [messages]);

  const handleVoiceResult = (transcript) => {
    setInputText((prevText) => prevText + (prevText ? ' ' : '') + transcript);
  };

  const handleClearInput = () => {
    setInputText('');
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
      setError('Failed to start conversation. Please try again.');
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
        if (response.is_corrected) {
          setMessages(prev => [
            ...prev,
            { text: `Correction: ${response.corrected_text}`, sender: 'bot', isCorrection: true }
          ]);
        }

        if (response.compliment) {
          setMessages(prev => [
            ...prev,
            { text: response.compliment, sender: 'bot', isCompliment: true }
          ]);
        }

        if (response.next_question) {
          setMessages(prev => [
            ...prev,
            { text: response.next_question, sender: 'bot' }
          ]);
        }
      }
    } catch (error) {
      console.error('Error in chat:', error);
      setMessages(prev => [
        ...prev,
        { text: 'Sorry, there was an error processing your message.', sender: 'bot', isError: true }
      ]);
      setError('An error occurred while sending your message.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTextToSpeech = (text) => {
    if (!selectedVoice) return;

    const synth = window.speechSynthesis;
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoice;
    utterance.lang = 'en-US';
    synth.speak(utterance);
  };

  const handleClosePopup = () => {
    setError('');
  };

  return (
    <div className="chatbot-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', width:'75%' }}>Chat-bot Chat</h2>

      {error && <ErrorPopup message={error} onClose={handleClosePopup} />}

      <div id="chatbot" style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '20px', backgroundColor: '#fdfdfd' }}>
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
            <div className="start-conversation-prompt" style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
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
              <div className={`message-bubble ${message.sender}
                                  ${message.isCorrection ? 'correction' : ''}
                                  ${message.isCompliment ? 'compliment' : ''}
                                  ${message.isError ? 'error' : ''}`}>
                <p style={{
                  margin: 0,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  display: 'inline'
                }}>
                  {Array.isArray(message.text) ? message.text.join('') : String(message.text)}
                </p>

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

            <VoiceInput
              onResult={handleVoiceResult}
              disabled={isLoading}
              buttonStyle={{ marginRight: '8px' }}
            />

            <button
              type="button"
              onClick={handleClearInput}
              disabled={isLoading}
              className="clear-button"
              style={{
                backgroundColor: '#6c757d',
                border: 'none',
                color: '#fff',
                padding: '10px 15px',
                borderRadius: '5px',
                cursor: 'pointer',
                marginRight: '8px',
              }}
            >
              Clear
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
                  {voice.name} ({voice.lang})
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