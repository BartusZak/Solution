import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import colors from '../../scss/ColorSchema.scss';
import Logo from 'components/common/Logo';
import LoginContainer from './LoginContainer';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    document.body.style.backgroundColor = colors.mainColor;
  }
  componentWillUnmount() {
    document.body.style.backgroundColor = colors.contentBackground;
  }

  render() {
    return (
      <div className="login-screen">
        <Logo size="vector_cut" container />
        <LoginContainer />
      </div>
    );
  }
}

export default connect()(withRouter(LoginScreen));
