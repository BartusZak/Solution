import React from 'react';
import FancyForm, { defaultDatePickerConfig } from '../../../common/fancy-form/fancy-form';
import { InputSettings, runSingleValidation } from '../../../common/fancy-form/index';
import { assignEmployeeIntoProject } from '../../../../actions/projectsActions';
import { connect } from 'react-redux';
import { translate } from 'react-translate';
import EmployeeSearcher from '../../../shared/employee-searcher/employee-searcher';
import DatePicker from 'react-datepicker';
import Button from '../../../common/button/button';
import ProgressMarker from '../../../shared/progress-marker/progress-marker';
import moment from 'moment';

import './employee-project-form.scss';

class EmployeeProjectForm extends React.PureComponent {
  state = {
    isSubmitting: false, inputError: '', inputValue: ''
  }
  roles = ['Developer', 'Human Resources'];
  initValues = { employeeId: '', role: 'Developer', startDate: moment(), endDate: moment(), assignedCapacity: 50, responsibilities: [] };
  settings = {
    employeeId: new InputSettings('employee', { required: true } ),
    role: new InputSettings('role', { required: true, minLength: 2, maxLength: 150 } ),
    startDate: new InputSettings('start date', { required: true } ),
    endDate: new InputSettings('end date', { required: true } ),
    assignedCapacity: new InputSettings('fte', { required: true } ),
    responsibilities: new InputSettings('responsibilities', { isNotEmptyList: true } )
  };
  responsibilitiesConfig = { required: true, minLength: 3, maxLength: 100, isInList: [] };

  handleResponsibilitiesChange = e => {
    const inputError = runSingleValidation(e.target.value, this.responsibilitiesConfig, 'responsibilities');
    this.setState({inputError, inputValue: e.target.value});
  }
  handleKeyPress = (e, func, currentValues) => {
    if (e.key === 'Enter') {
      const { inputValue } = this.state;
      const inputError = runSingleValidation(inputValue, this.responsibilitiesConfig, 'responsibilities');
      e.preventDefault();
      if (!inputError) {
        const responsibilities = [...currentValues, inputValue];
        this.responsibilitiesConfig.isInList = [...this.responsibilitiesConfig.isInList, inputValue];
        e.target.value = '';
        func(responsibilities, 'responsibilities');
        this.setState({inputValue: '', inputError: ''});
      }
      this.setState({inputError});
    }
  }

  handleAssigningEmployee = formData => {
    console.log(formData);
    this.setState({isSubmitting: true});
    this.props.assignEmployeeIntoProject(formData,
      () => this.setState({isSubmitting: false}),
      () => this.setState({isSubmitting: false}));
  }

  render() {
    const { close, t } = this.props;
    const { inputError } = this.state;
    return (
      <FancyForm
        initialValues={this.initValues}
        settings={this.settings}
        onSubmit={this.handleAssigningEmployee}>
        {
          (formKeys, values, errors, isFormInvalid, isFormDirty, handleChangeFromEvent, putChanges, handleSubmit) => (
            <form className="employees-project-form" onSubmit={handleSubmit}>

              <div className="form-left">
                <p id="header" className="important-par">{t("AddEmployeeToProject")} {values.length}</p>

                <div id="employee" className="fields-wrapper-col">
                  <EmployeeSearcher
                    showLabel
                    employeeFilter={{ hasAccount: true, capacity: 0 }}
                    emitEmployeeClick={employee => putChanges(employee, 'employeeId')}
                  />
                  <p className="field-error">{errors.employeeId}</p>
                </div>


                <div id="role" className="fields-wrapper-col">
                  <label className="field-label">{t("Role")} *</label>

                  <div className="field-block">
                    <select value={values.role} onChange={e => handleChangeFromEvent(e, 'role')}>
                      {this.roles.map(role => (
                        <option key={role}>{role}</option>
                      ))}
                    </select>
                  </div>

                  <p className="field-error">{errors.role}</p>

                </div>

                <div id="sdate" className="fields-wrapper-col">
                  <label className="field-label">{t("StartDate")} *</label>
                  <DatePicker {...defaultDatePickerConfig} className="field" selected={values.startDate} onChange={date => putChanges(date, 'startDate')} />
                  <p className="field-error">{errors.startDate}</p>
                </div>

                <div id="edate" className="fields-wrapper-col">
                  <label className="field-label">{t("EndDate")} *</label>
                  <DatePicker {...defaultDatePickerConfig} className="field" selected={values.endDate} onChange={date => putChanges(date, 'endDate')} />
                  <p className="field-error">{errors.endDate}</p>
                </div>

                <ProgressMarker emitChange={value => putChanges(value, 'assignedCapacity')} label="fte" jump={10} />
              </div>

              <div id="confirm" className="submit-wrapper">
                <Button type="submit" title={t("AddEmployee")} mainClass="dcmt-main-btn dcmt-light-btn animated-icon-btn">
                  <i className="fa fa-plus"></i>
                </Button>
                <Button type="button" onClick={close} title={t("CloseAdding")} mainClass="dcmt-main-btn dcmt-grey-btn animated-icon-btn">
                  <i className="fa fa-times"></i>
                </Button>
              </div>

              <div className="form-right box-circle">
                <p className="important-par">{t("ResponsibilitiesInProject")} *</p>
                <ul className="responsibilities">
                  {values.responsibilities.map(responsibility => (
                    <li className="element-toolbox-wrapper" key={responsibility}>
                      {responsibility}
                      <div className="element-toolbox">
                        <i onClick={() => putChanges(values.responsibilities.filter(r => r !== responsibility), 'responsibilities')} className="fa fa-times"></i>
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="field-error">{inputError || errors.responsibilities}</p>
                <div className="field-block">
                  <input onKeyPress={e => this.handleKeyPress(e, putChanges, values.responsibilities)}
                    onChange={this.handleResponsibilitiesChange}
                    placeholder={t("AddResponsibilityPlaceholder")} />
                  <div className="field-icon">
                    <i className={`fa fa-plus ${inputError ? 'dcmt-grey-color' : 'dcmt-light-color'}`} />
                  </div>
                </div>
              </div>
            </form>
          )

        }
      </FancyForm>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    assignEmployeeIntoProject: (model, succ, err) => dispatch(assignEmployeeIntoProject(model, succ, err))
  };
};

export default translate("EmployeeProjectForm")(connect(null, mapDispatchToProps)(EmployeeProjectForm));
