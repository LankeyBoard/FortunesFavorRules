import React, { InputHTMLAttributes } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const TextInput: React.FC<TextInputProps> = (props) => {
  return (
    <input
      type="text"
      {...props}
      className="text-black bg-inherit dark:text-white text-start border-b-2 border-teal-700 focus-visible:border-teal-500 focus-visible:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
    />
  );
};

export default TextInput;
