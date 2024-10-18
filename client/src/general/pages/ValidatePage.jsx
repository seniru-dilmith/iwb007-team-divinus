import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import TicketValidationForm from "../components/validatePage/TicketValidationForm";
import TicketValidationResult from "../components/validatePage/TicketValidationResult";
import Navbar from "../components/common/navbar";
import Footer from "../components/common/Footer";
import KeyValueSet from "../components/validatePage/KeyValueSet";
import "../css/validatePage/validate-page.css";
import axios from "../../api/axios";
import useWaiter from "../../hooks/useWaiter";

const ValidatePage = () => {
  const [ticketNumber, setTicketNumber] = useState("");
  const [isValidTicket, setIsValidTicket] = useState(null);
  const [ticketData, setTicketData] = useState(null);
  const {addWaiter, removeWaiter} = useWaiter();

  const handleValidation = async (e) => {
    e.preventDefault();
    addWaiter("Validating ticket...");

    axios.post('ticket/',{token:ticketNumber})
      .then((response) => {
        setIsValidTicket(true);
        const train = response.data.train;
        const ticket = response.data.ticket;

        console.log(train, ticket);

        if(!train || !ticket) {
          alert('Invalid Ticket Number or expired ticket');
          return;
        }
        setTicketData({
          token: ticket.token,
          name: ticket.details.name,
          nic: ticket.details.nic,
          date: train.startDate,
          departureStation: ticket.details.startStation,
          arrivalStation: ticket.details.endStation,
          seatsQuantity: {
            firstClass: ticket.details.seatsQuantity.firstClass,
            secondClass: ticket.details.seatsQuantity.secondClass,
            thirdClass: ticket.details.seatsQuantity.thirdClass,
          },
        });

        if(ticket.status !== 'active') {
          setIsValidTicket(false);
        }else{
          setIsValidTicket(true);
        }
      })
      .catch((error) => {
        alert('Invalid Ticket Number or expired ticket');
        console.error(error);
      })
      .finally(() => {
        removeWaiter("Validating ticket...");
      });

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
