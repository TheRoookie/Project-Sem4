import React from 'react';
import './Summary.css'; // You can add specific styles here

const Summary = () => {
  const items = [
    { icon: '🎮', name: 'Games', value: '0.00 INR' },
    { icon: '📋', name: 'Surveys', value: '0.00 INR' },
    { icon: '📹', name: 'Videos', value: '0.00 INR' },
    { icon: '🛒', name: 'Shopping', value: '0.00 INR' },
    { icon: '📝', name: 'Microtasks', value: '0.00 INR' },
    { icon: '🧾', name: 'Receipts', value: '0.00 INR' },
    { icon: '👥', name: 'Referral program', value: '0.00 INR' },
    { icon: '🏆', name: 'Achievements', value: '0.00 INR' },
  ];

  return (
    <div className="summary">
      <h3>0.00 INR</h3>
      <p>Timeline chart</p>
      <div className="summary-items">
        {items.map((item, index) => (
          <div key={index} className="summary-item">
            <span className="icon">{item.icon}</span>
            <span className="name">{item.name}</span>
            <span className="value">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Summary;
