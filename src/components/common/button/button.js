import React from "react";
import "./button.scss";

const Button = ({ title, onClick, mainClass, disable, children, ...props }) => (
  <button title={title} disabled={disable} onClick={onClick} className={mainClass}>
    {children}
    {title}
  </button>
);

export default Button;
