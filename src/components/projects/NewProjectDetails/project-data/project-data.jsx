import React from 'react'
import ProjectTeam from './project-team/project-team';

import './project-data.scss';

class ProjectData extends React.PureComponent {
  render() {
    const { team, skills } = this.props.project;
    console.log(team, skills);
    return (
      <div className="project-data-wrapper">
        <ProjectTeam team={team} />
      </div>
    );
  }
}

export default ProjectData;
