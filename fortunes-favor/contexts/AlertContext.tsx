"use client";
import { createContext, useState } from "react";

const ALERT_TIME = 20000;

export enum AlertType {
  INFO = "info",
  WARNING = "warning",
  ERROR = "error",
}

const initialState = {
  text: "",
  type: undefined as AlertType | undefined,
};

const AlertContext = createContext({
  ...initialState,
  setAlert: (text: string, type: AlertType) => {},
});

import { ReactNode } from "react";

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [text, setText] = useState("");
  const [type, setType] = useState(undefined as AlertType | undefined);

  const setAlert = (text: string, type: AlertType) => {
    setText(text);
    setType(type);

    setTimeout(() => {
      setText("");
      setType(undefined);
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
