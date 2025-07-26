import { useId } from "react";

const Select = (
  { options = [], label = "", className = "", ...props },
  ref
) => {
  const selectId = useId();
  return (
    <div className="min-h-fit w-full">
      {label && <label htmlFor={selectId}>{label}</label>}
      <select
        id={selectId}
        ref={ref}
        className={`${className}`}
        {...props}
        defaultValue={options[0]}
      >
        {options &&
          options.map((option) => (
            <option key={option} value={String(option).toLowerCase()}>
              {option}
            </option>
          ))}
      </select>
    </div>
  );
};

export default Select;
