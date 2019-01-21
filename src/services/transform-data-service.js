import _ from 'lodash';

export const orderBy = (list, by, orderType = 'asc') => _.orderBy(list, by, orderType);

export const transformArrayIntoObject = (keyToChoose, items) => {
  const transformedObject = {};
  items.forEach(element => {
    const keyForObject = element[keyToChoose];
    transformedObject[keyForObject] = element;
  });
  return transformedObject;
}
