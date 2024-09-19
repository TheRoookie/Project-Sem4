import React from "react";
import './Dashboard.css'; // For custom styles

const Dashboard = () => {
  return (
    
    <div className="container-fluid dashCont">
      <div className="row">
        <div className="card-wrapper">
          <div className="card p-3">
            <div className="card-header">
              Your earnings
            </div>
            <div className="card-body">
              <p className="mb-1">Earned money: <strong>0.00 INR</strong></p>
              <p className="text-muted small mb-2">You've reached 0% of payment threshold (₹60)</p>
              <div className="progress mb-3">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: "0%" }}
                  aria-valuenow="0"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <button className="btn-secondary">Withdraw</button>
            </div>
          </div>
        </div>

        <div className="card-wrapper">
          <div className="card p-3">
            <div className="card-header">
              Payment methods
            </div>
            <div className="card-body text-center">
              <button className="btn-light btn-lg rounded-circle mb-2">
                <i className="fas fa-plus"></i>
              </button>
              <p>Add payment method</p>
            </div>
          </div>
        </div>

        <div className="card-wrapper">
          <div className="card p-3">
            <div className="card-header">
              Transactions
            </div>
            <div className="card-body">
              <p>You have not made any transactions yet.</p>
            </div>
          </div>
        </div>

        <div className="card-wrapper">
          <div className="card p-3">
            <div className="card-header">
              General information
            </div>
            <div className="card-body">
              <p>You didn't add any personal information to transfers. Add them to get the correct billing.</p>
              <button className="btn-custom">
                <i className="fas fa-pen"></i> Make changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
