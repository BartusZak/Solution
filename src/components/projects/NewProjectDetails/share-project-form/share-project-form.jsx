import React from 'react';
import { shareProject, getDestinationManagers, getAlreadySharedManagers, changeManagersLists } from '../../../../actions/projectsActions';
import { translate } from 'react-translate';
import { connect } from 'react-redux';
import Button from '../../../common/button/button';
import Managers from './managers';

import './share-project-form.scss';
class ShareProjectForm extends React.Component {
  state = {
    isLoadingDestinationManagers: true, isLoadingAlreadySharedManagers: true
  };

  componentDidMount = () => {
    this.handleGetDestinationManagers();
    this.handleGetAlreadySharedManagers();
  }

  componentDidUpdate = prevProps => {
    if (prevProps.dManagersResult !== this.props.dManagersResult) {
      this.setState({isLoadingDestinationManagers: false});
    }
    if (prevProps.sManagersResult !== this.props.sManagersResult)
      this.setState({isLoadingAlreadySharedManagers: false});
  }

  handleGetAlreadySharedManagers = () => {
    this.setState({isLoadingAlreadySharedManagers: true});
    this.props.getAlreadySharedManagers(this.props.projectId,
      () => this.setState({isLoadingAlreadySharedManagers: false}),
      () => this.setState({isLoadingAlreadySharedManagers: false}));
  }

  handleGetDestinationManagers = () => {
    this.setState({isLoadingDestinationManagers: true});
    this.props.getDestinationManagers(this.props.projectId,
      () => this.setState({isLoadingDestinationManagers: false}),
      () => this.setState({isLoadingDestinationManagers: false}));
  }

  handleAddingAleadySharedManager = manager => {
    const { destinationManagers, alreadySharedManagers, changeManagersLists } = this.props;
    const newDManagers = destinationManagers.filter(m => m.id !== manager.id);
    const newASharedManagers = [manager, ...alreadySharedManagers];
    changeManagersLists(newDManagers, newASharedManagers);
  }

  handleRemovingAlreadySharedManager = manager => {
    const { destinationManagers, alreadySharedManagers, changeManagersLists } = this.props;
    const newDManagers = [manager, ...destinationManagers];
    const newASharedManagers = alreadySharedManagers.filter(m => m.id !== manager.id);
    changeManagersLists(newDManagers, newASharedManagers);
  }

  render() {
    const { close, t, destinationManagers, dManagersResult, alreadySharedManagers, sManagersResult, } = this.props;
    const { isLoadingDestinationManagers, isLoadingAlreadySharedManagers } = this.state;
    return (
      <div className="share-project-form">
        <div className="managers-to-select box-circle">
          <Managers
            rowOperation={this.handleAddingAleadySharedManager}
            useFilter
            title={t("ManagersToShareLabel")}
            isLoading={isLoadingDestinationManagers}
            managers={destinationManagers}
            status={dManagersResult.status} t={t}
            onErrorMessage={t("LoadDestinationManagersProblem")}
            refresh={this.handleGetDestinationManagers}
          />
        </div>
        <div className="selected-managers box-circle">
          <Managers
            rowIcon='times'
            rowOperation={this.handleRemovingAlreadySharedManager}
            title={t("ManagersProvidedLabel")}
            isLoading={isLoadingAlreadySharedManagers}
            managers={alreadySharedManagers}
            status={sManagersResult.status} t={t}
            onErrorMessage={t("LoadSharedManagersProblem")}
            refresh={this.handleGetAlreadySharedManagers}
          />
        </div>

        <div className="share-operations">
          <Button disable={isLoadingDestinationManagers} title={t("Share")} mainClass="dcmt-main-btn dcmt-light-btn animated-icon-btn">
            <i className="fa fa-check"></i>
          </Button>
          <Button onClick={close} title={t("Deny")} mainClass="dcmt-main-btn dcmt-grey-btn animated-icon-btn">
            <i className="fa fa-times"></i>
          </Button>
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    destinationManagers: state.projectsReducer.destinationManagers,
    dManagersResult: state.projectsReducer.dManagersResult,

    alreadySharedManagers: state.projectsReducer.alreadySharedManagers,
    sManagersResult: state.projectsReducer.sManagersResult
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getDestinationManagers: projectId => dispatch(getDestinationManagers(projectId)),
    getAlreadySharedManagers: projectId => dispatch(getAlreadySharedManagers(projectId)),
    changeManagersLists: (destinationManagers, alreadySharedManagers) => dispatch(changeManagersLists(destinationManagers, alreadySharedManagers))
  };
};

export default translate("ShareProjectForm")(connect(mapStateToProps, mapDispatchToProps)(ShareProjectForm));


