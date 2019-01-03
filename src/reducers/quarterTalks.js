import { ADD_QUESTION, DELETE_QUESTION, EDIT_QUESTIONS_IN_QUARTER,
    ADD_QUARTER_TALK, GET_QUESTIONS, GET_RESERVED_DATES, PLAN_QUARTER, GET_QUARTERS_FOR_EMPLOYEE
  } from "../constants";
  import { updateObject } from '../services/methods';
  const initialState = {
      addQuarterTalkStatus: null,
      addQuarterTalkErrors: [],

      getQuestionsStatus: null,
      getQuestionsErrors: [],
      questions: [],

      reservedDates: [], getDatesStatus: null, getDatesErrors: [],

      planQuarterStatus: null, planQuarterErrors: [],

      quartersForEmployee: [], quartersForEmployeeStatus: null, quartersForEmployeeErrors: [],

      addQuestionStatus: null, addQuestionErrors: [],

      deleteQuestionStatus: null, deleteQuestionErrors: []
  };

  export const quarterTalks = (state = initialState, action) => {
    switch (action.type) {
        case EDIT_QUESTIONS_IN_QUARTER:
          return {
            ...state,
            quartersForEmployee: state.quartersForEmployee.map(quarter => {
              return quarter.id === action.id ? {...action.quarter} : quarter
            })
          };
        case ADD_QUARTER_TALK:
          return updateObject(state, { addQuarterTalkStatus: action.addQuarterTalkStatus,
              addQuarterTalkErrors: action.addQuarterTalkErrors })
        case GET_QUESTIONS:
            return updateObject(state, { getQuestionsStatus: action.getQuestionsStatus, getQuestionsErrors: action.getQuestionsErrors,
                questions: action.questions})
        case PLAN_QUARTER:
            return updateObject(state, { planQuarterStatus: action.planQuarterStatus, planQuarterErrors: action.planQuarterErrors })
        case GET_RESERVED_DATES:
            return updateObject(state, { reservedDates: action.reservedDates, getDatesStatus: action.getDatesStatus, getDatesErrors: action.getDatesErrors })
        case GET_QUARTERS_FOR_EMPLOYEE:
            return updateObject(state, { quartersForEmployee: action.quartersForEmployee,
                quartersForEmployeeStatus: action.quartersForEmployeeStatus, quartersForEmployeeErrors: action.quartersForEmployeeErrors })
        case ADD_QUESTION:
            return updateObject(state, { addQuestionStatus: action.addQuestionStatus, addQuestionErrors: action.addQuarterTalkErrors })
        case DELETE_QUESTION:
            return updateObject(state, { deleteQuestionStatus: action.status,
                deleteQuestionErrors: action.errors});
            default:
        return state;
    }
  };
