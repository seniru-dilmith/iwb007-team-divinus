import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import '../css/notFoundPage/notFound.css';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <Container fluid className="d-flex justify-content-center align-items-center vh-100">
        <Row className="text-center">
          <Col>
            <h1 className="display-1 text-white">404</h1>
            <h2 className="display-4 text-white">Oops! Page Not Found</h2>
            <p className="lead text-white mb-5">The page you are looking for doesn't exist or has been moved or not here!</p>
            <a href='/'>
                <Button className="home-button" size="lg">
                Back to Home
                </Button>
            </a>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NotFound;
