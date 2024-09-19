import React from 'react'
// import Main from './Component/Main.js'
import Navbar from './Component/Navbar' 
// import {BrowserRouter as Router,Route,Routes,Link} from "react-router-dom";
// import Home from './Component/nav_components/Home';
// import How_it_works from './Component/nav_components/How_it_works'
// import Nopage from './Component/nav_components/Nopage';
// import Registration  from "./Component/nav_components/Registration";
// import AfterLogin from './Component/AfterLogin'
// import Dashboard from './Component/nav_components/Dashboard'
function App() {
  return (
    <>
    {/* <Main/> */}
    <Navbar/>
    {/* <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="How_it_Works" element={<How_it_works />} />
      <Route path="/Registration" element={<Registration />} />
      <Route path="/AfterLogin" element={<AfterLogin/>}></Route>
      <Route path="/Dashboard" element={<Dashboard/>}></Route>
      <Route path="*" element={<Nopage />} />
    </Routes>
    </Router> */}
    </>
  )
}
export default App;


