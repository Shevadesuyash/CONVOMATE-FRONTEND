import React, { useState, useEffect } from 'react';
import api from '../../api';
import '../../assets/css/style.css';

// Language options (Top 50 common languages with their codes)
const languages = [
  { code: 'auto', label: 'Auto Detect' },
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'Hindi' },
  { code: 'es', label: 'Spanish' },
  { code: 'fr', label: 'French' },
  { code: 'de', label: 'German' },
  { code: 'zh-cn', label: 'Chinese (Simplified)' },
  { code: 'zh-tw', label: 'Chinese (Traditional)' },
  { code: 'ja', label: 'Japanese' },
  { code: 'ko', label: 'Korean' },
  { code: 'ru', label: 'Russian' },
  { code: 'ar', label: 'Arabic' },
  { code: 'pt', label: 'Portuguese' },
  { code: 'it', label: 'Italian' },
  { code: 'mr', label: 'Marathi' },
  { code: 'bn', label: 'Bengali' },
  { code: 'pa', label: 'Punjabi' },
  { code: 'gu', label: 'Gujarati' },
  { code: 'ur', label: 'Urdu' },
  { code: 'tr', label: 'Turkish' },
  { code: 'vi', label: 'Vietnamese' },
  { code: 'id', label: 'Indonesian' },
  { code: 'ms', label: 'Malay' },
  { code: 'ta', label: 'Tamil' },
  { code: 'te', label: 'Telugu' },
  { code: 'th', label: 'Thai' },
  { code: 'pl', label: 'Polish' },
  { code: 'nl', label: 'Dutch' },
  { code: 'sv', label: 'Swedish' },
  { code: 'fa', label: 'Persian' },
  { code: 'ro', label: 'Romanian' },
  { code: 'uk', label: 'Ukrainian' },
  { code: 'he', label: 'Hebrew' },
  { code: 'fi', label: 'Finnish' },
  { code: 'el', label: 'Greek' },
  { code: 'cs', label: 'Czech' },
  { code: 'hu', label: 'Hungarian' },
  { code: 'sr', label: 'Serbian' },
  { code: 'sk', label: 'Slovak' },
  { code: 'bg', label: 'Bulgarian' },
  { code: 'no', label: 'Norwegian' },
  { code: 'da', label: 'Danish' },
  { code: 'sw', label: 'Swahili' },
  { code: 'fil', label: 'Filipino' },
  { code: 'ne', label: 'Nepali' },
  { code: 'si', label: 'Sinhala' },
  { code: 'af', label: 'Afrikaans' },
];

const TranslationModule = () => {
  const [fromLanguage, setFromLanguage] = useState('auto');
  const [toLanguage, setToLanguage] = useState(null);
  const [textToTranslate, setTextToTranslate] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [error, setError] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [voices, setVoices] = useState([]); // Available voices for text-to-speech
  const [selectedVoice, setSelectedVoice] = useState(null); // Selected voice for text-to-speech

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

  // Handle Chat-bot input
  const handleVoiceInput = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = fromLanguage === 'auto' ? 'en-US' : fromLanguage; // Default to English if auto-detect
    recognition.interimResults = false;

    recognition.start();
    setIsListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setTextToTranslate(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Error occurred in recognition:', event.error);
      setIsListening(false);
    };
  };

  // Handle text-to-speech for translated text
  const handleTextToSpeech = () => {
    if (!translatedText) {
      setError('No translated text to speak.');
      return;
    }

    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(translatedText);
    utterance.lang = toLanguage; // Set language for TTS
    utterance.voice = selectedVoice; // Set selected voice
    synth.speak(utterance);
  };

  // Handle translation
  const handleTranslate = async () => {
    setError(null);
    if (!toLanguage) {
      setError('Please select the "To Language".');
      return;
    }
    try {
      const data = {
        from_language: fromLanguage,
        to_language: toLanguage,
        text_to_translate: textToTranslate,
      };
      console.log('Request Data:', data);
      const response = await api.translate(data);
      console.log('API Response:', response);
      if (response.error) {
        setError(response.error);
      } else if (response.translatedText) {
        setTranslatedText(response.translatedText);
      } else {
        setError('No translated text received from API.');
      }
    } catch (err) {
      setError('Translation failed. Please try again.');
      console.error('Error during translation:', err);
    }
  };

  return (
    <div id="translator">
      <h2>🌐 Language Translator</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        {/* From Language */}
        <label htmlFor="fromLanguage">From Language:</label>
        <input
          list="languages"
          value={fromLanguage}
          onChange={(e) => setFromLanguage(e.target.value)}
          placeholder="Type or select a language"
        />
        <datalist id="languages">
          {languages.map((lang) => (
            <option key={lang.label} value={lang.label}>
              {lang.label}
            </option>
          ))}
        </datalist>

        {/* To Language */}
        <label htmlFor="toLanguage">To Language:</label>
        <input
          list="languages"
          value={toLanguage}
          onChange={(e) => setToLanguage(e.target.value)}
          placeholder="Type or select a language"
        />

        {/* Text to Translate */}
        <label htmlFor="textToTranslate">Text to Translate:</label>
        <div className="input-container">
          <textarea
            id="textToTranslate"
            rows="4"
            value={textToTranslate}
            onChange={(e) => setTextToTranslate(e.target.value)}
            placeholder="Enter text here..."
          ></textarea>
          <button
            type="button"
            onClick={handleVoiceInput}
            disabled={isListening}
            className="voice-button"
          >
            <i className={`fa ${isListening ? 'fa-microphone-slash' : 'fa-microphone'}`}></i>
          </button>
        </div>

        {/* Translate Button */}
        <button type="button" onClick={handleTranslate}>
          Translate
        </button>

        {/* Error Message */}
        {error && <div className="error-message">{error}</div>}

        {/* Translated Text */}
        <label htmlFor="translatedText">Translated Text:</label>
        <div className="input-container">
          <textarea
            id="translatedText"
            rows="4"
            value={translatedText}
            readOnly
          ></textarea>
          <button
            type="button"
            onClick={handleTextToSpeech}
            className="voice-button"
          >
            <i className="fa fa-volume-up"></i>
          </button>
        </div>

        {/* Voice Selection for Text-to-Speech */}
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
      </form>
    </div>
  );
};

export default TranslationModule;