import React from 'react';
import ContactInfo from '../components/contactUs/ContactInfo';
import ContactForm from '../components/contactUs/ContactForm';
import Map from '../components/contactUs/Map';
import Navbar from '../components/common/navbar';
import Footer from '../components/common/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/contact-us/contact-us.css';  

const ContactUs = () => {
  return (
    <div className="contact-us-page">
      <Navbar /> {/* The Navbar will be visible on all pages */}
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
      <Footer /> {/* The Footer will be visible on all pages */}
    </div>
  );
};

export default ContactUs;
