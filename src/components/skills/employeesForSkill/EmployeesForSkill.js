import React, { Component } from "react";
import { translate } from "react-translate";
import './EmployeesForSkill.scss';

class EmployeesForSkill extends Component {
  render() {
    return (
      <div className="employees-for-skill-container">
        <div className="header">Pracownicy</div>
        <div className="employees-for-skill-list-container">
          {this.props.employeesBySkill && this.props.employeesBySkill.map((employee, index) => {
            return (
              <div className="employee-card-container" key={employee.id}>
                <figure>
                  <i className="fa fa-user" />
                </figure>
                <div className="full-name">{employee.firstName} {employee.lastName}</div>
                <div className="title">{employee.title}</div>
                <div className="seniority">{employee.seniority}</div>
                <div className="localization">{employee.localization}</div>
              </div>
            )
          })}
        </div>

      </div>
    )
  }
}

export default EmployeesForSkill;
