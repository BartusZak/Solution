import {
  LOAD_EMPLOYEES_SUCCESS,
  ASYNC_STARTED,
  ASYNC_ENDED,
  LOAD_EMPLOYEES_FAILURE,
  GET_EMPLOYEE,
  CHANGE_EMPLOYEE_OPERATION_STATUS,
  CHANGE_EMPLOYEE_STATE,
  LOAD_ASSIGNMENTS,
  CHANGE_EMPLOYEE_SKILLS,
  ADD_NEW_SKILLS_TO_EMPLOYEE,
  UPDATE_EMPLOYEE_SKYPE_ID,
  CHANGE_CERTIFICATES_GET_STATUS,
  ADD_CERTIFICATE_RESULT,
  GET_CERTYFICATES,
  GET_USER_CV,
  GET_SHARED_EMPLOYEES_FOR_MANAGER,
  CHANGE_SHARED_EMPLOYEES_FOR_MANAGER_STATUS,
  ADD_SHARED_EMPLOYEE_RESULT,
  CHANGE_LOAD_TEAMLEADERS_AND_MANGERS_STATUS,
  GET_TEAMLEADERS_AND_MANAGERS,
  GET_EMPLOYEES_FEEDBACKS,
  CHANGE_LOAD_EMPLOYEES_FEEDBACKS,
  ADD_EMPLOYEE_ONBOARD,
  CHANGE_GET_EMPLOYEE_ONBOARDS_STATUS,
  GET_EMPLOYEE_ONBOARDS,
  UPDATE_EMPLOYEE_ONBOARD,
  GET_EMPLOYEES_BY_SKILL
} from "../constants";
import WebApi from "../api";
import {
  asyncStarted,
  asyncEnded,
  setActionConfirmationResult
} from "./asyncActions";
import { errorCatcher } from "../services/errorsHandler";
import { populateSkillArrayWithConstData } from "../services/methods";
import moment from "moment";
import { useRequest } from '../api/index';

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

export const updateSkypeResult = (resultBlock, loading) => {
  return {
    type: UPDATE_EMPLOYEE_SKYPE_ID,
    resultBlock,
    loading
  };
};

export const getEmployeeBySkill = employeesBySkill => {
  return {
    type: GET_EMPLOYEES_BY_SKILL,
    employeesBySkill
  };
};

export const getEmployeesBySkillACreator = (skillId) => {
  return dispatch => {
    useRequest('getEmployeesBySkill', skillId)
      .then(response => {
        if (!response.errorOccurred()) {
          dispatch(getEmployeeBySkill(response.extractData()))
        }
      })
  }
}

export const downloadCV = (format, employeeId) => {
  return dispatch => {
    if (format === "word") {
      WebApi.reports.post.wordcv(employeeId).then(() => {
        WebApi.reports.get.cv("CV_" + employeeId + ".docx")
          .then(response => {
            dispatch(
              getUserCv(response.replyBlock.request.responseURL, true, [])
            );
          })
          .catch(error => dispatch(getUserCv("", false, errorCatcher(error))))
      });
    } else {
      WebApi.reports.post.cv(employeeId).then(() => {
        WebApi.reports.get.cv("CV_" + employeeId + ".pdf")
          .then(response => {
            dispatch(
              getUserCv(response.replyBlock.request.responseURL, true, [])
            );
          })
          .catch(error => dispatch(getUserCv("", false, errorCatcher(error))))
      });
    }
  };
};

export const getUserCv = (
  userDownloadCVLink,
  getUserCVStatus,
  getUserCVErrors
) => {
  return {
    type: GET_USER_CV,
    userDownloadCVLink,
    getUserCVStatus,
    getUserCVErrors
  };
};

export const updateSkype = (skypeId, employeeId) => {
  return dispatch => {
    dispatch(updateSkypeResult(null, true));
    useRequest('editSkype', skypeId, employeeId)
      .then(response => {
        if (!response.errorOccurred()) {
          dispatch(updateSkypeResult(response, false)),
            dispatch(clearUpdateSkypeAfterTime(5000));
        }
      })
      .catch(error => {
        dispatch(updateSkypeResult(error, false)),
          dispatch(clearUpdateSkypeAfterTime(5000));
      });
  };
};

const clearUpdateSkypeAfterTime = delay => {
  return dispatch => {
    setTimeout(() => {
      dispatch(updateSkypeResult(null, false));
    }, delay);
  };
};

export const loadEmployees = (page = 1, limit = 25, other = {}) => dispatch => {
  return new Promise((resolve, reject) => {
    const settings = Object.assign(
      {},
      { Limit: limit, PageNumber: page, isDeleted: null },
      other
    );
    dispatch(asyncStarted());
    useRequest('getEmployees', settings)
      .then(response => {
        if (!response.errorOccurred()) {
          const data = response.extractData();
          dispatch(loadEmployeesSuccess(data));
          resolve(data.results);
        }
        dispatch(asyncEnded());
      })
      .catch(error => {
        dispatch(loadEmployeesFailure(error));
        dispatch(asyncEnded());
        reject();
      });

  })
}


export const changeLoadEmployeeFeedbacksStatus = (
  loadEmployeeFeedbacksStatus,
  loadEmployeeFeedbacksErrors
) => {
  return {
    type: CHANGE_LOAD_EMPLOYEES_FEEDBACKS,
    loadEmployeeFeedbacksStatus,
    loadEmployeeFeedbacksErrors
  };
};

export const getEmployeeFeedbacks = employeeFeedbacks => {
  return {
    type: GET_EMPLOYEES_FEEDBACKS,
    employeeFeedbacks
  };
};

export const loadEmployeeFeedbacks = employeeId => {
  return dispatch => {
    useRequest('getFeedbacksByEmployee', employeeId)
      .then(response => {
        if (!response.errorOccurred()) {
          dispatch(getEmployeeFeedbacks(response.extractData()));
          dispatch(changeLoadEmployeeFeedbacksStatus(true, []));
        }
      })
      .catch(error => {
        dispatch(changeLoadEmployeeFeedbacksStatus(false, errorCatcher(error)));
      });
  };
};

export const changeLoadSharedEmployeesForManagerStatus = (
  loadSharedEmployeesForManagerStatus,
  loadSharedEmployeesForManagerErrors
) => {
  return {
    type: CHANGE_SHARED_EMPLOYEES_FOR_MANAGER_STATUS,
    loadSharedEmployeesForManagerStatus,
    loadSharedEmployeesForManagerErrors
  };
};

export const getSharedEmployeesForManager = sharedEmployeesForManager => {
  return {
    type: GET_SHARED_EMPLOYEES_FOR_MANAGER,
    sharedEmployeesForManager
  };
};

export const loadSharedEmployeesForManager = managerId => {
  return dispatch => {
    useRequest('getSharedEmployeesForManager', managerId)
      .then(response => {
        if (!response.errorOccurred()) {
          dispatch(getSharedEmployeesForManager(response.extractData()));
          dispatch(changeLoadSharedEmployeesForManagerStatus(true, []));
        }
      })
      .catch(error => {
        dispatch(
          changeLoadSharedEmployeesForManagerStatus(false, errorCatcher(error))
        );
      });
  };
};

export const addSharedEmployeeResult = resultBlockAddSharedEmployee => {
  return {
    type: ADD_SHARED_EMPLOYEE_RESULT,
    resultBlockAddSharedEmployee
  };
};

export const addSharedEmployee = (
  sharedEmployeeModel,
  destManagerId
) => dispatch => {
  return new Promise((resolve, reject) => {
    useRequest('addSharedEmployee', sharedEmployeeModel)
      .then(response => {
        dispatch(addSharedEmployeeResult(response));

        setTimeout(() => {
          dispatch(addSharedEmployeeResult(null));
          dispatch(loadSharedEmployeesForManager(destManagerId));
          dispatch(loadEmployees(1, 10000));
          resolve();
        }, 2000);
      })
      .catch(errors => {
        dispatch(addSharedEmployeeResult(errors));
        setTimeout(() => {
          dispatch(addSharedEmployeeResult(null));

          const keys = Object.keys(
            errors.replyBlock.data.errorObjects[0].errors
          );
          const error = errors.replyBlock.data.errorObjects[0].errors[keys[0]];

          reject(error);
        }, 2000);
        throw error;
      });
  });
};

export const deleteSharedEmployee = (
  sharedEmployeeId,
  destManagerId
) => dispatch => {
  return new Promise((resolve, reject) => {
    useRequest('deleteSharedEmployee', sharedEmployeeId)
      .then(response => {
        dispatch(setActionConfirmationResult(response));
        dispatch(loadSharedEmployeesForManager(destManagerId));
        resolve();
      })
      .catch(errors => {
        dispatch(setActionConfirmationResult(error));

        const keys = Object.keys(errors.replyBlock.data.errorObjects[0].errors);
        const error = errors.replyBlock.data.errorObjects[0].errors[keys[0]];

        reject(error);
      });
  });
};

export const changeLoadTeamLeadersAndManagers = (
  loadTeamLeadersAndManagersStatus,
  loadTeamLeadersAndManagersErrors
) => {
  return {
    type: CHANGE_LOAD_TEAMLEADERS_AND_MANGERS_STATUS,
    loadTeamLeadersAndManagersStatus,
    loadTeamLeadersAndManagersErrors
  };
};

export const getTeamLeadersAndManagers = teamLeadersAndManagers => {
  return {
    type: GET_TEAMLEADERS_AND_MANAGERS,
    teamLeadersAndManagers
  };
};

export const loadTeamLeadersAndManagers = () => {
  return dispatch => {
    useRequest('getEmployeesAndManagers')
      .then(response => {
        if (!response.errorOccurred()) {
          dispatch(getTeamLeadersAndManagers(response.extractData()));
          dispatch(changeLoadTeamLeadersAndManagers(true, []));
        }
      })
      .catch(error => {
        dispatch(changeLoadTeamLeadersAndManagers(false, errorCatcher(error)));
      });
  };
};

export const changeLoadCertificatesStatus = (
  loadCertificatesStatus,
  loadCertificatesErrors
) => {
  return {
    type: CHANGE_CERTIFICATES_GET_STATUS,
    loadCertificatesStatus,
    loadCertificatesErrors
  };
};

export const getCertificates = certificates => {
  return {
    type: GET_CERTYFICATES,
    certificates
  };
};

export const loadCertificates = employeeId => {
  return dispatch => {
    useRequest("getCertificates", employeeId)
      .then(response => {
        if (!response.errorOccurred()) {
          dispatch(getCertificates(response.extractData()));
          dispatch(changeLoadCertificatesStatus(true, []));
        }
      })
      .catch(error => {
        dispatch(changeLoadCertificatesStatus(false, errorCatcher(error)));
      });
  };
};

export const changeEmployeeOperationStatus = (
  employeeStatus,
  employeeErrors
) => {
  return {
    type: CHANGE_EMPLOYEE_OPERATION_STATUS,
    employeeStatus,
    employeeErrors
  };
};

export const getEmployee = employee => {
  return { type: GET_EMPLOYEE, employee };
};

export const getEmployeePromise = employeeId => dispatch => {
  return new Promise(resolve => {
    useRequest('getEmployeeById', employeeId)
      .then(response => {
        const dtoObject = { ...response.replyBlock.data.dtoObject };
        let quarterTalks = [...dtoObject.quarterTalks];

        quarterTalks.forEach(function (part, index) {
          if (part.plannedTalkDate)
            quarterTalks[index].plannedTalkDate = moment(
              part.plannedTalkDate
            ).format("YYYY-MM-DD HH:mm");
          if (part.aswerQuestionDate)
            quarterTalks[index].aswerQuestionDate = moment(
              part.aswerQuestionDate
            ).format("YYYY-MM-DD HH:mm");
        });
        dtoObject.quarterTalks = quarterTalks;

        dispatch(getEmployee(dtoObject));
        dispatch(changeEmployeeOperationStatus(true, []));
        resolve(dtoObject);
      })
      .catch(error => {
        dispatch(changeEmployeeOperationStatus(false, errorCatcher(error)));
        dispatch(clearAfterTime(5000));
      });
  });
};

const clearAfterTime = delay => {
  return dispatch => {
    setTimeout(() => {
      dispatch(changeEmployeeOperationStatus(null, []));
    }, delay);
  };
};

export const deleteEmployee = employeeId => {
  return dispatch => {
    useRequest('deleteEmployee', employeeId)
      .then(response => {
        dispatch(getEmployeePromise(employeeId));
      })
      .catch(error => {
        dispatch(changeEmployeeOperationStatus(false, errorCatcher(error)));
        dispatch(clearAfterTime(5000));
      });
  };
};

export const deleteEmployeeOnList = (
  employeeId,
  pageChange,
  setActionConfirmationResult
) => {
  return dispatch => {
    useRequest('deleteEmployee', employeeId)
      .then(response => {
        setActionConfirmationResult(response);
        pageChange();
      })
      .catch(error => {
        setActionConfirmationResult(error);
      });
  };
};

export const reActivateEmployeeOnList = (
  employeeId,
  pageChange,
  setActionConfirmationResult
) => {
  return dispatch => {
    useRequest('reactivateEmployee', employeeId)
      .then(response => {
        setActionConfirmationResult(response);
        pageChange();
      })
      .catch(error => {
        setActionConfirmationResult(error);
      });
  };
};

export const reactivateEmployee = employeeId => {
  return dispatch => {
    useRequest('reactivateEmployee', employeeId)
      .then(response => {
        dispatch(getEmployeePromise(employeeId)).then(secondResponse => {
          dispatch(loadAssignmentsACreator(employeeId));
        });
      })
      .catch(error => {
        dispatch(changeEmployeeState(false, errorCatcher(error), ""));
        dispatch(clearAfterTimeStatus(5000));
      });
  };
};

export const editStatistics = (
  employeeId,
  seniority,
  capacity,
  currentClouds
) => {
  return dispatch => {
    const model = {
      seniority: seniority,
      capacity: capacity,
      cloudsIds: currentClouds
    };
    useRequest('editEmployee', employeeId, model)
      .then(response => {
        dispatch(getEmployeePromise(employeeId));
      })
      .catch(error => {
        dispatch(changeEmployeeOperationStatus(false, errorCatcher(error)));
        dispatch(clearAfterTime(5000));
      });
  };
};

export const changeEmployeeState = (
  employeeOperationStatus,
  employeeOperationErrors,
  employeeResultMessage
) => {
  return {
    type: CHANGE_EMPLOYEE_STATE,
    employeeOperationStatus,
    employeeOperationErrors,
    employeeResultMessage
  };
};

export const activateEmployeeOnList = (
  azureAdId,
  seniority,
  capacity,
  pageChange,
  setActionConfirmationResult
) => {
  return dispatch => {
    const model = {
      azureAdId,
      seniority: seniority,
      capacity: capacity
    };

    useRequest('addEmployee', model)
      .then(response => {
        setActionConfirmationResult(response);
        pageChange();
      })
      .catch(error => {
        setActionConfirmationResult(error);
      });
  };
};

export const activateEmployee = (employeeId, seniority, capacity) => {
  return dispatch => {
    const model = {
      id: employeeId,
      seniority: seniority,
      capacity: capacity
    };

    useRequest('addEmployee', model)
      .then(response => {
        dispatch(getEmployeePromise(employeeId)).then(() => {
          dispatch(loadAssignmentsACreator(employeeId));
        });
      })
      .catch(error => {
        dispatch(changeEmployeeState(false, errorCatcher(error), ""));
        dispatch(clearAfterTimeStatus(5000));
      });
  };
};
const clearAfterTimeStatus = delay => {
  return dispatch => {
    setTimeout(() => {
      dispatch(changeEmployeeState(null, [], ""));
    }, delay);
  };
};

export const loadAssignments = (
  loadAssignmentsStatus,
  loadAssignmentsErrors,
  loadedAssignments
) => {
  return {
    type: LOAD_ASSIGNMENTS,
    loadAssignmentsStatus,
    loadAssignmentsErrors,
    loadedAssignments
  };
};

export const loadAssignmentsACreator = employeeId => dispatch => {
  return new Promise((resolve, reject) => {
    useRequest('getAssignmentByEmployee', employeeId)
      .then(response => {
        dispatch(
          loadAssignments(true, [], response.replyBlock.data.dtoObjects)
        );
        resolve(response.replyBlock.data.dtoObjects);
      })
      .catch(error => {
        dispatch(loadAssignments(false, errorCatcher(error), []));
        reject(response.replyBlock.data.dtoObjects);
      });
  });
};

const clearAfterTimeByFuncRef = (funcRef, delay, ...params) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(funcRef(...params));
    }, delay);
  };
};

export const changeEmployeeSkills = (
  changeSkillsStatus,
  changeSkillsErrors
) => {
  return {
    type: CHANGE_EMPLOYEE_SKILLS,
    changeSkillsStatus,
    changeSkillsErrors
  };
};

export const changeEmployeeSkillsACreator = (employeeId, currentArray) => {
  return dispatch => {
    const skillsArray = [];
    for (let key in currentArray) {
      skillsArray.push({
        skillId: currentArray[key].skill.id,
        skillLevel: currentArray[key].skill.level,
        yearsOfExperience: currentArray[key].skill.yearsOfExperience
      });
    }
    useRequest('editSkills', employeeId, skillsArray)
      .then(response => {
        dispatch(changeEmployeeSkills(true, []));
        dispatch(clearAfterTimeByFuncRef(changeEmployeeSkills, 1500, null, []));
      })
      .catch(error => {
        dispatch(changeEmployeeSkills(false, errorCatcher(error)));
        dispatch(clearAfterTimeByFuncRef(changeEmployeeSkills, 5000, null, []));
      });
  };
};

export const addNewSkillsToEmployee = (
  addNewSkillsStatus,
  addNewSkillsErrors
) => {
  return {
    type: ADD_NEW_SKILLS_TO_EMPLOYEE,
    addNewSkillsStatus,
    addNewSkillsErrors
  };
};

export const addNewSkillsToEmployeeACreator = (
  oldSkills,
  newSkills,
  employeeId
) => {
  return dispatch => {
    let model = [];
    for (let key in oldSkills) {
      model.push({
        skillId: oldSkills[key].skill.id.toString(),
        skillLevel: oldSkills[key].skill.level,
        yearsOfExperience: oldSkills[key].skill.yearsOfExperience
      });
    }
    model = model.concat(populateSkillArrayWithConstData(newSkills));

    useRequest('editSkills', employeeId, model)
      .then(response => {
        dispatch(addNewSkillsToEmployee(true, []));
        dispatch(getEmployeePromise(employeeId));
      })
      .catch(error => {
        dispatch(addNewSkillsToEmployee(false, errorCatcher(error)));
      });
  };
};

export const addCertificateResult = resultBlockAddCertificate => {
  return {
    type: ADD_CERTIFICATE_RESULT,
    resultBlockAddCertificate
  };
};

export const addCertificate = (certificate, userId) => {
  return dispatch => {
    useRequest('addCertificate', certificate)
      .then(response => {
        dispatch(addCertificateResult(response));

        setTimeout(() => {
          dispatch(addCertificateResult(null));
          dispatch(loadCertificates(userId));
        }, 2000);
      })
      .catch(error => {
        dispatch(addCertificateResult(errorCatcher(error)));
        setTimeout(() => {
          dispatch(addCertificateResult(null));
        }, 2000);
        throw error;
      });
  };
};

export const deleteCertificate = (certificateId, employeeId) => {
  return dispatch => {
    useRequest('deleteCertificate', certificateId)
      .then(response => {
        dispatch(setActionConfirmationResult(response));
        dispatch(loadCertificates(employeeId));
      })
      .catch(error => {
        dispatch(setActionConfirmationResult(error));
      });
  };
};

export const editCertificate = (certificateId, newCertificate, userId) => {
  return dispatch => {
    useRequest('editCertificate', certificateId, newCertificate)
      .then(response => {
        dispatch(addCertificateResult(response));

        setTimeout(() => {
          dispatch(addCertificateResult(null));
          dispatch(loadCertificates(userId));
        }, 2000);
      })
      .catch(error => {
        dispatch(addCertificateResult(errorCatcher(error)));
        setTimeout(() => {
          dispatch(addCertificateResult(null));
        }, 2000);
        throw error;
      });
  };
};

export const getEmployeeOnBoards = onBoards => {
  return {
    type: GET_EMPLOYEE_ONBOARDS,
    onBoards
  };
};

export const changeGetEmployeeOnBoardsStatus = (getEmployeeOnBoardStatus, getEmployeeOnBoardErrors) => {
  return { type: CHANGE_GET_EMPLOYEE_ONBOARDS_STATUS, getEmployeeOnBoardStatus, getEmployeeOnBoardErrors };
};

export const loadEmployeeOnBoardsACreator = employeeId => {
  return dispatch => {
    useRequest('getOnBoardsByEmployeeId', employeeId)
      .then(response => {
        if (!response.errorOccurred()) {
          dispatch(getEmployeeOnBoards(response.extractData()));
          dispatch(changeGetEmployeeOnBoardsStatus(true, []));
        }
      })
      .catch(error => {
        dispatch(changeGetEmployeeOnBoardsStatus(false, errorCatcher(error)));
      });
  };
};

export const deleteOnBoard = (onBoardId) => dispatch => {
  return new Promise((resolve, reject) => {
    useRequest('deleteOnBoardEmployee', onBoardId)
      .then(response => {
        dispatch(setActionConfirmationResult(response));
        resolve()
      })
      .catch(error => {
        dispatch(setActionConfirmationResult(error));
        reject()
      });
  });
};

export const addEmployeeOnBoard = (addEmployeeOnBoardStatus, addEmployeeOnBoardErrors) => {
  return { type: ADD_EMPLOYEE_ONBOARD, addEmployeeOnBoardStatus, addEmployeeOnBoardErrors };
};

export const addEmployeeOnBoardACreator = (onBoardModel) => dispatch => {
  return new Promise((resolve, reject) => {
    useRequest('addOnBoardEmployee', onBoardModel)
      .then(response => {
        dispatch(addEmployeeOnBoard(true, []));
        resolve(response.replyBlock.data.dtoObject);
      })
      .catch(error => {
        dispatch(addEmployeeOnBoard(false, errorCatcher(error)));
        reject(errorCatcher(error));
      });
  });
};

export const updateEmployeeOnBoard = (updateEmployeeOnBoardStatus, updateEmployeeOnBoardErrors) => {
  return { type: UPDATE_EMPLOYEE_ONBOARD, updateEmployeeOnBoardStatus, updateEmployeeOnBoardErrors };
};

export const updateEmployeeOnBoardACreator = (onBoardModel, onBoardId) => dispatch => {
  return new Promise((resolve, reject) => {
    useRequest('editOnBoardEmployee', onBoardId, onBoardModel)
      .then(response => {
        dispatch(updateEmployeeOnBoard(true, []));
        resolve(response.replyBlock.data.dtoObject);
      })
      .catch(error => {
        dispatch(updateEmployeeOnBoard(false, errorCatcher(error)));
        reject(errorCatcher(error));
      });
  });
};

