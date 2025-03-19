import React from 'react';

const ParagraphChecker = () => {
  return (
    <section id="intro" className="p-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-2xl font-semibold mb-4">Paragraph Grammar Checker</h2>

        <div className="flex flex-col gap-4">
          {/* Input Text Area */}
          <textarea
            className="border border-gray-300 p-3 rounded-lg w-full h-40 resize-none"
            placeholder="Type your text here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />

          {/* Output Text Area */}
          <textarea
            className="border border-gray-300 p-3 rounded-lg w-full h-40 resize-none bg-gray-100"
            placeholder="Corrected text will appear here..."
            value={correctedText}
            readOnly
          />

          {error && <div className="text-red-500">{error}</div>}

          {/* Submit Button */}
          <button
            onClick={handleGrammarCheck}
            disabled={loading}
            className="bg-black text-white px-6 py-3 rounded-lg border border-black hover:bg-gray-800"
          >
            {loading ? 'Checking...' : 'Correct'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ParagraphChecker;
