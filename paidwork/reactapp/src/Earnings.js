import React from 'react';
import './Earnings.css'; // Add specific styles here

const Earnings = () => {
  return (
    <div className="earnings">
      <h4>Your Earnings</h4>
      <div className="progress-bar">
        <div className="progress" style={{ width: '0%' }}></div>
      </div>
      <p>You’ve reached 0% of payment threshold</p>
      <p>Payment threshold: <strong>60 INR</strong></p>
    </div>
  );
};

export default Earnings;
