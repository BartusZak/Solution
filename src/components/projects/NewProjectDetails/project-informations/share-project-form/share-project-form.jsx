import React from 'react';
import FancyModal from '../../../../common/fancy-modal/fancy-modal';
import EmployeeSearcher from '../../../../shared/employee-searcher/employee-searcher';
import Button from '../../../../common/button/button';
import { translate } from 'react-translate';

import './share-project-form.scss';
class ShareProjectForm extends React.Component {
  state = {
    employees: [], isSharing: false
  };

  addPerson = employee => {
    const employees = [...this.state.employees, employee];
    this.setState({employees});
  }

  handleSharingProject = () => {
    this.setState({isSharing: true});
  }

  render() {
    const { close, t } = this.props;
    const { employees } = this.state;
    return (
      <FancyModal positionClass="share-project-form m-w-h-center" close={close}>

        <h3 className="fancy-modal-header">{t("ShareProjectLabel")}</h3>

        <div className="searcher-wrapper">
          <EmployeeSearcher
            showLabel
            employeeFilter={{ hasAccount: true, capacity: 0 }}
            emitEmployeeClick={this.addPerson}
          />
        </div>

        <p className="important-par">{t("EmployeesMadeAvaible")} ({employees.length})</p>

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

        <Button onClick={this.handleSharingProject} title={t("Share")} mainClass="label-btn btn-submit-form" />
      </FancyModal>
    );
  }
}

export default translate('ShareProjectForm')(ShareProjectForm);
