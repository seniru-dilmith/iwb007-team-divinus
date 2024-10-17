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
import useAxios from "../../../hooks/useAxios";
import useWaiter from "../../../hooks/useWaiter";

const Schedule = () => {
  const [trains, setTrains] = useState([]);
  const [editingTrain, setEditingTrain] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const axios = useAxios();
  const { addWaiter, removeWaiter } = useWaiter();

  useEffect(() => {
    if (!axios) return;
    addWaiter("Fetching trains...");

    axios.get("/train/schedule")
      .then((response) => {
        setTrains(response.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        removeWaiter("Fetching trains...");
      });

  }, [axios]);

  const handleDeleteTrain = (deleteTrain) => {
    if(!axios) return;
    const confirmDelete = window.confirm("Are you sure you want to delete this train?");
    addWaiter("Deleting train...");

    if (confirmDelete) {
      axios.delete(`/train/schedule/${deleteTrain._id["$oid"]}`)
        .then((response) => {
          setTrains((prevTrains) => prevTrains.filter((train) => train._id !== deleteTrain._id));
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          removeWaiter("Deleting train...");
        });
    }
  };

  const handleEditTrain = (train) => {
    setEditingTrain(train);
    setShowModal(true);
  };

  const updateTrain = (updatedTrain) => {
    const originalTrains = [...trains];
  
    setTrains((prevTrains) =>
      prevTrains.map((train) =>
        train._id["$oid"] === updatedTrain._id["$oid"] ? { ...updatedTrain } : train
      )
    );
  
    if (!axios) return;
    addWaiter("Updating train...");

    axios.put(`/train/schedule/${updatedTrain._id["$oid"]}`, updatedTrain)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
        setTrains(originalTrains);
      })
      .finally(() => {
        removeWaiter("Updating train...");
      });
  
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
          {trains.map((train, index) => (
            <TrainCard
              key={index}
              train={train}
              onDelete={() => handleDeleteTrain(train)}
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
