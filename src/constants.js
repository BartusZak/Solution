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

export const LANGUAGE_CHANGED = "LANGUAGE_CHANGED";
export const LANGUAGE_CHANGE = "LANGUAGE_CHANGE";

export const ASYNC_STARTED = "ASYNC_STARTED";
export const ASYNC_ENDED = "ASYNC_ENDED";
export const SET_ACTION_CONFIRMATION = "SET_ACTION_CONFIRMATION";
export const SET_ACTION_CONFIRMATION_PROGRESS =
  "SET_ACTION_CONFIRMATION_PROGRESS";
export const SET_ACTION_CONFIRMATION_RESULT = "SET_ACTION_CONFIRMATION_RESULT";
export const ACTION_CONFIRMED = "ACTION_CONFIRMED";
export const CHANGE_EDITED_PROJECT = "CHANGE_EDITED_PROJECT";
export const CHANGE_OPERATION_STATE = "CHANGE_OPERATION_STATE";

// PROJECTS

export const GET_PROJECT = "GET_PROJECT";
export const names = [
  "Imię",
  "Nazwisko",
  "Klient",
  "Email",
  "Number kontaktowy",
  "Pełna nazwa"
];
export const overViewNames = [
  "Klient",
  "Data rozpoczęcia",
  "Szacowana data zakończenia",
  "Data zakończenia"
];

export const ADD_EMPLOYEE_TO_PROJECT = "ADD_EMPLOYEE_TO_PROJECT";
export const ADD_FEEDBACK = "ADD_FEEDBACK";
export const GET_FEEDBACKS = "GET_FEEDBACKS";
export const EDIT_PROJECT = "EDIT_PROJECT";
export const CHANGE_PROJECT_SKILLS = "CHANGE_PROJECT_SKILLS";
export const CHANGE_PROJECT_STATE = "CHANGE_PROJECT_STATE";
export const CREATE_PROJECT = "CREATE_PROJECT";
export const GET_SUGGEST_EMPLOYEES = "GET_SUGGEST_EMPLOYEES";
export const CHANGE_GET_SUGGEST_EMPLOYEES_STATUS = "CHANGE_GET_SUGGEST_EMPLOYEES_STATUS";
export const GET_CONTACT_PERSON_DATA = "GET_CONTACT_PERSON_DATA";
// REPORTS
export const GET_TEAMS = "GET_TEAMS";
export const GET_USER_CV = "GET_USER_CV";
export const GENERATE_REPORT = "GENERATE_REPORT";
export const GET_FAVORITE_AND_RECENT_REPORTS = "GET_FAVORITE_AND_RECENT_REPORTS";
export const UNFAVORITE_REPORT = "UNFAVORITE_REPORT";

// PERSIST HELPER
export const FETCH_LISTS = "FETCH_LISTS";
export const CHOOSE_FOLDER_TO_GENERATE_REPORT =
  "CHOOSE_FOLDER_TO_GENERATE_REPORT";
export const FETCH_FORM_CLIENTS = "FETCH_FORM_CLIENTS";
export const CHANGE_SORT_BY = "CHANGE_SORT_BY";

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
export const CHANGE_EMPLOYEE_OPERATION_STATUS =
  "CHANGE_EMPLOYEE_OPERATION_STATUS";
export const CHANGE_EMPLOYEE_STATE = "CHANGE_EMPLOYEE_STATE";
export const LOAD_ASSIGNMENTS = "LOAD_ASSIGNMENTS";
export const DELETE_QUATER = "DELETE_QUATER";
export const REACTIVATE_QUATER = "REACTIVATE_QUATER";
export const CHANGE_EMPLOYEE_SKILLS = "CHANGE_EMPLOYEE_SKILLS";
export const ADD_NEW_SKILLS_TO_EMPLOYEE = "ADD_NEW_SKILLS_TO_EMPLOYEE";
export const UPDATE_EMPLOYEE_SKYPE_ID = "UPDATE_EMPLOYEE_SKYPE_ID";

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
export const ADD_QUARTER_TALK = "ADD_QUARTER_TALK";
export const GET_QUESTIONS = "GET_QUESTIONS";
export const SET_SIGNAL_R_CONNECTION_RESULT = "SET_SIGNAL_R_CONNECTION_RESULT";
export const connectionError =
  "Wystąpił błąd podczas konfiguracji wskaźnika postępu";
export const GENERATE_HUB_CONNECTION = "GENERATE_HUB_CONNECTION";
