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
      inputType: "name",
      newInputValues: [],
    },
    canSubmit: false,
    isLoading: false,
    newInput: false,
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
    if (item && item.fields.length > 0) {
      this.setState({ addCloudToClientFormItems:
        {
          ...this.state.addCloudToClientFormItems,
          newInputValues: validateInputValues
        },
        newInput: true });
    }
  }

  handleAddInput = () => {
    const { newInputValues } = this.state.addCloudToClientFormItems;

    this.setState({
      addCloudToClientFormItems: {
        ...this.state.addCloudToClientFormItems,
        newInputValues: [...newInputValues, { name: "", content: "", canBeNull: false,
          minLength: 2, maxLength: 50, nameError: "", contentError: "" }],
      },
      canSubmit:false,
      newInput: true,
    });
  };

  handleChangeInput = (e, index) => {
    const newInputValues = [...this.state.addCloudToClientFormItems.newInputValues];
    let addCloudToClientFormItems = {...this.state.addCloudToClientFormItems};
    const { name: inputName, value: inputValue } = e.target;
    const {t} = this.props;

    const inputValues = newInputValues.length > 0 ? {...newInputValues[index]} : null ;
    let nameInputValue = {...addCloudToClientFormItems};
    nameInputValue.value =  inputName === "cloudName" ? inputValue : addCloudToClientFormItems.value;

    if (inputValues) {
      inputValues.content = inputName === "fieldContent" ? inputValue : newInputValues[index].content
      inputValues.name = inputName === "fieldName" ? inputValue : newInputValues[index].name;
    };

    newInputValues[index] = inputValues;
    addCloudToClientFormItems=nameInputValue;

    nameInputValue.error = validateInput(
      addCloudToClientFormItems.value,
      false,
      2,
      50,
      addCloudToClientFormItems.inputType,
      t("Name")
    );
    if(inputValues){
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
    }
    if (inputValues) {
      addCloudToClientFormItems.newInputValues = newInputValues;
    }

    this.setState({ 
      addCloudToClientFormItems
        }, () => this.forceUpdate());

    if(inputValues) {
      const canSubmit = !(inputValues.nameError || inputValues.contentError || addCloudToClientFormItems.error);
      this.setState({ canSubmit });
    } else {
      const canSubmit = !this.state.addCloudToClientFormItems.error;
      this.setState({ canSubmit });
    }
  };

  addCloudHandler = e => {
    e.preventDefault();
    const { handleAddCloud, handleEditCloud, clientId, item } = this.props;
    const { addCloudToClientFormItems, newInputValues } = this.state;
    this.setState({ isLoading: true }),
      item
        ? handleEditCloud(
            item.id,
            addCloudToClientFormItems.value,
            addCloudToClientFormItems.newInputValues,
            item.clientId
          )
        : handleAddCloud(
            this.state.addCloudToClientFormItems.value,
            addCloudToClientFormItems.newInputValues,
            clientId
          );
  };
  deleteInputSection = (index) => {
    const { addCloudToClientFormItems } = this.state;
    const inputValues = addCloudToClientFormItems
      .newInputValues.filter(input => input !== addCloudToClientFormItems.newInputValues[index]);
    const canSubmit = !(addCloudToClientFormItems.error || 
      (inputValues.length > 0 && inputValues.every(input => input.name === '' || input.content === '')));
    this.setState({ 
      addCloudToClientFormItems:{
        ...addCloudToClientFormItems,
        newInputValues:inputValues
      },
      canSubmit });
  };
  

  render() {
    const { t, resultBlockCloud, item } = this.props;
    const {
      canSubmit,
      addCloudToClientFormItems,
      isLoading,
      newInput
    } = this.state;
    const {newInputValues} = this.state.addCloudToClientFormItems;

    let newInputContent = newInput
      ? newInputValues.map((item, index) => {
          return (
            <div style={{ marginBottom: "10px" }} key={index}>
              <section className="new-section-input">
                <label>{t("NewInputLabel")}</label>                
                <input
                  name="fieldName"
                  className={newInputValues[index].nameError ? 'input-error' : ''}
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
                  name="fieldContent"
                  className={newInputValues[index].contentError ? 'input-error' : ''}
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
            isLoading={isLoading}
            onSubmit={this.addCloudHandler}
            btnDisabled={!canSubmit}
            btnTitle={item ? t("Save") : t("Add")}
            addCloudToClientFormItems={addCloudToClientFormItems}
            newInputContent={newInputContent}
            newInputValues={newInputValues}
            handleAddInput={this.handleAddInput}
            onChange={this.handleChangeInput}
            buttonClass={buttonClass}
            submitResult={
              {
                status:
                  resultBlockCloud && resultBlockCloud.errorOccurred
                    ? !resultBlockCloud.errorOccurred()
                      ? true
                      : false
                    : null,
                content:
                  resultBlockCloud && resultBlockCloud.errorOccurred
                    ? !resultBlockCloud.errorOccurred()
                      ? item
                        ? t("CloudEdited")
                        : t("CloudAdded")
                      : resultBlockCloud &&
                        resultBlockCloud.getMostSignificantText()
                    : null
              }
            }
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
