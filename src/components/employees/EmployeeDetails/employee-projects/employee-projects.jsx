import React from 'react';
import { translate } from 'react-translate';
import './employee-projects.scss';

class EmployeeProjects extends React.PureComponent {
  state = {
    isLoadingProjects: true
  };


  render() {
    const { t } = this.props;
    return (
      <React.Fragment>
        <p className="important-par">projects (10)</p>
      </React.Fragment>
    );
  }
}

export default translate('EmployeeProjects')(EmployeeProjects);
