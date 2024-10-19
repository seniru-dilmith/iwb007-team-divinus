import React from "react";
import { Card } from "react-bootstrap";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

import "../../css/contact-us/contact-info.css";

const ContactInfo = () => {
  return (
    <Card className="p-3 mb-4 shadow-sm mt-5">
      <Card.Body>
        <h5>Contact Information</h5>
        <Card.Text>
          <div className="data-wrapper">
            <p id="email-p">
              <FaEnvelope className="me-2" /> <strong>Email:</strong>{" "}
              info@bookmytrain.com
            </p>
            <p id="phone-p">
              <FaPhone className="me-2" /> <strong>Phone:</strong> +94 763 881
              265
            </p>
            <p id="address-p">
              <FaMapMarkerAlt className="me-2" /> <strong>Address:</strong> Book My Train, 123
              Train Avenue, Colombo 7, Sri Lanka
            </p>
            <p id="phrase-p">
              We are here to help with any queries. Reach out, and we’ll get
              back to you as soon as possible.
            </p>
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ContactInfo;
