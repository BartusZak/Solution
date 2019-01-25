import {
  LOAD_PROJECTS_SUCCESS,
  ADD_EMPLOYEE_TO_PROJECT,
  ADD_FEEDBACK,
  GET_FEEDBACKS,
  DELETE_FEEDBACK,
  EDIT_FEEDBACK,
  GET_SUGGEST_EMPLOYEES,
  CHANGE_GET_SUGGEST_EMPLOYEES_STATUS,
  EDIT_EMPLOYEE_ASSIGNMENT,
  DELETE_EMPLOYEE_ASSIGNMENT,
  UPDATE_PROJECT,
  SET_PROJECT_DATA,
  ADD_PHASE,
  CHANGE_PROJECT_STATUS,
  ADD_OWNER,
  PUT_SKILLS_INTO_PROJECT
} from "../constants";
import WebApi from "../api";
import {
  asyncStarted,
  asyncEnded
} from "./asyncActions";
import { errorCatcher } from "../services/errorsHandler";
import { getRandomColor } from "../services/methods";
import { useRequest } from '../api/index';
import { removeInformationsFromDate } from '../services/transform-data-service';
import { active, closed } from '../constants';
export const loadProjectsSuccess = (projects, resultBlock) => {
  return {
    type: LOAD_PROJECTS_SUCCESS,
    projects,
    resultBlock
  };
};

export const loadProjects = (
  page = 1,
  limit = 15,
  other = { isDeleted: false }
) => {
  other.isDeleted =
    other.ProjectFilter && other.ProjectFilter.status && !other.isDeleted
      ? false
      : other.isDeleted;
  const settings = Object.assign(
    {},
    {
      Limit: limit,
      PageNumber: page
    },
    other
  );
  return dispatch => {
    dispatch(asyncStarted());
    WebApi.projects.post
      .list(settings)
      .then(response => {
        if (!response.errorOccurred()) {
          dispatch(loadProjectsSuccess(response.extractData()), response);
        }
        dispatch(asyncEnded());
      })
      .catch(error => {
        dispatch(asyncEnded());
      });
  };
};

export const addEmployeeToProject = (
  addEmployeeToProjectStatus,
  addEmployeeToProjectErrors
) => {
  return {
    type: ADD_EMPLOYEE_TO_PROJECT,
    addEmployeeToProjectStatus,
    addEmployeeToProjectErrors
  };
};

export const addEmployeeToProjectACreator = (
  empId,
  projectId,
  strDate,
  endDate,
  role,
  assignedCapacity,
  responsibilites,
  onlyActiveAssignments
) => dispatch => {
  const assignmentModel = {
    employeeId: empId,
    projectId: projectId,
    startDate: strDate,
    endDate: endDate,
    role: role,
    assignedCapacity: assignedCapacity / 10,
    responsibilities: responsibilites
  };
  useRequest("addAssignment", assignmentModel)
    .then(response => {
      dispatch(addEmployeeToProject(true, []));
      dispatch(getProjectACreator(projectId, onlyActiveAssignments));
    })
    .catch(error => {
      dispatch(addEmployeeToProject(false, errorCatcher(error)));
    })
    .then(
      dispatch(clearAfterTimeByFuncRef(addEmployeeToProject, 5000, null, []))
    );
};

export const editEmployeeAssignment = (
  addEmployeeToProjectStatus,
  addEmployeeToProjectErrors
) => {
  return {
    type: EDIT_EMPLOYEE_ASSIGNMENT,
    addEmployeeToProjectStatus,
    addEmployeeToProjectErrors
  };
};

export const editEmployeeAssignmentACreator = (
  startDate,
  endDate,
  role,
  assignedCapacity,
  responsibilites,
  assignmentId,
  onlyActiveAssignments,
  projectId
) => dispatch => {
  const assignmentModel = {
    startDate: startDate,
    endDate: endDate,
    role: role,
    assignedCapacity: assignedCapacity / 10,
    responsibilities: responsibilites
  };
  useRequest("editAssignment", assignmentId, assignmentModel)
    .then(response => {
      dispatch(editEmployeeAssignment(true, []));
      dispatch(getProjectACreator(projectId, onlyActiveAssignments));
    })
    .catch(error => {
      dispatch(editEmployeeAssignment(false, errorCatcher(error)));
    })
    .then(
      dispatch(clearAfterTimeByFuncRef(editEmployeeAssignment, 5000, null, []))
    );
};

export const deleteEmployeeAssignment = (
  addEmployeeToProjectStatus,
  addEmployeeToProjectErrors
) => {
  return {
    type: DELETE_EMPLOYEE_ASSIGNMENT,
    addEmployeeToProjectStatus,
    addEmployeeToProjectErrors
  };
};

export const deleteEmployeeAssignmentACreator = (
  assignmentId,
  projectId,
  onlyActiveAssignments
) => dispatch => {
  useRequest("deleteAssignment", assignmentId)
    .then(response => {
      dispatch(deleteEmployeeAssignment(true, []));
      dispatch(getProjectACreator(projectId, onlyActiveAssignments));
    })
    .catch(error => {
      dispatch(deleteEmployeeAssignment(false, errorCatcher(error)));
    })
    .then(
      dispatch(clearAfterTimeByFuncRef(deleteEmployeeAssignment, 5000, null, []))
    );
};

const clearAfterTimeByFuncRef = (funcRef, delay, ...params) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(funcRef(...params));
    }, delay);
  };
};

export const addFeedback = (addFeedbackStatus, addFeedbackErrors) => {
  return {
    type: ADD_FEEDBACK,
    addFeedbackStatus,
    addFeedbackErrors
  };
};

export const addFeedbackACreator = (projectId, employeeId, description, onlyActiveAssignments) => {
  return dispatch => {
    const objectToSend = {
      projectId: projectId,
      employeeId: employeeId,
      description: description
    };
    useRequest('addFeedback', objectToSend)
      .then(response => {
        dispatch(addFeedback(true, []));
        setTimeout(() => dispatch(addFeedback(null, [])), 3000);
        dispatch(getProjectACreator(projectId, onlyActiveAssignments));
      })
      .catch(error => {
        dispatch(addFeedback(false, errorCatcher(error)));
      });
  };
};

export const getFeedbacks = (
  loadedFeedbacks,
  loadFeedbackStatus,
  loadFeedbackErrors
) => {
  return {
    type: GET_FEEDBACKS,
    loadedFeedbacks,
    loadFeedbackStatus,
    loadFeedbackErrors
  };
};

export const getFeedbacksACreator = (employeeId, projectId) => {
  return dispatch => {
    useRequest('getFeedbacksbyEmployeeInProject', employeeId, projectId)
    .then(response => {
      dispatch(getFeedbacks(response.replyBlock.data.dtoObjects, true, []));
    })
    .catch(error => {
      dispatch(getFeedbacks([], false, errorCatcher(error)));
    });
  };
};

export const deleteFeedback = (
  deleteFeedbackStatus,
  deleteFeedbackErrors
) => {
  return {
    type: DELETE_FEEDBACK,
    deleteFeedbackStatus,
    deleteFeedbackErrors
  };
};

export const deleteFeedbackACreator = (feedbackId, projectId, onlyActiveAssignments) => dispatch => {
  return new Promise((resolve, reject) => {
    useRequest('deleteFeedback', feedbackId)
    .then((response) => {
      dispatch(deleteFeedback(true, []));
      setTimeout(() => dispatch(deleteFeedback(null, [])), 3000);
      dispatch(getProjectACreator(projectId, onlyActiveAssignments));
      resolve();
    })
    .catch(error => {
      dispatch(deleteFeedback(false, errorCatcher(error)));
      reject();
    });
  });
};

export const editFeedback = (editFeedbackStatus, editFeedbackErrors) => {
  return {
    type: EDIT_FEEDBACK,
    editFeedbackStatus,
    editFeedbackErrors
  };
};

export const editFeedbackACreator = (feedbackId, description, projectId, onlyActiveAssignments) => {
  return dispatch => {
    useRequest('editFeedback', feedbackId, description)
    .then(response => {
      dispatch(editFeedback(true, []));
      setTimeout(() => dispatch(editFeedback(null, [])), 3000);
      dispatch(getProjectACreator(projectId, onlyActiveAssignments));
    })
    .catch(error => {
      dispatch(editFeedback(false, errorCatcher(error)));
    })

  };
};

export const getSuggestEmployeesStatus = (
  getSuggestEmployeesStatus,
  getSuggestEmployeesError
) => {
  return {
    type: CHANGE_GET_SUGGEST_EMPLOYEES_STATUS,
    getSuggestEmployeesStatus,
    getSuggestEmployeesError
  };
};

export const getSuggestEmployees = suggestEmployees => {
  return { type: GET_SUGGEST_EMPLOYEES, suggestEmployees };
};

export const getSuggestEmployeesACreator = projectId => {
  return dispatch => {
    WebApi.projects.get
      .suggestEmployees(projectId)
      .then(response => {
        if (!response.errorOccurred()) {
          dispatch(getSuggestEmployees(response.extractData()));
          dispatch(getSuggestEmployeesStatus(true, []));
        }
      })
      .catch(error => {
        dispatch(getSuggestEmployeesStatus(false, errorCatcher(error)));
      });
  };
};

export const setProjectData = (project, projectResult ) => ({ type: SET_PROJECT_DATA, project, projectResult });
export const updateProject = project => ({ type: UPDATE_PROJECT, project });
export const addPhase = phase => ({ type: ADD_PHASE, phase });
export const changeProjectStatus = (status, isDeleted) => ({ type: CHANGE_PROJECT_STATUS, status, isDeleted });
export const addOwner = owner => ({ type: ADD_OWNER, owner });
export const putSkillsIntoProject = skills => ({ type: PUT_SKILLS_INTO_PROJECT, skills });

export const getProject = id => dispatch =>
  useRequest('getProject', id)
    .then(res => {
      const project = res.extractData();
      project.startDate = removeInformationsFromDate(project.startDate);
      project.estimatedEndDate = removeInformationsFromDate(project.estimatedEndDate);
      project.team = project.team.map(member => {
        const newMember = { ...member, startDate: removeInformationsFromDate(member.startDate) };
        if (newMember.endDate) newMember.endDate = removeInformationsFromDate(member.endDate);
        return newMember;
      });
      project.skills = project.skills.map(skill => ({ ...skill, color: getRandomColor() }));
      project.projectPhases = project.projectPhases.map(phase => {
        return { ...phase, startDate: removeInformationsFromDate(phase.startDate),
          estimatedEndDate: removeInformationsFromDate(phase.estimatedEndDate) }
      });
      dispatch(setProjectData(project, { status: true }));
    }).catch(() => dispatch(setProjectData(null, { status: false })))

export const addProject = (model, succ, err) =>
  useRequest('addProject', model)
    .then(response => succ(response.extractData().id))
    .catch(() => err());

export const editProject = (project, succ, err) => dispatch =>
  useRequest('editProject', project, project.id)
  .then(() => { dispatch(updateProject(project)); succ(); } )
  .catch(() => err());

export const editSkillsInProject = (id, skills, succ, err) => dispatch => {
  useRequest('editSkillsInProject', id, skills)
  .then(() => { dispatch(putSkillsIntoProject(skills)); succ(); })
  .catch(() => err());
}

export const addProjectPhase = (model, succ, err) => dispatch =>
  useRequest('addProjectPhase', model)
  .then(res => {
    const id = res.extractData().id;
    const phase = { ...model, id, endDate: null,
      team: [], owners: null, status: 0, skills: [], isDeleted: false, sharedProjects: []};
    dispatch(addPhase(phase));
    succ();
   })
  .catch(() => err());

export const deleteProject = (id, succ, err) => dispatch =>
  useRequest('deleteProject', id)
    .then(() => { dispatch(changeProjectStatus(null, true)); succ();})
    .catch(() => err())
export const reactivateProject = (id, succ, err) => dispatch =>
  useRequest('reactivateProject', id)
    .then(() => { dispatch(changeProjectStatus(active, false)); succ(); })
    .catch(() => err());
export const closeProject = (id, succ, err) => dispatch =>
   useRequest('closeProject', id)
    .then(() => { dispatch(changeProjectStatus(closed, false)); succ(); })
    .catch(() => err());
export const addOwnerToProject = (projectId, employee, succ, err) => dispatch =>
   useRequest('addOwnerToProject', projectId, [employee.id])
    .then(() => { dispatch(addOwner({ id: employee.id, fullName: employee.fullName })); succ(); })
    .catch(() => err());
export const assignEmployeeIntoProject = (model, succ, err) => dispatch => {
  useRequest('assignEmployeeToProject', model)
    .then(res => {
      console.log(res)
      succ();
    })
    .catch(() => {
      console.log(err)
      err();
    })
}
