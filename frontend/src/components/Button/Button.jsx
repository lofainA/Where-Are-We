import React from "react";
import "./button.css";

export const Button = ({ className, text, onClick }) => {
    return (
        <div className={`button ${className}`} onClick={onClick}>
            <div className="button-text">{text}</div>
        </div>
    );
};
