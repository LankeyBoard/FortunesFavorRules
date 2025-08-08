"use client";

import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useUser } from "../UserContext";
import TextInput from "./Inputs/TextInput";
import Button, { ButtonType } from "./Inputs/Button";
import { handleLogin } from "@/utils/handleLogin";
import { usePathname } from "next/navigation";

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
      }
    }
  }
`;

const FORGOT_PASSWORD_MUTATION = gql`
  mutation ForgotPassword($email: String!, $baseUrl: String) {
    forgotPassword(email: $email, baseUrl: $baseUrl)
  }
`;

const LoginForm = ({
  setIsOpen,
  setIsAuthenticated,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [login, { error }] = useMutation(LOGIN_MUTATION);
  const [forgotPassword] = useMutation(FORGOT_PASSWORD_MUTATION);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotStatus, setForgotStatus] = useState<string | null>(null);
  const userContext = useUser();

  const handleSubmit = async (event: React.FormEvent) => {
    console.log("submit");
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    try {
      const { data } = await login({ variables: { email, password } });

      if (data?.login?.token) {
        userContext.updateJwt(data.login.token); // Update token in context
        localStorage.setItem("token", data.login.token); // Save token to local storage
        setIsOpen(false);
        setIsAuthenticated(true);
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotStatus(null);
    const host = window.location.host;
    console.log("Host", host);
    try {
      const { data } = await forgotPassword({
        variables: { email: forgotEmail, baseUrl: host },
      });
      if (data?.forgotPassword) {
        setForgotStatus("Password reset email sent!");
      } else {
        setForgotStatus("Could not send password reset email.");
      }
    } catch (err) {
      setForgotStatus("Error sending password reset email.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Email
          </label>
          <TextInput
            type="email"
            id="email"
            name="email"
            required
            pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black dark:text-white"
          />
        </div>
        <div className="form-group mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Password
          </label>
          <TextInput
            type="password"
            id="password"
            name="password"
            required
            pattern=".+"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black dark:text-white"
          />
        </div>
        <div className="form-actions flex justify-end space-x-4">
          <Button type="submit" color="amber" buttonType={ButtonType.default}>
            Login
          </Button>
          <Button
            color="gray"
            buttonType={ButtonType.default}
            onClick={() => {
              setIsOpen(false);
              setIsAuthenticated(false);
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
      <span className="test-wrap text-red-500 text-center">
        {error?.message
          ? "Error logging in, check your email and password and try again."
          : ""}
      </span>
      <div className="mt-4 text-center">
        {!showForgot ? (
          <Button
            color="blue"
            buttonType={ButtonType.simple}
            onClick={() => setShowForgot(true)}
          >
            Forgot my password
          </Button>
        ) : (
          <form onSubmit={handleForgotPassword} className="space-y-2">
            <TextInput
              type="email"
              name="forgotEmail"
              placeholder="Enter your email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              required
              className="block w-full px-3 py-2 border rounded-md"
            />
            <Button type="submit" color="amber" buttonType={ButtonType.default}>
              Send Reset Email
            </Button>
            <Button
              color="gray"
              buttonType={ButtonType.default}
              onClick={() => {
                setShowForgot(false);
                setForgotStatus(null);
                setForgotEmail("");
              }}
            >
              Cancel
            </Button>
            {forgotStatus && (
              <div className="text-sm mt-2 text-blue-600">{forgotStatus}</div>
            )}
          </form>
        )}
      </div>
    </>
  );
};

export default LoginForm;
