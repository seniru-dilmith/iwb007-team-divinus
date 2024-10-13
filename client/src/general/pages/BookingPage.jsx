import React from 'react';
import HeroSection from '../components/bookingPage/HeroSection';
import Navbar from '../components/common/navbar';
import Footer from '../components/common/Footer';

const BookingPage = () => {
  return (
    <div className="booking-page">
      <Navbar /> {/* The Navbar will be visible on all pages */}
      <HeroSection />
      {/* other sections or features */}
      <Footer /> {/* The Footer will be visible on all pages */}
    </div>
  );
};

export default BookingPage;
