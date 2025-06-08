import React, { useState, useEffect } from "react";
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

const CoverLetterForm: React.FC = () => {
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
        setError("Please upload a job poster image");
        setLoading(false);
        return;
      }
      if (jobInputType === "link" && (!jobLink || isValidLink === false)) {
        setError(
          jobLink
            ? "Please enter a valid job link URL"
            : "Please enter a job link",
        );
        setLoading(false);
        return;
      }

      // Validate CV
      if (!cvFile) {
        setError("Please upload your CV/resume");
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
            "The job posting image may have limited information. ";

          toast.warning("Job posting image may have limited information", {
            description:
              "We'll create a cover letter but the quality might be affected. Consider uploading a clearer image if available.",
            duration: 5000,
          });
        }
      }

      if (jobInputType === "link" && jobLink) {
        if (jobSource === "Unknown") {
          hasLimitedInputs = true;
          warningMessage += "The job link source is unrecognized. ";

          toast.warning("Unrecognized job posting site", {
            description:
              "We'll try our best to extract job details, but the cover letter might be less specific.",
            duration: 5000,
          });
        } else {
          toast.info(`Processing job information from ${jobSource}`, {
            description:
              "We'll create a cover letter based on the information from this source.",
            duration: 4000,
          });
        }
      }

      // Check if CV file is large enough to likely contain useful information
      if (cvFile && cvFile.size < 10000) {
        // Less than 10KB
        hasLimitedInputs = true;
        warningMessage +=
          "Your resume file may not contain enough information. ";

        toast.warning("Resume file may have limited information", {
          description:
            "We'll create a cover letter but it might not be as tailored as possible. Consider providing a more detailed resume.",
          duration: 5000,
        });
      }

      // Show a final warning if multiple limited inputs are detected
      if (hasLimitedInputs) {
        toast.info("Adaptive cover letter generation", {
          description:
            "We'll create the best possible cover letter with the available information, filling in any gaps appropriately.",
          duration: 6000,
        });
      }

      const formData = new FormData();
      formData.append("language", language);
      formData.append("jobInputType", jobInputType);

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
          "We've adapted your cover letter based on available information.";
        if (generationMode === "job-focused") {
          message =
            "We've focused on the job requirements and used general professional qualities.";
        } else if (generationMode === "cv-focused") {
          message =
            "We've focused on your CV content and used general job qualities.";
        } else if (generationMode === "generic") {
          message =
            "We've created a generic cover letter with limited personalization.";
        }

        toast.info("Adaptive content generated", {
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

      // Show success notification
      toast.success("Cover letter generated successfully!", {
        description: "Your cover letter is ready to use.",
        duration: 3000,
      });
    } catch (err) {
      console.error("Error details:", err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while generating the cover letter";

      setError(errorMessage);

      // Show error notification
      toast.error("Failed to generate cover letter", {
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
        toast.info(`Detected job posting from ${source}`, {
          description: "We'll extract job details from this source.",
          duration: 3000,
        });
      } else if (!isLikelyJobPosting && !isKnownJobSite(normalizedUrl)) {
        // Valid URL but might not be a job posting
        const possibleCompany = extractCompanyFromUrl(normalizedUrl);
        toast.warning("This might not be a job posting URL", {
          description: possibleCompany
            ? `We detected this might be from ${possibleCompany}. For best results, use direct links to job postings.`
            : "For best results, use direct links to job postings.",
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
        toast.warning("Job posting image may have limited information", {
          description:
            "We'll still generate a cover letter with available information.",
          duration: 5000,
        });
        hasWarnings = true;
      }
    }

    if (jobInputType === "link" && jobLink && jobSource === "Unknown") {
      toast.warning("Unrecognized job posting site", {
        description:
          "We'll try our best to extract job details, but the cover letter might be less specific.",
        duration: 5000,
      });
      hasWarnings = true;
    }

    // Check CV quality
    if (cvInputQuality === "limited" || cvInputQuality === "poor") {
      toast.warning("CV/Resume may have limited information", {
        description:
          "We'll create a cover letter but it might not be as tailored as possible.",
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
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl lg:text-2xl">
          Generate Cover Letter
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="mb-4">
            <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <Label className="text-base font-semibold sm:text-lg">
                Job Information Source
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
                  Image
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
                    Upload Job Poster Image
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
                  Upload an image of the job posting. We&apos;ll extract
                  relevant information from it.
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
                    Enter Job Link
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
                  placeholder="https://www.jobstreet.com/job/123456"
                  value={jobLink}
                  onChange={(e) => setJobLink(e.target.value)}
                  className="mb-2"
                />{" "}
                <p className="text-xs text-gray-500">
                  Paste a link to a job posting from websites like JobStreet,
                  LinkedIn, Indeed, etc. We&apos;ll extract job details
                  automatically.
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
                      Validating link...
                    </span>
                  </div>
                )}
                {isValidLink === false && (
                  <p className="mt-2 text-sm text-red-500">
                    Invalid job link. Please enter a valid URL.
                  </p>
                )}
                {isValidLink === true && jobSource && (
                  <p className="mt-2 text-sm text-green-500">
                    Valid job link! Detected source:{" "}
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
                  Upload CV/Resume
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
                Upload your CV/resume in PDF or DOCX format. We&apos;ll match
                your skills with the job requirements.
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
                Select Language
              </Label>
              <RadioGroup
                defaultValue="english"
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
          </div>
          <div className="flex space-x-2">
            <Button
              type="submit"
              className="flex-1 py-2 text-sm sm:py-3 sm:text-base"
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Cover Letter"}
            </Button>
          </div>
          <ProgressIndicator loading={loading} />
        </form>
        {error && (
          <p className="mt-2 text-sm text-red-500 sm:text-base">{error}</p>
        )}
        {!loading && coverLetter && (
          <AdaptiveContentBanner
            hasLimitedJobInfo={hasLimitedJobInfo}
            hasLimitedCvInfo={hasLimitedCvInfo}
            isJobInfoRelevant={isJobInfoRelevant}
          />
        )}
        {(coverLetter || loading) && (
          <div className="mt-4 rounded bg-gray-100 p-3 sm:p-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-sm font-bold sm:text-base">
                {loading
                  ? "Generating Cover Letter..."
                  : "Generated Cover Letter:"}
              </h3>
              {coverLetter && !loading && (
                <div className="flex space-x-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="text-xs sm:text-sm"
                    onClick={() => {
                      navigator.clipboard.writeText(coverLetter);
                      toast.success("Copied to clipboard!", {
                        description:
                          "Cover letter content has been copied to your clipboard.",
                        duration: 2000,
                      });
                    }}
                  >
                    Copy
                  </Button>
                  <DownloadButton content={coverLetter} />
                </div>
              )}
            </div>
            <div className="relative mt-2">
              <StreamingText text={coverLetter || ""} isLoading={loading} />
            </div>
          </div>
        )}{" "}
        {/* Input quality assessment status */}
        <div className="mt-4 rounded-lg bg-white p-3 shadow-sm sm:p-4">
          <h4 className="text-sm font-semibold sm:text-base">
            Input Quality Assessment
          </h4>
          <div className="mt-2 space-y-3">
            {/* Job information quality status */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                Job Information Quality:
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm">
                  {jobInputQuality === "good" && "Complete"}
                  {jobInputQuality === "limited" && "Limited"}
                  {jobInputQuality === "poor" && "Minimal"}
                  {jobInputQuality === "unknown" && "Not provided"}
                </span>
                <InputQualityIndicator quality={jobInputQuality} type="job" />
              </div>
            </div>

            {/* CV information quality status */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">CV/Resume Quality:</span>
              <div className="flex items-center gap-2">
                <span className="text-sm">
                  {cvInputQuality === "good" && "Complete"}
                  {cvInputQuality === "limited" && "Limited"}
                  {cvInputQuality === "poor" && "Minimal"}
                  {cvInputQuality === "unknown" && "Not provided"}
                </span>
                <InputQualityIndicator quality={cvInputQuality} type="cv" />
              </div>
            </div>

            {/* Validity of job link if using link input */}
            {jobInputType === "link" && (
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Job Link Status:</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm">
                    {isValidLink === true && "Valid link"}
                    {isValidLink === false && "Invalid link"}
                    {isValidLink === null && "Not validated"}
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
