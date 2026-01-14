import { twMerge } from "tailwind-merge";

interface TagProps extends React.AllHTMLAttributes<HTMLDivElement> {}

const Tag: React.FC<TagProps> = ({ ...props }) => {
  return (
    <div
      {...props}
      className={twMerge(
        "p-2 m-1 bg-blue-300 dark:bg-blue-700 text-sm font-light rounded-xl",
        props.className,
      )}
    >
      {props.children}
    </div>
  );
};
export default Tag;
