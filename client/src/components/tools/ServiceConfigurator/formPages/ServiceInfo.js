import React from 'react';
import { Label, Input, Container, Row, Col } from 'reactstrap';

const ServiceInfo = ({ props, next, back }) => {
  return (
    <Container>
      <form className='my-3'>
        <h3 className='text-primary'>Service Information</h3>
        <Row>
          <Col>
            <Label for='serviceType'>
              <h4 className='text-secondary'>Type Of Service</h4>
            </Label>
            <Input
              onChange={props.inputChange}
              value={props.serviceConfigForm.serviceType}
              type='select'
              name='serviceType'
              id='serviceType'
            >
              <option value='COI'>COI</option>
              <option value='WOI'>WOI</option>
              <option value='CFI'>CFI</option>
              <option value='EVC'>EVC</option>
              <option value='SIP'>SIP</option>
              <option value='MGMT'>MGMT</option>
            </Input>
          </Col>
          <Col>
            <Label for='customerName'>
              <h4 className='text-secondary'>Customer Name</h4>
            </Label>
            <Input
              onChange={props.inputChange}
              type='text'
              value={props.serviceConfigForm.customerName}
              name='customerName'
              id='customerName'
            />
          </Col>
          <Col>
            <Label for='customerId'>
              <h4 className='text-secondary'>Customer ID</h4>
            </Label>
            <Input
              onChange={props.inputChange}
              type='text'
              value={props.serviceConfigForm.customerId}
              name='customerId'
              id='customerId'
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Label for='circuitId'>
              <h4 className='text-secondary'>Circuit ID</h4>
            </Label>
            <Input
              onChange={props.inputChange}
              type='text'
              value={props.serviceConfigForm.circuitId}
              name='circuitId'
              id='circuitId'
            />
          </Col>
          <Col>
            <Label for='serviceId'>
              <h4 className='text-secondary'>Service ID</h4>
            </Label>
            <Input
              onChange={props.inputChange}
              type='text'
              value={props.serviceConfigForm.serviceId}
              name='serviceId'
              id='serviceId'
            />
          </Col>
          <Col>
            <Label for='secondServiceId'>
              <h4 className='text-secondary'>Secondary Service ID</h4>
            </Label>
            <Input
              onChange={props.inputChange}
              type='text'
              value={props.serviceConfigForm.secondServiceId}
              name='secondServiceId'
              id='secondServiceId'
            />
          </Col>
        </Row>
        <Row>
          <Col className='text-left'>
            {' '}
            <button onClick={back} className='btn btn-secondary my-2'>
              Back
            </button>
          </Col>
          <Col className='text-right'>
            {' '}
            <button onClick={next} className='btn btn-primary my-2'>
              Next
            </button>
          </Col>
        </Row>
      </form>
    </Container>
  );
};

export default ServiceInfo;
