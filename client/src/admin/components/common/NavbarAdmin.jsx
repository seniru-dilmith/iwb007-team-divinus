import React from 'react';
import logo from '../../assets/common/train-logo-low-res.png';
import '../../css/common/navbar.css';
import useWaiter from '../../../hooks/useWaiter';
import useAuth from '../../../hooks/useAuth';
import { axiosWithCredential } from '../../../api/axios';

const NavbarAdmin = () => {
  const { addWaiter, removeWaiter } = useWaiter();
  const { setIsAuthenticated, setAccessToken } = useAuth();

  const handleLogout = () => {
    addWaiter("Logging out...");

    axiosWithCredential.post('/admin/logout')
      .then((response) => {
        setIsAuthenticated(false);
        setAccessToken(null);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        removeWaiter("Logging out...");
      });
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

export default NavbarAdmin;
