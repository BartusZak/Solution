import React from 'react';
import { withRouter } from 'react-router-dom';
import VerticalMenuElement from './VerticalMenuElement';
import Icon from '../../../components/common/Icon';
import PropTypes from 'prop-types';
import { putNotificationIconInSideBar } from '../../../actions/persistHelpActions';
import { translate } from 'react-translate';
import { connect } from 'react-redux';
import binaryPermissioner from './../../../api/binaryPermissioner';
class LeftMenu extends React.Component {
  constructor(props) {
    super(props);

    this.setMenuRef = this.setMenuRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (
      event.target.className
        .toString()
        .split(' ')
        .indexOf('menu-hide-exclusion') !== -1
    )
      return;
    if (this.menuRef && !this.menuRef.contains(event.target)) {
      this.props.close();
    }
  }

  setMenuRef(node) {
    this.menuRef = node;
  }

  render() {
    const {
      match,
      extended,
      t,
      isNotificationIconInSideBar,
      putNotificationIconInSideBar
    } = this.props;
    return (
      <ul
        ref={this.setMenuRef}
        onMouseEnter={this.handleExtend}
        onMouseLeave={this.handleExtend}
        className={'left-menu' + (extended ? ' extended' : '')}
      >
        {binaryPermissioner(false)(1)(1)(1)(1)(1)(1)(this.props.binPem) ? (
          <VerticalMenuElement
            match={match}
            extended={extended}
            path=""
            icon="chart-pie"
            iconType="fas"
            title={t('Stats')}
          />
        ) : null}
        {binaryPermissioner(false)(0)(1)(0)(0)(1)(1)(this.props.binPem) ? (
          <VerticalMenuElement
            match={match}
            extended={extended}
            path="/users"
            icon="user-circle"
            iconType="fas"
            title={t('Users')}
          />
        ) : null}
        {binaryPermissioner(false)(0)(0)(0)(1)(1)(1)(this.props.binPem) ? (
          <VerticalMenuElement
            match={match}
            extended={extended}
            path="/clients"
            icon="users"
            iconType="fas"
            title={t('Clients')}
          />
        ) : null}
        {binaryPermissioner(false)(0)(1)(1)(1)(1)(1)(this.props.binPem) ? (
          <VerticalMenuElement
            match={match}
            extended={extended}
            path="/employees"
            icon="address-card"
            iconType="fas"
            title={t('Employees')}
          />
        ) : null}
        {binaryPermissioner(false)(1)(0)(1)(1)(1)(1)(this.props.binPem) ? (
          <VerticalMenuElement
            match={match}
            extended={extended}
            path="/projects"
            icon="briefcase"
            iconType="fas"
            title={t('Projects')}
          />
        ) : null}

        {this.props.pem.hasAdministrativeAccess ? (
          <VerticalMenuElement
            match={match}
            extended={extended}
            path="/skills"
            icon="crosshairs"
            iconType="fas"
            title={t('Skills')}
          />
        ) : null}
        {binaryPermissioner(false)(0)(0)(0)(1)(1)(1)(this.props.binPem) ? (
          <VerticalMenuElement
            match={match}
            extended={extended}
            path="/reports"
            icon="file-alt"
            iconType="fas"
            title={t('Reports')}
            disabled
          />
        ) : null}
        {binaryPermissioner(false)(0)(0)(0)(1)(1)(1)(this.props.binPem) ? (
          <VerticalMenuElement
            match={match}
            extended={extended}
            path="/import-cv"
            icon="archive"
            iconType="fas"
            title={t('ImportCV')}
            disabled
          />
        ) : null}
        <VerticalMenuElement
          match={match}
          extended={extended}
          path="/info"
          icon="info-circle"
          iconType="fas"
          title={t('Info')}
          disabled
        />
        {isNotificationIconInSideBar && (
          <li onClick={() => putNotificationIconInSideBar(false)}>
            <Icon icon="bell" iconType="fa" iconSize="lg" />
            <span>Powiadomienia</span>
          </li>
        )}
      </ul>
    );
  }
}

function mapStateToProps(state) {
  return {
    pem: state.authReducer.pem,
    binPem: state.authReducer.binPem,
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

LeftMenu.propTypes = {
  match: PropTypes.object,
  extended: PropTypes.bool,
  close: PropTypes.func.isRequired
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(translate('LeftMenu')(LeftMenu))
);

/*
    {binaryPermissioner(false)(0)(1)(0)(1)(1)(1)(this.props.binPem) ? (
          <VerticalMenuElement
            match={match}
            extended={extended}
            path="/assigns"
            icon="pencil-alt"
            iconType="fas"
            title={t("Assign")}
          />
        ) : null}*/
