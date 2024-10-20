import React from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';

const TicketCheckoutForm = ({ ticketNumber, setTicketNumber, handleValidate, handleCheckout }) => {
  return (
    <Form onSubmit={(e)=> {
      e.preventDefault();
    }} className="validate-form shadow-lg rounded p-4">
      <Form.Group controlId="formTicketNumber" className="mb-3">
        <Form.Label className="fw-bold">Ticket Number</Form.Label>
        <InputGroup>
          <Form.Control
            type="text"
            value={ticketNumber}
            onChange={(e) => {
              setTicketNumber(e.target.value);
            }}
            placeholder="Enter ticket number"
            required
            className="rounded-pill bg-light border-0 p-3 shadow-sm input-box"
          />
        </InputGroup>
      </Form.Group>
      <Button className="btn btn-primary rounded-pill validate-btn" onClick={handleValidate}>
        Validate
      </Button>
      <Button className="btn btn-danger rounded-pill checkout-btn" onClick={handleCheckout}>
        Checkout
      </Button>
    </Form>
  );
};

export default TicketCheckoutForm;
