import { ChangeEventHandler, InputHTMLAttributes } from "react";
type options = { title: string; slug: string };
interface DropdownFieldProps extends InputHTMLAttributes<HTMLSelectElement> {
  name: string;
  options: string[] | options[];
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  unselectedOption?: boolean;
}

export const DropdownField: React.FC<DropdownFieldProps> = (props) => {
  // if the option is a string, convert it to an object with a slug and title
  const options: options[] = props.options.map((o) => {
    if (typeof o === "string") return { title: o, slug: o };
    else return o;
  });
  return (
    <div className="w-max">
      <label
        htmlFor={props.name}
        className="block mb-2 text-xs tracking-tighter opacity-80 capitalize text-center"
      >
        {props.name}
      </label>
      <select
        {...props}
        id={props.name}
        value={props.value}
        className="w-fit bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
      >
        {props.unselectedOption && (
          <option key={"unknown"} value={undefined}>
            &#8212;
          </option>
        )}
        {options.map((o) => {
          if (!o.slug) o.slug = props.name.concat(o.title);
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
