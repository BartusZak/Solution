import {
  CHANGE_STATE,
  CAN_SEARCH_USER_ACCOUNT,
  CAN_EDIT_USERS_ROLES,
  CAN_SEARCH_AD,
  CAN_ADD_USER,
  CAN_REACTIVATE_USER,
  CAN_DELETE_USER,
  CAN_DELETE_USER_REQUEST,
  CAN_SEARCH_PROJECTS,
  CAN_ADD_PROJECT,
  CAN_EDIT_PROJECT,
  CAN_GET_LIST_OF_CLIENTS,
  CAN_ADD_CLIENT,
  CAN_DELETE_CLIENT,
  CAN_EDIT_CLIENT,
  CAN_REACTIVATE_CLIENT,
  CLIENT,
  PROJECTS,
  ACCOUNT,
  CAN_GET_PROJECT,
  CAN_ADD_PROJECT_OWNERS,
  CAN_DELETE_PROJECT_OWNERS,
  CAN_CLOSE_PROJECT,
  CAN_REACTIVATE_PROJECT,
  CAN_SET_PROJECT_SKILLS,
  CAN_DELETE_PROJECT,
  CAN_GET_SUGGESTED_EMPLOYEES,
  ASSIGNMENTS,
  CAN_GET_EMPLOYEE_ASSIGNMENTS,
  CAN_GET_PROJECT_ASSIGNMENTS,
  CAN_ADD_ASSIGNMENT,
  CAN_EDIT_ASSIGNMENT,
  CAN_DELETE_ASSIGNMENT,
  CERTIFICATES,
  CAN_EDIT_CERTIFICATE,
  CAN_GET_EMPLOYEE_CERTIFICATES,
  CAN_DELETE_CERTIFICATE,
  CAN_ADD_CERTIFICATE,
  CLOUDS,
  CAN_ADD_CLOUD,
  CAN_EDIT_CLOUD,
  CAN_DELETE_CLOUD,
  CAN_REACTIVATE_CLOUD,
  CV_IMPORT,
  CAN_IMPORT_CV,
  EDUCATION,
  CAN_ADD_EDUCATION,
  CAN_EDIT_EDUCATION,
  CAN_GET_EDUCATION,
  CAN_DELETE_EDUCATION,
  EMPLOYEES,
  CAN_GET_EMPLOYEE,
  CAN_GET_EMPLOYEE_CAPACITY_REFACTOR,
  CAN_GET_EMPLOYEES_AND_MANAGERS,
  CAN_GET_EMPLOYEE_ONBOARDS,
  CAN_GET_EMPLO_CONTACT,
  CAN_GET_EMPLO_SKILLS,
  CAN_SEARCH_EMPLOYEES,
  CAN_ADD_EMPLOYEE,
  CAN_ADD_EMPLOYEE_ONBOARD,
  CAN_DELETE_EMPLOYEE,
  CAN_SET_EMPLOYEE_SKILLS,
  CAN_SET_EMPLOYEE_F_LANGUAGES,
  CAN_SET_EMPLOYEE_SKYPE,
  CAN_EDIT_EMPLOYEE_ONBOARD,
  CAN_REACTIVATE_EMPLOYEE,
  CAN_GET_EMPLOYEE_CAPACITY,
  CAN_DELETE_EMPLOYEE_ONBOARD,
  CAN_EDIT_EMPLOYEE,
  CAN_GET_FEEDBACKS_BY_EMPLOYEE,
  CAN_ADD_FEEDBACK,
  CAN_EDIT_FEEDBACK,
  CAN_DELETE_FEEDBACK,
  FEEDBACKS,
  CAN_GET_FEEDBACKS_BY_EMPLOYEE_IN_PROJECT
} from "../constants";
import { updateObject } from "../services/methods";

class InfoState{
  constructor(){
    this.status = false,
    this.loading = true
  }
}

const initialState = {
  [ACCOUNT]: {
    [CAN_SEARCH_USER_ACCOUNT]: new InfoState(),
    [CAN_EDIT_USERS_ROLES]: new InfoState(),
    [CAN_SEARCH_AD]: new InfoState(),
    [CAN_ADD_USER]: new InfoState(),
    [CAN_REACTIVATE_USER]: new InfoState(),
    [CAN_DELETE_USER]: new InfoState(),
    [CAN_DELETE_USER_REQUEST]: new InfoState(),
  },
  [PROJECTS]: {
    [CAN_SEARCH_PROJECTS]: new InfoState(),
    [CAN_ADD_PROJECT]: new InfoState(),
    [CAN_EDIT_PROJECT]: new InfoState(),
    [CAN_GET_PROJECT]: new InfoState(),
    [CAN_ADD_PROJECT_OWNERS]: new InfoState(),
    [CAN_DELETE_PROJECT_OWNERS]: new InfoState(),
    [CAN_CLOSE_PROJECT]: new InfoState(),
    [CAN_REACTIVATE_PROJECT]: new InfoState(),
    [CAN_SET_PROJECT_SKILLS]: new InfoState(),
    [CAN_DELETE_PROJECT]: new InfoState(),
    [CAN_GET_SUGGESTED_EMPLOYEES]: new InfoState(),
  },
  [CLIENT]: {
    [CAN_GET_LIST_OF_CLIENTS]: new InfoState(),
    [CAN_ADD_CLIENT]: new InfoState(),
    [CAN_DELETE_CLIENT]: new InfoState(),
    [CAN_EDIT_CLIENT]: new InfoState(),
    [CAN_REACTIVATE_CLIENT]: new InfoState(),
  },
  [ASSIGNMENTS]:{
    [CAN_GET_EMPLOYEE_ASSIGNMENTS]: new InfoState(),
    [CAN_GET_PROJECT_ASSIGNMENTS]: new InfoState(),
    [CAN_ADD_ASSIGNMENT]: new InfoState(),
    [CAN_EDIT_ASSIGNMENT]: new InfoState(),
    [CAN_DELETE_ASSIGNMENT]: new InfoState(),
  },
  [CERTIFICATES]:{
    [CAN_EDIT_CERTIFICATE]: new InfoState(),
    [CAN_GET_EMPLOYEE_CERTIFICATES]: new InfoState(),
    [CAN_EDIT_CERTIFICATE]: new InfoState(),
    [CAN_DELETE_CERTIFICATE]: new InfoState(),
    [CAN_ADD_CERTIFICATE]: new InfoState(),
  },
  [CLOUDS]:{
    [CAN_ADD_CLOUD]: new InfoState(),
    [CAN_EDIT_CLOUD]: new InfoState(),
    [CAN_DELETE_CLOUD]: new InfoState(),
    [CAN_REACTIVATE_CLOUD]: new InfoState(),
  },
  [CV_IMPORT]:{
    [CAN_IMPORT_CV]: new InfoState(),
  },

  [EDUCATION]: {
    [CAN_ADD_EDUCATION]: new InfoState(),
    [CAN_EDIT_EDUCATION]: new InfoState(),
    [CAN_GET_EDUCATION]: new InfoState(),
    [CAN_DELETE_EDUCATION]: new InfoState(),
  },
  [EMPLOYEES]:{
    [CAN_GET_EMPLOYEE] : new InfoState(),
    [CAN_GET_EMPLOYEE_CAPACITY] : new InfoState(),
    [CAN_GET_EMPLOYEES_AND_MANAGERS] : new InfoState(),
    [CAN_GET_EMPLOYEE_ONBOARDS] : new InfoState(),
    [CAN_GET_EMPLO_CONTACT] : new InfoState(),
    [CAN_GET_EMPLO_SKILLS] : new InfoState(),
    [CAN_SEARCH_EMPLOYEES] : new InfoState(),
    [CAN_ADD_EMPLOYEE] : new InfoState(),
    [CAN_ADD_EMPLOYEE_ONBOARD] : new InfoState(),
    [CAN_DELETE_EMPLOYEE_ONBOARD] : new InfoState(),
    [CAN_DELETE_EMPLOYEE] : new InfoState(),
    [CAN_SET_EMPLOYEE_SKILLS] : new InfoState(),
    [CAN_SET_EMPLOYEE_F_LANGUAGES] : new InfoState(),
    [CAN_SET_EMPLOYEE_SKYPE] : new InfoState(),
    [CAN_EDIT_EMPLOYEE_ONBOARD] : new InfoState(),
    [CAN_REACTIVATE_EMPLOYEE] : new InfoState(),
    [CAN_EDIT_EMPLOYEE] : new InfoState(),
  },
  [FEEDBACKS]:{
    [CAN_GET_FEEDBACKS_BY_EMPLOYEE]: new InfoState(),
    [CAN_GET_FEEDBACKS_BY_EMPLOYEE_IN_PROJECT]: new InfoState(),
    [CAN_ADD_FEEDBACK]: new InfoState(),
    [CAN_EDIT_FEEDBACK]: new InfoState(),
    [CAN_DELETE_FEEDBACK]: new InfoState(),
  }
};

export const infoReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_STATE:
      return updateObject(state, {
        [action.controllerKey]: {
          ...state[action.controllerKey],
          [action.requestKey]: action.value
        }
      });
         
    default:
      return state;
  }
};
