import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import { axiosWithCredential } from '../../../api/axios';
import useAuth from '../../../hooks/useAuth';

const AdminLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setAccessToken, setIsAuthenticated} = useAuth();



  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic
    axiosWithCredential.post('/admin/login', { email, password })
      .then((res) => {
        setAccessToken(res.data.access_token);
        setIsAuthenticated(true);
      })
      .catch((err) => {
        console.log(err);
      })

    console.log('Logging in with:', { email, password });
  };

  return (
    <Form onSubmit={handleLogin}>
      <div className="icon-container mb-4">
        <FaUserCircle size={100} />
      </div>
      <Form.Group controlId="email" className="mb-3">
        <Form.Label>email</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="password" className="mb-4">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="w-100">
        Login
      </Button>
    </Form>
  );
};

export default AdminLoginForm;
