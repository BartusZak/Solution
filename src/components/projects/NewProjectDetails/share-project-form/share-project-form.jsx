import React from 'react';
import FancyModal from '../../../common/fancy-modal/fancy-modal';
import EmployeeSearcher from '../../../shared/employee-searcher/employee-searcher';
import Button from '../../../common/button/button';

import './share-project-form.scss';
class ShareProjectForm extends React.Component {
  state = {
    employees: [], isSharing: false
  };

  addPerson = employee => {
    console.log(employee);
    const employees = [...this.state.employees, employee];
    this.setState({employees});
  }

  handleSharingProject = () => {
    this.setState({isSharing: true});
  }

  render() {
    const { close } = this.props;
    const { employees } = this.state;
    return (
      <FancyModal positionClass="share-project-form m-w-h-center" close={close} renderHeader={() => (
        <h3 className="modal-header">Share project for person</h3>
      )}>

        <EmployeeSearcher
          showLabel
          employeeFilter={{ hasAccount: true, capacity: 0 }}
          emitEmployeeClick={this.addPerson}
        />

        <p className="important-par">Employees made avaible ({employees.length})</p>

        <div className="employees flex-row-center carousel element-scroll">
          <div className="name-and-avatar">
            <div className="user-avatar-medium">
              <img src="https://dev.dcmtbillennium.com/ProfiledPhotos/bploszynski.jpg" />
            </div>

            <div className="details">
              <span>Piotr Siemaszko</span>
            </div>
          </div>
          <div className="name-and-avatar">
            <div className="user-avatar-medium">
              <img src="https://dev.dcmtbillennium.com/ProfiledPhotos/bploszynski.jpg" />
            </div>

            <div className="details">
              <span>Piotr Siemaszko</span>
            </div>
          </div>
          <div className="name-and-avatar">
            <div className="user-avatar-medium">
              <img src="https://dev.dcmtbillennium.com/ProfiledPhotos/bploszynski.jpg" />
            </div>

            <div className="details">
              <span>Piotr Siemaszko</span>
            </div>
          </div>
          {/* {employees.map(employee => (
            <div className="avaible-employee">
              {employee.id}
            </div>
          ))} */}
        </div>

        <Button onClick={this.handleSharingProject} title="SHARE" mainClass="label-btn btn-submit-form" />
      </FancyModal>
    );
  }
}

export default ShareProjectForm;
