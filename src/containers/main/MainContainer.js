import React from "react";
import Header from "./header/Header";
import Content from "./Content";
import "../../scss/containers/MainContainer.scss";
import PropTypes from "prop-types";

import "react-responsive-modal/lib/react-responsive-modal.css";

class MainContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { match } = this.props;
    return (
      <div>
        <div className="wrapper">
          <Header history={this.props.history} />
          <Content match={match} />
        </div>
      </div>
    );
  }
}

MainContainer.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default MainContainer;
