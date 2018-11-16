import React, { PureComponent } from "react";
import {validateInput} from "../../../../../services/validation";

const AddCloudForm = props => {
    const {addCloudToClientFormItems, newInputContent, newInputValues, handleAddInput, buttonClass} = props;
    return(
    <form onSubmit={props.addCloudHandler}>
        <section className="new-section-input" style={{display: "flex"}}>
            <label>{addCloudToClientFormItems.title}</label>
            <input value={addCloudToClientFormItems.value}
                onChange={props.onChange}
                autoComplete="off"
                className={addCloudToClientFormItems.error !== "" ? "label input-error" : "value"}
                style={{margin:0}}
                type={addCloudToClientFormItems.type} placeholder={addCloudToClientFormItems.placeholder}/>
            <p className="form-error">
                <span>{addCloudToClientFormItems.error}</span>
            </p>
        </section>
        <div className="new-input-content">
            {newInputContent}
            <button
                disabled={newInputValues.length >= 3}
                onClick={handleAddInput}
                className={`dcmt-button  ${buttonClass}`}
            >
            Dodaj
            </button>
        </div>

    </form>);
}

export default AddCloudForm