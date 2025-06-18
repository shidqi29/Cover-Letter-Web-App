"use client";

import React from "react";

interface TemplatePreviewCardProps {
  templateType: "professional" | "modern" | "creative";
}

const TemplatePreviewCard: React.FC<TemplatePreviewCardProps> = ({
  templateType,
}) => {
  const sampleDate = "June 15, 2025";
  const sampleContent = {
    greeting: "Dear Hiring Manager,",
    paragraph1:
      "I am writing to express my strong interest in the position at your company. With my extensive experience in...",
    paragraph2:
      "Throughout my career, I have successfully developed skills that directly align with your requirements...",
    closing: "Sincerely,",
    name: "Your Name",
  };
  const ProfessionalPreview = () => (
    <div className="relative h-72 w-full overflow-hidden rounded-lg border bg-white shadow-sm">
      {/* Header */}
      <div className="border-b bg-white p-4">
        <div className="text-right font-serif text-xs text-gray-600">
          {sampleDate}
        </div>
      </div>

      {/* Content */}
      <div className="h-52 space-y-3 overflow-hidden p-4 font-serif">
        <div className="text-sm font-medium text-gray-900">
          {sampleContent.greeting}
        </div>
        <div className="text-xs leading-relaxed text-gray-700">
          {sampleContent.paragraph1}
        </div>
        <div className="text-xs leading-relaxed text-gray-700">
          {sampleContent.paragraph2}
        </div>
        <div className="space-y-1 pt-2">
          <div className="text-sm text-gray-900">{sampleContent.closing}</div>
          <div className="text-sm font-medium text-gray-900">
            {sampleContent.name}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 border-t bg-gray-50 p-2">
        <div className="text-center text-xs font-medium text-gray-500">
          Traditional Business Format
        </div>
      </div>
    </div>
  );
  const ModernPreview = () => (
    <div className="relative h-72 w-full overflow-hidden rounded-lg border bg-white shadow-sm">
      {/* Modern Header */}
      <div className="bg-blue-600 p-4 text-white">
        <div className="flex items-center justify-between">
          <h1 className="text-base font-bold tracking-wide">COVER LETTER</h1>
          <div className="text-sm">{sampleDate}</div>
        </div>
      </div>

      {/* Content */}
      <div className="h-48 space-y-3 overflow-hidden p-4 font-sans">
        <div className="text-sm font-semibold text-gray-900">
          {sampleContent.greeting}
        </div>
        <div className="text-xs leading-relaxed text-gray-700">
          {sampleContent.paragraph1}
        </div>
        <div className="text-xs leading-relaxed text-gray-700">
          {sampleContent.paragraph2}
        </div>
        <div className="space-y-1 pt-2">
          <div className="text-sm text-gray-900">{sampleContent.closing}</div>
          <div className="text-sm font-medium text-gray-900">
            {sampleContent.name}
          </div>
        </div>
      </div>

      {/* Modern Footer */}
      <div className="absolute bottom-0 left-0 right-0 border-t-2 border-blue-600 bg-white p-2">
        <div className="text-center text-xs font-medium text-gray-500">
          Contemporary Layout
        </div>
      </div>
    </div>
  );
  const CreativePreview = () => (
    <div className="relative h-72 w-full overflow-hidden rounded-lg border bg-white shadow-sm">
      {/* Creative Header - Without profile picture as requested */}
      <div className="border-b-4 border-purple-600 bg-white p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-base font-bold italic text-purple-600">
            Cover Letter
          </h1>
          <div className="text-sm italic text-gray-500">{sampleDate}</div>
        </div>
        {/* Decorative line */}
        <div className="mt-2 h-0.5 w-20 bg-purple-600"></div>
      </div>

      {/* Content with creative spacing */}
      <div className="h-48 space-y-3 overflow-hidden p-4 pl-6 font-sans">
        <div className="text-sm font-semibold text-purple-600">
          {sampleContent.greeting}
        </div>
        <div className="text-xs leading-relaxed text-gray-700">
          {sampleContent.paragraph1}
        </div>
        <div className="text-xs leading-relaxed text-gray-700">
          {sampleContent.paragraph2}
        </div>
        <div className="space-y-1 pt-2 text-right">
          <div className="text-sm italic text-gray-500">
            {sampleContent.closing}
          </div>
          <div className="text-sm font-medium italic text-gray-600">
            {sampleContent.name}
          </div>
        </div>
      </div>

      {/* Creative Footer */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between border-t bg-white p-3">
        <div className="h-3 w-3 rounded-full bg-purple-600"></div>
        <div className="text-xs font-medium italic text-purple-600">
          Artistic Design
        </div>
        <div className="h-3 w-3 rounded-full bg-purple-600"></div>
      </div>
    </div>
  );

  const renderPreview = () => {
    switch (templateType) {
      case "modern":
        return <ModernPreview />;
      case "creative":
        return <CreativePreview />;
      case "professional":
      default:
        return <ProfessionalPreview />;
    }
  };

  return <div className="relative">{renderPreview()}</div>;
};

export default TemplatePreviewCard;
