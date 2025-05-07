type VerticalLabeledBoxProps = {
  children: React.ReactNode;
  label: string;
};

const VerticalLabeledBox = ({ children, label }: VerticalLabeledBoxProps) => {
  return (
    <div className="flex p-4">
      <span className="-rotate-90 flex-none h-0 w-min pb-6 my-auto mx-0 uppercase font-thin text-sm opacity-80 tracking-wider absolute translate-y-8 -translate-x-3 invisible sm:visible">
        {label}
      </span>
      <div className="flex-initial m-auto basis-full">{children}</div>
    </div>
  );
};
export default VerticalLabeledBox;
