import React, { useState, useEffect } from 'react';
import '../../css/schedule/schedule.css';
import { Container } from 'react-bootstrap';

const StationControl = () => {

    const [stations, setStations] = useState([]);
    const [newStation, setNewStation] = useState('');
    const [stationToRemove, setStationToRemove] = useState('');

    // add a new station
  const handleAddStation = () => {
    if (newStation) {
      const newStations = newStation
      .split(',')
      .map((station) => station.trim())
      .filter((station) => station && !stations.includes(station));

      if (!newStations.length) {
        alert('This station already exists!');
        return;
      }
    
      setStations((prevStations) => [...prevStations, ...newStations]);
      // axios call to add station to the database
      // await axios.post('http://localhost:5000/add-stations', { name: newStations });
      setNewStation(''); // clear the input field

    } else alert('Please enter a station name!');

  };

  // fetch stations from the database
  const fetchStations = async () => {
    // Dummy data (replace with API call when ready)
    const dummyStations = ['Colombo Fort', 'Kandy', 'Badulla', 'Anuradhapura', 'Jaffna'];
    setStations(dummyStations);
    //axios call to fetch stations from the database
    // const response = await axios.get('http://localhost:5000/stations');
    // setStations(response.data);
  };

  useEffect(() => {
    fetchStations();
  }, []);


  // remove a station
  const handleRemoveStation = () => {
    if (!stationToRemove) {
      alert('Please select a station to remove!');
      return;
    }

    const confirmDelete = window.confirm(`Are you sure you want to remove "${stationToRemove}"?`);
    if (confirmDelete) {
      setStations((prevStations) =>
        prevStations.filter((station) => station !== stationToRemove)
      );
      // await axios.delete(`http://localhost:5000/remove-station/${stationToRemove}`);
      setStationToRemove('');
    }
  };
    
    return (
      <Container fluid className="d-flex justify-contents-start">
        <div className="row gap-3 custom-gap station-add-remove">
          <div className="station-controls col-12 d-flex mb-3 align-items-start gap-4">
            <input
              type="text"
              placeholder="Add New Station(s) (comma separated)"
              value={newStation}
              onChange={(e) => setNewStation(e.target.value)}
              className="form-control"
            />
            <button
              className="btn btn-success d-flex align-items-center justify-content-center"
              style={{ minWidth: "100px", height: "48px" }}
              onClick={handleAddStation}
            >
              <i className="fas fa-plus me-2"></i>Add
            </button>
          </div>
          <div className="station-controls col-12 d-flex align-items-center gap-3">
            <select
              className="form-select"
              value={stationToRemove}
              onChange={(e) => setStationToRemove(e.target.value)}
            >
              <option value="">Select a Station to Remove</option>
              {stations.map((station, index) => (
                <option key={index} value={station}>
                  {station}
                </option>
              ))}
            </select>
            <button
              className="btn btn-danger d-flex align-items-center justify-content-center"
              onClick={handleRemoveStation}
              style={{ minWidth: "100px", height: "48px" }}
            >
              <i className="fas fa-minus me-2"></i>Remove
            </button>
          </div>
        </div>
      </Container>
    );
};

export default StationControl;
