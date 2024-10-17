import React, { useState } from 'react';
import { Form, Button, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import '../../css/paymentPage/payment-page.css';

const TicketForm = ({ handlePayment }) => {
  const [quantity1, setQuantity1] = useState(0);  // First Class tickets
  const [quantity2, setQuantity2] = useState(0);  // Second Class tickets
  const [quantity3, setQuantity3] = useState(0);  // Third Class tickets

  const priceFirstClass = 1000;
  const priceSecondClass = 1200;
  const priceThirdClass = 1500;

  // Calculate the total price
  const totalPrice =
    quantity1 * priceFirstClass + quantity2 * priceSecondClass + quantity3 * priceThirdClass;

  return (
    <div className="ticket-form-container elegant-form mx-auto shadow-lg p-5 rounded">
      {/* Topic/Heading */}
      <h1 className="text-center mb-4 topic-title">Book Your Train Ticket</h1>

      {/* Section Title */}
      <h2 className="text-center elegant-title mb-4">Grab Your Ticket</h2>

      {/* Form Section */}
      <Form>
        <Form.Group as={Row} controlId="formName" className="mb-3">
          <Form.Label column sm={4}>
            Name
          </Form.Label>
          <Col sm={8}>
            <FormControl type="text" placeholder="Enter your name" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formID" className="mb-3">
          <Form.Label column sm={4}>
            ID Number
          </Form.Label>
          <Col sm={8}>
            <FormControl type="text" placeholder="Enter ID number" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formEmail" className="mb-3">
          <Form.Label column sm={4}>
            E mail
          </Form.Label>
          <Col sm={8}>
            <FormControl type="email" placeholder="Enter email" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formPhone" className="mb-3">
          <Form.Label column sm={4}>
            Phone
          </Form.Label>
          <Col sm={8}>
            <FormControl type="text" placeholder="Enter phone number" />
          </Col>
        </Form.Group>

        {/* Ticket Selection */}
        <Form.Group as={Row} controlId="formQuantity" className="mb-4 text-center">
          <Form.Label column sm={4}>
            Quantity
          </Form.Label>
          <Col sm={8} className="d-flex justify-content-around">
            <div>
              <h5>First Class</h5>
              <InputGroup>
                <Button
                  variant="outline-secondary"
                  onClick={() => setQuantity1(Math.max(0, quantity1 - 1))}
                >
                  -
                </Button>
                <FormControl className="text-center" value={quantity1} readOnly />
                <Button
                  variant="outline-secondary"
                  onClick={() => setQuantity1(quantity1 + 1)}
                >
                  +
                </Button>
              </InputGroup>
              <p className="text-muted mt-2">Price: RS. {priceFirstClass}</p>
            </div>
            <div>
              <h5>Second Class</h5>
              <InputGroup>
                <Button
                  variant="outline-secondary"
                  onClick={() => setQuantity2(Math.max(0, quantity2 - 1))}
                >
                  -
                </Button>
                <FormControl className="text-center" value={quantity2} readOnly />
                <Button
                  variant="outline-secondary"
                  onClick={() => setQuantity2(quantity2 + 1)}
                >
                  +
                </Button>
              </InputGroup>
              <p className="text-muted mt-2">Price: RS. {priceSecondClass}</p>
            </div>
            <div>
              <h5>Third Class</h5>
              <InputGroup>
                <Button
                  variant="outline-secondary"
                  onClick={() => setQuantity3(Math.max(0, quantity3 - 1))}
                >
                  -
                </Button>
                <FormControl className="text-center" value={quantity3} readOnly />
                <Button
                  variant="outline-secondary"
                  onClick={() => setQuantity3(quantity3 + 1)}
                >
                  +
                </Button>
              </InputGroup>
              <p className="text-muted mt-2">Price: RS. {priceThirdClass}</p>
            </div>
          </Col>
        </Form.Group>

        {/* Total Price */}
        <h4 className="text-center mt-4 total-price-box">
          Total: RS. {totalPrice.toLocaleString()}
        </h4>

        {/* Pay Button */}
        <Button
          variant="primary"
          size="lg"
          block
          onClick={handlePayment}
          className="elegant-pay-btn mt-4"
        >
          Pay
        </Button>
      </Form>
    </div>
  );
};

export default TicketForm;
