import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  nextStep,
  prevStep,
  inputChange,
  addDevice,
  remDevice,
  deviceVarChange,
  clearSuggestions,
  loadSuggestions,
  updateSuggestionValue,
} from '../../../actions/serviceConfigForm';

import MultiStepForm from './MultiStepForm';

const ServiceConfigurator = (props) => {
  const next = () => {
    props.nextStep(props.serviceConfigForm.step);
  };

  const back = () => {
    props.prevStep(props.serviceConfigForm.step);
  };

  return (
    <Fragment>
      <h1 className='text-primary text-center'> Nokia Service Configurator</h1>
      <MultiStepForm props={props} next={next} back={back} />
    </Fragment>
  );
};

ServiceConfigurator.propTypes = {
  //actions
  nextStep: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired,
  inputChange: PropTypes.func.isRequired,
  addDevice: PropTypes.func.isRequired,
  //state props
  serviceConfigForm: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  //state for page stuff
  serviceConfigForm: state.serviceConfigForm,
});

export default connect(mapStateToProps, {
  nextStep,
  prevStep,
  inputChange,
  addDevice,
  remDevice,
  deviceVarChange,
  clearSuggestions,
  loadSuggestions,
  updateSuggestionValue,
})(ServiceConfigurator);
