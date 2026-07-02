"use client";

import useAlert from "../hooks/useAlert";
import {AlertType} from "../contexts/AlertContext";
import { twMerge } from "tailwind-merge";

const AlertPopup = () => {
  const { text, type } = useAlert();

  const alertClasses = (() => {
    switch (type) {
      case AlertType.INFO:
        return "bg-emerald-300/30 dark:bg-emerald-700/30 ";
      case AlertType.WARNING:
        return "bg-amber-300/30 dark:bg-amber-700/30";
      case AlertType.ERROR:
        return "bg-red-300/30 dark:bg-red-700/30";
      default:
        return "bg-amber-300/30 dark:bg-amber-700/30";
    }
  })();

  if (text && type) {
    return (
      <div className="z-50 fixed bottom-3 inset-x-0 flex flex-row justify-center items-center ">
        <div className={twMerge("rounded-md", alertClasses)}>
          <p className="px-4 py-2 rounded-md backdrop-blur-md">
            {text}
          </p>
        </div>
      </div>
    );
  } else return <></>;
};

export default AlertPopup;
