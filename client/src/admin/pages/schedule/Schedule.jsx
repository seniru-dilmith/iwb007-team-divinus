import React, { useState, useEffect } from 'react';
import TrainCard from '../../components/schedule/TrainCard';
import SearchBar from '../../components/schedule/SearchBar';
import ScheduleHeader from '../../components/schedule/ScheduleHeader';
import Navbar from '../../components/common/navbar';
import Footer from '../../components/common/Footer';
import EditTrainModal from '../../components/schedule/EditTrainModal';
import '../../css/schedule/schedule.css';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import useAxios from '../../../hooks/useAxios';

const Schedule = () => {
  const [stations, setStations] = useState([]);
  const [newStation, setNewStation] = useState('');
  const [stationToRemove, setStationToRemove] = useState('');
  const [trains, setTrains] = useState([]);
  const [editingTrain, setEditingTrain] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const axios = useAxios();

  useEffect(() => {
    const fetchTrains = async () => {
      // Dummy data (replace with API call when ready)
      const dummyTrains = [
        {
            id: 1,
            name: 'Udarata Manike',
            seats: { firstClass: 50, secondClass: 60, thirdClass: 10 },
            seatsBooked: { firstClass: 20, secondClass: 30, thirdClass: 5 },
            arrivesAt: '10:10 p.m.',
            departsAt: '11:10 p.m.',
            routined: true,
          },
          {
            id: 2,
            name: 'Yal Devi',
            seats: { firstClass: 40, secondClass: 80, thirdClass: 52 },
            seatsBooked: { firstClass: 20, secondClass: 30, thirdClass: 5 },
            arrivesAt: '08:30 a.m.',
            departsAt: '09:30 a.m.',
            routined: false,
          },
          {
            id: 3,
            name: 'Ruhunu Kumari',
            seats: { firstClass: 30, secondClass: 20, thirdClass: 15 },
            seatsBooked: { firstClass: 20, secondClass: 18, thirdClass: 5 },
            arrivesAt: '05:00 p.m.',
            departsAt: '06:00 p.m.',
            routined: true,
          },
          {
            id: 4,
            name: 'Udarata Manike',
            seats: { firstClass: 50, secondClass: 10, thirdClass: 20 },
            seatsBooked: { firstClass: 20, secondClass: 10, thirdClass: 5 },
            arrivesAt: '10:10 p.m.',
            departsAt: '11:10 p.m.',
            routined: true,
          },
          {
            id: 5,
            name: 'Yal Devi',
            seats: { firstClass: 40, secondClass: 80, thirdClass: 80 },
            seatsBooked: { firstClass: 5, secondClass: 12, thirdClass: 2 },
            arrivesAt: '08:30 a.m.',
            departsAt: '09:30 a.m.',
            routined: false,
          },
          {
            id: 6,
            name: 'Ruhunu Kumari',
            seats: { firstClass: 30, secondClass: 40, thirdClass: 15 },
            seatsBooked: { firstClass: 2, secondClass: 5, thirdClass: 1 },
            arrivesAt: '05:00 p.m.',
            departsAt: '06:00 p.m.',
            routined: true,
          },
      ];
      setTrains(dummyTrains);
    };

    fetchTrains();
  }, []);

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

      axios.post('/train/stations', { station: newStations })
        .then((response) => {
          console.log(response);
          setStations((prevStations) => [...prevStations, ...newStations]);
          setNewStation('');
        })
    } else alert('Please enter a station name!');

  };
  
  useEffect(() => {
    if(!axios) return;

    axios.get('/train/stations')
      .then((response) => {
        setStations(response.data.stations);
      })
      .catch((error) => {
        console.error(error);
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
        });
    }
  };

  const handleDeleteTrain = (trainId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this train?');
    if (confirmDelete) {
      setTrains((prevTrains) => prevTrains.filter((train) => train.id !== trainId));
    }
  };

  const handleEditTrain = (train) => {
    setEditingTrain(train);
    setShowModal(true);
  };

  const updateTrain = (updatedTrain) => {
    setTrains((prevTrains) =>
      prevTrains.map((train) => (train.id === updatedTrain.id ? updatedTrain : train))
    );
    setShowModal(false);
    setEditingTrain(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTrain(null);
  };

  return (
    <div className="schedule-page">
      <Navbar />
      <div className="container content">
        <ScheduleHeader />

        {/* Add/Remove Station Controls */}
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
                style={{ minWidth: '100px', height: '48px' }}
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
              style={{ minWidth: '100px', height: '48px' }}
              >
              <i className="fas fa-minus me-2"></i>Remove
              </button>
            </div>
          </div>
        </Container>

        <div className="search-schedule d-flex justify-content-between">
          <div className="date-info">
            <p>{new Date().toISOString().split("T")[0]}</p>
            <span>Today</span>
          </div>
          <Link to="/admin/add-train" className="btn add-train">
            <button className="btn btn-primary schedule-new-train">
              Schedule a New Train
            </button>
          </Link>
          <SearchBar />
        </div>

        <h2 className="text-center mt-4">Scheduled Trains</h2>

        <div className="train-list">
          {trains.map((train) => (
            <TrainCard
              key={train.id}
              train={train}
              onDelete={handleDeleteTrain}
              onEdit={handleEditTrain}
            />
          ))}
        </div>
      </div>
      <Footer />

      {editingTrain && (
        <EditTrainModal
          show={showModal}
          handleClose={handleCloseModal}
          train={editingTrain}
          updateTrain={updateTrain}
        />
      )}
    </div>
  );
};

export default Schedule;
