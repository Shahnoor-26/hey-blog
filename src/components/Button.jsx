import React from "react";

const Button = ({ children, type = "button", className = "" }) => {
  return (
    <button type={type} className={className}>
      {children}{" "}
    </button>
  );
};

export default Button;
