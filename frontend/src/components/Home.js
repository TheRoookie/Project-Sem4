// import React,{useState,useEffect} from 'react'
// import axios from 'axios';
// import  "./home.css"
// import video from  '../nav_components/images/video1.mp4'
// import image from '../nav_components/images/google.jpg'
// import img2 from '../nav_components/images/apple.jpg'
// import {BrowserRouter as Router,Route,Routes,Link} from "react-router-dom";
// import Registration from './Registration'

// function Home (){
//   const [data,setData]=useState([])
  
//   useEffect(()=>{
//     async function name() {
//       try {
//         const detail=await axios.get("http://127.0.0.1:8000/admin/app/userinfo/")
//         console.log(detail.data)
//         setData(detail.data)
//       } catch (error) { 
//         console.log(error)
//       }
//     }
//     name()
//   },[])
//   const userName = data.length > 0 ? data[0].name:'Loading...';
  
//   return (     
//     <div className='Mainn'>
//       {/* First div on home page */}
//       {/* -------------------------------------------------------------------------------------------------------------------------- */}
//                                                   {/* container1-> container1 */}
//       {/* -------------------------------------------------------------------------------------------------------------------------- */}
//     <div className='container1'>
//     <div className='container'>

//         <div className='text1'>
//           <h1 className='div1_h1'>Make Money Online</h1>
//           <p className='div1_p'>On the phone, computer or tablet, get paid wherever you are, without investment.</p>

//           <div className='buttons'><a href='https://play.google.com/store/games?device=windows'><button className='b1'><img src={image}></img>
//           </button></a>
//           <a href='https://www.apple.com/in/app-store/'><button className='b2'><img src={img2}></img></button></a>
//           </div>  
//         </div>    

//         <div className='vid1'>
//           <video src={video} loop autoPlay muted></video>

//         </div> 
//     </div></div>
// {/* -------------------------------------------------------------------------------------------------------------------------- */}
//                                                   {/* SIMPLE TEXT-> container2 */}
// {/* -------------------------------------------------------------------------------------------------------------------------- */}
//     <div className='container2'>
//       <h1>Turn your time into profit</h1>
//     </div>
// {/* -------------------------------------------------------------------------------------------------------------------------- */}
//                                                   {/* container3-- container3-2,container3*/}
// {/* -------------------------------------------------------------------------------------------------------------------------- */}  
//      <div className="container3">  
//   <div className="content">
//     <div className="image-container">
//       <div className="circle"></div> {/* Circle behind the image */}
//       <img src="https://zrcdn.net/static/img/index/the-flexible-solution-paidwork.webp?v=665" alt="money" />
//     </div>
//     <div className="text-content">
//       <h2>The Flexible Solution</h2>
//       <h5>Benefits</h5>
//       <p>
//         Paidwork is a full-time or additional job for all people, from every country. You can earn money on any device with
//         access to the internet, wherever you are. You will get paid for your time spent and engagement on the platform.
//       </p>
//     </div>
//   </div>
//  </div>{/* ---------------------*/}
// <div className="container3-2">
//   <div className="content3-2">
//     <div className="image-container3-2">
//       <div className="circle"></div> {/* Circle behind the image */}
//       <img src="https://zrcdn.net/static/img/index/everything-under-control-paidwork.webp?v=665" alt="money" />
//     </div>
//     <div className="text-content3-2">
//       <h2>Everything under control</h2>
//       <h5>How it works</h5>
//       <p>
//       You can choose how you want to earn money - by playing games, completing surveys, watching videos, shopping online and creating accounts.
//       </p>
//     </div>
//   </div>
// </div>
// <div className="container3">
//   <div className="content">
//     <div className="image-container">
//       <div className="circle"></div> {/* Circle behind the image */}
//       <img src="https://zrcdn.net/static/img/index/collect-profits-paidwork.webp?v=665" alt="money" />
//     </div>
//     <div className="text-content">
//       <h2>Collect profits</h2>
//       <h5>Resources</h5>
//       <p>
//        By completing simple tasks, in just a month you can earn up to $700 without any additional taxes or charges.
//        However, there is no limit of your earnings – you decide how much you earn.
//       </p>
//     </div>
//   </div>
// </div>
// {/* -------------------------------------------------------------------------------------------------------------------------- */}
//                                                     {/* Simple Text -> text2 */}
// {/* -------------------------------------------------------------------------------------------------------------------------- */}
//   <div className='text2'>
//     <h1>How can MEP help you?</h1>
//     <p>See how having an additional income can make your life easier</p>    
//   </div>
//   {/* -------------------------------------------------------------------------------------------------------------------------- */}
//                                                     {/* container4--> cont4-1,cont4-2 */}
// {/* -------------------------------------------------------------------------------------------------------------------------- */}
//   <div className='container4'>  
//     <div className='cont4-1'>
//     <img src='https://zrcdn.net/static/img/index/increase-your-earnings-paidwork.webp?v=665'></img>
//     <div className='cont4-text1'>
//     <h3>Increase your earnings</h3>
//     <p>Wherever you are, on the bus, at work, at school, at the hairdresser's or even in the bathroom - 
//        you can always earn money on Paidwork. Do not waste precious time. All you need is a mobile device and access to the internet.</p></div></div>
//     <div className='cont4-2'>
//     <img src='https://zrcdn.net/static/img/index/set-goals-paidwork.webp?v=665'></img>
//      <div className='cont4-text2'>
//     <h3>Set goals</h3>
//     <p>Focus on what you are good at and what works best for you. There are 6 ways to earn money on Paidwork and each of them is 
//         distinguished by a feature that might suit you best. Engagement and your time are key to high earnings.</p></div>
//     </div>
//       </div>
//       <div className='Register'>
//        <center> <h3>Start making money today</h3></center>
//        <Link to="/Registration">
//           <button>Register on MSE</button>
//         </Link>
      
//       </div>
//       <center><h1>Welcome</h1><h2 style={{color:'#012c6c',fontWeight:'bolder'}}>{userName}</h2></center>
//   </div>
//   ) 
// }

// export default Home

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/home.css';
import video from '../assets/images/video1.mp4';
import image from '../assets/images/google.jpg';
import img2 from '../assets/images/apple.jpg';
import { Link } from 'react-router-dom';
import Registration from '../Component/nav_components/Registration';

function Home() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    async function fetchData() {
      try {
        // Ensure the endpoint here is an API endpoint, not an admin URL
        const response = await axios.get('http://127.0.0.1:8000/app/UserInfo/');
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  const userName = data.length > 0? data[0].name : 'Loading...';

  return (
    <div className='Mainn'>
      {/* First div on home page */}
      <div className='container1'>
        <div className='container'>
          <div className='text1'>
            <h1 className='div1_h1'>Make Money Online</h1>
            <p className='div1_p'>On the phone, computer, or tablet, get paid wherever you are, without investment.</p>

            <div className='buttons'>
              <Link to='/projects' target='_blank' rel='noopener noreferrer'>
                <button className='b1'>Get ready to Earn
                </button>
              </Link>
             
            </div>
          </div>

          <div className='vid1'>
            <video src={video} loop autoPlay muted></video>
          </div>
        </div>
      </div>

      {/* Simple Text -> container2 */}
      <div className='container2'>
        <h1>Turn your time into profit</h1>
      </div>

      {/* container3-- container3-2,container3 */}
      <div className="container3">
        <div className="content">
          <div className="image-container">
            <div className="circle"></div>
            <img src="https://zrcdn.net/static/img/index/the-flexible-solution-paidwork.webp?v=665" alt="money" />
          </div>
          <div className="text-content">
            <h2>The Flexible Solution</h2>
            <h5>Benefits</h5>
            <p>Paidwork is a full-time or additional job for all people, from every country. You can earn money on any device with access to the internet, wherever you are. You will get paid for your time spent and engagement on the platform.</p>
          </div>
        </div>
      </div>

      <div className="container3-2">
        <div className="content3-2">
          <div className="image-container3-2">
            <div className="circle"></div>
            <img src="https://zrcdn.net/static/img/index/everything-under-control-paidwork.webp?v=665" alt="money" />
          </div>
          <div className="text-content3-2">
            <h2>Everything under control</h2>
            <h5>How it works</h5>
            <p>You can choose how you want to earn money - by playing games, completing surveys, watching videos, shopping online, and creating accounts.</p>
          </div>
        </div>
      </div>

      <div className="container3">
        <div className="content">
          <div className="image-container">
            <div className="circle"></div>
            <img src="https://zrcdn.net/static/img/index/collect-profits-paidwork.webp?v=665" alt="money" />
          </div>
          <div className="text-content">
            <h2>Collect profits</h2>
            <h5>Resources</h5>
            <p>By completing simple tasks, in just a month you can earn up to $700 without any additional taxes or charges. However, there is no limit to your earnings – you decide how much you earn.</p>
          </div>
        </div>
      </div>

      {/* Simple Text -> text2 */}
      <div className='text2'>
        <h1>How can MEP help you?</h1>
        <p>See how having an additional income can make your life easier</p>
      </div>

      {/* container4--> cont4-1,cont4-2 */}
      <div className='container4'>
        <div className='cont4-1'>
          <img src='https://zrcdn.net/static/img/index/increase-your-earnings-paidwork.webp?v=665' alt='Increase your earnings' />
          <div className='cont4-text1'>
            <h3>Increase your earnings</h3>
            <p>Wherever you are, on the bus, at work, at school, at the hairdresser's, or even in the bathroom - you can always earn money on Paidwork. Do not waste precious time. All you need is a mobile device and access to the internet.</p>
          </div>
        </div>
        <div className='cont4-2'>
          <img src='https://zrcdn.net/static/img/index/set-goals-paidwork.webp?v=665' alt='Set goals' />
          <div className='cont4-text2'>
            <h3>Set goals</h3>
            <p>Focus on what you are good at and what works best for you. There are 6 ways to earn money on Paidwork, each distinguished by a feature that might suit you best. Engagement and your time are key to high earnings.</p>
          </div>
        </div>
      </div>

      <div className='Register'>
        <center>
          <h3>Start making money today</h3>
        </center>
        <Link to="/Registration">
          <button>Register on MSE</button>
        </Link>
      </div>

      <center>
        <h1>Welcome</h1>
        <h2 style={{ color: '#012c6c', fontWeight: 'bolder' }}>{userName}</h2>
      </center>
    </div>
  );
}

export default Home;
