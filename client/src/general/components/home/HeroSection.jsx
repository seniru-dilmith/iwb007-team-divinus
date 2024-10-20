import React from 'react';
import bookIcon from '../../assets/home/tickets.png';
import validateIcon from '../../assets/home/valid.png'; 
import galleryIcon from '../../assets/home/gallery.png';
import '../../css/home/home.css';

const HeroSection = () => {
  return (
    <div className="hero-section text-center" id="hero-div" style={{ backgroundSize: 'cover', padding: '0', color: '#fff', fontFamily: 'Roboto, sans-serif' }} >
      <div className="container">
        <div className='title-container'>
        <h1 className="main-topic">Book My Train</h1>
        <p className="sub-topic lead fs-3">Faster & Safer</p>
        </div>
        <div className="row justify-content-center">
          {/* Book Now */}
          <div className="col-md-4">
            <div className="card mb-4 shadow-sm custom-card">
              <img src={bookIcon} className="card-img-top icon-image" alt="Book Now" />
              {console.log(bookIcon, validateIcon, galleryIcon)}
              <a href="/booking" className="stretched-link">
                <div className="card-body">
                  <button  className="btn btn-primary rounded-pill custom-button">Book Now</button>
                </div>
              </a>
            </div>
          </div>
          {/* Validate */}
          <div className="col-md-4">
            <div className="card mb-4 shadow-sm custom-card">
              <img src={validateIcon} className="card-img-top icon-image" alt="Validate" />
              <a href="/validate" className="stretched-link">
                <div href className="card-body">
                  <button className="btn btn-primary rounded-pill custom-button">Validate</button>
                </div>
              </a>
            </div>
          </div>
          {/* Gallery */}
          <div className="col-md-4">
            <div className="card mb-4 shadow-sm custom-card">
              <img src={galleryIcon} className="card-img-top icon-image" alt="Gallery" />
              <a href="/gallery" className="stretched-link">
                <div className="card-body">
                  <button className="btn btn-primary rounded-pill custom-button">Gallery</button>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
