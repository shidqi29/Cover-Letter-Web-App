import React from "react";
import { AlertCircle, AlertTriangle, CheckCircle, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

// Input quality status type
export type InputQualityStatus = "unknown" | "good" | "limited" | "poor";

interface InputQualityIndicatorProps {
  quality: InputQualityStatus;
  type: "job" | "cv";
}

const InputQualityIndicator: React.FC<InputQualityIndicatorProps> = ({
  quality,
  type,
}) => {
  // Render icon based on quality assessment
  const renderIcon = () => {
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
  };

  // Get tooltip message based on input type and quality
  const getTooltipMessage = (): string => {
    if (type === "job") {
      switch (quality) {
        case "good":
          return "Job information appears complete";
        case "limited":
          return "Job information may be limited - we'll fill in any gaps";
        case "poor":
          return "Minimal job information - cover letter will use generic content";
        default:
          return "Job input quality unknown";
      }
    } else {
      switch (quality) {
        case "good":
          return "CV/Resume information appears complete";
        case "limited":
          return "CV/Resume may have limited information - we'll adapt accordingly";
        case "poor":
          return "Minimal CV information - cover letter will use generic professional qualities";
        default:
          return "CV input quality unknown";
      }
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="ml-2 cursor-help">
          {renderIcon()}
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-xs">{getTooltipMessage()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default InputQualityIndicator;
