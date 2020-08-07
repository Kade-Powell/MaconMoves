import React, { Fragment } from 'react';
import { FormText, Row, Col } from 'reactstrap';
import QosSelector from './QosSelector';

export const TerminatingSection = ({
  props,
  handleDeviceVarChange,
  ipAddress,
}) => {
  const deviceVars = props.serviceConfigForm.deviceVars[ipAddress];
  return (
    <Fragment>
      <Row>
        <Col>
          <FormText>Class Of Service</FormText>
          <select
            className='form-control form-control-sm'
            id='classOfService'
            name='classOfService'
            value={deviceVars.classOfService || 'BestEffort-BE'}
            onChange={handleDeviceVarChange}
          >
            <option value='BestEffort-BE'>Best Effort</option>
            <option value='Priority-L2'>Priority</option>
            <option value='RealTime-L1'>Real Time</option>
          </select>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormText>Ingress QOS</FormText>
          <select
            className='form-control form-control-sm'
            id='ingressQos'
            name='ingressQos'
            onChange={handleDeviceVarChange}
            value={deviceVars.ingressQos || ''}
          >
            <QosSelector deviceType={deviceVars.deviceType} />
          </select>
        </Col>
        <Col>
          <FormText>Egress QOS</FormText>
          <select
            className='form-control form-control-sm'
            id='egressQos'
            name='egressQos'
            onChange={handleDeviceVarChange}
            value={deviceVars.egressQos || ''}
          >
            <QosSelector deviceType={deviceVars.deviceType} />
          </select>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormText>SAP Port</FormText>
          <input
            className='form-control form-control-sm'
            id='terminatingPort'
            name='terminatingPort'
            type='text'
            onChange={handleDeviceVarChange}
            value={deviceVars.terminatingPort || ''}
            placeholder='1/1/1'
          />
        </Col>
        <Col>
          <FormText>VLAN</FormText>
          <input
            className='form-control form-control-sm'
            id='vlan'
            name='vlan'
            type='text'
            onChange={handleDeviceVarChange}
            value={deviceVars.vlan || ''}
            placeholder='795'
          />
        </Col>
      </Row>
      {deviceVars.terminatingPort &&
      deviceVars.terminatingPort.includes('lag') ? (
        <Row>
          <Col>
            <FormText>MC Lag</FormText>
            <select
              className='form-control form-control-sm'
              id='isMcLag'
              name='isMcLag'
              onChange={handleDeviceVarChange}
              value={deviceVars.isMcLag || 'true'}
            >
              <option value='true'>Yes</option>
              <option value='flase'>No</option>
            </select>
          </Col>
        </Row>
      ) : (
        ''
      )}

      {deviceVars.isMcLag === 'true' ? (
        <Row>
          <Col>
            <FormText>ICB SDP</FormText>
            <input
              className='form-control form-control-sm'
              id='icbSdp'
              name='icbSdp'
              type='text'
              onChange={handleDeviceVarChange}
              value={deviceVars.icbSdp || ''}
              placeholder='1701'
            />
          </Col>
        </Row>
      ) : (
        ''
      )}
    </Fragment>
  );
};

export default TerminatingSection;
