import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Logo from "../../../components/common/Logo";
import TopBar from "./TopBar";
import Icon from "../../../components/common/Icon";
import LeftMenu from "../menu/LeftMenu";
import { putNotificationIconInSideBar } from "../../../actions/persistHelpActions";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { extended: false, blocked: false };

    this.handleExtend = this.handleExtend.bind(this);
    this.handleBlockedClick = this.handleBlockedClick.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  componentDidMount() {
    this.props.history.listen(location => {
      this.closeMenu();
    });
  }

  closeMenu() {
    this.setState({
      extended: false
    });
  }

  handleExtend() {
    if (this.state.blocked) return;
    this.setState(prevState => ({
      extended: !prevState.extended
    }));
  }

  handleBlockedClick() {
    this.setState(prevState => ({
      blocked: !prevState.blocked,
      extended: !prevState.extended
    }));
  }

  render() {
    const {
      isNotificationIconInSideBar,
    } = this.props;

    return (
      <div className="header">
        <div className="first-bar" />
        <div className="second-bar" />
        <div
          onClick={this.handleBlockedClick}
          className="extender menu-hide-exclusion"
        >
          <Icon
            additionalClass="menu-hide-exclusion"
            icon="bars"
            iconSize="lg"
          />
          {isNotificationIconInSideBar && (
            <div>
              <i className="fa fa-bell notification-in-sidebar-icon" />
            </div>
          )}
        </div>
        <LeftMenu
          className="left-menu"
          close={this.closeMenu}
          extended={this.state.extended}
        />
        <Link to="/main">
          <Logo size="vector_cut_header" />
        </Link>
        <TopBar />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isNotificationIconInSideBar:
      state.persistHelpReducer.isNotificationIconInSideBar
  };
}
const mapDispatchToProps = dispatch => {
  return {
    putNotificationIconInSideBar: isNotificationIconInSideBar =>
      dispatch(putNotificationIconInSideBar(isNotificationIconInSideBar))
  };
};

Header.propTypes = {
  history: PropTypes.object.isRequired
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);
