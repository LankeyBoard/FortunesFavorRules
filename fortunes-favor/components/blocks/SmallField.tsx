import { twMerge } from "tailwind-merge";

const SmallField = ({
  children,
  className,
  label,
}: {
  children: React.ReactNode;
  label: string;
  className?: string;
}) => {
  return (
    <div
      className={twMerge(
        "grid grid-cols-1 text-center m-2 w-max flex-nowrap",
        className,
      )}
    >
      <span className="text-xs tracking-tighter capitalize">{label}</span>
      <span className="text-lg font-light whitespace-nowrap">{children}</span>
    </div>
  );
};

export default SmallField;
