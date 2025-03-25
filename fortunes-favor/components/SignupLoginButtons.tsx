"use client";
import React, { useEffect, useState } from "react";
import SignupOrLoginModal from "./SignupLoginModal";
import Link from "next/link";
import Button, { ButtonType } from "./blocks/Inputs/Button";

const SignupLoginButtons = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    typeof localStorage !== "undefined"
      ? localStorage.getItem("token") === null
      : false,
  );
  useEffect(() => {
    setIsAuthenticated(
      typeof localStorage !== "undefined"
        ? localStorage.getItem("token") !== null
        : false,
    );
  }, []);
  const [loginClicked, setLoginClicked] = useState(false);
  if (!isAuthenticated)
    return (
      <div className="flex">
        <Button
          color="gray"
          buttonType={ButtonType.simple}
          onClick={() => {
            setIsOpen(true), setLoginClicked(true);
          }}
        >
          login
        </Button>
        <Button
          color="amber"
          buttonType={ButtonType.default}
          onClick={() => {
            setIsOpen(true), setLoginClicked(false);
          }}
        >
          Sign up
        </Button>
        {isOpen && (
          <SignupOrLoginModal
            setIsOpen={setIsOpen}
            setIsAuthenticated={setIsAuthenticated}
            isLoginClicked={loginClicked}
          />
        )}
      </div>
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
