import React,{useState} from "react";
import { Navigate } from "react-router-dom";
import {connect} from 'react-redux'
import { reset_password } from "../actions/auth";

const ResetPassword=({reset_password})=>{

    const [requestSent,setRequestSent]=useState(false)

    const [formdata,setformdata]=useState({
        email:'',
    })
    const {email}=formdata
    const onchange= e =>setformdata({...formdata,[e.target.name]:e.target.value})
    const onsubmit= e => {
        e.preventDefault();

        reset_password(email)
        setRequestSent(true)
    }
    if(requestSent){
        return <Navigate to='/'/>
    }
    return(
        <div className="container mt-5">
            <h1>request password  reset</h1>
            <p>sign into your Account</p>
            <form onSubmit={e=>onsubmit(e)}>
                <div className="form-group">
                    <input type="email" placeholder="Email" name="email" value={email} required onChange={e=> onchange(e)} className="form-control" />
                </div>

                <button className="btn btn-primary" type="submit">Reset passwrd</button>
            </form>
            
        </div>
    )

} 
export default connect(null,{reset_password})(ResetPassword)