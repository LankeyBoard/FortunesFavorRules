import React, { createContext, useState, useContext, ReactNode } from "react";

interface UserContextType {
  jwt: string | null;
  isLoggedIn: () => boolean;
  updateJwt: (token: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}): JSX.Element => {
  const [jwt, setJwt] = useState<string | null>(() => {
    // Read from localStorage on first render
    if (typeof window !== "undefined") {
      return localStorage.getItem("jwt");
    }
    return null;
  });

  const isLoggedIn = (): boolean => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("jwt") !== null;
    }
    return !!jwt;
  };

  const updateJwt = (token: string) => {
    setJwt(token);
    if (typeof window !== "undefined") {
      localStorage.setItem("jwt", token);
    }
  };

  return (
    <UserContext.Provider value={{ jwt, isLoggedIn, updateJwt }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
