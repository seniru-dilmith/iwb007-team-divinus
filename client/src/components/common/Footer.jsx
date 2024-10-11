import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/common/footer.css';

const Footer = () => {
  return (
    <footer className="footer-section bg-dark text-light py-4">
      <div className="container">
        <div className="row">

          {/* Column 1: Useful Links */}
          <div className="col-lg-6 col-md-6 col-sm-12 mb-4 useful-links">
            <h5>Useful Links</h5>
            <ul className="list-unstyled">
              <li><a href="/booking" className="text-light">Book a Ticket</a></li>
              <li><a href="#validate" className="text-light">Validate Tickets</a></li>
              <li><a href="#gallery" className="text-light">Gallery</a></li>
              <li><a href="#contact-us" className="text-light">Contact Us</a></li>
            </ul>
          </div>

          {/* Column 2: Contact Info */}
          <div className="col-lg-6 col-md-6 col-sm-12 mb-4 contact-us">
            <h5>Contact Us</h5>
            <p>
              <i className="fas fa-envelope"></i> support@bookmytrain.com
            </p>
            <p>
              <i className="fas fa-phone-alt"></i> +94 71 462 56 71
            </p>
            <div className="social-icons">
              <a href="#!" className="text-light me-2"><i className="fab fa-facebook-f"></i></a>
              <a href="#!" className="text-light me-2"><i className="fab fa-twitter"></i></a>
              <a href="#!" className="text-light me-2"><i className="fab fa-instagram"></i></a>
              <a href="#!" className="text-light"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="row mt-4">
          <div className="col text-center">
            <p className="mb-0">Copyright &copy; {new Date().getFullYear()} Team Divinus <br />
             All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
