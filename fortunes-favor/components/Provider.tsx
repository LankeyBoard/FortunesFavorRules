"use client";

import client from "@/utils/graphQLclient";
import { ApolloProvider } from "@apollo/client";
import { ReactNode } from "react";
import { UserProvider } from "./UserContext";

export const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <ApolloProvider client={client}>
      <UserProvider>{children}</UserProvider>
    </ApolloProvider>
  );
};
