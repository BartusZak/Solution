import React from 'react';
import Button from '../../../common/button/button';
import SkillsManager from './skills-manager/skills-manager';
import { translate } from 'react-translate';

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
    const { projectSkills, t } = this.props;
    const skillsCount = projectSkills.length;
    return (
      <div className={`project-skills-wrapper flex-column ${skillsCount === 0 ? 'empty-list-bg' : ''}`}>
        <p className="important-par">{t("ProjectSkills")} ({skillsCount})</p>

        {skillsCount === 0 ?
          <div className="empty-list-comunicate">
            <p>{t("SkillsListEmpty")}</p>
            <i onClick={skillManager ? this.setManagerOpenClass : this.togleManager} className="fas fa-crosshairs fa-lg"></i>
          </div> :

          <React.Fragment>
            <ul>
              {projectSkills.map(({skillId, skillName: name, color}) => (
                <li className="project-skill" key={skillId}>
                  <div className="skill-head flex-row-center">
                    <div className="skill-dot" style={{background: color}} />
                    <span className="skill-name">{name}</span>
                  </div>

                  <label className="field-label">{t("SkillLevel")}</label>
                  <div className="progress-marker">
                    <div className="progress-value" style={{width: skillsMarkers[skillId]}}>
                      <span className="progress-number-value">{skillsMarkers[skillId]}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <Button onClick={skillManager ? this.setManagerOpenClass : this.togleManager} title={t("OpenManagement")} mainClass="dcmt-main-btn dcmt-light-btn" />

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

export default translate("ProjectSkills")(ProjectSkills);
