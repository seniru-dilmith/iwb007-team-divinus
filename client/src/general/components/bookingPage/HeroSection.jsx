import React from 'react';
import BookingForm from './BookingForm';
import trainImage from '../../assets/bookingPage/back-image.jpg';
import '../../css/bookingPage/hero-section.css';

const HeroSection = () => {
  return (
    <div
      className="hero-section d-flex align-items-center"
      style={{ backgroundImage: `url(${trainImage})` , backgroundSize: 'cover' }}
    >
      <div className="container text-center">
        <BookingForm />
      </div>
    </div>
  );
};

export default HeroSection;
