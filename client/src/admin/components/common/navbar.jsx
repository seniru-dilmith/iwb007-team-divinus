import React from 'react';
import logo from '../../assets/common/train-logo-low-res.png';
import '../../css/common/navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <a className="navbar-brand" href="/">
          <img src={logo} alt="BookMyTrain" />
          <span>BookMyTrain</span>
      </a>
      <div className="navbar-divider"></div>
      <div className="admin-center">Admin</div>
    </nav>
  );
};

export default Navbar;
