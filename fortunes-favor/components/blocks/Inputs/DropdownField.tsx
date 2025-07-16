import { ChangeEventHandler } from "react";

type dropdownFieldProps = {
  name: string;
  defaultValue?: string | number;
  options: any[];
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  unselectedOption?: boolean;
};

export const DropdownField = ({
  name,
  defaultValue,
  options,
  unselectedOption: mayBeDeselected = false,
  onChange,
}: dropdownFieldProps) => {
  if (options.length > 0 && typeof options.at(0) === "string") {
    options = options.map((option) => {
      return { title: option, slug: option };
    });
  }
  return (
    <div className="w-max">
      <label
        htmlFor={name}
        className="block mb-2 text-xs tracking-tighter opacity-80 capitalize text-center"
      >
        {name}
      </label>
      <select
        id={name}
        onChange={onChange}
        defaultValue={defaultValue}
        className="w-fit bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
      >
        {mayBeDeselected && (
          <option key={"unknown"} value={undefined}>
            &#8212;
          </option>
        )}
        {options.map((o) => {
          if (!o.slug) o.slug = name.concat(o.title);
          return (
            <option key={o.slug} value={o.slug} className="">
              {o.title}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default DropdownField;
