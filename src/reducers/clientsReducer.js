import {
  LOAD_CLIENTS_SUCCESS,
  LOAD_CLIENTS_FAIL,
  ADD_CLIENT_RESULT,
  ADD_CLOUD_RESULT,
  ADD_RESPONSIBLE_PERSON_RESULT,
  CLEAR_RESPONSE_CLOUD,
  LOGOUT,
  LOAD_SLIM_CLIENTS_SUCC,
  LOAD_SLIM_CLIENTS_FAIL,
  UPDATE_SLIM_CLIENT
} from "../constants";

const initialState = {
  clients: [],
  clientsSlim: [],
  clientsSlimResult: {status: null}
};

export const clientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SLIM_CLIENTS_SUCC:
      return { ...state, clientsSlim: [...action.clientsSlim], clientsSlimResult: {status: true} };
    case LOAD_SLIM_CLIENTS_FAIL:
      return { ...state, clientsSlim: [...action.clientsSlim], clientsSlimResult: {status: false} };
    case UPDATE_SLIM_CLIENT:
      return { ...state, clientsSlim: state.clientsSlim.map(slimClient => {
          return action.slimClient.id === slimClient.id ? { ...action.payload.slimClient } : slimClient
        })
      };
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
