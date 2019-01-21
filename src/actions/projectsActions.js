import {
  LOAD_PROJECTS_SUCCESS,
  ADD_EMPLOYEE_TO_PROJECT,
  CHANGE_PROJECT_SKILLS,
  ADD_FEEDBACK,
  GET_FEEDBACKS,
  DELETE_FEEDBACK,
  EDIT_FEEDBACK,
  ADD_SKILLS_TO_PROJECT,
  GET_SUGGEST_EMPLOYEES,
  CHANGE_GET_SUGGEST_EMPLOYEES_STATUS,
  EDIT_EMPLOYEE_ASSIGNMENT,
  DELETE_EMPLOYEE_ASSIGNMENT,
  UPDATE_PROJECT,
  SET_PROJECT_DATA,
  ADD_PHASE,
  CHANGE_PROJECT_STATUS,
  ADD_OWNER
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
  WebApi.assignments
    .post(assignmentModel)
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
  WebApi.assignments
    .put(assignmentId, assignmentModel)
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
  WebApi.assignments
    .delete(assignmentId)
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
    WebApi.feedbacks.post
      .feedback(objectToSend)
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
    WebApi.feedbacks.get
    .byEmployeeInProject(employeeId, projectId)
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
    WebApi.feedbacks.delete
    .deleteById(feedbackId)
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
    WebApi.feedbacks.put
    .feedback(feedbackId, description)
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

export const changeProjectSkills = (
  changeProjectSkillsStatus,
  changeProjectSkillsErrors
) => {
  return {
    type: CHANGE_PROJECT_SKILLS,
    changeProjectSkillsStatus,
    changeProjectSkillsErrors
  };
};
export const changeProjectSkillsACreator = (
  projectId,
  skills,
  onlyActiveAssignments
) => {
  return dispatch => {
    const skillsToSend = [];
    let somethingChanged = false;
    for (let key in skills) {
      if (skills[key].startValue !== skills[key].obj.skillLevel) {
        skillsToSend.push({
          skillId: skills[key].obj.skillId,
          skillLevel: skills[key].startValue
        });
        somethingChanged = true;
      } else {
        skillsToSend.push({
          skillId: skills[key].obj.skillId,
          skillLevel: skills[key].obj.skillLevel
        });
      }
    }

    if (somethingChanged) {
      WebApi.projects.put
        .skills(projectId, skillsToSend)
        .then(response => {
          dispatch(changeProjectSkills(true, []));
          dispatch(getProjectACreator(projectId, onlyActiveAssignments));
        })
        .catch(error => {
          dispatch(changeProjectSkills(false, errorCatcher(error)));
        });
    } else
      dispatch(changeProjectSkills(false, ["Nie zmieniono żadnej wartości"]));
  };
};

export const addSkillsToProject = (
  addSkillsToProjectStatus,
  addSkillsToProjectErrors
) => {
  return {
    type: ADD_SKILLS_TO_PROJECT,
    addSkillsToProjectStatus,
    addSkillsToProjectErrors
  };
};

export const addSkillsToProjectACreator = (
  projectId,
  currentAddedSkills,
  onlyActiveAssignments
) => {
  return dispatch => {
    const skillsToSend = [];
    for (let key in currentAddedSkills) {
      const whichIdIsExist = currentAddedSkills[key].obj.id
        ? currentAddedSkills[key].obj.id
        : currentAddedSkills[key].obj.skillId;
      skillsToSend.push({
        skillId: whichIdIsExist,
        skillLevel: currentAddedSkills[key].startValue
      });
    }
    WebApi.projects.put
      .skills(projectId, skillsToSend)
      .then(response => {
        dispatch(addSkillsToProject(true, []));
        dispatch(getProjectACreator(projectId, onlyActiveAssignments));
      })
      .catch(error => {
        dispatch(addSkillsToProject(false, errorCatcher(error)));
      });
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
