"use client";
import { createContext, useState } from "react";

const ALERT_TIME = 2000;

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
  setAlert: (text: string, type: AlertType, time?: number) => {},
});

import { ReactNode } from "react";

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [text, setText] = useState("");
  const [type, setType] = useState(undefined as AlertType | undefined);

  const setAlert = (
    text: string,
    type: AlertType,
    time: number = ALERT_TIME,
  ) => {
    setText(text);
    setType(type);

    setTimeout(() => {
      setText("");
      setType(undefined);
    }, time);
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
