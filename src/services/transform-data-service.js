import _ from 'lodash';

export const orderBy = (list, by, orderType = 'asc') => _.orderBy(list, by, orderType);
