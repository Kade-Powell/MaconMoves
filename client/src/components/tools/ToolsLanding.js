import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
  CardImg,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

const ToolsLanding = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <Row className='my-4'>
      <Col sm='4'>
        <Card>
          <CardImg top width='100%' src='' />
          <CardBody>
            <CardTitle>Nokia Service Configurator</CardTitle>
            <CardText>Generate configs for all nokia equipment</CardText>

            <Link to='/tools/serviceConfigurator'>
              <Button color='primary'>Launch</Button>
            </Link>
          </CardBody>
        </Card>
      </Col>
      <Col sm='4'>
        <Card>
          <CardImg top width='100%' />
          <CardBody>
            <CardTitle>Mass Maintenance Automation Tool</CardTitle>
            <CardText>Build automation scripts from visual blocks</CardText>
            <Button>Coming Soon..</Button>
          </CardBody>
        </Card>
      </Col>
      <Col sm='4'>
        <Card>
          <CardImg top width='100%' />
          <CardBody>
            <CardTitle>SER NEON Tools</CardTitle>
            <CardText>View all SER NEON Tools</CardText>

            <Button color='primary' onClick={toggle}>
              Launch
            </Button>
            <Modal
              isOpen={modal}
              modalTransition={{ timeout: 200 }}
              backdropTransition={{ timeout: 300 }}
              toggle={toggle}
            >
              <ModalHeader toggle={toggle}>Tools</ModalHeader>
              <ModalBody>
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  href='https://cbops.coxmetrics.com/neon/configurators/COI3.0/modal.php'
                >
                  COI 3.0 Service Config
                </a>
                <br />
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  href='https://cbops.coxmetrics.com/neon/configurators/IXRservice/IXRService.php'
                >
                  IXR Service Config
                </a>
                <br />
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  href='https://cbops.coxmetrics.com/neon/configurators/SAS-K30service/modal.php'
                >
                  K30 Service Config
                </a>
                <br />
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  href='https://cbops.coxmetrics.com/neon/configurators/SAS-K5service/modal.php'
                >
                  K5 Service Config
                </a>
                <br />
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  href='https://cbops.coxmetrics.com/neon/configurators/MXPservice/modal.php'
                >
                  MXP Service Config
                </a>
                <br />
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  href='https://cbops.coxmetrics.com/neon/configurators/WEAoHFC/wea-hfc.php'
                >
                  WEA-HFC Config
                </a>
                <br />
              </ModalBody>
              <ModalFooter>
                <Button color='secondary' onClick={toggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default ToolsLanding;
