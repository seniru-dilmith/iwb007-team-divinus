import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Row, Col, Modal, Table } from 'react-bootstrap';
import '../../css/listOfTrains/train-card.css';

const TrainCard = ({ train, bookingData }) => {  // Make sure bookingData is passed in as a prop
  const navigate = useNavigate(); // Initialize navigate

  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [schedule, setSchedule] = useState([]); // State to store train schedule

  // Handle "More" button click to open modal and fetch schedule
  const handleShowDetails = async () => {
    setShowModal(true);

    // Dummy schedule data for now
    const dummySchedule = [
      { destination: 'Kandy', arrival: '10:10 p.m.', departure: '11:10 p.m.' },
      { destination: 'Nanu Oya', arrival: '12:30 p.m.', departure: '1:10 p.m.' },
      { destination: 'Badulla', arrival: '2:30 p.m.', departure: '3:00 p.m.' },
      { destination: 'Colombo Fort', arrival: '4:00 p.m.', departure: '5:00 p.m.' },
    ];
    setSchedule(dummySchedule); // Set dummy data to schedule
  };

  // Handle closing the modal
  const handleClose = () => setShowModal(false);

  // Handle "Book" button click
  const handleBook = () => {
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
          <Col xs={12} md={3}>
            <div className="train-info">
              <h5 className="train-name">{train.name}</h5>
              <p className="train-subtext">{train.subText}</p>
            </div>
            <div className="train-seats">
              <div className="seat-circle">
                <div className="seat-number">1</div>
                <div className="available-seats">({train.seatAvailability.firstClass})</div>
              </div>
              <div className="seat-circle">
                <div className="seat-number">2</div>
                <div className="available-seats">({train.seatAvailability.secondClass})</div>
              </div>
              <div className="seat-circle">
                <div className="seat-number">3</div>
                <div className="available-seats">({train.seatAvailability.thirdClass})</div>
              </div>
            </div>
          </Col>

          {/* Arrival Time */}
          <Col xs={12} md={2} className="text-center">
            <p className="arrival-time">{train.arrivesAt}</p>
            <p className="time-label">Arrives</p>
          </Col>

          {/* Departure Time */}
          <Col xs={12} md={2} className="text-center">
            <p className="departure-time">{train.departsAt}</p>
            <p className="time-label">Departs</p>
          </Col>

          {/* Action Buttons */}
          <Col xs={12} md={1} className="text-center">
            <Button
              variant="warning"
              className="more-btn"
              onClick={handleShowDetails}
            >
              More <i className="fas fa-caret-down"></i>
            </Button>
          </Col>
          <Col xs={12} md={1} className="text-center">
            <Button variant="primary" className="book-btn" onClick={handleBook}>
              Book <i className="fas fa-arrow-right"></i>
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Modal to display the train schedule */}
      <Modal show={showModal} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{train.name} - Schedule</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {schedule.length > 0 ? (
            <Table responsive bordered hover className="train-schedule-table">
              <thead>
                <tr>
                  <th>Destination</th>
                  <th>Arrival Time</th>
                  <th>Departure Time</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((stop, index) => (
                  <tr key={index}>
                    <td>{stop.destination}</td>
                    <td>{stop.arrival}</td>
                    <td>{stop.departure}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p className="text-center">No schedule available for this train.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TrainCard;
