import React from "react";
import "./employeeOnBoards.scss";
import Icon from "../../../common/Icon";
import ConfirmModal from "../../../common/confimModal/confirmModal";
import { translate } from "react-translate";
import Modal from "react-responsive-modal";
import Form from '../../../form/form';
import { clearDataOfForm } from "../../../../services/methods";
import * as employeeActions from '../../../../actions/employeesActions';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as asyncActions from "../../../../actions/asyncActions";
import { ACTION_CONFIRMED } from "../../../../constants";

class EmployeeOnBoards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addingOnBoardModalOpen: false,
      certificateToEdit: null,
      certificateToDelete: null,
      deletingOnBoard: null,
      deletingOnBoardModalState: false,
      shouldChangeFormState: false,
      isLoading: false,
      editingOnBoard: null,
      activeAssignmentsCheckbox: false,
      addingOnBoardError: null,
      editingOnBoardError: null,
      formItems: [
        {
          title: this.props.t("Client"),
          type: "text",
          placeholder: this.props.t("ClientPlaceHolder"),
          mode: "drop-down-with-data",
          value: "",
          showCount: true,
          error: "",
          inputType: "client",
          minLength: 1,
          maxLength: 150,
          canBeNull: false,
          dataToMap: []
        },
        {
          title: this.props.t("Cloud"),
          type: "text",
          placeholder: this.props.t("CloudPlaceHolder"),
          mode: "drop-down-with-data",
          value: "",
          showCount: true,
          error: "",
          inputType: "cloud",
          minLength: 1,
          maxLength: 150,
          canBeNull: true,
          dataToMap: [],
          disable: true
        }
      ],

    };
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.clients !== this.props.clients) {
      const formItems = [...this.state.formItems];
      formItems[0].dataToMap = [...nextProps.clients];
      this.setState({ formItems: formItems });
    }

    if (this.validatePropsForAction(nextProps, "deleteOnBoard")) {
      this.props.async.setActionConfirmationProgress(true);
      this.props.employeeActions.deleteOnBoard(
      this.props.toConfirm.onBoard.id,
      ).then(response => this.props.employeeActions.loadEmployeeOnBoardsACreator(this.props.employee.id));
    }
  }

  validatePropsForAction(nextProps, action) {
    return (
      nextProps.confirmed &&
      !nextProps.isWorking &&
      nextProps.type === ACTION_CONFIRMED &&
      nextProps.toConfirm.key === action
    );
  }

  addOnBoardModal = () => {
    this.setState({
      certificateToEdit: null,
      addingOnBoardModalOpen: true,
    });
  };

  closeOnBoardModal = () => {
    const formItems = [...this.state.formItems];
    clearDataOfForm(formItems);
    formItems[1].disable = true;
    formItems[1].dataToMap = [];
    this.setState({
      addingOnBoardModalOpen: false,
      formItems: formItems
    });
  };

  deleteOnBoardModal = (deletingOnBoard) => {
    this.setState({
      deletingOnBoard: deletingOnBoard,
      deletingOnBoardModalState: !this.state.deletingOnBoardModalState
    })
  }

  deleteOnBoard = (onBoard, t) => {
    this.props.async.setActionConfirmation(true, {
      key: "deleteOnBoard",
      string: t("DeleteAgreed") + ` : ${onBoard.client.name}`,
      onBoard,
      successMessage: t("SuccesfullDelete")
    });
  };

  editOnBoard = onBoard => {
    const formItems = [...this.state.formItems];
    formItems[0].value = onBoard.client.name;
    formItems[1].value = onBoard.cloud ? onBoard.cloud.name : '';
    formItems[1].disable = false;

    this.setState({
      editingOnBoard: onBoard,
      addingOnBoardModalOpen: true,
      formItems: formItems
    });
  };

  handleSubmit = () => {
    this.setState({ isLoading: true });
    const formItems = [...this.state.formItems];

    const clientId = formItems[0].dataToMap.find(x => x.name === formItems[0].value).id;
    let cloudId = formItems[1].dataToMap.find(x => x.name === formItems[1].value);
    cloudId = cloudId ? cloudId.id : null;

    if(this.state.editingOnBoard) {
      this.updateOnBoard(clientId, cloudId, formItems, this.state.editingOnBoard.id)
    } else {
      this.addOnBoard(this.props.employee.id, clientId, cloudId, formItems)
    }
  };

  addOnBoard = (employeeId, clientId, cloudId, formItems) => {
    const { employeeActions } = this.props;

    const onBoardModel = {
      employeeId: employeeId,
      clientId: clientId,
      cloudId: cloudId
    }

    employeeActions.addEmployeeOnBoardACreator(
      onBoardModel
    )
    .then(response => {
      employeeActions.loadEmployeeOnBoardsACreator(this.props.employee.id);
      clearDataOfForm(formItems);
      formItems[1].disable = true;
      setTimeout(() => {
        this.setState({
          addingOnBoardModalOpen: false,
          formItems: formItems,
          editingOnBoard: null
        });
        employeeActions.addEmployeeOnBoard(null, []);
      }, 1500);
    }).catch(error => {
      this.setState({
        addingOnBoardError: error
      });
      clearDataOfForm(formItems);
      formItems[1].disable = true;
      setTimeout(() => {
        this.setState({
          addingOnBoardModalOpen: false,
          formItems: formItems,
          addingOnBoardError: null,
          editingOnBoard: null
        });
        employeeActions.addEmployeeOnBoard(null, []);
      }, 3000);
    });
  }

  updateOnBoard = (clientId, cloudId, formItems, onBoardId) => {
    const { employeeActions } = this.props;

    const onBoardModel = {
      clientId: clientId,
      cloudId: cloudId
    }

    employeeActions.updateEmployeeOnBoardACreator(
      onBoardModel, onBoardId
    )
    .then(response => {
      employeeActions.loadEmployeeOnBoardsACreator(this.props.employee.id);
      clearDataOfForm(formItems);
      formItems[1].disable = true;
      setTimeout(() => {
        this.setState({
          addingOnBoardModalOpen: false,
          formItems: formItems
        });
        employeeActions.updateEmployeeOnBoard(null, []);
      }, 1500);
    }).catch(error => {
      this.setState({
        editingOnBoardError: error
      });
      clearDataOfForm(formItems);
      formItems[1].disable = true;
      setTimeout(() => {
        this.setState({
          addingOnBoardModalOpen: false,
          formItems: formItems,
          editingOnBoardError: null
        });
        employeeActions.updateEmployeeOnBoard(null, []);
      }, 3000);
    });
  }

  checkBoxCheck = () => {
    this.setState({
      activeAssignmentsCheckbox: !this.state.activeAssignmentsCheckbox
    })
  }

  render() {
    const { employee, t, isYou, binPem, onBoards } = this.props;

    return (
      <div className="emp-table onBoard">
        <div className='title-bar'>
          <h2 className='title'>
            {t("Title")}
            {(isYou || binPem > 1) && (
              <span>
                <i onClick={this.addOnBoardModal} title={"OnBoard"} className="fa fa-plus" />
              </span>
            )}
          </h2>

          {onBoards && onBoards.length > 0 &&
            <div className='checkbox' onClick={() => this.checkBoxCheck()}>
              {this.state.activeAssignmentsCheckbox ? t("ShowAll") : t("ShowActive")}
            </div>
          }

        </div>


        <table>
          <thead>
            <tr>
              <th>{t("Client")}</th>
              <th>{t("Cloud")}</th>
              <th>{t("StartDate")}</th>
              <th>{t("EndDate")}</th>
              {(isYou || binPem > 1) && (
                <th>{t("Options")}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {onBoards && onBoards.map(onBoard => {
              return (
                <React.Fragment key={onBoard.id}>
                  {this.state.activeAssignmentsCheckbox ? (onBoard.isDeleted === false &&
                  <tr>
                    <td>{onBoard.client.name}</td>
                    <td>{onBoard.cloud ? onBoard.cloud.name : "-"}</td>
                    <td>{onBoard.startDate.slice(0, 10)}</td>
                    <td>{onBoard.endDate ? onBoard.endDate.slice(0, 10) : "-"}</td>
                    {(isYou || binPem > 1) && (
                    <td className="options">
                      <div
                        onClick={() => this.editOnBoard(onBoard)}
                        title={t("Edit")}
                        className="option"
                      >
                        <Icon icon="pen-square" />
                      </div>
                      <div
                        onClick={() =>
                          this.deleteOnBoard(
                            onBoard, t
                          )
                        }
                        title={t("Delete")}
                        className="option"
                      >
                        <Icon icon="minus-square" />
                      </div>
                    </td>)}
                  </tr>) :
                  <tr>
                    <td>{onBoard.client.name}</td>
                    <td>{onBoard.cloud ? onBoard.cloud.name : "-"}</td>
                    <td>{onBoard.startDate.slice(0, 10)}</td>
                    <td>{onBoard.endDate ? onBoard.endDate.slice(0, 10) : "-"}</td>
                    {(isYou || binPem > 1) && (
                    <td className="options">
                      <div
                        onClick={() => this.editOnBoard(onBoard)}
                        title={t("Edit")}
                        className="option"
                      >
                        <Icon icon="pen-square" />
                      </div>
                      <div
                        onClick={() =>
                          this.deleteOnBoard(
                            onBoard, t
                          )
                        }
                        title={t("Delete")}
                        className="option"
                      >
                        <Icon icon="minus-square" />
                      </div>
                    </td>)}
                  </tr>
                  }
                </React.Fragment>
              );
            })}
          </tbody>
        </table>

        <Modal
          key={1}
          open={this.state.addingOnBoardModalOpen}
          classNames={{ modal: "Modal Modal-add-owner" }}
          contentLabel="Add certificates modal"
          onClose={this.closeOnBoardModal}
        >
          <header>
            <h3>{this.state.editingOnBoard ? t("EditingTitle") : t("AddingTitle")}</h3>
          </header>
          {this.state.addingOnBoardError !== null || this.state.editingOnBoardError != null ? (
            <div className='error-container'>
              {this.state.addingOnBoardError !== null ? t("AddingError") + ' : ' : t("UpdatingError") + ' : '}
              <div className='error'>
                {this.state.addingOnBoardError !== null ? this.state.addingOnBoardError : this.state.editingOnBoardError}
              </div>
            </div>
          ) : (
            <Form
              btnTitle={this.state.editingOnBoard ? t("Update") : t("Add")}
              shouldSubmit={true}
              isLoading={this.state.formItems[0].dataToMap.length === 0}
              onSubmit={this.handleSubmit}
              formItems={this.state.formItems}
              cloudIdInForm={1}
              shouldChangeFormState={this.state.shouldChangeFormState}
              newFormItems={this.state.formItems}
              onBlur={this.goForClient}
            />
          )}
        </Modal>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    confirmed: state.asyncReducer.confirmed,
    toConfirm: state.asyncReducer.toConfirm,
    isWorking: state.asyncReducer.isWorking,
    type: state.asyncReducer.type,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    employeeActions: bindActionCreators(employeeActions, dispatch),
    async: bindActionCreators(asyncActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(translate("EmployeeOnBoards")(withRouter(EmployeeOnBoards)));

