import { forwardRef, useId } from "react";

const Select = ({ label, options = [], className = "", ...props }, ref) => {
  const selectId = useId();

  return (
    <div className="h-auto w-full">
      {label && (
        <label htmlFor={selectId} className="">
          {label}
        </label>
      )}
      <select id={selectId} ref={ref} className={`${className}`}>
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

export default forwardRef(Select);
