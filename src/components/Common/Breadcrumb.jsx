import React from "react";

export const Breadcrumbs = ({ title, description }) => {
  return (
    <div>
      <h2 className="text-lg md:text-xl font-medium">{title}</h2>
      <h6 className="text-xs font-normal text-gray-600">{description}</h6>
    </div>
  );
};