import { forwardRef, useId } from "react";

const Input = forwardRef(
  ({ label, type = "text", className = "", ...props }, ref) => {
    const inputId = useId();

    return (
      <div className="h-auto w-full">
        {label && (
          <label className="" htmlFor={inputId}>
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
