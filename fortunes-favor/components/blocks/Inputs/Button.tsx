export enum ButtonType {
  simple,
  default,
  icon,
}

const SimpleButtonColor = {
  amber: "border-amber-300 dark:border-amber-700 hover:border-amber-500",
  gray: "border-slate-300 dark:border-slate-700 hover:border-slate-500",
  green: "border-emerald-300 dark:border-emerald-700 hover:border-emerald-500",
  red: "border-red-300 dark:border-red-700 hover:border-red-500",
  blue: "border-blue-300 dark:border-blue-700 hover:border-blue-500",
};
const DefaultButtonColor = {
  amber:
    "bg-amber-400 dark:bg-amber-700 hover:bg-amber}-500 hover:dark:bg-amber-600 border-amber-300 dark:border-amber-700 hover:border-amber-500",
  gray: "bg-slate-400 dark:bg-slate-700 hover:bg-slate-500 hover:dark:bg-slate-600 border-slate-300 dark:border-slate-700 hover:border-slate-500",
  green:
    "bg-emerald-400 dark:bg-emerald-700 hover:bg-emerald-500 hover:dark:bg-emerald-600 border-emerald-300 dark:border-emerald-700 hover:border-emerald-500",
  red: "bg-red-400 dark:bg-red-700 hover:bg-red-500 hover:dark:bg-red-600 border-red-300 dark:border-red-700 hover:border-red-500",
  blue: "bg-blue-400 dark:bg-blue-700 hover:bg-blue-500 hover:dark:bg-blue-600 border-blue-300 dark:border-blue-700 hover:border-blue-500",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  buttonType: ButtonType;
  color?: keyof typeof DefaultButtonColor;
}
const Button: React.FC<ButtonProps> = ({
  children,
  buttonType,
  color,
  ...props
}) => {
  let buttonStyle = "cursor-pointer p-2 " + props.className;
  if (color) {
    const SIMPLE_BUTTON_STYLE = `${SimpleButtonColor[color]} px-2 py-0 mb-2 border-b-2 text-gray-700 dark:text-gray-300 hover:text-black hover:dark:text-white block cursor-pointer bg-transparent`;

    const DEFAULT_BUTTON_STYLE = `${DefaultButtonColor[color]} font-extralight tracking-tight mx-2 py-2 px-3 rounded  cursor-pointer align-text-top`;

    switch (buttonType) {
      case ButtonType.simple:
        buttonStyle = SIMPLE_BUTTON_STYLE;
        break;
      case ButtonType.default:
        buttonStyle = DEFAULT_BUTTON_STYLE;
        break;
    }
  }
  if (buttonType === ButtonType.icon) {
    buttonStyle += " w-10";
  }
  buttonStyle = props.className + " " + buttonStyle;
  return (
    <button type="button" {...props} className={buttonStyle}>
      {children}
    </button>
  );
};

export default Button;
