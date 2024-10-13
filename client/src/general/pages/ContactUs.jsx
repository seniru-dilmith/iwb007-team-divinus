import React from 'react';
import ContactInfo from '../components/contactUs/ContactInfo';
import ContactForm from '../components/contactUs/ContactForm';
import Map from '../components/contactUs/Map';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/contact-us/contact-us.css';  

const ContactUs = () => {
  return (
    <div className="contact-us-page">
      <div className="container mt-5 mb-5">
        <h2 className="text-center mb-4 text-white" style={{ marginTop: '100px', fontWeight: 'bold' }}>Contact Us</h2>
        <div className="row">
          <div className="col-md-6 mb-4">
            <ContactInfo />
          </div>
          <div className="col-md-6 mb-4">
            <ContactForm />
          </div>
        </div>
        <Map />
      </div>
    </div>
  );
};

export default ContactUs;
