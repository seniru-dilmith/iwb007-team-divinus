import React from 'react';
import { Col, Form, InputGroup, Button } from 'react-bootstrap';

const SeatSelector = ({ label, classType, value, onIncrement, onDecrement, onChange }) => {
  return (
    <Col xs={4}>
      <Form.Group controlId={`${classType}Seats`}>
        <Form.Label>{label}</Form.Label>
        <InputGroup>
          <Button variant="outline-secondary" onClick={onDecrement}>
            -
          </Button>
          <Form.Control
            type="number"
            value={value}
            onChange={onChange}
            min="0"
            className="text-center"
          />
          <Button variant="outline-secondary" onClick={onIncrement}>
            +
          </Button>
        </InputGroup>
      </Form.Group>
    </Col>
  );
};

export default SeatSelector;
