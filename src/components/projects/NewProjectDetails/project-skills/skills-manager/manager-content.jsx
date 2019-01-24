import React from 'react';
import { Link } from 'react-router-dom';
import ProjectSkill from '../project-skill/project-skill';
import Button from '../../../../common/button/button';
import Filter from '../../../../../hocs/filter';

const filterConfig = { search: true,  sort: { key: 'name' } };
const ManagerContent = ({ allSkills, allSkillsCount, status, skillsData, reloadSkills, handleMarking, saveSkills, countOfMarkedSkills }) => {
  if (!status)
    return (
      <div className="empty-list-comunicate">
        <p>There is a problem with loading skills...</p>
        <i onClick={reloadSkills} className="fas fa-sync-alt"></i>
      </div>
    );
  if (allSkillsCount === 0)
    return (
      <div className="empty-list-comunicate">
        <p>Skills list is empty. You need to populate list firstly on skills view. Click button bellow for being redirect</p>
        <Link to="/main/skills"><i className="fas fa-crosshairs fa-lg"></i></Link>
      </div>
    );
  return (
    <Filter list={allSkills} config={filterConfig}>
      {
        (filteredList, handleSearching, handleSorting) => (
          <React.Fragment>
            <h3 className="flex-between-c">
              Manage skills {`(${filteredList.length})`}
              {(filteredList.length > 0) && <i onClick={handleSorting} className="fa fa-sort clickable"></i>}
            </h3>
            {filteredList.length === 0 ?
              <div className="empty-list-comunicate">
                <p>Not results for typed value...</p>
                <i className="fas fa-crosshairs fa-lg"></i>
              </div> :
              <SkillsList allSkills={filteredList} skillsData={skillsData} handleMarking={handleMarking} />
            }
            <div className="skills-footer">
              <div className='field-block'>
                <input onChange={handleSearching} placeholder='type here for find skill...' />
                <div className="field-icon"><i className='fa fa-search' /></div>
              </div>
              <Button disable={countOfMarkedSkills < 1} onClick={saveSkills} title="FINISH" mainClass="label-btn"></Button>
            </div>
          </React.Fragment>
        )
      }
    </Filter>
  );
}

const SkillsList = ({allSkills, skillsData, handleMarking}) => (
  <ul className="skills-list">
    {allSkills.map(({name}) => (
      <ProjectSkill
        skillLevel={skillsData[name].skillLevel} markerWidth={skillsData[name].markerWidth}
        color={skillsData[name].color} checked={skillsData[name].marked}
        key={name} name={name} handleMarking={handleMarking} />
    ))}
  </ul>
);

export default ManagerContent;
