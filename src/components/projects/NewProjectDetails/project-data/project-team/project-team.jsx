import React from 'react';
import Button from '../../../../common/button/button';

import './project-team.scss';

class ProjectTeam extends React.PureComponent {
  render() {
    const { team } = this.props;
    const teamCount = team.length;
    return (
      <div className="project-team-wrapper box-circle flex-column">
        <p className="important-par flex-between-c">
          Project team ({teamCount})
          <i className="fa fa-sort clickable"></i>
        </p>
        <ul>
          {team.map(({employeeId, firstName, lastName, title, startDate, endDate}) => (
            <li key={employeeId} className="flex-row-center">
              <div className="team-member">
                <div className="user-avatar-medium">
                  <img src="https://dev.dcmtbillennium.com/ProfilePhotos/bploszynski.jpg" />
                </div>

                <div className="member-content flex-row-center">
                  <div className="member-details">
                    <span className="name">{firstName} {lastName}</span>
                    <span className="title">{title}</span>
                  </div>

                  <div className="member-details">
                    <div className="detail-label">
                      <span className="dcmt-light-color">phone number</span>
                      <span>{responsiblePerson.phoneNumber}</span>
                    </div>
                    <div className="detail-label">
                      <span className="dcmt-light-color">phone number</span>
                      <span>{responsiblePerson.phoneNumber}</span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <Button title="ADD NEW TEAM MEMBER" mainClass="label-btn dcmt-light-color" />
      </div>
    );
  }
}

export default ProjectTeam;
