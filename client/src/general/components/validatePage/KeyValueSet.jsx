import React from 'react';

const KeyValueSet = ({ keyData, valueData }) => (
  <div className="d-flex justify-content-between my-2">
    <strong>{keyData}:</strong>
    <span>{valueData}</span>
  </div>
);

export default KeyValueSet;
