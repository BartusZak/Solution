import React from 'react';
import { connect } from 'react-redux';
import { getProject } from '../../../actions/projectsActions';

import './NewProjectDetails.scss';
class NewProjectDetails extends React.Component {
  state = {
  }

  componentDidMount = () => this.props.getProject(this.props.match.params.id);

  render() {
    const { projectResult, project } = this.props;
    if (projectResult.loading)
      return <div className="spinner-new spinner-new-big spinner-new-center"></div>;
    else {
      return (
        <div className="project-details-wrapper">
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

export default connect(mapStateToProps, mapDispatchToProps)(NewProjectDetails);

