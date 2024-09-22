
import React from 'react'
import './AfterLogin.css'
import { useNavigate,Link } from 'react-router-dom'

// import { FaHome, FaDollarSign, FaMoneyBillWave, FaChartLine, FaTrophy, FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa';

function AfterLogin() {
  const navigate = useNavigate();
  const Dashboard = () => 
    {
    navigate('/Dashboard');
    }
  return (
    <><div>
     <div className="navbar-container">
    <div className="navbar-left">
  <div className="navbar-title"><strong>Paidwork</strong></div>
  <div className='navbar-name'>Devanshi Soni</div>
  </div>
  <div className="navbar-right">
    {/* <div className="navbar-item"><FaBell/></div> */}
    <div className="navbar-item">User Profile</div>
  </div>
</div>
<div className="sidebar-container">
      <div className="sidebar-item"><Link to={'/Dashboard'}>Dashboard</Link></div>
      <div className="sidebar-item">Earn</div>
      <div className="sidebar-item">Billings</div>
      <div className="sidebar-item">Analytics</div>
      <div className="sidebar-item">Achievements</div>
      <div className="sidebar-item">Help</div>
      <div className="sidebar-item">Logout</div>
    </div></div>
</>
  ) 
}

export default AfterLogin
{/* <FaHome/><FaDollarSign/><FaMoneyBillWave/><FaChartLine/><FaTrophy/><FaQuestionCircle/><FaSignOutAlt/> */}
