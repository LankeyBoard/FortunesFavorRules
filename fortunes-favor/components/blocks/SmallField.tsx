const SmallField = ({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) => {
  return (
    <div className="grid grid-cols-1 text-center m-2 w-max flex-nowrap">
      <span className="text-lg font-light whitespace-nowrap">{children}</span>
      <span className="text-xs tracking-tighter opacity-80">{label}</span>
    </div>
  );
};

export default SmallField;
