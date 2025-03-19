import React, { InputHTMLAttributes } from "react";

interface NumInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const NumInput: React.FC<NumInputProps> = (props) => {
  return (
    <input
      {...props}
      type="number"
      className="text-black bg-inherit dark:text-white text-center border-2 border-teal-700 rounded-md focus-visible:border-teal-500 focus-visible:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
    />
  );
};

export default NumInput;
