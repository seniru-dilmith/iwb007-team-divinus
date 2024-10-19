import React from 'react';
import TrainForm from '../../components/addTrain/TrainForm';
import '../../css/addTrain/add-train.css';

const AddTrain = () => {
  return (
    <div className="add-train-page">
      <div className="form-wrapper">
        <TrainForm />
      </div>
    </div>
  );
};

export default AddTrain;
