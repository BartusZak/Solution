import {
  PUT_EMPLOYEE_DETAILS,
  PUT_FEEDBACKS,
  CHANGE_IN_EMPLOYEE_REDUCER,
  CHANGE_EMPLOYEE_FROM_CACHE,
  LOAD_EMPLOYEES_SUCCESS,
  LOAD_EMPLOYEES_FAILURE,
  LOGOUT,
  CHANGE_EMPLOYEE_OPERATION_STATUS,
  CHANGE_EMPLOYEE_STATE,
  LOAD_ASSIGNMENTS,
  CHANGE_EMPLOYEE_SKILLS,
  ADD_NEW_SKILLS_TO_EMPLOYEE,
  CHANGE_CERTIFICATES_GET_STATUS,
  GET_CERTYFICATES,
  ADD_CERTIFICATE_RESULT,
  UPDATE_EMPLOYEE_SKYPE_ID,
  GET_SHARED_EMPLOYEES_FOR_MANAGER,
  CHANGE_SHARED_EMPLOYEES_FOR_MANAGER_STATUS,
  ADD_SHARED_EMPLOYEE_RESULT,
  CHANGE_LOAD_TEAMLEADERS_AND_MANGERS_STATUS,
  GET_TEAMLEADERS_AND_MANAGERS,
  GET_EMPLOYEES_FEEDBACKS,
  CHANGE_LOAD_EMPLOYEES_FEEDBACKS,
  GET_USER_CV,
  CHANGE_GET_EMPLOYEE_ONBOARDS_STATUS,
  GET_EMPLOYEE_ONBOARDS,
  GET_EMPLOYEES_BY_SKILL
} from "../constants";
import { updateObject } from "../services/methods";
const initialState = {
  employees: [],
  currentPage: 1,
  totalPageCount: 1,

  loadEmployeeResult: {status: null},
  employeeFromCache: '',
  employeesCache: {},

  loadFeedbacksResult: {status: null},
  isAddingFeedback: false,

  employeeOperationStatus: null,
  employeeOperationErrors: [],
  employeeResultMessage: "",

  loadAssignmentsStatus: null,
  loadAssignmentsErrors: [],
  loadedAssignments: [],

  changeSkillsStatus: null,
  changeSkillsErrors: [],

  addNewSkillsStatus: null,
  addNewSkillsErrors: [],

  updateSkypeIdResult: {
    resultBlock: null,
    loading: false
  },

  loadCertificatesStatus: null,

  loadAssignmentsErrors: [],
  certificates: [],

  userDownloadCVLink: "",
  getUserCVStatus: null,
  getUserCVErrors: [],

  loadCertificatesErrors: [],
  certificates: [],

  loadSharedEmployeesForManagerStatus: null,
  loadSharedEmployeesForManagerErrors: [],
  sharedEmployeesForManager: [],
  resultBlockAddSharedEmployee: null,

  teamLeadersAndManagers: [],
  loadTeamLeadersAndManagersStatus: null,
  loadTeamLeadersAndManagersErrors: [],

  employeeFeedbacks: [],
  loadEmployeeFeedbacksStatus: null,
  loadEmployeeFedebacksErrors: [],

  onBoards: [],
  loadEmployeesOnBoardsStatus: null,
  loadEmployeesOnBoardsErrors: [],

  employeesBySkill: []
};

export const employeesReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_IN_EMPLOYEE_REDUCER:
      return { ...state, [action.key]: action.value };
    case PUT_FEEDBACKS:
      const employeesCache = {...state.employeesCache};
      const employee = employeesCache[action.employeeId];
      employee.feedbacks = action.feedbacks;
      return {
        ...state, loadFeedbacksResult: action.loadFeedbacksResult, employeesCache
      };
    case CHANGE_EMPLOYEE_FROM_CACHE:
      return {
        ...state, employeeFromCache: action.employeeId
      };
    case PUT_EMPLOYEE_DETAILS:
      return {
        ...state,
          loadEmployeeResult: action.loadEmployeeResult,
          employeesCache: {...state.employeesCache, [action.employee.id]: action.employee }
      };
    case GET_USER_CV:
      return updateObject(state, {
        userDownloadCVLink: action.userDownloadCVLink,
        getUserCVStatus: action.getUserCVStatus,
        getUserCVErrors: action.getUserCVErrors
      });
    case UPDATE_EMPLOYEE_SKYPE_ID:
      return {
        ...state,
        updateSkypeIdResult: {
          resultBlock: action.resultBlock,
          loading: action.loading
        }
      };
    case LOAD_EMPLOYEES_FAILURE:
      return {
        resultBlock: action.resultBlock
      };
    case LOAD_EMPLOYEES_SUCCESS:
      return {
        ...state,
        employees: action.employees.results,
        currentPage: action.employees.currentPage,
        totalPageCount: action.employees.totalPageCount
      };
    case LOGOUT:
      return {
        employees: [],
        currentPage: 1,
        totalPageCount: 1
      };
    case CHANGE_EMPLOYEE_OPERATION_STATUS:
      return updateObject(state, {
        employeeStatus: action.employeeStatus,
        employeeErrors: action.employeeErrors
      });
    case CHANGE_EMPLOYEE_STATE:
      return updateObject(state, {
        employeeOperationStatus: action.employeeOperationStatus,
        employeeOperationErrors: action.employeeOperationErrors,
        employeeResultMessage: action.employeeResultMessage
      });
    case LOAD_ASSIGNMENTS:
      return updateObject(state, {
        loadAssignmentsStatus: action.loadAssignmentsStatus,
        loadAssignmentsErrors: action.loadAssignmentsErrors,
        loadedAssignments: action.loadedAssignments
      });
    case CHANGE_CERTIFICATES_GET_STATUS:
      return updateObject(state, {
        loadCertificatesStatus: action.loadCertificatesStatus,
        loadCertificatesErrors: action.loadCertificatesErrors
      });
    case GET_CERTYFICATES:
      return updateObject(state, { certificates: action.certificates });
    case CHANGE_GET_EMPLOYEE_ONBOARDS_STATUS:
      return updateObject(state, {
        loadEmployeesOnBoardsStatus: action.loadEmployeesOnBoardsStatus,
        loadEmployeesOnBoardsErrors: action.loadEmployeesOnBoardsErrors
      });
    case GET_EMPLOYEE_ONBOARDS:
      return updateObject(state, {
        onBoards: action.onBoards
      });
    case ADD_CERTIFICATE_RESULT:
      return updateObject(state, {
        resultBlockAddCertificate: action.resultBlockAddCertificate
      });
    case CHANGE_SHARED_EMPLOYEES_FOR_MANAGER_STATUS:
      return updateObject(state, {
        loadSharedEmployeesForManagerStatus:
          action.loadSharedEmployeesForManagerStatus,
        loadSharedEmployeesForManagerErrors:
          action.loadSharedEmployeesForManagerErrors
      });
    case GET_SHARED_EMPLOYEES_FOR_MANAGER:
      return updateObject(state, {
        sharedEmployeesForManager: action.sharedEmployeesForManager
      });
    case ADD_SHARED_EMPLOYEE_RESULT:
      return updateObject(state, {
        resultBlockAddSharedEmployee: action.resultBlockAddSharedEmployee
      });
    case CHANGE_LOAD_TEAMLEADERS_AND_MANGERS_STATUS:
      return updateObject(state, {
        loadTeamLeadersAndManagersStatus:
          action.loadTeamLeadersAndManagersStatus,
        loadTeamLeadersAndManagersErrors:
          action.loadTeamLeadersAndManagersErrors
      });
    case GET_TEAMLEADERS_AND_MANAGERS:
      return updateObject(state, {
        teamLeadersAndManagers: action.teamLeadersAndManagers
      });
    case CHANGE_LOAD_EMPLOYEES_FEEDBACKS:
      return updateObject(state, {
        loadEmployeeFeedbacksStatus: action.loadEmployeeFeebacksStatus,
        loadEmployeeFeedbacksErrors: action.loadEmployeeFeedbacksErrors
      });
    case GET_EMPLOYEES_FEEDBACKS:
      return updateObject(state, {
        employeeFeedbacks: action.employeeFeedbacks
      });
    case CHANGE_EMPLOYEE_SKILLS:
      return updateObject(state, {
        changeSkillsStatus: action.changeSkillsStatus,
        changeSkillsErrors: action.changeSkillsErrors
      });
    case ADD_NEW_SKILLS_TO_EMPLOYEE:
      return updateObject(state, {
        addNewSkillsStatus: action.addNewSkillsStatus,
        addNewSkillsErrors: action.addNewSkillsErrors
      });
    case GET_EMPLOYEES_BY_SKILL:
      return updateObject(state, {
        employeesBySkill: action.employeesBySkill
      })
    default:
      return state;
  }
};
