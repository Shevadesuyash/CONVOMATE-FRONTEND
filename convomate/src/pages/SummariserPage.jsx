import React from "react";
import Summariser from "../components/Sections/Summariser";
import "../assets/css/style.css";

const SummariserPage = () => {
  return (
    <section id="summariser" className="p-4">
      <div className="container mx-auto max-w-6xl">
        <Summariser />
      </div>
    </section>
  );
};

export default SummariserPage;
