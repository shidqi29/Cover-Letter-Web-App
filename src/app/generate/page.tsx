"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import CoverLetterForm from "@/components/CoverLetterForm";
import { COVER_LETTER_TEMPLATES } from "@/types/templates";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

export default function GeneratePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [templateName, setTemplateName] = useState<string>("");

  useEffect(() => {
    const templateId = searchParams.get("template");
    if (templateId) {
      const template = COVER_LETTER_TEMPLATES.find((t) => t.id === templateId);
      if (template) {
        setSelectedTemplate(templateId);
        setTemplateName(template.name);
      } else {
        // Invalid template, redirect back to home
        router.push("/");
      }
    } else {
      // No template selected, redirect back to home
      router.push("/");
    }
  }, [searchParams, router]);

  const handleBackToTemplates = () => {
    router.push("/");
  };

  if (!selectedTemplate) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 sm:p-8 lg:pb-24">
      <div className="container mx-auto max-w-5xl py-4 sm:py-6 lg:py-8">
        <div className="mb-8 flex items-center justify-center">
          <Image
            src={"/cdc-logo.jpg"}
            alt="CDC Logo"
            width={100}
            height={100}
          />
        </div>
        {/* Header with back button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={handleBackToTemplates}
            className="mb-4 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Templates
          </Button>

          <div className="text-center">
            <h1 className="mb-2 text-xl font-bold sm:mb-4 sm:text-2xl lg:text-3xl">
              Generate Cover Letter
            </h1>
            <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm text-blue-700">
              <p>
                Using<span className="ml-1 font-medium">{templateName}</span>{" "}
                template
              </p>
            </div>
          </div>
        </div>

        {/* Cover Letter Form */}
        <CoverLetterForm selectedTemplate={selectedTemplate} />
      </div>
    </main>
  );
}
