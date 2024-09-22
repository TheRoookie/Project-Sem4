import React from "react";
import {BrowserRouter as Router,Route,Routes,Link} from "react-router-dom";
import Home from './nav_components/Home';
import How_it_works from './nav_components/How_it_works'
import Nopage from './nav_components/Nopage';
import Registration  from "./nav_components/Registration";
import AfterLogin from './AfterLogin'
import Dashboard from './nav_components/Dashboard'
import './CssFile/nav.css'
function Navbar() {
  return (
    // Covers the whole LandingPage---'main-route'

    <div className="main-route"> 

  <Router> 
    
    <div className="navbar">
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/How_it_works">How It Works</Link></li>
        <button className="Reg"><Link to="/Registration">Register</Link></button>
      </ul>            
    </div>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="How_it_Works" element={<How_it_works />} />
      <Route path="/Registration" element={<Registration />} />
      <Route path="/AfterLogin" element={<AfterLogin/>}></Route>
      <Route path="/Dashboard" element={<Dashboard/>}></Route>
      <Route path="*" element={<Nopage />} />
    </Routes>
   
  </Router>
</div>
  );
  }
  export default Navbar