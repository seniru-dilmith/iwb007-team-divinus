import React from 'react';
import { Table } from 'react-bootstrap';
import '../../css/paymentPage/payment-page.css';

const TrainDetails = ({ train, bookingData }) => {
  return (
    <div className="train-details-table">
      <Table borderless>
        <tbody>
          <tr>
            <td><strong>Train:</strong></td>
            <td><a href="#" className="train-link">{train?.name || 'N/A'}</a></td>
          </tr>
          <tr>
            <td><strong>Arrival Time:</strong></td>
            <td className="text-primary"><strong>{train?.arrivesAt || bookingData?.arrival || 'N/A'}</strong></td>
          </tr>
          <tr>
            <td><strong>Departure Time:</strong></td>
            <td className="text-primary"><strong>{train?.departsAt || bookingData?.departure || 'N/A'}</strong></td>
          </tr>
          <tr>
            <td><strong>Selected Date:</strong></td>
            <td className="text-success"><strong>{bookingData?.date || 'N/A'}</strong></td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default TrainDetails;
