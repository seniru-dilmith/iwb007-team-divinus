import React, { useState, useEffect } from 'react';
import { Form, Button, InputGroup, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faTrain, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import '../../css/bookingPage/booking-form.css';
import axios from '../../../api/axios';

const BookingForm = () => {
  const [locations, setLocations] = useState([]);
  const [arrival, setArrival] = useState('');
  const [departure, setDeparture] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch dummy locations data (useEffect runs when the component mounts)
  useEffect(() => {

    axios.get('/train/stations')
      .then((res) => {
        setLocations(res.data.stations);
      })
      .catch((err) => {
        console.error('Error fetching locations:', err);
      });

  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      date: selectedDate,
      arrivalStation : arrival,
      departureStation : departure,
    };

    console.log(bookingData);
    
    // need to check this
    axios.post('/train/search', bookingData)
      .then((res) => {
        console.log('Trains:', res.data);
        navigate('/trains', { state: { trains: res.data.trains, bookingData } });
      })
      .catch((err) => {
        console.error('Error fetching trains:', err);
      });
  };

  return (
    <div className="booking-form-container p-4 shadow-lg rounded mt-5">
      <Form onSubmit={handleSubmit}>
        <Row className="align-items-center">
          {/* Date Field */}
          <Col xs={12} md={4}>
            <Form.Group controlId="formDate" className="mb-3 d-flex align-items-center">
              <FontAwesomeIcon icon={faCalendarAlt} size="2x" className="me-3" />
              <Form.Label className="mb-0">Date</Form.Label>
            </Form.Group>
          </Col>
          <Col xs={12} md={8}>
            <InputGroup className="mb-3">
              <Form.Control
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                placeholder="Pick Date"
                required
                className="rounded-pill dark-input"
              />
            </InputGroup>
          </Col>

          {/* Arrival Field */}
          <Col xs={12} md={4}>
            <Form.Group controlId="formArrival" className="mb-3 d-flex align-items-center">
              <FontAwesomeIcon icon={faTrain} size="2x" className="me-3" />
              <Form.Label className="mb-0">Arrival</Form.Label>
            </Form.Group>
          </Col>
          <Col xs={12} md={8}>
            <InputGroup className="mb-3">
              <Form.Select
                value={arrival}
                onChange={(e) => setArrival(e.target.value)}
                required
                className="rounded-pill dark-input"
              >
                <option value="">Pick Arrival</option>
                {locations.map((location, index) => (
                  <option key={index} value={location}>
                    {location}
                  </option>
                ))}
              </Form.Select>
            </InputGroup>
          </Col>

          {/* Departure Field */}
          <Col xs={12} md={4}>
            <Form.Group controlId="formDeparture" className="mb-3 d-flex align-items-center">
              <FontAwesomeIcon icon={faTrain} size="2x" className="me-3" />
              <Form.Label className="mb-0">Departure</Form.Label>
            </Form.Group>
          </Col>
          <Col xs={12} md={8}>
            <InputGroup className="mb-3">
              <Form.Select
                value={departure}
                onChange={(e) => setDeparture(e.target.value)}
                required
                className="rounded-pill dark-input"
              >
                <option value="">Pick Departure</option>
                {locations.map((location, index) => (
                  <option key={index} value={location}>
                    {location}
                  </option>
                ))}
              </Form.Select>
            </InputGroup>
          </Col>

          {/* Search Button */}
          <Col xs={12} className="d-flex justify-content-center mt-auto">
            <Button className="search-btn" type="submit" disabled={loading}>
              {loading ? 'Loading...' : <FontAwesomeIcon icon={faSearch} size="2x" />}
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default BookingForm;
