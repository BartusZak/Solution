import React from 'react';
import { Link } from 'react-router-dom';
import { translate } from 'react-translate';
import ProjectSkill from '../project-skill/project-skill';
import Button from '../../../../common/button/button';
import Filter from '../../../../../hocs/filter';

const filterConfig = { search: true,  sort: { key: 'name' } };
const ManagerContent = ({ allSkills, allSkillsCount, status, skillsData, reloadSkills, handleMarking, saveSkills, countOfMarkedSkills, t }) => {
  if (!status)
    return (
      <div className="empty-list-comunicate">
        <p>{t("LoadingSkillsProblem")}</p>
        <i onClick={reloadSkills} className="fas fa-sync-alt"></i>
      </div>
    );
  if (allSkillsCount === 0)
    return (
      <div className="empty-list-comunicate">
        <p>{t("EmptySkills")}</p>
        <Link to="/main/skills"><i className="fas fa-crosshairs fa-lg"></i></Link>
      </div>
    );
  return (
    <Filter list={allSkills} config={filterConfig}>
      {
        (filteredList, handleSearching, handleSorting) => (
          <React.Fragment>
            <h3 className="flex-between-c">
              {t("ManageSkillsLabel")} {`(${filteredList.length})`}
              {(filteredList.length > 0) && <i onClick={handleSorting} className="fa fa-sort clickable"></i>}
            </h3>
            {filteredList.length === 0 ?
              <div className="empty-list-comunicate">
                <p>{t("EmptyFilteringMessage")}</p>
                <i className="fas fa-crosshairs fa-lg"></i>
              </div> :
              <ul className="skills-list">
                {allSkills.map(({name}) => (
                  <ProjectSkill
                    label={t("SkillLevel")}
                    skillLevel={skillsData[name].skillLevel} markerWidth={skillsData[name].markerWidth}
                    color={skillsData[name].color} checked={skillsData[name].marked}
                    key={name} name={name} handleMarking={handleMarking} />
                ))}
              </ul>
            }
            <div className="skills-footer">
              <div className='field-block'>
                <input onChange={handleSearching} placeholder={t("FilterPlaceholder")} />
                <div className="field-icon"><i className='fa fa-search' /></div>
              </div>
              <Button disable={countOfMarkedSkills < 1} onClick={saveSkills} title={t("FinishButton")} mainClass="label-btn"></Button>
            </div>
          </React.Fragment>
        )
      }
    </Filter>
  );
}

export default translate("ManagerContent")(ManagerContent);
