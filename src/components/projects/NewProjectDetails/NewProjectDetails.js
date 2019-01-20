import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-translate';
import { withRouter } from 'react-router-dom';
import { getProject } from '../../../actions/projectsActions';
import ProjectInformations from './project-informations/project-informations';
import ProjectSkills from './project-skills/project-skills';
import ProjectTeam from './project-team/project-team';
import ProjectPhases from './project-phases/project-phases';

import './NewProjectDetails.scss';
class NewProjectDetails extends React.Component {
  state = {
    isLoading: true
  }
  componentDidMount = () => this.getProjectDetails();
  componentDidUpdate = prevProps => {
    if(prevProps.projectResult !== this.props.projectResult)
      this.setState({isLoading: false});
    if(prevProps.match.params.id !== this.props.match.params.id)
      this.getProjectDetails();
  }

  getProjectDetails = () => {
    const { getProject, match } = this.props;
    this.setState({isLoading: true});
    getProject(match.params.id);
  }

  render() {
    const { projectResult, project, t, history } = this.props;
    if (this.state.isLoading)
      return <div style={{position: 'fixed'}} className="spinner-new spinner-new-big spinner-new-center"></div>;
    else if(!projectResult.status) return null;
    else {
      const { skills, team, projectPhases: phases } = project;
      return (
        <div className="project-details-wrapper">
          <ProjectInformations project={project} t={t} />
          <div className="project-data-wrapper">
            <ProjectSkills skills={skills} />
            <ProjectTeam team={team} />

            {!project.parentId &&
              <ProjectPhases phases={phases} push={id => history.push('/main/projects/' + id)} />
            }
          </div>
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
    getProject: id => dispatch(getProject(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(translate("NewProjectDetails")(withRouter(NewProjectDetails)));
