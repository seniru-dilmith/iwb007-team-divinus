import React from "react";
import { FaClock, FaEye, FaTrashAlt, FaEdit } from "react-icons/fa";
import "../../css/schedule/traincard.css";

const TrainCard = ({ train, onDelete, onEdit }) => {
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete the train "${train.name}"?`)) {
      onDelete(train.id);
    }
  };

  const handleEdit = () => {
    onEdit({ ...train});
  };

  return (
    <div className="train-card">
      <div className="train-info">
        <FaEye className="icon-eye" />
        <div className="train-details">
          <h5>{train.name}</h5>
          <p>{`Date: ${new Date(train.startDate).toLocaleDateString()}`}</p>
        </div>
        <div className="train-seats">
          <div className="seat-class">
            <span className="class-number">1</span>
            <span className="seat-count">
              {train.seats.firstClass.availableSeats}/{train.seats.firstClass.totalSeats}
            </span>
          </div>
          <div className="seat-class">
            <span className="class-number">2</span>
            <span className="seat-count">
              {train.seats.secondClass.availableSeats}/{train.seats.secondClass.totalSeats}
            </span>
          </div>
          <div className="seat-class">
            <span className="class-number">3</span>
            <span className="seat-count">
              {train.seats.thirdClass.availableSeats}/{train.seats.thirdClass.totalSeats}
            </span>
          </div>
        </div>
      </div>

      <div className="train-time">
        <div className="arrives-departs">
          <p>{train.destinations[0].time}</p>
          <span>Departs</span>
        </div>
        <div className="arrives-departs">
          <p>{train.destinations[train.destinations.length - 1].time}</p>
          <span>Arrives</span>
        </div>
        <FaClock className="clock-icon" style={{ color: train.isDaily ? "black" : "gray" }} />
      </div>

      <div className="train-actions">
        <button className="btn btn-edit" onClick={handleEdit}>
          <FaEdit /> Edit
        </button>
        <button className="btn btn-delete" onClick={handleDelete}>
          <FaTrashAlt /> Delete
        </button>
      </div>
    </div>
  );
};

export default TrainCard;
