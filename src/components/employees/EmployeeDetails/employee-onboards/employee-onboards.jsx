import React from 'react';
import { translate } from 'react-translate';

import './employee-onboards.scss';
class EmployeeOnboards extends React.Component {
  state = {
    isLoadingOnboards: this.props.onboardsCache[this.props.employeeId] ? false : true
  };

  componentDidMount = () => {
    this.handleLoadOnboards();
  }

  componentDidUpdate = prevProps => {
    if (prevProps.onboardsCache !== this.props.onboardsCache) {
      this.setState({isLoadingOnboards: false});
    }
  }

  handleLoadOnboards = () => {
    this.setState({isLoadingOnboards: true});
    this.props.loadOnboards(this.props.employeeId);
  }

  render() {
    const { isLoadingOnboards } = this.state;
    const { t, onboardsCache, employeeId} = this.props;

    if (isLoadingOnboards) return <div className="spinner-new spinner-new-big spinner-new-center" />;

    const onboards = onboardsCache[employeeId];

    if (onboards === null) {
      return (
        <div className="empty-list-comunicate">
          <p>{t("OnboardsProblem")}</p>
          <i onClick={this.handleLoadOnboards} className="fas fa-sync-alt fa-lg clickable"></i>
        </div>
      );
    }

    const onboardsCount = onboards.length;

    return (
      <React.Fragment>
        <p className="important-par">{t("Onboards")} ({onboardsCount})</p>

      </React.Fragment>
    );
  }
}

export default translate('EmployeeOnboards')(EmployeeOnboards);
