import WebApi from "../api";

import {
  CHANGE_STATE,
  ACCOUNT,
  CAN_SEARCH_USER_ACCOUNT,
  CAN_EDIT_USERS_ROLES,
  CAN_SEARCH_AD,
  CAN_ADD_USER,
  CAN_REACTIVATE_USER,
  CAN_DELETE_USER,
  CAN_DELETE_USER_REQUEST,
  PROJECTS,
  CAN_SEARCH_PROJECTS,
  CAN_ADD_PROJECT,
  CAN_EDIT_PROJECT,
  CLIENT,
  CAN_GET_LIST_OF_CLIENTS,
  CAN_ADD_CLIENT,
  CAN_DELETE_CLIENT,
  CAN_EDIT_CLIENT,
  CAN_REACTIVATE_CLIENT,
  CAN_GET_PROJECT,
  CAN_ADD_PROJECT_OWNERS,
  CAN_DELETE_PROJECT_OWNERS,
  CAN_CLOSE_PROJECT,
  CAN_REACTIVATE_PROJECT,
  CAN_SET_PROJECT_SKILLS,
  CAN_GET_SUGGESTED_EMPLOYEES,
  CAN_DELETE_PROJECT,
  ASSIGNMENTS,
  CAN_GET_EMPLOYEE_ASSIGNMENTS,
  CAN_GET_PROJECT_ASSIGNMENTS,
  CAN_ADD_ASSIGNMENT,
  CAN_EDIT_ASSIGNMENT,
  CAN_DELETE_ASSIGNMENT,
  CERTIFICATES,
  CAN_EDIT_CERTIFICATE,
  CAN_GET_EMPLOYEE_CERTIFICATES,
  CAN_ADD_CERTIFICATE,
  CAN_DELETE_CERTIFICATE,
  CAN_REACTIVATE_CLOUD,
  CAN_ADD_CLOUD,
  CAN_EDIT_CLOUD,
  CAN_DELETE_CLOUD,
  CLOUDS,
  CAN_IMPORT_CV,
  CV_IMPORT,
  EDUCATION,
  CAN_GET_EDUCATION,
  CAN_ADD_EDUCATION,
  CAN_EDIT_EDUCATION,
  CAN_DELETE_EDUCATION,

} from "../constants";

export const infoActionCreator = () => {
  return dispatch => {

    infoCreators.forEach(creator => {
      dispatch(creator())
    });

  };
};


export const genericChangeTypeStatusLoading = (controllerKey, requestKey, status, loading) => {
  return {
    type: CHANGE_STATE,
    controllerKey,
    requestKey,
    value:{
      status,
      loading
    }
  };
};


export const genericInfoACreator = (Api, controllerKey, requestKey) => {
  return dispatch => {
    dispatch(genericChangeTypeStatusLoading(controllerKey, requestKey, false, true));
    Api.then(response => {
      !response.errorOccurred() &&
        dispatch(genericChangeTypeStatusLoading(controllerKey, requestKey, true, false));
    }).catch(error => {
      if (error.replyBlock.status === 400) {
        dispatch(genericChangeTypeStatusLoading(controllerKey, requestKey, true, false));
      } else {
        dispatch(genericChangeTypeStatusLoading(controllerKey, requestKey, false, false));
      }
    });
  };
};


const infoCreators = [
  //ACCOUNT
  ()=>{
    return dispatch => { dispatch(
      genericInfoACreator( WebApi.users.post.list({ Limit: 1, Page: 1 }), ACCOUNT, CAN_SEARCH_USER_ACCOUNT )
    )}
  },
  () => {
    return dispatch => {
      dispatch(
        genericInfoACreator( WebApi.users.patch.roles(),ACCOUNT, CAN_EDIT_USERS_ROLES)
      )}
  },
  () => {
    return dispatch => {
      dispatch(
        genericInfoACreator(WebApi.users.get.adSearch(), ACCOUNT, CAN_SEARCH_AD)
      );
    };
  },
  () => {
    return dispatch => {
      dispatch(
        genericInfoACreator(WebApi.users.post.add(), ACCOUNT, CAN_ADD_USER)
      );
    };
  },
  () => {
    return dispatch => {
      dispatch(
        genericInfoACreator(
          WebApi.users.patch.reactivate(), ACCOUNT, CAN_REACTIVATE_USER)
      );
    };
  },
  () => {
    return dispatch => {
      dispatch(
        genericInfoACreator(WebApi.users.delete.user(), ACCOUNT, CAN_DELETE_USER)
      );
    };
  },
  () => {
    return dispatch => {
      dispatch(
        genericInfoACreator(WebApi.users.delete.request(), ACCOUNT, CAN_DELETE_USER_REQUEST)
      );
    };
  },
  //PROJECTS
  () => {
    return dispatch => {
      dispatch(
        genericInfoACreator( WebApi.projects.post.list({ Limit: 1, Page: 1 }), PROJECTS, CAN_SEARCH_PROJECTS)
      );
  }},
  () => {
    return dispatch => {
      dispatch(
        genericInfoACreator(WebApi.projects.post.add({}),PROJECTS, CAN_ADD_PROJECT)
      );
    };
  },
  () => {
    return dispatch => {
      dispatch(
        genericInfoACreator(WebApi.projects.put.project(0,{}), PROJECTS, CAN_EDIT_PROJECT)
      );
    };
  },
  () => {
    return dispatch => {
      dispatch(
        genericInfoACreator(WebApi.projects.get.projects(0), PROJECTS, CAN_GET_PROJECT)
      );
    };
  },
  () => {
    return dispatch => {
      dispatch(
        genericInfoACreator(WebApi.projects.put.owner(0,[]), PROJECTS, CAN_ADD_PROJECT_OWNERS)
      );
    };
  },
  () => {
    return dispatch => {
      dispatch(
        genericInfoACreator(WebApi.projects.delete.owner([0]), PROJECTS, CAN_DELETE_PROJECT_OWNERS)
      );
    };
  },
  () => {
    return dispatch => {
      dispatch(
        genericInfoACreator(WebApi.projects.put.closeProject(0), PROJECTS, CAN_CLOSE_PROJECT)
      );
    };
  },
  () => {
    return dispatch => {
      dispatch(
        genericInfoACreator(WebApi.projects.put.reactivateProject(0), PROJECTS, CAN_REACTIVATE_PROJECT)
      );
    };
  },
  () => {
    return dispatch => {
      dispatch(
        genericInfoACreator(WebApi.projects.put.skills(0,[]), PROJECTS, CAN_SET_PROJECT_SKILLS)
      );
    };
  },
  () => {
    return dispatch => {
      dispatch(
        genericInfoACreator(WebApi.projects.delete.deleteProject(0), PROJECTS, CAN_DELETE_PROJECT)
      );
    };
  },
  () => {
    return dispatch => {
      dispatch(
        genericInfoACreator(WebApi.projects.get.suggestEmployees(0), PROJECTS, CAN_GET_SUGGESTED_EMPLOYEES)
      );
    };
  },
  //CLIENT
  () => {
    return dispatch => {
      dispatch(
        genericInfoACreator(WebApi.clients.get.all(), CLIENT, CAN_GET_LIST_OF_CLIENTS)
      );
    };
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator(WebApi.clients.post(), CLIENT, CAN_ADD_CLIENT))
    };
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator(WebApi.clients.post(), CLIENT, CAN_DELETE_CLIENT))
    };
  },
  () => {
    return dispatch => {
      dispatch(
        genericInfoACreator(WebApi.clients.put.info(), CLIENT, CAN_EDIT_CLIENT)
      );
    };
  },
  () => {
    return dispatch => {
      dispatch(
        genericInfoACreator(
          WebApi.clients.put.reactivate(),CLIENT, CAN_REACTIVATE_CLIENT
        )
      );
    }
  },
  //ASSIGNMENTS
  () => {
    return dispatch => {
      dispatch(genericInfoACreator(WebApi.assignments.get.byEmployee(0), ASSIGNMENTS, CAN_GET_EMPLOYEE_ASSIGNMENTS))
    };
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator(WebApi.assignments.get.byProject(0), ASSIGNMENTS, CAN_GET_PROJECT_ASSIGNMENTS))
    };
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator(WebApi.assignments.post({}), ASSIGNMENTS, CAN_ADD_ASSIGNMENT))
    };
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator(WebApi.assignments.put(0, {}), ASSIGNMENTS, CAN_EDIT_ASSIGNMENT))
    };
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator(WebApi.assignments.delete(), ASSIGNMENTS, CAN_DELETE_ASSIGNMENT))
    };
  },

   //CERTIFICATES
   () => {
    return dispatch => {
      dispatch(genericInfoACreator(WebApi.certificates.get.byEmployee(0), CERTIFICATES, CAN_GET_EMPLOYEE_CERTIFICATES))
    };
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator(WebApi.certificates.post.add({}), CERTIFICATES, CAN_ADD_CERTIFICATE))
    };
  },
  () => {
    return dispatch => {CERTIFICATES
      dispatch(genericInfoACreator(WebApi.certificates.put.update(0,{}), CERTIFICATES, CAN_EDIT_CERTIFICATE))
    };
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator(WebApi.certificates.delete.deleteById(), CERTIFICATES, CAN_DELETE_CERTIFICATE))
    };
  },

  //CLOUDS
  () => {
    return dispatch => {
      dispatch(genericInfoACreator(WebApi.clouds.reactivate(0), CLOUDS, CAN_REACTIVATE_CLOUD))
    };
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator(WebApi.clouds.post(), CLOUDS, CAN_ADD_CLOUD))
    };
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator(WebApi.clouds.edit(0), CLOUDS, CAN_EDIT_CLOUD))
    };
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator(WebApi.clouds.delete(0), CLOUDS, CAN_DELETE_CLOUD))
    };
  },

  //CV IMPORT
  () => {
    return dispatch => {
      dispatch(genericInfoACreator(WebApi.CvImport.post(new FormData()), CV_IMPORT, CAN_IMPORT_CV))
    };
  },

  //EDUCATION
  () => {
    return dispatch => {
      dispatch(genericInfoACreator(WebApi.education.get.byEducation(0), EDUCATION, CAN_GET_EDUCATION))
    };
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator(WebApi.education.post(), CLOUDS, CAN_ADD_EDUCATION))
    };
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator(WebApi.education.edit(0), CLOUDS, CAN_EDIT_EDUCATION))
    };
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator(WebApi.education.delete(0), CLOUDS, CAN_DELETE_EDUCATION))
    };
  },

]