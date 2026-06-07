"use client";
import React, { useEffect, useState } from "react";
import SignupOrLoginModal from "./SignupLoginModal";
import Link from "next/link";
import Button, { ButtonType } from "./blocks/Inputs/Button";
import { getToken } from "@/utils/tokenCookie";

const SignupLoginButtons = ({
  initialIsAuthenticated = false,
}: {
  initialIsAuthenticated?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  // Seed from the server-read cookie so the first client render matches the
  // server HTML, then re-sync from the client cookie in case it changed.
  const [isAuthenticated, setIsAuthenticated] = useState(initialIsAuthenticated);
  useEffect(() => {
    setIsAuthenticated(getToken() !== null);
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
          className="text-nowrap"
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
