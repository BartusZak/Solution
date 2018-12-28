import React, { PureComponent } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as infoActions from "../../../actions/infoActions";
import ApiEndPoint from "./ApiEndPoint/ApiEndPoint";

import "./AllRoles.scss";
import { ACCOUNT, CAN_SEARCH_USER_ACCOUNT, CAN_EDIT_USERS_ROLES, CAN_SEARCH_AD, CAN_ADD_USER, CAN_REACTIVATE_USER, CAN_DELETE_USER, CAN_DELETE_USER_REQUEST, CAN_SEARCH_PROJECTS, CAN_ADD_PROJECT, CAN_EDIT_PROJECT, CAN_GET_LIST_OF_CLIENTS, CAN_ADD_CLIENT, CAN_DELETE_CLIENT, CAN_EDIT_CLIENT, CAN_REACTIVATE_CLIENT, CAN_GET_PROJECT } from "../../../constants";

class AllRoles extends PureComponent {
  state = {};

  componentDidMount = () => {
    this.props.infoActions();
  };

  render() {
    const { account, projects, client, t } = this.props;
    const AccountRequests = [
      {
        text: t("SearchingUsersAccounts"),
        values: account[CAN_SEARCH_USER_ACCOUNT]
      },
      {
        text: t("EditingUsersRoles"),
        values: account[CAN_EDIT_USERS_ROLES]        
      },
      {
        text: t("SearchAD"),
        values: account[CAN_SEARCH_AD]
      },
      {
        text: t("AddUser"),
        values: account[CAN_ADD_USER]
      },
      {
        text: t("ReactivateUser"),
        values: account[CAN_REACTIVATE_USER]
      },
      {
        text: t("DeleteUser"),
        values: account[CAN_DELETE_USER]
      },
      {
        text: t("DeleteUserRequest"),
        values: account[CAN_DELETE_USER_REQUEST]
      }
    ];
    const ProjectsRequests = [
      {
        text: t("SearchingProjects"),
        values: projects[CAN_SEARCH_PROJECTS]
      },
      {
        text: t("AddingProject"),
        values: projects[CAN_ADD_PROJECT]
      },
      {
        text: t("EditProject"),
        values: projects[CAN_EDIT_PROJECT]
      },
      {
        text: t("ProjectDetails"),
        values: projects[CAN_GET_PROJECT]
      }
    ];
    const ClientRequests = [
      {
        text: t("GettingListOfClients"),
        values: client[CAN_GET_LIST_OF_CLIENTS]
      },
      {
        text: t("AddingClient"),
        values: client[CAN_ADD_CLIENT]
      },
      {
        text: t("DeletingClient"),
        values: client[CAN_DELETE_CLIENT]
      },
      {
        text: t("EditingClient"),
        values: client[CAN_EDIT_CLIENT]
      },
      {
        text: t("ReactivatingClient"),
        values: client[CAN_REACTIVATE_CLIENT]
      }
    ];

    return (
      <div id="all-roles" className="content-container">
        <ApiEndPoint name="Account" endPoints={AccountRequests} />
        <ApiEndPoint name="Projects" endPoints={ProjectsRequests} />
        <ApiEndPoint name="Client" endPoints={ClientRequests} />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    account: state.infoReducer.account,
    projects: state.infoReducer.projects,
    client: state.infoReducer.client
  };
}
function mapDispatchToProps(dispatch) {
  return {
    infoActions: bindActionCreators(infoActions.infoActionCreator, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllRoles);
