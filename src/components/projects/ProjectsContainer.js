import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as projectsActions from "../../actions/projectsActions";
import * as asyncActions from "../../actions/asyncActions";
import ProjectsList from "../../components/projects/ProjectsList";
import WebApi from "../../api/";
import { ACTION_CONFIRMED } from "./../../constants";
import { Route, Switch } from "react-router-dom";
import ProjectDetails from "./ProjectDetails/ProjectDetails";
import { translate } from "react-translate";

class ProjectsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      limit: 15,
      init: false
    };

    this.pageChange = this.pageChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.validatePropsForAction(nextProps, "deleteProject")) {
      this.props.async.setActionConfirmationProgress(true);
      WebApi.projects.delete
        .deleteProject(this.props.toConfirm.id)
        .then(response => {
          this.props.async.setActionConfirmationResult(response);
          this.pageChange(this.state.currentPage);
        })
        .catch(error => {
          this.props.async.setActionConfirmationResult(error);
        });
    }
    if (this.validatePropsForAction(nextProps, "closeProject")) {
      this.props.async.setActionConfirmationProgress(true);
      WebApi.projects.put
        .closeProject(this.props.toConfirm.id)
        .then(response => {
          this.props.async.setActionConfirmationResult(response);
          this.pageChange(this.state.currentPage);
        })
        .catch(error => {
          this.props.async.setActionConfirmationResult(error);
        });
    }
    if (this.validatePropsForAction(nextProps, "reactivateProject")) {
      this.props.async.setActionConfirmationProgress(true);
      WebApi.projects.put
        .reactivateProject(this.props.toConfirm.id)
        .then(response => {
          this.props.async.setActionConfirmationResult(response);
          this.pageChange(this.state.currentPage);
        })
        .catch(error => {
          this.props.async.setActionConfirmationResult(error);
        });
    }
    if (this.validatePropsForAction(nextProps, "deleteProjectOwner")) {
      this.props.async.setActionConfirmationProgress(true);
      const { ownerId, projectId } = this.props.toConfirm;
      WebApi.projects.delete
        .owner(projectId, ownerId)
        .then(response => {
          this.props.async.setActionConfirmationResult(response);
          this.pageChange(this.state.currentPage);
        })
        .catch(error => {
          this.props.async.setActionConfirmationResult(error);
        });
    }
    if (this.validatePropsForAction(nextProps, "putProjectSkills")) {
      this.props.async.setActionConfirmationProgress(true);
      const { projectId, skillsArray } = this.props.toConfirm;
      WebApi.projects.put
        .skills(projectId, skillsArray)
        .then(response => {
          this.props.async.setActionConfirmationResult(response);
          this.pageChange(this.state.currentPage);
        })
        .catch(error => {
          this.props.async.setActionConfirmationResult(error);
        });
    }
  }

  validatePropsForAction(nextProps, action) {
    return (
      nextProps.confirmed &&
      !nextProps.isWorking &&
      nextProps.type === ACTION_CONFIRMED &&
      nextProps.toConfirm.key === action
    );
  }

  pageChange(page = this.state.currentPage, other = {}) {
    this.setState(
      {
        currentPage: page
      },
      () =>
        this.props.projectActions.loadProjects(
          this.state.currentPage,
          this.state.limit,
          other
        )
    );
  }

  pullDOM = () => {
    const { currentPage, limit, init } = this.state;
    const { t, projects, totalPageCount, loading, projectActions } = this.props;
    if (!init) {
      this.setState(
        {
          init: true
        },
        this.pageChange(currentPage)
      );
    }
    return (
      <div>
        <ProjectsList
          projects={projects}
          currentPage={currentPage}
          totalPageCount={totalPageCount}
          pageChange={this.pageChange}
          loading={loading}
          projectActions={projectActions}
          limit={limit}
        />
      </div>
    );
  };

  render() {
    const { match } = this.props;
    return (
      <Switch>
        <Route exact path={match.url + ""} component={this.pullDOM} />
        <Route path={match.url + "/:id"} component={ProjectDetails} />
      </Switch>
    );
  }
}

function mapStateToProps(state) {
  return {
    projects: state.projectsReducer.projects,
    totalPageCount: state.projectsReducer.totalPageCount,
    loading: state.asyncReducer.loading,
    confirmed: state.asyncReducer.confirmed,
    toConfirm: state.asyncReducer.toConfirm,
    isWorking: state.asyncReducer.isWorking,
    type: state.asyncReducer.type,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    projectActions: bindActionCreators(projectsActions, dispatch),
    async: bindActionCreators(asyncActions, dispatch)
  };
}

ProjectsContainer.propTypes = {
  async: PropTypes.shape({
    setActionConfirmationResult: PropTypes.func,
    setActionConfirmationProgress: PropTypes.func
  }),
  toConfirm: PropTypes.object,
  projectActions: PropTypes.object,
  projects: PropTypes.arrayOf(PropTypes.object),
  totalPageCount: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(translate("AddProjectScreen")(ProjectsContainer));
