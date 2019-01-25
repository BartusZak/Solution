import React from "react";
import "./button.scss";

const Button = ({ title, onClick, mainClass, disable, isLoading, children, ...rest }) => (
  <button {...rest} title={title} disabled={disable} onClick={onClick} className={mainClass}>
    {children}
    {title}
    {isLoading &&
      <React.Fragment>
        <div className="spinner-new form-down-right-spinner" />
        <div className="fancy-modal-backdrop" />
      </React.Fragment>
    }
  </button>
);

export default Button;
