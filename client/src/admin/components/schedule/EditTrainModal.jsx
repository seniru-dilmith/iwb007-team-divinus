import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa";
// import axios from 'axios'; // Uncomment when backend is ready.
import "../../css/schedule/editTrainModal.css";

const EditTrainModal = ({ show, handleClose, train, updateTrain }) => {
  const [editedTrain, setEditedTrain] = useState(null);
  const [availableStations, setAvailableStations] = useState([]);

  // Dummy data for available stations
  const dummyStations = [
    "Kandy",
    "Colombo Fort",
    "Gampaha",
    "Matara",
    "Peradeniya",
    "Polgahawela",
    "Veyangoda",
  ];

  // Fetch stations (replace with actual API call when ready)
  useEffect(() => {
    const fetchStations = async () => {
      try {
        // const response = await axios.get('/api/stations');
        // setAvailableStations(response.data);
        setAvailableStations(dummyStations); // Use dummy data for now.
      } catch (error) {
        console.error("Error fetching stations:", error);
      }
    };

    fetchStations();
  }, []);

  useEffect(() => {
    if (train) {
      setEditedTrain({ ...train });
    }
  }, [train]);

  if (!train || !editedTrain) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTrain((prev) => ({ ...prev, [name]: value }));
  };

  const handleSeatsChange = (e, classType) => {
    const value = parseInt(e.target.value, 10);
    setEditedTrain((prev) => ({
      ...prev,
      seats: { ...prev.seats, [classType]: value },
    }));
  };

  const handleDestinationChange = (index, field, value) => {
    const updatedDestinations = [...editedTrain.destinations];
    updatedDestinations[index] = {
      ...updatedDestinations[index],
      [field]: value,
    };
    setEditedTrain((prev) => ({ ...prev, destinations: updatedDestinations }));
  };

  const handleAddDestination = () => {
    setEditedTrain((prev) => ({
      ...prev,
      destinations: [...prev.destinations, { station: "", time: "" }],
    }));
  };

  const handleRemoveDestination = (index) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to remove the destination "${editedTrain.destinations[index].station}"?`
    );
    if (confirmDelete) {
      const updatedDestinations = editedTrain.destinations.filter(
        (_, i) => i !== index
      );
      setEditedTrain((prev) => ({
        ...prev,
        destinations: updatedDestinations,
      }));
    }
  };

  const handleSubmit = () => {
    updateTrain(editedTrain);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
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

          <h5 className="mt-4">Destinations</h5>
          {editedTrain.destinations.map((destination, index) => (
            <Row className="station-row mb-3" key={index}>
              <Col xs={5} className="station-col">
                <Form.Group controlId={`station-${index}`}>
                  <Form.Label>Station {index + 1}</Form.Label>
                  <Form.Select
                    value={destination.station}
                    onChange={(e) =>
                      handleDestinationChange(index, "station", e.target.value)
                    }
                  >
                    <option value="">Select Station</option>
                    {availableStations.map((station, i) => (
                      <option key={i} value={station}>
                        {station}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col xs={5} className="time-col">
                <Form.Group controlId={`time-${index}`}>
                  <Form.Label>Time {index + 1}</Form.Label>
                  <Form.Control
                    type="time"
                    value={destination.time}
                    onChange={(e) =>
                      handleDestinationChange(index, "time", e.target.value)
                    }
                  />
                </Form.Group>
              </Col>
              <Col
                xs={2}
                className="delete-col d-flex align-items-center justify-content-center"
              >
                <button
                  type="button"
                  className="btn btn-danger btn-sm remove-destination-btn"
                  onClick={() => handleRemoveDestination(index)}
                >
                  &times;
                </button>
              </Col>
            </Row>
          ))}
          <Button
            variant="secondary"
            className="mt-2"
            onClick={handleAddDestination}
          >
            <FaPlusCircle /> Add Destination
          </Button>

          <h5 className="mt-4">Seats</h5>
          <Row>
            <Col xs={12} md={4}>
              <Form.Group controlId="editFirstClassSeats">
                <Form.Label>First Class Seats</Form.Label>
                <Form.Control
                  type="number"
                  value={editedTrain.seats.firstClass}
                  onChange={(e) => handleSeatsChange(e, "firstClass")}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={4}>
              <Form.Group controlId="editSecondClassSeats">
                <Form.Label>Second Class Seats</Form.Label>
                <Form.Control
                  type="number"
                  value={editedTrain.seats.secondClass}
                  onChange={(e) => handleSeatsChange(e, "secondClass")}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={4}>
              <Form.Group controlId="editThirdClassSeats">
                <Form.Label>Third Class Seats</Form.Label>
                <Form.Control
                  type="number"
                  value={editedTrain.seats.thirdClass}
                  onChange={(e) => handleSeatsChange(e, "thirdClass")}
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
