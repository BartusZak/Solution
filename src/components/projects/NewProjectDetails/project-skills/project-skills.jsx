import React from 'react';
import Button from '../../../common/button/button';
import SkillsManager from './skills-manager/skills-manager';
import ProjectSkill from './project-skill/project-skill';

import './project-skills.scss';
class ProjectSkills extends React.PureComponent {
  state = {
    skillsMarkers: {}, skillManager: false, skillManagerClass: 'manager-open'
  }

  componentDidMount = () => this.setMarkers();

  componentDidUpdate = prevProps => {
    if (prevProps.projectSkills !== this.props.projectSkills) this.setMarkers();
  }

  setMarkers = () => {
    const { projectSkills } = this.props;
    const skillsMarkers = {};
    setTimeout(() => {
      projectSkills.forEach(({skillId, skillLevel}) => {
        skillsMarkers[skillId] = `${(skillLevel/5)*100}%`;
      });
      this.setState({skillsMarkers});
    }, 200);
  }

  togleManager = () => this.setState({skillManager: !this.state.skillManager});

  setManagerClosedClass = () => this.setState({skillManagerClass: 'manager-closed'});
  setManagerOpenClass = () => this.setState({skillManagerClass: 'manager-open'});

  render() {
    const { skillsMarkers, skillManager, skillManagerClass } = this.state;
    const { projectSkills } = this.props;
    const skillsCount = projectSkills.length;
    console.log(skillManagerClass);
    return (
      <div className={`project-skills-wrapper flex-column ${skillsCount === 0 ? 'empty-list-bg' : ''}`}>
        <p className="important-par">Project skills ({skillsCount})</p>

        {skillsCount === 0 ?
          <div className="empty-list-comunicate">
            <p>Project skill list is already empty. Click button bellow if you want add new one</p>
            <i onClick={skillManager ? this.setManagerOpenClass : this.togleManager} className="fas fa-crosshairs fa-lg"></i>
          </div> :

          <React.Fragment>
            <ul>
              {projectSkills.map(({skillId, skillName: name, skillLevel, color}) => (
                <ProjectSkill markerWidth={skillsMarkers[skillId]}
                  key={skillId} name={name} skillLevel={skillLevel} color={color} />
              ))}
            </ul>

            <Button onClick={skillManager ? this.setManagerOpenClass : this.togleManager} title="OPEN MANAGEMENT" mainClass="dcmt-main-btn dcmt-light-btn" />

          </React.Fragment>
        }

        { skillManager &&
          <SkillsManager close={skillManager ? this.setManagerClosedClass : this.togleManager}
            skillManagerClass={skillManagerClass} />
        }
      </div>
    );
  }
}

export default ProjectSkills;
