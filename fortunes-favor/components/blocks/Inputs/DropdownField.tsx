import { ChangeEventHandler, InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
type options = { title: string; slug: string };
interface DropdownFieldProps extends InputHTMLAttributes<HTMLSelectElement> {
  name: string;
  options?: string[] | options[];
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  unselectedOption?: boolean;
}

export const DropdownField: React.FC<DropdownFieldProps> = (props) => {
  // if the option is a string, convert it to an object with a slug and title
  const options: options[] | undefined = props.options?.map((o) => {
    if (typeof o === "string") return { title: o, slug: o };
    else return o;
  });
  const { unselectedOption, ...cleanProps } = props; 

  return (
    <div className={twMerge("w-max max-w-full min-w-0", props.className)}>
      <label
        htmlFor={cleanProps.name}
        className="block mb-2 text-xs tracking-tighter opacity-80 capitalize text-center"
      >
        {cleanProps.name}
      </label>
      <select
        {...cleanProps}
        id={cleanProps.name}
        value={cleanProps.value}
        className="w-full min-w-0 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
      >
        {unselectedOption && (
          <option key={"unknown"} value={undefined}>
            &#8212;
          </option>
        )}
        {options?.map((o) => {
          if (!o.slug) o.slug = cleanProps.name.concat(o.title);
          return (
            <option key={o.slug} value={o.slug} className="">
              {o.title}
            </option>
          );
        })}
        {cleanProps.children}
      </select>
    </div>
  );
};
export default DropdownField;
