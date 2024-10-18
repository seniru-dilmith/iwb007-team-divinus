import React from "react";
import { useLocation } from "react-router-dom";
import VisaCardPaymentForm from "../components/cardPayment/VisaCardPaymentForm";

import Navbar from "../components/common/navbar";
import Footer from "../components/common/Footer";

import '../css/CardPaymentPage/CardPaymentPage.css';

const CardPaymentPage = () => {

  return (
    <div className="card-payment-page-container">
      <Navbar />
      {/* Only include TrainDetails within TicketForm */}
      <div className="card-form-container">
        <VisaCardPaymentForm />
      </div>
      <Footer />
    </div>
  );
};

export default CardPaymentPage;
