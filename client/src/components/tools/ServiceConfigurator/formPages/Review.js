import React from 'react';
import { Container, Row, Col } from 'reactstrap';

export const Review = ({ props, next, back }) => {
  return (
    <Container>
      <form className='my-3'>
        <h3 className='text-primary'>Review</h3>
        <Row>
          <Col>
            <pre>{JSON.stringify(props.serviceConfigForm, null, 2)}</pre>
          </Col>
        </Row>
        <Col className='text-left'>
          {' '}
          <button type='button' onClick={back} className='btn btn-primary my-2'>
            Back
          </button>
        </Col>
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

export default Review;
