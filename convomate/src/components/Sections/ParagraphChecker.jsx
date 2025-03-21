import React, { useState } from 'react';
import api from '../../api';

const ParagraphChecker = () => {
  const [inputText, setInputText] = useState('');
  const [correctedText, setCorrectedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGrammarCheck = async () => {
    if (!inputText.trim()) {
      setError('Please enter text to check.');
      return;
    }
    setError('');
    setLoading(true);
    setCorrectedText('');

    try {
      const response = await api.grammarCheck({ paragraph: inputText });
      setCorrectedText(response.correctedText || 'No corrections needed.');
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClearText = () => {
    setInputText('');
    setCorrectedText('');
    setError('');
  };

  return (
    <div className="grammar-checker-container">
      {/* Input and Output Section */}
      <h2>Paragraph Grammar Checker</h2>
      <div className="text-area-container">
        <textarea
          className="input-textarea"
          placeholder="Type your paragraph here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        <textarea
          className="output-textarea"
          placeholder="Corrected paragraph will appear here..."
          value={correctedText}
          readOnly
        />
      </div>

      {/* Error Message */}
      {error && <div className="error-message">{error}</div>}

      {/* Button Section */}
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
  );
};

export default ParagraphChecker;
