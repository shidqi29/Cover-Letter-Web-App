'use client'

import React from 'react';
import CoverLetterForm from '../../components/CoverLetterForm';

const CoverLetterPage: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold text-center mb-6">Cover Letter Generator</h1>
      <CoverLetterForm />
    </div>
  );
};

export default CoverLetterPage; 