import React, { useState } from 'react';
import api from '../../api';
import { diffWords } from 'diff';
import "../../assets/css/style.css";

const Summariser = () => {
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

    // Highlight original text (red for removed parts)
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

    // Highlight corrected text (green for added parts)
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

  return (
    <div className="grammar-checker-container">
      <h2>Text Summarizer</h2>
      <div className="text-area-container">
      <textarea
                className="input-textarea"
                placeholder="Type your text here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />



        <div className="output-section">
          <h3>Summarized Text:</h3>
          <div className="output-display">
            {highlightedCorrected.length > 0 ? highlightedCorrected :
             correctedText || 'Summarized text will appear here...'}
          </div>
        </div>
      </div>

      <div className="controls">


        {error && <div className="error-message">{error}</div>}

        <div className="button-container">
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

export default Summariser;