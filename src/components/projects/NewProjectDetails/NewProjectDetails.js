import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getProject } from '../../../actions/projectsActions';
import { putAllSkills } from '../../../actions/skillsActions';
import { ProjectDetailsContext } from './index';
import ProjectInformations from './project-informations/project-informations';
import ProjectSkills from './project-skills/project-skills';
import ProjectTeam from './project-team/project-team';
import ProjectPhases from './project-phases/project-phases';
import ProjectPhaseForm from '../phase-project-form/phase-project-form';
import EmployeeProjectForm from './employee-project-form/employee-project-form';

import './NewProjectDetails.scss';
const { Provider } = ProjectDetailsContext;
class NewProjectDetails extends React.Component {
  state = {
    isLoading: true, editProjectForm: false, addPhaseForm: false, addEmployeeForm: false
  }
  componentDidMount = () => this.getProjectDetails();
  componentDidUpdate = prevProps => {
    if(prevProps.projectResult !== this.props.projectResult)
      this.setState({isLoading: false});
    if(prevProps.match.params.id !== this.props.match.params.id) {
      this.getProjectDetails();
    }
  }

  getProjectDetails = () => {
    const { getProject, match } = this.props;
    this.setState({isLoading: true});
    getProject(match.params.id);
  }

  togleEditForm = () => this.setState({editProjectForm: !this.state.editProjectForm});
  toglePhaseForm = () => this.setState({addPhaseForm: !this.state.addPhaseForm});
  togleAddEmployeeForm = () => this.setState({addEmployeeForm: !this.state.addEmployeeForm});

  componentWillUnmount = () => this.props.putAllSkills();

  render() {
    const { projectResult, project, t, history } = this.props;
    if (this.state.isLoading)
      return <div style={{position: 'fixed'}} className="spinner-new spinner-new-big spinner-new-center"></div>;
    else if(!projectResult.status) return null;
    else {
      const { id, skills, team, projectPhases: phases, client, cloud, responsiblePerson } = project;
      const { editProjectForm, addPhaseForm, addEmployeeForm } = this.state;
      return (
        <div className="project-details-wrapper">
          <Provider value={project}>
            <ProjectInformations project={project} t={t} togleEditForm={this.togleEditForm} toglePhaseForm={this.toglePhaseForm}/>
            <div className="project-data-wrapper">

              {!addEmployeeForm ?
                <React.Fragment>
                  <ProjectSkills projectSkills={skills} />
                  <ProjectTeam team={team} togleAddEmployeeForm={this.togleAddEmployeeForm}/>
                </React.Fragment> :
                <EmployeeProjectForm close={this.togleAddEmployeeForm} />
              }

              {!project.parentId &&
                <ProjectPhases openAddingPhase={this.toglePhaseForm}
                  phases={phases} push={id => history.push('/main/projects/' + id)} />
              }
            </div>
          </Provider>

          {editProjectForm &&
            <ProjectPhaseForm projectToEdit={project}
              onSubmitSucc={this.togleEditForm}
              close={this.togleEditForm}/>
          }

          {addPhaseForm &&
            <ProjectPhaseForm parentId={id} isPhaseForm
              projectToEdit={{name: '', description: '', client, cloud, responsiblePerson}}
              onSubmitSucc={this.toglePhaseForm}
              close={this.toglePhaseForm} />
          }
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    project: state.projectsReducer.project,
    projectResult: state.projectsReducer.projectResult
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProject: id => dispatch(getProject(id)),
    putAllSkills: () => dispatch(putAllSkills([], {result: null}))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewProjectDetails));
