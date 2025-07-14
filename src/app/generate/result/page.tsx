"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Copy,
  Download,
  FileText,
  Zap,
  Palette,
  Shield,
} from "lucide-react";
import StreamingText from "@/components/StreamingText";
import DownloadButton from "@/components/DownloadButton";

import { toast } from "sonner";
import { COVER_LETTER_TEMPLATES } from "@/types/templates";
import Image from "next/image";

export default function ResultPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [coverLetter, setCoverLetter] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [templateName, setTemplateName] = useState<string>("");

  useEffect(() => {
    // Get the cover letter content and template from URL params
    const content = searchParams.get("content");
    const templateId = searchParams.get("template");

    if (content) {
      // Decode the content (it was encoded when passed as URL param)
      const decodedContent = decodeURIComponent(content);
      setCoverLetter(decodedContent);
      setLoading(false);
    }

    if (templateId) {
      const template = COVER_LETTER_TEMPLATES.find((t) => t.id === templateId);
      setTemplateName(template?.name || "Custom");
    }

    // If no content is found, redirect back to home
    if (!content) {
      router.push("/");
    }
  }, [searchParams, router]);
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(coverLetter);
    toast.success("Berhasil disalin!", {
      description: "Konten surat lamaran telah disalin ke clipboard Anda.",
      duration: 2000,
    });
  };
  const handleBackToHome = () => {
    router.push("/");
  };

  const handleBackToForm = () => {
    const templateParam = searchParams.get("template");
    if (templateParam) {
      router.push(`/generate?template=${templateParam}`);
    } else {
      router.push("/");
    }
  };

  const handleCreateAnother = () => {
    router.push("/");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Memuat surat lamaran Anda...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-center">
          <Image
            src={"/cdc-logo.jpg"}
            alt="CDC Logo"
            width={100}
            height={100}
          />
        </div>
        {/* Header */}{" "}
        <div className="mb-6">
          {/* <Button
            variant="ghost"
            onClick={handleBackToForm}
            className="mb-4 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Form
          </Button> */}

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="mb-1 text-2xl font-bold text-gray-900">
                Cover Letter Anda Sudah Siap!
              </h1>
              {templateName && (
                <p className="text-gray-600">
                  Dibuat menggunakan template{" "}
                  <span className="font-medium">{templateName}</span>
                </p>
              )}
            </div>

            <div className="mt-4 flex items-center space-x-2 sm:mt-0">
              <DownloadButton
                content={coverLetter}
                template={searchParams.get("template") || "professional"}
              />
            </div>
          </div>
        </div>
        {/* Template Info Banner */}
        {/* <div className="mb-6">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {templateName === "Modern" && (
                      <div className="flex items-center space-x-2">
                        <Zap className="h-5 w-5 text-blue-600" />
                        <div>
                          <div className="font-medium text-blue-900">
                            Modern Template
                          </div>
                          <div className="text-sm text-blue-700">
                            Clean header with contemporary typography
                          </div>
                        </div>
                      </div>
                    )}
                    {templateName === "Creative" && (
                      <div className="flex items-center space-x-2">
                        <Palette className="h-5 w-5 text-purple-600" />
                        <div>
                          <div className="font-medium text-purple-900">
                            Creative Template
                          </div>
                          <div className="text-sm text-purple-700">
                            Artistic design with unique visual elements
                          </div>
                        </div>
                      </div>
                    )}
                    {templateName === "Professional" && (
                      <div className="flex items-center space-x-2">
                        <Shield className="h-5 w-5 text-gray-700" />
                        <div>
                          <div className="font-medium text-gray-900">
                            Professional Template
                          </div>
                          <div className="text-sm text-gray-700">
                            Traditional business letter format
                          </div>
                        </div>
                      </div>
                    )}{" "}
                  </div>{" "}
                  <div className="text-sm text-gray-500">
                    Download formats: PDF & DOCX
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div> */}
        {/* Cover Letter Content */}
        <Card className="mb-6">
          {" "}
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Cover Letter</span>
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyToClipboard}
                className="flex items-center space-x-1"
              >
                <Copy className="h-4 w-4" />
                <span>Salin</span>
              </Button>{" "}
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <div className="min-h-96 rounded-lg border bg-white p-6">
                <StreamingText text={coverLetter} isLoading={false} />
              </div>
            </div>
          </CardContent>
        </Card>{" "}
        {/* Action Buttons */}
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button
            onClick={handleCreateAnother}
            className="flex items-center space-x-2"
          >
            <FileText className="h-4 w-4" />
            <span>Buat Cover Letter Lain</span>
          </Button>

          {/* <Button
            variant="outline"
            onClick={handleBackToForm}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Edit This Cover Letter</span>
          </Button> */}
        </div>
        {/* Tips Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">Langkah Selanjutnya</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
              <div>
                <h4 className="mb-2 font-medium">Sebelum Mengirim:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Tinjau dan personalisasi konten</li>
                  <li>• Periksa persyaratan khusus</li>
                  <li>• Koreksi kesalahan penulisan</li>
                </ul>
              </div>
              <div>
                <h4 className="mb-2 font-medium">Tips Kustomisasi:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Tambahkan riset perusahaan yang spesifik</li>
                  <li>• Sertakan pencapaian yang relevan</li>
                  <li>• Sesuaikan dengan kultur perusahaan</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
