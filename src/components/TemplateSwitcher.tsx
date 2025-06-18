"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Palette, Zap, Shield, RefreshCw, ArrowRight } from "lucide-react";
import { COVER_LETTER_TEMPLATES } from "@/types/templates";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

interface TemplateSwitcherProps {
  currentTemplate: string;
  coverLetterContent: string;
}

const TemplateSwitcher: React.FC<TemplateSwitcherProps> = ({
  currentTemplate,
  coverLetterContent,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const getTemplateInfo = (templateId: string) => {
    switch (templateId.toLowerCase()) {
      case "modern":
        return {
          icon: Zap,
          color: "text-blue-600",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
        };
      case "creative":
        return {
          icon: Palette,
          color: "text-purple-600",
          bgColor: "bg-purple-50",
          borderColor: "border-purple-200",
        };
      case "professional":
      default:
        return {
          icon: Shield,
          color: "text-gray-700",
          bgColor: "bg-gray-50",
          borderColor: "border-gray-200",
        };
    }
  };
  const handleTemplateSwitch = (newTemplateId: string) => {
    if (newTemplateId === currentTemplate) {
      setIsOpen(false);
      return;
    }
    setIsSwitching(true);
    try {
      // Update URL with new template while keeping the same content
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set("template", newTemplateId);
      // Keep the existing content unchanged
      newParams.set("content", encodeURIComponent(coverLetterContent));

      router.push(`/generate/result?${newParams.toString()}`);

      toast.success("Template switched successfully!", {
        description: `Your cover letter will now use the ${COVER_LETTER_TEMPLATES.find((t) => t.id === newTemplateId)?.name} template for downloads.`,
      });

      setIsOpen(false);
    } catch (error) {
      console.error("Error switching template:", error);
      toast.error("Failed to switch template", {
        description: "Please try again.",
      });
    } finally {
      setIsSwitching(false);
    }
  };

  const availableTemplates = COVER_LETTER_TEMPLATES.filter(
    (template) => template.id !== currentTemplate,
  );

  const currentTemplateInfo = getTemplateInfo(currentTemplate);
  const currentTemplateData = COVER_LETTER_TEMPLATES.find(
    (t) => t.id === currentTemplate,
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center space-x-2"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Switch Template</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <RefreshCw className="h-5 w-5" />
            <span>Switch Template Style</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Current Template */}
          <div>
            <h3 className="mb-2 text-sm font-medium text-gray-700">
              Current Template:
            </h3>
            <Card
              className={`${currentTemplateInfo.borderColor} ${currentTemplateInfo.bgColor}`}
            >
              <CardContent>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <currentTemplateInfo.icon
                        className={`h-5 w-5 ${currentTemplateInfo.color}`}
                      />
                      <div>
                        <div className="font-medium">
                          {currentTemplateData?.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {currentTemplateData?.description}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">Current</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Available Templates */}
          <div>
            <h3 className="mb-2 text-sm font-medium text-gray-700">
              Switch to:
            </h3>
            <div className="space-y-2">
              {availableTemplates.map((template) => {
                const templateInfo = getTemplateInfo(template.id);
                return (
                  <Card
                    key={template.id}
                    className="cursor-pointer transition-shadow hover:shadow-md"
                  >
                    <CardContent>
                      <div
                        className="p-4"
                        onClick={() => handleTemplateSwitch(template.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <templateInfo.icon
                              className={`h-5 w-5 ${templateInfo.color}`}
                            />
                            <div>
                              <div className="font-medium">{template.name}</div>
                              <div className="text-sm text-gray-600">
                                {template.description}
                              </div>
                            </div>
                          </div>
                          <ArrowRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>{" "}
          {/* Warning */}
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
            <div className="text-sm text-blue-800">
              <strong>Note:</strong> Switching templates will change the visual
              style for downloads only. Your cover letter content will remain
              exactly the same.
            </div>
          </div>{" "}
          {/* Loading State */}
          {isSwitching && (
            <div className="flex items-center justify-center p-4">
              <div className="flex items-center space-x-2">
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span className="text-sm text-gray-600">
                  Switching template style...
                </span>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateSwitcher;
