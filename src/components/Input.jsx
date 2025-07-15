import { forwardRef, useId } from "react";

const Input = forwardRef(
  ({ label, type = "text", className = "", ...props }, ref) => {
    const inputId = useId();

    return (
      <div className="h-auto w-full flex justify-between items-center gap-2.5">
        {label && (
          <label htmlFor={inputId} className="truncate">
            {label}
          </label>
        )}
        <input
          id={inputId}
          type={type}
          className={className}
          {...props}
          ref={ref}
        />
      </div>
    );
  }
);

export default Input;
