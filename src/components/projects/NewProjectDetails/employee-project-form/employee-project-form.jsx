import React from 'react';
import FancyForm, { defaultDatePickerConfig } from '../../../common/fancy-form/fancy-form';
import { InputSettings, runSingleValidation } from '../../../common/fancy-form/index';
import { assignEmployeeIntoProject } from '../../../../actions/projectsActions';
import { connect } from 'react-redux';
import EmployeeSearcher from '../../../shared/employee-searcher/employee-searcher';
import TypeAndSelect from '../../../common/fancy-form/fancy-data-list';
import DatePicker from 'react-datepicker';
import Button from '../../../common/button/button';
import ProgressMarker from '../../../shared/progress-marker/progress-marker';
import moment from 'moment';

import './employee-project-form.scss';

class EmployeeProjectForm extends React.PureComponent {
  state = {
    isSubmitting: false, inputError: '', inputValue: ''
  }
  roles = [{value: 'Developer', displayValue: 'Developer'}, {value: 'Human Resources', displayValue: 'Human Resources'}];
  initValues = { employee: '', role: '', startDate: moment(), endDate: moment(), fte: 50, responsibilities: [] };
  settings = {
    employee: new InputSettings('employee', { required: true } ),
    role: new InputSettings('role', { required: true, minLength: 2, maxLength: 150 } ),
    startDate: new InputSettings('start date', { required: true } ),
    endDate: new InputSettings('end date', { required: true } ),
    fte: new InputSettings('fte', { required: true } ),
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
    this.setState({isSubmitting: true});
    this.props.assignEmployeeIntoProject(formData,
      () => this.setState({isSubmitting: false}),
      () => this.setState({isSubmitting: false}));
  }

  render() {
    const { close } = this.props;
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
                <p id="header" className="important-par">Add employee to project</p>

                <div id="employee" className="fields-wrapper-col">
                  <EmployeeSearcher
                    showLabel
                    employeeFilter={{ hasAccount: true, capacity: 0 }}
                    emitEmployeeClick={employee => putChanges(employee, 'employee')}
                  />
                  <p className="field-error">{errors.employee}</p>
                </div>


                <div id="role" className="fields-wrapper-col">
                  <label className="field-label">role</label>

                  <TypeAndSelect value={values.role} className="field" listName="roles" listData={this.roles}
                    placeholder="select role in project..." onChange={e => handleChangeFromEvent(e, 'role')} />

                  <p className="field-error">{errors.role}</p>

                </div>

                <div id="sdate" className="fields-wrapper-col">
                  <label className="field-label">start date</label>
                  <DatePicker {...defaultDatePickerConfig} className="field" selected={values.startDate} onChange={date => putChanges(date, 'startDate')} />
                  <p className="field-error">{errors.startDate}</p>
                </div>

                <div id="edate" className="fields-wrapper-col">
                  <label className="field-label">end date</label>
                  <DatePicker {...defaultDatePickerConfig} className="field" selected={values.endDate} onChange={date => putChanges(date, 'endDate')} />
                  <p className="field-error">{errors.endDate}</p>
                </div>

                <ProgressMarker emitChange={value => putChanges(value, 'fte')}
                  label="fte" jump={25} />
              </div>

              <div id="confirm" className="submit-wrapper">
                <Button type="submit" title="ADD EMPLOYEE" mainClass="dcmt-main-btn dcmt-light-btn animated-icon-btn">
                  <i className="fa fa-plus"></i>
                </Button>
                <Button type="button" onClick={close} title="CLOSE ADDING" mainClass="dcmt-main-btn dcmt-grey-btn animated-icon-btn">
                  <i className="fa fa-times"></i>
                </Button>
              </div>

              <div className="form-right box-circle">
                <p className="important-par">responsibilities in project</p>
                <ul className="responsibilities">
                  {values.responsibilities.map(responsibility => (
                    <li className="element-toolbox-wrapper" key={responsibility}>
                      {responsibility}
                      <div className="element-toolbox">
                        <i className="fa fa-times"></i>
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="field-error">{errors.responsibilities || inputError}</p>
                <div className="field-block">
                  <input onKeyPress={e => this.handleKeyPress(e, putChanges, values.responsibilities)}
                    onChange={this.handleResponsibilitiesChange}
                    placeholder='type here for find skill...' />
                  <div className="field-icon">
                    <i className={`fa fa-plus ${(errors.responsibilities || inputError) ? 'dcmt-grey-color' : 'dcmt-light-color'}`} />
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

export default connect(null, mapDispatchToProps)(EmployeeProjectForm);
