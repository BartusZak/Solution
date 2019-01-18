import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { translate } from 'react-translate';

import {
  authStart,
  authStop,
  clearAccountRequest
} from '../../actions/authActions';
import { languageChange } from '../../actions/languageActions';
import { useRequest } from '../../api/index';

import FancyModal from '../../components/common/fancy-modal/fancy-modal';
import Button from '../../components/common/button/button';
import AddPreferedRolesModal from './AddPreferedRolesModal';

import './LoginContainer.scss';
import LoaderHorizontal from '../../components/common/LoaderHorizontal';

class LoginContainer extends Component {
  state = {};

  handleLogin = () => {
    const { authStart, authStop } = this.props;
    authStart();

    useRequest('login')
      .then(response => {
        const data = response.extractData();
        window.open(data.link, '_self');
      })
      .catch(() => {
        authStop();
      });
  };

  render() {
    const { t, loading, accountRequest, languageChange } = this.props;
    return (
      <React.Fragment>
        {accountRequest ? (
          <FancyModal
            isLoading={false}
            close={() => clearAccountRequest()}
            renderHeader={() => (
              <h3 className="fancy-modal-title title-padding">
                {t('ChooseRoles')}
              </h3>
            )}
          >
            <AddPreferedRolesModal closeModal={clearAccountRequest()} />
          </FancyModal>
        ) : null}

        <div className="login-wrapper">
          <div className="container login-form">
            <div style={{ height: '7px' }}>
              {loading && <LoaderHorizontal />}
            </div>
            <div className="centric-container">
              <Button
                title={t('Login')}
                type="submit"
                onClick={() => this.handleLogin()}
              />
            </div>
            <div className="container">
              <span className="psw">
                {t('Forgot')}{' '}
                <a
                  target="_blank"
                  href="https://support.billennium.pl/Users/Account/RequestLostPassword"
                >
                  {t('Password')}?
                </a>
              </span>
              <span className="psr">
                <span
                  onClick={() => languageChange('pl')}
                  className="flag-pol"
                />
                <span
                  onClick={() => languageChange('en')}
                  className="flag-gbr"
                />
              </span>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.authReducer.loading,
    accountRequest: state.authReducer.accountRequest
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authStart: bindActionCreators(authStart, dispatch),
    authStop: bindActionCreators(authStop, dispatch),
    clearAccountRequest: bindActionCreators(clearAccountRequest, dispatch),
    languageChange: bindActionCreators(languageChange, dispatch)
  };
};

LoginContainer.propTypes = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(translate('LoginContainer')(LoginContainer));
