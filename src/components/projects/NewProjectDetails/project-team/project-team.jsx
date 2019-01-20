import React from 'react';
import Button from '../../../common/button/button';
import Checkbox from '../../../common/checkbox/checkbox';

import './project-team.scss';

class ProjectTeam extends React.PureComponent {
  state = {
    markedMembers: {}
  };

  markMember = employeeId => {
    const markedMembers = {...this.state.markedMembers};
    if (markedMembers[employeeId]) delete markedMembers[employeeId];
    else markedMembers[employeeId] = employeeId;
    this.setState({markedMembers});
  }

  render() {
    const { markedMembers } = this.state;
    const { team } = this.props;
    const teamCount = team.length;

    return (
      <div className="project-team-wrapper box-circle flex-column">
        <p className="important-par flex-between-c data-padding">
          Project team ({teamCount})
          {Object.keys(markedMembers).length > 0 &&
            <i className="fa fa-user-times"></i>
          }
          {teamCount !== 0 &&
            <i className="fa fa-sort"></i>
          }
        </p>

        {teamCount === 0 ?
          <div className="empty-list-comunicate ">
            <p>Project team list is already empty. Click button bellow if you want add new one</p>
            <i className="fa fa-user-plus"></i>
          </div> :
          <React.Fragment>
            <ul>
              {team.map(({employeeId, firstName, lastName, title, seniority, startDate, endDate}) => (
                <li key={employeeId} className="element-toolbox-wrapper flex-row-center-wrap">
                  <div className="user-avatar-medium">
                    <img src="https://dev.dcmtbillennium.com/ProfilePhotos/bploszynski.jpg" />
                  </div>

                  <div className="user-info">
                    <span className="name">{firstName} {lastName}</span>
                    <div>
                      <span className="title">{title}</span>
                      <span className="seniority"> ({seniority})</span>
                    </div>
                  </div>

                  <div className="dates-info">
                    <div className={`detail-label ${endDate ? 'detail-row' : ''}`}>
                      <span className="dcmt-light-color">since</span>
                      <span>{startDate}</span>
                    </div>

                    {endDate &&
                    <div className="detail-label detail-row">
                      <span className="dcmt-light-color">to</span>
                      <span>{endDate}</span>
                    </div>
                    }
                  </div>

                  <div className={`element-toolbox ${markedMembers[employeeId] ? 'element-toolbox-expanded' : ''}`}>
                    <Checkbox checked={markedMembers[employeeId] ? true : false} id={employeeId}
                      handleChange={() => this.markMember(employeeId)}/>
                    <i className="fa fa-info-circle"></i>
                  </div>
                </li>
                ))}
              </ul>
              <Button title="ADD NEW TEAM MEMBER" mainClass="label-btn dcmt-light-color" />
            </React.Fragment>
        }
      </div>
    );
  }
}

export default ProjectTeam;
