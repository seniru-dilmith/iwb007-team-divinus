import React, { useState, useEffect } from 'react';
import { Form, Button, InputGroup, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faTrain, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import '../../css/bookingPage/booking-form.css';

const BookingForm = () => {
  const [locations, setLocations] = useState([]);
  const [arrival, setArrival] = useState('');
  const [departure, setDeparture] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch dummy locations data (useEffect runs when the component mounts)
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        // Dummy locations data
        const dummyLocations = ['Anuradhapura', 'Colombo', 'Moratuwa', 'Jaffna', 'Panadura'];
        // const response = await axios.get('https://your-api.com/locations');
        setLocations(dummyLocations);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const bookingData = {
      date: selectedDate,
      arrival,
      departure,
    };

    // Simulating an API response with dummy data
    setTimeout(() => {
      const dummyTrains = [
        {
          id: 1,
          name: "Udarata Manike",
          arrivesAt: "10:10 p.m.",
          departsAt: "11:10 p.m.",
        },
        {
          id: 2,
          name: "Podi Menike",
          arrivesAt: "9:00 a.m.",
          departsAt: "10:00 a.m.",
        },
      ];
      console.log('Dummy booking successful:', dummyTrains);
      navigate('/trains', { state: { trains: dummyTrains, bookingData } });
      setLoading(false); // Stop loading
    }, 1500); // Simulating a delay of 1.5 seconds
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
