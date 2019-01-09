import React from 'react';
import { connect } from "react-redux";
import { translate } from 'react-translate';
import { removeAlert } from '../../../actions/alertsActions';
import './alerts.scss';

import Alert from './alert';

class Alerts extends React.PureComponent {

  render() {
    const { alerts, removeAlert } = this.props;
    return (
      <div className="alerts">
        {alerts.map(alert => <Alert alert={alert} key={alert.id} removeAlert={removeAlert} /> )}
      </div>

    );
  }
}


const mapStateToProps = state => {
  return {
    alerts: state.alertsReducer.alerts,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    removeAlert: id => dispatch(removeAlert(id))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(translate("Alerts")(Alerts));

