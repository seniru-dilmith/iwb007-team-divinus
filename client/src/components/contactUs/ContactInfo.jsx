import React from 'react';
import { Card } from 'react-bootstrap';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const ContactInfo = () => {
  return (
    <Card className="p-3 mb-4 shadow-sm mt-5">
      <Card.Body>
        <h5>Contact Information</h5>
        <Card.Text>
          <p><FaEnvelope className="me-2" /> <strong>Email:</strong> info@bookmytrain.com</p>
          <p><FaPhone className="me-2" /> <strong>Phone:</strong> +94 763 881 265</p>
          <p><FaMapMarkerAlt className="me-2" /> <strong>Address:</strong> 123 Train Avenue, City, Country</p>
          <p>We are here to help with any queries. Reach out, and we’ll get back to you as soon as possible.</p>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ContactInfo;
