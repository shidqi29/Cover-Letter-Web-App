import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import StreamingText from "./StreamingText";
import ProgressIndicator from "./ProgressIndicator";
import DownloadButton from "./DownloadButton";
import { toast } from "sonner";
import {
  detectJobSource,
  assessJobInputQuality,
  assessCvInputQuality,
  getQualityTooltipMessage,
} from "../lib/document-utils";
import {
  validateJobLink,
  isKnownJobSite,
  extractCompanyFromUrl,
} from "../lib/link-validation";
import AdaptiveContentBanner from "./AdaptiveContentBanner";
import InputQualityIndicator, {
  InputQualityStatus,
} from "./InputQualityIndicator";
import Image from "next/image";
import { AlertCircle, AlertTriangle, CheckCircle, Info } from "lucide-react";

interface CoverLetterFormProps {
  selectedTemplate: string | null;
}

const CoverLetterForm: React.FC<CoverLetterFormProps> = ({
  selectedTemplate = null,
}) => {
  const router = useRouter();
  const [jobPosterPreview, setJobPosterPreview] = useState<string | null>(null);
  const [cvPreview, setCvPreview] = useState<string | null>(null);
  const [coverLetter, setCoverLetter] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [linkValidating, setLinkValidating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [jobInputType, setJobInputType] = useState<"image" | "link">("image");
  const [jobLink, setJobLink] = useState<string>("");
  const [jobSource, setJobSource] = useState<string>("");
  const [isValidLink, setIsValidLink] = useState<boolean | null>(null);
  // Add state for tracking input quality
  const [jobInputQuality, setJobInputQuality] =
    useState<InputQualityStatus>("unknown");
  const [cvInputQuality, setCvInputQuality] =
    useState<InputQualityStatus>("unknown");
  const [isRelatedInputs, setIsRelatedInputs] = useState<boolean | null>(null);

  // Validate job link when it changes
  useEffect(() => {
    // Reset validation state when link changes
    if (jobLink) {
      setIsValidLink(null); // Simple validation with debounce
      const timer = setTimeout(() => {
        handleValidateJobLink(jobLink);
      }, 800);

      return () => clearTimeout(timer);
    } else {
      setIsValidLink(null);
      setJobSource("");
    }
  }, [jobLink]);
  const handleJobPosterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Assess job input quality using imported function from document-utils
      const quality = assessJobInputQuality("image", file);
      setJobInputQuality(quality);

      const reader = new FileReader();
      reader.onloadend = () => {
        setJobPosterPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setJobInputQuality("unknown");
      setJobPosterPreview(null);
    }
  };
  const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Assess CV input quality using imported function from document-utils
      const quality = assessCvInputQuality(file);
      setCvInputQuality(quality);

      const reader = new FileReader();
      reader.onloadend = () => {
        setCvPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setCvInputQuality("unknown");
      setCvPreview(null);
    }
  };
  // Add state for adaptive content banner
  const [hasLimitedJobInfo, setHasLimitedJobInfo] = useState<boolean>(false);
  const [hasLimitedCvInfo, setHasLimitedCvInfo] = useState<boolean>(false);
  const [isJobInfoRelevant, setIsJobInfoRelevant] = useState<boolean>(true);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setCoverLetter(""); // Reset cover letter before starting stream

    // Reset adaptive content flags
    setHasLimitedJobInfo(false);
    setHasLimitedCvInfo(false);
    setIsJobInfoRelevant(true);

    // Check input quality and provide feedback before proceeding
    const hasInputQualityWarnings = checkInputQualityBeforeSubmit();

    try {
      const language =
        (
          document.querySelector(
            'input[name="language"]:checked',
          ) as HTMLInputElement
        )?.value || "english";
      const jobPosterFile =
        jobInputType === "image"
          ? (document.querySelector("#jobPoster") as HTMLInputElement)
              ?.files?.[0]
          : null;
      const cvFile = (document.querySelector("#cv") as HTMLInputElement)
        ?.files?.[0];

      // Validate job inputs based on selected option
      if (jobInputType === "image" && !jobPosterFile) {
        setError("Silakan unggah gambar lowongan pekerjaan");
        setLoading(false);
        return;
      }
      if (jobInputType === "link" && (!jobLink || isValidLink === false)) {
        setError(
          jobLink
            ? "Silakan masukkan URL link pekerjaan yang valid"
            : "Silakan masukkan link pekerjaan",
        );
        setLoading(false);
        return;
      } // Validate CV
      if (!cvFile) {
        setError("Silakan unggah CV/resume Anda");
        setLoading(false);
        return;
      }

      // Validate template selection
      if (!selectedTemplate) {
        setError("Silakan pilih template surat lamaran");
        setLoading(false);
        return;
      }

      // Assess input quality and provide feedback to the user
      let hasLimitedInputs = false;
      let warningMessage = "";

      // Check job information quality
      if (jobInputType === "image" && jobPosterPreview) {
        // Basic check for image size as a proxy for quality
        const estimatedSize = jobPosterPreview.length * 0.75; // Rough estimate from base64
        if (estimatedSize < 50000) {
          // Less than ~50KB
          hasLimitedInputs = true;
          warningMessage +=
            "Gambar lowongan pekerjaan mungkin memiliki informasi terbatas. ";

          toast.warning(
            "Gambar lowongan pekerjaan mungkin memiliki informasi terbatas",
            {
              description:
                "Kami akan membuat surat lamaran tetapi kualitasnya mungkin terpengaruh. Pertimbangkan untuk mengunggah gambar yang lebih jelas jika tersedia.",
              duration: 5000,
            },
          );
        }
      }

      if (jobInputType === "link" && jobLink) {
        if (jobSource === "Unknown") {
          hasLimitedInputs = true;
          warningMessage += "Sumber link pekerjaan tidak dikenal. ";

          toast.warning("Situs lowongan pekerjaan tidak dikenal", {
            description:
              "Kami akan berusaha sebaik mungkin untuk mengekstrak detail pekerjaan, tapi surat lamaran mungkin kurang spesifik.",
            duration: 5000,
          });
        } else {
          toast.info(`Memproses informasi pekerjaan dari ${jobSource}`, {
            description:
              "Kami akan membuat surat lamaran berdasarkan informasi dari sumber ini.",
            duration: 4000,
          });
        }
      }

      // Check if CV file is large enough to likely contain useful information
      if (cvFile && cvFile.size < 10000) {
        // Less than 10KB
        hasLimitedInputs = true;
        warningMessage +=
          "File resume Anda mungkin tidak berisi informasi yang cukup. ";

        toast.warning("File resume mungkin memiliki informasi terbatas", {
          description:
            "Kami akan membuat surat lamaran tetapi mungkin tidak sesuai secara maksimal. Pertimbangkan untuk memberikan resume yang lebih detail.",
          duration: 5000,
        });
      }

      // Show a final warning if multiple limited inputs are detected
      if (hasLimitedInputs) {
        toast.info("Pembuatan surat lamaran adaptif", {
          description:
            "Kami akan membuat surat lamaran terbaik dengan informasi yang tersedia, mengisi celah yang ada dengan tepat.",
          duration: 6000,
        });
      }
      const formData = new FormData();
      formData.append("language", language);
      formData.append("jobInputType", jobInputType);

      // Add template information
      if (selectedTemplate) {
        formData.append("template", selectedTemplate);
      }

      if (jobInputType === "image" && jobPosterFile) {
        formData.append("jobPoster", jobPosterFile);
      } else if (jobInputType === "link" && jobLink) {
        formData.append("jobLink", jobLink);
      }

      if (cvFile) {
        formData.append("cv", cvFile);
      } // Use fetch instead of axios for better streaming support
      const response = await fetch("/api/generate", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate cover letter");
      }

      // Check for headers that indicate input quality issues
      const hasLimitedJobInfo =
        response.headers.get("X-Job-Info-Limited") === "true";
      const hasLimitedCvInfo =
        response.headers.get("X-CV-Info-Limited") === "true";
      const isJobInfoRelevant =
        response.headers.get("X-Job-Info-Relevant") !== "false";
      const generationMode =
        response.headers.get("X-Generation-Mode") || "standard";

      // Update state for the adaptive content banner
      setHasLimitedJobInfo(hasLimitedJobInfo);
      setHasLimitedCvInfo(hasLimitedCvInfo);
      setIsJobInfoRelevant(isJobInfoRelevant);

      // Show appropriate feedback based on generation mode
      if (generationMode !== "standard") {
        let message =
          "Kami telah menyesuaikan surat lamaran berdasarkan informasi yang tersedia.";
        if (generationMode === "job-focused") {
          message =
            "Kami telah fokus pada persyaratan pekerjaan dan menggunakan kualitas profesional umum.";
        } else if (generationMode === "cv-focused") {
          message =
            "Kami telah fokus pada konten CV Anda dan menggunakan kualitas pekerjaan umum.";
        } else if (generationMode === "generic") {
          message =
            "Kami telah membuat surat lamaran umum dengan personalisasi terbatas.";
        }

        toast.info("Konten adaptif telah dibuat", {
          description: message,
          duration: 5000,
        });
      }

      // Handle the stream response
      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("Response stream not available");
      }

      const decoder = new TextDecoder();
      let accumulatedContent = ""; // Process stream chunks
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        // Decode and accumulate the chunk
        const chunk = decoder.decode(value, { stream: true });
        accumulatedContent += chunk;
        setCoverLetter(accumulatedContent);
      }
      // Final chunk has been processed
      const finalText = decoder.decode();
      if (finalText) {
        accumulatedContent += finalText;
        setCoverLetter(accumulatedContent);
      }

      // Show success notification and redirect to result page
      toast.success("Surat lamaran berhasil dibuat!", {
        description: "Mengalihkan ke surat lamaran yang telah dibuat...",
        duration: 2000,
      }); // Encode the cover letter content and redirect to result page
      const encodedContent = encodeURIComponent(accumulatedContent);
      const templateParam = selectedTemplate
        ? `&template=${selectedTemplate}`
        : "";
      router.push(`/generate/result?content=${encodedContent}${templateParam}`);
    } catch (err) {
      console.error("Error details:", err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while generating the cover letter";

      setError(errorMessage);

      // Show error notification
      toast.error("Gagal membuat surat lamaran", {
        description: errorMessage,
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  }; // Validate job link format and attempt to detect source
  const handleValidateJobLink = async (link: string) => {
    try {
      setLinkValidating(true);

      // Use our enhanced validation utility
      const {
        isValid,
        normalizedUrl,
        isLikelyJobPosting,
        qualityScore,
        potentialIssues,
      } = await validateJobLink(link);

      if (!isValid) {
        setIsValidLink(false);
        setJobSource("");
        return;
      }

      // Try to detect job source from link
      const source = detectJobSource(normalizedUrl);
      setJobSource(source);
      setIsValidLink(true);

      // Set job input quality based on link validation results
      if (qualityScore >= 70) {
        setJobInputQuality("good");
      } else if (qualityScore >= 40) {
        setJobInputQuality("limited");
      } else {
        setJobInputQuality("poor");
      }

      // Show more specific feedback based on detection
      if (source !== "Unknown") {
        toast.info(`Lowongan pekerjaan terdeteksi dari ${source}`, {
          description:
            "Kami akan mengekstrak detail pekerjaan dari sumber ini.",
          duration: 3000,
        });
      } else if (!isLikelyJobPosting && !isKnownJobSite(normalizedUrl)) {
        // Valid URL but might not be a job posting
        const possibleCompany = extractCompanyFromUrl(normalizedUrl);
        toast.warning("Ini mungkin bukan URL lowongan pekerjaan", {
          description: possibleCompany
            ? `Kami mendeteksi ini mungkin dari ${possibleCompany}. Untuk hasil terbaik, gunakan link langsung ke lowongan pekerjaan.`
            : "Untuk hasil terbaik, gunakan link langsung ke lowongan pekerjaan.",
          duration: 5000,
        });
      }
    } catch (err) {
      setIsValidLink(false);
      console.error("Error validating link:", err);
    } finally {
      setLinkValidating(false);
    }
  };
  // Check input quality and provide feedback before generating cover letter
  const checkInputQualityBeforeSubmit = () => {
    let hasWarnings = false;

    // Check job information quality
    if (jobInputType === "image" && jobPosterPreview) {
      if (jobInputQuality === "limited" || jobInputQuality === "poor") {
        toast.warning(
          "Gambar lowongan pekerjaan mungkin memiliki informasi terbatas",
          {
            description:
              "Kami tetap akan membuat surat lamaran dengan informasi yang tersedia.",
            duration: 5000,
          },
        );
        hasWarnings = true;
      }
    }

    if (jobInputType === "link" && jobLink && jobSource === "Unknown") {
      toast.warning("Situs lowongan pekerjaan tidak dikenal", {
        description:
          "Kami akan berusaha sebaik mungkin untuk mengekstrak detail pekerjaan, tapi surat lamaran mungkin kurang spesifik.",
        duration: 5000,
      });
      hasWarnings = true;
    }

    // Check CV quality
    if (cvInputQuality === "limited" || cvInputQuality === "poor") {
      toast.warning("CV/Resume mungkin memiliki informasi terbatas", {
        description:
          "Kami akan membuat surat lamaran tetapi mungkin tidak sesuai secara maksimal.",
        duration: 5000,
      });
      hasWarnings = true;
    }

    return hasWarnings;
  };
  /**
   * Renders an input quality indicator icon
   * @param quality The input quality status
   * @returns Icon component
   */
  const renderQualityIndicator = (quality: InputQualityStatus) => {
    switch (quality) {
      case "good":
        return <CheckCircle className="text-green-500" size={16} />;
      case "limited":
        return <Info className="text-amber-500" size={16} />;
      case "poor":
        return <AlertTriangle className="text-red-500" size={16} />;
      default:
        return <AlertCircle className="text-gray-400" size={16} />;
    }
  }; // Using imported getQualityTooltipMessage from document-utils.ts

  return (
    <Card className="mx-auto w-full max-w-4xl p-3 shadow-lg sm:p-4 lg:p-6">
      {/* <CardHeader>
        <CardTitle className="text-lg sm:text-xl lg:text-2xl">
          Generate Cover Letter
        </CardTitle>
      </CardHeader> */}
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="mb-4">
            <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <Label className="text-base font-semibold sm:text-lg">
                Sumber Informasi Pekerjaan
              </Label>
              <div className="flex w-full gap-1 rounded-lg bg-slate-100 p-1 sm:w-auto sm:gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant={jobInputType === "image" ? "default" : "ghost"}
                  className="flex-1 text-xs sm:flex-none sm:text-sm"
                  onClick={() => {
                    setJobInputType("image");
                    setJobLink("");
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                    <circle cx="9" cy="9" r="2" />
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                  </svg>
                  Gambar
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={jobInputType === "link" ? "default" : "ghost"}
                  className="flex-1 text-xs sm:flex-none sm:text-sm"
                  onClick={() => {
                    setJobInputType("link");
                    setJobPosterPreview(null);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                  Link
                </Button>
              </div>
            </div>

            {jobInputType === "image" ? (
              <div className="rounded-lg border bg-white p-3 shadow-sm sm:p-4">
                {" "}
                <div className="mb-2 flex items-center">
                  <Label htmlFor="jobPoster" className="block">
                    Unggah Gambar Lowongan Pekerjaan
                  </Label>
                  {jobPosterPreview && (
                    <InputQualityIndicator
                      quality={jobInputQuality}
                      type="job"
                    />
                  )}
                </div>
                <Input
                  id="jobPoster"
                  type="file"
                  accept="image/*"
                  onChange={handleJobPosterChange}
                  className="mb-2"
                />{" "}
                <p className="mb-2 text-xs text-gray-500">
                  Unggah gambar lowongan pekerjaan. Kami akan mengekstrak
                  informasi yang relevan dari gambar tersebut.
                </p>
                {jobPosterPreview && (
                  <div className="mt-2 overflow-hidden rounded border">
                    {" "}
                    <Image
                      src={jobPosterPreview}
                      alt="Job Poster Preview"
                      className="h-auto w-full"
                      width={500}
                      height={300}
                      style={{ width: "100%", height: "auto" }}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-lg border bg-white p-3 shadow-sm sm:p-4">
                {" "}
                <div className="mb-2 flex items-center">
                  <Label htmlFor="jobLink" className="block">
                    Masukkan Link Pekerjaan
                  </Label>
                  {jobLink && isValidLink !== null && (
                    <InputQualityIndicator
                      quality={jobInputQuality}
                      type="job"
                    />
                  )}
                </div>
                <Input
                  id="jobLink"
                  type="url"
                  placeholder="https://www.jobstreet.co.id/job/123456"
                  value={jobLink}
                  onChange={(e) => setJobLink(e.target.value)}
                  className="mb-2"
                />{" "}
                <p className="text-xs text-gray-500">
                  Tempelkan link lowongan pekerjaan dari website seperti
                  JobStreet, LinkedIn, Indeed, dll. Kami akan mengekstrak detail
                  pekerjaan secara otomatis.
                </p>
                {linkValidating && (
                  <div className="mt-2 flex items-center gap-2">
                    <svg
                      className="h-5 w-5 animate-spin text-blue-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 1 1 16 0 8 8 0 0 1-16 0zm2 0a6 6 0 1 0 12 0 6 6 0 0 0-12 0z"
                      />
                    </svg>
                    <span className="text-sm text-gray-700">
                      Memvalidasi link...
                    </span>
                  </div>
                )}
                {isValidLink === false && (
                  <p className="mt-2 text-sm text-red-500">
                    Link pekerjaan tidak valid. Silakan masukkan URL yang valid.
                  </p>
                )}
                {isValidLink === true && jobSource && (
                  <p className="mt-2 text-sm text-green-500">
                    Link pekerjaan valid! Sumber terdeteksi:{" "}
                    <span className="font-semibold">{jobSource}</span>
                  </p>
                )}
              </div>
            )}
          </div>{" "}
          <div className="mb-4">
            <div className="rounded-lg border bg-white p-3 shadow-sm sm:p-4">
              {" "}
              <div className="mb-2 flex items-center">
                <Label htmlFor="cv" className="block">
                  Unggah CV/Resume
                </Label>
                {cvPreview && (
                  <InputQualityIndicator quality={cvInputQuality} type="cv" />
                )}
              </div>
              <Input
                id="cv"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleCvChange}
                className="mb-2"
              />{" "}
              <p className="mb-2 text-xs text-gray-500">
                Unggah CV/resume Anda dalam format PDF atau DOCX. Kami akan
                mencocokkan keahlian Anda dengan persyaratan pekerjaan.
              </p>{" "}
              {cvPreview && (
                <div className="mt-2 overflow-hidden rounded border">
                  <iframe
                    src={cvPreview}
                    className="h-48 w-full sm:h-64"
                    title="CV Preview"
                  />
                </div>
              )}
            </div>
          </div>{" "}
          <div className="mb-4">
            <div className="rounded-lg border bg-white p-3 shadow-sm sm:p-4">
              <Label className="mb-2 block text-sm sm:text-base">
                Pilih Bahasa
              </Label>
              <RadioGroup
                defaultValue="indonesian"
                className="flex flex-col gap-2 sm:flex-row sm:gap-4"
              >
                <div className="flex items-center space-x-2 rounded-md border p-2 hover:bg-slate-50">
                  <RadioGroupItem value="english" id="english" />
                  <Label htmlFor="english" className="text-sm sm:text-base">
                    English
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-md border p-2 hover:bg-slate-50">
                  <RadioGroupItem value="indonesian" id="indonesian" />
                  <Label htmlFor="indonesian" className="text-sm sm:text-base">
                    Bahasa Indonesia
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>{" "}
          <div className="flex space-x-2">
            <Button
              type="submit"
              className="flex-1 py-2 text-sm sm:py-3 sm:text-base"
              disabled={loading || !selectedTemplate}
            >
              {loading
                ? "Membuat..."
                : !selectedTemplate
                  ? "Pilih Template Terlebih Dahulu"
                  : "Buat Surat Lamaran"}
            </Button>
          </div>
          <ProgressIndicator loading={loading} />
        </form>{" "}
        {error && (
          <p className="mt-2 text-sm text-red-500 sm:text-base">{error}</p>
        )}
        {/* Input quality assessment status */}
        <div className="mt-4 rounded-lg bg-white p-3 shadow-sm sm:p-4">
          <h4 className="text-sm font-semibold sm:text-base">
            Penilaian Kualitas Input
          </h4>
          <div className="mt-2 space-y-3">
            {/* Job information quality status */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                Kualitas Informasi Pekerjaan:
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm">
                  {jobInputQuality === "good" && "Lengkap"}
                  {jobInputQuality === "limited" && "Terbatas"}
                  {jobInputQuality === "poor" && "Minimal"}
                  {jobInputQuality === "unknown" && "Belum diberikan"}
                </span>
                <InputQualityIndicator quality={jobInputQuality} type="job" />
              </div>
            </div>

            {/* CV information quality status */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Kualitas CV/Resume:</span>
              <div className="flex items-center gap-2">
                <span className="text-sm">
                  {cvInputQuality === "good" && "Lengkap"}
                  {cvInputQuality === "limited" && "Terbatas"}
                  {cvInputQuality === "poor" && "Minimal"}
                  {cvInputQuality === "unknown" && "Belum diberikan"}
                </span>
                <InputQualityIndicator quality={cvInputQuality} type="cv" />
              </div>
            </div>

            {/* Validity of job link if using link input */}
            {jobInputType === "link" && (
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  Status Link Pekerjaan:
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm">
                    {isValidLink === true && "Link valid"}
                    {isValidLink === false && "Link tidak valid"}
                    {isValidLink === null && "Belum divalidasi"}
                  </span>
                  {isValidLink === true && (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                  {isValidLink === false && (
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  )}
                  {isValidLink === null && (
                    <AlertCircle className="h-4 w-4 text-gray-300" />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CoverLetterForm;
