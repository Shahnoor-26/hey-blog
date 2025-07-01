import { useId } from "react";

const Select = (
  { options = [], label = "", className = "", ...props },
  ref
) => {
  const selectId = useId();
  return (
    <div className="h-auto w-full">
      {label && <label htmlFor={selectId}>{label}</label>}
      <select id={selectId} ref={ref} className={`${className}`} {...props}>
        {options &&
          options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
      </select>
    </div>
  );
};

export default Select;
