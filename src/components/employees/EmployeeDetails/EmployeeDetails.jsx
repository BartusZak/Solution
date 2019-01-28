import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-translate';
import { getEmployeeDetails, loadFeedbacks, addFeedback } from '../../../actions/employeesActions';
import FancyModal from '../../common/fancy-modal/fancy-modal';
import EmployeeInformations from './employee-informations/employee-informations';
import EmployeeFeedbacks from './employee-feedbacks/employee-feedbacks';
import EmployeeProjects from './employee-projects/employee-projects';
import EmployeeSkills from './employee-skills/employee-skills';

import './EmployeeDetails.scss';
class EmployeeDetails extends React.Component {
    state = {
      currentExtenderComponentName: '',
      isLoadingEmployee: true
    }

    componentDidMount = () => {
      this.handleLoadEmployee();
    }

    componentDidUpdate = prevProps => {
      if (prevProps.loadEmployeeResult !== this.props.loadEmployeeResult) {
        this.setState({isLoadingEmployee: false});
      }
    }

    handleLoadEmployee = () => {
      this.setState({isLoadingEmployee: true});
      this.props.getEmployeeDetails('bploszynski');
    }

    changeComponentInExtender = name => {
      this.setState({currentExtenderComponentName: this.state.currentExtenderComponentName !== name ? name : ''});
    }

    componentsMap = {
      feedbacks: employee => <EmployeeFeedbacks
        addFeedback={this.props.addFeedback}
        isAddingFeedback={this.props.isAddingFeedback}
        employee={employee}
        result={this.props.loadFeedbacksResult}
        loadFeedbacks={this.props.loadFeedbacks} />,
      projects: () => <EmployeeProjects />,
      skills: employee => <EmployeeSkills skills={employee.skills} />
    }

    render() {
        const { isLoadingEmployee, currentExtenderComponentName } = this.state;
        const { loadEmployeeResult, employeeFromCache, employeesCache } = this.props;
        return (
            <FancyModal close={() => {}} positionClass="employee-cart m-w-h-center">
              <EmployeeInformations
                currentOpenedCart={currentExtenderComponentName}
                employee={employeesCache[employeeFromCache]}
                reloadEmployeeData={this.handleLoadEmployee}
                changeComponentInExtender={this.changeComponentInExtender}
                isLoading={isLoadingEmployee}
                status={loadEmployeeResult.status} />
              <div className={`employee-cart-extender ${currentExtenderComponentName ? 'extender-on' : 'extender-off'}`}>
                {currentExtenderComponentName &&
                  this.componentsMap[currentExtenderComponentName](employeesCache[employeeFromCache])
                }
              </div>
            </FancyModal>

        );

    }
}

const mapStateToProps = state => {
  return {
    loadEmployeeResult: state.employeesReducer.loadEmployeeResult,
    employeeFromCache: state.employeesReducer.employeeFromCache,
    employeesCache: state.employeesReducer.employeesCache,

    loadFeedbacksResult: state.employeesReducer.loadFeedbacksResult,

    isAddingFeedback: state.employeesReducer.isAddingFeedback
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getEmployeeDetails: employeeId => dispatch(getEmployeeDetails(employeeId)),
    loadFeedbacks: employeeId => dispatch(loadFeedbacks(employeeId)),
    addFeedback: model => dispatch(addFeedback(model))
  };
};

export default translate("EmployeeDetails")(connect(mapStateToProps, mapDispatchToProps)(EmployeeDetails));




