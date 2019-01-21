import { closed, inactive, active } from '../../../constants';
export const calculateProjectState = (statusCode, isDeleted) => {
  if (isDeleted) return "deleted"
  if (statusCode === closed) return "closed";
  if (statusCode === inactive) return "inactive";
  if (statusCode === active) return "active";
}
export const deleting = 'deleting';
export const reactivating = 'reactivating';
export const closing = 'closing';
