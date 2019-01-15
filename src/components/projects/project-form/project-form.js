import React from 'react';
import moment from 'moment';
import { orderBy } from '../../../services/transform-data-service';
import { translate } from 'react-translate';
import { connect } from 'react-redux';
import { getClientsSlim } from '../../../actions/clientsActions';
import { addProject, editProject } from '../../../actions/projectsActions';
import { InputSettings } from '../../common/fancy-form/index';
import DataList from '../../common/fancy-form/fancy-data-list';
import Select from '../../common/fancy-form/select';
import FancyModal from '../../common/fancy-modal/fancy-modal';
import FancyForm, { dFormat } from '../../common/fancy-form/fancy-form';
import ResponsiblePersonForm from '../../shared/responsible-person-form/responsible-person-form';

import './project-form.scss';
class ProjectForm extends React.PureComponent {
  phases = {
    phaseFirstInitValues: 'phaseFirstInitValues',
    phaseSecondInitValues: 'phaseSecondInitValues'
  };
  phasesTitles = {
    phaseFirstInitValues: this.props.t("firstPhaseTitle"),
    phaseSecondInitValues: this.props.t("secondPhaseTitle")
  };
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
      openResonsiblePersonForm: false,
      responsiblePersonFormMode: 'add',
      phase: this.phases.phaseFirstInitValues,
      phaseFirstInitValues,
      phaseSecondInitValues,
      runSubmitingFirstPhase: false,
      clientsMapped: [],
      cloudsMapped: [],
      personsMapped: [],
      isSubmitting: false,
      personToEdit: null
    }
  }

  componentDidMount() {
    this.props.getClientsSlim();
  }

  componentDidUpdate(prevProps) {
    if (this.state.runSubmitingFirstPhase) {
      this.setState({runSubmitingFirstPhase: false});
    }
    if (prevProps.clientsSlim !== this.props.clientsSlim) {
      this.injectClientsInField(this.props.clientsSlim);
    }
  }

  injectClientsInField = clients => {
    const clientsMapped = clients.map(client => {
      const cloudsDescription = client.clouds.length > 0 ? client.clouds.length + ' clouds' : '';
      return { displayValue: cloudsDescription, value: client.name };
    });
    const { projectToEdit } = this.props;
    if (projectToEdit) {
      const client = clients.find(c => c.name === projectToEdit.client);
      this.injectPersonsInField(client.responsiblePersons, client.name);
    }
    this.setState({clientsMapped: orderBy(clientsMapped, 'value')});
  }

  changePhaseAndSave = (formData, phase, phaseNameToCopyPopulatedValues) => this.setState({phase, [phaseNameToCopyPopulatedValues]: formData});

  changePhaseAndRunSubmit = phase => {
    const isClickingSecondPhase = phase !== this.phases.phaseFirstInitValues;
    if (isClickingSecondPhase) {
      this.setState({runSubmitingFirstPhase: true});
    }
    else this.setState({phase});
  };

  saveSecondPhaseData = formData => this.setState({phaseSecondInitValues: formData});

  onSelectClient = e => {
    const { value: clientName } = e.target;
    const client = this.props.clientsSlim.find(c => c.name === clientName);

    if (client) {
      this.injectCloudsInField(client.clouds);
      this.injectPersonsInField(client.responsiblePersons, clientName);
    }
    else {
      this.setState({personsMapped: [], cloudsMapped: [], personsMapped: [], personToEdit: null,
        phaseSecondInitValues: { client: clientName, cloud: '', responsiblePerson: '' } });
    }
  }

  injectCloudsInField = clouds => {
    const cloudsMapped = clouds.map(c => ({ displayValue: c.name, value: c.name }) );
    this.setState({cloudsMapped: orderBy(cloudsMapped, 'value')});
  }

  injectPersonsInField = (persons, clientName) => {
    const phaseSecondInitValues = {...this.state.phaseSecondInitValues, client: clientName, responsiblePerson: '' };
    if (persons.length > 0) {
      const personsMapped = orderBy(persons.map(p => ({ displayValue: `${p.firstName} ${p.lastName}`, value: p.id, key: p.id })), 'displayValue');
      const firstPerson = personsMapped[0];
      const personToEdit = persons.find(p => p.id === firstPerson.key); personToEdit['client'] = clientName;

      this.setState({personsMapped, personToEdit, phaseSecondInitValues: {...phaseSecondInitValues, responsiblePerson: personToEdit.id} });
    }
    else {
      this.setState({personsMapped: [], personToEdit: null, phaseSecondInitValues});
    }
  }

  startAddingResponsiblePerson = () => this.setState({openResonsiblePersonForm: true, responsiblePersonFormMode: 'add'});
  startEditingResponsiblePerson = () => this.setState({openResonsiblePersonForm: true, responsiblePersonFormMode: 'edit'});

  addOrEditProject = formData => {
    const { firstName, lastName, email, phoneNumber } = this.state.personToEdit;
    const { projectToEdit, onSubmitSucc, editProject } = this.props;
    const project = { ...this.state.phaseFirstInitValues, ...formData, responsiblePerson: { firstName, lastName, email,
      phoneNumber: phoneNumber ? phoneNumber : '223 223 223' } };
    project.startDate = moment(project.startDate).format(dFormat);
    project.estimatedEndDate = moment(project.estimatedEndDate).format(dFormat);

    this.setState({isSubmitting: true});

    if (projectToEdit)
      editProject({...projectToEdit, ...project}, () => this.setState({isSubmitting: false}));
    else {
      addProject(project,
          projectId => onSubmitSucc(projectId),
          () => this.setState({isSubmitting: false})
      );
    }
  }

  updateViewAfterAddPerson = () => {
    // {isClientAdded, responsiblePerson}
    // const { id, firstName, lastName, client } = responsiblePerson;
    // const phaseSecondInitValues = {...this.state.phaseSecondInitValues, responsiblePerson: `${firstName} ${lastName}`};
    // if (isClientAdded)
    //   phaseSecondInitValues.client = client;

    // this.setPersonToEdit(id, client);
    this.setState({openResonsiblePersonForm: false, phaseSecondInitValues});
  }

  updateViewAfterEditPerson = person => {
    this.setState({openResonsiblePersonForm: false});
  }

  setPersonToEdit = (personId, clientName) => {
    const client = this.props.clientsSlim.find(client => client.name === clientName);
    const personToEdit = client.responsiblePersons.find(p => p.id === +personId);
    personToEdit['client'] = clientName;
    this.setState({personToEdit});
  }

  render() {
    const { phase, phaseFirstInitValues, phaseSecondInitValues, runSubmitingFirstPhase,
      clientsMapped, cloudsMapped, personsMapped, openResonsiblePersonForm,
      responsiblePersonInitValues, responsiblePersonFormMode, isSubmitting, personToEdit } = this.state;
    const { close, t, clientsSlim } = this.props;
    if (openResonsiblePersonForm) {
      return (
        <ResponsiblePersonForm
          afterSuccAdd={this.updateViewAfterAddPerson}
          afterSuccEdit={this.updateViewAfterEditPerson}
          backIntoProjectForm={() => this.setState({openResonsiblePersonForm: false})}
          close={close}
          clientsMapped={clientsMapped}
          personToEdit={personToEdit}
          shouldEdit={responsiblePersonFormMode === 'edit'}
          />
      );
    }
    else {
      return (
        <FancyModal close={close} isLoading={isSubmitting} phases={this.phases} currentPhase={phase} handleClick={this.changePhaseAndRunSubmit} title={this.phasesTitles[phase]}>
          {phase === this.phases.phaseFirstInitValues &&
            <FancyForm
              key={1}
              submitFromFlag={runSubmitingFirstPhase}
              onSubmit={formData => this.changePhaseAndSave(formData, this.phases.phaseSecondInitValues, this.phases.phaseFirstInitValues)}
              initialValues={phaseFirstInitValues}
              settings={this.phaseFirstSettings} />
          }
          {phase === this.phases.phaseSecondInitValues &&
            <FancyForm
              key={2}
              isSubmitting={isSubmitting}
              onSubmit={formData => this.addOrEditProject(formData)}
              initialValues={phaseSecondInitValues}
              renderClient={(key, values, handleChangeFromEvent, setting, errors) => (
                <section key={key} className="fields-wrapper-col">
                  <label className="field-label">{setting.label} ({clientsMapped.length}) *</label>
                  <DataList
                    {...setting.componentProps}
                    listData={clientsMapped}
                    value={values[key]}
                    listName={key}
                    onChange={e => this.onSelectClient(e)} />
                  <p className="field-error">{errors[key]}</p>
                </section>
              )}
              renderCloud={(key, values, handleChangeFromEvent, setting, errors) => (
                <section key={key} className="fields-wrapper-col">
                  <label className="field-label">{setting.label} ({cloudsMapped.length})</label>
                  <DataList {...setting.componentProps} listData={cloudsMapped} value={values[key]} listName={key} onChange={e => handleChangeFromEvent(e, key)} />
                  <p className="field-error">{errors[key]}</p>
                </section>
              )}
              renderResponsiblePerson={(key, values, handleChangeFromEvent, setting, errors) => (
                <section key={key} className="fields-wrapper-col responsible-persons-select">
                  <label className="field-label">{setting.label} ({personsMapped.length}) *</label>
                  <Select
                  {...setting.componentProps}
                  className=""
                  value={values[key]}
                  onChange={e => {
                    this.setPersonToEdit(e.target.value, values.client);
                    handleChangeFromEvent(e, key);
                  }}
                  listData={personsMapped}
                  placeholder={t("EmptyResponsiblePersonsInSelect")}>
                    <div className="field-toolbox">
                      <i onClick={this.startAddingResponsiblePerson} className="fa fa-plus-circle clickable" />
                      { personToEdit &&
                        <i onClick={this.startEditingResponsiblePerson} className="fa fa-edit clickable" />
                      }
                    </div>
                  </Select>
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
    editProject: (project, cb) => dispatch(editProject(project, cb))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(translate("ProjectForm")(ProjectForm));
