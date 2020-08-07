import * as actions from '../actions/types';

const initialState = {
  //state for page stuff
  step: 1,
  deviceToAdd: '',
  //state for config stuff
  market: '',
  neonProjectId: '',
  circuitId: '',
  serviceType: '',
  serviceId: '',
  secondServiceId: '',
  customerName: '',
  customerId: '',
  deviceVars: {},
  //suggestion stuff
  value: '',
  suggestions: [],
  suggestionsLoading: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actions.NEXT_STEP:
      return { ...state, step: payload.step };
    case actions.PREV_STEP:
      return { ...state, step: payload.step };
    case actions.INPUT_CHANGE:
      return { ...state, [payload.key]: payload.value };
    case actions.ADD_DEVICE:
      return {
        ...state,
        deviceVars: {
          ...state.deviceVars,
          [state.deviceToAdd]: { ipAddress: state.deviceToAdd },
        },
        deviceToAdd: '',
      };
    case actions.REM_DEVICE:
      let newObj = { ...state.deviceVars };
      delete newObj[payload.ipAddress];
      return {
        ...state,
        deviceVars: newObj,
      };
    case actions.DEVICE_VAR_CHANGE:
      return {
        ...state,
        deviceVars: {
          ...state.deviceVars,
          [payload.ipAddress]: {
            ...state.deviceVars[payload.ipAddress],
            [payload.key]: payload.value,
          },
        },
      };
    case actions.CLEAR_SUGGESTIONS:
      return { ...state, suggestions: [] };
    case actions.MAYBE_UPDATE_SUGGESTIONS:
      // Ignore suggestions if input value changed
      if (payload.value !== state.value) {
        return {
          ...state,
          isLoading: false,
        };
      }
      return {
        ...state,
        suggestions: payload.suggestions,
        suggestionsLoading: false,
      };
    case actions.LOAD_SUGGESTIONS_BEGIN:
      return {
        ...state,
        suggestionsLoading: true,
      };
    case actions.UPDATE_SUGGESTION_VALUE:
      return {
        ...state,
        value: action.value,
      };
    default:
      return state;
  }
}
