import {
  LOAD_PROJECTS_SUCCESS,
  LOGOUT,
  SET_PROJECT_DATA,
  ADD_EMPLOYEE_TO_PROJECT,
  ADD_FEEDBACK,
  GET_FEEDBACKS,
  EDIT_FEEDBACK,
  DELETE_FEEDBACK,
  CHANGE_PROJECT_SKILLS,
  ADD_SKILLS_TO_PROJECT,
  GET_SUGGEST_EMPLOYEES,
  CHANGE_GET_SUGGEST_EMPLOYEES_STATUS,
  EDIT_EMPLOYEE_ASSIGNMENT,
  DELETE_EMPLOYEE_ASSIGNMENT,
  UPDATE_PROJECT,
  ADD_PHASE,
  ADD_OWNER,
  CHANGE_PROJECT_STATUS
} from "../constants";
import { updateObject } from "../services/methods";
const initialState = {
  projects: [],
  currentPage: 1,
  totalPageCount: 1,
  clients: [],
  resultBlock: null,

  project: null, projectResult: {status: null},

  addEmployeeToProjectStatus: null,
  addEmployeeToProjectErrors: [],

  addFeedbackStatus: null,
  addFeedbackErrors: [],

  loadedFeedback: [],
  getMyFeedbackStatus: null,
  getMyFeedbackErrors: [],

  loadedFeedbacks: [],
  loadFeedbackStatus: null,
  loadFeedbackErrors: [],

  deleteFeedbackStatus: null,
  deleteFeedbackErrors: [],

  editFeedbackStatus: null,
  editFeedbackErrors: [],

  changeProjectSkillsStatus: null,
  changeProjectSkillsErrors: [],

  addSkillsToProjectStatus: null,
  addSkillsToProjectErrors: [],

  getSuggestEmployeesStatus: null,
  getSuggestEmployeesError: [],

  suggestEmployees: {}
};

export const projectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PROJECT:
      const responsiblePerson = {...action.project.responsiblePerson};
      responsiblePerson.client = action.project.client;
      return {
        ...state,
        projects: state.projects.map(p => {
          return p.id === action.project.id ? {...action.project} : p;
        }),
        project: state.project ? {...state.project, ...action.project, responsiblePerson} : null
      };
    case ADD_PHASE:
      return {
        ...state, project: {...state.project, projectPhases: [...state.project.projectPhases, action.phase]}
      };
    case CHANGE_PROJECT_STATUS:
      const project = { ...state.project, isDeleted: action.isDeleted };
      if (action.status !== null)
        project.status = action.status;
      return { ...state, project };
    case SET_PROJECT_DATA:
      return {
        ...state, project: action.project, projectResult: action.projectResult
      }
    case ADD_OWNER:
      console.log(action.owner);
      return {
        ...state, project: {...state.project, owners: [action.owner, ...state.project.owners] }
      };
    case LOAD_PROJECTS_SUCCESS:
      return updateObject(state, {
        projects: action.projects.results,
        currentPage: action.projects.currentPage,
        totalPageCount: action.projects.totalPageCount,
        resultBlock: action.resultBlock
      });
    case LOGOUT:
      return {
        projects: [],
        currentPage: 1,
        totalPageCount: 1
      };
    case ADD_EMPLOYEE_TO_PROJECT:
      return updateObject(state, {
        addEmployeeToProjectStatus: action.addEmployeeToProjectStatus,
        addEmployeeToProjectErrors: action.addEmployeeToProjectErrors
      });

    case EDIT_EMPLOYEE_ASSIGNMENT:
      return updateObject(state, {
        addEmployeeToProjectStatus: action.addEmployeeToProjectStatus,
        addEmployeeToProjectErrors: action.addEmployeeToProjectErrors
      })

    case DELETE_EMPLOYEE_ASSIGNMENT:
      return updateObject(state, {
        addEmployeeToProjectStatus: action.addEmployeeToProjectStatus,
        addEmployeeToProjectErrors: action.addEmployeeToProjectErrors
      })

    case ADD_FEEDBACK:
      return updateObject(state, {
        addFeedbackStatus: action.addFeedbackStatus,
        addFeedbackErrors: action.addFeedbackErrors
      });

    case GET_FEEDBACKS:
      return updateObject(state, {
        loadedFeedbacks: action.loadedFeedbacks,
        loadFeedbackStatus: action.loadFeedbackStatus,
        loadFeedbackErrors: action.loadFeedbackErrors
      });

    case EDIT_FEEDBACK:
      return updateObject(state, {
        editFeedbackStatus: action.editFeedbackStatus,
        editFeedbackErrors: action.editFeedbackErrors
      });

    case DELETE_FEEDBACK:
      return updateObject(state, {
        deleteFeedbackStatus: action.deleteFeedbackStatus,
        deleteFeedbackErrors: action.deleteFeedbackErrors
      });

    case CHANGE_PROJECT_SKILLS:
      return updateObject(state, {
        changeProjectSkillsStatus: action.changeProjectSkillsStatus,
        changeProjectSkillsErrors: action.changeProjectSkillsErrors
      });

    case ADD_SKILLS_TO_PROJECT:
      return updateObject(state, {
        addSkillsToProjectStatus: action.addSkillsToProjectStatus,
        addSkillsToProjectErrors: action.addSkillsToProjectErrors
      });
    case GET_SUGGEST_EMPLOYEES:
      return updateObject(state, { suggestEmployees: action.suggestEmployees });
    case CHANGE_GET_SUGGEST_EMPLOYEES_STATUS:
      return updateObject(state, {
        getSuggestEmployeesStatus: action.getSuggestEmployeesStatus,
        getSuggestEmployeesError: action.getSuggestEmployeesError
      });
    default:
      return state;
  }
};
