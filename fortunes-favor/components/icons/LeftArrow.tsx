const LeftArrow: React.FC<React.HTMLAttributes<SVGElement>> = ({
  ...props
}) => {
  return (
    <svg
      className={props.className || "w-8 h-8 "}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 18"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
        d="M5 12h14M5 12l4-4m-4 4 4 4"
      />
    </svg>
  );
};

export default LeftArrow;
