import React, { useState } from 'react';
import "../assets/css/style.css";
import 'bootstrap/dist/css/bootstrap.css';
import ParagraphChecker from '../components/Sections/ParagraphChecker';

const ParagraphCheckerPage = () => {
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
      const token = localStorage.getItem('token'); // Optional if auth is needed
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080'}/grammar/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` })
        },
        body: JSON.stringify({ paragraph: inputText })
      });

      if (!response.ok) {
        throw new Error('Grammar check failed.');
      }

      const data = await response.json();
      setCorrectedText(data.correctedText || 'No corrections needed.');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ParagraphChecker/>
    );
};

export default ParagraphCheckerPage;
