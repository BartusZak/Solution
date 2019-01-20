import React from 'react';
import ProjectTeam from './project-team/project-team';
import ProjectSkills from './project-skills/project-skills';
import ProjectPhases from './project-phases/project-phases';

import './project-data.scss';
class ProjectData extends React.PureComponent {
  render() {
    const { team, skills, projectPhases: phases } = this.props.project;

    return (
      <div className="project-data-wrapper">
        <ProjectSkills skills={skills} />
        <ProjectTeam team={team} />
        <ProjectPhases phases={phases} />
      </div>
    );
  }
}

export default ProjectData;
