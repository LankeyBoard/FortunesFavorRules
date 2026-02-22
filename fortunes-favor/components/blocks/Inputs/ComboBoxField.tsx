import {
  InputHTMLAttributes,
  useState,
  useRef,
  useEffect,
  useMemo,
} from "react";
import { twMerge } from "tailwind-merge";

type option = { title: string; slug: string };

interface ComboBoxFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  options?: string[] | option[];
  handleChange?: () => {};
  unselectedOption?: boolean;
}

export const ComboBoxField: React.FC<ComboBoxFieldProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>(
    props.value ? String(props.value) : "",
  );
  const [filteredOptions, setFilteredOptions] = useState<option[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);

  // Convert options to standardized format
  const normalizedOptions: option[] = useMemo(
    () =>
      (props.options || []).map((o) => {
        if (typeof o === "string") return { title: o, slug: o };
        else return o;
      }),
    [props.options],
  );

  // Filter options based on input
  useEffect(() => {
    const searchValue = inputValue.toLowerCase();
    const filtered = normalizedOptions.filter(
      (o) =>
        o.title.toLowerCase().includes(searchValue) ||
        o.slug.toLowerCase().includes(searchValue),
    );
    setFilteredOptions(filtered);
    setHighlightedIndex(-1);
  }, [inputValue, normalizedOptions]);

  // Focus highlighted option into view
  useEffect(() => {
    if (highlightedIndex >= 0 && optionRefs.current[highlightedIndex]) {
      optionRefs.current[highlightedIndex]?.focus();
      optionRefs.current[highlightedIndex]?.scrollIntoView({
        block: "nearest",
      });
    }
  }, [highlightedIndex]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("input change", e.target.value);
    const value = e.target.value;
    setInputValue(value);
    setIsOpen(true);
    if (props.onChange) {
      props.onChange(e);
    }
  };

  // Handle option selection
  const handleSelectOption = (option: option) => {
    setInputValue(option.title);
    setIsOpen(false);
    if (props.onChange) {
      const event = {
        target: { value: option.slug },
      } as React.ChangeEvent<HTMLInputElement>;
      props.onChange(event);
    }
  };

  // Handle clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle keyboard events
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        setHighlightedIndex(0);
      } else if (filteredOptions.length > 0) {
        setHighlightedIndex(0);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (isOpen && filteredOptions.length > 0) {
        setHighlightedIndex(filteredOptions.length - 1);
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (inputValue && !isOpen) {
        handleSelectOption({ title: inputValue, slug: inputValue });
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setHighlightedIndex(-1);
    }
  };

  const handleOptionKeyDown = (
    e: React.KeyboardEvent<HTMLLIElement>,
    index: number,
  ) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (index < filteredOptions.length - 1) {
        setHighlightedIndex(index + 1);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (index > 0) {
        setHighlightedIndex(index - 1);
      } else {
        setHighlightedIndex(-1);
        inputRef.current?.focus();
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleSelectOption(filteredOptions[index]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setHighlightedIndex(-1);
      inputRef.current?.focus();
    }
  };

  return (
    <div
      ref={containerRef}
      className={twMerge("w-max relative", props.className)}
    >
      <label
        htmlFor={props.name}
        className="block mb-2 text-xs tracking-tighter opacity-80 capitalize text-center"
      >
        {props.name}
      </label>
      <div className="relative">
        <input
          {...props}
          ref={inputRef}
          type="text"
          id={props.name}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          placeholder={props.placeholder || "Type or select..."}
          className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
        />
        {isOpen && filteredOptions.length > 0 && (
          <ul className="absolute top-full left-0 right-0 mt-1 bg-gray-50 border border-gray-300 rounded-lg shadow-md z-10 max-h-60 overflow-y-auto dark:bg-gray-700 dark:border-gray-600">
            {props.unselectedOption && (
              <li
                ref={(el) => {
                  optionRefs.current[-1] = el;
                }}
                onClick={() => {
                  setInputValue("");
                  setIsOpen(false);
                  if (props.onChange) {
                    const event = {
                      target: { value: "" },
                    } as React.ChangeEvent<HTMLInputElement>;
                    props.onChange(event);
                  }
                }}
                onKeyDown={(e) => handleOptionKeyDown(e, -1)}
                tabIndex={highlightedIndex === -1 && isOpen ? 0 : -1}
                className={twMerge(
                  "px-4 py-2 cursor-pointer text-gray-900 dark:text-white",
                  highlightedIndex === -1
                    ? "bg-teal-100 dark:bg-teal-900"
                    : "hover:bg-teal-100 dark:hover:bg-teal-900",
                )}
              >
                &#8212;
              </li>
            )}
            {filteredOptions.map((o, index) => (
              <li
                key={o.slug}
                ref={(el) => {
                  optionRefs.current[index] = el;
                }}
                onClick={() => handleSelectOption(o)}
                onKeyDown={(e) => handleOptionKeyDown(e, index)}
                tabIndex={highlightedIndex === index && isOpen ? 0 : -1}
                className={twMerge(
                  "px-4 py-2 cursor-pointer text-gray-900 dark:text-white",
                  highlightedIndex === index
                    ? "bg-teal-100 dark:bg-teal-900"
                    : "hover:bg-teal-100 dark:hover:bg-teal-900",
                )}
              >
                {o.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ComboBoxField;
