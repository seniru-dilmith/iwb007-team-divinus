import React from 'react';
import { useState } from "range-parser";
import HeroSection from '../components/bookingPage/HeroSection';
import Navbar from '../components/common/navbar';
import Footer from '../components/common/Footer';

const BookingPage = () => {

  

  return (
    <div>
      <Navbar /> {/* The Navbar will be visible on all pages */}
      <div className="booking-page">
        <HeroSection style={{"overflow-x": "hidden"}}/>
        {/* other sections or features */}
      </div>
      <Footer /> {/* The Footer will be visible on all pages */}
    </div>
  );
};

export default BookingPage;
