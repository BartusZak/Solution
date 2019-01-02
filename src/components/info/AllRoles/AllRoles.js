import React, { PureComponent } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as infoActions from "../../../actions/infoActions";
import ApiEndPoint from "./ApiEndPoint/ApiEndPoint";

import "./AllRoles.scss";
import { ACCOUNT, CAN_SEARCH_USER_ACCOUNT, CAN_EDIT_USERS_ROLES, CAN_SEARCH_AD, CAN_ADD_USER, CAN_REACTIVATE_USER, CAN_DELETE_USER, CAN_DELETE_USER_REQUEST, CAN_SEARCH_PROJECTS, CAN_ADD_PROJECT, CAN_EDIT_PROJECT, CAN_GET_LIST_OF_CLIENTS, CAN_ADD_CLIENT, CAN_DELETE_CLIENT, CAN_EDIT_CLIENT, CAN_REACTIVATE_CLIENT, CAN_GET_PROJECT, CAN_ADD_PROJECT_OWNERS, CAN_DELETE_PROJECT_OWNERS, CAN_CLOSE_PROJECT, CAN_REACTIVATE_PROJECT, CAN_SET_PROJECT_SKILLS, CAN_DELETE_PROJECT, CAN_GET_SUGGESTED_EMPLOYEES, CAN_GET_EMPLOYEE_ASSIGNMENTS, CAN_GET_PROJECT_ASSIGNMENTS, CAN_ADD_ASSIGNMENT, CAN_EDIT_ASSIGNMENT, CAN_DELETE_ASSIGNMENT, ASSIGNMENTS, CLIENT, PROJECTS, CERTIFICATES, CAN_GET_EMPLOYEE_CERTIFICATES, CAN_EDIT_CERTIFICATE, CAN_DELETE_CERTIFICATE, CAN_ADD_CERTIFICATE } from "../../../constants";

class AllRoles extends PureComponent {
  state = {};

  componentDidMount = () => {
    this.props.infoActions();
  };

  render() {
    const { account, projects, client,assignments, certificates, t } = this.props;
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
        text: t("SearchingAD"),
        values: account[CAN_SEARCH_AD]
      },
      {
        text: t("AddingUser"),
        values: account[CAN_ADD_USER]
      },
      {
        text: t("ReactivatingUser"),
        values: account[CAN_REACTIVATE_USER]
      },
      {
        text: t("DeletingUser"),
        values: account[CAN_DELETE_USER]
      },
      {
        text: t("DeletingUserRequest"),
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
        text: t("EditingProject"),
        values: projects[CAN_EDIT_PROJECT]
      },
      {
        text: t("ProjectDetails"),
        values: projects[CAN_GET_PROJECT]
      },
      {
        text: t("AddingProjectOwners"),
        values: projects[CAN_ADD_PROJECT_OWNERS]
      },
      {
        text: t("DeletingProjectOwners"),
        values: projects[CAN_DELETE_PROJECT_OWNERS]
      },
      {
        text: t("ClosingProject"),
        values: projects[CAN_CLOSE_PROJECT]
      },
      {
        text: t("ReactivatingProject"),
        values: projects[CAN_REACTIVATE_PROJECT]
      },
      {
        text: t("SettingProjectSkills"),
        values: projects[CAN_SET_PROJECT_SKILLS]
      },
      {
        text: t("DeletingProject"),
        values: projects[CAN_DELETE_PROJECT]
      },
      {
        text: t("GettingSuggestedEmployees"),
        values: projects[CAN_GET_SUGGESTED_EMPLOYEES]
      },
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

    const AssignmentsRequests = [
      {
        text: t("GettingEmployeeAssignments"),
        values: assignments[CAN_GET_EMPLOYEE_ASSIGNMENTS]
      },
      {
        text: t("GettingProjectAssignments"),
        values: assignments[CAN_GET_PROJECT_ASSIGNMENTS]
      },
      {
        text: t("AddingAssignment"),
        values: assignments[CAN_ADD_ASSIGNMENT]
      },
      {
        text: t("EditingAssignment"),
        values: assignments[CAN_EDIT_ASSIGNMENT]
      },
      {
        text: t("DeletingAssignment"),
        values: assignments[CAN_DELETE_ASSIGNMENT]
      }
    ];

    const CertificatesRequests = [
      {
        text: t('GettingEmployeeCertificates'),
        values: certificates[CAN_GET_EMPLOYEE_CERTIFICATES]
      },
      {
        text: t('EditingCertificate'),
        values: certificates[CAN_EDIT_CERTIFICATE]
      },
      {
        text: t('DeletingCertificate'),
        values: certificates[CAN_DELETE_CERTIFICATE]
      },
      {
        text: t('AddingCertificate'),
        values: certificates[CAN_ADD_CERTIFICATE]
      },
    ]

    
    const template = [
      {
        text: t(''),
        values: []
      },
    ]

    return (
      <div id="all-roles" className="content-container">
        <ApiEndPoint name="Account" endPoints={AccountRequests} />
        <ApiEndPoint name="Projects" endPoints={ProjectsRequests} />
        <ApiEndPoint name="Client" endPoints={ClientRequests} />
        <ApiEndPoint name="Assignments" endPoints={AssignmentsRequests} />
        <ApiEndPoint name="Certificates" endPoints={CertificatesRequests} />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    account: state.infoReducer[ACCOUNT],
    projects: state.infoReducer[PROJECTS],
    client: state.infoReducer[CLIENT],
    assignments: state.infoReducer[ASSIGNMENTS],
    certificates: state.infoReducer[CERTIFICATES]
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
