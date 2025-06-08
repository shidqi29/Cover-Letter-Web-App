import React, { useEffect, useRef } from "react";

interface StreamingTextProps {
  text: string;
  isLoading: boolean;
}

const StreamingText: React.FC<StreamingTextProps> = ({ text, isLoading }) => {
  const textContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom as new text arrives
  useEffect(() => {
    if (textContainerRef.current) {
      const element = textContainerRef.current;
      element.scrollTop = element.scrollHeight;
    }
  }, [text]);

  return (
    <div className="relative">
      <div
        ref={textContainerRef}
        className="max-h-[300px] overflow-y-auto whitespace-pre-wrap rounded-md border border-gray-200 bg-white bg-opacity-95 p-3 text-sm shadow-inner sm:max-h-[400px] sm:p-4 sm:text-base lg:max-h-[500px]"
      >
        {text}
        {isLoading && (
          <span className="ml-1 inline-block animate-pulse font-mono text-blue-600">
            ▌
          </span>
        )}
      </div>

      {isLoading && text && (
        <div className="absolute bottom-2 right-2 rounded-full border border-blue-200 bg-white px-2 py-1 text-xs text-blue-500 shadow-sm sm:text-sm">
          AI is writing...
        </div>
      )}
    </div>
  );
};

export default StreamingText;
