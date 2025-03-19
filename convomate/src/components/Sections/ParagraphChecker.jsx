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

  return (
    <div className="flex flex-col gap-4">
      <textarea
        className="border border-gray-300 p-3 rounded-lg w-full h-40 resize-none"
        placeholder="Type your paragraph here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />

      <textarea
        className="border border-gray-300 p-3 rounded-lg w-full h-40 resize-none bg-gray-100"
        placeholder="Corrected paragraph will appear here..."
        value={correctedText}
        readOnly
      />

      {error && <div className="text-red-500">{error}</div>}

      <button
        onClick={handleGrammarCheck}
        disabled={loading}
        className="bg-black text-white px-6 py-3 rounded-lg border border-black hover:bg-gray-800"
      >
        {loading ? 'Checking...' : 'Correct'}
      </button>
    </div>
  );
};

export default ParagraphChecker;
