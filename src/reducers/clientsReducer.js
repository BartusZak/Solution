import {
  LOAD_CLIENTS_SUCCESS,
  LOAD_CLIENTS_FAIL,
  ADD_CLIENT_RESULT,
  ADD_CLOUD_RESULT,
  ADD_RESPONSIBLE_PERSON_RESULT,
  CLEAR_RESPONSE_CLOUD,
  LOGOUT,
  PUT_SLIM_CLIENTS,
  ADD_SLIM_CLIENT,
  UPDATE_SLIM_CLIENT
} from "../constants";

const initialState = {
  clients: [],
  clientsSlim: {}
};

export const clientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case PUT_SLIM_CLIENTS:
      return { ...state, clientsSlim: {...action.clientsSlim} };
    case ADD_SLIM_CLIENT:
      return { ...state, clientsSlim: {...state.clientsSlim, [action.client.name]: action.client }}
    case UPDATE_SLIM_CLIENT:
      return { ...state, clientsSlim: {...state.clientsSlim, [action.clientName]: action.client} };
    case CLEAR_RESPONSE_CLOUD:
      return {
        ...state,
        resultBlockCloud: null
      };
    case ADD_CLOUD_RESULT:
      return {
        ...state,
        resultBlockCloud: action.resultBlock
      };
    case ADD_RESPONSIBLE_PERSON_RESULT:
      return {
        ...state,
        resultBlockResponsiblePerson: action.resultBlock
      };
    case LOAD_CLIENTS_SUCCESS:
      return {
        ...state,
        clients: action.clients,
        resultBlock: action.resultBlock
      };
    case LOAD_CLIENTS_FAIL:
      return {
        resultBlock: action.resultBlock
      };
    case ADD_CLIENT_RESULT:
      return {
        ...state,
        resultBlockAddClient: action.resultBlock
      };
    case LOGOUT:
      return {
        clients: []
      };
    default:
      return state;
  }
};
