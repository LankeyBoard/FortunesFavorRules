"use client";
import React, { useEffect, useState } from "react";
import SignupOrLoginModal from "./SignupLoginModal";
import Link from "next/link";

const SignupLoginButtons = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    typeof localStorage !== "undefined"
      ? localStorage.getItem("token") === null
      : false,
  );
  useEffect(() => {
    console.log(localStorage.getItem("token"));
    console.log(
      typeof localStorage !== "undefined"
        ? localStorage.getItem("token") !== null
        : false,
    );
    setIsAuthenticated(
      typeof localStorage !== "undefined"
        ? localStorage.getItem("token") !== null
        : false,
    );
  }, []);
  const [loginClicked, setLoginClicked] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };
  if (!isAuthenticated)
    return (
      <>
        <button
          className="font-extralight tracking-tight m-2 align-middle hover:underline hover:opacity-75"
          onClick={() => {
            setIsOpen(true), setLoginClicked(true);
          }}
        >
          login
        </button>
        <button
          className="bg-amber-400 dark:bg-amber-700 font-extralight tracking-tight mx-2 py-2 px-3 rounded hover:bg-amber-500 hover:dark:bg-amber-600 align-middle"
          onClick={() => {
            setIsOpen(true), setLoginClicked(false);
          }}
        >
          Sign up
        </button>
        {isOpen && (
          <SignupOrLoginModal
            setIsOpen={setIsOpen}
            setIsAuthenticated={setIsAuthenticated}
            isLoginClicked={loginClicked}
          />
        )}
      </>
    );
  else
    return (
      <Link
        href="/profile"
        className="hover:text-amber-700 hover:dark:text-amber-300"
      >
        Profile
      </Link>
    );
};

export default SignupLoginButtons;
