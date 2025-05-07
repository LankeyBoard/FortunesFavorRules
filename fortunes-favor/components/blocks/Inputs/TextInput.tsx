import React, { InputHTMLAttributes } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const TextInput: React.FC<TextInputProps> = (props) => {
  return (
    <input
      type="text"
      {...props}
      className="text-black bg-inherit dark:text-white text-start border-b-2 border-teal-700 focus-visible:border-teal-500 focus-visible:outline-none required:border-amber-700 invalid:focus-visible:border-red-500 invalid:border-red-700 required:focus-visible:border-amber-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
    />
  );
};

export default TextInput;
