import React, { useState, Fragment } from 'react';
import {
  FormText,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container,
} from 'reactstrap';
import TerminatingSection from './TerminatingSection';

const NokiaDevice = ({ props, ipAddress }) => {
  //modal stuff
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const deviceVars = props.serviceConfigForm.deviceVars[ipAddress];
  const handleDeviceVarChange = (e) => {
    props.deviceVarChange(e, ipAddress);
  };

  const routerOptions = Object.keys(props.serviceConfigForm.deviceVars).map(
    (device) => {
      if (device !== ipAddress) {
        return <option value={device}> {device} </option>;
      }
    }
  );

  return (
    <Fragment>
      <div className='device mb-1'>
        <p>{deviceVars.ipAddress}</p>
        <Row>
          <Col>
            <button
              onClick={toggle}
              className='btn btn-outline-primary btn-block'
            >
              Edit
            </button>
          </Col>
        </Row>
      </div>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{deviceVars.ipAddress}</ModalHeader>
        <ModalBody>
          <Container>
            <Row>
              <Col>
                <FormText> Device Type</FormText>
                <select
                  className='form-control form-control-sm'
                  id='deviceType'
                  name='deviceType'
                  onChange={handleDeviceVarChange}
                  value={deviceVars.deviceType || ''}
                >
                  <option value=''>Select</option>
                  <option value='7210Mxp'>SAS-MXP</option>
                  <option value='7210M'>SAS-M</option>
                  <option value='7210K30'>SAS-K30</option>
                  <option value='7210K5'>SAS-K5</option>
                  <option value='IXR'>IXR-R6</option>
                  <option value='7750'>7750</option>
                </select>
              </Col>
              <Col>
                <FormText> Site Type</FormText>
                <select
                  className='form-control form-control-sm'
                  id='isTerminating'
                  name='isTerminating'
                  onChange={handleDeviceVarChange}
                  value={deviceVars.isTerminating || ''}
                >
                  <option value=''>Select</option>
                  <option value='true'>Terminating</option>
                  <option value='false'>Switching</option>
                </select>
              </Col>
            </Row>
            <Row>
              <Col>
                {' '}
                <FormText> SDP Destinations</FormText>
              </Col>
            </Row>
            <Row>
              <Col>
                {' '}
                <select
                  className='form-control form-control-sm'
                  id='sdp1Destination'
                  value={deviceVars.sdp1Destination || ''}
                  onChange={handleDeviceVarChange}
                  name='sdp1Destination'
                  type='text'
                  placeholder='SDP 1 Destination'
                >
                  <option value=''>Select</option>
                  {routerOptions}
                </select>
              </Col>

              <Col>
                {' '}
                <select
                  className='form-control form-control-sm'
                  id='sdp2Destination'
                  value={deviceVars.sdp2Destination || ''}
                  onChange={handleDeviceVarChange}
                  name='sdp2Destination'
                  type='text'
                  placeholder='SDP 2 Destination'
                >
                  <option value=''>Select</option>
                  {routerOptions}
                </select>
              </Col>
            </Row>
            {props.serviceConfigForm.deviceVars[ipAddress].isTerminating ===
            'true' ? (
              <TerminatingSection
                props={props}
                ipAddress={ipAddress}
                handleDeviceVarChange={handleDeviceVarChange}
              />
            ) : (
              ''
            )}
          </Container>
        </ModalBody>
        <ModalFooter>
          <button
            onClick={() => props.remDevice(ipAddress)}
            className='btn btn-outline-danger btn-sm'
          >
            Delete
          </button>
          <button onClick={toggle} className='btn btn-outline-secondary btn-sm'>
            Close
          </button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

export default NokiaDevice;
