"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import TemplateSelection from "@/components/TemplateSelection";
import { COVER_LETTER_TEMPLATES } from "@/types/templates";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const router = useRouter();

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handleContinue = () => {
    if (selectedTemplate) {
      router.push(`/generate?template=${selectedTemplate}`);
    }
  };
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="container mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center">
        <div className="mb-8 flex items-center justify-center">
          <Image
            src={"/cdc-logo.jpg"}
            alt="CDC Logo"
            width={100}
            height={100}
          />
        </div>
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-3xl font-bold lg:text-4xl">
            Cover Letter Generator
          </h1>
          <p className="text-lg text-gray-600">
            Create professional cover letters tailored to your style and
            industry
          </p>
        </div>

        <div className="space-y-8">
          {/* Template Selection */}
          <TemplateSelection
            templates={COVER_LETTER_TEMPLATES}
            selectedTemplate={selectedTemplate}
            onSelectTemplate={handleTemplateSelect}
          />

          {/* Continue Button */}
          <div className="flex justify-center pb-8">
            <Button
              onClick={handleContinue}
              disabled={!selectedTemplate}
              className="px-8 py-3 text-lg"
            >
              {selectedTemplate
                ? "Continue to Generate"
                : "Select a Template First"}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
