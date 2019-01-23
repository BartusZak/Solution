import WebApi from "../api";
import {useRequest} from '../api/index'
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
  CAN_GET_EMPLOYEE,
  EMPLOYEES,
  CAN_GET_EMPLOYEE_CAPACITY,
  CAN_GET_EMPLOYEES_AND_MANAGERS,
  CAN_GET_EMPLOYEE_ONBOARDS,
  CAN_GET_EMPLO_CONTACT,
  CAN_GET_EMPLO_SKILLS,
  CAN_SEARCH_EMPLOYEES,
  CAN_ADD_EMPLOYEE,
  CAN_ADD_EMPLOYEE_ONBOARD,
  CAN_DELETE_EMPLOYEE,
  CAN_SET_EMPLOYEE_SKILLS,
  CAN_SET_EMPLOYEE_F_LANGUAGES,
  CAN_SET_EMPLOYEE_SKYPE,
  CAN_EDIT_EMPLOYEE_ONBOARD,
  CAN_REACTIVATE_EMPLOYEE,
  CAN_DELETE_EMPLOYEE_ONBOARD,
  CAN_EDIT_EMPLOYEE,
  FEEDBACKS,
  CAN_GET_FEEDBACKS_BY_EMPLOYEE,
  CAN_GET_FEEDBACKS_BY_EMPLOYEE_IN_PROJECT,
  CAN_ADD_FEEDBACK,
  CAN_EDIT_FEEDBACK,
  CAN_DELETE_FEEDBACK,
  GDRIVE,
  CAN_LOGIN_GDRIVE,
  CAN_GENERATE_SHARE_LINK_GDRIVE,
  CAN_GET_FOLDERS_GDRIVE,
  CAN_DELETE_FOLDER_GDRIVE,
  CAN_UPDATE_FOLDER_GDRIVE,
  CAN_UPLOAD_FILE_GDRIVE,
  CAN_CREATE_FOLDER_GDRIVE,
  NOTIFICATIONS,
  CAN_GET_ALL_NOTIFICATIONS,
  CAN_DELETE_NOTIFICATIONS,
  CAN_DELETE_ALL_NOTIFICATIONS,
  CAN_MARK_AS_READ_NOTIFICATION,
  CAN_MARK_ALL_AS_READ_NOTIFICATIONS,
  ONEDRIVE,
  CAN_GET_REDIRECT_LINK_ONEDRIVE,
  CAN_SEND_QUERY_TO_AUTH_ONEDRIVE,
  CAN_REFRESH_TOKEN_ONEDRIVE,
  CAN_GENERATE_SHARE_LINK_ONEDRIVE,
  CAN_GET_FOLDERS_ONEDRIVE,
  CAN_CREATE_FOLDER_ONEDRIVE,
  CAN_DELETE_FOLDER_ONEDRIVE,
  CAN_UPDATE_FOLDER_ONEDRIVE,
  CAN_UPLOAD_FILE_ONEDRIVE,
  QUARTERTALKS,
  CAN_EDIT_QUESTIONS_IN_QUARTER_TALK,
  CAN_REACTIVATE_QUARTER_TALK,
  CAN_DELETE_QUARTER_TALK,
  CAN_EDIT_QUARTER_TALK,
  CAN_GET_QUESTIONS,
  CAN_GET_QUARTERS_FOR_EMPLOYEE,
  CAN_GENERATE_QUARTER_TALK_DOC,
  CAN_DELETE_QUESTION,
  CAN_ADD_QUESTION,
  CAN_ADD_QUARTER_TALK,
  CAN_PLAN_QUARTER_TALK,
  CAN_GET_QUARTER_TALK_RESERVED_DATES,
  REPORTS,
  CAN_GENERATE_REPORT,
  CAN_GET_RECENT_AND_FAVORITES_REPORTS,
  CAN_UNFAVORITE_REPORT,
  CAN_GENERATE_CV_PDF,
  CAN_GENERATE_CV_WORD,
  CAN_GET_TEAMS,
  CAN_GET_FEEDBACK,
  CAN_GET_CV,
  CAN_GET_DEVELOPERS_EXCEL_REPORT,
  CAN_GET_ZIP_REPORT,
  RESPONSIBLE_PERSON,
  CAN_GET_RESPONSIBLE_PERSON_BY_CLIENTID,
  CAN_GET_RESPONSIBLEPERSON_BY_ID,
  CAN_EDIT_RESPONSIBLE_PERSON,
  CAN_ADD_RESPONSIBLE_PERSON,
  CAN_DELETE_RESPONSIBLE_PERSON,
  CAN_REACTIVATE_RESPONSIBLE_PERSON,
  SKILLS,
  CAN_GET_ALL_SKILLS,
  CAN_GET_SKILL_BY_ID,
  CAN_ADD_SKILL,
  CAN_DELETE_SKILL,
  CAN_EDIT_SKILL,
  CAN_GET_STATS,
  ROLES,
  CAN_GET_ALL_ROLES,
  CAN_ADD_ROLE,
  CAN_EDIT_ROLE,
  CAN_DELETE_ROLE,
  SHARE_PROJECTS,
  CAN_SHARE_PROJECT,
  CAN_GET_MANAGERS_SHARED_PROJECT,
  CAN_GET_ALREADY_SHARED_MANAGERS,
  WORK_EXPERIENCE,
  CAN_ADD_WORK_EXPERIENCE,
  CAN_GET_WORK_EXPERIENCE,
  CAN_EDIT_WORK_EXPERIENCE,
  CAN_DELETE_WORK_EXPERIENCE,
  CAN_GET_WORK_EXPERIENCE_BY_EMPLOYEEID,
  STATS

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
      genericInfoACreator( WebApi.users.post.list({ Limit: 0, Page: 0 }), ACCOUNT, CAN_SEARCH_USER_ACCOUNT )
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
        genericInfoACreator( WebApi.projects.post.list({ Limit: 0, Page: 0 }), PROJECTS, CAN_SEARCH_PROJECTS)
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
      dispatch(genericInfoACreator(WebApi.clients.delete(), CLIENT, CAN_DELETE_CLIENT))
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
      dispatch(genericInfoACreator(WebApi.assignments.post({"employeeId": ""}), ASSIGNMENTS, CAN_ADD_ASSIGNMENT))
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
      dispatch(genericInfoACreator(WebApi.certificates.post.add({"employeeId": ""}), CERTIFICATES, CAN_ADD_CERTIFICATE))
    };
  },
  () => {
    return dispatch => {CERTIFICATES
      dispatch(genericInfoACreator(WebApi.certificates.put.update(0,{"employeeId": ""}), CERTIFICATES, CAN_EDIT_CERTIFICATE))
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
  //EMPLOYEES
  () => {
    return dispatch => {
      dispatch(genericInfoACreator(WebApi.employees.get.byEmployee(0), EMPLOYEES, CAN_GET_EMPLOYEE))
    };
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator(WebApi.employees.get.capacity(0), EMPLOYEES, CAN_GET_EMPLOYEE_CAPACITY))
    };
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator(WebApi.employees.get.employeesAndManagers(), EMPLOYEES, CAN_GET_EMPLOYEES_AND_MANAGERS))
    };
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator(WebApi.employees.get.onBoards(0), EMPLOYEES, CAN_GET_EMPLOYEE_ONBOARDS))
    };
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator(WebApi.employees.get.emplo.contact(0), EMPLOYEES, CAN_GET_EMPLO_CONTACT))
    };
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator(WebApi.employees.get.emplo.skills(0), EMPLOYEES, CAN_GET_EMPLO_SKILLS))
    };
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator(useRequest('getEmployees',{"employeeId": "",limit: 0}), EMPLOYEES, CAN_SEARCH_EMPLOYEES))
    };
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator(WebApi.employees.post.add({}), EMPLOYEES, CAN_ADD_EMPLOYEE))
    };
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator(WebApi.employees.post.addOnBoard({"employeeId": ""}), EMPLOYEES, CAN_ADD_EMPLOYEE_ONBOARD))
    };
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator(WebApi.employees.deleteOnBoard(0), EMPLOYEES, CAN_DELETE_EMPLOYEE_ONBOARD))
    };
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator(WebApi.employees.delete(0), EMPLOYEES, CAN_DELETE_EMPLOYEE))
    };
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator(WebApi.employees.put.skills("",[]), EMPLOYEES, CAN_SET_EMPLOYEE_SKILLS))
    };
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator(WebApi.employees.put.foreignLanguages("",[]), EMPLOYEES, CAN_SET_EMPLOYEE_F_LANGUAGES))
    };
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator(WebApi.employees.put.updateSkype("",""), EMPLOYEES, CAN_SET_EMPLOYEE_SKYPE))
    };
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator(WebApi.employees.put.updateOnBoard({},0), EMPLOYEES, CAN_EDIT_EMPLOYEE_ONBOARD))
    };
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator(WebApi.employees.patch.reactivate(0), EMPLOYEES, CAN_REACTIVATE_EMPLOYEE))
    };
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator(WebApi.employees.patch.data(0,{}), EMPLOYEES, CAN_EDIT_EMPLOYEE))
    };
  },
  //FEEDBACKS
  () => {
    return dispatch => {
      dispatch(genericInfoACreator(WebApi.feedbacks.get.byEmployee(0), FEEDBACKS, CAN_GET_FEEDBACKS_BY_EMPLOYEE))
    };
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator(WebApi.feedbacks.get.byEmployeeInProject(0), FEEDBACKS, CAN_GET_FEEDBACKS_BY_EMPLOYEE_IN_PROJECT))
    };
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator(WebApi.feedbacks.post.feedback({"employeeId":""}), FEEDBACKS, CAN_ADD_FEEDBACK))
    };
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator(WebApi.feedbacks.put.feedback(0,{}), FEEDBACKS, CAN_EDIT_FEEDBACK))
    };
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator(WebApi.feedbacks.delete.deleteById(0), FEEDBACKS, CAN_DELETE_FEEDBACK))
    };
  },
  //GDRIVE
  () => {
    return dispatch => {
      dispatch(genericInfoACreator(WebApi.gDrive.get.login(), GDRIVE, CAN_LOGIN_GDRIVE))
    };
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator(WebApi.gDrive.post.generateShareLink({}), GDRIVE, CAN_GENERATE_SHARE_LINK_GDRIVE))
    };
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator(WebApi.gDrive.post.getFolders({}), GDRIVE, CAN_GET_FOLDERS_GDRIVE))
    };
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator(WebApi.gDrive.post.deleteFolder({}), GDRIVE, CAN_DELETE_FOLDER_GDRIVE))
    };
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator(WebApi.gDrive.post.updateFolder({}), GDRIVE, CAN_UPDATE_FOLDER_GDRIVE))
    };
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator(WebApi.gDrive.post.createFolder({}), GDRIVE, CAN_CREATE_FOLDER_GDRIVE))
    };
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator(WebApi.gDrive.post.uploadFile({}), GDRIVE, CAN_UPLOAD_FILE_GDRIVE))
    };
  },
  //NOTIFICATIONS
  () => {
    return dispatch => {
      dispatch(genericInfoACreator(WebApi.notification.get.getAll(), NOTIFICATIONS, CAN_GET_ALL_NOTIFICATIONS))
    };
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator(WebApi.notification.delete.delete([]), NOTIFICATIONS, CAN_DELETE_NOTIFICATIONS ))
    };
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator(WebApi.notification.put.markAsRead(0), NOTIFICATIONS, CAN_MARK_AS_READ_NOTIFICATION))
    };
  },
  //ONEDRIVE
  () => {
    return dispatch => {
      dispatch(genericInfoACreator(WebApi.oneDrive.get.getRedirectLink(false), ONEDRIVE, CAN_GET_REDIRECT_LINK_ONEDRIVE))
    };
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator(WebApi.oneDrive.get.sendQuertToAuth('',{}), ONEDRIVE, CAN_SEND_QUERY_TO_AUTH_ONEDRIVE))
    };
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator(WebApi.oneDrive.get.refreshToken(''), ONEDRIVE, CAN_REFRESH_TOKEN_ONEDRIVE))
    };
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator(WebApi.oneDrive.post.generateShareLink({}), ONEDRIVE, CAN_GENERATE_SHARE_LINK_ONEDRIVE))
    };
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator(WebApi.oneDrive.post.generateShareLink({}), ONEDRIVE, CAN_GET_FOLDERS_ONEDRIVE))
    };
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator(WebApi.oneDrive.post.createFolder({}), ONEDRIVE, CAN_CREATE_FOLDER_ONEDRIVE))
    };
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator(WebApi.oneDrive.post.deleteFolder({}), ONEDRIVE, CAN_DELETE_FOLDER_ONEDRIVE))
    };
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator(WebApi.oneDrive.post.updateFolder({}), ONEDRIVE, CAN_UPDATE_FOLDER_ONEDRIVE))
    };
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator(WebApi.oneDrive.post.uploadFile({}), ONEDRIVE, CAN_UPLOAD_FILE_ONEDRIVE))
    };
  },
  //QUARTERTALKS
  () => {
    return dispatch => {
      dispatch(genericInfoACreator( useRequest('reactivateQuaterTalk', 0), QUARTERTALKS,CAN_REACTIVATE_QUARTER_TALK ))};
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator( useRequest('deleteQuaterTalk', 0), QUARTERTALKS, CAN_DELETE_QUARTER_TALK))};
  },  
  () => {
    return dispatch => {
      dispatch(genericInfoACreator( useRequest('editQuarterTalk', 0, {}), QUARTERTALKS, CAN_EDIT_QUARTER_TALK))};
  },  
  () => {
    return dispatch => {
      dispatch(genericInfoACreator( useRequest('getQuestions'), QUARTERTALKS, CAN_GET_QUESTIONS))};
  },  
  () => {
    return dispatch => {
      dispatch(genericInfoACreator( useRequest('getQuarterForEmployee',0 ), QUARTERTALKS, CAN_GET_QUARTERS_FOR_EMPLOYEE))};
  }, 
   () => {
    return dispatch => {
      dispatch(genericInfoACreator( useRequest('generateQuarterTalkDoc',0), QUARTERTALKS, CAN_GENERATE_QUARTER_TALK_DOC))};
  },  
  () => {
    return dispatch => {
      dispatch(genericInfoACreator( useRequest('deleteQuestion',0), QUARTERTALKS,CAN_DELETE_QUESTION ))};
  },  
  () => {
    return dispatch => {
      dispatch(genericInfoACreator( useRequest('addQuestion',{"employeeId": ""}), QUARTERTALKS, CAN_ADD_QUESTION))};
  },  
  () => {
    return dispatch => {
      dispatch(genericInfoACreator( useRequest('createQuarterTalk',{}), QUARTERTALKS, CAN_ADD_QUARTER_TALK))};
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator( useRequest('planQuarterTalk',{"employeeId":""}, false), QUARTERTALKS, CAN_PLAN_QUARTER_TALK))};
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator( useRequest('getQuarterTalksReservedDates', {"employeeId":""}, false), QUARTERTALKS, CAN_GET_QUARTER_TALK_RESERVED_DATES))};
  },

  //REPORTS
  () => {
    return dispatch => {
      dispatch(genericInfoACreator( useRequest('generateReport', {teamsSheets: {}}, false, false), REPORTS, CAN_GENERATE_REPORT))
    }
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator( useRequest('generateCv', ""), REPORTS, CAN_GENERATE_CV_PDF))
    }
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator( useRequest('generateCvWord', ""), REPORTS, CAN_GENERATE_CV_WORD))
    }
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator( useRequest('getFeedback', ""), REPORTS, CAN_GET_FEEDBACK ))
    }
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator( useRequest('getCv', ""), REPORTS, CAN_GET_CV))
    }
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator( useRequest('getTeams'), REPORTS, CAN_GET_TEAMS))
    }
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator( useRequest('getReportExcel', ""), REPORTS, CAN_GET_DEVELOPERS_EXCEL_REPORT))
    }
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator( useRequest('getReportZip', ""), REPORTS, CAN_GET_ZIP_REPORT))
    }
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator( useRequest('getRecentReports', ""), REPORTS, CAN_GET_RECENT_AND_FAVORITES_REPORTS))
    }
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator( useRequest('unfavoriteReport', ""), REPORTS, CAN_UNFAVORITE_REPORT))
    }
  },

  //RESPONSIBLE PERSON
  () => {
    return dispatch => {
      dispatch(genericInfoACreator( useRequest('getResponsiblePersonByClientId', 0), RESPONSIBLE_PERSON, CAN_GET_RESPONSIBLE_PERSON_BY_CLIENTID))
    }
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator( useRequest('getResponsiblePersonById', 0), RESPONSIBLE_PERSON, CAN_GET_RESPONSIBLEPERSON_BY_ID))
    }
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator( useRequest('editResponsiblePerson', {}, 0), RESPONSIBLE_PERSON, CAN_EDIT_RESPONSIBLE_PERSON))
    }
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator( useRequest('addResponsiblePerson', {}), RESPONSIBLE_PERSON, CAN_ADD_RESPONSIBLE_PERSON))
    }
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator( useRequest('deleteResponsiblePerson', 0), RESPONSIBLE_PERSON, CAN_DELETE_RESPONSIBLE_PERSON))
    }
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator( useRequest('reactivateResponsiblePerson', 0), RESPONSIBLE_PERSON, CAN_REACTIVATE_RESPONSIBLE_PERSON))
    }
  },

  //SKILLS
  () => {
    return dispatch => {
      dispatch(genericInfoACreator( useRequest('getAllSkills'), SKILLS, CAN_GET_ALL_SKILLS))
    }
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator( useRequest('getSkillById', 0), SKILLS, CAN_GET_SKILL_BY_ID))
    }
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator( useRequest('addSkill', {}), SKILLS, CAN_ADD_SKILL))
    }
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator( useRequest('deleteSkill', 0), SKILLS, CAN_DELETE_SKILL))
    }
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator( useRequest('editSkill', 0, {}), SKILLS, CAN_EDIT_SKILL))
    }
  },

  //STATS
  () => {
    return dispatch => {
      dispatch(genericInfoACreator( useRequest('getStats'), STATS, CAN_GET_STATS))
    }
  },

  //ROLES
  () => {
    return dispatch => {
      dispatch(genericInfoACreator( useRequest('getAllRoles'), ROLES, CAN_GET_ALL_ROLES))
    }
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator( useRequest('addRole', {}), ROLES, CAN_ADD_ROLE))
    }
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator( useRequest('editRole', 0, {}), ROLES, CAN_EDIT_ROLE))
    }
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator( useRequest('deleteRole', 0), ROLES, CAN_DELETE_ROLE))
    }
  },

  //SHARE PROJECT
  () => {
    return dispatch => {
      dispatch(genericInfoACreator( useRequest('shareProject', 0, {}), SHARE_PROJECTS, CAN_SHARE_PROJECT))
    }
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator( useRequest('getManagersSharedProject', 0), SHARE_PROJECTS, CAN_GET_MANAGERS_SHARED_PROJECT))
    }
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator( useRequest('getAlreadySharedManagers', 0), SHARE_PROJECTS, CAN_GET_ALREADY_SHARED_MANAGERS))
    }
  },
  
  //WORK EXPERIENCE
  () => {
    return dispatch => {
      dispatch(genericInfoACreator( useRequest('addWorkExperience', {}), WORK_EXPERIENCE, CAN_ADD_WORK_EXPERIENCE))
    }
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator( useRequest('getWorkExperience', 0), WORK_EXPERIENCE, CAN_GET_WORK_EXPERIENCE))
    }
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator( useRequest('editWorkExperience', 0, {}), WORK_EXPERIENCE, CAN_EDIT_WORK_EXPERIENCE))
    }
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator( useRequest('deleteWorkExperience', 0), WORK_EXPERIENCE, CAN_DELETE_WORK_EXPERIENCE))
    }
  },
  () => {
    return dispatch => {
      dispatch(genericInfoACreator( useRequest('getWorkExperienceByEmployeeId', 0), WORK_EXPERIENCE, CAN_GET_WORK_EXPERIENCE_BY_EMPLOYEEID))
    }
  },
]