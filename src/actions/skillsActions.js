import { LOAD_SKILLS_SUCCESS, SKILL_ADDED, GET_ALL_SKILLS, ADD_NEW_SKILL, REMOVE_SKILL, EDIT_SKILL, EDIT_SKILL_ERROR, PUT_ALL_SKILLS } from "../constants";
import axios from "axios";
import WebApi, { useRequest } from "../api";
import { asyncStarted, asyncEnded, setActionConfirmationResult } from "./asyncActions";
import { errorCatcher } from '../services/errorsHandler';
import { isArrayContainsByObjectKey, checkForContains, sortStrings, getRandomColor } from '../services/methods';

export const loadSkillsSuccess = skills => {
  return {
    type: LOAD_SKILLS_SUCCESS,
    skills
  };
};

export const addSkillSuccess = success => {
  return {
    type: SKILL_ADDED,
    success
  };
};

export const putAllSkills = (skills, loadAllSkillsResult) => ({ type: PUT_ALL_SKILLS, skills, loadAllSkillsResult });

export const loadAllSkills = () => dispatch =>
  useRequest('loadAllSkills')
    .then(res => {
      const skills = res.extractData();
      const newSkills = Object.values(skills).map(skill => skill);
      dispatch(putAllSkills(newSkills, {status: true}));
    })
    .catch(() => dispatch(putAllSkills([], {status: false})));

export const loadSkills = () => {
  return dispatch => {
    dispatch(asyncStarted());
    WebApi.skills.get.all()
      .then(response => {
        if(!response.errorOccurred()){
          dispatch(loadSkillsSuccess(response.extractData()));
        }
        dispatch(asyncEnded());
      })
      .catch(error => {
        dispatch(asyncEnded());
      });
  };
};

export const addSkill = (name) => {
  return dispatch => {
    dispatch(asyncStarted());
    WebApi.skills.post(name)
      .then(response => {
        if(!response.errorOccurred()){
          dispatch(addSkillSuccess(response.colorBlock()));
          dispatch(loadSkills());
        }
        dispatch(asyncEnded());
      })
      .catch(error => {
        dispatch(addSkillSuccess(error.colorBlock()));
        dispatch(asyncEnded());
      });
  };
};


export const getAllSkills = (loadedSkills, loadSkillsStatus, loadSkillsErrors) => {
  return { type: GET_ALL_SKILLS, loadedSkills, loadSkillsStatus, loadSkillsErrors}
}

export const getAllSkillsACreator = currentAddedSkills => {
  return dispatch => {
    WebApi.skills.get.all().then(response => {
      const dtoArray = [];
      const { dtoObject } = response.replyBlock.data;
      const keys = Object.keys(dtoObject);
      for(let i = 0; i < keys.length; i++){
          if(dtoObject[keys[i]].name){
            if(!isArrayContainsByObjectKey(currentAddedSkills, dtoObject[keys[i]].name)){
              dtoArray.push({"id": keys[i], "name": dtoObject[keys[i]].name});
            }
        }
      }
      dispatch(getAllSkills(dtoArray.sort(sortStrings("name")), true, []));
    }).catch(error => {
      dispatch(getAllSkills([], false, errorCatcher(error)));
    })
  }
}


export const getAllSkillsForEmployee = currentEmployeeSkills => {
  return dispatch => {
    WebApi.skills.get.all().then(response => {
      const skillsArray = [];
      const { dtoObject } = response.replyBlock.data;
      for(let key in dtoObject){
        if(!checkForContains(currentEmployeeSkills, dtoObject[key].name))
          skillsArray.push({
            key: key,
            name: dtoObject[key].name
          });
      }

      dispatch(getAllSkills(skillsArray.sort(sortStrings("name")), true, []));
    }).catch(error => {
      dispatch(getAllSkills([], false, errorCatcher(error)));
    })
  }
}

export const addNewSkill = (addedSkillId, addNewSkillStatus, addNewSkillErrors) => {
  return { type: ADD_NEW_SKILL, addedSkillId, addNewSkillStatus, addNewSkillErrors}
}

export const addNewSkillACreator = name => (dispatch) => {
    WebApi.skills.post(name).then(response => {
      dispatch(addNewSkill(response.replyBlock.data.dtoObject.id, true, []));
    }).catch(error => {
      dispatch(addNewSkill(false, errorCatcher(error)));
    })
}

export const removeSkill = (skillId) => {
  return { type: REMOVE_SKILL, skillId}
}

export const deleteSkill = (skillId) => dispatch => {
  return new Promise((resolve, reject) => {
    WebApi.skills.delete(skillId)
      .then(response => {
        dispatch(setActionConfirmationResult(response));
        dispatch(removeSkill(skillId));
        resolve()
      })
      .catch(error => {
        dispatch(setActionConfirmationResult(error));
        reject()
      });
  });
};

export const editSkill = (skillId, skillName) => {
  return { type: EDIT_SKILL, skillId, skillName}
}

export const editSkillError = (editSkillError) => {
  return { type: EDIT_SKILL_ERROR, editSkillError}
}

export const editSkillACreator = (skillId, skillName) => dispatch => {
  const skillModel = {name: skillName};
  return new Promise((resolve, reject) => {
    WebApi.skills.put(skillId, skillModel)
      .then(response => {
        dispatch(editSkill(skillId, skillName))
        resolve()
      })
      .catch(error => {
        dispatch(editSkillError(errorCatcher(error)))
        reject()
      })
  });
};
