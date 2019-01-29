import React from 'react';
import { Link } from 'react-router-dom';
import { translate } from 'react-translate';
import Button from '../../../../common/button/button';
import Checkbox from '../../../../common/checkbox/checkbox';
import ProgressMarker from '../../../../shared/progress-marker/progress-marker';
import Filter from '../../../../../hocs/filter';

const filterConfig = { search: 'name', sort: { key: 'name' } };
const ManagerContent = ({ allSkills, allSkillsCount, status, skillsData, reloadSkills, handleMarking, saveSkills, t,
  handleChangingSkill }) => {
  if (!status)
    return (
      <div className="empty-list-comunicate">
        <p>{t("LoadingSkillsProblem")}</p>
        <i onClick={reloadSkills} className="fas fa-sync-alt clickable"></i>
      </div>
    );
  if (allSkillsCount === 0)
    return (
      <div className="empty-list-comunicate">
        <p>{t("EmptySkills")}</p>
        <Link to="/main/skills"><i className="fas fa-crosshairs fa-lg clickable"></i></Link>
      </div>
    );
  return (
    <Filter list={allSkills} config={filterConfig}>
      {
        (filteredList, handleSearching, handleSorting) => (
          <React.Fragment>
            <h3 className="flex-between-c">
              {t("ManageSkillsLabel")} {`(${filteredList.length})`}
              {(filteredList.length > 5) && <i onClick={handleSorting} className="fa fa-sort clickable"></i>}
            </h3>
            {filteredList.length === 0 ?
              <div className="empty-list-comunicate">
                <p>{t("EmptyFilteringMessage")}</p>
                <i className="fas fa-crosshairs fa-lg"></i>
              </div> :
              <ul className="skills-list">
                {filteredList.map(({name}) => (
                <li className="project-skill" key={name}>
                  <div className="skill-head flex-row-center">
                    <div className="skill-dot" style={{background: skillsData[name].color}} />
                    <span className="skill-name">{name}</span>
                  </div>

                  <label className="field-label">{t("SkillLevel")}</label>
                  <ProgressMarker emitChange={value => handleChangingSkill(value, name)}
                    initialValue={skillsData[name].markerWidth} jump={20} />

                  <div className="checkbox-wrapper">
                    <Checkbox checked={skillsData[name].marked} id={name}
                      handleChange={() => handleMarking(name)} />
                  </div>
                </li>
                ))}
              </ul>
            }
            <div className="skills-footer">
              <div className='field-block'>
                <input onChange={handleSearching} placeholder={t("FilterPlaceholder")} />
                <div className="field-icon"><i className='fa fa-search' /></div>
              </div>
              <Button onClick={saveSkills} title={t("FinishButton")} mainClass="label-btn dcmt-color"></Button>
            </div>
          </React.Fragment>
        )
      }
    </Filter>
  );
}

export default translate("ManagerContent")(ManagerContent);
