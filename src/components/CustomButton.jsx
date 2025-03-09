import React from "react";

export const CustomButton = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
  disabled = false,
  className,
}) => {
  const baseClasses =
    "font-medium rounded focus:outline-none transition-colors";

  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    success: "bg-green-600 hover:bg-green-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    outline:
      "bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50",
  };

  const sizeClasses = {
    sm: "py-1 px-3 text-sm",
    md: "py-2 px-4 text-base",
    lg: "py-3 px-6 text-lg",
  };

  const disabledClasses = disabled
    ? "opacity-50 cursor-not-allowed"
    : "cursor-pointer";
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${className} ${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses}`}
    >
      {children}
    </button>
  );
};
