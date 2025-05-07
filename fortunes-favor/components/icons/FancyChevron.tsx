const FancyChevron = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="hover:-translate-y-1"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M17.657 11.2929L16.2428 12.7071L12.0002 8.46444L7.75748 12.7071L6.34326 11.2929L12.0001 5.63605L17.657 11.2929Z"
          className="fill-amber-400"
        ></path>{" "}
        <path
          d="M17.657 16.9497L16.2428 18.3639L12.0002 14.1213L7.75748 18.364L6.34326 16.9498L12.0001 11.2929L17.657 16.9497Z"
          className="fill-amber-200"
        ></path>{" "}
      </g>
    </svg>
  );
};

export default FancyChevron;
