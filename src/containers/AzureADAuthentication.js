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
  authStart
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
        if (!data.roles) {
          const warnMessage = warnOperationsWhiteObject['choosePreferedRoles'];
          store.dispatch(
            addAlert({
              id: 'loginAzureAD',
              content: warnMessage[lang],
              type: 'warn',
              time: 5000
            })
          );
          authAccountRequest(data.azureData.user_id);
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
        const data =
          error.replyBlock.response.data.errorObjects[0].errors
            .accountRequestPendingError;
        authAccountAlreadyRequested();
        store.dispatch(
          addAlert({
            id: 'loginAzureAD',
            content: data,
            type: 'warn',
            time: 5000
          })
        );
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
