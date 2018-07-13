export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_START = "AUTH_START";
export const AUTH_STOP = "AUTH_STOP";

export const LOGOUT = "LOGOUT";

export const LOAD_USERS_FAIL = "LOAD_USERS_FAIL";
export const LOAD_USERS_SUCCESS = "LOAD_USERS_SUCCESS";
export const LOAD_PROJECTS_SUCCESS = "LOAD_PROJECTS_SUCCESS";

export const LOAD_EMPLOYEES_SUCCESS = "LOAD_EMPLOYEES_SUCCESS";

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
export const names = ["Imię", "Nazwisko", "Klient", "Email", "Number kontaktowy", "Pełna nazwa"];
export const overViewNames = ["Klient", "Data rozpoczęcia", "Szacowana data zakończenia", "Data zakończenia"];

export const ADD_EMPLOYEE_TO_PROJECT = "ADD_EMPLOYEE_TO_PROJECT";
export const DELETE_PROJECT_OWNER = "DELETE_PROJECT_OWNER";
export const ADD_FEEDBACK = "ADD_FEEDBACK";
export const GET_FEEDBACKS = "GET_FEEDBACKS";
export const EDIT_PROJECT = "EDIT_PROJECT";
export const CHANGE_PROJECT_SKILLS = "CHANGE_PROJECT_SKILLS";


// REPORTS
export const GET_TEAMS = "GET_TEAMS";
export const GENERATE_DEVS_REPORT = "GENERATE_DEVS_REPORT";
export const GET_REPORT = "GET_REPORT";
export const GOOGLE_DRIVE_LOG_IN = "GOOGLE_DRIVE_LOG_IN";
export const GET_USER_CV = "GET_USER_CV";
export const CHANGE_REPORT_OPERATION_STATE = "CHANGE_REPORT_OPERATION_STATE";


// ONEDRIVE

export const ONE_DRIVE_AUTH = "ONE_DRIVE_AUTH";
export const SEND_CODE_TO_GET_TOKEN = "SEND_CODE_TO_GET_TOKEN";
export const GET_FOLDERS = "GET_FOLDERS";
export const CREATE_FOLDER = "CREATE_FOLDER";
export const DELETE_FOLDER = "DELETE_FOLDER";
export const UPDATE_FOLDER = "UPDATE_FOLDER";
export const UPLOAD_FILE = "UPLOAD_FILE";



// SKILLS

export const GET_ALL_SKILLS = "GET_ALL_SKILLS";
export const ADD_SKILLS_TO_PROJECT = "ADD_SKILLS_TO_PROJECT";