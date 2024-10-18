import React from 'react';
import logo from '../../assets/common/train-logo-low-res.png';
import '../../css/common/navbar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/admin');
  };

  return (
    <nav className="navbar">
      <a className="navbar-brand" href="/">
          <img src={logo} alt="BookMyTrain" />
          <span>BookMyTrain</span>
      </a>
      <div className="navbar-divider"></div>
      <div className="admin-center">Admin</div>
      <div className="navbar-divider"></div>
      <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
