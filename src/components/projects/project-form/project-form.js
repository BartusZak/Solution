import React from 'react';
import moment from 'moment';
import { orderBy } from '../../../services/transform-data-service';
import { translate } from 'react-translate';
import { connect } from 'react-redux';
import { getClientsSlim } from '../../../actions/clientsActions';
import { addProject } from '../../../actions/projectsActions';
import { InputSettings } from '../../common/fancy-form/index';
import DataList from '../../common/fancy-form/fancy-data-list';
import Select from '../../common/fancy-form/select';
import FancyModal from '../../common/fancy-modal/fancy-modal';
import FancyForm, { dFormat } from '../../common/fancy-form/fancy-form';
import ResponsiblePersonForm from '../responsible-person-form/responsible-person-form';

import './project-form.scss';
class ProjectForm extends React.PureComponent {
  validationConfig = { required: true, minLength: 3, maxLength: 255, regexp: 'text' };
  phases = {
    phaseFirstInitValues: 'phaseFirstInitValues',
    phaseSecondInitValues: 'phaseSecondInitValues'
  };
  phasesTitles = {
    phaseFirstInitValues: this.props.t("firstPhaseTitle"),
    phaseSecondInitValues: this.props.t("secondPhaseTitle")
  };
  phaseFirstSettings = {
    name: new InputSettings(this.props.t("name"), this.validationConfig ),
    description: new InputSettings(this.props.t("description"), this.validationConfig, 'textarea' ),
    startDate: new InputSettings(this.props.t("startDate"), { required: true }, 'date-picker' ),
    endDate: new InputSettings(this.props.t("endDate"), { required: true }, 'date-picker' ),
  };
  phaseSecondSettings = {
    client: new InputSettings(this.props.t("client"), this.validationConfig, 'type-and-select', true ),
    cloud: new InputSettings(this.props.t("cloud"), { minLength: 3, maxLength: 150 }, 'type-and-select', true ),
    responsiblePerson: new InputSettings(this.props.t("responsiblePerson"), { required: true }, 'select', true )
  };

  state = {
    openResonsiblePersonForm: false,
    responsiblePersonFormMode: 'add',
    phase: this.phases.phaseFirstInitValues,
    phaseFirstInitValues: { name: '', description: '', startDate: moment(), endDate: moment() },
    phaseSecondInitValues: { client: '', cloud: '', responsiblePerson: '' },
    runSubmitingFirstPhase: false,
    clientsMapped: [],
    cloudsMapped: [],
    personsMapped: [],
    isSubmitting: false,
    personToEdit: null
  };

  componentDidMount() {
    this.props.getClientsSlim();
  }

  componentDidUpdate(prevProps) {
    if (this.state.runSubmitingFirstPhase) {
      this.setState({runSubmitingFirstPhase: false});
    }
    const { clientsSlim, clientsSlimResult } = this.props;
    const isSlimClientsChanged = prevProps.clientsSlimResult !== clientsSlimResult;
    if (isSlimClientsChanged && clientsSlimResult.status) {
      this.injectClientsInField(clientsSlim);
    }
  }

  injectClientsInField = clients => {
    const clientsMapped = clients.map(client => {
      const cloudsDescription = client.clouds.length > 0 ? client.clouds.length + ' clouds' : '';
      return { displayValue: cloudsDescription, value: client.name };
    });
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
    const { projectId, clientsSlim } = this.props;
    const project = { ...this.state.phaseFirstInitValues, ...formData };
    project.startDate = moment(project.startDate).format(dFormat);
    project.endDate = moment(project.endDate).format(dFormat);

    const client = clientsSlim.find(c => c.name === project.client);
    if (client) {
      const person = client.responsiblePersons.find(p => `${p.firstName} ${p.lastName}` === project.responsiblePerson);
    }
    // Tu sie zastanowic czy przypadkiem tego nie trzeba zabezpieczyc

    this.setState({isSubmitting: true});

    if (projectId) {
      setTimeout(() => this.setState({isSubmitting: false}), 1500);
    }
    else {
      addProject(project)
        .then(() => {
          this.setState({isSubmitting: false});
        })
        .catch(() => this.setState({isSubmitting: false}));
    }
  }

  updateViewAfterAddPerson = person => {
    const responsiblePerson = `${person.firstName} ${person.lastName}`;
    // Jezeli dodalo nowego klienta to wybrac go i dodana osobe do kontaktu
    // Jezeli klienta nie dodano do wybrac osobe do kontaktu jako dodana
    this.setState({openResonsiblePersonForm: false});
  }

  updateViewAfterEditPerson = person => {
    this.setState({openResonsiblePersonForm: false});
  }

  setPersonToEditOnSelect = (personId, clientName) => {
    const client = this.props.clientsSlim.find(client => client.name === clientName);
    const personToEdit = client.responsiblePersons.find(p => p.id === +personId);
    personToEdit['client'] = clientName;
    this.setState({personToEdit});
  }

  render() {
    const { phase, phaseFirstInitValues, phaseSecondInitValues, runSubmitingFirstPhase,
      isFetchingClients, clientsMapped, cloudsMapped, personsMapped, openResonsiblePersonForm,
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
        <FancyModal isLoading={isSubmitting} phases={this.phases} currentPhase={phase} handleClick={this.changePhaseAndRunSubmit} title={this.phasesTitles[phase]}>
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
                    this.setPersonToEditOnSelect(e.target.value, values.client);
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
    clientsSlim: state.clientsReducer.clientsSlim,
    clientsSlimResult: state.clientsReducer.clientsSlimResult
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getClientsSlim: () => dispatch(getClientsSlim())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(translate("ProjectForm")(ProjectForm));
