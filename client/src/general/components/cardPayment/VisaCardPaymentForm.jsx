import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal, Button, Row, Col } from "react-bootstrap";
import "../../css/CardPaymentPage/VisaCardPaymentForm.css"; // Import custom CSS if needed for additional styles
import axios from "../../../api/axios";

const KeyValueSet = (props) => {
  return(
    <div className="row keyvalue-wrapper">
      <div className="col-md-6 col-sm-12 keyData">
      {`${props.keyData}  :`}
        
      </div>
      <div className="col-md-6 col-sm-12 valueData">
      {props.valueData}
      </div>
    </div>
  );
}

function VisaCardPaymentForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const ticketPrice = location.state?.ticketPrice || {}; // Get the selected train data
  const ticketData = location.state?.ticketData || {}; // Get the passed booking data
  const bookingData = location.state?.bookingData || {}; // Get the passed booking data
  const trainData = location.state?.train || {}; // Get the passed booking data

  const [showModal, setShowModal] = useState(false);
  const [tokenStr, setTokenStr] = useState("");

  const handleClose = () => {
    setShowModal(false);
    navigate("/");
    console.log(trainData);
  };
  const handleShow = () => setShowModal(true);

  //Function to get the Arrival time of a specific station
  const arrivalTime = (station) => {
    const id = trainData.destinations.findIndex((stationData, index, array) => {
      return (station === stationData.station)
    })
    return trainData.destinations[id].time
  }
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardHolder: ticketData.name,
    expiryDate: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(ticketData);

    axios
      .post("/ticket/bookTicket", ticketData)
      .then((res) => {
        console.log("Token: ", res.data);
        setShowModal(true);
        setTokenStr(res.data.token);
      })
      .catch((error) => {
        console.error("Error reserving the ticket", error);
      });
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            {/* Adding Bootstrap shadow, border, padding, and custom class */}
            <div className="card shadow-lg p-4 border rounded-lg">
              <h2 className="mb-4 text-center">Visa Card Payment</h2>
              <h4 className="text-center mt-4 total-price-box">
                Total: RS. {ticketPrice.toLocaleString()}
              </h4>
              <form
                onSubmit={handleSubmit}
                className="needs-validation"
                noValidate
              >
                {/* Cardholder's Name */}
                <div className="mb-3">
                  <label htmlFor="cardHolder" className="form-label">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="cardHolder"
                    name="cardHolder"
                    value={formData.cardHolder}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                  />
                  <div className="invalid-feedback">
                    Please enter the cardholder's name.
                  </div>
                </div>

                {/* Card Number */}
                <div className="mb-3">
                  <label htmlFor="cardNumber" className="form-label">
                    Card Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    required
                    maxLength="16"
                    placeholder="1234 5678 9012 3456"
                  />
                  <div className="invalid-feedback">
                    Please enter a valid card number.
                  </div>
                </div>

                <div className="row">
                  {/* Expiry Date */}
                  <div className="col-md-6 mb-3">
                    <label htmlFor="expiryDate" className="form-label">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="expiryDate"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      required
                      placeholder="MM/YY"
                    />
                    <div className="invalid-feedback">
                      Please enter the expiration date.
                    </div>
                  </div>

                  {/* CVV */}
                  <div className="col-md-6 mb-3">
                    <label htmlFor="cvv" className="form-label">
                      CVV
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="cvv"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      required
                      maxLength="3"
                      placeholder="123"
                    />
                    <div className="invalid-feedback">
                      Please enter the CVV.
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary w-100">
                  Submit Payment
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Modal to show the results */}
      <Modal
        show={showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{textAlign: "center", width:"100%"}}>Ticket Booking Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="res-msg">Booked the ticket successfully !!!</p>
          <div
            className="border rounded p-3 dataset-wrapper"
          >
            <div className="container">
            <KeyValueSet keyData="Token" valueData={tokenStr} />
            <KeyValueSet keyData="Name" valueData={ticketData.name} />
            <KeyValueSet keyData="NIC" valueData={ticketData.nic} />
            <p className="sub-title">Tour Details</p>
            <KeyValueSet keyData="Date" valueData={bookingData.date} />
            <KeyValueSet keyData="Departure" valueData={`${bookingData.departureStation} @ ${arrivalTime(bookingData.departureStation)}`} />
            <KeyValueSet keyData="Arrival" valueData={`${bookingData.arrivalStation} @ ${arrivalTime(bookingData.arrivalStation)}`} />
            <p className="sub-title">Reserved Seat Quantity</p>
            <KeyValueSet keyData="First Class" valueData={ticketData.seatsQuantity.firstClass} />
            <KeyValueSet keyData="Second Class" valueData={ticketData.seatsQuantity.secondClass} />
            <KeyValueSet keyData="Third Class" valueData={ticketData.seatsQuantity.thirdClass} />
            
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default VisaCardPaymentForm;
