import React, { useState, useEffect } from "react";
import TrainCard from "../../components/schedule/TrainCard";
import SearchBar from "../../components/schedule/SearchBar";
import ScheduleHeader from "../../components/schedule/ScheduleHeader";
import Navbar from "../../components/common/navbar";
import Footer from "../../components/common/Footer";
import EditTrainModal from "../../components/schedule/EditTrainModal";
import StationControl from "../../components/schedule/StationControl";
import "../../css/schedule/schedule.css";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import StationControl from "../../components/schedule/StationControl";
import useAxios from '../../../hooks/useAxios';

const Schedule = () => {
  const [trains, setTrains] = useState([]);
  const [editingTrain, setEditingTrain] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const axios = useAxios();

  useEffect(() => {
    const fetchTrains = async () => {
      const dummyTrains = [
        {
          id: 1,
          name: "Uththara Devi",
          destinations: [
            { station: "Kandy", time: "06:00" },
            { station: "Peradeniya", time: "06:30" },
          ],
          seats: { firstClass: 100, secondClass: 300, thirdClass: 200 },
          seatsBooked: { firstClass: 20, secondClass: 50, thirdClass: 10 },
          isDaily: true,
          startDate: "2024-11-20",
        },
        {
          id: 2,
          name: "Yal Devi",
          destinations: [
            { station: "Anuradhapura", time: "05:00" },
            { station: "Jaffna", time: "09:30" },
          ],
          seats: { firstClass: 40, secondClass: 80, thirdClass: 50 },
          seatsBooked: { firstClass: 20, secondClass: 30, thirdClass: 5 },
          isDaily: false,
          startDate: "2024-11-16",
        },
      ];
      setTrains(dummyTrains);
    };

    fetchTrains();
  }, []);

  const handleDeleteTrain = (trainId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this train?");
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
        <StationControl />
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
