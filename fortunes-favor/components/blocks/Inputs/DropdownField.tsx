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
    console.log("options updated");
    let optionObjs = options.map((option) => {
      return { title: option, slug: name + option };
    });
    options = optionObjs;
  }
  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize"
      >
        {name}
      </label>
      <select
        id={name}
        onChange={onChange}
        defaultValue={defaultValue}
        className="w-fit bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {mayBeDeselected && (
          <option key={"unknown"} value={undefined}>
            &#8212;
          </option>
        )}
        {options.map((o) => {
          if (!o.slug) o.slug = name.concat(o.title);
          return (
            <option key={o.slug} value={o.slug} className="capitalize">
              {o.title}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default DropdownField;
