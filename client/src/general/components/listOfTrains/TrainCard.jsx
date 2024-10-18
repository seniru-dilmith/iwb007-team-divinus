import React, { useState } from 'react';
import { Card, Button, Row, Col, Modal, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const TrainCard = ({ train, bookingData }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);  // State to control modal visibility

  // Function to handle the "More Info" button click
  const handleMoreInfo = () => {
    setShowModal(true);  // Show the modal
  };

  //Function to get the Arrival time of a specific station
  const arrivalTime = (station) => {
    const id = train.destinations.findIndex((stationData, index, array) => {
      return (station === stationData.station)
    })
    return train.destinations[id].time
  }

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setShowModal(false);  // Hide the modal
  };

  // Function to handle the "Book Now" button
  const handleBookNow = () => {
    navigate('/payment', {
      state: {
        train,
        bookingData
      }
    });
  };

  return (
    <>
      <Card className="train-card shadow-sm mb-3">
        <Row className="align-items-center">
          {/* Train Logo */}
          <Col xs={12} md={2} className="text-center">
            <img
              src="/path-to-train-logo.png"
              alt="Train Logo"
              className="train-logo"
            />
          </Col>

          {/* Train Info */}
          <Col xs={12} md={4}>
            <div className="train-info">
              <h5 className="train-name">{train.name}</h5>
            </div>
            <div className="train-seats">
              <Button variant="warning" className="seat-btn mx-1">1 ({train.seats.firstClass.availableSeats})</Button>
              <Button variant="warning" className="seat-btn mx-1">2 ({train.seats.secondClass.availableSeats})</Button>
              <Button variant="warning" className="seat-btn mx-1">3 ({train.seats.thirdClass.availableSeats})</Button>
            </div>
          </Col>

          {/* Arrival and Departure Time */}
          <Col xs={12} md={3} className="text-center">
            <div className="train-time">
              <h6>Departure: {arrivalTime(bookingData.departureStation)}</h6>
              <h6>Arrival: {arrivalTime(bookingData.arrivalStation)}</h6>
              
            </div>
          </Col>

          {/* Action Buttons */}
          <Col xs={12} md={3} className="text-center">
            <Button
              variant="warning"
              className="more-btn py-2 px-3 m-2"
              onClick={handleMoreInfo}  // Attach the event handler for "More Info"
            >
              More Info
            </Button>
            <Button
              variant="primary"
              className="book-btn py-2 px-3 m-2"
              onClick={handleBookNow}  // Attach the event handler for "Book Now"
            >
              Book Now
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Modal for More Info */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{train.name} - Train Schedule</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Station</th>
                <th>Arrival</th>
              </tr>
            </thead>
            <tbody>
              {train.destinations.map((station, index) => (
                <tr key={index}>
                  <td>{station.station}</td>
                  <td>{station.time}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TrainCard;
