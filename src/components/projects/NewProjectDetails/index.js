export const calculateProjectState = (statusCode, isDeleted, t) => {
  if (isDeleted) return "Deleted"
  if (statusCode === closed) return "Closed";
  if (statusCode === inactive) return "Inactive";
  if (statusCode === active) return "Active";
}
export const closed = 2;
export const inactive = 1;
export const active = 0;
