"use client";

import React from "react";
import CoverLetterForm from "../../components/CoverLetterForm";

const CoverLetterPage: React.FC = () => {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <h1 className="mb-4 text-center text-xl font-bold sm:mb-6 sm:text-2xl lg:text-3xl">
        Cover Letter Generator
      </h1>
      <CoverLetterForm selectedTemplate={null} />
    </div>
  );
};

export default CoverLetterPage;
