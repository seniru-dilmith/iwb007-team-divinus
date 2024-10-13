import React from 'react';
import { useLocation } from 'react-router-dom';
import TicketForm from '../components/paymentPage/TicketForm';
import '../css/paymentPage/payment-page.css';

const PaymentPage = () => {
  const location = useLocation();
  const train = location.state?.train || {};  // Get the selected train data
  const bookingData = location.state?.bookingData || {};  // Get the passed booking data

  const handlePayment = () => {
    alert('Payment Successful');
  };

  return (
    <div className="payment-page-container">
      {/* Only include TrainDetails within TicketForm */}
      <TicketForm handlePayment={handlePayment} train={train} bookingData={bookingData} />
    </div>
  );
};

export default PaymentPage;

