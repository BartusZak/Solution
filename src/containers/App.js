import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as languageActions from '../actions/languageActions';

import { Route, Switch } from 'react-router';
import { PrivateRoute, Home } from '../creators';
import { TranslatorProvider } from 'react-translate';

import '../scss/App.scss';

import en from '../translations/en';
import pl from '../translations/pl';

import LoginScreen from './login/LoginScreen';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import NotFound404 from '../components/notFound404/NotFound404';
import AzureADAuthentication from './AzureADAuthentication';
import Alerts from '../components/common/alerts/alerts';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  changeLanguage = language => {
    switch (language) {
      case 'pl':
        return pl;
      case 'en':
        return en;
      default:
        return pl;
    }
  };

  render() {
    const { language } = this.props;
    return (
      <TranslatorProvider translations={this.changeLanguage(language)}>
        <React.Fragment>
          <Alerts />
          <Switch>
            <Route exact path="/" component={LoginScreen} />
            <Route
              exact
              path="/signin-oidc"
              component={AzureADAuthentication}
            />
            <PrivateRoute
              path="/main"
              component={Home}
              history={this.props.history}
            />
            <Route component={NotFound404} />
          </Switch>
        </React.Fragment>
      </TranslatorProvider>
    );
  }
}

function mapStateToProps(state) {
  return {
    language: state.languageReducer.language,
    type: state.languageReducer.type
  };
}

function mapDispatchToProps(dispatch) {
  return {
    lang: bindActionCreators(languageActions, dispatch)
  };
}

App.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
