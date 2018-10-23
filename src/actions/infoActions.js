import WebApi from "../api";

import {
  ACCOUNT_CAN_SEARCH_USERS_ACCOUNTS,
  ACCOUNT_CAN_CHANGE_USERS_ROLES,
  ACCOUNT_CAN_SEARCH_AD,
  ACCOUNT_CAN_ADD_USER,
  ACCOUNT_CAN_REACTIVATE_USER,
  ACCOUNT_CAN_DELETE_USER,
  ACCOUNT_CAN_DELETE_USER_REQUEST,
  PROJECT_CAN_SEARCH_PROJECTS,
  CLIENT_GET_LIST_OF_CLIENTS,
  CLIENT_POST_CLIENT
} from "../constants";

export const infoActionCreator = () => {
  return dispatch => {
    dispatch(accountPostUsersListACreator());
    dispatch(accountPatchChangeUsersRolesACreator());
    dispatch(accountGetSearchADACreator());
    dispatch(accountPostAddUserACreator());
    dispatch(accountPatchReactivateUserACreator());
    dispatch(accountDeleteUserACreator());
    dispatch(accountDeleteUserRequestsACreator());

    dispatch(projectsPostProjectsListACreator());

    dispatch(clientGetListOfClientsACreator());
    dispatch(clientAddClientACreator());
  };
};

export const genericChangeTypeStatusLoading = (type, status, loading) => {
  return {
    type,
    status,
    loading
  };
};

export const genericInfoACreator = (Api, type) => {
  return dispatch => {
    dispatch(genericChangeTypeStatusLoading(type, false, true));
    Api.then(response => {
      !response.errorOccurred() &&
        dispatch(genericChangeTypeStatusLoading(type, true, false));
    }).catch(error => {
      if (error.replyBlock.status === 400) {
        dispatch(genericChangeTypeStatusLoading(type, true, false));
      } else {
        dispatch(genericChangeTypeStatusLoading(type, false, false));
      }
    });
  };
};

//ACCOUNT
export const accountPostUsersListACreator = () => {
  return dispatch => {
    dispatch(
      genericInfoACreator(
        WebApi.users.post.list({ Limit: 1, Page: 1 }),
        ACCOUNT_CAN_SEARCH_USERS_ACCOUNTS
      )
    );
  };
};

export const accountPatchChangeUsersRolesACreator = () => {
  return dispatch => {
    dispatch(
      genericInfoACreator(
        WebApi.users.patch.roles(),
        ACCOUNT_CAN_CHANGE_USERS_ROLES
      )
    );
  };
};

export const accountGetSearchADACreator = () => {
  return dispatch => {
    dispatch(
      genericInfoACreator(WebApi.users.get.adSearch(), ACCOUNT_CAN_SEARCH_AD)
    );
  };
};

export const accountPostAddUserACreator = () => {
  return dispatch => {
    dispatch(
      genericInfoACreator(WebApi.users.post.add(), ACCOUNT_CAN_ADD_USER)
    );
  };
};

export const accountPatchReactivateUserACreator = () => {
  return dispatch => {
    dispatch(
      genericInfoACreator(
        WebApi.users.patch.reactivate(),
        ACCOUNT_CAN_REACTIVATE_USER
      )
    );
  };
};

export const accountDeleteUserACreator = () => {
  return dispatch => {
    dispatch(
      genericInfoACreator(WebApi.users.delete.user(), ACCOUNT_CAN_DELETE_USER)
    );
  };
};

export const accountDeleteUserRequestsACreator = () => {
  return dispatch => {
    dispatch(
      genericInfoACreator(
        WebApi.users.delete.request(),
        ACCOUNT_CAN_DELETE_USER_REQUEST
      )
    );
  };
};

//PROJECTS
export const projectsPostProjectsListACreator = () => {
  return dispatch => {
    dispatch(
      genericChangeTypeStatusLoading(PROJECT_CAN_SEARCH_PROJECTS, false, true)
    );
    WebApi.projects.post
      .list({ Limit: 1, Page: 1 })
      .then(response => {
        !response.errorOccurred() &&
          dispatch(
            genericChangeTypeStatusLoading(
              PROJECT_CAN_SEARCH_PROJECTS,
              true,
              false
            )
          );
      })
      .catch(error => {
        dispatch(
          genericChangeTypeStatusLoading(
            PROJECT_CAN_SEARCH_PROJECTS,
            false,
            false
          )
        );
      });
  };
};

//CLIENT
export const clientGetListOfClientsACreator = () => {
  return dispatch => {
    dispatch(
      genericChangeTypeStatusLoading(CLIENT_GET_LIST_OF_CLIENTS, false, true)
    );
    WebApi.clients.get
      .all()
      .then(response => {
        !response.errorOccurred() &&
          dispatch(
            genericChangeTypeStatusLoading(
              CLIENT_GET_LIST_OF_CLIENTS,
              true,
              false
            )
          );
      })
      .catch(error => {
        dispatch(
          genericChangeTypeStatusLoading(
            CLIENT_GET_LIST_OF_CLIENTS,
            false,
            false
          )
        );
      });
  };
};

export const clientAddClientACreator = () => {
  return dispatch => {
    dispatch(genericChangeTypeStatusLoading(CLIENT_POST_CLIENT, false, true));
    WebApi.clients.get
      .all()
      .then(response => {
        !response.errorOccurred() &&
          dispatch(
            genericChangeTypeStatusLoading(CLIENT_POST_CLIENT, true, false)
          );
      })
      .catch(error => {
        dispatch(
          genericChangeTypeStatusLoading(CLIENT_POST_CLIENT, false, false)
        );
      });
  };
};
