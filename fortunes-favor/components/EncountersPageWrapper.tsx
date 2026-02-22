"use client";

import EncountersPage from "./EncountersPage";
import { useEffect, useState } from "react";

const EncountersWrapper = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  if (!localStorage.getItem("token")) {
    return (
      <div className="w-full p-4 text-center">
        <p>Sign up or log in to view your encounters</p>
      </div>
    );
  }

  return <EncountersPage />;
};

export default EncountersWrapper;
