import React from 'react';
import Button from '../../../common/button/button';
import './project-skills.scss';

class ProjectSkills extends React.PureComponent {
  state = {
    skillsMarkers: {}
  }

  componentDidMount = () => this.setMarkers();

  componentDidUpdate = prevProps => {
    if (prevProps.skills !== this.props.skills) this.setMarkers();
  }

  setMarkers = () => {
    const { skills } = this.props;
    const skillsMarkers = {};
    setTimeout(() => {
      skills.forEach(({skillId, skillLevel}) => {
        skillsMarkers[skillId] = `${(skillLevel/5)*100}%`;
      });
      this.setState({skillsMarkers});
    }, 200);
  }

  render() {
    const { skillsMarkers } = this.state;
    const { skills } = this.props;
    const skillsCount = skills.length;
    return (
      <div className="project-skills-wrapper flex-column">
        <p className="important-par">Project skills ({skillsCount})</p>

        {skillsCount === 0 ?
          <div className="empty-list-comunicate">
            <p>Project skill list is already empty. Click button bellow if you want add new one</p>
            <i className="fas fa-crosshairs fa-lg"></i>
          </div> :

          <React.Fragment>
            <ul>
              {skills.map(({skillId, skillName, skillLevel, coveredAtLevel, color}) => (
                <li key={skillId}>
                  <div className="skill-head flex-row-center">
                    <div className="skill-dot" style={{background: color}} />
                    <span className="skill-name">{skillName}</span>
                  </div>
                  <div className="skill-details flex-row-center">
                    <div className="detail-label">
                      <span className="dcmt-light-color">experience level</span>

                      <div className="flex-row-center">
                        <span className="skill-number">{skillLevel}</span>
                        <div className="progress-marker" style={{width: '100px'}}>
                          <div className="progress-value" style={{width: skillsMarkers[skillId]}} />
                        </div>
                      </div>

                    </div>
                    <div className="detail-label">
                      <span className="dcmt-light-color">years of experience</span>
                      <span>{coveredAtLevel}</span>
                    </div>

                  </div>
                </li>
              ))}
            </ul>

            <Button title="OPEN MANAGEMENT" mainClass="dcmt-main-btn dcmt-light-btn" />
          </React.Fragment>
        }
      </div>
    );
  }
}
export default ProjectSkills;
