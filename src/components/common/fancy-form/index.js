import storeCreator from '../../../store/index';
import { selectLang } from '../../../api/index';

const { store } = storeCreator;
store.subscribe(listener);
let lang = 'en';
function listener() {
  switch (selectLang(store.getState())) {
    case "pl":
      lang = 'pl';
      break;
    case "en":
      lang = 'en';
      break;
  }
}

const placeholderTranslation = {
  pl: 'uzupełnij pole',
  en: 'populate field'
};

export class InputSettings {
  constructor(label, validators, component = 'input', needsSlot = false, listData = [], componentProps = {className: 'field'}) {
    this.label = label;
    this.validators = validators;
    this.component = component;
    this.needsSlot = needsSlot;
    this.listData = listData;
    componentProps.placeholder = `${placeholderTranslation[lang]} ${label}...`;
    this.componentProps = componentProps;
  }
}

export const validatorsFunctions = {
  required: (value, expectedValue, title) => value === '' ? translateMessage('required', title, expectedValue) : '',
  minLength: (value, limit, title) => (value.length > 0 && value.length <= limit) ? translateMessage('minLength', title, limit) : '',
  maxLength: (value, limit, title) => value.length > limit ? translateMessage('maxLength', title, limit) : '',
  cannotBeLike: (value, notLikeValue, title) => value === notLikeValue ? translateMessage('cannotBeLike', title, notLikeValue) : '',
  filesFormats: (fileFormat, formats, title) => checkIsFileFormatValid(fileFormat, formats, translateMessage('filesFormats', title, formats)),
  regexp: (value, patternKey, title) => patterns[patternKey].test(value) ? '' : translateMessage(patternKey, title)
};

const translateMessage = (key, title, expVal) => {
  const messageObj = messages[key](title, expVal);
  const message = messageObj[lang];
  return message;
}

export const messages = {
  required: title => ( { pl: `Pole ${title} jest polem wymaganym`, en: `Field ${title} is required` } ),
  minLength: (title, expVal) => ({ pl: `Pole ${title} musi posidać conajmniej ${expVal} znaki`, en: `Field ${title} must have more than ${expVal} characters`}),
  maxLength: (title, expVal) => ({ pl: `Pole ${title} musi posidać mniej niż ${expVal} znaki`, en: `Field ${title} must have less than ${expVal} characters`}),
  cannotBeLike: (title, expVal) => ({ pl: `Pole ${title} musi posiadać inną wartość niż ${expVal}`, en: `Field ${title} must have other value than ${expVal}`}),
  filesFormats: (title, expVal) => ({ pl: `Pole ${title} musi posiadac` , en: `File ${title} have incorrect format. Only ${expVal.join(', ')} allowed`}),
  text: title => ({ pl: `Pole ${title} musi zawiera niedozwolone znaki`, en: `Field ${title} contains not allowed characters`})
};

export const patterns = {
  text: /^[0-9a-zżźćńółęąśŻŹĆĄŚĘŁÓŃ\s-]+$/i
};

export const checkIsFileFormatValid = (fileFormat, formats, message) => {
  for(let key in formats) {
    const format = formats[key];
    const isCorrectFormat = fileFormat.search(format) !== -1;
    if (isCorrectFormat)
      return '';
  }
  return message;
}

export const runSingleValidation = (value, validators, label) => {
  for(let vk in validators) {
      const expectedVal = validators[vk];
      const error = validatorsFunctions[vk](value, expectedVal, label);
      if (error) return error;
  }
  return '';
}

export const runOnSubmitValidation = (values, formKeys, settings) => {
  const errors = {};
  let isFormInvalid = false;
  formKeys.forEach(key => {
      errors[key] = runSingleValidation(values[key], settings[key].validators, settings[key].label);
      if (errors[key]) {
          isFormInvalid = true;
      }
  });
  return { isFormInvalid, errors };
}


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

const createSlotFunctionName = key => {
  return 'render' + key.charAt(0).toUpperCase() + key.slice(1, key.length);
};

