import React, { useState, useEffect } from 'react';
import '../../css/schedule/schedule.css';
import { Container } from 'react-bootstrap';
import useAxios from '../../../hooks/useAxios';
import useWaiter from '../../../hooks/useWaiter';

const StationControl = () => {

    const [stations, setStations] = useState([]);
    const [newStation, setNewStation] = useState('');
    const [stationToRemove, setStationToRemove] = useState('');
    const axios = useAxios();
    const { addWaiter, removeWaiter } = useWaiter();

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

    if(!axios) return;
    addWaiter('Adding new station...');

    axios.post('/train/stations', { station: newStations })
      .then((response) => {
        console.log(response);
        setStations((prevStations) => [...prevStations, ...newStations]);
        setNewStation('');
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        removeWaiter('Adding new station...');
      });
  } else alert('Please enter a station name!');

};

  useEffect(() => {
    if(!axios) return;
    addWaiter('Fetching stations in station control...');

    axios.get('/train/stations')
      .then((response) => {
        setStations(response.data.stations);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        removeWaiter('Fetching stations in station control...');
      });
  }, []);


   // remove a station
  const handleRemoveStation = () => {
    if (!stationToRemove) {
      alert('Please select a station to remove!');
      return;
    }

    const confirmDelete = window.confirm(`Are you sure you want to remove "${stationToRemove}"?`);
      if (confirmDelete) {
        if(!axios) return;
        addWaiter('Removing station...');

        axios.delete(`/train/stations/${stationToRemove}`)
          .then((response) => {
            console.log(response);
            setStations((prevStations) =>
              prevStations.filter((station) => station !== stationToRemove)
            );
            setStationToRemove('');
          })
          .catch((error) => {
            console.error(error);
          })
          .finally(() => {
            removeWaiter('Removing station...');
          });
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
