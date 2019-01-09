import moment from "moment";
import RegexPatterns from "../constraints";
import storeCreator from "./../store";
import { selectLang } from './../api/index';

const errorFactory = {
  empty:     (inputTitle) => ({ pl: `Wartość pola ${inputTitle} nie może być pusta`, en: `Field ${inputTitle} can not be empty`}),
  minLength: (inputTitle) => ({ pl: `Wartość pola ${inputTitle} ma za mało znaków`, en: `Value of field ${inputTitle} have not enough characters`}),
  maxLength: (inputTitle) => ({ pl: `Wartość pola ${inputTitle} ma za dużo znaków`, en: `Value of field ${inputTitle} have too much characters`}),
  tooEarly:         { pl: `Podana pora dnia jest zbyt wczesna`, en: `The time of day is too early`},
  tooLate:          { pl: `Podana pora dnia jest zbyt późna`, en: `The time of day is too late`},
  invalidFormat:    { pl: `Nieprawidłowy format pola`, en: `Invalid field format`},
  dateEqualLess:    { pl: `Podana data nie może być równa lub mniejsza niż poprzednia data`, en: `Date can not be equal or less than the previous date`},
  dateEqualGreater: { pl: `Podana data nie może być równa lub większa od następnej daty`, en: `Date can not be equal or greater than the next date`},
  minOneHourSpace:  { pl: `Odległość czasowa pomiędzy datami powinna mieć co najmniej godzinę`, en: `The time distance between dates should be at least one hour`},
  startAfterEnd:    { pl: `Data rozpoczęcia nie powinna być poźniej niż data zakończenia`, en: `The start date should not be later than the end date`},
  endBeforeStart:   { pl: `Data zakończenia nie może być wcześniej niż data rozpoczęcia`, en: `The end date can not be earlier than the start date`},
  mustBeANumber:    { pl: `Wartość musi być liczbą`, en: `The value must be a number`},
  dateFromThePast:  { pl: `Podana data nie może odnosić do przeszłości oraz do dzisiejszego dnia`, en: `Date can not refer to the past`},
};

const { store } = storeCreator;
store.subscribe(listener);
let lang = 'pl';

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

export const validateInput = (
inputValue, canBeNull, minLength, maxLength, inputType, inputTitle, range, validateDateRangeIsHigherThanObject, t) => {
  if (!canBeNull && inputValue.length === 0) {
    return errorFactory.empty(inputTitle)[lang];
  }
  if (inputValue !== "" && minLength && inputValue.replace(/ /g, "").length < minLength) {
    return errorFactory.minLength(inputTitle)[lang];
  }

  if (maxLength && inputValue.replace(/ /g, "").length > maxLength) {
    return errorFactory.maxLength(inputTitle)[lang];
  }

  if(range && inputValue.length > 0){
    const timeValueWithDate = "10-12-1994" + inputValue;
    const momentFormatTime = moment(timeValueWithDate,"DD-MM-YYYY HH:mm");

    const startTimeValue = "10-12-1994" + range.startValue;
    const endTimeValue = "10-12-1994" + range.endValue;

    const momentStartTimeValue = moment(startTimeValue, "DD-MM-YYYY HH:mm");
    const momentEndTimeValue = moment(endTimeValue, "DD-MM-YYYY HH:mm");

    if(momentFormatTime.isBefore(momentStartTimeValue))
      return errorFactory.tooEarly[lang];

    if(momentFormatTime.isAfter(momentEndTimeValue))
      return errorFactory.tooLate[lang];
  }

  if(validateDateRangeIsHigherThanObject){
    const inputValueWithDate = "10-12-1994" + inputValue;
    const momentedInputValue = moment(inputValueWithDate, "DD-MM-YYYY HH:mm");

    const startTimeWithDate = "10-12-1994" + validateDateRangeIsHigherThanObject.startValue.time;
    const startTimeWithDateMomented = moment(startTimeWithDate, "DD-MM-YYYY HH:mm");

    if(validateDateRangeIsHigherThanObject.startValue.isHelpOnly && momentedInputValue.isBefore(startTimeWithDateMomented))
      return errorFactory.tooEarly[lang];
    if(!validateDateRangeIsHigherThanObject.startValue.isHelpOnly && momentedInputValue.isSameOrBefore(startTimeWithDateMomented.add(1, "hours")))
      return errorFactory.dateEqualLess[lang];

    const endTimeWithDate = "10-12-1994" + validateDateRangeIsHigherThanObject.endValue.time;
    const endTimeWithDateMomented = moment(endTimeWithDate, "DD-MM-YYYY HH:mm");

    if(momentedInputValue.isSameOrAfter(endTimeWithDateMomented)){
      return errorFactory.dateEqualGreater[lang];
    }

      const difference = momentedInputValue.diff(endTimeWithDateMomented);
      const hours = Math.abs(moment.duration(difference).hours());
      if(hours === 0){
        return errorFactory.minOneHourSpace[lang];
      }
  }

  if (inputType && !canBeNull) {
    if (!RegexPatterns.projetctFormPattern[inputType].test(inputValue)) {
      return errorFactory.invalidFormat[lang];
    }
  }

  return "";
};

export const validateDate = (startDate, endDate) => {
  if (startDate.isAfter(endDate))
    return [
      errorFactory.startAfterEnd[lang],
      errorFactory.endBeforeStart[lang],
    ];

  return ["", ""];
};

export const validateReportPages = value => {
  if (!RegexPatterns.projetctFormPattern.number.test(value))
    return errorFactory.mustBeANumber[lang];

  return "";
};

export const validateDateIsNotFromPast = givenDate => {
  const dateNow = moment();
  if(moment(givenDate, 'DD-MM-YYYY').isSameOrBefore(dateNow)){
    return errorFactory.dateFromThePast[lang];
  }

  return "";
}
