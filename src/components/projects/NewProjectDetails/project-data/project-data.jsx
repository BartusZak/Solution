import React from 'react'
import ProjectTeam from './project-team/project-team';
import ProjectSkills from './project-skills/project-skills';

import './project-data.scss';

class ProjectData extends React.PureComponent {
  render() {
    const { team, skills } = this.props.project;
    return (
      <div className="project-data-wrapper">
        <ProjectSkills skills={skills} />
        <ProjectTeam team={team} />
      </div>
    );
  }
}

export default ProjectData;
