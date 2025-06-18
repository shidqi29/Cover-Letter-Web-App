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
import { Eye, Palette, Zap, Shield, FileText, Calendar } from "lucide-react";

interface TemplatePreviewProps {
  content: string;
  template: string;
}

const TemplatePreview: React.FC<TemplatePreviewProps> = ({
  content,
  template,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Get template info
  const getTemplateInfo = () => {
    switch (template.toLowerCase()) {
      case "modern":
        return {
          icon: Zap,
          color: "text-blue-600",
          name: "Modern",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
          headerBg: "bg-blue-600",
        };
      case "creative":
        return {
          icon: Palette,
          color: "text-purple-600",
          name: "Creative",
          bgColor: "bg-purple-50",
          borderColor: "border-purple-200",
          headerBg: "bg-purple-600",
        };
      case "professional":
      default:
        return {
          icon: Shield,
          color: "text-gray-700",
          name: "Professional",
          bgColor: "bg-gray-50",
          borderColor: "border-gray-200",
          headerBg: "bg-gray-700",
        };
    }
  };

  const templateInfo = getTemplateInfo();

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
  const paragraphs = content.split(/\n\s*\n/).filter((p) => p.trim());

  const ProfessionalPreview = () => (
    <div className="mx-auto w-full max-w-2xl bg-white shadow-lg">
      {/* Header */}
      <div className="border-b p-6">
        <div className="mb-4 flex justify-end">
          <div className="text-sm text-gray-600">{formatDate()}</div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4 p-6 font-serif">
        {paragraphs.slice(0, 3).map((para, index) => (
          <div key={index} className="text-sm leading-relaxed text-gray-800">
            {para.length > 150 ? `${para.substring(0, 150)}...` : para}
          </div>
        ))}
        {paragraphs.length > 3 && (
          <div className="text-xs italic text-gray-500">
            ... and {paragraphs.length - 3} more paragraphs
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 p-4 text-center text-xs text-gray-500">
        Generated on {new Date().toLocaleDateString()}
      </div>
    </div>
  );

  const ModernPreview = () => (
    <div className="mx-auto w-full max-w-2xl bg-white shadow-lg">
      {/* Modern Header */}
      <div className="bg-blue-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold">COVER LETTER</h1>
          <div className="text-sm">{formatDate()}</div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4 p-6 font-sans">
        {paragraphs.slice(0, 3).map((para, index) => (
          <div
            key={index}
            className={`text-sm leading-relaxed ${
              index === 0 && para.toLowerCase().includes("dear")
                ? "font-semibold text-gray-900"
                : "text-gray-700"
            }`}
          >
            {para.length > 150 ? `${para.substring(0, 150)}...` : para}
          </div>
        ))}
        {paragraphs.length > 3 && (
          <div className="text-xs italic text-gray-500">
            ... and {paragraphs.length - 3} more paragraphs
          </div>
        )}
      </div>

      {/* Modern Footer */}
      <div className="border-t-2 border-blue-600 p-4">
        <div className="text-center text-xs text-gray-500">
          Professional Cover Letter • {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );

  const CreativePreview = () => (
    <div className="mx-auto w-full max-w-2xl bg-white shadow-lg">
      {/* Creative Header */}
      <div className="relative border-b-4 border-purple-600 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600">
              <div className="h-4 w-4 rounded-full bg-white"></div>
            </div>
            <h1 className="text-xl font-bold italic text-purple-600">
              Cover Letter
            </h1>
          </div>
          <div className="text-sm italic text-gray-500">{formatDate()}</div>
        </div>
      </div>

      {/* Content with creative spacing */}
      <div className="space-y-5 p-6 pl-12 font-sans">
        {paragraphs.slice(0, 3).map((para, index) => (
          <div
            key={index}
            className={`text-sm leading-relaxed ${
              index === 0 && para.toLowerCase().includes("dear")
                ? "font-semibold text-purple-600"
                : para.toLowerCase().includes("sincerely") ||
                    para.toLowerCase().includes("regards")
                  ? "text-right italic text-gray-500"
                  : "text-gray-800"
            }`}
          >
            {para.length > 150 ? `${para.substring(0, 150)}...` : para}
          </div>
        ))}
        {paragraphs.length > 3 && (
          <div className="text-xs italic text-gray-500">
            ... and {paragraphs.length - 3} more paragraphs
          </div>
        )}
      </div>

      {/* Creative Footer */}
      <div className="flex items-center justify-between p-4">
        <div className="h-3 w-3 rounded-full bg-purple-600"></div>
        <div className="text-center text-xs italic text-purple-600">
          Creatively crafted • {new Date().toLocaleDateString()}
        </div>
        <div className="h-3 w-3 rounded-full bg-purple-600"></div>
      </div>
    </div>
  );

  const renderPreview = () => {
    switch (template.toLowerCase()) {
      case "modern":
        return <ModernPreview />;
      case "creative":
        return <CreativePreview />;
      case "professional":
      default:
        return <ProfessionalPreview />;
    }
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
          <span>Preview</span>
          <templateInfo.icon className={`h-3 w-3 ${templateInfo.color}`} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <templateInfo.icon className={`h-5 w-5 ${templateInfo.color}`} />
            <span>{templateInfo.name} Template Preview</span>
            <Badge variant="secondary" className="ml-2">
              PDF Layout
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 p-3">
            <div className="flex items-center space-x-2 text-sm text-blue-800">
              <FileText className="h-4 w-4" />
              <span>
                This preview shows how your cover letter will appear in the
                downloaded PDF. The actual document will include all content
                with proper formatting.
              </span>
            </div>
          </div>

          <div className="rounded-lg bg-gray-100 p-6">{renderPreview()}</div>

          <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
            <div>
              Preview shows first 3 paragraphs • Full document:{" "}
              {paragraphs.length} paragraphs
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Generated: {formatDate()}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplatePreview;
