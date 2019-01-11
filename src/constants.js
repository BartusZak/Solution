export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_START = "AUTH_START";
export const AUTH_STOP = "AUTH_STOP";
export const AUTH_ERROR_ACCOUNT_REQUEST = "AUTH_ERROR_ACCOUNT_REQUEST";
export const AUTH_CLEAR_ACCOUNT_REQUEST = "AUTH_CLEAR_ACCOUNT_REQUEST";

export const CHANGE_ROLES_GET_STATUS = "CHANGE_ROLES_GET_STATUS";
export const GET_ROLES = "GET_ROLES";
export const SEND_ROLES_RESULT = "SEND_ROLES_RESULT";

export const LOGOUT = "LOGOUT";

export const LOAD_USERS_FAIL = "LOAD_USERS_FAIL";
export const LOAD_USERS_SUCCESS = "LOAD_USERS_SUCCESS";
export const LOAD_PROJECTS_SUCCESS = "LOAD_PROJECTS_SUCCESS";

export const LOAD_CLIENTS_FAIL = "LOAD_CLIENTS_FAIL";
export const LOAD_CLIENTS_SUCCESS = "LOAD_CLIENTS_SUCCESS";
export const ADD_CLIENT_RESULT = "ADD_CLIENT_RESULT";

export const ADD_CLOUD_RESULT = "ADD_CLOUD_RESULT";
export const ADD_RESPONSIBLE_PERSON_RESULT = "ADD_RESPONSIBLE_PERSON_RESULT";
export const CLEAR_RESPONSE_CLOUD = "CLEAR_RESPONSE_CLOUD";

export const LOAD_EMPLOYEES_SUCCESS = "LOAD_EMPLOYEES_SUCCESS";
export const LOAD_EMPLOYEES_FAILURE = "LOAD_EMPLOYEES_FAILURE";

export const LOAD_SKILLS_SUCCESS = "LOAD_SKILLS_SUCCESS";
export const SKILL_ADDED = "SKILL_ADDED";

export const REMOVE_SKILL = "REMOVE_SKILL";
export const EDIT_SKILL = "EDIT_SKILL";
export const EDIT_SKILL_ERROR = "EDIT_SKILL_ERROR";

export const LANGUAGE_CHANGED = "LANGUAGE_CHANGED";
export const LANGUAGE_CHANGE = "LANGUAGE_CHANGE";

export const ASYNC_STARTED = "ASYNC_STARTED";
export const ASYNC_ENDED = "ASYNC_ENDED";
export const SET_ACTION_CONFIRMATION = "SET_ACTION_CONFIRMATION";
export const SET_ACTION_CONFIRMATION_PROGRESS =
  "SET_ACTION_CONFIRMATION_PROGRESS";
export const SET_ACTION_CONFIRMATION_RESULT_WITHOUT_ENDING =
  "SET_ACTION_CONFIRMATION_RESULT_WITHOUT_ENDING";
export const SET_ACTION_CONFIRMATION_RESULT = "SET_ACTION_CONFIRMATION_RESULT";
export const ACTION_CONFIRMED = "ACTION_CONFIRMED";
export const CHANGE_EDITED_PROJECT = "CHANGE_EDITED_PROJECT";
export const CHANGE_OPERATION_STATE = "CHANGE_OPERATION_STATE";

// PROJECTS

export const GET_PROJECT = "GET_PROJECT";
export const names = [
  "FirstName",
  "Surname",
  "Client",
  "Email",
  "PhoneNumber",
  "FullName"
];
export const overViewNames = [
  "Client",
  "StartDate",
  "EstimatedEndDate",
  "EndDate",
  "ParentName"
];
export const ADD_PROJECT_OWNER_TO_PROJECT = "ADD_PROJECT_OWNER_TO_PROJECT";
export const ADD_EMPLOYEE_TO_PROJECT = "ADD_EMPLOYEE_TO_PROJECT";
export const EDIT_EMPLOYEE_ASSIGNMENT = "EDIT_EMPLOYEE_ASSIGNMENT";
export const DELETE_EMPLOYEE_ASSIGNMENT = "DELETE_EMPLOYEE_ASSIGNMENT";
export const ADD_FEEDBACK = "ADD_FEEDBACK";
export const GET_MY_FEEDBACK = "GET_MY_FEEDBACK";
export const GET_FEEDBACKS = "GET_FEEDBACKS";
export const DELETE_FEEDBACK = "DELETE_FEEDBACK";
export const EDIT_FEEDBACK = "EDIT_FEEDBACK";
export const EDIT_PROJECT = "EDIT_PROJECT";
export const CHANGE_PROJECT_SKILLS = "CHANGE_PROJECT_SKILLS";
export const CHANGE_PROJECT_STATE = "CHANGE_PROJECT_STATE";
export const CREATE_PROJECT = "CREATE_PROJECT";
export const CREATE_PROJECT_PHASE = "CREATE_PROJECT_PHASE";
export const GET_SUGGEST_EMPLOYEES = "GET_SUGGEST_EMPLOYEES";
export const CHANGE_GET_SUGGEST_EMPLOYEES_STATUS =
  "CHANGE_GET_SUGGEST_EMPLOYEES_STATUS";
export const GET_CONTACT_PERSON_DATA = "GET_CONTACT_PERSON_DATA";
// REPORTS
export const GET_TEAMS = "GET_TEAMS";
export const GET_USER_CV = "GET_USER_CV";
export const GENERATE_REPORT = "GENERATE_REPORT";
export const GET_FAVORITE_AND_RECENT_REPORTS =
  "GET_FAVORITE_AND_RECENT_REPORTS";
export const UNFAVORITE_REPORT = "UNFAVORITE_REPORT";
export const DOWNLOAD_REPORT_ZIP_FILE = "DOWNLOAD_REPORT_ZIP_FILE";

// PERSIST HELPER
export const FETCH_LISTS = "FETCH_LISTS";
export const PUT_NOTIFICATION_ICON_IN_SIDE_BAR =
  "PUT_NOTIFICATION_ICON_IN_SIDE_BAR";
export const CHOOSE_FOLDER_TO_GENERATE_REPORT =
  "CHOOSE_FOLDER_TO_GENERATE_REPORT";
export const FETCH_FORM_CLIENTS = "FETCH_FORM_CLIENTS";
export const CHANGE_SORT_BY = "CHANGE_SORT_BY";
export const CREATE_LAST_WATCHED_PERSONS = "CREATE_LAST_WATCHED_PERSONS";
export const CHANGE_LINK_BEFORE_REDIRECT = "CHANGE_LINK_BEFORE_REDIRECT";
export const CHANGE_CURRENT_WATCHED_USER = "CHANGE_CURRENT_WATCHED_USER";
// ONEDRIVE
export const GENERATE_SHARE_LINK = "GENERATE_SHARE_LINK";
export const ONE_DRIVE_AUTH = "ONE_DRIVE_AUTH";
export const SEND_CODE_TO_GET_TOKEN = "SEND_CODE_TO_GET_TOKEN";
export const GET_FOLDERS = "GET_FOLDERS";
export const CREATE_FOLDER = "CREATE_FOLDER";
export const DELETE_FOLDER = "DELETE_FOLDER";
export const UPDATE_FOLDER = "UPDATE_FOLDER";
export const UPLOAD_FILE = "UPLOAD_FILE";
export const notRecognizedError = "Ups, coś poszło nie tak";
export const oldTokenComunicate =
  "Wystąpił problem podczas pobierania zawartości katalogu OneDrive. Prawdopodobnie jest to związane z wygaśnięciem okresu dostępu. Odśwież stronę by zalogować się jeszcze raz bądź kliknij w poniższy przycisk";
export const invalidTokenError =
  "Nieprawidłowy token autoryzacyjny do usługi OneDrive.";

// SKILLS

export const GET_ALL_SKILLS = "GET_ALL_SKILLS";
export const ADD_SKILLS_TO_PROJECT = "ADD_SKILLS_TO_PROJECT";
export const ADD_NEW_SKILL = "ADD_NEW_SKILL";

//GDRIVE

export const G_DRIVE_LOGIN = "G_DRIVE_LOGIN";
export const G_DRIVE_DELETE = "G_DRIVE_DELETE";
export const G_DRIVE_CREATE = "G_DRIVE_CREATE";
export const SET_PARENT_DETAILS = "SET_PARENT_DETAILS";
export const GENERATE_G_DRIVE_SHARE_LINK = "GENERATE_G_DRIVE_SHARE_LINK";

//EMPLOYEES

export const EDIT_EMPLOYEES_DETAILS = "EDIT_EMPLOYEES_DETAILS";

export const GET_EMPLOYEE = "GET_EMPLOYEE";
export const CHANGE_EMPLOYEE_OPERATION_STATUS = "CHANGE_EMPLOYEE_OPERATION_STATUS";
export const CHANGE_EMPLOYEE_STATE = "CHANGE_EMPLOYEE_STATE";
export const LOAD_ASSIGNMENTS = "LOAD_ASSIGNMENTS";
export const CHANGE_EMPLOYEE_SKILLS = "CHANGE_EMPLOYEE_SKILLS";
export const ADD_NEW_SKILLS_TO_EMPLOYEE = "ADD_NEW_SKILLS_TO_EMPLOYEE";
export const UPDATE_EMPLOYEE_SKYPE_ID = "UPDATE_EMPLOYEE_SKYPE_ID";
export const GET_TEAMLEADERS_AND_MANAGERS = "GET_TEAMLEADERS_AND_MANAGERS";
export const CHANGE_LOAD_TEAMLEADERS_AND_MANGERS_STATUS = "CHANGE_LOAD_TEAMLEADERS_AND_MANGERS_STATUS";
export const GET_EMPLOYEES_FEEDBACKS = "GET_EMPLOYEES_FEEDBACKS";
export const CHANGE_LOAD_EMPLOYEES_FEEDBACKS = "CHANGE_LOAD_EMPLOYEES_FEEDBACKS";
export const ADD_EMPLOYEE_ONBOARD = "ADD_EMPLOYEE_ONBOARD";
export const CHANGE_EMPLOYEE_ONBOARD_STATUS = "CHANGE_EMPLOYEE_ONBOARD_STATUS";
export const GET_EMPLOYEE_ONBOARDS = "GET_EMPLOYEE_ONBOARDS";
export const CHANGE_GET_EMPLOYEE_ONBOARDS_STATUS = "CHANGE_GET_EMPLOYEE_ONBOARDS_STATUS";
export const UPDATE_EMPLOYEE_ONBOARD = "UPDATE_EMPLOYEE_ONBOARD";
//SHARED EMPLOYEES

export const GET_SHARED_EMPLOYEES_FOR_MANAGER =
  "GET_SHARED_EMPLOYEES_FOR_MANAGER";
export const CHANGE_SHARED_EMPLOYEES_FOR_MANAGER_STATUS =
  "CHANGE_SHARED_EMPLOYEES_FOR_MANAGER_STATUS";
export const ADD_SHARED_EMPLOYEE_RESULT = "ADD_SHARED_EMPLOYEE_RESULT";

//export const GET_CERTIFICATES_SUCCESS = "GET_CERTIFICATES_SUCCESS";
//export const GET_CERTIFICATES_FAILURE = "GET_CERTIFICATES_FAILURE";

export const GET_CERTYFICATES = "GET_CERTYFICATES";
export const CHANGE_CERTIFICATES_GET_STATUS = "CHANGE_CERTIFICATES_GET_STATUS";
export const ADD_CERTIFICATE_RESULT = "ADD_CERTIFICATE_RESULT";

// PROGRESSBAR
export const SET_IS_STARTED = "SET_IS_STARTED";
export const SET_PROGRESS_BAR_VALUE = "SET_PROGRESS_BAR_VALUE";
export const CHANGE_SHOULD_SHOW_GLOBAL = "CHANGE_SHOULD_SHOW_GLOBAL";

// QUARTERTALKs
export const EDIT_QUESTIONS_IN_QUARTER = "EDIT_QUESTIONS_IN_QUARTER";
export const GET_QUARTERS_FOR_EMPLOYEE = "GET_QUARTERS_FOR_EMPLOYEE";
export const GET_RESERVED_DATES = "GET_RESERVED_DATES";
export const ADD_QUARTER_TALK = "ADD_QUARTER_TALK";
export const PLAN_QUARTER = "PLAN_QUARTER";
export const GET_QUESTIONS = "GET_QUESTIONS";
export const SET_SIGNAL_R_CONNECTION_RESULT = "SET_SIGNAL_R_CONNECTION_RESULT";
export const connectionError =
  "Wystąpił błąd podczas konfiguracji wskaźnika postępu";
export const GENERATE_HUB_CONNECTION = "GENERATE_HUB_CONNECTION";
export const ADD_QUESTION = "ADD_QUESTION";
export const DELETE_QUESTION = "DELETE_QUESTION";

//NOTIFICATIONS
export const GET_NOTIFICATION = "GET_NOTIFICATION";
export const DELETE_NOTIFICATION = "DELETE_NOTIFICATION";
export const DELETE_ALL_NOTIFICATIONS = "DELETE_ALL_NOTIFICATIONS";
export const MARKASREAD_NOTIFICATION = "MARKASREAD_NOTIFICATION";
export const MARKALLASREAD_NOTIFICATION = "MARKALLASREAD_NOTIFICATION";

//INFO
export const CHANGE_STATE = 'CHANGE_STATE';

export const ACCOUNT = 'account'
export const CAN_SEARCH_USER_ACCOUNT = 'canSearchUserAccounts'
export const CAN_EDIT_USERS_ROLES = 'canEditUsersRoles'
export const CAN_SEARCH_AD = 'canSearchAD'
export const CAN_ADD_USER = 'canAddUser'
export const CAN_REACTIVATE_USER = 'canReactivateUser'
export const CAN_DELETE_USER = 'canDeleteUser'
export const CAN_DELETE_USER_REQUEST = 'canDeleteUserRequest'

export const PROJECTS = 'projects'
export const CAN_SEARCH_PROJECTS = "canSearchProjects";
export const CAN_ADD_PROJECT = "canAddProject";
export const CAN_EDIT_PROJECT = "canEditProject";
export const CAN_GET_PROJECT = "canGetProject";
export const CAN_ADD_PROJECT_OWNERS = "canAddProjectOwners";
export const CAN_DELETE_PROJECT_OWNERS = "canDeleteProjectOwners";
export const CAN_CLOSE_PROJECT = 'canCloseProject';
export const CAN_REACTIVATE_PROJECT = 'canReactivateProject';
export const CAN_SET_PROJECT_SKILLS = 'canSetProjectSkills';
export const CAN_DELETE_PROJECT = 'canDeleteProject'
export const CAN_GET_SUGGESTED_EMPLOYEES = 'canGetSuggestedEmployees'

export const CLIENT = 'client'
export const CAN_GET_LIST_OF_CLIENTS = "canGetListOfClients";
export const CAN_ADD_CLIENT = "canAddClient";
export const CAN_DELETE_CLIENT = "canDeleteClient";
export const CAN_EDIT_CLIENT = "canEditClient";
export const CAN_REACTIVATE_CLIENT = "canReactivateClient";

export const ASSIGNMENTS = 'assignments'
export const CAN_GET_EMPLOYEE_ASSIGNMENTS = 'canGetEmployeeAssignments';
export const CAN_GET_PROJECT_ASSIGNMENTS = 'canGetProjectAssignments';
export const CAN_ADD_ASSIGNMENT = 'canAddAssignment';
export const CAN_EDIT_ASSIGNMENT = 'canEditAssignment';
export const CAN_DELETE_ASSIGNMENT = 'canDeleteAssignment';

export const CERTIFICATES = 'Certificates'
export const CAN_GET_EMPLOYEE_CERTIFICATES = 'canGetEmployeeCertificates'
export const CAN_EDIT_CERTIFICATE = 'canEditCertificate'
export const CAN_DELETE_CERTIFICATE= 'canDeleteCertificate'
export const CAN_ADD_CERTIFICATE = 'canAddCertificate'

export const CLOUDS = 'Clouds'
export const CAN_ADD_CLOUD = 'canAddCloud';
export const CAN_EDIT_CLOUD = 'canEditCloud';
export const CAN_DELETE_CLOUD = 'canDeleteCloud';
export const CAN_REACTIVATE_CLOUD = 'canReactivateCloud';

export const CV_IMPORT = 'CVImport'
export const CAN_IMPORT_CV = 'canImportCV'

export const EDUCATION = 'Education'
export const CAN_ADD_EDUCATION = 'canAddEducation'
export const CAN_EDIT_EDUCATION = 'canEditEducation'
export const CAN_GET_EDUCATION = 'canGetEducation'
export const CAN_DELETE_EDUCATION = 'canDeleteEducation'

export const EMPLOYEES = 'Employees';
export const CAN_GET_EMPLOYEE = 'canGetEmployee';
export const CAN_GET_EMPLOYEE_CAPACITY = 'canGetEmployeeCapacity';
export const CAN_GET_EMPLOYEES_AND_MANAGERS = 'canGetEmployeesAndManagers';
export const CAN_GET_EMPLOYEE_ONBOARDS = 'canGetEmployeeOnBoards';
export const CAN_GET_EMPLO_CONTACT = 'canGetEmploContact';
export const CAN_GET_EMPLO_SKILLS = 'canGetEmploSkills';
export const CAN_SEARCH_EMPLOYEES = 'canSearchEmployees';
export const CAN_ADD_EMPLOYEE = 'canAddEmployee';
export const CAN_ADD_EMPLOYEE_ONBOARD = 'canAddEmployeeOnboard';
export const CAN_DELETE_EMPLOYEE_ONBOARD = 'canDeleteEmployeeOnboard';
export const CAN_DELETE_EMPLOYEE = 'canDeleteEmployee';
export const CAN_SET_EMPLOYEE_SKILLS = 'canSetEmployeeSkills';
export const CAN_SET_EMPLOYEE_F_LANGUAGES = 'canSetEmployeeFLanguages';
export const CAN_SET_EMPLOYEE_SKYPE = 'canSetEmployeeSkype';
export const CAN_EDIT_EMPLOYEE_ONBOARD = 'canEditEmployeeOnboard';
export const CAN_REACTIVATE_EMPLOYEE = 'canReactivateEmployee';
export const CAN_EDIT_EMPLOYEE = 'canEditEmployee';

export const FEEDBACKS = 'Feedbacks'
export const CAN_GET_FEEDBACKS_BY_EMPLOYEE = 'canGetFeedbacksByEmployee';
export const CAN_GET_FEEDBACKS_BY_EMPLOYEE_IN_PROJECT = 'canGetFeedbacksByEmployeeInProject';
export const CAN_ADD_FEEDBACK = 'canAddFeedback';
export const CAN_EDIT_FEEDBACK = 'canEditFeedback';
export const CAN_DELETE_FEEDBACK = 'canDeleteFeedback';

export const GDRIVE = 'GDrive';
export const CAN_LOGIN_GDRIVE = 'canLoginGDrive';
export const CAN_GENERATE_SHARE_LINK_GDRIVE = 'canGenerateShareLinkGDrive';
export const CAN_GET_FOLDERS_GDRIVE = 'canGetFoldersGDrive';
export const CAN_DELETE_FOLDER_GDRIVE = 'canDeleteFolderGDrive';
export const CAN_UPDATE_FOLDER_GDRIVE = 'canUpdateFolderGDrive';
export const CAN_CREATE_FOLDER_GDRIVE = 'canCreateFolderGDrive';
export const CAN_UPLOAD_FILE_GDRIVE = 'canUploadFileGDrive';

export const NOTIFICATIONS = 'Notifications';
export const CAN_GET_ALL_NOTIFICATIONS = 'canGetAllNotifications';
export const CAN_DELETE_NOTIFICATIONS = 'canDeleteNotifications';
export const CAN_MARK_AS_READ_NOTIFICATION = 'canMarkAsReadNotification';

export const ONEDRIVE = 'OneDrive';
export const CAN_GET_REDIRECT_LINK_ONEDRIVE = 'canGetRedirectLinkOneDrive';
export const CAN_SEND_QUERY_TO_AUTH_ONEDRIVE = 'canSendQueryToAuthOneDrive';
export const CAN_REFRESH_TOKEN_ONEDRIVE = 'canRefreshTokenOneDrive';
export const CAN_GENERATE_SHARE_LINK_ONEDRIVE = 'canGenerateShareLinkOneDrive';
export const CAN_GET_FOLDERS_ONEDRIVE = 'canGetFoldersOneDrive';
export const CAN_CREATE_FOLDER_ONEDRIVE = 'canCreateFolderOneDrive';
export const CAN_DELETE_FOLDER_ONEDRIVE = 'canDeleteFolderOneDrive';
export const CAN_UPDATE_FOLDER_ONEDRIVE = 'canUpdateFolderOneDrive';
export const CAN_UPLOAD_FILE_ONEDRIVE = 'canUploadFileOneDrive';


export const ADD_ALERT = "[Alerts] ADD_ALERT";
export const EDIT_ALERT = "[Alerts] EDIT_ALERT";
export const REMOVE_ALERT = "[Alerts] REMOVE_ALERT";
