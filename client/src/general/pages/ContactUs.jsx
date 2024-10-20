import React from 'react';
import ContactInfo from '../components/contactUs/ContactInfo';
import Map from '../components/contactUs/Map';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/contact-us/contact-us.css';  

const ContactUs = () => {
  return (
    <div className="contact-us-page">
      <div className="container mt-5 mb-5">
        <h2 className="text-center mb-4 mt-2 text-white" style={{ fontWeight: 'bold' }}>Contact Us</h2>
        <div className="row">
          <div className="col-12 mb-2">
            <ContactInfo />
          </div>
        </div>
        <Map />
      </div>
    </div>
  );
};

export default ContactUs;
