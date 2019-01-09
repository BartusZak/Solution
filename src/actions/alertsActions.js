import { ADD_ALERT, EDIT_ALERT, REMOVE_ALERT } from "../constants";
import storeCreator from "./../store";

const { store } = storeCreator;

const getAlerts = state => state.alertsReducer.alerts;

export const addAlert = alert => {
  const alerts = getAlerts(store.getState());
  const index = alerts.findIndex(al => al.id === alert.id);

  if (index === -1) {
    return { type: ADD_ALERT, alert };
  }
  else {
    return { type: EDIT_ALERT, alert };
  }
};

export const removeAlert = id => ({ type: REMOVE_ALERT, id });
