import React, { useState } from 'react'
import './Reg.css'
import user from '../../assets/images/user.png'
import email from '../../assets/images/email.png'
import password from '../../assets/images/padlock.png'
import { useNavigate } from 'react-router-dom'
// import { form,input,Button } from 'antd' 
function Registration ()  {
 
  const navigate = useNavigate();
  const handleevent = () => 
    {
    navigate('/AfterLogin');
    }

  const [action,setAction]=useState("Login")
  return (
    <div className='Reg-main'>
    <form method='POST' action='' role='form' noValidate="novalidate" className='bv-form'>
    {/* {% csrf_token %}   */}
     <div className='containerr'> 
      <div className='header'>
        <div className='Reg-text'>
          <p>{action}</p>
        </div>
        <div className='underline'></div>
        </div>
        <div className='Reg-inputs'>
          {action==="Login"?<div></div>:  <div className='Reg-input'>
            <img src={user} alt='img1'></img>
            <input type='text' placeholder='Enter Name'></input>
          </div>}
           <div className='Reg-input'>
            <img src={email}alt='img2'></img>
            <input type='Email' placeholder='Email'></input>
          </div>
          <div className='Reg-input'>
            <img src={password} alt='img3'></img>
            <input type='password' placeholder='Password'></input>
          </div>
        </div>
        
        <div className='submit-container'>
          <div className={action==='Login'?"Reg-submit gray":"Reg-submit"} onClick={()=>{
            setAction("Sign up")
          }}>
            Sign Up
          </div>
          <div className={action==="Sign up"?"Reg-submit gray":"Reg-submit"} onDoubleClick={handleevent} onClick={()=>{setAction("Login")}}>
            Login
          </div>
        </div>
      
     </div></form>
    </div>
  )
}

export default Registration

// import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';

// function LoginPage() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const history = useHistory();

//   const handleLogin = async (e) => {
//     e.preventDefault();
    
//     // Perform login logic here (e.g., authenticate with an API)
//     const success = await authenticateUser(username, password);

//     if (success) {
//       // Navigate to the home page
//       history.push('/home');
//     } else {          
//       // Handle login failure (show error message, etc.)
//       alert('Login failed');
//     }
//   };

//   return (
//     <form onSubmit={handleLogin}>
//       <label>
//         Username:
//         <input
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//       </label>
//       <label>
//         Password:
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </label>
//       <button type="submit">Log In</button>
//     </form>
//   );
// }

// async function authenticateUser(username, password) {
//   // Replace with your actual authentication logic
//   return username === 'user' && password === 'password';
// }

// export default LoginPage;
