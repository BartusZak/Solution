import React from "react";
import "./spinner-btn.scss";
const spinnerBtn = props => {
  return (
    <React.Fragment>
      {props.submitResult &&
        !props.isLoading &&
        props.submitResult.status !== null && (
          <p
            className={
              props.submitResult.status === true
                ? "correct-status"
                : "incorrect-status"
            }
          >
            {props.submitResult.content}
          </p>
        )}

      <button
        disabled={
          !props.validationResult || props.btnDisabled ||
          (props.shouldBeDisabledByOtherReason !== undefined && props.shouldBeDisabledByOtherReason) ||
          (props.transactionEnd && !props.enableButtonAfterTransactionEnd)
            ? true
            : false
        }
        onClick={props.shouldSubmit ? null : props.onClickHandler}
        className={
          !props.isLoading
            ? `submit-btn ${
                props.validationResult === false || props.btnDisabled ||
                (props.shouldBeDisabledByOtherReason !== undefined && props.shouldBeDisabledByOtherReason) ||
                (props.transactionEnd && !props.enableButtonAfterTransactionEnd)
                  ? "submit-btn-dis"
                  : "submit-btn-cor"
              }`
            : "spinner-btn"
        }
        type={props.shouldSubmit ? "submit" : "button"}
      >
        {props.isLoading ? "" : props.btnTitle}
      </button>
    </React.Fragment>
  );
};

export default spinnerBtn;
