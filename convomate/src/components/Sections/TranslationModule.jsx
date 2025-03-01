import React, { useState } from 'react';
import "../../assets/css/style.css";


const TranslationModule = () => {
  const [fromLanguage, setFromLanguage] = useState('en'); // Default: English
  const [toLanguage, setToLanguage] = useState('es'); // Default: Spanish
  const [textToTranslate, setTextToTranslate] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const handleTranslate = async () => {
    try {
      const response = await fetch('/TranslationServlet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          fromLanguage,
          toLanguage,
          textToTranslate,
        }),
      });

      if (response.ok) {
        const data = await response.text();
        setTranslatedText(data);
      } else {
        console.error('Translation failed');
      }
    } catch (error) {
      console.error('Error during translation:', error);
    }
  };

  return (
    <div id="translator">
      <h2>Language Translator</h2>
      <form>
        <label htmlFor="fromLanguage">From Language:</label>
        <select
          id="fromLanguage"
          value={fromLanguage}
          onChange={(e) => setFromLanguage(e.target.value)}
        >
          <option value="en">English</option>
          {/* Add more language options as needed */}
        </select>

        <label htmlFor="toLanguage">To Language:</label>
        <select
          id="toLanguage"
          value={toLanguage}
          onChange={(e) => setToLanguage(e.target.value)}
        >
          <option value="de">German</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="hi">Hindi</option>
          <option value="mr">Marathi</option>
          <option value="ja">Japanese</option>
          {/* Add more language options as needed */}
        </select>

        <label htmlFor="textToTranslate">Text to Translate:</label>
        <textarea
          id="textToTranslate"
          rows="4"
          value={textToTranslate}
          onChange={(e) => setTextToTranslate(e.target.value)}
        ></textarea>

        <button type="button" onClick={handleTranslate}>
          Translate
        </button>
      </form>

      <label htmlFor="translatedText">Translated Text:</label>
      <textarea
        id="translatedText"
        rows="4"
        value={translatedText}
        readOnly
      ></textarea>
    </div>
  );
};

export default TranslationModule;