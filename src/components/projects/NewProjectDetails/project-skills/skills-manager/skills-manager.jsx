import React from 'react';
import FancyModal from '../../../../common/fancy-modal/fancy-modal';
import Button from '../../../../common/button/button';
import ProjectSkill from '../project-skill/project-skill';
import { loadAllSkills } from '../../../../../actions/skillsActions';
import { getRandomColor } from '../../../../../services/methods';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './skills-manager.scss';

const ManagerContent = ({allSkills, allSkillsCount, status, skillsData, reloadSkills, handleMarking}) => {
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
    <React.Fragment>
      <ul className="skills-list">
        {allSkills.map(({name}) => (
          <ProjectSkill
            skillLevel={skillsData[name].skillLevel} markerWidth={skillsData[name].markerWidth}
            color={skillsData[name].color} checked={skillsData[name].marked}
            key={name} name={name} handleMarking={handleMarking} />
        ))}
      </ul>

      <div className="skills-footer flex-between-c">
        <div className='field-block'>
          <input placeholder='type here for find skill...' />
          <div className="field-icon"><i className='fa fa-search' /></div>
        </div>
        <Button title="FINISH" mainClass="label-btn"></Button>
      </div>
    </React.Fragment>
  );
}

class SkillsManagement extends React.PureComponent {
  state = {
    isLoadingAllSkills: true, skillsData: null
  }

  componentDidMount = () => this.getSkills();

  componentDidUpdate = prevProps => {
    if(prevProps.loadAllSkillsResult !== this.props.loadAllSkillsResult) {
      if (this.props.loadAllSkillsResult.status) {
        this.generateSkillData();
      }
      this.setState({isLoadingAllSkills: false});
    }
  }

  generateSkillData = () => {
    const skillsData = {};
    this.props.allSkills.forEach(({name}) => {
      skillsData[name] = { color: getRandomColor(), markerWidth: 40, skillLevel: 3, marked: false }
    });
    this.setState({skillsData});
  }

  getSkills = () => {
    this.setState({isLoadingAllSkills: true});
    this.props.loadAllSkills();
  }

  handleMarking = name => {
    const skillsData = {...this.state.skillsData};
    skillsData[name].marked = !skillsData[name].marked;
    this.setState({skillsData});
  }

  render() {
    const { isLoadingAllSkills, skillsData } = this.state;
    const { close, allSkills, loadAllSkillsResult } = this.props;
    const allSkillsCount = allSkills.length;
    return (
      <FancyModal positionClass='skills-modal flex-column' close={close} renderHeader={() => (
        <h3 className="flex-between-c">
          Manage skills {isLoadingAllSkills || `(${allSkillsCount})`}
          {(isLoadingAllSkills && loadAllSkillsResult.status && allSkillsCount > 0) || <i className="fa fa-sort"></i>}
        </h3>
      )}>
        { isLoadingAllSkills ? <div className="spinner-new spinner-new-big spinner-new-center" /> :
          <ManagerContent
            reloadSkills={this.getSkills} handleMarking={this.handleMarking}
            allSkills={allSkills} allSkillsCount={allSkillsCount}
            status={loadAllSkillsResult.status} skillsData={skillsData} />
        }
      </FancyModal>
    );
  }
}

const mapStateToProps = state => {
  return {
    allSkills: state.skillsReducer.skills,
    loadAllSkillsResult: state.skillsReducer.loadAllSkillsResult
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadAllSkills: () => dispatch(loadAllSkills())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SkillsManagement);
