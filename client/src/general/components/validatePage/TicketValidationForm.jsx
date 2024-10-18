import React from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';

const TicketValidationForm = ({ ticketNumber, setTicketNumber, handleValidation }) => {
  return (
    <Form onSubmit={handleValidation} className="validate-form shadow-lg rounded p-4">
      <Form.Group controlId="formTicketNumber" className="mb-3">
        <Form.Label className="fw-bold">Ticket Number</Form.Label>
        <InputGroup>
          <Form.Control
            type="text"
            value={ticketNumber}
            onChange={(e) => setTicketNumber(e.target.value)}
            placeholder="Enter your ticket number"
            required
            className="rounded-pill bg-light border-0 p-3 shadow-sm input-box"
          />
        </InputGroup>
      </Form.Group>
      <Button className="btn btn-primary w-100 rounded-pill validate-btn" type="submit">
        Validate
      </Button>
    </Form>
  );
};

export default TicketValidationForm;
