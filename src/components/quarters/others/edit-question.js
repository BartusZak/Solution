import React from 'react';
import { translate } from 'react-translate';
import Modal from 'react-responsive-modal';
import Form from '../../form/form';

class EditQuestion extends React.PureComponent {
  state = {
    isLoading: false,
    questionItems: [
      {
        title: this.props.t("Answer"),
        placeholder: this.props.t("InsertAnswer"),
        mode: "textarea",
        inputType: "nameWithPolishLetters",
        value: this.props.question.answer,
        error: "",
        canBeNull: false,
        maxLength: 150,
        minLength: 3
      }
    ]
  };

  handleSubmit = () => {
    this.setState({isLoading: true});
    const { value } = this.state.questionItems[0];
    const newQuestion = {...this.props.question, answer: value};
    this.props.handleEdit(newQuestion)
      .then(() => this.setState({isLoading: false}))
      .catch(() => this.setState({isLoading: false}));
  }

  render() {
    const { isLoading, questionItems } = this.state;
    const { close, t } = this.props;
    return (
      <Modal open={true} classNames={{modal: `Modal`}} onClose={close}>
        <header>
          <h3>{t("EditingHeaderModal")}</h3>
          <Form
            btnTitle={t("Confirm")}
            shouldSubmit={true}
            onSubmit={this.handleSubmit}
            isLoading={isLoading}
            formItems={questionItems}
          />
        </header>
      </Modal>
    );
  }
}

export default translate("EditQuestion")(EditQuestion);
