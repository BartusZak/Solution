import React from 'react';
import FancyForm from '../../common/fancy-form/fancy-form';
import FancyModal from '../../common/fancy-modal/fancy-modal';
import { translate } from 'react-translate';
import { connect } from 'react-redux';
import { createResponsiblePerson, editResponsiblePerson } from '../../../actions/clientsActions';
import { InputSettings } from '../../common/fancy-form/index';

import './responsible-person-form.scss';
class ResponsiblePersonForm extends React.Component {
  responsiblePersonInitValues = { client: '', firstName: '', lastName: '', email: '', phoneNumber: '' };

  constructor(props) {
    super();
    const { t, personToEdit, clientsMapped, shouldEdit } = props;
    const { client, firstName, lastName, email, phoneNumber } = {...personToEdit};
    const clientFieldConfig = {className: "field", disabled: shouldEdit};
    this.state = {
      initValues: shouldEdit ? { client, firstName, lastName, email, phoneNumber: phoneNumber ? phoneNumber : '' } : {...this.responsiblePersonInitValues, client: client ? client : '' },
      isSubmitting: false,
      responsiblePersonSettings: {
        client: new InputSettings(t("client"), { required: true, minLength: 2, maxLength: 150 }, 'type-and-select', false, [...clientsMapped], clientFieldConfig ),
        firstName: new InputSettings(t("firstName"), { required: true, minLength: 2, maxLength: 150 } ),
        lastName: new InputSettings(t("lastName"), { required: true, minLength: 3, maxLength: 150 } ),
        email: new InputSettings(t("email"), { required: true, minLength: 3, maxLength: 50  } ),
        phoneNumber: new InputSettings(t("phoneNumber"), { required: true } ),
      }
    }
  }

  handleSubmit = formData => {
    const { client, shouldEdit,
      createResponsiblePerson, editResponsiblePerson, afterSuccAdd, afterSuccEdit, personToEdit } = this.props;

    this.setState({isSubmitting: true});
    if (shouldEdit) {
      editResponsiblePerson(formData, personToEdit.id)
      .then(addedPerson => {
        this.setState({isSubmitting: false});
        afterSuccEdit(formData);
      })
      .catch(() => this.setState({isSubmitting: false}));
    }
    else {
      createResponsiblePerson(formData)
      .then(createdPerson => {
        this.setState({isSubmitting: false});
        afterSuccAdd(createdPerson);
      })
      .catch(() => this.setState({isSubmitting: false}));
    }
  }

  render() {
    const { initValues, isSubmitting, responsiblePersonSettings } = this.state;
    const { backIntoProjectForm, close, shouldEdit, t } = this.props;
    return (
      <FancyModal isLoading={isSubmitting} close={close} renderHeader={() => (
          <h3 className="fancy-modal-title title-padding">
            {t(`${shouldEdit ? 'modalHeaderEdit' : 'modalHeaderAdd'}`)}
            <i onClick={backIntoProjectForm} className="fa fa-arrow-left clickable"></i>
          </h3>
        )}>
        <FancyForm
          onSubmit={formData => this.handleSubmit(formData)}
          isSubmitting={isSubmitting}
          initialValues={initValues}
          settings={responsiblePersonSettings} />


      </FancyModal>

    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createResponsiblePerson: model => dispatch(createResponsiblePerson(model)),
    editResponsiblePerson: (model, id) => dispatch(editResponsiblePerson(model, id)),
  };
};

export default connect(null, mapDispatchToProps)(translate("ResponsiblePersonForm")(ResponsiblePersonForm));
