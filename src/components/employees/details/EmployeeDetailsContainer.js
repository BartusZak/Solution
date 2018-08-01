import React from 'react'
import './EmployeeDetailsContainer.scss';
import { connect } from 'react-redux';
import EmployeeContent from './employeeContent/employeeContent';
import EmployeeTable from './employeeTable/employeeTable';
import { getEmployeePromise, editStatistics, deleteEmployee, activateEmployee, reactivateEmployee } from '../../../actions/employeesActions';
import Spinner from '../../common/spinner/spinner';
import OperationStatusPrompt from '../../form/operationStatusPrompt/operationStatusPrompt';
import Button from '../../common/button/button';

class EmployeeDetailsContainer extends React.Component{
    state = {
        isLoadingFirstTimeEmployee: true,
        isChangingEmployeeData: false
    }
    componentDidMount() {
        const { getEmployeePromise, match} = this.props;
        getEmployeePromise(match.params.id);
    }
    
    componentWillReceiveProps(nextProps){
        if(nextProps.employeeErrors !== this.props.employeeErrors)
            this.setState({isLoadingFirstTimeEmployee: false, isChangingEmployeeData: false});
        else if(nextProps.employeeOperationStatus === false)
            this.setState({isChangingEmployeeData: false});
    }
    editSeniority = seniority => {
        const { employee, editStatistics } = this.props; 
        editStatistics(employee.id, seniority, employee.capacityLeft, employee.clouds);
    }
    editCapacity = capacity => {
        const { employee, editStatistics } = this.props;
        editStatistics(employee.id, employee.seniority, capacity, employee.clouds);
    }
    activateEmployee = () => {
        const { employee, activateEmployee } = this.props;
        this.setState({isChangingEmployeeData: true});
        activateEmployee(employee.id, "Junior", 0.3);
    }
    reactivateEmployee = () => {
        this.setState({isChangingEmployeeData: true});
        const { employee, reactivateEmployee } = this.props;
        reactivateEmployee(employee.id);
    }
    deleteEmployee = () => {
        this.setState({isChangingEmployeeData: true});
        const { employee, deleteEmployee } = this.props;
        deleteEmployee(employee.id);
    }
    render(){
        const { isLoadingFirstTimeEmployee, isChangingEmployeeData } = this.state;
        const { employeeStatus, employeeErrors, employee, employeeOperationStatus, 
            employeeOperationErrors, employeeResultMessage } = this.props;
        return (
            <div className="employee-details-container">
                {isLoadingFirstTimeEmployee ? <Spinner /> : 
                    employeeStatus && 
                    <React.Fragment>
                        <h1>Szczegóły pracownika</h1>
                
                        <EmployeeContent employee={employee} editCapacity={this.editCapacity}
                        deleteEmployee={this.deleteEmployee}
                        editSeniority={this.editSeniority} 
                        employeeErrors={employeeErrors} 
                        activateEmployee={this.activateEmployee} 
                        isChangingEmployeeData={isChangingEmployeeData} 
                        reactivateEmployee={this.reactivateEmployee}/>
                        
                        <EmployeeTable tableTitle="Aktywne projekty" />
                    </React.Fragment>
                }

                {employeeStatus === false &&  
                <OperationStatusPrompt
                    operationPromptContent={employeeErrors[0]}
                    operationPrompt={false}
                />
                }

                {(employeeOperationStatus !== null && employeeOperationStatus !== undefined) &&  
                <OperationStatusPrompt
                    operationPromptContent={employeeOperationStatus ? employeeResultMessage :
                        employeeOperationErrors[0]}
                    operationPrompt={employeeOperationStatus}
                />
                }
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        employeeStatus: state.employeesReducer.employeeStatus,
        employeeErrors: state.employeesReducer.employeeErrors,
        employee: state.employeesReducer.employee,

        employeeOperationStatus: state.employeesReducer.employeeOperationStatus,
        employeeOperationErrors: state.employeesReducer.employeeOperationErrors,
        employeeResultMessage: state.employeesReducer.employeeResultMessage
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        getEmployeePromise: (employeeId) => dispatch(getEmployeePromise(employeeId)),
        editStatistics: (employeeId, seniority, capacity, currentClouds) => dispatch(editStatistics(employeeId, seniority, capacity, currentClouds)),
        deleteEmployee: (employeeId) => dispatch(deleteEmployee(employeeId)),
        activateEmployee: (employeeId, seniority, capacity) => dispatch(activateEmployee(employeeId, seniority, capacity)),
        reactivateEmployee: (employeeId) => dispatch(reactivateEmployee(employeeId))
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(EmployeeDetailsContainer);
  