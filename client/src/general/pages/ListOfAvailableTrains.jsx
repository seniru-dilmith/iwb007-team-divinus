import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import TrainCard from '../components/listOfTrains/TrainCard';

import '../css/listOfTrains/available-trains.css';

const ListOfAvailableTrains = () => {

  // Get today's date
  const today = new Date();
  const formattedToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  // Get trains and booking data from the previous page
  const location = useLocation();
  const bookingData = location.state?.bookingData || {};
  const trainData = location.state?.trains || {};

  useEffect(() => {
    console.log(trainData);
    console.log(bookingData);
  },[trainData]);

  return (
      <Container className="available-trains-container">
        <Row className="justify-content-between align-items-center mt-2 mb-2" style={{ marginTop: '100px' }}>
          <Col xs={6}>
            <div className="text-left">
              <h5 className="text-muted mb-0">Today</h5>
              <h3 className="text-primary">{formattedToday}</h3>
            </div>
          </Col>
          <Col xs={6} className="text-end">
            <div>
              <h5 className="text-muted mb-0">Booking Date</h5>
              <h3 className="text-primary">{bookingData.date || 'N/A'}</h3>
            </div>
          </Col>
        </Row>

        <Row className="justify-content-between align-items-center mb-4 mt-0" style={{ marginTop: '100px' }}>
          <Col xs={6}>
            <div className="text-left">
              <h5 className="text-muted mb-0">Departure From</h5>
              <h3 className="text-primary">{bookingData.departureStation || 'N/A'}</h3>
            </div>
          </Col>
          <Col xs={6} className="text-end">
            <div>
              <h5 className="text-muted mb-0">Arrival To</h5>
              <h3 className="text-primary">{bookingData.arrivalStation || 'N/A'}</h3>
            </div>
          </Col>
        </Row>

        {/* Title for Available Trains */}
        <Row className="justify-content-center mt-4">
          <h2 className="text-center available-trains-title mb-4 text-danger">Available Trains</h2>
        </Row>

        {/* Train List */}
        <Row className="train-list">
          {trainData.length > 0 ? (
            trainData.map((train) => (
              <TrainCard key={train.id} train={train} bookingData={bookingData} />
            ))
          ) : (
            <Col className="text-center">
              <p className="no-trains">No trains available for the selected date and locations.</p>
            </Col>
          )}
        </Row>
      </Container>
  );
};

export default ListOfAvailableTrains;
