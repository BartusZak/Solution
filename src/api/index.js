import axios from 'axios';
// import * as jwtDecode from "jwt-decode";
import { resolve as BluebirdResolve } from 'bluebird/js/browser/bluebird.core.min.js';
import * as usersMocks from './mock/users';
import * as projectsMocks from './mock/projects';
import redux from 'redux';
import storeCreator from './../store';
import storage from 'redux-persist/lib/storage';
import { push } from 'react-router-redux';
import { logout } from './../actions/authActions';
import {
  refreshToken,
  authOneDrive,
  getFolderACreator
} from '../actions/oneDriveActions';
import ResponseParser from './responseParser';
import Config from 'Config';
import { loginACreator } from '../actions/persistHelpActions';
import { Certificate } from 'crypto';
import { addAlert, removeAlert } from '../actions/alertsActions';
import * as fromAlertSettings from './request-settings';
const { store } = storeCreator;

export const API_ENDPOINT = Config.serverUrl;
export const AZURE_AD_REDIRECT_URI = Config.azureAdRedirectUri;

store.subscribe(listener);

const select = state =>
  state.authReducer.tokens !== undefined ? state.authReducer.tokens.token : '';

export const selectLang = state =>
  state.languageReducer.language ? state.languageReducer.language : 'pl';

let lang = '';
function listener() {
  let langHeader = '';
  switch (selectLang(store.getState())) {
    case 'pl':
      langHeader = 'pl-PL';
      lang = 'pl';
      break;
    case 'en':
      langHeader = 'en-US';
      lang = 'en';
      break;
  }

  axios.defaults.withCredentials = true;
  axios.defaults.headers.common['Accept-Language'] = langHeader;
}

const authValidator = response => {
  if (response.status) {
    if (response.response.status === 401 || response.response === undefined) {
      store.dispatch(logout());
      store.dispatch(push('/'));
    }
  }

  throw response;
};

const parseSuccess = (response, key) => {
  let parser = new ResponseParser(response);
  parser.parse();
  const succMessage = fromAlertSettings.succOperationsWhiteObject[key];
  const isInfoComponent = window.location.href.search('info') === -1;
  if (succMessage && isInfoComponent) {
    store.dispatch(
      addAlert({ id: key, content: succMessage[lang], type: 'ok', time: 5000 })
    );
  }

  return BluebirdResolve(parser);
};

const parseFailure = (response, key) => {
  if (response instanceof Error && response.request === undefined) {
    throw response;
  }

  const isKeyInBlackList = fromAlertSettings.errorsBlackList.findIndex(
    item => item === key
  );

  let parser = new ResponseParser(response);

  const failMessage =
    fromAlertSettings.failOperationsWhiteObject['networkError'];

  const isInfoComponent = window.location.href.search('info') === -1;
  if (isKeyInBlackList === -1 && isInfoComponent) {
    //400 ERROR NOT HANDLED
    if (!response.response) {
      // network error
      store.dispatch(
        addAlert({
          id: 'networkError',
          content: failMessage[lang],
          type: 'err',
          time: 5000
        })
      );
    } else {
      store.dispatch(
        addAlert({
          id: key,
          content: parser.parse().message,
          type: 'err',
          time: 5000
        })
      );
    }
  }

  throw parser;
};

const params = obj => {
  return {
    params: obj
  };
};

const execute = (
  key,
  path = '',
  type = requestTypes.get,
  payload = {},
  sendAzureToken
) => {
  let fullPath = sendAzureToken
    ? `${API_ENDPOINT}/${path}azureToken=${
        store.getState().authReducer.azureData.access_token
      }`
    : `${API_ENDPOINT}/${path}`;
  return axios[type](fullPath, payload)
    .then(response => parseSuccess(response, key))
    .catch(response => authValidator(response))
    .catch(response => parseFailure(response, key));
};

const requestTypes = {
  get: 'get',
  post: 'post',
  put: 'put',
  patch: 'patch',
  delete: 'delete'
};
const requests = {
  //Login
  login: () =>
    execute(
      fromAlertSettings.login,
      `account/login?redirectUrl=${AZURE_AD_REDIRECT_URI}`
    ),
  loginAzureAD: code =>
    execute(fromAlertSettings.loginAzureAD, `signin-oidc?code=${code}`),

  //CLIENTS
  getClientsSlim: settings =>
    execute(fromAlertSettings.getClientsSlim, 'Clients?lessDetailed=true'),

  //EMPLOYEES
  getEmployees: settings =>
    execute(
      fromAlertSettings.getEmployees,
      'employees',
      requestTypes.post,
      settings
    ),
  getEmployeeById: id =>
    execute(fromAlertSettings.getEmployeeById, `employees/${id}`),
  getEmployeeCapacity: id =>
    execute(fromAlertSettings.getEmployeeCapacity, `employees/${id}/capacity`),
  getEmployeesAndManagers: () =>
    execute(
      fromAlertSettings.getEmployeesAndManagers,
      `sharedEmployees/getEmployeesAndManagers`
    ),
  getOnBoardsByEmployeeId: employeeId =>
    execute(
      fromAlertSettings.getOnBoardsByEmployeeId,
      `employees/getOnBoardsByEmployeeId/${employeeId}`
    ),
  getEmployeeContact: employeeId =>
    execute(
      fromAlertSettings.getEmployeeContact,
      `employees/billenniumemplocontact`,
      requestTypes.get,
      params({ employeeId })
    ),
  getEmployeeSkills: employeeId =>
    execute(
      fromAlertSettings.getEmployeeSkills,
      `employees/billenniumemploskills`,
      requestTypes.get,
      params({ employeeId })
    ),
  addEmployee: model =>
    execute(
      fromAlertSettings.addEmployee,
      `employees/add`,
      requestTypes.post,
      model
    ),
  addOnBoardEmployee: model =>
    execute(
      fromAlertSettings.addOnBoardEmployee,
      `employees/addToOnBoard`,
      requestTypes.post,
      model
    ),
  deleteOnBoardEmployee: id =>
    execute(
      fromAlertSettings.deleteOnBoardEmployee,
      `employees/deleteOnBoard/${id}`,
      requestTypes.delete
    ),
  deleteEmployee: id =>
    execute(
      fromAlertSettings.deleteEmployee,
      `employees/${id}`,
      requestTypes.delete
    ),
  editSkills: (id, skillsArray) =>
    execute(
      fromAlertSettings.editSkills,
      `employees/${id}`,
      requestTypes.put,
      skillsArray
    ),
  editForeignLanguages: (id, languagesArray) =>
    execute(
      fromAlertSettings.editForeignLanguages,
      `employees/foreignLanguages/${id}`,
      requestTypes.put,
      languagesArray
    ),
  editSkype: (skypeId, employeeId) =>
    execute(
      fromAlertSettings.editSkype,
      `employees/updateSkype`,
      requestTypes.put,
      { skypeId, employeeId }
    ),
  editOnBoardEmployee: (onBoardId, model) =>
    execute(
      fromAlertSettings.editOnBoardEmployee,
      `employees/editOnBoard/${onBoardId}`,
      requestTypes.patch,
      model
    ),
  editEmployee: (id, model) =>
    execute(
      fromAlertSettings.editEmployee,
      `employees/${id}`,
      requestTypes.patch,
      model
    ),
  reactivateEmployee: id =>
    execute(
      fromAlertSettings.reactivateEmployee,
      `employees/reactivate/${id}`,
      requestTypes.patch
    ),

  //PROJECTS
  addProject: model =>
    execute(
      fromAlertSettings.addProject,
      'projects/add',
      requestTypes.post,
      model
    ),
  editProject: (model, id) =>
    execute(
      fromAlertSettings.editProject,
      `projects/${id}`,
      requestTypes.put,
      model
    ),
  addProjectPhase: model =>
    execute(
      fromAlertSettings.addProjectPhase,
      'projects/add',
      requestTypes.post,
      model
    ),

  //RESPINSIBLE PERSON
  createResponsiblePerson: model =>
    execute(
      fromAlertSettings.createResponsiblePerson,
      'responsiblepersons',
      requestTypes.post,
      model
    ),
  editResponsiblePerson: (model, id) =>
    execute(
      fromAlertSettings.editResponsiblePerson,
      `responsiblepersons/${id}`,
      requestTypes.put,
      model
    ),

  //QUATER TALKS
  reactivateQuaterTalk: id =>
    execute(
      fromAlertSettings.reactivateQuaterTalk,
      `QuarterTalks/Reactivate/${id}`,
      requestTypes.put
    ),
  deleteQuaterTalk: id =>
    execute(
      fromAlertSettings.deleteQuaterTalk,
      `QuarterTalks/${id}`,
      requestTypes.delete
    ),
  editQuarterTalk: (id, model) =>
    execute(
      fromAlertSettings.editQuarterTalk,
      `QuarterTalks/${id}`,
      requestTypes.put,
      model
    ),
  getEmployeeById: id =>
    execute(fromAlertSettings.getEmployeeById, `employees/${id}`),
  getEmployeeCapacity: id =>
    execute(fromAlertSettings.getEmployeeCapacity, `employees/${id}/capacity`),
  getEmployeesAndManagers: () =>
    execute(
      fromAlertSettings.getEmployeesAndManagers,
      `sharedEmployees/getEmployeesAndManagers`
    ),
  getOnBoardsByEmployeeId: employeeId =>
    execute(
      fromAlertSettings.getOnBoardsByEmployeeId,
      `employees/getOnBoardsByEmployeeId/${employeeId}`
    ),
  getEmployeeContact: employeeId =>
    execute(
      fromAlertSettings.getEmployeeContact,
      `employees/billenniumemplocontact`,
      requestTypes.get,
      params({ employeeId })
    ),
  getEmployeeSkills: employeeId =>
    execute(
      fromAlertSettings.getEmployeeSkills,
      `employees/billenniumemploskills`,
      requestTypes.get,
      params({ employeeId })
    ),
  addEmployee: model =>
    execute(
      fromAlertSettings.addEmployee,
      `employees/add`,
      requestTypes.post,
      model
    ),
  addOnBoardEmployee: model =>
    execute(
      fromAlertSettings.addOnBoardEmployee,
      `employees/addToOnBoard`,
      requestTypes.post,
      model
    ),
  deleteOnBoardEmployee: id =>
    execute(
      fromAlertSettings.deleteOnBoardEmployee,
      `employees/deleteOnBoard/${id}`,
      requestTypes.delete
    ),
  deleteEmployee: id =>
    execute(
      fromAlertSettings.deleteEmployee,
      `employees/${id}`,
      requestTypes.delete
    ),
  editSkills: (id, skillsArray) =>
    execute(
      fromAlertSettings.editSkills,
      `employees/${id}`,
      requestTypes.put,
      skillsArray
    ),
  editForeignLanguages: (id, languagesArray) =>
    execute(
      fromAlertSettings.editForeignLanguages,
      `employees/foreignLanguages/${id}`,
      requestTypes.put,
      languagesArray
    ),
  editSkype: (skypeId, employeeId) =>
    execute(
      fromAlertSettings.editSkype,
      `employees/updateSkype`,
      requestTypes.put,
      { skypeId, employeeId }
    ),
  editOnBoardEmployee: (onBoardId, model) =>
    execute(
      fromAlertSettings.editOnBoardEmployee,
      `employees/editOnBoard/${onBoardId}`,
      requestTypes.patch,
      model
    ),
  editEmployee: (id, model) =>
    execute(
      fromAlertSettings.editEmployee,
      `employees/${id}`,
      requestTypes.patch,
      model
    ),
  reactivateEmployee: id =>
    execute(
      fromAlertSettings.reactivateEmployee,
      `employees/reactivate/${id}`,
      requestTypes.patch
    ),

  //QUATER TALKS
  getQuarterTalks: () =>
    execute(fromAlertSettings.getQuarterTalks, `quarterTalks/questions`),
  getQuarterTalksForEmployee: employeeId =>
    execute(
      fromAlertSettings.getQuarterTalksForEmployee,
      `quarterTalks/forEmployee/${employeeId}`
    ),
  addQuarterTalk: model =>
    execute(
      fromAlertSettings.addQuarterTalk,
      `quarterTalks`,
      requestTypes.post,
      model
    ),
  editQuarterTalk: (id, model) =>
    execute(
      fromAlertSettings.editQuarterTalk,
      `quarterTalks/${id}`,
      requestTypes.put,
      model
    ),
  reactivateQuaterTalk: id =>
    execute(
      fromAlertSettings.reactivateQuaterTalk,
      `quarterTalks/reactivate/${id}`,
      requestTypes.put
    ),
  deleteQuaterTalk: id =>
    execute(
      fromAlertSettings.deleteQuaterTalk,
      `quarterTalks/${id}`,
      requestTypes.delete
    ),
  planQuarterTalk: (model, shouldSync) =>
    execute(
      fromAlertSettings.planQuarterTalk,
      `quarterTalks/planned?syncCalendar=${shouldSync}`,
      requestTypes.post,
      model
    ),
  generateDocForQuarterTalk: quarterId =>
    execute(
      fromAlertSettings.generateDocForQuarterTalk,
      `quarterTalks/GenerateDocx/${quarterId}`
    ),
  checkOutlookReservedDates: (model, checkOutlook) =>
    execute(
      fromAlertSettings.checkOutlookReservedDates,
      `quarterTalks/GetReservedDates?checkOutlook=${checkOutlook}`,
      requestTypes.post,
      model
    ),
  getQuestions: () =>
    execute(fromAlertSettings.getQuestions, `quarterTalks/questions`),
  addQuestion: model =>
    execute(
      fromAlertSettings.addQuestion,
      `quarterTalks/Question`,
      requestTypes.post,
      model
    ),
  deleteQuestion: id =>
    execute(
      fromAlertSettings.deleteQuestion,
      `quarterTalks/Question/${id}`,
      requestTypes.delete
    ),

  //ASSIGNMENTS
  getAssignmentByEmployee: employeeId =>
    execute(
      fromAlertSettings.getAssignmentByEmployee,
      `assignments/employee/${employeeId}`
    ),
  getAssignmentByProject: projectId =>
    execute(
      fromAlertSettings.getAssignmentByEmployee,
      `/assignments/project/${projectId}`
    ),
  addAssignment: model =>
    execute(
      fromAlertSettings.addAssignment,
      `assignments`,
      requestTypes.post,
      model
    ),
  deleteAssignment: id =>
    execute(
      fromAlertSettings.deleteAssignment,
      `assignments/${id}`,
      requestTypes.delete
    ),
  editAssignment: (id, model) =>
    execute(
      fromAlertSettings.editAssignment,
      `assignments/${id}`,
      requestTypes.put,
      model
    ),

  //NOTIFICATIONS
  getAllNotification: () =>
    execute(fromAlertSettings.getAllNotification, 'notification'),
  deleteAllNotifications: () =>
    execute(
      fromAlertSettings.deleteAllNotifications,
      'notification/all',
      requestTypes.delete
    ),
  deleteNotifications: notificationsIds => {
    const model = {
      data: {
        NotificationIds: notificationsIds
      }
    };
    return execute(
      fromAlertSettings.deleteNotifications,
      'notification',
      requestTypes.delete,
      model
    );
  },
  markNotificationAsRead: notificationId =>
    execute(
      fromAlertSettings.markNotificationAsRead,
      `notification/markAsRead/${notificationId}`,
      requestTypes.put
    ),
  markAllNotificationAsRead: () =>
    execute(
      fromAlertSettings.markAllNotificationAsRead,
      'notification/markAllAsRead',
      requestTypes.put
    ),

  //CLIENTS
  getClients: () =>
    execute(fromAlertSettings.getClients, 'clients?lessDetailed=false'),
  getClientById: id => execute(fromAlertSettings.getClientById, `client/${id}`),
  addClient: model =>
    execute(fromAlertSettings.addClient, 'clients', requestTypes.post, model),
  deleteClient: id =>
    execute(
      fromAlertSettings.deleteClient,
      `clients/${id}`,
      requestTypes.delete
    ),
  editInfoClient: (id, model) =>
    execute(
      fromAlertSettings.editInfoClient,
      `clients/${id}`,
      requestTypes.put,
      model
    ),
  reactivateClient: id =>
    execute(
      fromAlertSettings.reactivateClient,
      `clients/${id}/reactivate`,
      requestTypes.put
    ),

  //CERTIFICATES
  getCertificates: employeeId =>
    execute(
      fromAlertSettings.getCertificates,
      `certificates/employee/${employeeId}`
    ),
  addCertificate: model =>
    execute(
      fromAlertSettings.addCertificate,
      `certificates`,
      requestTypes.post,
      model
    ),
  editCertificate: (id, model) =>
    execute(
      fromAlertSettings.editCertificate,
      `certificates/${id}`,
      requestTypes.put,
      model
    ),
  deleteCertificate: id =>
    execute(
      fromAlertSettings.deleteCertificate,
      `certificates/${id}`,
      requestTypes.delete
    ),

  //FEEDBACKS
  getFeedbacksByEmployee: employeeId =>
    execute(
      fromAlertSettings.getFeedbacksByEmployee,
      `feedbacks/employee/${employeeId}?isDeleted=false`
    ),
  getFeedbacksbyEmployeeInProject: (employeeId, projectId) =>
    execute(
      fromAlertSettings.getFeedbacksbyEmployeeInProject,
      `feedbacks/employeeInProject/${employeeId}?projectId=${projectId}&isDeleted=false`
    ),
  addFeedback: model =>
    execute(
      fromAlertSettings.addFeedback,
      `feedbacks`,
      requestTypes.post,
      model
    ),
  editFeedback: (id, model) =>
    execute(
      fromAlertSettings.editFeedback,
      `feedbacks/${id}`,
      requestTypes.put,
      model
    ),
  deleteFeedback: id =>
    execute(
      fromAlertSettings.deleteFeedback,
      `feedbacks/${id}`,
      requestTypes.delete
    ),

  //SHARED EMPLOYEES
  getSharedEmployeesForManager: managerId =>
    execute(
      fromAlertSettings.getSharedEmployeesForManager,
      `sharedEmployees/forManager/${managerId}`
    ),
  addSharedEmployee: model =>
    execute(
      fromAlertSettings.addSharedEmployee,
      `sharedEmployees`,
      requestTypes.post,
      model
    ),
  deleteSharedEmployee: id =>
    execute(
      fromAlertSettings.deleteSharedEmployee,
      `sharedEmployees/${id}`,
      requestTypes.delete
    ),

  //USERS
  getUserById: id => execute(fromAlertSettings.getUserById, `account/${id}`),
  getUserByAdSearch: query =>
    execute(
      fromAlertSettings.getUserByAdSearch,
      `account/searchAD?query=${query}&`,
      requestTypes.get,
      {},
      true
    ),
  addUser: (id, roles) =>
    execute(
      fromAlertSettings.addUser,
      `account/add?`,
      requestTypes.post,
      {
        azureAdId: id,
        roles
      },
      true
    ),
  searchUsers: (settings = {}) =>
    execute(
      fromAlertSettings.searchUsers,
      `account`,
      requestTypes.post,
      settings
    ),
  searchRequestsUsers: (settings = {}) =>
    execute(
      fromAlertSettings.searchRequestsUsers,
      `account/requests?`,
      requestTypes.post,
      settings,
      true
    ),

  // login: (login, password) => execute(fromAlertSettings.login, `account/login`, requestTypes.post, {login, password})
  //   .then(response => response.data.dtoObject),
  // logout: () => execute(fromAlertSettings.logout, `account/logout`, requestTypes.post),
  // token: refreshToken => execute(fromAlertSettings.token, `account/login`, requestTypes.post, refreshToken),
  deleteUser: id =>
    execute(fromAlertSettings.deleteUser, `account/${id}`, requestTypes.delete),
  deleteUserRequest: id =>
    execute(
      fromAlertSettings.deleteUserRequest,
      `account/requests`,
      requestTypes.delete,
      params({ id })
    ),
  editUserRoles: (id, roles) =>
    execute(fromAlertSettings.editUserRoles, `account`, requestTypes.patch, {
      id,
      roles
    }),
  reactivateUser: id =>
    execute(
      fromAlertSettings.reactivateUser,
      `account/reactivate/${id}`,
      requestTypes.patch
    ),

  //CLOUDS
  addCloud: (name, fields, clientId) =>
    execute(fromAlertSettings.addCloud, `clouds`, requestTypes.post, {
      name,
      fields,
      clientId
    }),
  editCloud: (cloudId, name, fields, clientId) =>
    execute(
      fromAlertSettings.editCloud,
      `clouds/${cloudId}`,
      requestTypes.put,
      { name, fields, clientId }
    ),
  deleteCloud: id =>
    execute(fromAlertSettings.deleteCloud, `clouds/${id}`, requestTypes.delete),
  reactivateCloud: id =>
    execute(
      fromAlertSettings.reactivateCloud,
      `clouds/${id}/reactivate`,
      requestTypes.put
    ),

  //GDRIVE
  gDriveLogin: () => execute(fromAlertSettings.gDriveLogin, `gdrive/Login`),
  gDriveGenereteShareLink: model =>
    execute(
      fromAlertSettings.gDriveGenereteShareLink,
      `gDrive/generateShareLink`,
      requestTypes.post,
      model
    ),
  gDriveGetFolders: model =>
    execute(
      fromAlertSettings.gDriveGetFolders,
      `gDrive/get`,
      requestTypes.post,
      model
    ),
  gDriveDeleteFolder: model =>
    execute(
      fromAlertSettings.gDriveDeleteFolder,
      `gDrive/delete`,
      requestTypes.post,
      model
    ),
  gDriveUpdateFolder: model =>
    execute(
      fromAlertSettings.gDriveUpdateFolder,
      `gDrive/update`,
      requestTypes.post,
      model
    ),
  gDriveCreateFolder: model =>
    execute(
      fromAlertSettings.gDriveCreateFolder,
      `gDrive/create`,
      requestTypes.post,
      model
    ),
  gDriveUploadFile: (model, config) =>
    execute(
      fromAlertSettings.gDriveUploadFile,
      `gDrive/upload`,
      requestTypes.post,
      model,
      config
    ),

  //ONEDRIVE
  oneDriveGetRedirectLink: shouldRedirectOnCalendar =>
    execute(
      fromAlertSettings.oneDriveGetRedirectLink,
      `onedrive/auth?=${shouldRedirectOnCalendar || false}`
    ),
  oneDriveSendQueryToAuth: (code, shouldRedirectOnCalendar) =>
    execute(
      fromAlertSettings.oneDriveSendQueryToAuth,
      `/onedrive/authenticated?code=${code}&calendar=${shouldRedirectOnCalendar ||
        false}`
    ),
  oneDriveRefreshToken: oldToken =>
    execute(
      fromAlertSettings.oneDriveRefreshToken,
      `onedrive/refresh?refresh_token=${oldToken}`
    ),
  oneDriveGenerateShareLink: model =>
    execute(
      fromAlertSettings.oneDriveGenerateShareLink,
      `onedrive/share`,
      requestTypes.post,
      model
    ),
  oneDriveGetFolders: model =>
    execute(
      fromAlertSettings.oneDriveGetFolders,
      `onedrive/files`,
      requestTypes.post,
      model
    ),
  oneDriveCreateFolder: model =>
    execute(
      fromAlertSettings.oneDriveCreateFolder,
      `onedrive/createFolder`,
      requestTypes.post,
      model
    ),
  oneDriveDeleteFolder: model =>
    execute(
      fromAlertSettings.oneDriveDeleteFolder,
      `onedrive/deleteFolder`,
      requestTypes.post,
      model
    ),
  oneDriveUpdateFolder: model =>
    execute(
      fromAlertSettings.oneDriveUpdateFolder,
      `onedrive/updateFolder`,
      requestTypes.post,
      model
    ),
  oneDriveUploadFile: (model, config) =>
    execute(
      fromAlertSettings.oneDriveUpdateFolder,
      `onedrive/upload`,
      requestTypes.post,
      model,
      config
    ),

  // getQuestions: () => execute(fromAlertSettings.getQuestions, 'QuarterTalks/questions', requestTypes.get),
  // getQuarterForEmployee: employeeId =>   execute(fromAlertSettings.getQuarterTalkForEmployee, `QuarterTalks/ForEmployee/${employeeId}`, requestTypes.get),
  // generateQuarterTalkDoc: quarterId => execute(fromAlertSettings.generateQuarterTalkDoc, `QuarterTalks/GenerateDocx/${quarterId}`, requestTypes.get),
  // deleteQuestion: id => execute(fromAlertSettings.deleteQuestion, `QuarterTalks/Question/${id}`, requestTypes.delete),
  // addQuestion: model => execute(fromAlertSettings.addQuestion, `QuarterTalks/Question`, requestTypes.post, model),
  // createQuarterTalk: model => execute(fromAlertSettings.createQuarterTalk, `QuarterTalks`, requestTypes.post, model),
  // planQuarterTalk: (model, shouldSync) => execute(fromAlertSettings.planQuarterTalk, `QuarterTalks/Planned?syncCalendar=${shouldSync}`, requestTypes.post, model),
  // getQuarterTalksReservedDates: (model, checkOutlook) => execute(fromAlertSettings.getQuarterTalksReservedDates, `QuarterTalks/GetReservedDates?checkOutlook=${checkOutlook}`, requestTypes.post, model),

  //REPORTS
  generateReport: (model, hyperlinksOnGDrive, hyperlinksOnOneDrive) =>
    execute(
      fromAlertSettings.generateReport,
      `reports/developers?hyperlinksOnGDrive=${hyperlinksOnGDrive}&hyperlinksOnOneDrive=${hyperlinksOnOneDrive}`,
      requestTypes.post,
      model
    ),
  generateCv: employeeId =>
    execute(
      fromAlertSettings.generateCv,
      `reports/cv/${employeeId}`,
      requestTypes.post
    ),
  generateCvWord: employeeId =>
    execute(
      fromAlertSettings.generateCvWord,
      `reports/wordcv/${employeeId}`,
      requestTypes.post
    ),
  getFeedback: filename =>
    execute(
      fromAlertSettings.getFeedback,
      `reports/feedback/${filename}`,
      requestTypes.get
    ),
  getCv: filename =>
    execute(
      fromAlertSettings.getCv,
      `reports/cv/${filename}`,
      requestTypes.get
    ),
  getTeams: () =>
    execute(fromAlertSettings.getTeams, `reports/teams`, requestTypes.get),
  getReportExcel: filename =>
    execute(
      fromAlertSettings.getReportExcel,
      `reports/developers`,
      requestTypes.get,
      filename
    ),
  getReportZip: filename =>
    execute(
      fromAlertSettings.getReportZip,
      `reports/reportzip/${filename}`,
      requestTypes.get
    ),
  getRecentReports: numberOfReports =>
    execute(
      fromAlertSettings.getRecentReports,
      `reports/recentandfavorites`,
      requestTypes.get,
      numberOfReports
    ),
  unfavoriteReport: reportId =>
    execute(
      fromAlertSettings.unfavoriteReport,
      `reports/unfavorite/${reportId}`,
      requestTypes.delete
    ),

  //RESPONSIBLE PERSON
  getResponsiblePersonByClientId: clientId =>
    execute(
      fromAlertSettings.getResponsiblePersonByClientId,
      `responsiblepersons/client/${clientId}`,
      requestTypes.get
    ),
  getResponsiblePersonById: Id =>
    execute(
      fromAlertSettings.getByResponsiblePersonId,
      `responsiblepersons/${Id}`,
      requestTypes.get
    ),
  editResponsiblePerson: (model, Id) =>
    execute(
      fromAlertSettings.editResponsiblePerson,
      `responsiblepersons/${Id}`,
      requestTypes.put,
      model
    ),
  addResponsiblePerson: model =>
    execute(
      fromAlertSettings.addResponsiblePerson,
      `responsiblepersons`,
      requestTypes.post,
      model
    ),
  deleteResponsiblePerson: Id =>
    execute(
      fromAlertSettings.deleteResponsiblePerson,
      `responsiblepersons`,
      requestTypes.delete,
      Id
    ),
  reactivateResponsiblePerson: Id =>
    execute(
      fromAlertSettings.reactivateResponsiblePerson,
      `responsiblepersons/${Id}/reactivate`,
      requestTypes.put
    ),

  //SKILLS
  getAllSkills: () =>
    execute(fromAlertSettings.getAllSkills, `skills`, requestTypes.get),
  getSkillById: Id =>
    execute(fromAlertSettings.getSkillById, `skills/${Id}`, requestTypes.get),
  addSkill: model =>
    execute(fromAlertSettings.addSkill, `skills`, requestTypes.post, model),
  deleteSkill: Id =>
    execute(fromAlertSettings.deleteSkill, `skills/${Id}`, requestTypes.delete),
  editSkill: (Id, model) =>
    execute(
      fromAlertSettings.editSkill,
      `skills/${Id}`,
      requestTypes.put,
      model
    ),

  //STATS
  getStats: () =>
    execute(fromAlertSettings.getStats, `stats/basic`, requestTypes.get),

  //ROLES
  getAllRoles: () =>
    execute(fromAlertSettings.getAllRoles, `role`, requestTypes.get),
  addRole: model =>
    execute(fromAlertSettings.addRole, 'role', requestTypes.post, model),
  editRole: (Id, model) =>
    execute(fromAlertSettings.editRole, `role/${Id}`, requestTypes.put, model),
  deleteRole: Id =>
    execute(fromAlertSettings.deleteRole, `role/${Id}`, requestTypes.delete),

  //SHARE PROJECT
  shareProject: (projectId, model) =>
    execute(
      fromAlertSettings.shareProject,
      `shareproject/${projectId}`,
      requestTypes.post,
      model
    ),
  getManagersSharedProject: projectId =>
    execute(
      fromAlertSettings.getManagersSharedProject,
      `shareproject/alreadysharedmanagers/${projectId}`,
      requestTypes.get
    ),
  getAlreadySharedManagers: projectId =>
    execute(
      fromAlertSettings.getAlreadySharedManagers,
      `shareproject/destinationmanagers/${projectId}`,
      requestTypes.get
    ),

  //WORK EXPERIENCE
  addWorkExperience: model =>
    execute(
      fromAlertSettings.addWorkExperience,
      `workexperience`,
      requestTypes.post,
      model
    ),
  getWorkExperience: id =>
    execute(
      fromAlertSettings.getWorkExperience,
      `workexperience/${id}`,
      requestTypes.get
    ),
  editWorkExperience: (id, model) =>
    execute(
      fromAlertSettings.editWorkExperience,
      `workexperience/${id}`,
      requestTypes.put,
      model
    ),
  deleteWorkExperience: id =>
    execute(
      fromAlertSettings.deleteWorkExperience,
      `workexperience/${id}`,
      requestTypes.delete
    ),
  getWorkExperienceByEmployeeId: employeeId =>
    execute(
      fromAlertSettings.getWorkExperienceByEmployeeId,
      `workexperience/employee/${employeeId}`,
      requestTypes.get
    ),

  //CvImport
  importCV: files => execute(
    fromAlertSettings.importCv,
    `CvImport/ImportCv`,
    requestTypes.post,
    files
    ),
};

export const useRequest = (name, ...params) => requests[name](...params);

const WebAround = {
  get: (path, payload) => {
    return axios
      .get(path, payload)
      .then(response => parseSuccess(response))
      .catch(response => authValidator(response))
      .catch(response => parseFailure(response));
  },
  post: (path, payload) => {
    return axios
      .post(path, payload)
      .then(response => parseSuccess(response))
      .catch(response => authValidator(response))
      .catch(response => parseFailure(response));
  },
  put: (path, payload) => {
    return axios
      .put(path, payload)
      .then(response => parseSuccess(response))
      .catch(response => authValidator(response))
      .catch(response => parseFailure(response));
  },
  delete: (path, payload) => {
    return axios
      .delete(path, payload)
      .then(response => parseSuccess(response))
      .catch(response => authValidator(response))
      .catch(response => parseFailure(response));
  },
  patch: (path, payload) => {
    return axios
      .patch(path, payload)
      .then(response => parseSuccess(response))
      .catch(response => authValidator(response))
      .catch(response => parseFailure(response));
  }
};

const WebApi = {
  roles: {
    get: {
      getAll: () => {
        return WebAround.get(`${API_ENDPOINT}/role`);
      }
    },
    post: {
      add: userRoles => {
        return WebAround.post(
          `${API_ENDPOINT}/account/preferedRoles`,
          userRoles
        );
      }
    }
  },
  // CvImport: {
  //   post: files => {
  //     return WebAround.post(
  //       `${API_ENDPOINT}/CvImport/ImportCv`,
  //       files
  //       // {
  //       //   headers: { "Content-Type": "multipart/form-data" }
  //       // }
  //     );
  //   }
  // },
  projects: {
    get: {
      projects: (projectId, onlyActiveAssignments = true) => {
        return WebAround.get(
          `${API_ENDPOINT}/projects/${projectId}?onlyActiveAssignments=${onlyActiveAssignments}`
        );
      },
      suggestEmployees: projectId => {
        return WebAround.get(
          `${API_ENDPOINT}/projects/EmployeeWithFreeCapacity?projectId=${projectId}`
        );
      }
    },
    post: {
      list: (settings = {}) => {
        return WebAround.post(`${API_ENDPOINT}/projects/`, settings);
      },
      add: projectModel => {
        return WebAround.post(`${API_ENDPOINT}/projects/add`, projectModel);
      }
    },
    put: {
      project: (projectId, projectModel) => {
        return WebAround.put(
          `${API_ENDPOINT}/projects/${projectId}`,
          projectModel
        );
      },
      owner: (projectId, ownersIdsArray) => {
        return WebAround.put(`${API_ENDPOINT}/projects/owner/${projectId}`, {
          usersIds: ownersIdsArray
        });
      },
      closeProject: projectId => {
        return WebAround.put(`${API_ENDPOINT}/projects/close/${projectId}`);
      },
      close: model => {
        return WebAround.put(`${API_ENDPOINT}/projects/close/${model[0]}`);
      },
      reactivate: model => {
        return WebAround.put(`${API_ENDPOINT}/projects/reactivate/${model[0]}`);
      },
      reactivateProject: projectId => {
        return WebAround.put(
          `${API_ENDPOINT}/projects/reactivate/${projectId}`
        );
      },
      skills: (projectId, skillsArray) => {
        return WebAround.put(
          `${API_ENDPOINT}/projects/skills/${projectId}`,
          skillsArray
        );
      }
    },
    delete: {
      owner: model => {
        return WebAround.delete(`${API_ENDPOINT}/projects/owner/${model[0]}`, {
          data: {
            userId: model[1]
          }
        });
      },
      project: model => {
        return WebAround.delete(`${API_ENDPOINT}/projects/delete/${model[0]}`);
      },
      deleteProject: projectId => {
        return WebAround.delete(`${API_ENDPOINT}/projects/delete/${projectId}`);
      }
    }
  },
  shareProject: {
    get: {
      managers: projectId => {
        return WebAround.get(
          `${API_ENDPOINT}/shareProject/DestinationManagers/${projectId}`
        );
      },
      alreadySharedManagers: projectId => {
        return WebAround.get(
          `${API_ENDPOINT}/shareProject/AlreadySharedManagers/${projectId}`
        );
      }
    },
    post: {
      add: (projectId, shareProjectModel) => {
        return WebAround.post(
          `${API_ENDPOINT}/shareProject/${projectId}`,
          shareProjectModel
        );
      }
    },
    delete: {
      cancel: (projectId, shareProjectId) => {
        return WebAround.delete(
          `${API_ENDPOINT}/shareProject/${projectId}/${shareProjectId}`
        );
      }
    }
  },
  // clients: {
  //   get: {
  //     all: () => {
  //       return WebAround.get(`${API_ENDPOINT}/clients`);
  //     },
  //     byClientId: clientId => {
  //       return WebAround.get(`${API_ENDPOINT}/clients/${clientId}`);
  //     }
  //   },
  //   post: formData => {
  //     return WebAround.post(`${API_ENDPOINT}/clients/`, formData);
  //   },
  //   delete: clientId => {
  //     return WebAround.delete(`${API_ENDPOINT}/clients/${clientId}`);
  //   },
  //   put: {
  //     info: (clientId, formData) => {
  //       return WebAround.put(`${API_ENDPOINT}/clients/${clientId}`, formData);
  //     },
  //     reactivate: clientId => {
  //       return WebAround.put(`${API_ENDPOINT}/clients/${clientId}/reactivate`);
  //     }
  //   }
  // },
  // clouds: {
  //   post: (name, fields, clientId) => {
  //     return WebAround.post(`${API_ENDPOINT}/clouds/`, {
  //       name,
  //       fields,
  //       clientId
  //     });
  //   },
  //   edit: (cloudId, name, fields, clientId) => {
  //     return WebAround.put(`${API_ENDPOINT}/clouds/${cloudId}`, {
  //       name,
  //       fields,
  //       clientId
  //     });
  //   },
  //   delete: cloudId => {
  //     return WebAround.delete(`${API_ENDPOINT}/clouds/${cloudId}`);
  //   },
  //   reactivate: cloudId => {
  //     return WebAround.put(`${API_ENDPOINT}/clouds/${cloudId}/reactivate`);
  //   }
  // },
  education: {
    get: {
      byEmployee: employeeId => {
        return WebAround.get(`${API_ENDPOINT}/employees/${employeeId}`);
      },
      byEducation: educationId => {}
    },
    delete: educationId => {},
    put: educationId => {},
    post: () => {}
  },
  //   get: {
  //     questions: () => {
  //       return WebAround.get(`${API_ENDPOINT}/QuarterTalks/questions`);
  //     },
  //     getQuarterForEmployee: employeeId => {
  //       return WebAround.get(
  //         `${API_ENDPOINT}/QuarterTalks/ForEmployee/` + employeeId
  //       );
  //     },
  //     generateDoc: quarterId => {
  //       return WebAround.get(
  //         `${API_ENDPOINT}/QuarterTalks/GenerateDocx/${quarterId}`
  //       );
  //     }
  //   },
  //   delete: {
  //     question: questionId => {
  //       return WebAround.delete(
  //         `${API_ENDPOINT}/QuarterTalks/Question/${questionId}`
  //       );
  //     }
  //   },
  //   put: {
  //     populateQuarter: (model, quarterId) => {
  //       return WebAround.put(
  //         `${API_ENDPOINT}/QuarterTalks/${quarterId}`,
  //         model
  //       );
  //     }
  //   },
  //   post: {
  //     addQuestion: model => {
  //       return WebAround.post(`${API_ENDPOINT}/QuarterTalks/Question`, model);
  //     },
  //     createQuarter: model => {
  //       return WebAround.post(`${API_ENDPOINT}/QuarterTalks`, model);
  //     },
  //     planQuarter: (model, shouldSync) => {
  //       return WebAround.post(
  //         `${API_ENDPOINT}/QuarterTalks/Planned?syncCalendar=${shouldSync}`,
  //         model
  //       );
  //     },
  //     reservedDates: (model, checkOutlook) => {
  //       return WebAround.post(
  //         `${API_ENDPOINT}/QuarterTalks/GetReservedDates?checkOutlook=${checkOutlook}`,
  //         model
  //       );
  //     }
  //   }
  // },
  // employees: { // deleteOnBoardEmployee, deleteEmployee
  //   get: {
  //     byEmployee: employeeId => {
  //       return WebAround.get(`${API_ENDPOINT}/employees/${employeeId}`);
  //     },
  //     capacity: employeeId => {
  //       return WebAround.get(
  //         `${API_ENDPOINT}/employees/${employeeId}/capacity`
  //       );
  //     },
  //     employeesAndManagers: () => {
  //       return WebAround.get(
  //         `${API_ENDPOINT}/sharedEmployees/getEmployeesAndManagers`
  //       );
  //     },
  //     onBoards: employeeId => {
  //       return WebAround.get(`${API_ENDPOINT}/employees/GetOnBoardsByEmployeeId/${employeeId}`
  //       );
  //     },
  //     emplo: {
  //       contact: employeeId => {
  //         return WebAround.get(
  //           `${API_ENDPOINT}/employees/billenniumemplocontact`,
  //           params({ employeeId })
  //         );
  //       },
  //       skills: employeeId => {
  //         return WebAround.get(
  //           `${API_ENDPOINT}/employees/billenniumemploskills`,
  //           params({ employeeId })
  //         );
  //       }
  //     }
  //   },
  //   post: {
  //     add: employee => {
  //       return WebAround.post(`${API_ENDPOINT}/employees/add`, employee);
  //     },
  //     addOnBoard: onBoardModel => {
  //       return WebAround.post(`${API_ENDPOINT}/employees/addToOnBoard`, onBoardModel);
  //     }
  //   },
  //   deleteOnBoard: onBoardId => {
  //     return WebAround.delete(`${API_ENDPOINT}/employees/DeleteOnBoard/${onBoardId}`);
  //   },
  //   delete: employeeId => {
  //     return WebAround.delete(`${API_ENDPOINT}/employees/${employeeId}`);
  //   },
  //   put: {
  //     // skills: (employeeId, skillsArray) => {
  //     //   return WebAround.put(
  //     //     `${API_ENDPOINT}/employees/${employeeId}`,
  //     //     skillsArray
  //     //   );
  //     // },
  //     foreignLanguages: (employeeId, languagesArray) => {
  //       return WebAround.put(
  //         `${API_ENDPOINT}/employees/${employeeId}`,
  //         languagesArray
  //       );
  //     },
  //     updateSkype: (skypeId, employeeId) => {
  //       return WebAround.put(`${API_ENDPOINT}/employees/UpdateSkype`, {
  //         skypeId,
  //         employeeId
  //       });
  //     },
  //     updateOnBoard: (onBoardModel, onBoardId) => {
  //       return WebAround.patch(`${API_ENDPOINT}/Employees/EditOnBoard/${onBoardId}`, onBoardModel);
  //     }
  //   },
  //   patch: {
  //     data: (employeeId, model) => {
  //       return WebAround.patch(
  //         `${API_ENDPOINT}/employees/${employeeId}`,
  //         model
  //       );
  //     },
  //     reactivate: employeeId => {
  //       return WebAround.patch(
  //         `${API_ENDPOINT}/employees/reactivate/${employeeId}`
  //       );
  //     }
  //   }
  // },
  // sharedEmployees: {
  //   get: {
  //     forManager: managerId => {
  //       return WebAround.get(
  //         `${API_ENDPOINT}/sharedEmployees/forManager/${managerId}`
  //       );
  //     }
  //   },
  //   post: {
  //     add: sharedEmployeeModel => {
  //       return WebAround.post(
  //         `${API_ENDPOINT}/sharedEmployees`,
  //         sharedEmployeeModel
  //       );
  //     }
  //   },
  //   delete: {
  //     deleteById: sharedEmployeeId => {
  //       return WebAround.delete(
  //         `${API_ENDPOINT}/sharedEmployees/${sharedEmployeeId}`
  //       );
  //     }
  //   }
  // },
  // foreignLanguages: {
  //     uploadFile: (model, config) => {
  //       return WebAround.post(`${API_ENDPOINT}/onedrive/upload`, model, config);
  //     }
  //   }
  // },
  responsiblePerson: {
    get: {
      byClient: clientId => {
        return WebAround.get(
          `${API_ENDPOINT}/responsiblepersons/client/${clientId}`
        );
      },
      byResponsiblePerson: responsiblePersonId => {
        return WebAround.get(
          `${API_ENDPOINT}/responsiblepersons/${responsiblePersonId}`
        );
      }
    },
    edit: (
      responsiblePersonId,
      firstName,
      lastName,
      email,
      phoneNumber,
      client
    ) => {
      return WebAround.put(
        `${API_ENDPOINT}/responsiblePersons/${responsiblePersonId}`,
        {
          firstName,
          lastName,
          email,
          phoneNumber,
          client
        }
      );
    },
    post: (firstName, lastName, client, email, phoneNumber) => {
      return WebAround.post(`${API_ENDPOINT}/responsiblepersons`, {
        firstName,
        lastName,
        client,
        email,
        phoneNumber
      });
    },
    delete: responsiblePersonId => {
      return WebAround.delete(
        `${API_ENDPOINT}/responsiblepersons`,
        params({ responsiblePersonId })
      );
    },
    reactivate: responsiblePersonId => {
      return WebAround.put(
        `${API_ENDPOINT}/responsiblepersons/${responsiblePersonId}/reactivate`
      );
    }
  },
  skills: {
    get: {
      all: () => {
        return WebAround.get(`${API_ENDPOINT}/skills`);
      },
      bySkill: skillId => {
        return WebAround.get(`${API_ENDPOINT}/skills/${skillId}`);
      }
    },
    post: newName => {
      return WebAround.post(`${API_ENDPOINT}/skills`, { name: newName });
    },
    delete: skillId => {
      return WebAround.delete(`${API_ENDPOINT}/skills/${skillId}`);
    },
    put: (skillId, skillModel) => {
      return WebAround.put(`${API_ENDPOINT}/skills/${skillId}`, skillModel);
    }
  },
  stats: {
    get: {
      basic: () => {
        return WebAround.get(`${API_ENDPOINT}/stats/basic`);
      }
    }
  },
  // users: {
  //   get: {
  //     byUser: userId => {
  //       return WebAround.get(`${API_ENDPOINT}/account/${userId}`);
  //     },
  //     adSearch: query => {
  //       return WebAround.get(`${API_ENDPOINT}/account/searchAD/${query}`);
  //     }
  //   },
  //   post: {
  //     list: (settings = {}) => {
  //       return WebAround.post(`${API_ENDPOINT}/account`, settings);
  //     },
  //     listOfRequests: (settings = {}) => {
  //       return WebAround.post(`${API_ENDPOINT}/account/requests`, settings);
  //     },
  //     add: (userId, roles) => {
  //       return WebAround.post(`${API_ENDPOINT}/account/add`, {
  //         id: userId,
  //         roles
  //       });
  //     },
  //     login: (login, password) => {
  //       return axios
  //         .post(`${API_ENDPOINT}/account/login`, { login, password })
  //         .then(response => response.data.dtoObject);
  //     },
  //     logout: () => {
  //       return axios.post(`${API_ENDPOINT}/account/logout`);
  //     },
  //     token: refreshToken => {
  //       return axios.post(`${API_ENDPOINT}/account/login`, { refreshToken });
  //     }
  //   },
  //   delete: {
  //     user: userId => {
  //       return WebAround.delete(`${API_ENDPOINT}/account/${userId}`);
  //     },
  //     request: userId => {
  //       return WebAround.delete(
  //         `${API_ENDPOINT}/account/requests`,
  //         params({ userId })
  //       );
  //     }
  //   },
  //   patch: {
  //     roles: (userId, roles) => {
  //       return WebAround.patch(`${API_ENDPOINT}/account`, {
  //         Id: userId,
  //         Roles: roles
  //       });
  //     },
  //     reactivate: userId => {
  //       return WebAround.patch(`${API_ENDPOINT}/account/reactivate/${userId}`);
  //     }
  //   }
  // },
  workExperience: {
    get: {
      byExperience: workExperienceId => {},
      byEmployee: employeeId => {}
    },
    post: () => {},
    delete: () => {},
    put: () => {}
  }
};

class DCMTWebApi {
  auth(login, password) {
    return axios
      .post(`${API_ENDPOINT}/account/login`, { login, password })
      .then(response => response.data.dtoObject);
  }

  getStatistics() {
    return axios.get(`${API_ENDPOINT}/statistics`);
  }

  getUsers(settings = {}) {
    return axios
      .post(`${API_ENDPOINT}/account`, settings)
      .catch(response => authValidator(response));
  }

  searchAD(user) {
    return axios
      .get(`${API_ENDPOINT}/account/searchAD/${user}`)
      .catch(response => authValidator(response));
  }

  addUser(id, roles) {
    return axios
      .post(`${API_ENDPOINT}/account/add`, { id, roles })
      .catch(response => authValidator(response));
  }

  deleteUser(id) {
    return axios
      .delete(`${API_ENDPOINT}/account/${id}`)
      .catch(response => authValidator(response));
  }

  getUser(id) {
    return axios
      .get(`${API_ENDPOINT}/account/${id}`)
      .catch(response => authValidator(response));
  }

  reactivateUser(id) {
    return axios
      .patch(`${API_ENDPOINT}/account/reactivate/${id}`)
      .catch(response => authValidator(response));
  }

  changeUserRole(id, roles) {
    return axios
      .patch(`${API_ENDPOINT}/account`, {
        id,
        roles
      })
      .catch(response => authValidator(response));
  }

  getProjects(settings = {}) {
    return axios
      .post(`${API_ENDPOINT}/projects`, settings)
      .catch(response => authValidator(response));
  }

  getProject(id) {
    return axios
      .get(`${API_ENDPOINT}/projects/${id}`)
      .catch(response => authValidator(response));
  }

  addProject({
    name,
    description,
    client,
    responsiblePerson,
    startDate,
    estimatedEndDate
  }) {
    return axios.post(`${API_ENDPOINT}/projects/add`, {
      name,
      description,
      client,
      responsiblePerson,
      startDate,
      estimatedEndDate
    });
    //.catch(response => authValidator(response));
  }

  editProject({
    id,
    name,
    description,
    client,
    responsiblePerson,
    startDate,
    estimatedEndDate
  }) {
    return axios.put(`${API_ENDPOINT}/projects/${id}`, {
      name,
      client,
      description,
      responsiblePerson,
      startDate,
      estimatedEndDate
    });
    //.catch(response => authValidator(response));
  }

  addOwners(projectId, ownersArray) {
    return axios.put(`${API_ENDPOINT}/projects/${projectId}/owner`, {
      usersIds: ownersArray
    });
    //.catch(response => authValidator(response));
  }

  deleteProject(id) {
    return axios.delete(`${API_ENDPOINT}/projects/${id}/delete`);
    //.catch(response => authValidator(response));
  }

  closeProject(id) {
    return axios.put(`${API_ENDPOINT}/projects/${id}/close`);
    //.catch(response => authValidator(response));
  }

  reactivateProject(id) {
    return axios.put(`${API_ENDPOINT}/projects/${id}/reactivate`);
    //.catch(response => authValidator(response));
  }

  putProjectSkills(id, skillsArray) {
    return axios.put(`${API_ENDPOINT}/projects/${id}/skills`, skillsArray);
    //.catch(response => authValidator(response));
  }

  deleteProjectOwner(ownerId, projectId) {
    return axios.delete(`${API_ENDPOINT}/projects/${projectId}/owner`, {
      data: {
        userId: ownerId
      }
    });
    //.catch(response => authValidator(response));
  }

  getAssignmentsForEmployee(id) {
    return axios.get(`${API_ENDPOINT}/assignments/employee/${id}`);
    //.catch(response => authValidator(response));
  }

  getAssignmentsForProject(id) {
    return axios.get(`${API_ENDPOINT}/assignments/project/${id}`);
    //.catch(response => authValidator(response));
  }

  addAssignment(
    employeeId,
    projectId,
    startDate,
    endDate,
    role,
    assignedCapacity,
    responsibilitiesArray
  ) {
    return axios.post(`${API_ENDPOINT}/assignments`, {
      employeeId,
      projectId,
      startDate,
      endDate,
      role,
      assignedCapacity,
      responsibilities: responsibilitiesArray
    });
    //.catch(response => authValidator(response));
  }

  editAssignment(id, startDate, endDate, role, assignedCapacity) {
    return axios.put(`${API_ENDPOINT}/assignments/${id}`, {
      startDate,
      endDate,
      role,
      assignedCapacity
    });
    //.catch(response => authValidator(response));
  }

  deleteAssignment(id) {
    return axios.delete(`${API_ENDPOINT}/assignments/${id}`);
    //.catch(response => authValidator(response));
  }

  getEmployee(id) {
    return axios.get(`${API_ENDPOINT}/employees/${id}`);
    //.catch(response => authValidator(response));
  }

  addEmployee(id, capacity, seniority, skillsArray) {
    return axios.post(`${API_ENDPOINT}/employees/add`, {
      id,
      capacity,
      seniority,
      skills: skillsArray
    });
    //.catch(response => authValidator(response));
  }

  editEmployee(id, seniority, capacity) {
    return axios.patch(`${API_ENDPOINT}/employees/${id}`, {
      seniority,
      capacity
    });
    //.catch(response => authValidator(response));
  }

  editEmployeeSkills(id, skillsArray) {
    return axios.put(`${API_ENDPOINT}/employees/${id}/skills`, skillsArray);
    //.catch(response => authValidator(response));
  }

  getEmploSkills(employeeId) {
    return axios.get(`${API_ENDPOINT}/employees/BillenniumEmploSkills`, {
      params: {
        employeeId
      }
    });
    //.catch(response => authValidator(response));
  }

  getEmploContactInfo(employeeId) {
    return axios.get(`${API_ENDPOINT}/employees/BillenniumEmploContact`, {
      params: {
        employeeId
      }
    });
    //.catch(response => authValidator(response));
  }

  overrideSkillsOnEmployee(id, skillsArray) {
    return axios.put(`${API_ENDPOINT}/employee/${id}`, skillsArray);
    //.catch(response => authValidator(response));
  }

  deleteEmployee(id) {
    return axios.delete(`${API_ENDPOINT}/employees/${id}`);
    //.catch(response => authValidator(response));
  }

  changeEmployeeSeniority(id, seniority, role) {
    return axios.patch(`${API_ENDPOINT}/employees/${id}`, { seniority, role });
    //.catch(response => authValidator(response));
  }

  addSkill(name) {
    return axios.post(`${API_ENDPOINT}/skills`, { name });
    //.catch(response => authValidator(response));
  }

  getSkills() {
    return axios.get(`${API_ENDPOINT}/skills`);
    //.catch(response => authValidator(response));
  }

  deleteSkill(name, level) {
    return axios.delete(`${API_ENDPOINT}/skills`, { name, level });
    //.catch(response => authValidator(response));
  }

  // addResponsiblePerson(firstName, lastName, clientId, phoneNumber, email) {
  //   return axios.post(`${API_ENDPOINT}/responsiblepersons`, {
  //     firstName,
  //     lastName,
  //     clientId,
  //     phoneNumber,
  //     email
  //   });
  // }
}

// ------------------------------------------------------------------------------

class DCMTMockApi extends DCMTWebApi {
  pretendResponse(dtoObject, simulateError) {
    const status = simulateError ? 400 : 200;
    const statusText = simulateError ? 'Internal Server Error' : 'OK';
    return {
      data: {
        dtoObject,
        errorOccurred: simulateError,
        errors: {}
      },
      status,
      statusText
    };
  }

  auth(username, password) {
    return BluebirdResolve({
      email: 'jane.doe@kappa.com',
      extra: 'Jane Doe'
    });
  }

  getUsers(page, simulateError = false) {
    return BluebirdResolve(
      this.pretendResponse(usersMocks.UsersObject(page), simulateError)
    );
  }

  searchAD(user, simulateError = false) {
    return BluebirdResolve(
      this.pretendResponse(usersMocks.ActiveDirectory(user, simulateError))
    );
  }

  addUser(id, role, simulateError = false) {
    return BluebirdResolve(this.pretendResponse(null, simulateError));
  }

  getUser(id, simulateError = false) {
    return BluebirdResolve(
      this.pretendResponse(usersMocks.UserObject(id, simulateError))
    );
  }

  changeUserRole(id, role, simulateError = false) {
    return BluebirdResolve(this.pretendResponse(null, simulateError));
  }

  deleteUser(id, simulateError = false) {
    return BluebirdResolve(this.pretendResponse(null, simulateError));
  }

  addProject(
    { projectName, description, client, responsiblePerson, startDate, endDate },
    simulateError = false
  ) {
    return BluebirdResolve(this.pretendResponse(null, simulateError));
  }

  editProject(
    id,
    name,
    description,
    client,
    responsiblePerson,
    startDate,
    estimatedEndDate,
    simulateError = false
  ) {
    return BluebirdResolve(this.pretendResponse(null, simulateError));
  }

  deleteProject(id, simulateError = false) {
    return BluebirdResolve(this.pretendResponse(null, simulateError));
  }

  getProjects(page, simulateError = false) {
    return BluebirdResolve(
      this.pretendResponse(projectsMocks.ProjectsObject(page), simulateError)
    );
  }

  getProject(id, simulateError = false) {
    return BluebirdResolve(
      this.pretendResponse(projectsMocks.ProjectObject(id, simulateError))
    );
  }

  addOwner(id, simulateError = false) {
    return BluebirdResolve(this.pretendResponse(null, simulateError));
  }
}

export default WebApi;
