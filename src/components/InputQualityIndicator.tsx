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
          return "Informasi pekerjaan tampak lengkap";
        case "limited":
          return "Informasi pekerjaan mungkin terbatas - kami akan mengisi celah yang ada";
        case "poor":
          return "Informasi pekerjaan minimal - surat lamaran akan menggunakan konten umum";
        default:
          return "Kualitas input pekerjaan tidak diketahui";
      }
    } else {
      switch (quality) {
        case "good":
          return "Informasi CV/Resume tampak lengkap";
        case "limited":
          return "CV/Resume mungkin memiliki informasi terbatas - kami akan menyesuaikan";
        case "poor":
          return "Informasi CV minimal - surat lamaran akan menggunakan kualitas profesional umum";
        default:
          return "Kualitas input CV tidak diketahui";
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
