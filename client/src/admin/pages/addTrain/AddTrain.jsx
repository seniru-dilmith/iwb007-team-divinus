import React from 'react';
import Navbar from '../../components/common/navbar';
import Footer from '../../components/common/Footer';
import TrainForm from '../../components/addTrain/TrainForm';
import '../../css/addTrain/add-train.css';

const AddTrain = () => {
  return (
    <div className="add-train-page">
      <Navbar />
      <div className="form-wrapper">
        <TrainForm />
      </div>
      <Footer />
    </div>
  );
};

export default AddTrain;
