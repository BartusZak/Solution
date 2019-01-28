import React, { Component } from "react";
import Modal from "react-responsive-modal";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as asyncActions from "./../../../actions/asyncActions";
import LoaderHorizontal from "./../LoaderHorizontal";
import ResultBlock from "../ResultBlock";
import {
  SET_ACTION_CONFIRMATION_RESULT,
  SET_ACTION_CONFIRMATION,
  SET_ACTION_CONFIRMATION_RESULT_WITHOUT_ENDING
} from "../../../constants";
import PropTypes from "prop-types";
import { translate } from "react-translate";
import FancyModal from "./../fancy-modal/fancy-modal";
import Button from './../button/button';

class Confirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toConfirm: {},
      invalidated: false,
      resultBlock: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    /* eslint-disable react/no-direct-mutation-state */
    if (nextProps.type === SET_ACTION_CONFIRMATION_RESULT) {
      this.state.resultBlock = nextProps.resultBlock;
      this.hide();
    }

    if (nextProps.type === SET_ACTION_CONFIRMATION_RESULT_WITHOUT_ENDING) {
      this.state.resultBlock = nextProps.resultBlock;
      this.hide();
    }

    if (nextProps.type === SET_ACTION_CONFIRMATION && !this.props.shown) {
      this.state.resultBlock = {};
      this.state.toConfirm = {};
    }
    if (nextProps.type === SET_ACTION_CONFIRMATION && nextProps.shown) {
      this.state.toConfirm = nextProps.toConfirm;
    }
    /* eslint-enable */
  }

  invalidate = () => {
    if (this.props.isWorking) return;
    this.props.async.setActionConfirmation(false);
  };

  confirm = () => {
    this.props.async.actionConfirmed(this.props.toConfirm);
  };

  hide = () => {
    setTimeout(() => {
      this.invalidate();
    }, 500);
  };

  isCompleted = () => {
    return (
      this.state.resultBlock && this.state.resultBlock.original !== undefined
    );
  };

  render() {
    const { t } = this.props;
    return (
      <div className="confirmation">
        {this.props.shown && (
          <FancyModal close={this.invalidate} isLoading={this.props.isWorking}>
            {!this.isCompleted() && (
              <div className="result-modal-container">
                <div className="confirmation-header">
                  {t("YouAreAboutTo")} {this.state.toConfirm.string}
                </div>
                <div className="confirmation-result">
                  {t("ActionRollbackWarning")}
                </div>
                <Button onClick={this.confirm} mainClass={"label-btn accept-button"}>{t("Accept")}</Button>
                <Button onClick={this.invalidate} mainClass={"label-btn"}>{t("Deny")}</Button>
              </div>
            )}
          </FancyModal>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    shown: state.asyncReducer.confirmationInProgress,
    toConfirm: state.asyncReducer.toConfirm,
    isWorking: state.asyncReducer.isWorking,
    type: state.asyncReducer.type,
    resultBlock: state.asyncReducer.resultBlock
  };
}

function mapDispatchToProps(dispatch) {
  return {
    async: bindActionCreators(asyncActions, dispatch)
  };
}

Confirmation.propTypes = {
  type: PropTypes.string,
  resultBlock: PropTypes.object,
  shown: PropTypes.bool,
  toConfirm: PropTypes.object,
  isWorking: PropTypes.bool,
  async: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(translate("Confirmation")(Confirmation));
