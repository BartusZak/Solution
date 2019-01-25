import { LOAD_SKILLS_SUCCESS, SKILL_ADDED, GET_ALL_SKILLS, ADD_NEW_SKILL, REMOVE_SKILL, EDIT_SKILL, EDIT_SKILL_ERROR, PUT_ALL_SKILLS } from "../constants";
import { updateObject } from '../services/methods';

const initialState = {
  skills: [], loadAllSkillsResult: { status: null },

  loadedSkills: [],
  loadSkillsStatus: null,
  loadSkillsErrors: [],

  addedSkillId: null,
  addNewSkillStatus: null,
  addNewSkillErrors: [],
  removedSkillId: null,

  editedSkill: null,
  editedSkillError: null
};

export const skillsReducer = (state = initialState, action) => {
  switch (action.type) {
    case PUT_ALL_SKILLS:
      return {
        ...state, skills: action.skills, loadAllSkillsResult: action.loadAllSkillsResult
      };
    case LOAD_SKILLS_SUCCESS:
      return {
        ...state,
        skills: action.skills
      };
    case SKILL_ADDED:
      return {
        ...state,
        success: action.success
      };
    case GET_ALL_SKILLS:
      return updateObject(state, { loadedSkills: action.loadedSkills,
        loadSkillsStatus: action.loadSkillsStatus, loadSkillsErrors: action.loadSkillsErrors})
    case ADD_NEW_SKILL:
      return updateObject(state, { addedSkillId: action.addedSkillId, addNewSkillStatus: action.addNewSkillStatus, addNewSkillErrors: action.addNewSkillErrors })
    case REMOVE_SKILL:
        return {
          ...state,
          removedSkillId: action.skillId
      };
    case EDIT_SKILL:
      return {
        ...state,
        editedSkill: {id: action.skillId, name: action.skillName}
      };
    case EDIT_SKILL_ERROR:
      return {
        ...state,
        editedSkillError: action.editSkillError
      };
    default:
      return state;
  }
};
