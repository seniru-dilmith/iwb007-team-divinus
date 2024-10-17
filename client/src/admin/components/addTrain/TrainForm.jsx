import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
import SeatSelector from './SeatSelector';
import AddButton from './AddButton';
import useAxios from '../../../hooks/useAxios';

const TrainForm = () => {
  const [seats, setSeats] = useState({
    firstClass: 0,
    secondClass: 0,
    thirdClass: 0,
  });

  const [trainName, setTrainName] = useState('');
  const [routined, setRoutined] = useState(false);
  const [stations, setStations] = useState([]);
  const [selectedStations, setSelectedStations] = useState([{ station: '', time: '' }]);
  const [dropdownOpen, setDropdownOpen] = useState(Array(selectedStations.length).fill(false));
  const [date, setDate] = useState('');

  const axios = useAxios();

  // Fetch stations data (using dummy data for now)
  useEffect(() => {
    if(!axios) return;

    axios.get('/train/stations')
      .then((response) => {
        setStations(response.data.stations);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [axios]);

  // Handle seat changes
  const handleSeatChange = (e, classType) => {
    const value = parseInt(e.target.value);
    setSeats((prev) => ({
      ...prev,
      [classType]: value >= 0 ? value : 0,
    }));
  };

  const incrementSeats = (classType) => {
    setSeats((prev) => ({
      ...prev,
      [classType]: prev[classType] + 1,
    }));
  };

  const decrementSeats = (classType) => {
    setSeats((prev) => ({
      ...prev,
      [classType]: prev[classType] > 0 ? prev[classType] - 1 : 0,
    }));
  };

  // Handle the station change for each dropdown
  const handleStationChange = (e, index) => {
    const newStations = [...selectedStations];
    newStations[index].station = e.target.value;
    setSelectedStations(newStations);
  };

  // Handle time change for each station
  const handleTimeChange = (e, index) => {
    const newStations = [...selectedStations];
    newStations[index].time = e.target.value;
    setSelectedStations(newStations);
  };

  // Add new station and time dropdown
  const handleAddStation = () => {
    setSelectedStations([...selectedStations, { station: '', time: '' }]);
    setDropdownOpen([...dropdownOpen, false]);
  };

  // Remove a station dropdown
  const handleRemoveStation = (index) => {
    const newStations = selectedStations.filter((_, i) => i !== index);
    setSelectedStations(newStations);
    const newDropdownOpen = dropdownOpen.filter((_, i) => i !== index);
    setDropdownOpen(newDropdownOpen);
  };

  // Toggle dropdown open state
  const toggleDropdown = (index) => {
    const newDropdownOpen = [...dropdownOpen];
    newDropdownOpen[index] = !newDropdownOpen[index];
    setDropdownOpen(newDropdownOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trainData = {
      name: trainName,
      destinations: selectedStations.filter((entry) => entry.station !== ''),
      isDaily : routined,
      startDate : date,
      seats: {
        firstClass: {
          totalSeats: seats.firstClass,
          availableSeats: seats.firstClass
        },
        secondClass: {
          totalSeats: seats.secondClass,
          availableSeats: seats.secondClass
        },
        thirdClass: {
          totalSeats: seats.thirdClass,
          availableSeats: seats.thirdClass
        }
      }
    }

    if(!axios) return;

    axios.post('/train/schedule', trainData)
      .then((response) => {
        console.log(response);
        alert('Train added successfully!');
      })
      .catch((error) => {
        console.error(error);
        alert('Failed to add train!');
      });

    console.log('Train details submitted:', trainData);
  };

  return (
    <Form onSubmit={handleSubmit} className="train-form container">
      {/* Title of the form */}
      <h1 className="text-center text-secondary">Add New Train</h1>

      {/* Train Name */}
      <Row className="mb-3">
        <Col xs={8}>
          <Form.Group controlId="trainName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name of Train"
              value={trainName}
              onChange={(e) => setTrainName(e.target.value)}
              style={{ height: '3rem' }}
              required
            />
          </Form.Group>
        </Col>
        {/* Train Date */}
        <Col xs={4}>
          <Form.Group controlId="date">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{ height: '3rem' }}
              required
            />
          </Form.Group>
        </Col>
      </Row>

      {/* Stations with Time Selectors */}
      <h5 className="mb-3">Stations & Times</h5>
      {selectedStations.map((entry, index) => (
        <Row className="mb-3" key={index}>
          <Col xs={5}>
            <Form.Group controlId={`station-${index}`}>
              <Form.Label>Station {index + 1}</Form.Label>
              <Form.Control
                as="select"
                value={entry.station}
                onChange={(e) => handleStationChange(e, index)}
                className={`station-select ${dropdownOpen[index] ? 'open' : ''}`}
                onClick={() => toggleDropdown(index)}
                required
              >
                <option value="">Select Station</option>
                {stations.map((stationName, i) => (
                  <option key={i} value={stationName}>
                    {stationName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col xs={5}>
            <Form.Group controlId={`time-${index}`}>
              <Form.Label>Time {index + 1}</Form.Label>
              <Form.Control
                type="time"
                value={entry.time}
                onChange={(e) => handleTimeChange(e, index)}
                required
              />
            </Form.Group>
          </Col>
          <Col xs={2} className="d-flex align-items-end">
            {index === selectedStations.length - 1 ? (
              <FaPlusCircle className="add-station-icon" onClick={handleAddStation} />
            ) : (
              <FaMinusCircle className="remove-station-icon" onClick={() => handleRemoveStation(index)} />
            )}
          </Col>
        </Row>
      ))}

      {/* Routined Checkbox */}
      <Row className="mb-3">
        <Col xs={12}>
          <Form.Group controlId="routined">
            <Form.Check
              type="checkbox"
              label="Routined"
              checked={routined}
              onChange={(e) => setRoutined(e.target.checked)}
            />
          </Form.Group>
        </Col>
      </Row>

      {/* Available Seats with Increment and Decrement Buttons */}
      <h5 className="mb-3">Available Seats</h5>
      <Row className="mb-3">
        <SeatSelector
          label="First Class"
          classType="firstClass"
          value={seats.firstClass}
          onIncrement={() => incrementSeats('firstClass')}
          onDecrement={() => decrementSeats('firstClass')}
          onChange={(e) => handleSeatChange(e, 'firstClass')}
        />
        <SeatSelector
          label="Second Class"
          classType="secondClass"
          value={seats.secondClass}
          onIncrement={() => incrementSeats('secondClass')}
          onDecrement={() => decrementSeats('secondClass')}
          onChange={(e) => handleSeatChange(e, 'secondClass')}
        />
        <SeatSelector
          label="Third Class"
          classType="thirdClass"
          value={seats.thirdClass}
          onIncrement={() => incrementSeats('thirdClass')}
          onDecrement={() => decrementSeats('thirdClass')}
          onChange={(e) => handleSeatChange(e, 'thirdClass')}
        />
      </Row>

      {/* Submit Button */}
      <AddButton />
    </Form>
  );
};

export default TrainForm;
