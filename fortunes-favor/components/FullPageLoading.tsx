import React from "react";
import ColorfulWand from "./icons/ColorfulWand";

const FullPageLoading: React.FC = () => (
  <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-[9999]">
    <div className="animate-bounce">
      <ColorfulWand />
    </div>
  </div>
);

export default FullPageLoading;
