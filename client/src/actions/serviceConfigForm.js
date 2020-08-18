import * as actions from './types';
import { getMatchingIp } from '../../src/utils/helperFunctions';
// import axios from 'axios';

//next step
export const nextStep = (step) => (dispatch) => {
  dispatch({
    type: actions.NEXT_STEP,
    payload: { step: step + 1 },
  });
};

//prev step
export const prevStep = (step) => (dispatch) => {
  dispatch({
    type: actions.PREV_STEP,
    payload: { step: step - 1 },
  });
};

//update any value in state with input it corresponds to
export const inputChange = (e) => (dispatch) => {
  dispatch({
    type: actions.INPUT_CHANGE,
    payload: { key: e.target.name, value: e.target.value },
  });
};

//add deviceToAdd to deviceVars List
export const addDevice = (e) => (dispatch) => {
  dispatch({
    type: actions.ADD_DEVICE,
  });
};

//remove device from service
export const remDevice = (ipAddress) => (dispatch) => {
  dispatch({
    type: actions.REM_DEVICE,
    payload: { ipAddress },
  });
};

//handle device var input change
export const deviceVarChange = (e, ipAddress) => (dispatch) => {
  dispatch({
    type: actions.DEVICE_VAR_CHANGE,
    payload: { key: e.target.name, value: e.target.value, ipAddress },
  });
};

//action for auto auggestion//
//clear suggestions
export const clearSuggestions = () => (dispatch) => {
  dispatch({
    type: actions.CLEAR_SUGGESTIONS,
  });
};

//load suggestions begin
export const loadSuggestionsBegin = () => (dispatch) => {
  dispatch({
    type: actions.LOAD_SUGGESTIONS_BEGIN,
  });
};

//update suggestion value
export const updateSuggestionValue = (value) => (dispatch) => {
  dispatch({
    type: actions.UPDATE_SUGGESTION_VALUE,
    payload: { value },
  });
};

//maybe update suggestions
export const maybeUpdateSuggestions = (suggestions, value) => (dispatch) => {
  dispatch({
    type: actions.MAYBE_UPDATE_SUGGESTIONS,
    payload: { suggestions, value },
  });
};

//actually load the suggestions, no reducer for this
export const loadSuggestions = (value) => (dispatch) => {
  dispatch(loadSuggestionsBegin());
  //lets make ajax call
  const suggestions = [
    {
      routerIP: '172.20.112.1',
      routerName: 'GAINBSRA01',
      routerTID: 'GSVLFLCB1QW',
      routerSDP: '',
    },
    {
      routerIP: '172.20.112.2',
      routerName: 'GAINBSRA02',
      routerTID: 'GSVLFLCB1RW',
      routerSDP: '',
    },
    {
      routerIP: '172.20.128.1',
      routerName: 'GAINBSRA02',
      routerTID: 'GSVLFLCB1RW',
      routerSDP: '',
    },
    {
      routerIP: '172.20.128.2',
      routerName: 'GAINBSRA02',
      routerTID: 'GSVLFLCB1RW',
      routerSDP: '',
    },
  ];
  //pass that to maybeUpdate suggestions
  dispatch(maybeUpdateSuggestions(getMatchingIp(value, suggestions), value));
};
