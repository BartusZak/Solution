import React, { Component } from "react";
import Button from "../../common/button/button";
import { validateInput } from "../../../services/validation";
import IntermediateBlock from "../../common/IntermediateBlock";

import "../../../scss/components/clients/addClient/addClientModal.scss";
import PersonImgSrc from "../../../assets/img/billeniumIcons/person.png";
import FileInput from "components/common/inputs/fileInput/fileInput";

class AddClientModal extends Component {
  state = {
    inputValue: null,
    inputError: null,
    buttonDisabled: true,
    uploadedFile: null,
    validate: false
  };

  handleInputChange = e => {
    e.preventDefault();
    let value = e.target.value;
    let error = validateInput(
      value,
      false,
      3,
      20,
      "name",
      this.props.t("ClientName")
    );
    let disabled = error ? true : false;
    this.setState({
      inputValue: value,
      inputError: error,
      buttonDisabled: disabled
    });
  };

  handleAddClientButtonClick = (e, addClient) => {
    e.preventDefault();
    addClient(this.state.inputValue);
  };

  pullDOM = (addClient, buttonDisabled, error, t) => {
    return (
      <form>
        <div className="add-client-container-left">
          <div className="group">
            <label htmlFor="clientName">{t("ClientName")}</label>
            <input
              type="text"
              id="clientName"
              autoComplete="off"
              required
              onChange={this.handleInputChange}
            />
            {error}

            <label htmlFor="clientDescription">{t("ClientDescription")}</label>
            <input
              type="text"
              id="clientDescriptio"
              autoComplete="off"
              onChange={this.handleInputChange}
            />
            {error}
          </div>
          <Button
            disable={buttonDisabled}
            onClick={e => this.handleAddClientButtonClick(e, addClient)}
            mainClass="dcmt-button"
          >
            {t("AddClient")}
          </Button>
        </div>
        <div className="add-client-container-right">
          <img src={PersonImgSrc} alt="person" />
          <FileInput type="image/jpeg" />
        </div>
      </form>
    );
  };

  render() {
    let { inputError, buttonDisabled } = this.state;
    let { addClient, loading, resultBlock, t } = this.props;
    let error = inputError ? <span>{inputError}</span> : null;
    let info = null;

    if (resultBlock) {
      if (resultBlock.replyBlock.status === 200) {
        info = (
          <div className="user-added-success">
            <span>{t("ClientAddedSuccess")}</span>
          </div>
        );
      }
    }

    return (
      <div className="add-client-container">
        <header>
          <h3 className="section-heading">{t("AddClient")}</h3>
        </header>
        <IntermediateBlock
          loaded={!loading}
          render={() => this.pullDOM(addClient, buttonDisabled, error, t)}
          resultBlock={resultBlock}
          spinner="Cube"
        />
        {info}
      </div>
    );
  }
}

export default AddClientModal;
