import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-translate';
import { getEmployeeDetails, loadFeedbacks, addFeedback, changeEmployeeFromCache } from '../../../actions/employeesActions';
import FancyModal from '../../common/fancy-modal/fancy-modal';
import EmployeeInformations from './employee-informations/employee-informations';
import EmployeeFeedbacks from './employee-feedbacks/employee-feedbacks';
import EmployeeProjects from './employee-projects/employee-projects';
import EmployeeSkills from './employee-skills/employee-skills';

import './EmployeeDetails.scss';
class EmployeeDetails extends React.Component {
    state = {
      currentExtenderComponentName: '',
      isLoadingEmployee: this.props.employeesCache[this.props.employeeId] ? false : true
    }

    componentDidMount = () => {
      if (!this.props.employeesCache[this.props.employeeId])
        this.handleLoadEmployee();
    }

    componentDidUpdate = prevProps => {
      if (prevProps.loadEmployeeResult !== this.props.loadEmployeeResult) {
        this.setState({isLoadingEmployee: false});
      }
    }

    handleLoadEmployee = () => {
      this.setState({isLoadingEmployee: true});
      this.props.getEmployeeDetails(this.props.employeeId);
    }

    changeComponentInExtender = name => {
      this.setState({currentExtenderComponentName: this.state.currentExtenderComponentName !== name ? name : ''});
    }

    componentsMap = {
      feedbacks: employee => <EmployeeFeedbacks
        feedbacksCache={this.props.employeeFeedbacksCache}
        addFeedback={this.props.addFeedback}
        isAddingFeedback={this.props.isAddingFeedback}
        employeeId={employee.id}
        loadFeedbacks={this.props.loadFeedbacks} />,
      projects: () => <EmployeeProjects />,
      skills: employee => <EmployeeSkills skills={employee.skills} />
    }

    closeEmployeeDetail = () => this.props.changeEmployeeFromCache('');

    render() {
        const { isLoadingEmployee, currentExtenderComponentName } = this.state;
        const { loadEmployeeResult, employeeId, employeesCache, employeeFeedbacksCache } = this.props;
        return (
            <FancyModal close={this.closeEmployeeDetail} positionClass="employee-cart m-w-h-center">
              <EmployeeInformations
                currentOpenedCart={currentExtenderComponentName}
                employee={employeesCache[employeeId]}
                feedbacksCount={employeeFeedbacksCache[employeeId] ? employeeFeedbacksCache[employeeId].length : null}
                reloadEmployeeData={this.handleLoadEmployee}
                changeComponentInExtender={this.changeComponentInExtender}
                isLoading={isLoadingEmployee}
                status={loadEmployeeResult.status} />
              <div className={`employee-cart-extender ${currentExtenderComponentName ? 'extender-on' : 'extender-off'}`}>
                {currentExtenderComponentName &&
                  this.componentsMap[currentExtenderComponentName](employeesCache[employeeId])
                }
              </div>
            </FancyModal>

        );

    }
}

const mapStateToProps = state => {
  return {
    loadEmployeeResult: state.employeesReducer.loadEmployeeResult,
    employeesCache: state.employeesReducer.employeesCache,

    employeeFeedbacksCache: state.employeesReducer.employeeFeedbacksCache,

    isAddingFeedback: state.employeesReducer.isAddingFeedback
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getEmployeeDetails: employeeId => dispatch(getEmployeeDetails(employeeId)),
    loadFeedbacks: employeeId => dispatch(loadFeedbacks(employeeId)),
    addFeedback: model => dispatch(addFeedback(model)),
    changeEmployeeFromCache: employeeId => dispatch(changeEmployeeFromCache(employeeId))
  };
};

export default translate("EmployeeDetails")(connect(mapStateToProps, mapDispatchToProps)(EmployeeDetails));




