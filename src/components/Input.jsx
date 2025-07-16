import { forwardRef, useId } from "react";

const Input = forwardRef(
  ({ label, type = "text", className = "", ...props }, ref) => {
    const inputId = useId();

    return (
      <div className="h-auto w-full flex max-sm:flex-col justify-between items-center max-sm:items-baseline gap-2">
        {label && (
          <label htmlFor={inputId} className="min-h-fit min-w-fit truncate">
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
