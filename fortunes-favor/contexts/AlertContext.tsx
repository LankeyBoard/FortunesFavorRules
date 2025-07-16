"use client";
import { createContext, useState } from "react";

const ALERT_TIME = 1000;
const initialState = {
  text: "",
  type: "",
};

const AlertContext = createContext({
  ...initialState,
  setAlert: (text: string, type: string) => {},
});

import { ReactNode } from "react";

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [text, setText] = useState("");
  const [type, setType] = useState("");

  const setAlert = (text: string, type: string) => {
    setText(text);
    setType(type);

    setTimeout(() => {
      setText("");
      setType("");
    }, ALERT_TIME);
  };

  return (
    <AlertContext.Provider
      value={{
        text,
        type,
        setAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
