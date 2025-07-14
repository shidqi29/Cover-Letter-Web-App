import React from "react";

interface ProgressIndicatorProps {
  loading: boolean;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ loading }) => {
  if (!loading) return null;
  return (
    <div className="my-2 flex items-center space-x-2">
      <div className="h-1 w-full overflow-hidden rounded-full bg-gray-200">
        <div className="h-1 animate-progress rounded-full bg-blue-500"></div>
      </div>
      <span className="whitespace-nowrap text-xs text-blue-500 sm:text-sm">
        Memproses...
      </span>
    </div>
  );
};

export default ProgressIndicator;
