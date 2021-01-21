import React from 'react';
import { Label, Row, Col, Container } from 'reactstrap';
import NokiaDevice from './formPageComponents/NokiaDevice';
import NetworkGraphic from './formPageComponents/NetworkGraphic';
import AutoComplete from './formPageComponents/AutoComplete';

const WorkSpace = ({ props, next, back }) => {
  const deviceArray = Object.keys(props.serviceConfigForm.deviceVars).map(
    (ipAddress, index) => {
      return <NokiaDevice key={index} ipAddress={ipAddress} props={props} />;
    }
  );

  return (
    <Container>
      <h3 className='text-primary'>User WorkSpace</h3>
      <Label for='deviceToAdd'> Add A Device</Label>

      <div className='input-group mb-3'>
        <input
          type='text'
          className='form-control'
          placeholder='Type an IP Address'
          aria-label='Type an IP Address'
          aria-describedby='basic-addon2'
          id='deviceToAdd'
          name='deviceToAdd'
          value={props.serviceConfigForm.deviceToAdd}
          onChange={props.inputChange}
        />
        <div className='input-group-append'>
          <button
            className='btn btn-outline-primary'
            type='button'
            onClick={props.addDevice}
          >
            Add Device
          </button>
        </div>
      </div>
      {/*<AutoComplete props={props} /> */}

      <div className='row'>{deviceArray}</div>

      <div className='WorkSpaceCanvas'>
        {Object.keys(props.serviceConfigForm.deviceVars).length > 0 ? (
          <NetworkGraphic props={props} />
        ) : (
          ''
        )}
      </div>
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
    </Container>
  );
};

export default WorkSpace;
