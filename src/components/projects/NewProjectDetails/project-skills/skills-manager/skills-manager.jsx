import React from 'react';
import FancyModal from '../../../../common/fancy-modal/fancy-modal';
import ManagerContent from './manager-content';
import { loadAllSkills } from '../../../../../actions/skillsActions';
import { editSkillsInProject } from '../../../../../actions/projectsActions';
import { getRandomColor } from '../../../../../services/methods';
import { connect } from 'react-redux';
import { ProjectDetailsContext } from '../../index';

import './skills-manager.scss';
const { Consumer } = ProjectDetailsContext;
class SkillsManagement extends React.Component {
  state = {
    isLoadingAllSkills: true, skillsData: null, isAddingSkills: false, countOfMarkedSkills: 0
  }

  componentDidMount = () => {
    if (!this.props.loadAllSkillsResult.status)
      this.getSkills();
    else {
      this.generateSkillData();
    }
  }

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
    const { allSkills } = this.props;
    const allSkillsKeys = Object.keys(allSkills);
    allSkillsKeys.forEach(key => {
      const name = allSkills[key].name;
      const skillData = { skillId: key, name, color: getRandomColor(), markerWidth: 20, skillLevel: 3, marked: false };
      skillsData[name] = skillData;
    });
    this.setState({skillsData, isLoadingAllSkills: false});
  }

  getSkills = () => {
    this.setState({isLoadingAllSkills: true});
    this.props.loadAllSkills();
  }

  handleMarking = name => {
    const skillsData = {...this.state.skillsData};
    skillsData[name].marked = !skillsData[name].marked;
    const countOfMarkedSkills = Object.values(skillsData).filter(item => item.marked).length;
    this.setState({skillsData, countOfMarkedSkills});
  }

  handleEditSkillsInProject = id => {
    const { skillsData } = this.state;
    const skills = Object.values(skillsData)
      .filter(skillData => skillData.marked)
      .map(({skillId, skillLevel}) => ({skillId, skillLevel}));

    this.setState({isAddingSkills: true});
    this.props.editSkillsInProject(id, skills,
      () => this.setState({isAddingSkills: false}),
      () => this.setState({isAddingSkills: false}));
  }

  render() {
    const { isLoadingAllSkills, skillsData, isAddingSkills, countOfMarkedSkills } = this.state;
    const { close, allSkills, loadAllSkillsResult, skillManagerClass } = this.props;
    const allSkillsCount = allSkills.length;

    return (
      <Consumer>
        {project => (
          <FancyModal backdropClass={skillManagerClass} scale={false} isLoading={isAddingSkills}
            positionClass={`skills-modal m-w-h-center ${skillManagerClass}`} close={close}>
            { isLoadingAllSkills ? <div className="spinner-new spinner-new-big spinner-new-center" /> :
              <ManagerContent countOfMarkedSkills={countOfMarkedSkills}
                saveSkills={() => this.handleEditSkillsInProject(project.id)}
                reloadSkills={this.getSkills} handleMarking={this.handleMarking}
                allSkills={allSkills} allSkillsCount={allSkillsCount}
                status={loadAllSkillsResult.status} skillsData={skillsData} />
            }
          </FancyModal>
        )}

      </Consumer>
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
    loadAllSkills: () => dispatch(loadAllSkills()),
    editSkillsInProject: (id, skills, succ, err) => dispatch(editSkillsInProject(id, skills, succ, err))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SkillsManagement);
