export const validatorsFunctions = {
  required: (value, expectedValue, title, message = `Field ${title} is required`) => value === '' ? message : '',
  minLength: (value, expectedValue, title, message = `Field ${title} must have more than ${expectedValue} characters`) => value.length <= expectedValue ? message : '',
  maxLength: (value, expectedValue, title, message = `Field ${title} must have less than ${expectedValue} characters`) => value.length > expectedValue ? message : '',
  cannotBeLike: (value, notLikeValue, title, message = `Field ${title} cannot be like ${notLikeValue}`) => value === notLikeValue ? message : ''
};

export const checkFormContainErrors = errors => Object.values(errors).findIndex(val => val) !== -1;

export const createSlotFunctionsNames = (settings, keys) => {
  const slots = {};
  keys.forEach(key => {
      if (settings[key].needsSlot) {
          slots[key] = createSlotFunctionName(key);
      }
  });
  return slots;
}

const createSlotFunctionName = key => 'render' + key.charAt(0).toUpperCase() + key.slice(1, key.length);
