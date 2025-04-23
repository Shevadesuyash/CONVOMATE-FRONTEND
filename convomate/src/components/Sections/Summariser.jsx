import React, { useState } from 'react';
import api from '../../api';
import "../../assets/css/style.css";

const Summariser = () => {
  const [inputText, setInputText] = useState('');
  const [summarizedText, setSummarizedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [summaryType, setSummaryType] = useState('paragraph');
  const [originalText, setOriginalText] = useState('');

  const token = localStorage.getItem('jwtToken');

  const handleSummarize = async () => {
    if (!inputText.trim()) {
      setError('Please enter text to summarize.');
      return;
    }

    setError('');
    setLoading(true);
    setSummarizedText('');
    setOriginalText('');

    try {
      const response = await api.summarizeText(
        {
          text: inputText,
          type: summaryType
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response && response.summarized_text) {
        // Clean up the summarized text by removing excessive whitespace
        const cleanedText = response.summarized_text
          .replace(/\n\s*\n/g, '\n') // Replace multiple newlines with single
          .replace(/^\s+|\s+$/g, ''); // Trim whitespace from start/end

        setSummarizedText(cleanedText);
        setOriginalText(response.original_text || inputText);
      } else {
        setError('No summarized text found.');
      }
    } catch (err) {
      setError(err.message || 'Failed to summarize text. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClearText = () => {
    setInputText('');
    setSummarizedText('');
    setOriginalText('');
    setError('');
  };

const formatSummaryText = (text) => {
  if (!text) return null;

  // Normalize whitespace - replace multiple newlines with single, trim spaces
  const normalizedText = text
    .replace(/\n\s*\n/g, '\n')  // Replace multiple newlines with single
    .replace(/^\s+|\s+$/g, ''); // Trim start/end whitespace

  // Split by newlines but filter out empty lines
  const paragraphs = normalizedText.split('\n').filter(p => p.trim().length > 0);

  return paragraphs.map((paragraph, index) => (
    <React.Fragment key={index}>
      {paragraph.startsWith('- ') ? (
        <li className="bullet-point">{paragraph.substring(2)}</li>
      ) : (
        <p className="summary-paragraph">{paragraph}</p>
      )}
      {/* Add minimal spacing between items */}
      {index < paragraphs.length - 1 && <br />}
    </React.Fragment>
  ));
};

  return (
    <div className="summariser-container">
      <h2>Text Summarizer</h2>
      <div className="controls">
        <div className="summary-type-selector">
          <label>
            <input
              type="radio"
              value="paragraph"
              checked={summaryType === 'paragraph'}
              onChange={() => setSummaryType('paragraph')}
            />
            Paragraph Summary
          </label>
          <label>
            <input
              type="radio"
              value="points"
              checked={summaryType === 'points'}
              onChange={() => setSummaryType('points')}
            />
            Bullet Points
          </label>
        </div>
      </div>

      <div className="text-area-container">
        <div className="input-section">
          <h3>Original Text:</h3>
          <textarea
            className="input-textarea"
            placeholder="Type or paste your text here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={8}
          />
        </div>

        <div className="output-section">
          <h3>Summarized Text:</h3>
          <div className="output-display">
            {loading ? (
              <div className="loading-spinner">Summarizing...</div>
            ) : summarizedText ? (
              <div className="summary-result">
                {formatSummaryText(summarizedText)}
              </div>
            ) : (
              <div className="placeholder">Summarized text will appear here...</div>
            )}
          </div>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="button-container">
        <button
          onClick={handleSummarize}
          disabled={loading || !inputText.trim()}
          className="summarize-button"
        >
          {loading ? 'Processing...' : 'Summarize'}
        </button>
        <button
          onClick={handleClearText}
          className="clear-button"
          disabled={loading}
        >
          Clear
        </button>
      </div>

      {originalText && summarizedText && (
        <div className="summary-stats">
          <p>
            Original length: {originalText.split(' ').length} words |
            Summary length: {summarizedText.split(' ').length} words |
            Reduction: {Math.round(100 - (summarizedText.split(' ').length / originalText.split(' ').length * 100))}%
          </p>
        </div>
      )}
    </div>
  );
};

export default Summariser;