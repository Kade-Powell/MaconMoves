import React from 'react';
// import PropTypes from 'prop-types';
// import { Col, Row } from 'reactstrap';
import Autosuggest from 'react-autosuggest';

export const Autocomplete = ({ props }) => {
  const onSuggestionsFetchRequested = ({ value }) => {
    props.loadSuggestions(value);
  };
  const onSuggestionsClearRequested = () => {
    props.clearSuggestions();
  };
  const getSuggestionValue = (suggestion) => {
    return suggestion.routerIP;
  };
  const renderSuggestion = (suggestion) => {
    return (
      <span>
        <span id='routerIP'>{suggestion.routerIP} - </span>
        {suggestion.routerName}
      </span>
    );
  };
  const onChange = (e, { newValue, method }) => {};

  // Autosuggest will pass through all these props to the input.
  const inputProps = {
    placeholder: 'Enter an IP Adress',
    value: props.serviceConfigForm.value,
    id: 'value',
    name: 'value',
    onChange: props.inputChange,
  };
  return (
    <Autosuggest
      suggestions={props.serviceConfigForm.suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
    />
  );
};

export default Autocomplete;
