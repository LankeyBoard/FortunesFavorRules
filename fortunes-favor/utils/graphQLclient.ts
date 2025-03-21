import { HttpLink } from "@apollo/client";

import { setContext } from "@apollo/client/link/context";
import {
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  credentials: "include",
});

const authLink = setContext((_, { headers }) => {
  console.log("graphql url", process.env.NEXT_PUBLIC_GRAPHQL_URL);
  // Retrieve token from localStorage or any other storage mechanism
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
