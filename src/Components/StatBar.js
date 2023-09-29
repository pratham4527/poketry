import React from 'react';

const StatBar = ({ label, value }) => {
  return (
    <div className="container my-2 d-flex align-items-center">
      <h6 className="card-title" style={{ width: '200px' }}>{label}:</h6>
      <div className="progress my-2" style={{ width: '100%' }}>
        <div
          className="progress-bar bg-success"
          role="progressbar"
          style={{ width: `${value}%` }}
        >
          {value}%
        </div>
      </div>
    </div>


  );
};

export default StatBar;
