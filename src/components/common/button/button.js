import React from "react";
import "./button.scss";

const Button = ({ title, onClick, mainClass, disable, isLoading, spinnerClass, children, ...rest }) => (
  <button {...rest} title={title} disabled={disable} onClick={onClick} className={mainClass}>
    {children}
    {title}
    {isLoading &&
      <React.Fragment>
        <div className={spinnerClass} />
        <div className="fancy-modal-backdrop" />
      </React.Fragment>
    }
  </button>
);

Button.defaultProps = {
  spinnerClass: 'spinner-new form-down-right-spinner'
}

export default Button;
