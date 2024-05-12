import { ChangeEventHandler } from "react";

type inputFieldProps = {
  name: string;
  type?: string;
  isRequired?: boolean;
  defaultValue?: string | number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

type dropdownFieldProps = {
  name: string;
  defaultValue?: string | number;
  options: any[];
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  unselectedOption?: boolean;
};

const InputField = ({
  name,
  type = "text",
  isRequired = false,
  defaultValue,
  onChange,
}: inputFieldProps) => {
  const inputClass =
    "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-amber-500 focus:outline-none focus:ring-0 focus:border-amber-600 peer";
  const labelClass =
    "peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-amber-600 peer-focus:dark:text-amber-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6";
  return (
    <div className="relative z-0 max-w-sm mb-5 group">
      <input
        type={type}
        name={name}
        id={name}
        className={inputClass}
        placeholder={""}
        required={isRequired}
        defaultValue={defaultValue}
        onChange={onChange}
      />
      <label htmlFor={name} className={labelClass}>
        {name}
      </label>
    </div>
  );
};

export const DropdownField = ({
  name,
  defaultValue = 0,
  options,
  unselectedOption = false,
  onChange,
}: dropdownFieldProps) => {
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
        defaultValue={defaultValue}
        onChange={onChange}
        className="w-fit bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {unselectedOption && (
          <option key={"unknown"} value={undefined}>
            &#8212;
          </option>
        )}
        {options.map((o) => {
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

export default InputField;
