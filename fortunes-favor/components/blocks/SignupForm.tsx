"use client";

import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useUser } from "../UserContext";
import { setToken } from "@/utils/tokenCookie";
import TextInput from "./Inputs/TextInput";
import Button, { ButtonType } from "./Inputs/Button";

const SIGNUP_MUTATION = gql`
  mutation Signup($email: String!, $name: String!, $password: String!) {
    createUser(email: $email, name: $name, password: $password) {
      token
      user {
        id
        name
      }
    }
  }
`;

const SignupForm = ({
  setIsOpen,
  setIsAuthenticated,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION);
  const userContext = useUser();
  const updateJwt = userContext.updateJwt;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    try {
      const { data } = await signup({ variables: { email, name, password } });

      if (data?.createUser?.token) {
        userContext.updateJwt(data.createUser.token); // Update token in context
        setToken(data.createUser.token); // Save token to auth cookie
        updateJwt(data.createUser.token);
        setIsOpen(false);
        setIsAuthenticated(true);
      }
    } catch (err) {
      console.error("Sign Up failed:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2">
      <div className="form-group mb-4">
        <label
          htmlFor="signup-email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Email
        </label>
        <TextInput type="email" id="signup-email" name="email" required />
      </div>
      <div className="form-group mb-4">
        <label
          htmlFor="signup-name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Username
        </label>
        <TextInput type="text" id="signup-name" name="name" required />
      </div>
      <div className="form-group mb-4">
        <label
          htmlFor="signup-password"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Password
        </label>
        <TextInput
          type="password"
          id="signup-password"
          name="password"
          required
          placeholder="Must be at least 6 characters"
          pattern=".{6,}"
        />
      </div>
      <div className="text-red">{error?.message}</div>
      <div className="form-actions flex justify-end space-x-4">
        <Button
          color="gray"
          buttonType={ButtonType.default}
          onClick={() => setIsOpen(false)}
        >
          Cancel
        </Button>
        <Button type="submit" color="amber" buttonType={ButtonType.default}>
          Sign Up
        </Button>
      </div>
    </form>
  );
};

export default SignupForm;
