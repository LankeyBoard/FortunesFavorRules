"use server";

import { gql } from "@apollo/client";
import client from "@/utils/graphQLclient";
const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const handleLogin = async (event: React.FormEvent) => {
  event.preventDefault();
  const form = event.target as HTMLFormElement;
  const email = (form.elements.namedItem("email") as HTMLInputElement).value;
  const password = (form.elements.namedItem("password") as HTMLInputElement)
    .value;
  console.log("email", email, "password", password);
  try {
    const { data } = await client.mutate({
      mutation: LOGIN_MUTATION,
      variables: { email, password },
    });
    const token = data.login.token;
    // Handle the token (e.g., save it to localStorage or context)
    console.log("Login successful, token:", token);
  } catch (error) {
    console.error("Login failed:", error);
    // Handle error (e.g., show error message to the user)
  }
};
