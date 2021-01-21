import React from 'react';
import { Label, Input, Container, Row, Col } from 'reactstrap';

const Project = ({ props, next }) => {
  return (
    <Container>
      <form className='my-3'>
        <h3 className='text-primary'>Project Information</h3>
        <Row>
          <Col>
            <Label for='neonProjectId'>
              <h4 className='text-secondary'>Neon Project Id</h4>
            </Label>
            <Input
              type='text'
              value={props.serviceConfigForm.neonProjectId}
              onChange={props.inputChange}
              name='neonProjectId'
              id='neonProjectId'
            />
          </Col>
          <Col>
            <Label for='market'>
              <h4 className='text-secondary'>Market</h4>
            </Label>
            <Input
              type='select'
              onChange={props.inputChange}
              value={props.serviceConfigForm.market}
              name='market'
              id='market'
            >
              <option value=''>Select</option>
              <option value='GC'>Gulf Coast</option>
              <option value='CF'>Central Florida</option>
              <option value='MGA'>Middle Georgia</option>
              <option value='GLA'>Greater Louisiana</option>
              <option value='NOLA'>New Orleans</option>
            </Input>
          </Col>
        </Row>
        <Col className='text-right'>
          {' '}
          <button type='button' onClick={next} className='btn btn-primary my-2'>
            Next
          </button>
        </Col>
      </form>
    </Container>
  );
};

export default Project;
