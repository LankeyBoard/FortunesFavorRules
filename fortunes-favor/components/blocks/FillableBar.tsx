import { twJoin, twMerge } from "tailwind-merge";
export enum FillableBarColor {
  LIME = "bg-lime-300 dark:bg-lime-700",
  RED = "bg-red-300 dark:bg-red-700",
  BLUE = "bg-blue-300 dark:bg-blue-700",
  GREEN = "bg-green-300 dark:bg-green-700",
  CYAN = "bg-cyan-300 dark:bg-cyan-700",
  YELLOW = "bg-yellow-400 dark:bg-yellow-600",
}
const FillableBar = ({
  currentValue,
  maxValue,
  overLimitText,
  label,
  barColor = FillableBarColor.LIME,
  overflowAtMax = false,
  className,
}: {
  currentValue: number;
  maxValue: number;
  overLimitText: string;
  barColor?: FillableBarColor;
  label: string;
  overflowAtMax?: boolean;
  className?: string;
}) => {
  const percent = Math.max(Math.min((currentValue / maxValue) * 100, 100), 0);
  const overLimit = overflowAtMax ? currentValue > maxValue : currentValue <= 0;
  const barBackgroundColor = overLimit
    ? "bg-red-500"
    : "bg-gray-300 dark:bg-black";
  const barStyle = twJoin(
    `w-full h-4 rounded overflow-visible relative z-10`,
    barColor,
  );

  return (
    <div className={twMerge("w-full max-w-xs mx-auto my-2", className)}>
      <div
        className={`w-full h-4 ${barBackgroundColor} rounded overflow-visible relative`}
      >
        <div className={barStyle} style={{ width: `${percent}%` }} />
        <div className="absolute inset-y-0 left-2 flex items-center text-xs font-semibold pointer-events-none z-20">
          {label && (
            <span className="pr-2">
              {label}: {currentValue}/{maxValue}
            </span>
          )}
          {overLimit && <span className="mx-auto">{overLimitText}</span>}
        </div>
      </div>
    </div>
  );
};

export default FillableBar;
