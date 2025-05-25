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

const CoverLetterForm: React.FC = () => {
  const [jobPosterPreview, setJobPosterPreview] = useState<string | null>(null);
  const [cvPreview, setCvPreview] = useState<string | null>(null);
  const [coverLetter, setCoverLetter] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [apiStatus, setApiStatus] = useState<string>("Not tested");

  // Test API connection on component mount
  useEffect(() => {
    const testApiConnection = async () => {
      try {
        const response = await axios.get("/api/test");
        setApiStatus(`API test successful: ${response.data.message}`);
        console.log("API test response:", response.data);
      } catch (err) {
        setApiStatus("API test failed");
        console.error("API test error:", err);
      }
    };

    testApiConnection();
  }, []);

  const handleJobPosterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setJobPosterPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCvPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleTestEndpoint = async () => {
    setLoading(true);
    setError(null);
    setCoverLetter("");

    try {
      // Use fetch for streaming support
      const response = await fetch("/api/test?stream=true", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ testData: "This is a test" }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to test API");
      }

      // Handle the stream response
      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("Response stream not available");
      }

      const decoder = new TextDecoder();
      let accumulatedContent = "";

      // Process stream chunks
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
      toast.success("API test successful", {
        description: "The API endpoint is responding correctly with streaming.",
        duration: 3000,
      });
    } catch (err) {
      console.error("Test API error details:", err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while testing API";

      setError(errorMessage);

      // Show error notification
      toast.error("API test failed", {
        description: errorMessage,
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setCoverLetter(""); // Reset cover letter before starting stream

    try {
      const language =
        (
          document.querySelector(
            'input[name="language"]:checked',
          ) as HTMLInputElement
        )?.value || "english";
      const jobPosterFile = (
        document.querySelector("#jobPoster") as HTMLInputElement
      )?.files?.[0];
      const cvFile = (document.querySelector("#cv") as HTMLInputElement)
        ?.files?.[0];

      const formData = new FormData();
      formData.append("language", language);
      if (jobPosterFile) {
        formData.append("jobPoster", jobPosterFile);
      }
      if (cvFile) {
        formData.append("cv", cvFile);
      }

      // Use fetch instead of axios for better streaming support
      const response = await fetch("/api/generate", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate cover letter");
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
  };

  return (
    <Card className="mx-auto w-full max-w-2xl p-6 shadow-lg">
      <CardHeader>
        <CardTitle>Generate Cover Letter</CardTitle>
        <div className="text-sm text-gray-500">API Status: {apiStatus}</div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="jobPoster">Upload Job Poster (Image)</Label>
            <Input
              id="jobPoster"
              type="file"
              accept="image/*"
              onChange={handleJobPosterChange}
            />
            {jobPosterPreview && (
              <div className="mt-2">
                <img
                  src={jobPosterPreview}
                  alt="Job Poster Preview"
                  className="h-auto w-full"
                />
              </div>
            )}
          </div>
          <div>
            <Label htmlFor="cv">Upload CV (PDF/DOC)</Label>
            <Input
              id="cv"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleCvChange}
            />
            {cvPreview && (
              <div className="mt-2">
                <iframe
                  src={cvPreview}
                  className="h-64 w-full"
                  title="CV Preview"
                />
              </div>
            )}
          </div>
          <div>
            <Label>Select Language</Label>
            <RadioGroup defaultValue="english" className="mt-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="english" id="english" />
                <Label htmlFor="english">English</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="indonesian" id="indonesian" />
                <Label htmlFor="indonesian">Bahasa Indonesia</Label>
              </div>
            </RadioGroup>
          </div>{" "}
          <div className="flex space-x-2">
            <Button type="submit" className="flex-1" disabled={loading}>
              {loading ? "Generating..." : "Generate Cover Letter"}
            </Button>
            <Button
              type="button"
              onClick={handleTestEndpoint}
              className="flex-1"
              disabled={loading}
            >
              Test API
            </Button>
          </div>
          <ProgressIndicator loading={loading} />
        </form>
        {error && <p className="mt-2 text-red-500">{error}</p>}
        {(coverLetter || loading) && (
          <div className="mt-4 rounded bg-gray-100 p-4">
            {" "}
            <div className="flex items-center justify-between">
              <h3 className="font-bold">
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
                  </Button>{" "}
                  <DownloadButton content={coverLetter} />
                </div>
              )}
            </div>{" "}
            <div className="relative mt-2">
              <StreamingText text={coverLetter || ""} isLoading={loading} />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CoverLetterForm;
