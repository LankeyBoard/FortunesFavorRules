import isUserOnIOS from "@/utils/isUserOnIOS";
import React, { InputHTMLAttributes } from "react";

interface NumInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const NumInput: React.FC<NumInputProps> = (props) => {
  return (
    <input
      {...props}
      type="text"
      pattern="-?[0-9]*"
      inputMode={isUserOnIOS() ? "text" : "decimal"}
      autoComplete="off"
      className={
        props.className +
        " px-2 text-black bg-inherit dark:text-white text-center border-2 border-teal-700 rounded-md focus-visible:border-teal-500 focus-visible:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none field-sizing-content"
      }
    />
  );
};

export default NumInput;
