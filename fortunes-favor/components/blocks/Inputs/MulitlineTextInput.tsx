// filepath: d:\Documents\FortunesFavor\rules\fortunes-favor\components\blocks\Inputs\MultilineTextInput.tsx
import React, { forwardRef, TextareaHTMLAttributes } from "react";

interface MultilineTextInputProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const MultilineTextInput = forwardRef<HTMLTextAreaElement, MultilineTextInputProps>(
  (props, ref) => {
    return (
      <textarea
        ref={ref}
        className="w-full text-black bg-inherit dark:text-white text-start border-b-2 border-teal-700 focus-visible:border-teal-500 focus-visible:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        {...props}
      />
    );
  },
);

MultilineTextInput.displayName = "MultilineTextInput";

export default MultilineTextInput;
