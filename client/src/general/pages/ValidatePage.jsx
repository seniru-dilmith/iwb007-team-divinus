import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import TicketValidationForm from "../components/validatePage/TicketValidationForm";
import TicketValidationResult from "../components/validatePage/TicketValidationResult";
import Navbar from "../components/common/navbar";
import Footer from "../components/common/Footer";
import KeyValueSet from "../components/validatePage/KeyValueSet";
import "../css/validatePage/validate-page.css";
import axios from "axios";

const ValidatePage = () => {
  const [ticketNumber, setTicketNumber] = useState("");
  const [isValidTicket, setIsValidTicket] = useState(null);
  const [ticketData, setTicketData] = useState(null); 

  const handleValidation = async (e) => {
    e.preventDefault();

    try {
      // Simulate ticket validation
      const validTicketNumbers = ["12345", "67890"];
      const dummyData = {
        token: "sample token name",
        name: "Thumul Dasun",
        nic: "121212121212",
        date: "2025-02-14",
        departureStation: "Badulla",
        arrivalStation: "Kandy",
        seatsQuantity: {
          firstClass: 3,
          secondClass: 2,
          thirdClass: 1,
        },
      };

      if (validTicketNumbers.includes(ticketNumber)) {
        setIsValidTicket(true);
        setTicketData(dummyData);
      } else {
        setIsValidTicket(false);
        setTicketData(null);
      }

      /*
      const response = await axios.post('https://api.example.com/validate-ticket', {
        ticketNumber: ticketNumber,
      });

      if (response.data.isValid) {
        setIsValidTicket(true);
        setTicketData(response.data.ticketDetails);
      } else {
        setIsValidTicket(false);
      }
      */
    } catch (error) {
      console.error("Error validating the ticket:", error);
      setIsValidTicket(false);
    }
  };

  return (
    <>
  <Navbar />
  <Container fluid className="validate-page-container">
    <Row>
      {/* Left Column: Ticket Validation Form */}
      <Col md={6} lg={6} className="ticket-form-col">
        <div className="ticket-form-content">
          <h1 className="validate-title mb-4 text-center">
            VALIDATE YOUR TICKET
          </h1>
          <TicketValidationForm
            ticketNumber={ticketNumber}
            setTicketNumber={setTicketNumber}
            handleValidation={handleValidation}
          />
          {isValidTicket !== null && (
            <div className="mt-5 w-50" style={{ margin: "auto"}}>
              <TicketValidationResult isValidTicket={isValidTicket} />
            </div>
          )}
        </div>
      </Col>

      {/* Right Column: Ticket Details */}
      {isValidTicket && ticketData && (
        <Col
          md={{ span: 5, offset: 1 }}
          lg={{ span: 4, offset: 2 }}
          className="ticket-details-col d-md-block"
        >
          <div className="mt-5 border rounded p-4">
            <h4>Ticket Details</h4>
            <KeyValueSet keyData="Token" valueData={ticketData.token} />
            <KeyValueSet keyData="Name" valueData={ticketData.name} />
            <KeyValueSet keyData="NIC" valueData={ticketData.nic} />
            <KeyValueSet keyData="Date" valueData={ticketData.date} />
            <KeyValueSet
              keyData="Departure"
              valueData={ticketData.departureStation}
            />
            <KeyValueSet
              keyData="Arrival"
              valueData={ticketData.arrivalStation}
            />
            <h5 className="mt-3">Reserved Seats</h5>
            <KeyValueSet
              keyData="First Class"
              valueData={ticketData.seatsQuantity.firstClass}
            />
            <KeyValueSet
              keyData="Second Class"
              valueData={ticketData.seatsQuantity.secondClass}
            />
            <KeyValueSet
              keyData="Third Class"
              valueData={ticketData.seatsQuantity.thirdClass}
            />
          </div>
        </Col>
      )}
    </Row>
  </Container>
  <Footer />
</>
  );
};

export default ValidatePage;
