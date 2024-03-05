import { Dispatch, SetStateAction, useState } from "react";

type popoutProps = {
  child: JSX.Element | undefined;
  showPopout: Dispatch<SetStateAction<boolean>>;
  isSelected?: boolean;
  setSelectedSlug: Dispatch<SetStateAction<string | undefined>>;
  large?: boolean;
};

const OptionPopout = ({
  child,
  showPopout,
  isSelected = false,
  setSelectedSlug,
  large = false,
}: popoutProps) => {
  const [selected, setSelected] = useState(isSelected);
  if (!child) return;
  const popoutStyle =
    "h-min max-h-full bg-slate-700 p-4 items-start border-2 relative overflow-y-auto cursor-pointer "
      .concat(!selected ? "border-amber-700 " : "border-emerald-600 ")
      .concat(large ? "w-3/4" : "w-1/2");

  return (
    <div
      className="items-top flex fixed inset-0 z-50 outline-none focus:outline-none container mx-auto backdrop-blur-sm"
      onClick={() => {
        showPopout(false);
      }}
    >
      <div className="my-40 flex justify-center w-full">
        <div
          id={"popout-" + child.props.id}
          className={popoutStyle}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedSlug(!selected ? child.props.id : undefined);
            setSelected(!selected);
            console.info("selected slug ", selected);
          }}
        >
          <div className="">{child}</div>
          <div className="relative bottom-0 right-0 m-2 clear-both float-right cursor-pointer">
            <button
              className={
                !selected
                  ? "p-3 bg-emerald-600 hover:bg-emerald-500 mx-3 rounded-md"
                  : "p-3 bg-amber-700 mx-3 rounded-md"
              }
              onClick={(e) => {
                e.stopPropagation();
                setSelected(!selected);
                setSelectedSlug(child.props.id);
              }}
            >
              <span>{!selected ? "Select" : "Deselect"}</span>
            </button>
            <button
              className="p-3 bg-red-600 hover:bg-red-500 mx-3 rounded-md"
              onClick={(e) => {
                e.stopPropagation();
                showPopout(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionPopout;
