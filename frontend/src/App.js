// import React from 'react'
// // import Main from './Component/Main.js'
// import Navbar from './Component/Navbar' 
// // import {BrowserRouter as Router,Route,Routes,Link} from "react-router-dom";
// // import Home from './Component/nav_components/Home';
// // import How_it_works from './Component/nav_components/How_it_works'
// // import Nopage from './Component/nav_components/Nopage';
// // import Registration  from "./Component/nav_components/Registration";
// // import AfterLogin from './Component/AfterLogin'
// // import Dashboard from './Component/nav_components/Dashboard'
// function App() {
//   return (
//     <>
//     {/* <Main/> */}
//     <Navbar/>
//     {/* <Router>
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="How_it_Works" element={<How_it_works />} />
//       <Route path="/Registration" element={<Registration />} />
//       <Route path="/AfterLogin" element={<AfterLogin/>}></Route>
//       <Route path="/Dashboard" element={<Dashboard/>}></Route>
//       <Route path="*" element={<Nopage />} />
//     </Routes>
//     </Router> */}
//     </>
//   )
// }
// export default App;



import React from "react";


import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Login from './containers/Login'
import Activate from './containers/Activate'
import Signup from './containers/Signup'
import ResetPassword from './containers/ResetPassword'
import ResetPasswordConfirm from './containers/ResetPasswordConfirm'
import Layout from "./hocs/Layout";
import { Provider } from "react-redux";
import store from './store'
import Home from "./components/Home";
import Dashboard from "./Component/nav_components/Dashboard";
import SurveyApp from "./components/Survey";
import Projects from "./containers/Project";
const App=()=>(
    <Provider store={store}>
    <Router>
       <Layout>
       <Routes>
       
            <Route path="/" element={<Home />} />
            <Route path="/Dashboard" element={<Dashboard/>}></Route>
            <Route path="/projects" element={<Projects/>}></Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/reset_password" element={<ResetPassword />} />
            <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />} />
            <Route path="/activate/:uid/:token" element={<Activate />} />
        </Routes>

        </Layout>
       
    </Router>
    </Provider>
)

export default App