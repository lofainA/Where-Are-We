import React from "react";
import "./copyright.css";

export const Copyright = ({ className }) => {
  return (
    <div className={`copy-right-component ${className}`}>
      <p className="text-wrapper">
        © 2025 Lofain. A solo-developed game. All rights reserved.
      </p>
    </div>
  );
};