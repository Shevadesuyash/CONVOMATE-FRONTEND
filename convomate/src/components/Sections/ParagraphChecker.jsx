import React, { useState } from 'react';
import api from '../../api';
import { diffWords } from 'diff';
import "../../assets/css/style.css";
import VoiceInput from './VoiceInput';
import ErrorPopup from './ErrorPopup';

const ParagraphChecker = () => {
  const [inputText, setInputText] = useState('');
  const [correctedText, setCorrectedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [highlightedOriginal, setHighlightedOriginal] = useState('');
  const [highlightedCorrected, setHighlightedCorrected] = useState('');

  const token = localStorage.getItem('jwtToken');

  const handleGrammarCheck = async () => {
    if (!inputText.trim()) {
      setError('Please enter text to check.');
      return;
    }
    setError('');
    setLoading(true);
    setCorrectedText('');
    setHighlightedOriginal('');
    setHighlightedCorrected('');

    try {
      const response = await api.grammarCheck(
        { paragraph: inputText },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response && response.grammar_corrected) {
        setCorrectedText(response.grammar_corrected);
        highlightDifferences(inputText, response.grammar_corrected);
      } else {
        setError('No corrected text found.');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const highlightDifferences = (original, corrected) => {
    if (!original || !corrected) return;

    const differences = diffWords(original, corrected);

    const originalHighlighted = differences.map((part, index) => {
      if (part.removed) {
        return (
          <span key={index} style={{ color: 'red', textDecoration: 'line-through' }}>
            {part.value}
          </span>
        );
      }
      return part.added ? null : (
        <span key={index} style={{ color: 'black' }}>
          {part.value}
        </span>
      );
    });

    const correctedHighlighted = differences.map((part, index) => {
      if (part.added) {
        return (
          <span key={index} style={{ color: 'green' }}>
            {part.value}
          </span>
        );
      }
      return part.removed ? null : (
        <span key={index} style={{ color: 'black' }}>
          {part.value}
        </span>
      );
    });

    setHighlightedOriginal(originalHighlighted);
    setHighlightedCorrected(correctedHighlighted);
  };

  const handleClearText = () => {
    setInputText('');
    setCorrectedText('');
    setHighlightedOriginal('');
    setHighlightedCorrected('');
    setError('');
  };

  const handleVoiceResult = (transcript) => {
    setInputText(transcript);
  };

  const handleClosePopup = () => {
    setError('');
  };

  return (
    <div className="grammar-checker-container">
      <h2>Paragraph Grammar Checker</h2>
      <div className="text-area-row">
        <div className="input-section-3">
          <h3 className="box-title1">Input Text</h3>
          <textarea
            className="input-textarea-3"
            placeholder="Type your paragraph here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>

        <div className="output-section-3">
          <h3 className="box-title2">Corrected Text</h3>
          <div className="output-display-3">
            {highlightedCorrected.length > 0 ? highlightedCorrected : correctedText || 'Corrected text will appear here...'}
          </div>
        </div>
      </div>

      <div className="controls">
        {error && <ErrorPopup message={error} onClose={handleClosePopup} />}

        {/* 🎯 Buttons all in one row */}
        <div className="button-row">
          <VoiceInput
            onResult={handleVoiceResult}
            language="en-US"
            buttonStyle={{}}
          />
          <button
            onClick={handleGrammarCheck}
            disabled={loading}
            className="correct-button"
          >
            {loading ? 'Checking...' : 'Correct'}
          </button>
          <button onClick={handleClearText} className="clear-button">
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParagraphChecker;
