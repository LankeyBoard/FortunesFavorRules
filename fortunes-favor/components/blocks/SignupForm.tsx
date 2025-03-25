"use client";

import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useUser } from "../UserContext";
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
        localStorage.setItem("token", data.createUser.token); // Save token to local storage
        updateJwt(data.createUser.token);
        setIsOpen(false);
        setIsAuthenticated(true);
      }
    } catch (err) {
      console.error("Sign Up failed:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group mb-4">
        <label
          htmlFor="signup-email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Email
        </label>
        <TextInput
          type="email"
          id="signup-email"
          name="email"
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
        />
      </div>
      <div className="form-group mb-4">
        <label
          htmlFor="signup-name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Name
        </label>
        <TextInput
          type="text"
          id="signup-name"
          name="name"
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
        />
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
        />
      </div>
      <div className="text-red">{error?.message}</div>
      <div className="form-actions flex justify-end space-x-4">
        <Button
          type="submit"
          color="amber"
          buttonType={ButtonType.default}
          className="bg-amber-700 text-white px-4 py-2 rounded-md shadow-sm hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 text-no-wrap"
        >
          Sign Up
        </Button>
        <Button
          color="gray"
          buttonType={ButtonType.default}
          className="bg-gray-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          onClick={() => setIsOpen(false)}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default SignupForm;
