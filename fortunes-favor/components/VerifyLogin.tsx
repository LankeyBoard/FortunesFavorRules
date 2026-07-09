"use client";

import React, { useState, ReactNode, useEffect } from "react";
import { useUser } from "./UserContext";
import FullPageLoading from "./FullPageLoading";
import SignupForm from "./blocks/SignupForm";
import LoginForm from "./blocks/LoginForm";
import useAlert from "@/hooks/useAlert";
import { AlertType } from "@/contexts/AlertContext";

interface VerifyLoginProps {
  children: ReactNode;
}

const VerifyLogin: React.FC<VerifyLoginProps> = ({ children }): JSX.Element => {
  const { jwt } = useUser();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    setIsAuthenticated(Boolean(jwt));
    setIsClient(true);
  }, [jwt]);

  const { setAlert } = useAlert();

  if (!isClient) {
    return <FullPageLoading />;
  }

  if (!isAuthenticated) {
    return (
      <div className="flex md:min-h-screen md:items-center justify-center p-4 md:p-0">
        <div
          className="w-full max-w-md rounded bg-slate-200 shadow-lg dark:bg-slate-700 md:m-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between">
            <button
              className={`w-1/2 px-4 py-2 ${!isLogin ? "bg-purple-800 text-white" : "bg-gray-300 hover:bg-gray-400 text-black cursor-pointer "}`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
            <button
              className={`w-1/2 px-4 py-2 ${isLogin ? "bg-purple-800 text-white" : "bg-gray-300 hover:bg-gray-400 text-black cursor-pointer "}`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
          </div>
          <div className="px-6 pt-2 pb-6 border-8 border-purple-800 inset-0 flex items-center justify-center">
            {isLogin ? (
              <LoginForm
                setIsOpen={() => {
                  setAlert(
                    "This page cannot be accessed without signing up or logging in.",
                    AlertType.WARNING,
                    3000,
                  );
                }}
                setIsAuthenticated={setIsAuthenticated}
              />
            ) : (
              <SignupForm
                setIsOpen={() => {
                  setAlert(
                    "This page cannot be accessed without signing up or logging in.",
                    AlertType.WARNING,
                    3000,
                  );
                }}
                setIsAuthenticated={setIsAuthenticated}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default VerifyLogin;
