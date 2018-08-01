import {
  LOAD_EMPLOYEES_SUCCESS,
  ASYNC_STARTED,
  ASYNC_ENDED,
  LOAD_EMPLOYEES_FAILURE, GET_EMPLOYEE,
  CHANGE_EMPLOYEE_OPERATION_STATUS,
  CHANGE_EMPLOYEE_STATE
} from "../constants";
import axios from "axios";
import WebApi from "../api";
import { asyncStarted, asyncEnded } from "./asyncActions";
import { errorCatcher } from '../services/errorsHandler';

export const loadEmployeesSuccess = employees => {
  return {
    type: LOAD_EMPLOYEES_SUCCESS,
    employees
  };
};

export const loadEmployeesFailure = resultBlock => {
  return {
    type: LOAD_EMPLOYEES_FAILURE,
    resultBlock
  };
};

export const loadEmployees = (page = 1, limit = 25, other = {}) => {
  return dispatch => {
    const settings = Object.assign(
      {},
      { Limit: limit, PageNumber: page, IsDeleted: false },
      other
    );

    dispatch(asyncStarted());
    WebApi.employees.post
      .list(settings)
      .then(response => {
        if (!response.errorOccurred()) {
          dispatch(loadEmployeesSuccess(response.extractData()));
        }
        dispatch(asyncEnded());
      })
      .catch(error => {
        dispatch(loadEmployeesFailure(error));
        dispatch(asyncEnded());
      });
  };
};



export const changeEmployeeOperationStatus = (employeeStatus, employeeErrors) => {
  return { type: CHANGE_EMPLOYEE_OPERATION_STATUS, employeeStatus, employeeErrors }
}
export const getEmployee = employee => {
  return { type: GET_EMPLOYEE, employee }
}
export const getEmployeePromise = (employeeId) => (dispatch) => {
  return new Promise(resolve => {
    WebApi.employees.get.byEmployee(employeeId).then(response => {
      const { dtoObject } = response.replyBlock.data;
      dispatch(getEmployee(dtoObject));
      dispatch(changeEmployeeOperationStatus(true, []));
      resolve(dtoObject);
    }).catch(error => {
      dispatch(changeEmployeeOperationStatus(false, errorCatcher(error)));
      dispatch(clearAfterTime(5000));
    })
  })
}

const clearAfterTime = delay => {
  return dispatch => {
      setTimeout(() => {
        dispatch(changeEmployeeOperationStatus(null, []))
      }, delay);
  }
}

export const deleteEmployee = employeeId => {
  return dispatch => {
    WebApi.employees.delete(employeeId).then(response => {
      dispatch(getEmployeePromise(employeeId));
    }).catch(error => {
      dispatch(changeEmployeeOperationStatus(false, errorCatcher(error)));
      dispatch(clearAfterTime(5000));
    });
  }
}
export const reactivateEmployee = employeeId => {
  return dispatch => {
    WebApi.employees.patch.reactivate(employeeId).then(response => {
      dispatch(getEmployeePromise(employeeId));
    }).catch(error => {
      dispatch(changeEmployeeState(false, errorCatcher(error), ""));
      dispatch(clearAfterTimeStatus(5000));
    })
  }
}

export const editStatistics = (employeeId, seniority, capacity, currentClouds) => {
  return dispatch => {
    const model = {
        "seniority": seniority,
        "capacity": capacity,
        "cloudsIds": currentClouds
    }
    WebApi.employees.patch.data(employeeId, model).then(response => {
      dispatch(getEmployeePromise(employeeId));
    }).catch(error => {
      dispatch(changeEmployeeOperationStatus(false, errorCatcher(error)));
      dispatch(clearAfterTime(5000));
    })
  }
}

export const changeEmployeeState = (employeeOperationStatus, employeeOperationErrors, employeeResultMessage) => {
  return { type: CHANGE_EMPLOYEE_STATE, employeeOperationStatus, employeeOperationErrors, employeeResultMessage}
}

export const activateEmployee = (employeeId, seniority, capacity) => {
  return dispatch => {
    const model = {
      "id": employeeId,
      "seniority": seniority,
      "capacity": capacity,
    }
    WebApi.employees.post.add(model).then(response => {
      dispatch(getEmployeePromise(employeeId));
    }).catch(error => {
      dispatch(changeEmployeeState(false, errorCatcher(error), ""));
      dispatch(clearAfterTimeStatus(5000));
    })
  }
}
const clearAfterTimeStatus = delay => {
  return dispatch => {
    setTimeout(() => {
      dispatch(changeEmployeeState(null, [], ""))
    }, delay);
}
}

export const loadEmploSkills = employeeId => {
  return dispatch => {
    WebApi.employees.get.emplo.skills(employeeId).then(response => {

    }).catch(error => {
      
    })
  }
}
