import WebApi from "../api";
import {
  asyncStarted,
  asyncEnded,
  setActionConfirmationResult,
  setActionConfirmationResultWithoutEnding

} from "./asyncActions";
import {
  LOAD_CLIENTS_SUCCESS,
  LOAD_CLIENTS_FAIL,
  ADD_CLIENT_RESULT,
  ADD_CLOUD_RESULT,
  ADD_RESPONSIBLE_PERSON_RESULT,
  CLEAR_RESPONSE_CLOUD,
  PUT_SLIM_CLIENTS,
  ADD_SLIM_CLIENT,
  UPDATE_SLIM_CLIENT
} from "../constants";
import { useRequest } from '../api/index';


import { useRequest } from '../api/index';
import { transformArrayIntoObject } from '../services/transform-data-service';

export const clearResponseCloud = () => {
  return {
    type: CLEAR_RESPONSE_CLOUD,
    resultBlock: null
  };
};

export const loadClientsSuccess = (clients, resultBlock) => {
  return {
    type: LOAD_CLIENTS_SUCCESS,
    clients,
    resultBlock
  };
};

export const loadClientsFail = resultBlock => {
  return {
    type: LOAD_CLIENTS_FAIL,
    resultBlock
  };
};

export const addClientResult = resultBlock => {
  return {
    type: ADD_CLIENT_RESULT,
    resultBlock
  };
};

export const addCloudResult = resultBlock => {
  return {
    type: ADD_CLOUD_RESULT,
    resultBlock
  };
};

export const addResponsiblePersonResult = resultBlock => {
  return {
    type: ADD_RESPONSIBLE_PERSON_RESULT,
    resultBlock
  };
};

export const addSlimClient = client => ({ type: ADD_SLIM_CLIENT, client });
export const updateSlimClient = (clientName, client) => ({ type: UPDATE_SLIM_CLIENT, clientName, client });
export const putSlimClients = clientsSlim => ({type: PUT_SLIM_CLIENTS, clientsSlim });

export const getClientsSlim = () => dispatch =>
  useRequest('getClientsSlim')
  .then(res => dispatch(putSlimClients(transformArrayIntoObject('name', res.extractData()))));

export const createResponsiblePerson = model => dispatch => new Promise((resolve, reject) => {
  useRequest('createResponsiblePerson', model)
  .then(res => resolve(res.extractData()))
  .catch(() => reject());
});

export const editResponsiblePerson = (model, id) => dispatch => new Promise((resolve, reject) => {
  useRequest('editResponsiblePerson', model, id)
  .then(() => resolve())
  .catch(() => reject());
})

export const loadClients = () => {
  return dispatch => {
    dispatch(asyncStarted());
    useRequest('getClients')
      .then(response => {
        if (!response.errorOccurred()) {
          dispatch(loadClientsSuccess(response.extractData(), response));
        }
        dispatch(asyncEnded());
      })
      .catch(error => {
        dispatch(loadClientsFail(error));
        dispatch(asyncEnded());
        throw error;
      });
  };
};

export const deleteClient = id => {
  return dispatch => {
    dispatch(asyncStarted());
    useRequest('deleteClient', id)
      .then(response => {
        if (!response.errorOccurred()) {
          let promise = new Promise((resolve, reject) => {
            resolve(dispatch(setActionConfirmationResult(response)));
          });
          promise.then(dispatch(this.loadClients()));
        }
        dispatch(asyncEnded());
      })
      .catch(error => {
        dispatch(setActionConfirmationResultWithoutEnding(error));
        dispatch(asyncEnded());
        throw error;
      });
  };
};

export const reactivateClient = id => {
  return dispatch => {
    dispatch(asyncStarted());
    useRequest('reactivateClient',id)
      .then(response => {
        if (!response.errorOccurred()) {
          let promise = new Promise((resolve, reject) => {
            resolve(dispatch(setActionConfirmationResult(response)));
          });
          promise.then(dispatch(this.loadClients()));
        }
        dispatch(asyncEnded());
      })
      .catch(error => {
        dispatch(setActionConfirmationResultWithoutEnding(error));
        dispatch(asyncEnded());
        throw error;
      });
  };
};

export const saveEdit = (id, value) => {
  return dispatch => {
    dispatch(asyncStarted());
    useRequest('editInfoClient', id, value)
      .then(response => {
        if (!response.errorOccurred()) {
          dispatch(this.loadClients());
        }
        dispatch(asyncEnded());
      })
      .catch(error => {
        dispatch(asyncEnded());
        throw error;
      });
  };
};

export const editClient = (clientId, formData) => {
  return dispatch => {
    useRequest('editInfoClient', clientId, formData)
      .then(response => {
        if (!response.errorOccurred()) {
          dispatch(addClientResult(response));
          setTimeout(() => {
            dispatch(addClientResult(null));
            dispatch(loadClients());
          }, 2000);
        }
      })
      .catch(error => {
        dispatch(addClientResult(error));
        throw error;
      });
  };
};

export const addClient = formData => {
  return dispatch => {
    useRequest('addClient', formData)
      .then(response => {
        if (!response.errorOccurred()) {
          dispatch(addClientResult(response));
          setTimeout(() => {
            dispatch(addClientResult(null));
            dispatch(loadClients());
          }, 2000);
        }
      })
      .catch(error => {
        dispatch(addClientResult(error));
        throw error;
      });
  };
};

export const addCloud = (name, fields, clientId) => {
  return dispatch => {
    useRequest('addCloud', name, fields, clientId)
      .then(response => {
        if (!response.errorOccurred()) {
          dispatch(addCloudResult(response));
          dispatch(this.loadClients());
        }
      })
      .catch(error => {
        dispatch(addCloudResult(error));
        throw error;
      });
  };
};

export const addResponsiblePerson = (
  firstName,
  lastName,
  client,
  email,
  phoneNumber
) => {
  return dispatch => {
    WebApi.responsiblePerson
      .post(firstName, lastName, client, email, phoneNumber)
      .then(response => {
        if (!response.errorOccurred()) {
          dispatch(addResponsiblePersonResult(response));
          dispatch(this.loadClients());
        }
      })
      .catch(error => {
        dispatch(addResponsiblePersonResult(error));
        throw error;
      });
  };
};

export const deleteCloud = id => {
  return dispatch => {
    useRequest('deleteCloud', id)
      .then(response => {
        if (!response.errorOccurred()) {
          dispatch(setActionConfirmationResult(response));
          dispatch(this.loadClients());
        }
      })
      .catch(error => {
        dispatch(setActionConfirmationResult(error));
        throw error;
      });
  };
};

export const editCloud = (cloudId, name, fields, clientId) => {
  return dispatch => {
    useRequest('editCloud', cloudId, name, fields, clientId)
      .then(response => {
        if (!response.errorOccurred()) {
          dispatch(addCloudResult(response));
          dispatch(this.loadClients());
        }
      })
      .catch(error => {
        dispatch(addCloudResult(error));
        throw error;
      });
  };
};

export const deleteResponsiblePerson = id => {
  return dispatch => {
    WebApi.responsiblePerson
      .delete(id)
      .then(response => {
        if (!response.errorOccurred()) {
          dispatch(setActionConfirmationResult(response));
          dispatch(this.loadClients());
        }
      })
      .catch(error => {
        dispatch(setActionConfirmationResult(error));
        throw error;
      });
  };
};

export const reactivateCloud = id => {
  return dispatch => {
    useRequest('reactivateCloud', id)
      .then(response => {
        if (!response.errorOccurred()) {
          dispatch(setActionConfirmationResult(response));
          dispatch(this.loadClients());
        }
      })
      .catch(error => {
        dispatch(setActionConfirmationResult(error));
        throw error;
      });
  };
};

export const reactivateResponsiblePerson = id => {
  return dispatch => {
    WebApi.responsiblePerson
      .reactivate(id)
      .then(response => {
        if (!response.errorOccurred()) {
          dispatch(setActionConfirmationResult(response));
          dispatch(loadClients());
        }
      })
      .catch(error => {
        dispatch(setActionConfirmationResult(error));
        throw error;
      });
  };
};
