import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { CoverLetterTemplate } from "@/types/templates";
import { Check, FileText, Sparkles, Briefcase } from "lucide-react";
import TemplatePreviewCard from "./TemplatePreviewCard";

interface TemplateSelectionProps {
  templates: CoverLetterTemplate[];
  selectedTemplate: string | null;
  onSelectTemplate: (templateId: string) => void;
}

const TemplateSelection: React.FC<TemplateSelectionProps> = ({
  templates,
  selectedTemplate,
  onSelectTemplate,
}) => {
  const getIcon = (style: string) => {
    switch (style) {
      case "professional":
        return <Briefcase className="h-6 w-6" />;
      case "creative":
        return <Sparkles className="h-6 w-6" />;
      case "modern":
        return <FileText className="h-6 w-6" />;
      default:
        return <FileText className="h-6 w-6" />;
    }
  };

  const getColorClasses = (style: string, isSelected: boolean) => {
    const baseClasses = "transition-all duration-200 cursor-pointer";

    if (isSelected) {
      switch (style) {
        case "professional":
          return `${baseClasses} border-blue-500 bg-blue-50 ring-2 ring-blue-500`;
        case "creative":
          return `${baseClasses} border-purple-500 bg-purple-50 ring-2 ring-purple-500`;
        case "modern":
          return `${baseClasses} border-green-500 bg-green-50 ring-2 ring-green-500`;
        default:
          return `${baseClasses} border-gray-500 bg-gray-50 ring-2 ring-gray-500`;
      }
    }

    return `${baseClasses} border-gray-200 hover:border-gray-300 hover:shadow-md`;
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="mb-2 text-lg font-semibold">
          Pilih Template Cover Letter Anda
        </h2>
        <p className="text-sm text-gray-600">
          Pilih template yang paling sesuai dengan industri dan gaya pribadi
          Anda.
        </p>
      </div>{" "}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {templates.map((template) => {
          const isSelected = selectedTemplate === template.id;

          return (
            <div
              key={template.id}
              className={getColorClasses(template.style, isSelected)}
              onClick={() => onSelectTemplate(template.id)}
            >
              {" "}
              <Card className="h-full">
                <CardHeader>
                  <div className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div
                          className={`rounded-lg p-2 ${
                            template.style === "professional"
                              ? "bg-blue-100 text-blue-600"
                              : template.style === "creative"
                                ? "bg-purple-100 text-purple-600"
                                : "bg-green-100 text-green-600"
                          }`}
                        >
                          {getIcon(template.style)}
                        </div>
                        <CardTitle className="text-base">
                          {template.name}
                        </CardTitle>
                      </div>
                      {isSelected && (
                        <div
                          className={`rounded-full p-1 ${
                            template.style === "professional"
                              ? "bg-blue-500"
                              : template.style === "creative"
                                ? "bg-purple-500"
                                : "bg-green-500"
                          }`}
                        >
                          <Check className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                      {template.description}
                    </p>

                    {/* Template Preview */}
                    <div className="space-y-2">
                      <div className="text-xs font-medium text-gray-700">
                        Pratinjau:
                      </div>
                      <TemplatePreviewCard
                        templateType={
                          template.style as
                            | "professional"
                            | "modern"
                            | "creative"
                        }
                      />
                    </div>

                    <div className="rounded border-l-2 border-gray-300 bg-gray-50 p-2 text-xs text-gray-500">
                      <strong>Cocok untuk:</strong> {template.preview}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
      {selectedTemplate && (
        <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-3">
          <div className="flex items-center space-x-2">
            <Check className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">
              Template dipilih:{" "}
              {templates.find((t) => t.id === selectedTemplate)?.name}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateSelection;
