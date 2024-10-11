import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/features.css';
import { featuresData } from './data/featuresData';

const Features = () => {

  return (
    <div className="features-section py-5">
      <div className="container">
        <div className="row">
          {featuresData.map((feature, index) => (
            <div className="col-lg-3 col-md-6 col-sm-12 mb-4 d-flex align-items-stretch" key={index}>
              <div className="feature-card p-4 w-100">
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
