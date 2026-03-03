import React from "react";

const SmallLoading: React.FC = () => {
  return (
    <div className="flex items-center justify-center gap-1">
      <div
        className="w-2 h-2 bg-current rounded-full animate-bounce"
        style={{ animationDelay: "-0.32s" }}
      />
      <div
        className="w-2 h-2 bg-current rounded-full animate-bounce"
        style={{ animationDelay: "-0.16s" }}
      />
      <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
    </div>
  );
};

export default SmallLoading;
