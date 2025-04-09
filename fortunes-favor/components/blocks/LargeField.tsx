const LargeField = ({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) => {
  return (
    <div>
      <h3 className="text-lg">{label}</h3>
      <ul className="px-4">{children}</ul>
    </div>
  );
};

export default LargeField;
