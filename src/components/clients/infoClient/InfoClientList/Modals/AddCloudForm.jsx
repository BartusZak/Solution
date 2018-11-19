import React, { PureComponent } from "react";
import {validateInput} from "../../../../../services/validation";
import SpinnerButton from "../../../../form/spinner-btn/spinner-btn";

const AddCloudForm = props => {
    const {addCloudToClientFormItems, newInputContent, newInputValues, handleAddInput, buttonClass} = props;
    return(
    <form onSubmit={props.onSubmit}>
        <section className="new-section-input">
            <label>{addCloudToClientFormItems.title}</label>
            <input
                name="cloudName"
                value={addCloudToClientFormItems.value}
                onChange={e => props.onChange(e, 0)}
                autoComplete="off"
                className={addCloudToClientFormItems.error ? 'input-error' : ''}
                style={{margin:0}}
                type={addCloudToClientFormItems.type} placeholder={addCloudToClientFormItems.placeholder}/>
            <p className="form-error">
                <span>{addCloudToClientFormItems.error}</span>
            </p>
        </section>
        <div className="new-input-content">
            {newInputContent}
            <button
                type="button"
                disabled={newInputValues.length >= 3}
                onClick={() => handleAddInput()}
                className={`dcmt-button  ${buttonClass}`}
            >
            Dodaj
            </button>
        </div>
        <SpinnerButton
            isLoading={props.isLoading}
            validationResult={!props.btnDisabled}
            btnDisabled={props.btnDisabled}
            btnTitle={props.btnTitle}
            shouldSubmit={true}
            onClickHandler={e => props.onSubmit(e)}
            submitResult={props.submitResult} />
    </form>);
}

export default AddCloudForm