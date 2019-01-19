import React from 'react';
import moment from 'moment';
import { translate } from 'react-translate';
import { connect } from 'react-redux';
import { getClientsSlim, updateSlimClient, addSlimClient } from '../../../actions/clientsActions';
import { setHeaders, phases } from './index';
import { addProject, editProject, addProjectPhase } from '../../../actions/projectsActions';
import { InputSettings } from '../../common/fancy-form/index';
import { dFormat } from '../../../constants';
import FancyDataList from '../../common/fancy-form/fancy-data-list';
import FancyModal from '../../common/fancy-modal/fancy-modal';
import FancyForm from '../../common/fancy-form/fancy-form';
import ResponsiblePersonForm from '../../shared/responsible-person-form/responsible-person-form';

import './phase-project-form.scss';
class PhaseProjectForm extends React.PureComponent {
  phasesTitles = setHeaders(this.props.t, this.props.isPhaseForm);
  phaseFirstSettings = {
    name: new InputSettings(this.props.t("name"), { required: true, minLength: 3, maxLength: 255 } ),
    description: new InputSettings(this.props.t("description"), { minLength: 3, maxLength: 255 }, 'textarea' ),
    startDate: new InputSettings(this.props.t("startDate"), { required: true }, 'date-picker' ),
    estimatedEndDate: new InputSettings(this.props.t("endDate"), { required: true }, 'date-picker' ),
  };
  phaseSecondSettings = {
    client: new InputSettings(this.props.t("client"), {required: true, minLength: 3, maxLength: 255, regexp: 'text'}, 'type-and-select', true ),
    cloud: new InputSettings(this.props.t("cloud"), { minLength: 3, maxLength: 150, regexp: 'text' }, 'type-and-select', true ),
    responsiblePerson: new InputSettings(this.props.t("responsiblePerson"), { required: true }, 'select', true )
  };

  constructor(props) {
    super(props);
    let phaseFirstInitValues = { name: '', description: '', startDate: moment(), estimatedEndDate: moment() };
    let phaseSecondInitValues = { client: '', cloud: '', responsiblePerson: '' };
    if (props.projectToEdit) {
      const { name, description, startDate, estimatedEndDate, client, cloud } = props.projectToEdit;
      phaseFirstInitValues = { name, description, startDate: moment(startDate), estimatedEndDate: moment(estimatedEndDate) };
      phaseSecondInitValues.client = client;
      phaseSecondInitValues.cloud = cloud ? cloud : '';
    }
    this.state = {
      phase: phases.phaseFirstInitValues,
      phaseFirstInitValues,
      phaseSecondInitValues,
      isSubmitting: false,
      personToEdit: null,
      responsiblePersonFormMode: 'add',
      runSubmitingFirstPhase: false,
      openResonsiblePersonForm: false,
      watchedClient: '',
      lastEditedPersonIndex: 0
    }
  }

  componentDidMount = () => this.props.getClientsSlim();

  componentDidUpdate = prevProps => {
    if (this.state.runSubmitingFirstPhase) {
      this.setState({runSubmitingFirstPhase: false});
    }
    const { clientsSlim, projectToEdit } = this.props;
    if (prevProps.clientsSlim !== clientsSlim && projectToEdit) {
      const { watchedClient, lastEditedPersonIndex, phaseSecondInitValues } = this.state;
      const clientName = watchedClient ? watchedClient : projectToEdit.client;
      if (clientsSlim[clientName]) {
        const { responsiblePersons } = clientsSlim[clientName];
        if (responsiblePersons.length > 0) {
          const personToEdit = {...responsiblePersons[lastEditedPersonIndex]};
          this.setState({ phaseSecondInitValues: {...phaseSecondInitValues,
            responsiblePerson: personToEdit.id}, personToEdit });
        }
        this.setState({watchedClient: clientName});
      }
    }
  }

  changePhaseAndSave = (formData, phase, phaseNameToCopyPopulatedValues) => this.setState({phase, [phaseNameToCopyPopulatedValues]: formData});

  changePhaseAndRunSubmit = phase => {
    const isClickingSecondPhase = phase !== phases.phaseFirstInitValues;
    if (isClickingSecondPhase) {
      this.setState({runSubmitingFirstPhase: true});
    }
    else this.setState({phase});
  };

  saveSecondPhaseData = formData => this.setState({phaseSecondInitValues: formData});
  startAddingResponsiblePerson = () => this.setState({openResonsiblePersonForm: true, responsiblePersonFormMode: 'add'});
  startEditingResponsiblePerson = () => this.setState({openResonsiblePersonForm: true, responsiblePersonFormMode: 'edit'});

  handleSubmitting = formData => {
    const { projectToEdit, onSubmitSucc, editProject, parentId, isPhaseForm, addProjectPhase } = this.props;
    const project = { ...this.state.phaseFirstInitValues, ...formData, responsiblePerson: {...this.state.personToEdit} };
    project.startDate = moment(project.startDate).format(dFormat);
    project.estimatedEndDate = moment(project.estimatedEndDate).format(dFormat);

    this.setState({isSubmitting: true});
    if (isPhaseForm) {
      project.parentId = parentId
      addProjectPhase(project,
        () => onSubmitSucc(),
        () => this.setState({isSubmitting: false}));
    }
    else {
      if (projectToEdit) {
        editProject({...projectToEdit, ...project},
          () => onSubmitSucc(),
          () => this.setState({isSubmitting: false})
        );
      }
      else {
        addProject(project,
            projectId => onSubmitSucc(projectId),
            () => this.setState({isSubmitting: false})
        );
      }
    }
  }

  updateViewAfterAddPerson = ({ client: clientName, firstName, lastName, email, phoneNumber, id }, createdClient) => {
    const responsiblePerson = { firstName, lastName, email, phoneNumber, id };
    const phaseSecondInitValues = {...this.state.phaseSecondInitValues, responsiblePerson: id };
    const { clientsSlim, updateSlimClient, addSlimClient } = this.props;
    if (createdClient) {
      const client = { id: createdClient.id, name: createdClient.name, responsiblePersons: [ responsiblePerson ], clouds: [] };
      addSlimClient(client);
    }
    else {
      const { responsiblePersons } = clientsSlim[clientName];
      const client = {...clientsSlim[clientName], responsiblePersons: [responsiblePerson, ...responsiblePersons] };
      updateSlimClient(clientName, client);
    }

    this.setState({openResonsiblePersonForm: false, watchedClient: clientName, phaseSecondInitValues,
      personToEdit: {...responsiblePerson, client: clientName } })
  }

  updateViewAfterEditPerson = (personToEdit, id) => {
    const { clientsSlim, updateSlimClient, projectToEdit } = this.props;
    const { client: clientName } = personToEdit;
    const phaseSecondInitValues = {...this.state.phaseSecondInitValues, responsiblePerson: id };

    const responsiblePersons = [...clientsSlim[clientName].responsiblePersons];
    const index = responsiblePersons.findIndex(p => p.id === id);
    responsiblePersons[index] = { ...personToEdit, id };
    const client = {...clientsSlim[clientName], responsiblePersons };
    this.setState({lastEditedPersonIndex: index,
      openResonsiblePersonForm: false, phaseSecondInitValues, personToEdit: { ...personToEdit, id }},
      () => updateSlimClient(clientName, client));
  }

  render() {
    const { phase, phaseFirstInitValues, phaseSecondInitValues, runSubmitingFirstPhase, openResonsiblePersonForm,
      responsiblePersonFormMode, isSubmitting, personToEdit, watchedClient } = this.state;
    const { close, clientsSlim } = this.props;

    const clientsKeys = Object.keys(clientsSlim);
    const countOfClients = clientsKeys.length;
    const clouds = clientsSlim[watchedClient] ? clientsSlim[watchedClient].clouds : [];
    const responsiblePersons = clientsSlim[watchedClient] ? clientsSlim[watchedClient].responsiblePersons : [];
    const responsiblePersonsCount = responsiblePersons.length;

    if (openResonsiblePersonForm) {
      return (
        <ResponsiblePersonForm
          afterSuccAdd={this.updateViewAfterAddPerson}
          afterSuccEdit={this.updateViewAfterEditPerson}
          backIntoProjectForm={() => this.setState({openResonsiblePersonForm: false})}
          close={close}
          personToEdit={{...personToEdit, client: watchedClient}}
          shouldEdit={responsiblePersonFormMode === 'edit'}
          />
      );
    }
    else {
      return (
        <FancyModal close={close} isLoading={isSubmitting} phases={phases} currentPhase={phase} handleClick={this.changePhaseAndRunSubmit} title={this.phasesTitles[phase]}>
          {phase === phases.phaseFirstInitValues &&
            <FancyForm
              key={1}
              submitFromFlag={runSubmitingFirstPhase}
              onSubmit={formData => this.changePhaseAndSave(formData, phases.phaseSecondInitValues, phases.phaseFirstInitValues)}
              initialValues={phaseFirstInitValues}
              settings={this.phaseFirstSettings} />
          }
          {phase === phases.phaseSecondInitValues &&
            <FancyForm
              key={2}
              isSubmitting={isSubmitting}
              onSubmit={formData => this.handleSubmitting(formData)}
              initialValues={phaseSecondInitValues}
              renderClient={(key, values, _, setting, errors, handleChangeValues) => (
                <section key={key} className="fields-wrapper-col">
                  <label className="field-label">{setting.label} ({countOfClients}) *</label>
                  <div className="data-list-container">
                    <input {...setting.componentProps} value={values[key]}
                      onChange={e => {
                        const { value } = e.target;
                        const newValues = {...values, client: value};
                        if (!clientsSlim[value]) {
                          const { cloud, responsiblePerson } = newValues;
                          if (cloud) newValues.cloud = '';
                          if (responsiblePerson) newValues.responsiblePerson = '';
                          this.setState({personToEdit: null});
                        }
                        else {
                          const { responsiblePersons } = clientsSlim[value];
                          if (responsiblePersons.length > 0) {
                            newValues.responsiblePerson = responsiblePersons[0].id
                            this.setState({personToEdit: responsiblePersons[0]});
                          }
                        }
                        handleChangeValues(newValues);
                        this.setState({watchedClient: value});
                      }}
                      list={key} />
                    <datalist id={key}>
                      {clientsKeys.map(name => (
                        <option key={name} id={name} value={name}>
                          {clientsSlim[name].clouds.length > 0 && `${clientsSlim[name].clouds.length} clouds ` }
                          {clientsSlim[name].responsiblePersons.length > 0 && `${clientsSlim[name].responsiblePersons.length} persons` }
                        </option>
                      ))}
                    </datalist>
                  </div>
                  <p className="field-error">{errors[key]}</p>
                </section>
              )}
              renderCloud={(key, values, handleChangeFromEvent, setting, errors) => (
                <section key={key} className="fields-wrapper-col">
                  <label className="field-label">{setting.label} ({clouds.length})</label>
                  <FancyDataList
                    {...setting.componentProps}
                    listData={clouds} value={values[key]}
                    valueKey="name"
                    displayValueKey="name"
                    listName={key}
                    onChange={e => handleChangeFromEvent(e, key)} />
                  <p className="field-error">{errors[key]}</p>
                </section>
              )}
              renderResponsiblePerson={(key, values, handleChangeFromEvent, setting, errors) => (
                <section key={key} className="fields-wrapper-col responsible-persons-select">
                  <label className="field-label">{setting.label} ({responsiblePersonsCount}) *</label>
                  <div className="field-block">
                    <select {...setting.componentProps} className=""
                      value={values[key]} onChange={e => {
                        handleChangeFromEvent(e, key);
                        this.setState({personToEdit: responsiblePersons.find(p => p.id === +e.target.value)});
                    }}>
                      {responsiblePersonsCount > 0 ? responsiblePersons.map(person => (
                        <option key={person.id} value={person.id}>
                          {person.firstName} {person.lastName}
                        </option>
                      )) :
                        <option value="" disabled>
                          {setting.componentProps.placeholder}
                        </option>
                      }
                    </select>
                    <div className="field-toolbox">
                      { (!errors.client && values.client) &&
                        <i onClick={this.startAddingResponsiblePerson} className="fa fa-plus-circle clickable" />
                      }
                      { personToEdit &&
                        <i onClick={this.startEditingResponsiblePerson} className="fa fa-edit clickable" />
                      }
                    </div>
                  </div>
                  <p className="field-error">{errors[key]}</p>
                </section>
              )}
              settings={this.phaseSecondSettings}
              onUnmount={this.saveSecondPhaseData} />
          }

        </FancyModal>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    clientsSlim: state.clientsReducer.clientsSlim
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getClientsSlim: () => dispatch(getClientsSlim()),
    editProject: (project, succ, err) => dispatch(editProject(project, succ, err)),
    updateSlimClient: (clientName, slimClient) => dispatch(updateSlimClient(clientName, slimClient)),
    addSlimClient: client => dispatch(addSlimClient(client)),
    addProjectPhase: (model, succ, err) => dispatch(addProjectPhase(model, succ, err))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(translate("PhaseProjectForm")(PhaseProjectForm));
