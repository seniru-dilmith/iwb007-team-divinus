import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import '../../css/bookingPage/booking-form.css';

const BookingForm = () => {
  const [locations, setLocations] = useState([]);
  const [arrival, setArrival] = useState('');
  const [departure, setDeparture] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  // Fetch dummy data from an API (useEffect runs when the component mounts)
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const dummyLocations = ['Anuradhapura', 'Colombo', 'Moratuwa', 'Jaffna', 'Panadura'];
        // const response = await axios.get('https://api.example.com/locations');
        // const data = response.data.locations; 

        setLocations(dummyLocations); // Replace this with `setLocations(data)` for actual API data
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit

    const bookingData = {
      date: selectedDate,
      arrival,
      departure,
    };

    try {
      // POST the booking data to a specified API endpoint
      const response = await axios.post('https://your-api.com/bookings', bookingData);
      
      if (response.status === 200) {
        // Handle successful response (e.g., show success message)
        alert('Booking successful!');
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('Failed to submit booking');
    }
  };

  return (
    <div className="booking-form-container p-4 shadow-lg rounded">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formDate" className="mb-3">
          <Form.Label><i className="fas fa-calendar-alt"></i> Date</Form.Label>
          <Form.Control
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            placeholder="Pick Date"
            required
          />
        </Form.Group>

        <Form.Group controlId="formArrival" className="mb-3">
          <Form.Label><i className="fas fa-map-marker-alt"></i> Arrival</Form.Label>
          <Form.Select value={arrival} onChange={(e) => setArrival(e.target.value)} required>
            <option value="">Select Arrival</option>
            {locations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="formDeparture" className="mb-3">
          <Form.Label><i className="fas fa-map-marker-alt"></i> Departure</Form.Label>
          <Form.Select value={departure} onChange={(e) => setDeparture(e.target.value)} required>
            <option value="">Select Departure</option>
            {locations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button className="btn btn-primary w-100" type="submit">
          <i className="fas fa-search"></i> Search
        </Button>
      </Form>
    </div>
  );
};

export default BookingForm;
