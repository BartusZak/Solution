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
  CAN_GET_PROJECT
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
  },
  [CLIENT]: {
    [CAN_GET_LIST_OF_CLIENTS]: new InfoState(),
    [CAN_ADD_CLIENT]: new InfoState(),
    [CAN_DELETE_CLIENT]: new InfoState(),
    [CAN_EDIT_CLIENT]: new InfoState(),
    [CAN_REACTIVATE_CLIENT]: new InfoState(),
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
