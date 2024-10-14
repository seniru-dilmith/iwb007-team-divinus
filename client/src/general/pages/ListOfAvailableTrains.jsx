import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import TrainCard from '../components/listOfTrains/TrainCard';
import Navbar from '../components/common/navbar';
import Footer from '../components/common/Footer';
import '../css/listOfTrains/available-trains.css';

const ListOfAvailableTrains = () => {

  const trains = [
    {
      id: 1,
      name: "Udarata Manike",
      subText: "Name of the Train",
      arrivesAt: "10:10 p.m.",
      departsAt: "11:10 p.m.",
      seatAvailability: {
        firstClass: 45,
        secondClass: 110,
        thirdClass: 209
      }
    },
    {
      id: 2,
      name: "Podi Menike",
      subText: "Name of the Train",
      arrivesAt: "9:00 a.m.",
      departsAt: "10:00 a.m.",
      seatAvailability: {
        firstClass: 30,
        secondClass: 90,
        thirdClass: 150
      }
    }
  ];
  
  // Get today's date
  const today = new Date();
  const formattedToday = `${today.getFullYear()}/${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}`;

  // Get trains and booking data from the previous page
  const location = useLocation();
  // const trains = location.state?.trains || [];
  const bookingData = location.state?.bookingData || { };

  return (
    <Container fluid className="available-trains-container p-4">
      <Navbar /> {/* The Navbar will be visible on all pages */}
      <Row className="justify-content-between align-items-center mb-4" style={{ marginTop: '100px' }}>
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

      {/* Title for Available Trains */}
      <Row className="justify-content-center mt-4">
        <h2 className="text-center available-trains-title mb-4">Available Trains</h2>
      </Row>

      {/* Train List */}
      <Row className="train-list">
        {trains.length > 0 ? (
          trains.map((train) => (
            <TrainCard key={train.id} train={train} bookingData={bookingData} />
          ))
        ) : (
          <Col className="text-center">
            <p className="no-trains">No trains available for the selected date and locations.</p>
          </Col>
        )}
      </Row>
      <Footer /> {/* The Footer will be visible on all pages */}
    </Container>
  );
};

export default ListOfAvailableTrains;
