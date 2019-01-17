import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { Redirect } from 'react-router-dom';

import {
  succOperationsWhiteObject,
  warnOperationsWhiteObject
} from '../api/request-settings';
import storeCreator from './../store';
import { addAlert } from '../actions/alertsActions';
import {
  authSuccess,
  authAccountRequest,
  authAccountAlreadyRequested,
  authStart,
  authStop
} from '../actions/authActions';
import { useRequest } from '../api/index';

const { store } = storeCreator;

class AzureADAuthentication extends PureComponent {
  state = {
    lang: store.getState().languageReducer.language
  };

  render() {
    const { lang } = this.state;
    const {
      location,
      history,
      authSuccess,
      authAccountRequest,
      authAccountAlreadyRequested,
      authStart
    } = this.props;

    authStart();

    let queryStringValues = queryString.parse(location.search);

    useRequest('loginAzureAD', queryStringValues.code)
      .then(response => {
        const data = response.extractData();
        debugger;
        if (data.roles.count === 0) {
          const warnMessage = warnOperationsWhiteObject['choosePreferedRoles'];
          store.dispatch(
            addAlert({
              id: 'loginAzureAD',
              content: warnMessage[lang],
              type: 'warn',
              time: 5000
            })
          );
          authAccountRequest(data.login);
        } else {
          const succMessage = succOperationsWhiteObject['loggedIn'];
          store.dispatch(
            addAlert({
              id: 'loginAzureAD',
              content: succMessage[lang],
              type: 'ok',
              time: 5000
            })
          );
          authSuccess(data);
          history.push('/main');
        }
      })
      .catch(error => {
        if (!error.status) {
          const failMessage =
            succOperationsWhiteObject['azureADAuthentication'];
          store.dispatch(
            addAlert({
              id: 'loginAzureAD',
              content: failMessage[lang],
              type: 'err',
              time: 5000
            })
          );
          authStop();
        } else {
          const data = error.extractData();
          console.log(data);
          authAccountAlreadyRequested();
        }
      });

    return <Redirect to="/" />;
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    authStart: bindActionCreators(authStart, dispatch),
    authSuccess: bindActionCreators(authSuccess, dispatch),
    authAccountRequest: bindActionCreators(authAccountRequest, dispatch),
    authAccountAlreadyRequested: bindActionCreators(
      authAccountAlreadyRequested,
      dispatch
    )
  };
}

AzureADAuthentication.propTypes = {
  location: PropTypes.any.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AzureADAuthentication);
