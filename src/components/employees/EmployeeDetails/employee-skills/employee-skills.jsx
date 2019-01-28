import React from 'react';
import { translate } from 'react-translate';
import Button from '../../../common/button/button';

import './employee-skills.scss';

class EmployeeSkills extends React.PureComponent {
  render() {
    const { t, skills } = this.props;

    const skillsCount = skills.length;

    if (skillsCount === 0) {
      return (
        <div className="empty-list-comunicate">
          <p>{t("EmptySkills")}</p>
          <i className="fas fa-chart-bar fa-lg clickable"></i>
        </div>
      );
    }

    return (
      <React.Fragment>
        <p className="important-par">{t("Skills")} ({skillsCount})</p>

        <ul className="employees-skills-list">
          {skills.map(({id, name, level, yearsOfExperience, color})=> (
            <li className="employee-skill" key={id}>
              <div className="skill-head flex-row-center">
                <div className="skill-dot" style={{background: color}} />
                <span className="skill-name">{name}</span>
              </div>

              <div className="marker-wrapper">
                <label className="field-label">{t("SkillLevel")}</label>
                <div className="progress-marker">
                  <div className="progress-value" style={{width: `${(level/5)*100}%`}}>
                    <span className="progress-number-value">{(level/5)*100}%</span>
                  </div>
                </div>
              </div>

              <div className="experience flex-column">
                <label className="field-label">{t("Experience")}</label>
                <span>{yearsOfExperience} {yearsOfExperience === 1 ? t("Year") : t("Years")}</span>
              </div>
            </li>
          ))}
        </ul>

        <div className="employee-skills-footer">
          <Button mainClass="label-btn dcmt-light-color" title={t("ManageSkills")}>
            <i className='fa fa-chart-bar' />
          </Button>
        </div>

      </React.Fragment>
    );
  }
}

export default translate('EmployeeSkills')(EmployeeSkills);
