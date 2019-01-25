import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import Icon from '../../../components/common/Icon';
import PropTypes from 'prop-types';

import './VerticalMenuElement.scss';

class VerticalMenuElement extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      iconType,
      icon,
      title,
      path,
      match,
      extended,
      disabled
    } = this.props;
    return (
      <NavLink
        exact
        to={disabled ? '#' : match.url + path}
        onClick={disabled ? e => e.preventDefault() : null}
        className={disabled ? `disabled-link` : null}
        activeClassName="active"
      >
        <li>
          <Icon icon={icon} iconType={iconType} iconSize="lg" />
          <span>{title}</span>
        </li>
      </NavLink>
    );
  }
}

VerticalMenuElement.propTypes = {
  iconType: PropTypes.string,
  iconSize: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string,
  path: PropTypes.string,
  match: PropTypes.object,
  extended: PropTypes.bool
};

export default withRouter(VerticalMenuElement);
