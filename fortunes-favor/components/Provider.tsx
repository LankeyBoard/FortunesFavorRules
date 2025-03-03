"use client";

import client from "@/utils/graphQLclient";
import { ApolloProvider } from "@apollo/client";
import { ReactNode } from "react";

export const Provider = ({ children }: { children: ReactNode }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
