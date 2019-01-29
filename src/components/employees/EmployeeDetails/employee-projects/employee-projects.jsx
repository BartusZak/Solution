import React from 'react';
import { translate } from 'react-translate';
import { withRouter } from 'react-router-dom';
import Button from '../../../common/button/button';

import './employee-projects.scss';
class EmployeeProjects extends React.PureComponent {
  state = {
    isLoadingEmployeeProjects: this.props.employeeProjectsCache[this.props.employeeId] ? false : true
  };

  componentDidMount = () => {
    if (!this.props.employeeProjectsCache[this.props.employeeId])
      this.handleLoadEmployeeProjects();
  }

  componentDidUpdate = prevProps => {
    if (prevProps.employeeProjectsCache !== this.props.employeeProjectsCache) {
      this.setState({isLoadingEmployeeProjects: false});
    }
  }

  handleLoadEmployeeProjects = () => {
    this.setState({isLoadingEmployeeProjects: true});
    this.props.loadEmployeeProjects(this.props.employeeId);
  }

  handleRedirectIntoProject = projectId => {
    const path = '/main/projects/' + projectId;
    this.props.history.push(path);
  }

  render() {
    const { isLoadingEmployeeProjects } = this.state;
    const { employeeProjectsCache, employeeId, t } = this.props;

    if (isLoadingEmployeeProjects) return <div className="spinner-new spinner-new-big spinner-new-center" />;

    const employeeProjects = employeeProjectsCache[employeeId];

    if (employeeProjects === null) {
      return (
        <div className="empty-list-comunicate">
          <p>{t("EmployeeProjectsProblem")}</p>
          <i onClick={this.handleLoadEmployeeProjects} className="fas fa-sync-alt fa-lg clickable"></i>
        </div>
      );
    }

    const employeeProjectsCount = employeeProjects.length;

    return (
      <React.Fragment>
        <p className="important-par">{t("Projects")} ({employeeProjectsCount})</p>
        <ul className="employee-projects">
          {employeeProjects.map(({assignmentId, projectName, projectId, role, startDate, endDate}) => (
            <li key={assignmentId} className="flex-column">
              <p className="important-par">{projectName}</p>
              <article>Description will be here. I need description here also from project details</article>
              <div className="label-wrappers">

                <div className="detail-label">
                  <span className="dcmt-light-color">{t("RoleInProject")}</span>
                  <span>{role}</span>
                </div>

                <div className="detail-label">
                  <span className="dcmt-light-color">{t("StartDate")}</span>
                  <span>{startDate}</span>
                </div>

                <div className="detail-label">
                  <span className="dcmt-light-color">{t("EndDate")}</span>
                  <span>{endDate}</span>
                </div>

              </div>

              <Button onClick={() => this.handleRedirectIntoProject(projectId)} title={t("GoTo")} mainClass="label-btn dcmt-color" />
            </li>
          ))}
        </ul>
      </React.Fragment>
    );
  }
}

export default translate('EmployeeProjects')(withRouter(EmployeeProjects));
