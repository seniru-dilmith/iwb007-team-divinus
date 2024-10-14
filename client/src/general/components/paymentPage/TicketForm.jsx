import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import TrainDetails from './TrainDetails'; // Import TrainDetails
import '../../css/paymentPage/payment-page.css';

const TicketForm = ({ handlePayment, train, bookingData }) => {
  const [quantity1, setQuantity1] = useState(0);
  const [quantity2, setQuantity2] = useState(0);
  const [quantity3, setQuantity3] = useState(0);

  // Calculate the total price
  const totalPrice = quantity1 * 1000 + quantity2 * 1200 + quantity3 * 1500;

  return (
    <div className="ticket-form-container mx-auto p-4 shadow-lg rounded">
      <h2 className="text-center mb-4">Grab Your Ticket</h2>

      {/* Use TrainDetails here only once */}
      <div className="text-center mb-4">
        <TrainDetails train={train} bookingData={bookingData} />
      </div>

      {/* Ticket Selection */}
      <Form>
        <div className="ticket-selection">
          <div className="text-center mb-3">
            <h5>First Class</h5>
            <Button variant="outline-primary" onClick={() => setQuantity1(quantity1 - 1)}>-</Button>
            <span className="quantity-display">{quantity1}</span>
            <Button variant="outline-primary" onClick={() => setQuantity1(quantity1 + 1)}>+</Button>
          </div>
          <div className="text-center mb-3">
            <h5>Second Class</h5>
            <Button variant="outline-primary" onClick={() => setQuantity2(quantity2 - 1)}>-</Button>
            <span className="quantity-display">{quantity2}</span>
            <Button variant="outline-primary" onClick={() => setQuantity2(quantity2 + 1)}>+</Button>
          </div>
          <div className="text-center mb-3">
            <h5>Third Class</h5>
            <Button variant="outline-primary" onClick={() => setQuantity3(quantity3 - 1)}>-</Button>
            <span className="quantity-display">{quantity3}</span>
            <Button variant="outline-primary" onClick={() => setQuantity3(quantity3 + 1)}>+</Button>
          </div>
        </div>

        {/* Total Price */}
        <h4 className="text-center mt-4">RS. {totalPrice.toLocaleString()}</h4>

        {/* Pay Button */}
        <Button variant="primary" size="lg" block onClick={handlePayment} className="pay-btn mt-3">
          Pay
        </Button>
      </Form>
    </div>
  );
};

export default TicketForm;
