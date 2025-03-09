import React from "react";

export const CustomInput = ({
  label,
  type = "text",
  name, // Add name prop which is required for Formik
  placeholder,
  value,
  onChange,
  error,
  required = false,
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        name={name} // Make sure name is passed to input
        value={value}
        onChange={onChange} // This should now receive the event directly
        placeholder={placeholder}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
          error
            ? "border-red-500 focus:ring-red-200"
            : "border-gray-300 focus:ring-blue-200 focus:border-blue-400"
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};
