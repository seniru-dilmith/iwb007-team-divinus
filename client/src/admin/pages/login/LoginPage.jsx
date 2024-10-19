import React from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import LoginForm from '../../components/login/LoginForm';
import '../../css/login/login-page.css';
import logo from '../../assets/common/train-logo-low-res.png'
import Navbar from '../../components/common/NavbarAdmin';
import Footer from '../../components/common/Footer';

const LoginPage = () => {
  return (
    <div className="admin-login-page">
        <Container fluid>
            <Row className="justify-content-center align-items-center min-vh-100">
            <Col md={6} lg={4}>
                <Card className="p-4 shadow-lg login-card">
                <Card.Body className="text-center">
                    <div className="logo-container mb-4">
                    <img src={logo} alt="BookMyTrain" className="admin-logo mb-2" /> <span className="text-dark fw-bold fs-3">Book My Train</span>

                    <h3 className="admin-login-title text-info">Login</h3>
                    </div>
                    <LoginForm />
                </Card.Body>
                </Card>
            </Col>
            </Row>
        </Container>
    </div>
  );
};

export default LoginPage;
