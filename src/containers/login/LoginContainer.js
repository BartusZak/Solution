import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { translate } from 'react-translate';

import Button from '../../components/common/button/button';
import { authStart, authStop } from '../../actions/authActions';
import { useRequest } from '../../api/index';

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
    const { t, loading } = this.props;

    return (
      <div className="login-container">
        {loading ? <p>Loading...</p> : null}
        <Button
          title={t('Login')}
          type="submit"
          onClick={() => this.handleLogin()}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { loading: state.authReducer.loading };
};

const mapDispatchToProps = dispatch => {
  return {
    authStart: bindActionCreators(authStart, dispatch),
    authStop: bindActionCreators(authStop, dispatch)
  };
};

LoginContainer.propTypes = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(translate('LoginContainer')(LoginContainer));
