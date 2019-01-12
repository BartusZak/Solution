import { useRequest } from '../api/index';
import { getClientsSlim } from '../actions/clientsActions';

export const createResponsiblePerson = model => dispatch => new Promise((resolve, reject) => {
  useRequest('createResponsiblePerson', model)
  .then(addedPerson => {
    dispatch(getClientsSlim())
      .then(() => resolve())
      .catch(() => reject());
  })
  .catch(() => reject());
});

export const editResponsiblePerson = (model, id) => dispatch => new Promise((resolve, reject) => {
  useRequest('editResponsiblePerson', model, id)
  .then(response => {
    dispatch(getClientsSlim())
    .then(() => resolve())
    .catch(() => reject());
  })
  .catch(() => reject());
})
