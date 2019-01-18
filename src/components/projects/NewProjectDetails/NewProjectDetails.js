import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-translate';
import { getProject } from '../../../actions/projectsActions';
import ProjectInformations from './project-informations/project-informations';
import './NewProjectDetails.scss';
class NewProjectDetails extends React.Component {
  state = {
  }

  componentDidMount = () => this.props.getProject(this.props.match.params.id);

  render() {
    const { projectResult, project, t } = this.props;
    if (projectResult.loading)
      return <div className="spinner-new spinner-new-big spinner-new-center"></div>;
    else if(!projectResult.status) return null;
    else {
      return (
        <div className="project-details-wrapper">

          <ProjectInformations project={project} t={t} />

          <div className="project-wrapper-right">

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

export default connect(mapStateToProps, mapDispatchToProps)(translate("NewProjectDetails")(NewProjectDetails));
