import React from 'react';

import Project from './formPages/Project';
import ServiceInfo from './formPages/ServiceInfo';
import WorkSpace from './formPages/WorkSpace';
import Review from './formPages/Review';
import Deploy from './formPages/Deploy';

const MultiStepForm = ({ props, next, back }) => {
  switch (props.serviceConfigForm.step) {
    case 1:
      return <Project props={props} next={next} />;
    case 2:
      return <ServiceInfo props={props} next={next} back={back} />;
    case 3:
      return <WorkSpace props={props} next={next} back={back} />;
    case 4:
      return <Review props={props} next={next} back={back} />;
    default:
      //to beggining
      return 'Please refresh the page';
  }
};

export default MultiStepForm;
