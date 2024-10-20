import React from "react";
import VisaCardPaymentForm from "../components/cardPayment/VisaCardPaymentForm";

import '../css/CardPaymentPage/CardPaymentPage.css';

const CardPaymentPage = () => {

  return (
    <div className="card-payment-page-container">
      {/* Only include TrainDetails within TicketForm */}
      <div className="card-form-container">
        <VisaCardPaymentForm />
      </div>
    </div>
  );
};

export default CardPaymentPage;
