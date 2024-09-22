import React from 'react';
import Graph from './Graph';
import Summary from './Summary';
import Earnings from './Earnings';
import './Main.css';

const Main = () => {
  return (
    <div className="dashboard-container">
      <div className="graph-container">
        <Graph />
      </div>
      <div className="bottom-row">
        <div className="summary-container">
          <Summary />
        </div>
        <div className="earnings-container">
          <Earnings />
        </div>
      </div>
    </div>
  );
};

export default Main;
