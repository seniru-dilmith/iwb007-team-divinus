import React from 'react';
import { FaClock, FaEye } from 'react-icons/fa';
import '../../css/schedule/traincard.css';

const TrainCard = ({ train, onDelete, onEdit }) => {
  const handleDelete = () => {
    onDelete(train.id);
  };

  const handleEdit = () => {
    onEdit(train);
  };

  return (
    <div className="train-card">
      <div className="train-info">
        <FaEye className="icon-eye" />
        <div className="train-details">
          <h5>{train.name}</h5>
          <p>Name of the Train</p>
        </div>
        <div className="train-seats">
          {/* Display class number and seat count */}
          <div className="seat-class">
            <span className="class-number">1</span>
            <span className="seat-count">{train.seatsBooked.firstClass}/{train.seats.firstClass}</span>
          </div>
          <div className="seat-class">
            <span className="class-number">2</span>
            <span className="seat-count">{train.seatsBooked.secondClass}/{train.seats.secondClass}</span>
          </div>
          <div className="seat-class">
            <span className="class-number">3</span>
            <span className="seat-count">{train.seatsBooked.thirdClass}/{train.seats.thirdClass}</span>
          </div>
        </div>
      </div>

      <div className="train-time">
        <div className="arrives-departs">
          <p>{train.arrivesAt}</p>
          <span>Arrives</span>
        </div>
        <div className="arrives-departs">
          <p>{train.departsAt}</p>
          <span>Departs</span>
        </div>
        {train.routined ? <FaClock className="clock-icon" /> : <FaClock className="clock-icon" style={{ color: "gray" }}/>}
      </div>

      <div className="train-actions">
        <button className="btn btn-edit" onClick={handleEdit}>
          Edit
        </button>
        <button className="btn btn-delete" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TrainCard;
