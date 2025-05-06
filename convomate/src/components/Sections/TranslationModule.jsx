import React, { useState, useEffect } from 'react';
import api from '../../api';
import '../../assets/css/style.css';
import VoiceInput from './VoiceInput';
import { loadVoices, getDefaultVoice } from './voiceUtils';

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
  const [toLanguage, setToLanguage] = useState(''); // Initialize as empty string
  const [textToTranslate, setTextToTranslate] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [error, setError] = useState(null);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  useEffect(() => {
    const initializeVoices = async () => {
      const loadedVoices = await loadVoices();
      setVoices(loadedVoices);
      setSelectedVoice(getDefaultVoice(loadedVoices));
    };
    initializeVoices();
  }, []);

  const handleVoiceResult = (transcript) => {
    setTextToTranslate(transcript);
  };

  const handleTextToSpeech = () => {
    if (!translatedText || !selectedVoice) {
      setError('No translated text or voice selected');
      return;
    }

    const synth = window.speechSynthesis;
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(translatedText);
    utterance.voice = selectedVoice;
    utterance.lang = toLanguage || 'en-US';
    synth.speak(utterance);
  };

  const handleTranslate = async () => {
    setError(null);
    if (!toLanguage) {
      setError('Please select the "To Language".');
      return;
    }
    // Find the language code based on the selected/typed label
    const fromLangCode = languages.find(lang => lang.label === fromLanguage)?.code || 'auto';
    const toLangCode = languages.find(lang => lang.label === toLanguage)?.code;

    if (!toLangCode && toLanguage !== '') {
      setError('Invalid "To Language" selected.');
      return;
    }

    try {
      const data = {
        from_language: fromLangCode,
        to_language: toLangCode || toLanguage, // Use typed value if no code found
        text_to_translate: textToTranslate,
      };
      const response = await api.translate(data);
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

      {/* Internal CSS for error popup */}
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

        .error-message {
          color: red;
          font-size: 14px;
          margin-top: 10px;
        }
      `}</style>

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
        <datalist id="languages">
          {languages.map((lang) => (
            <option key={lang.label} value={lang.label}>
              {lang.label}
            </option>
          ))}
        </datalist>

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
          <VoiceInput
            onResult={handleVoiceResult}
            language={fromLanguage === 'auto' ? 'en-US' : languages.find(lang => lang.label === fromLanguage)?.code || 'en-US'}
            buttonStyle={{ marginLeft: '8px' }}
          />
        </div>

        <button type="button" onClick={handleTranslate}>
          Translate
        </button>

        {/* Error Popup */}
        {error && (
          <div className="error-popup-overlay">
            <div className="error-popup">
              <h3>⚠️ Something went wrong</h3>
              <p>{error}</p>
              <button onClick={() => setError(null)}>Close</button>
            </div>
          </div>
        )}

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
            disabled={!translatedText || !selectedVoice}
          >
            <i className="fa fa-volume-up"></i>
          </button>
        </div>

        <label htmlFor="voice-select">Select Voice:</label>
        <select
          id="voice-select"
          value={selectedVoice ? selectedVoice.name : ''}
          onChange={(e) => {
            const voice = voices.find((v) => v.name === e.target.value);
            setSelectedVoice(voice);
          }}
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            width: '100%',
            maxWidth: '300px'
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
