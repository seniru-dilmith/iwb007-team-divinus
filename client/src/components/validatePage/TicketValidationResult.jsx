import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Alert } from 'react-bootstrap';

const TicketValidationResult = ({ isValidTicket }) => {
  return (
    <Alert
      variant={isValidTicket ? 'success' : 'danger'}
      className="p-4 text-center validation-result shadow-lg rounded-pill"
    >
      {isValidTicket ? (
        <>
          <FontAwesomeIcon icon={faCheckCircle} size="5x" className="mb-3 text-success" />
          <h2 className="mt-3">Valid Ticket</h2>
        </>
      ) : (
        <>
          <FontAwesomeIcon icon={faTimesCircle} size="5x" className="mb-3 text-danger" />
          <h2 className="mt-3">Invalid Ticket</h2>
        </>
      )}
    </Alert>
  );
};

export default TicketValidationResult;
