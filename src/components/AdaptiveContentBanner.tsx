import React from "react";
import { AlertCircle, Info, AlertTriangle } from "lucide-react";

interface AdaptiveContentBannerProps {
  hasLimitedJobInfo: boolean;
  hasLimitedCvInfo: boolean;
  isJobInfoRelevant: boolean;
}

const AdaptiveContentBanner: React.FC<AdaptiveContentBannerProps> = ({
  hasLimitedJobInfo,
  hasLimitedCvInfo,
  isJobInfoRelevant,
}) => {
  // Don't show the banner if both inputs are good
  if (!hasLimitedJobInfo && !hasLimitedCvInfo && isJobInfoRelevant) {
    return null;
  }

  // Determine banner appearance based on input quality
  let icon = <Info className="h-5 w-5 text-blue-400" />;
  let bgColor = "bg-blue-50";
  let textColor = "text-blue-800";
  let borderColor = "border-blue-200";
  let title = "Cover Letter Generated";
  let message = "Your cover letter has been generated successfully.";

  // Serious input limitations
  if ((hasLimitedJobInfo && hasLimitedCvInfo) || !isJobInfoRelevant) {
    icon = <AlertTriangle className="h-5 w-5 text-amber-400" />;
    bgColor = "bg-amber-50";
    textColor = "text-amber-800";
    borderColor = "border-amber-200";
    title = "Limited Information Cover Letter";
    message =
      "This cover letter was created with limited information. We've used general professional content to fill in gaps.";
  }
  // One input is limited
  else if (hasLimitedJobInfo || hasLimitedCvInfo) {
    icon = <AlertCircle className="h-5 w-5 text-blue-400" />;
    title = "Adaptive Cover Letter";
    message = hasLimitedJobInfo
      ? "This cover letter was created with limited job information. We focused more on your CV/resume content."
      : "This cover letter was created with limited CV information. We focused more on the job requirements.";
  }

  return (
    <div className={`${bgColor} border ${borderColor} mb-4 rounded-md p-4`}>
      <div className="flex">
        <div className="flex-shrink-0">{icon}</div>
        <div className="ml-3">
          <h3 className={`text-sm font-medium ${textColor}`}>{title}</h3>
          <div className={`mt-2 text-sm ${textColor}`}>
            <p>{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdaptiveContentBanner;
