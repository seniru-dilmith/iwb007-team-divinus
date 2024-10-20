import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Button,
  Row,
  Col,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import "../../css/paymentPage/payment-page.css";

const TicketForm = (props) => {
  const [quantity1, setQuantity1] = useState(0); // First Class tickets
  const [quantity2, setQuantity2] = useState(0); // Second Class tickets
  const [quantity3, setQuantity3] = useState(0); // Third Class tickets
  const [personData, setPersonData] = useState({
    name: "",
    nic: "",
    email: "",
    phone: "",
  });

  const priceFirstClass = 1000;
  const priceSecondClass = 1200;
  const priceThirdClass = 1500;

  const navigate = useNavigate();

  const ticketData = {
    name: personData.name,
    nic: personData.nic,
    email: personData.email,
    phone: personData.phone,
    startStation: props.bookingData.departureStation,
    endStation: props.bookingData.arrivalStation,
    seatsQuantity: {
      firstClass: quantity1,
      secondClass: quantity2,
      thirdClass: quantity3
    },
    trainScheduleId: props.train._id.$oid,
  };

  const handleFormChange = (e) => {
    setPersonData({
      ...personData,
      [e.target.name]: e.target.value,
    });
  };

  // Calculate the total price
  const totalPrice =
    quantity1 * priceFirstClass +
    quantity2 * priceSecondClass +
    quantity3 * priceThirdClass;

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
            <input
              className="form-control"
              name="name"
              type="text"
              placeholder="Enter your name"
              value={ticketData.name}
              onChange={handleFormChange}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formID" className="mb-3">
          <Form.Label column sm={4}>
            ID Number
          </Form.Label>
          <Col sm={8}>
            <input
              className="form-control"
              name="nic"
              type="text"
              placeholder="Enter ID number"
              value={ticketData.nic}
              onChange={handleFormChange}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formEmail" className="mb-3">
          <Form.Label column sm={4}>
            E mail
          </Form.Label>
          <Col sm={8}>
            <input
              className="form-control"
              name="email"
              type="email"
              placeholder="Enter email"
              value={ticketData.email}
              onChange={handleFormChange}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formPhone" className="mb-3">
          <Form.Label column sm={4}>
            Phone
          </Form.Label>
          <Col sm={8}>
            <input
              className="form-control"
              name="phone"
              type="text"
              placeholder="Enter phone number"
              value={ticketData.phone}
              onChange={handleFormChange}
            />
          </Col>
        </Form.Group>

        {/* Ticket Selection */}
        <Form.Group
          as={Row}
          controlId="formQuantity"
          className="mb-4 text-center"
        >
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
                <FormControl
                  className="text-center"
                  value={quantity1}
                  readOnly
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setQuantity1(Math.min(props.train.seats.firstClass.availableSeats, quantity1 + 1))}
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
                <FormControl
                  className="text-center"
                  value={quantity2}
                  readOnly
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setQuantity2(Math.min(props.train.seats.secondClass.availableSeats, quantity2 + 1))}
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
                <FormControl
                  className="text-center"
                  value={quantity3}
                  readOnly
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setQuantity3(Math.min(props.train.seats.thirdClass.availableSeats, quantity3 + 1))}
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
          onClick={() => {
            navigate("/card-payment", {
              state: { ticketData, ticketPrice: totalPrice, bookingData: props.bookingData, train: props.train },
            });
          }}
          className="elegant-pay-btn mt-4"
        >
          Pay
        </Button>
      </Form>
    </div>
  );
};

export default TicketForm;
