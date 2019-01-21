import React, { PureComponent } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as infoActions from "../../../actions/infoActions";
import ApiEndPoint from "./ApiEndPoint/ApiEndPoint";

import "./AllRoles.scss";
import { ACCOUNT, CAN_SEARCH_USER_ACCOUNT, CAN_EDIT_USERS_ROLES, CAN_SEARCH_AD, CAN_ADD_USER, CAN_REACTIVATE_USER, CAN_DELETE_USER, CAN_DELETE_USER_REQUEST, CAN_SEARCH_PROJECTS, CAN_ADD_PROJECT, CAN_EDIT_PROJECT, CAN_GET_LIST_OF_CLIENTS, CAN_ADD_CLIENT, CAN_DELETE_CLIENT, CAN_EDIT_CLIENT, CAN_REACTIVATE_CLIENT, CAN_GET_PROJECT, CAN_ADD_PROJECT_OWNERS, CAN_DELETE_PROJECT_OWNERS, CAN_CLOSE_PROJECT, CAN_REACTIVATE_PROJECT, CAN_SET_PROJECT_SKILLS, CAN_DELETE_PROJECT, CAN_GET_SUGGESTED_EMPLOYEES, CAN_GET_EMPLOYEE_ASSIGNMENTS, CAN_GET_PROJECT_ASSIGNMENTS, CAN_ADD_ASSIGNMENT, CAN_EDIT_ASSIGNMENT, CAN_DELETE_ASSIGNMENT, ASSIGNMENTS, CLIENT, PROJECTS, CERTIFICATES, CAN_GET_EMPLOYEE_CERTIFICATES, CAN_EDIT_CERTIFICATE, CAN_DELETE_CERTIFICATE, CAN_ADD_CERTIFICATE, CAN_ADD_CLOUD, CAN_EDIT_CLOUD, CAN_REACTIVATE_CLOUD, CLOUDS, CAN_DELETE_CLOUD, CAN_IMPORT_CV, CV_IMPORT, CAN_ADD_EDUCATION, CAN_EDIT_EDUCATION, CAN_GET_EDUCATION, CAN_DELETE_EDUCATION, EDUCATION, EMPLOYEES, CAN_GET_EMPLOYEE, CAN_GET_EMPLOYEE_CAPACITY, CAN_GET_EMPLOYEE_CAPACITY_REFACTOR, CAN_GET_EMPLOYEES_AND_MANAGERS, CAN_GET_EMPLOYEE_ONBOARDS, CAN_GET_EMPLO_CONTACT, CAN_GET_EMPLO_SKILLS, CAN_SEARCH_EMPLOYEES, CAN_ADD_EMPLOYEE, CAN_ADD_EMPLOYEE_ONBOARD, CAN_DELETE_EMPLOYEE_ONBOARD, CAN_DELETE_EMPLOYEE, CAN_SET_EMPLOYEE_SKILLS, CAN_SET_EMPLOYEE_F_LANGUAGES, CAN_SET_EMPLOYEE_SKYPE, CAN_EDIT_EMPLOYEE_ONBOARD, CAN_REACTIVATE_EMPLOYEE, CAN_GET_FEEDBACKS_BY_EMPLOYEE_IN_PROJECT, CAN_ADD_FEEDBACK, CAN_DELETE_FEEDBACK, FEEDBACKS, CAN_GET_FEEDBACKS_BY_EMPLOYEE, GDRIVE, CAN_LOGIN_GDRIVE, CAN_GENERATE_SHARE_LINK_GDRIVE, CAN_GET_FOLDERS_GDRIVE, CAN_DELETE_FOLDER_GDRIVE, CAN_UPDATE_FOLDER_GDRIVE, CAN_CREATE_FOLDER_GDRIVE, CAN_UPLOAD_FILE_GDRIVE, CAN_DELETE_NOTIFICATIONS, CAN_GET_ALL_NOTIFICATIONS, CAN_MARK_AS_READ_NOTIFICATION, NOTIFICATIONS, ONEDRIVE, CAN_GET_REDIRECT_LINK_ONEDRIVE, CAN_SEND_QUERY_TO_AUTH_ONEDRIVE, CAN_REFRESH_TOKEN_ONEDRIVE, CAN_GENERATE_SHARE_LINK_ONEDRIVE, CAN_GET_FOLDERS_ONEDRIVE, CAN_CREATE_FOLDER_ONEDRIVE, CAN_DELETE_FOLDER_ONEDRIVE, CAN_UPDATE_FOLDER_ONEDRIVE, CAN_UPLOAD_FILE_ONEDRIVE, CAN_EDIT_QUARTER_TALK, CAN_GET_QUARTERS_FOR_EMPLOYEE, CAN_GET_RESERVED_DATES, CAN_ADD_QUARTER_TALK, CAN_PLAN_QUARTER_TALK, CAN_ADD_QUESTION, CAN_DELETE_QUESTION, CAN_REACTIVATE_QUARTER_TALK, CAN_DELETE_QUARTER_TALK, CAN_EDIT_QUESTIONS_IN_QUARTER_TALK, CAN_GENERATE_QUARTER_TALK_DOC, CAN_GET_QUARTER_TALK_RESERVED_DATES, QUARTERTALKS, CAN_GET_QUESTIONS,REPORTS,
  CAN_GENERATE_REPORT,
  CAN_GET_RECENT_AND_FAVORITES_REPORTS,
  CAN_UNFAVORITE_REPORT,
  CAN_GENERATE_CV_PDF,
  CAN_GENERATE_CV_WORD,
  CAN_GET_TEAMS,
  CAN_GET_FEEDBACK,
  CAN_GET_CV,
  CAN_GET_DEVELOPERS_EXCEL_REPORT,
  CAN_GET_ZIP_REPORT,
  RESPONSIBLE_PERSON,
  CAN_GET_RESPONSIBLE_PERSON_BY_CLIENTID,
  CAN_GET_RESPONSIBLEPERSON_BY_ID,
  CAN_EDIT_RESPONSIBLE_PERSON,
  CAN_ADD_RESPONSIBLE_PERSON,
  CAN_DELETE_RESPONSIBLE_PERSON,
  CAN_REACTIVATE_RESPONSIBLE_PERSON,
  SKILLS,
  CAN_GET_ALL_SKILLS,
  CAN_GET_SKILL_BY_ID,
  CAN_ADD_SKILL,
  CAN_DELETE_SKILL,
  CAN_EDIT_SKILL,
  CAN_GET_STATS,
  ROLES,
  CAN_GET_ALL_ROLES,
  CAN_ADD_ROLE,
  CAN_EDIT_ROLE,
  CAN_DELETE_ROLE,
  SHARE_PROJECTS,
  CAN_SHARE_PROJECT,
  CAN_GET_MANAGERS_SHARED_PROJECT,
  CAN_GET_ALREADY_SHARED_MANAGERS,
  CAN_CANCEL_SHARE_PROJECT,
  WORK_EXPERIENCE,
  CAN_ADD_WORK_EXPERIENCE,
  CAN_GET_WORK_EXPERIENCE,
  CAN_EDIT_WORK_EXPERIENCE,
  CAN_DELETE_WORK_EXPERIENCE,
  CAN_GET_WORK_EXPERIENCE_BY_EMPLOYEEID, 
  STATS} from "../../../constants";

class AllRoles extends PureComponent {
  state = {};

  componentDidMount = () => {
    this.props.infoActions();
  };

  render() {
    const { account, projects, client,assignments, certificates, clouds, cvImport, education, employees, feedbacks, gdrive, notifications, oneDrive, quarterTalks, reports, responsiblePerson, skills, stats, roles, shareProjects, workExperience, t } = this.props;
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

    const CloudsRequests = [
      {
        text: t('AddingCloud'),
        values: clouds[CAN_ADD_CLOUD]
      },
      {
        text: t('EditingCloud'),
        values: clouds[CAN_EDIT_CLOUD]
      },
      {
        text: t('DeletingCloud'),
        values: clouds[CAN_DELETE_CLOUD]
      },
      {
        text: t('ReactivatingCloud'),
        values: clouds[CAN_REACTIVATE_CLOUD]
      },
    ]

    const CVImportRequests = [
      {
        text: t('ImportingCV'),
        values: cvImport[CAN_IMPORT_CV]
      },
    ]

    const EmployeesRequests = [
      {
        text: t('GettingEmployee'),
        values: employees[CAN_GET_EMPLOYEE]
      },
      {
        text: t('GettingEmployeeCapacity'),
        values: employees[CAN_GET_EMPLOYEE_CAPACITY]
      },
      {
        text: t('GettingEmployeesAndManagers'),
        values: employees[CAN_GET_EMPLOYEES_AND_MANAGERS]
      },
      {
        text: t('GettingEmployeeOnboards'),
        values: employees[CAN_GET_EMPLOYEE_ONBOARDS]
      },
      {
        text: t('GettingEmploContact'),
        values: employees[CAN_GET_EMPLO_CONTACT]
      },
      {
        text: t('GettingEmploSkills'),
        values: employees[CAN_GET_EMPLO_SKILLS]
      },
      {
        text: t('SearchingEmployees'),
        values: employees[CAN_SEARCH_EMPLOYEES]
      },
      {
        text: t('AddingEmployees'),
        values: employees[CAN_ADD_EMPLOYEE]
      },
      {
        text: t('AddingEmployeeOnboard'),
        values: employees[CAN_ADD_EMPLOYEE_ONBOARD]
      },
      {
        text: t('DeletingEmployeeOnboard'),
        values: employees[CAN_DELETE_EMPLOYEE_ONBOARD]
      },
      {
        text: t('DeletingEmployee'),
        values: employees[CAN_DELETE_EMPLOYEE]
      },
      {
        text: t('SettingEmployeeSkills'),
        values: employees[CAN_SET_EMPLOYEE_SKILLS]
      },
      {
        text: t('SettingEmployeeFLanguages'),
        values: employees[CAN_SET_EMPLOYEE_F_LANGUAGES]
      },
      {
        text: t('SettingEmployeeSkype'),
        values: employees[CAN_SET_EMPLOYEE_SKYPE]
      },
      {
        text: t('EditingEmployeeOnboard'),
        values: employees[CAN_EDIT_EMPLOYEE_ONBOARD]
      },
      {
        text: t('ReactivatingEmployee'),
        values: employees[CAN_REACTIVATE_EMPLOYEE]
      },
    ]

    const FeedbacksRequests =[
      {
        text: t('GetFeedbackByEmployee'),
        values: feedbacks[CAN_GET_FEEDBACKS_BY_EMPLOYEE]
      },
      {
        text: t('GetFeedbackByEmployeeInProject'),
        values: feedbacks[CAN_GET_FEEDBACKS_BY_EMPLOYEE_IN_PROJECT]
      },
      {
        text: t('AddFeedback'),
        values: feedbacks[CAN_ADD_FEEDBACK]
      },
      {
        text: t('DeleteFeedback'),
        values: feedbacks[CAN_DELETE_FEEDBACK]
      },
    ]

    const GDriveRequests = [
      {
        text: t('LoginGDrive'),
        values: gdrive[CAN_LOGIN_GDRIVE]
      },
      {
        text: t('GenerateShareLinkGDrive'),
        values: gdrive[CAN_GENERATE_SHARE_LINK_GDRIVE]
      },
      {
        text: t('GetFoldersGDrive'),
        values: gdrive[CAN_GET_FOLDERS_GDRIVE]
      },
      {
        text: t('DeleteFolderGDrive'),
        values: gdrive[CAN_DELETE_FOLDER_GDRIVE]
      },
      {
        text: t('UpdateFolderGDrive'),
        values: gdrive[CAN_UPDATE_FOLDER_GDRIVE]
      },
      {
        text: t('CreateFolderGDrive'),
        values: gdrive[CAN_CREATE_FOLDER_GDRIVE]
      },
      {
        text: t('UploadFolderGDrive'),
        values: gdrive[CAN_UPLOAD_FILE_GDRIVE]
      },
    ]

    const NotificationsRequests = [
      {
        text: t('DeleteNotifications'),
        values: notifications[CAN_DELETE_NOTIFICATIONS]
      },
      {
        text: t('GetAllNotifications'),
        values: notifications[CAN_GET_ALL_NOTIFICATIONS]
      },
      {
        text: t('MarkAsReadNotification'),
        values: notifications[CAN_MARK_AS_READ_NOTIFICATION]
      },
    ]

    const OneDriveRequests = [
      {
        text: t('GetRedirectLinkOneDrive'),
        values: oneDrive[CAN_GET_REDIRECT_LINK_ONEDRIVE]
      },
      {
        text: t('SendQueryToAuthOneDrive'),
        values: oneDrive[CAN_SEND_QUERY_TO_AUTH_ONEDRIVE]
      },
      {
        text: t('RefreshTokenOneDrive'),
        values: oneDrive[CAN_REFRESH_TOKEN_ONEDRIVE]
      },
      {
        text: t('GenerateShareLinkOneDrive'),
        values: oneDrive[CAN_GENERATE_SHARE_LINK_ONEDRIVE]
      },
      {
        text: t('GetFoldersOneDrive'),
        values: oneDrive[CAN_GET_FOLDERS_ONEDRIVE]
      },
      {
        text: t('CreateFolderOneDrive'),
        values: oneDrive[CAN_CREATE_FOLDER_ONEDRIVE]
      },
      {
        text: t('DeleteFolderOneDrive'),
        values: oneDrive[CAN_DELETE_FOLDER_ONEDRIVE]
      },
      {
        text: t('UpdateFolderOneDrive'),
        values: oneDrive[CAN_UPDATE_FOLDER_ONEDRIVE]
      },
      {
        text: t('UploadFileOneDrive'),
        values: oneDrive[CAN_UPLOAD_FILE_ONEDRIVE]
      },
    ]

    const QuarterTalksRequests = [
      {
        text: t('EditQuarterTalk'),
        values: quarterTalks[CAN_EDIT_QUARTER_TALK]
      },
      {
        text: t('GetQuarterTalkForEmployee'),
        values: quarterTalks[CAN_GET_QUARTERS_FOR_EMPLOYEE]
      },
      {
        text: t('GetQuarterTalkReservedDates'),
        values: quarterTalks[CAN_GET_QUARTER_TALK_RESERVED_DATES]
      },
      {
        text: t('AddQuarterTalk'),
        values: quarterTalks[CAN_ADD_QUARTER_TALK]
      },
      {
        text: t('PlanQuarterTalk'),
        values: quarterTalks[CAN_PLAN_QUARTER_TALK]
      },
      {
        text: t('AddQuestion'),
        values: quarterTalks[CAN_ADD_QUESTION]
      },
      {
        text: t('DeleteQuestion'),
        values: quarterTalks[CAN_DELETE_QUESTION]
      },
      {
        text: t('ReactivateQuarterTalk'),
        values: quarterTalks[CAN_REACTIVATE_QUARTER_TALK]
      },
      {
        text: t('DeleteQuarterTalk'),
        values: quarterTalks[CAN_DELETE_QUARTER_TALK]
      },
      {
        text: t('GenerateQuarterTalkDoc'),
        values: quarterTalks[CAN_GENERATE_QUARTER_TALK_DOC]
      },
      {
        text: t('GetQuestions'),
        values: quarterTalks[CAN_GET_QUESTIONS]
      },
    ]

    const ReportsRequests = [
      {
        text: t('GenerateReport'),
        values: reports[CAN_GENERATE_REPORT]
      },
      {
        text: t('GenerateCv'),
        values: reports[CAN_GENERATE_CV_PDF]
      },
      {
        text: t('GenerateCvWord'),
        values: reports[CAN_GENERATE_CV_WORD]
      },
      {
        text: t('GetFeedback'),
        values: reports[CAN_GET_FEEDBACK]
      },
      {
        text: t('GetCv'),
        values: reports[CAN_GET_CV]
      },
      {
        text: t('GetTeams'),
        values: reports[CAN_GET_TEAMS]
      },
      {
        text: t('GetReportExcel'),
        values: reports[CAN_GET_DEVELOPERS_EXCEL_REPORT]
      },
      {
        text: t('GetReportZip'),
        values: reports[CAN_GET_ZIP_REPORT]
      },
      {
        text: t('GetRecentReports'),
        values: reports[CAN_GET_RECENT_AND_FAVORITES_REPORTS]
      },
      {
        text: t('UnfavoriteReport'),
        values: reports[CAN_UNFAVORITE_REPORT]
      }
    ]
    
    const ResponsiblePersonRequests = [
      {
        text: t('GetResponsiblePersonByClientId'),
        values: responsiblePerson[CAN_GET_RESPONSIBLE_PERSON_BY_CLIENTID]
      },
      {
        text: t('GetResponsiblePersonById'),
        values: responsiblePerson[CAN_GET_RESPONSIBLEPERSON_BY_ID]
      },
      {
        text: t('EditResponsiblePerson'),
        values: responsiblePerson[CAN_EDIT_RESPONSIBLE_PERSON]
      },
      {
        text: t('AddResponsiblePerson'),
        values: responsiblePerson[CAN_ADD_RESPONSIBLE_PERSON]
      },
      {
        text: t('DeleteResponsiblePerson'),
        values: responsiblePerson[CAN_DELETE_RESPONSIBLE_PERSON]
      },
      {
        text: t('ReactivateResponsiblePerson'),
        values: responsiblePerson[CAN_REACTIVATE_RESPONSIBLE_PERSON]
      }
    ]

    const SkillsRequests = [
      {
        text: t('GetAllSkills'),
        values: skills[CAN_GET_ALL_SKILLS]
      },
      {
        text: t('GetSkillById'),
        values: skills[CAN_GET_SKILL_BY_ID]
      },
      {
        text: t('AddSkill'),
        values: skills[CAN_ADD_SKILL]
      },
      {
        text: t('DeleteSkill'),
        values: skills[CAN_DELETE_SKILL]
      },
      {
        text: t('EditSkill'),
        values: skills[CAN_EDIT_SKILL]
      }
    ]

    const StatsRequests = [
      {
        text: t('GetStats'),
        values: stats[CAN_GET_STATS]
      },
    ]

    const RolesRequests = [
      {
        text: t('GetAllRoles'),
        values: roles[CAN_GET_ALL_ROLES]
      },
      {
        text: t('AddRole'),
        values: roles[CAN_ADD_ROLE]
      },
      {
        text: t('EditRole'),
        values: roles[CAN_EDIT_ROLE]
      },
      {
        text: t('DeleteRole'),
        values: roles[CAN_DELETE_ROLE]
      }
    ]

    const ShareProjectsRequests = [
      {
        text: t('ShareProject'),
        values: shareProjects[CAN_SHARE_PROJECT]
      },
      {
        text: t('GetManagersSharedProject'),
        values: shareProjects[CAN_GET_MANAGERS_SHARED_PROJECT]
      },
      {
        text: t('GetAlreadySharedManagers'),
        values: shareProjects[CAN_GET_ALREADY_SHARED_MANAGERS]
      }
    ]

    const WorkExperienceRequests = [
      {
        text: t('AddWorkExperience'),
        values: workExperience[CAN_ADD_WORK_EXPERIENCE]
      },
      {
        text: t('GetWorkExperience'),
        values: workExperience[CAN_GET_WORK_EXPERIENCE]
      },
      {
        text: t('EditWorkExperience'),
        values: workExperience[CAN_EDIT_WORK_EXPERIENCE]
      },
      {
        text: t('DeleteWorkExperience'),
        values: workExperience[CAN_DELETE_WORK_EXPERIENCE]
      },
      {
        text: t('GetWorkExperienceByEmployeeId'),
        values: workExperience[CAN_GET_WORK_EXPERIENCE_BY_EMPLOYEEID]
      }
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
        <ApiEndPoint name="Clouds" endPoints={CloudsRequests} />
        <ApiEndPoint name="CVImports" endPoints={CVImportRequests} />
        <ApiEndPoint name="Employees" endPoints={EmployeesRequests} />
        <ApiEndPoint name="Feedbacks" endPoints={FeedbacksRequests} />
        <ApiEndPoint name="GDrive" endPoints={GDriveRequests} />
        <ApiEndPoint name="Notifications" endPoints={NotificationsRequests} />
        <ApiEndPoint name="OneDrive" endPoints={OneDriveRequests} />
        <ApiEndPoint name="QuarterTalks" endPoints={QuarterTalksRequests} />
        <ApiEndPoint name="Reports" endPoints={ReportsRequests} />
        <ApiEndPoint name="Responsible Persons" endPoints={ResponsiblePersonRequests} />
        <ApiEndPoint name="Skills" endPoints={SkillsRequests} />
        <ApiEndPoint name="Stats" endPoints={StatsRequests} />
        <ApiEndPoint name="Roles" endPoints={RolesRequests} />
        <ApiEndPoint name="Share Projects" endPoints={ShareProjectsRequests} />
        <ApiEndPoint name="Work Experience" endPoints={WorkExperienceRequests} />
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
    certificates: state.infoReducer[CERTIFICATES],
    clouds: state.infoReducer[CLOUDS],
    cvImport: state.infoReducer[CV_IMPORT],
    education: state.infoReducer[EDUCATION],
    employees: state.infoReducer[EMPLOYEES],    
    feedbacks: state.infoReducer[FEEDBACKS],
    gdrive: state.infoReducer[GDRIVE],
    notifications: state.infoReducer[NOTIFICATIONS],
    oneDrive: state.infoReducer[ONEDRIVE],
    quarterTalks: state.infoReducer[QUARTERTALKS],
    reports: state.infoReducer[REPORTS],
    responsiblePerson: state.infoReducer[RESPONSIBLE_PERSON],
    skills: state.infoReducer[SKILLS],
    stats: state.infoReducer[STATS],
    roles: state.infoReducer[ROLES],
    shareProjects: state.infoReducer[SHARE_PROJECTS],
    workExperience: state.infoReducer[WORK_EXPERIENCE]
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
