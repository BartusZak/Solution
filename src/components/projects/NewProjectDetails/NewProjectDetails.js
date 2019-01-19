import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-translate';
import { getProject } from '../../../actions/projectsActions';
import ProjectInformations from './project-informations/project-informations';
import ProjectData from './project-data/project-data';

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
    const { projectResult, project, t } = this.props;
    if (this.state.isLoading)
      return <div className="spinner-new spinner-new-big spinner-new-center"></div>;
    else if(!projectResult.status) return null;
    else {
      return (
        <div className="project-details-wrapper">

          <ProjectInformations project={project} t={t} />

          <ProjectData project={project} t={t} />

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
