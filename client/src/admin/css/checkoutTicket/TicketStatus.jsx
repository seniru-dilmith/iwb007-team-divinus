import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faInfo, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Alert } from 'react-bootstrap';

const TicketStatus = ({ ticketStatus }) => {
  return (
    <Alert
      variant={ ticketStatus==="active" ? 'info' : ticketStatus==="checkedout" ? 'success' : 'danger'}
      className="p-3 text-center validation-result shadow-lg"
    >
      {ticketStatus==="active" ? (
        <>
          <FontAwesomeIcon icon={faInfo} size="5x" className="mb-3 text-info" />
          <h2 className="mt-3">Valid Ticket</h2>
        </>
      ) : ticketStatus==="checkedout" ? (
        <>
          <FontAwesomeIcon icon={faCheckCircle} size="5x" className="mb-3 text-success" />
          <h2 className="mt-3">Checked out the Ticket</h2>
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

export default TicketStatus;
