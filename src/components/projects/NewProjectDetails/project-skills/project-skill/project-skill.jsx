import React from 'react';
import Checkbox from '../../../../common/checkbox/checkbox';

import './project-skill.scss';

class ProjectSkill extends React.Component {
  shouldComponentUpdate = prevProps => {
    if (prevProps.checked !== this.props.checked || prevProps.markerWidth !== this.props.markerWidth)
      return true;
    return false;
  }
  render() {
    const { name, color, skillLevel, markerWidth, checked, handleMarking } = this.props;
    return (
      <li className="project-skill">
        <div className="skill-head flex-row-center">
          <div className="skill-dot" style={{background: color}} />
          <span className="skill-name">{name}</span>
        </div>

        <div className="skill-details flex-row-center">
          <div className="detail-label">
            <span className="dcmt-light-color">experience level</span>
            <div className="flex-row-center">
              <span className="skill-number">{skillLevel}</span>
              <div className="progress-marker" style={{width: '100px'}}>
                {console.log(markerWidth)}
                <div className="progress-value" style={{width: markerWidth}} />
              </div>
            </div>
          </div>
          <div className="detail-label">
            <span className="dcmt-light-color">years of experience</span>
            <span>{skillLevel}</span>
          </div>
        </div>

        {handleMarking &&
          <div className="checkbox-wrapper">
            <Checkbox checked={checked} id={name}
              handleChange={() => handleMarking(name)}/>
          </div>
        }
      </li>
    );
  }
}
export default ProjectSkill;
