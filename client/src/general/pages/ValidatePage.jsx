import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import TicketValidationForm from '../components/validatePage/TicketValidationForm';
import TicketValidationResult from '../components/validatePage/TicketValidationResult';

import '../css/validatePage/validate-page.css';

const ValidatePage = () => {
  const [ticketNumber, setTicketNumber] = useState('');
  const [isValidTicket, setIsValidTicket] = useState(null);

  const handleValidation = (e) => {
    e.preventDefault();

    // Simulate ticket validation (dummy)
    const validTicketNumbers = ['12345', '67890']; // Dummy valid ticket numbers
    if (validTicketNumbers.includes(ticketNumber)) {
      setIsValidTicket(true);
    } else {
      setIsValidTicket(false);
    }

    /*
    // API request with Axios for validation

    axios.post('https://api.example.com/validate-ticket', {
        ticketNumber: ticketNumber,
      })
      .then(response => {
        // Check response data to determine if the ticket is valid
        // Assuming the API returns { isValid: true/false }
        if (response.data.isValid) {
          setIsValidTicket(true); // Set the state to valid
        } else {
          setIsValidTicket(false); // Set the state to invalid
        }
      })
      .catch(error => {
        console.error('Error validating the ticket:', error);
        setIsValidTicket(false); // Handle error as invalid ticket
      });

    */
  };

  return (
    <div>
      <Container fluid className="validate-page-container">
        <Row className="align-items-center">
          <Col md={6} className="ticket-form-col"> {/* Adjusting to take the left half of the screen */}
            <div className="ticket-form-content">
              <h1 className="validate-title mb-4 text-center">VALIDATE YOUR TICKET</h1>
              <TicketValidationForm
                ticketNumber={ticketNumber}
                setTicketNumber={setTicketNumber}
                handleValidation={handleValidation}
              />
              {isValidTicket !== null && (
                <div className="mt-5">
                  <TicketValidationResult isValidTicket={isValidTicket} />
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ValidatePage;
