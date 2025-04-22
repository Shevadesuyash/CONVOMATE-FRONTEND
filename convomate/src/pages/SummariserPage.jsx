import React from 'react';
import Summariser from '../components/Sections/Summariser';
import "../assets/css/style.css";
import 'bootstrap/dist/css/bootstrap.css';

const SummariserPage = () => {
  return (
    <section id="intro" className="p-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-2xl font-semibold mb-6">Text Summarising</h2>
        <ParagraphChecker />
      </div>
    </section>
  );
};

export default Summariser;
