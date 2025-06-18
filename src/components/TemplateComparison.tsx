"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Eye,
  Palette,
  Zap,
  Shield,
  FileText,
  ArrowRight,
  Download,
} from "lucide-react";

interface TemplateComparisonProps {
  content: string;
  currentTemplate: string;
}

const TemplateComparison: React.FC<TemplateComparisonProps> = ({
  content,
  currentTemplate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(currentTemplate);

  const templates = [
    {
      id: "professional",
      name: "Professional",
      icon: Shield,
      color: "text-gray-700",
      bgColor: "bg-gray-50",
      description: "Traditional business letter format",
    },
    {
      id: "modern",
      name: "Modern",
      icon: Zap,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "Clean, contemporary layout",
    },
    {
      id: "creative",
      name: "Creative",
      icon: Palette,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "Artistic design with unique elements",
    },
  ];

  // Format current date
  const formatDate = () => {
    const date = new Date();
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Split content into paragraphs for preview
  const paragraphs = content
    .split(/\n\s*\n/)
    .filter((p) => p.trim())
    .slice(0, 2);

  const renderTemplatePreview = (templateId: string) => {
    const shortContent = paragraphs.map((p) =>
      p.length > 100 ? `${p.substring(0, 100)}...` : p,
    );

    switch (templateId) {
      case "professional":
        return (
          <div className="h-40 overflow-hidden rounded-lg border bg-white p-4">
            <div className="mb-2 text-right text-xs text-gray-500">
              {formatDate()}
            </div>
            <div className="space-y-2 font-serif text-xs">
              {shortContent.map((para, idx) => (
                <div key={idx} className="leading-relaxed text-gray-800">
                  {para}
                </div>
              ))}
            </div>
            <div className="mt-4 text-center text-xs text-gray-400">
              Traditional Format
            </div>
          </div>
        );

      case "modern":
        return (
          <div className="h-40 overflow-hidden rounded-lg border bg-white">
            <div className="flex justify-between bg-blue-600 p-2 text-xs text-white">
              <span className="font-bold">COVER LETTER</span>
              <span>{formatDate()}</span>
            </div>
            <div className="space-y-2 p-3 text-xs">
              {shortContent.map((para, idx) => (
                <div key={idx} className="leading-relaxed text-gray-700">
                  {para}
                </div>
              ))}
            </div>
            <div className="mt-2 border-t-2 border-blue-600 p-1 text-center text-xs text-gray-500">
              Modern Layout
            </div>
          </div>
        );

      case "creative":
        return (
          <div className="h-40 overflow-hidden rounded-lg border bg-white">
            <div className="flex items-center justify-between border-b-2 border-purple-600 p-2">
              <div className="flex items-center space-x-1">
                <div className="h-3 w-3 rounded-full bg-purple-600"></div>
                <span className="text-xs font-bold italic text-purple-600">
                  Cover Letter
                </span>
              </div>
              <span className="text-xs text-gray-500">{formatDate()}</span>
            </div>
            <div className="space-y-2 p-3 pl-4 text-xs">
              {shortContent.map((para, idx) => (
                <div key={idx} className="leading-relaxed text-gray-700">
                  {para}
                </div>
              ))}
            </div>
            <div className="mt-2 flex items-center justify-center text-xs text-purple-600">
              Creative Design
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center space-x-2"
        >
          <Eye className="h-4 w-4" />
          <span>Compare Templates</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-5xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Eye className="h-5 w-5" />
            <span>Template Comparison</span>
            <Badge variant="secondary">Live Preview</Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 p-3">
            <div className="flex items-center space-x-2 text-sm text-blue-800">
              <FileText className="h-4 w-4" />
              <span>
                Compare how your cover letter looks in different template
                styles. Click on any template to see a detailed preview.
              </span>
            </div>
          </div>

          {/* Template Grid */}
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {templates.map((template) => (
              <div key={template.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <template.icon className={`h-4 w-4 ${template.color}`} />
                    <span className="text-sm font-medium">{template.name}</span>
                    {template.id === currentTemplate && (
                      <Badge variant="secondary" className="text-xs">
                        Current
                      </Badge>
                    )}
                  </div>
                  <Button
                    size="sm"
                    variant={
                      selectedTemplate === template.id ? "default" : "outline"
                    }
                    onClick={() => handleTemplateChange(template.id)}
                    className="h-7 px-2 py-1 text-xs"
                  >
                    Preview
                  </Button>
                </div>

                <div
                  className={`rounded-lg p-2 ${template.bgColor} border-2 ${
                    selectedTemplate === template.id
                      ? "border-primary"
                      : "border-gray-200"
                  }`}
                >
                  {renderTemplatePreview(template.id)}
                </div>

                <p className="text-xs text-gray-600">{template.description}</p>
              </div>
            ))}
          </div>

          {/* Selected Template Detail */}
          <div className="border-t pt-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="flex items-center space-x-2 text-lg font-semibold">
                <span>Selected: </span>
                {(() => {
                  const template = templates.find(
                    (t) => t.id === selectedTemplate,
                  );
                  return template ? (
                    <>
                      <template.icon className={`h-5 w-5 ${template.color}`} />
                      <span>{template.name} Template</span>
                    </>
                  ) : null;
                })()}
              </h3>

              <div className="flex items-center space-x-2">
                {selectedTemplate !== currentTemplate && (
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <ArrowRight className="h-4 w-4" />
                    <span>Switch template to download in this style</span>
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-lg bg-gray-100 p-4">
              <div className="mx-auto max-w-2xl">
                {renderTemplatePreview(selectedTemplate)}
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
            <div>
              Preview shows first 2 paragraphs • Full document:{" "}
              {content.split(/\n\s*\n/).length} paragraphs
            </div>
            <div className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Use Download button to get full formatted document</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateComparison;
