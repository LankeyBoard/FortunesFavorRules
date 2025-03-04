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
  const [jwt, setJwt] = useState<string | null>(null);

  const isLoggedIn = () => !!jwt;

  const updateJwt = (token: string) => {
    setJwt(token);
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
