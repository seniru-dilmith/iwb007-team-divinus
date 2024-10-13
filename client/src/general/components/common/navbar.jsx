import React, { useState, useEffect } from 'react';
import logo from '../../assets/common/train-logo-low-res.png';
import '../../css/common/navbar.css';

const Navbar = () => {
  const [scrollDirection, setScrollDirection] = useState('up');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
      // Hide the navbar when scrolling down
      setScrollDirection('down');
    } else {
      // Show the navbar when scrolling up
      setScrollDirection('up');
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-light custom-navbar ${
        scrollDirection === 'down' ? 'navbar-hidden' : 'navbar-visible'
      } ${isMenuOpen ? 'menu-open' : ''}`}
    >
      <div className="container d-flex align-items-center justify-content-between">
        <a className="navbar-brand d-flex align-items-center" href="/">
          <img src={logo} alt="BookMyTrain" width="40" height="40" className="navbar-logo me-2" />
          <span className="brand-text">Book My Train</span>
        </a>

        {/* Hamburger menu for smaller screens */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse nav-wrapper ${isMenuOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/booking">Booking</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/validate">Validate</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/gallery">Gallery</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact">Contact Us</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
