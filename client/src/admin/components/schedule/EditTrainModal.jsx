import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import '../../css/schedule/editTrainModal.css';

function formatTimeTo12Hour(timeString) {
  if (!timeString) return '';
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? 'p.m.' : 'a.m.';
  const twelveHour = hour % 12 || 12;
  return `${twelveHour}:${minutes} ${ampm}`;
}

function formatTimeTo24Hour(timeString) {
  if (!timeString) return '';
  const [time, period] = timeString.split(' ');
  let [hours, minutes] = time.split(':');
  hours = parseInt(hours, 10);

  if (period.toLowerCase() === 'p.m.' && hours !== 12) {
    hours += 12;
  } else if (period.toLowerCase() === 'a.m.' && hours === 12) {
    hours = 0;
  }

  return `${hours.toString().padStart(2, '0')}:${minutes}`;
}

const EditTrainModal = ({ show, handleClose, train, updateTrain }) => {
  const [editedTrain, setEditedTrain] = useState(null);

  useEffect(() => {
    if (train) {
      setEditedTrain({
        ...train,
        arrivesAt: formatTimeTo24Hour(train.arrivesAt),
        departsAt: formatTimeTo24Hour(train.departsAt),
      });
    }
  }, [train]);

  if (!train || !editedTrain) {
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTrain(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSeatsChange = (e, classType) => {
    const value = parseInt(e.target.value);
    setEditedTrain(prev => ({
      ...prev,
      seats: {
        ...prev.seats,
        [classType]: value,
      },
    }));
  };

  const handleTimeChange = (e, timeType) => {
    setEditedTrain(prev => ({
      ...prev,
      [timeType]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    const updatedTrain = {
      ...editedTrain,
      arrivesAt: formatTimeTo12Hour(editedTrain.arrivesAt),
      departsAt: formatTimeTo12Hour(editedTrain.departsAt),
    };

    updateTrain(updatedTrain);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Train: {editedTrain.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="editTrainName">
            <Form.Label>Train Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={editedTrain.name}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Row>
            <Col>
              <Form.Group controlId="editArrivesAt">
                <Form.Label>Arrives At</Form.Label>
                <Form.Control
                  type="time"
                  value={editedTrain.arrivesAt}
                  onChange={(e) => handleTimeChange(e, 'arrivesAt')}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="editDepartsAt">
                <Form.Label>Departs At</Form.Label>
                <Form.Control
                  type="time"
                  value={editedTrain.departsAt}
                  onChange={(e) => handleTimeChange(e, 'departsAt')}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="editFirstClassSeats">
                <Form.Label>First Class Seats</Form.Label>
                <Form.Control
                  type="number"
                  value={editedTrain.seats.firstClass}
                  onChange={(e) => handleSeatsChange(e, 'firstClass')}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="editSecondClassSeats">
                <Form.Label>Second Class Seats</Form.Label>
                <Form.Control
                  type="number"
                  value={editedTrain.seats.secondClass}
                  onChange={(e) => handleSeatsChange(e, 'secondClass')}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="editThirdClassSeats">
                <Form.Label>Third Class Seats</Form.Label>
                <Form.Control
                  type="number"
                  value={editedTrain.seats.thirdClass}
                  onChange={(e) => handleSeatsChange(e, 'thirdClass')}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditTrainModal;
