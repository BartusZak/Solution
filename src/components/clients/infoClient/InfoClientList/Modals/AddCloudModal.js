import React, { PureComponent } from "react";
import Form from "../../../../form/form";
import {validateInput} from "../../../../../services/validation";
import AddCloudForm from "./AddCloudForm";

const populateValue = item => {
  let value = "";
  for (let i = 0; i < item.length; i++) {
    value += item.charAt(i);
  }
  return value;
};

class AddCloudModal extends PureComponent {
  state = {
    addCloudToClientFormItems: 
    {
      title: this.props.t("CloudName"),
      name: "cloudName",
      type: "text",
      placeholder: `${this.props.t("Insert")} ${this.props.t("CloudName")}`,
      mode: "text",
      value: this.props.item ? populateValue(this.props.item.name) : "",
      error: "",
      canBeNull: false,
      minLength: 2,
      maxLength: 50,
      inputType: "name"
    },
    canSubmit: false,
    isLoading: false,
    newInput: false,
    newInputValues: [],
    isNewInputValidate: true
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.resultBlockCloud !== nextProps.resultBlockCloud) {
      this.setState({ isLoading: false }),
        nextProps.resultBlockCloud.statusCode &&
          nextProps.resultBlockCloud.statusCode() === 200 &&
          setTimeout(() => {
            this.props.handleCloudAddCloseModal();
          }, 3000);
    }
  }

  componentDidMount() {
    const { item } = this.props;
    const validateInputValues = item && item.fields.length > 0 ? item.fields.map(input => {
      input.canBeNull="false";
      input.minLength=2;
      input.maxLength=50;
      input.error="";
      return input;
    }) : null;
    console.log(validateInputValues)
    if (item && item.fields.length > 0) {
      this.setState({ newInputValues: validateInputValues, newInput: true });
    }
  }

  handleAddInput = () => {
    const { newInputValues } = this.state;

    this.setState({
      newInput: true,
      newInputValues: [...newInputValues, { name: "", content: "", canBeNull: false,
        minLength: 2, maxLength: 50, nameError: "", contentError: "" }],
      canSubmit:false
    });
  };

  handleChangeInput = (e, index) => {
    const newInputValues = [...this.state.newInputValues];
    const addCloudName = {...this.state.addCloudToClientFormItems}
    const { className: inputClass, value: inputValue } = e.target;
    const {t} = this.props;

    const inputValues = {...newInputValues[index]};
    
    inputValues.content = inputClass === "value" ? inputValue : newInputValues[index].content;
    inputValues.name = inputClass === "label" ? inputValue : newInputValues[index].name;
    addCloudName.value = addCloudName[index].value;
    newInputValues[index] = inputValues;

    inputValues.nameError = validateInput(
      newInputValues[index].name,
      false,
      2,
      50,
      null,
      t("NewInputLabel")
    );
    inputValues.contentError = validateInput(
      newInputValues[index].content,
      false,
      2,
      50,
      null,
      t("NewInputValue")
    );
    
    this.setState({ newInputValues, addCloudName }, () => this.forceUpdate());
    const canSubmit = !(inputValues.nameError || inputValues.contentError);

    this.setState({ canSubmit });
    console.log("!inputValues.name", !inputValues.name )
  };

  addCloudHandler = () => {
    const { handleAddCloud, handleEditCloud, clientId, item } = this.props;
    const { addCloudToClientFormItems, newInputValues } = this.state;
    this.setState({ isLoading: true }),
      item
        ? handleEditCloud(
            item.id,
            addCloudToClientFormItems[0].value,
            newInputValues,
            item.clientId
          )
        : handleAddCloud(
            this.state.addCloudToClientFormItems[0].value,
            newInputValues,
            clientId
          );
  };
  deleteInputSection = (index) => {
    const { newInputValues } = this.state;
    const inputValues = newInputValues.filter(input => input !== newInputValues[index]);  
    const canSubmit = inputValues.every(input => input.name !== '' && input.content !== '');  
    this.setState({ newInputValues:inputValues, canSubmit })
  };
  

  render() {
    const { t, resultBlockCloud, item } = this.props;
    const {
      canSubmit,
      addCloudToClientFormItems,
      isLoading,
      newInput,
      newInputValues
    } = this.state;

    let newInputContent = newInput
      ? newInputValues.map((item, index) => {
          return (
            <div style={{ marginBottom: "10px" }} key={index}>
              <section className="new-section-input">
                <label>{t("NewInputLabel")}</label>                
                <input
                  className="label"
                  value={item.name}
                  onChange={e => this.handleChangeInput(e, index)}
                />
                <i                
                  className="fa fa-minus"
                  onClick={() => this.deleteInputSection(index)}
                />
                <p className="form-error">
                  <span>{item.nameError}</span>
                </p>
              </section>
              <section className="new-section-input">
                <label>{t("NewInputValue")}</label>
                <input
                  className="value"
                  value={item.content}
                  onChange={e => this.handleChangeInput(e, index)}
                />
                <p className="form-error">
                  <span>{item.contentError}</span>
                </p>
              </section>
            </div>
          );
        })
      : null;
    
    const buttonClass = newInputValues.length >= 3 ? "notDisplayed" : null;

    return (
      <div className="add-client-container">
        <header>
          <h2 className="section-heading">
            {item ? t("EditCloud") : t("AddCloud")}
          </h2>
        </header>

        <div className="modal-content">
          <AddCloudForm
            addCloudToClientFormItems={addCloudToClientFormItems}
            newInputContent={newInputContent}
            newInputValues={newInputValues}
            handleAddInput={this.handleAddInput}
            onChange={this.handleChangeInput}
            buttonClass={buttonClass}
          />
        </div>
      </div>
    );
  }
}

AddCloudModal.defaultProps = {
  resultBlockCloud: {}
};

export default AddCloudModal;
