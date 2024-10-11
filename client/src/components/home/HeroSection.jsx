import React from 'react';
import trainImage from '../../assets/home/back-image.jpg'; 
import bookIcon from '../../assets/home/tickets.png';
import validateIcon from '../../assets/home/valid.png'; 
import galleryIcon from '../../assets/home/gallery.png';
import '../../css/home.css';

const HeroSection = () => {
  return (
    <div className="hero-section text-center" style={{ backgroundImage: `url(${trainImage})`, backgroundSize: 'cover', padding: '1%', color: '#fff', fontFamily: 'Roboto, sans-serif' }} >
      <div className="container">
        <h1 className="display-1">Book My Train</h1>
        <p className="sub-topic lead fs-3 p-5">Faster & Safer</p>
        <div className="row justify-content-center">
          {/* Book Now */}
          <div className="col-md-4">
            <div className="card mb-4 shadow-sm custom-card">
              <img src={bookIcon} className="card-img-top icon-image" alt="Book Now" />
              <div className="card-body">
                <button className="btn btn-primary rounded-pill custom-button">Book Now</button>
              </div>
            </div>
          </div>
          {/* Validate */}
          <div className="col-md-4">
            <div className="card mb-4 shadow-sm custom-card">
              <img src={validateIcon} className="card-img-top icon-image" alt="Validate" />
              <div className="card-body">
                <button className="btn btn-primary rounded-pill custom-button">Validate</button>
              </div>
            </div>
          </div>
          {/* Gallery */}
          <div className="col-md-4">
            <div className="card mb-4 shadow-sm custom-card">
              <img src={galleryIcon} className="card-img-top icon-image" alt="Gallery" />
              <div className="card-body">
                <button className="btn btn-primary rounded-pill custom-button">Gallery</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
