import { ADD_ALERT, EDIT_ALERT, REMOVE_ALERT } from '../constants';

// id - helping with recognize which alerts to proceed
// content - alert message
// type - one from (ok, err, warn) - every have different styling.
// time - how much time will alert be displayed. If time is not edfined alert does not disappear

const initialState = {
  alerts: []
};

export const alertsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ALERT:
      return {
        ...state,
        alerts: [{...action.alert}, ...state.alerts]
      };
    case EDIT_ALERT:
      const alerts = state.alerts.map(alert => {
        return alert.id === action.alert.id ? {...action.alert} : alert;
      });
      return {...state, alerts};
    case REMOVE_ALERT:
      return {
        ...state, alerts: state.alerts.filter(item => item.id !== action.id)
      };
    default:
      return state;
  }
};
