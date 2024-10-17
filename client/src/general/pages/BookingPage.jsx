import React from 'react';
import HeroSection from '../components/bookingPage/HeroSection';


const BookingPage = () => {
  return (
    <div>
      <div className="booking-page">
        <HeroSection style={{"overflow-x": "hidden"}}/>
        {/* other sections or features */}
      </div>
    </div>
  );
};

export default BookingPage;
