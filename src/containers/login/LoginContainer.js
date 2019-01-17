import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { translate } from 'react-translate';

import Button from '../../components/common/button/button';
import { authStart, authStop } from '../../actions/authActions';
import { useRequest } from '../../api/index';
// import FancyModal from '../../components/common/fancy-modal';
import FancyModal from '../../components/common/fancy-modal/fancy-modal';
import AddPreferedRolesModal from './AddPreferedRolesModal';

class LoginContainer extends Component {
  state = { loadingModal: true, showFancyModal: false };

  componentDidMount = () => {
    const { accountRequest } = this.props;
    this.setState({ showFancyModal: accountRequest });
  };

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
    const { t, loading, loadingModal, showModal } = this.props;

    return (
      <React.Fragment>
        {showModal ? (
          <FancyModal
            isLoading={loadingModal}
            close={false}
            renderHeader={() => (
              <h3 className="fancy-modal-title title-padding">
                {t('ChooseRoles')}
              </h3>
            )}
          >
            <AddPreferedRolesModal />
          </FancyModal>
        ) : null}

        <div className="login-container">
          {loading ? <p>Loading...</p> : null}
          <Button
            title={t('Login')}
            type="submit"
            onClick={() => this.handleLogin()}
          />
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
    authStop: bindActionCreators(authStop, dispatch)
  };
};

LoginContainer.propTypes = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(translate('LoginContainer')(LoginContainer));
