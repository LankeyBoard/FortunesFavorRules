import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { getToken, setToken } from "@/utils/tokenCookie";

interface UserContextType {
  jwt: string | null;
  isLoggedIn: () => boolean;
  updateJwt: (token: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}): JSX.Element => {
  // Start null so server and first client render match, then hydrate from the
  // cookie in an effect to avoid a hydration mismatch.
  const [jwt, setJwt] = useState<string | null>(null);

  useEffect(() => {
    setJwt(getToken());
  }, []);

  const isLoggedIn = (): boolean => jwt !== null;

  const updateJwt = (token: string) => {
    setJwt(token);
    setToken(token);
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
