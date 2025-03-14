import NumInput from "./NumInput";
import SmallField from "../SmallField";

type LockableSmallFieldInputs = {
  isEditable: boolean;
  label: string;
  value: string | number;
  updateFunc: (input: any) => void;
};

const LockableSmallTextInput = ({
  isEditable,
  label,
  value,
  updateFunc,
}: LockableSmallFieldInputs) => {
  if (isEditable) {
    return (
      <NumInput
        defaultValue={value}
        size={String(value).length}
        onChange={(e) => updateFunc(e)}
      />
    );
  }

  return <SmallField label={label}>{value}</SmallField>;
};
export default LockableSmallTextInput;
