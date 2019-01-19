export const calculateProjectState = (statusCode, isDeleted, t) => {
  if (isDeleted) return "deleted"
  if (statusCode === closed) return "closed";
  if (statusCode === inactive) return "inactive";
  if (statusCode === active) return "active";
}
export const closed = 2;
export const inactive = 1;
export const active = 0;
