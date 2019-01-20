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
  componentDidMount = () => this.props.getProject(this.props.match.params.id);
  componentDidUpdate = prevProps => {
    if(prevProps.projectResult !== this.props.projectResult)
      this.setState({isLoading: false});
  }
  render() {
    const { projectResult, project, t, match, history } = this.props;
    if (this.state.isLoading)
      return <div className="spinner-new spinner-new-big spinner-new-center"></div>;
    else if(!projectResult.status) return null;
    else {
      const { skills, team, projectPhases: phases } = project;
      return (
        <div className="project-details-wrapper">

          <ProjectInformations project={project} t={t} />

          <div className="project-data-wrapper">
            <ProjectSkills skills={skills} />
            <ProjectTeam team={team} />
            <ProjectPhases phases={phases} projectUrlId={match.params.id} push={history.push}/>
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
