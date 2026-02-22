"use client";

import React, { useState, ReactNode, useEffect } from "react";
import { useUser } from "./UserContext";
import SignupOrLoginModal from "./SignupLoginModal";
import FullPageLoading from "./FullPageLoading";

interface VerifyLoginProps {
  children: ReactNode;
  fallback?: ReactNode;
}

const VerifyLogin: React.FC<VerifyLoginProps> = ({
  children,
  fallback,
}): JSX.Element => {
  const { isLoggedIn } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(!isLoggedIn());
  const [isAuthenticated, setIsAuthenticated] = useState(isLoggedIn());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <FullPageLoading />;
  }
  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setIsModalOpen(false);
  };

  if (!isAuthenticated) {
    return (
      <>
        {fallback || (
          <div className="flex items-center justify-center min-h-screen">
            <p className="text-gray-600 dark:text-gray-400">
              Please log in to access this content.
            </p>
          </div>
        )}
        {isModalOpen && (
          <SignupOrLoginModal
            setIsOpen={setIsModalOpen}
            setIsAuthenticated={handleAuthSuccess}
            isLoginClicked={true}
          />
        )}
      </>
    );
  }

  return <>{children}</>;
};

export default VerifyLogin;
