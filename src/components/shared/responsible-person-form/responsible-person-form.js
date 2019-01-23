import React from 'react';
import FancyForm from '../../common/fancy-form/fancy-form';
import FancyModal from '../../common/fancy-modal/fancy-modal';
import { translate } from 'react-translate';
import { connect } from 'react-redux';
import {
  createResponsiblePerson,
  editResponsiblePerson
} from '../../../actions/clientsActions';
import { InputSettings } from '../../common/fancy-form/index';

import './responsible-person-form.scss';
class ResponsiblePersonForm extends React.Component {
  responsiblePersonInitValues = {
    client: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  };
  responsiblePersonSettings;
  constructor(props) {
    super(props);
    const { t, personToEdit, shouldEdit } = props;
    const { client, firstName, lastName, email, phoneNumber } = personToEdit;
    this.responsiblePersonSettings = {
      client: new InputSettings(
        t('client'),
        { required: true, minLength: 2, maxLength: 150 },
        'input',
        false,
        [],
        { className: 'field', disabled: true }
      ),
      firstName: new InputSettings(t('firstName'), {
        required: true,
        minLength: 2,
        maxLength: 150
      }),
      lastName: new InputSettings(t('lastName'), {
        required: true,
        minLength: 3,
        maxLength: 150
      }),
      email: new InputSettings(t('email'), {
        required: true,
        minLength: 3,
        maxLength: 50
      }),
      phoneNumber: new InputSettings(t('phoneNumber'), { required: true })
    };
    this.state = {
      initValues: shouldEdit
        ? { client, firstName, lastName, email, phoneNumber }
        : { ...this.responsiblePersonInitValues, client },
      isSubmitting: false
    };
  }

  handleSubmit = formData => {
    const {
      client,
      shouldEdit,
      createResponsiblePerson,
      editResponsiblePerson,
      afterSuccAdd,
      afterSuccEdit,
      personToEdit
    } = this.props;

    this.setState({ isSubmitting: true });
    if (shouldEdit) {
      editResponsiblePerson(formData, personToEdit.id)
        .then(addedPerson => {
          afterSuccEdit(formData, personToEdit.id);
        })
        .catch(() => this.setState({ isSubmitting: false }));
    } else {
      createResponsiblePerson(formData)
        .then(({ responsiblePerson, client }) => {
          afterSuccAdd(responsiblePerson, client);
        })
        .catch(() => this.setState({ isSubmitting: false }));
    }
  };

  render() {
    const { initValues, isSubmitting } = this.state;
    const { backIntoProjectForm, close, shouldEdit, t } = this.props;
    return (
      <FancyModal
        isLoading={isSubmitting}
        close={close}
        renderHeader={() => (
          <h3 className="fancy-modal-title title-padding">
            {t(`${shouldEdit ? 'modalHeaderEdit' : 'modalHeaderAdd'}`)}
            <i
              onClick={backIntoProjectForm}
              className="fa fa-arrow-left clickable"
            />
          </h3>
        )}
      >
        <FancyForm
          onSubmit={formData => this.handleSubmit(formData)}
          isSubmitting={isSubmitting}
          initialValues={initValues}
          settings={this.responsiblePersonSettings}
        />
      </FancyModal>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createResponsiblePerson: model => dispatch(createResponsiblePerson(model)),
    editResponsiblePerson: (model, id) =>
      dispatch(editResponsiblePerson(model, id))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(translate('ResponsiblePersonForm')(ResponsiblePersonForm));
