// filepath: d:\Documents\FortunesFavor\rules\fortunes-favor\components\blocks\Inputs\MultilineTextInput.tsx
import React, { TextareaHTMLAttributes } from "react";

interface MultilineTextInputProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const MultilineTextInput: React.FC<MultilineTextInputProps> = (props) => {
  return (
    <textarea
      className="w-full text-black bg-inherit dark:text-white text-start border-b-2 border-teal-700 focus-visible:border-teal-500 focus-visible:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      {...props}
    />
  );
};

export default MultilineTextInput;
