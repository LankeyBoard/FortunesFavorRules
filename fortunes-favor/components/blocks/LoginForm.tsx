"use client";

import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useUser } from "../UserContext";

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

const LoginForm = ({
  setIsOpen,
  setIsAuthenticated,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [login, { data, loading, error }] = useMutation(LOGIN_MUTATION);
  const userContext = useUser();

  const handleSubmit = async (event: React.FormEvent) => {
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
          <input
            type="email"
            id="email"
            name="email"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
          />
        </div>
        <div className="form-group mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
          />
        </div>
        <div className="form-actions flex justify-end space-x-4">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            OK
          </button>
          <button
            type="button"
            className="bg-gray-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            onClick={() => {
              setIsOpen(false);
              setIsAuthenticated(false);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
