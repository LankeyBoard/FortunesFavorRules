"use client";
import React, { useState } from "react";
import LoginForm from "./blocks/LoginForm";
import SignupForm from "./blocks/SignupForm";

const SignupOrLoginModal = ({
  setIsOpen,
  setIsAuthenticated,
  isLoginClicked,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  isLoginClicked: boolean;
}) => {
  const [isLogin, setIsLogin] = useState(isLoginClicked);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div
        className="bg-slate-300 dark:bg-slate-700 rounded shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between">
          <button
            className={`w-1/2 px-4 py-2 ${!isLogin ? "bg-purple-800 text-white" : "bg-gray-300 text-black"}`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
          <button
            className={`w-1/2 px-4 py-2 ${isLogin ? "bg-purple-800 text-white" : "bg-gray-300 text-black"}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
        </div>
        <div className="px-6 pt-2 pb-6 border-8 border-purple-800">
          {isLogin ? (
            <LoginForm
              setIsOpen={setIsOpen}
              setIsAuthenticated={setIsAuthenticated}
            />
          ) : (
            <SignupForm
              setIsOpen={setIsOpen}
              setIsAuthenticated={setIsAuthenticated}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupOrLoginModal;
