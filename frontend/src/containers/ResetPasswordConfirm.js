import React,{useState} from "react";
import { Navigate,useParams } from "react-router-dom";
import {connect} from 'react-redux'
import { reset_password_confirm } from "../actions/auth";

const ResetPasswordConfirm=({match,reset_password_confirm})=>{
    const { uid, token } = useParams();
    const [requestSent,setRequestSent]=useState(false)

    const [formdata,setformdata]=useState({
        new_password:'',
        re_new_password:''
    })
    const {new_password,re_new_password}=formdata
    const onchange= e =>setformdata({...formdata,[e.target.name]:e.target.value})
    const onsubmit= e => {
        e.preventDefault();

        

        reset_password_confirm(uid,token,new_password,re_new_password)
        setRequestSent(true)
        console.log(requestSent);
        
    }
    if(requestSent){
        return <Navigate to='/' />
    }
    return(
        <div className="container mt-5">
            <p>sign into your Account</p>
            <form onSubmit={e=>onsubmit(e)}>
                
                <div className="form-group">
            
                    <input type="password" placeholder="new Passowrd" name="new_password" value={new_password} minLength='6' required onChange={e=> onchange(e)} className="form-control" />
                </div>
                <div className="form-group">
            
                    <input type="password" placeholder=" confirm new Passowrd" name="re_new_password" value={re_new_password} minLength='6' required onChange={e=> onchange(e)} className="form-control" />
                </div>

                <button className="btn btn-primary" type="submit">Reset passwrd</button>
            </form>
            
        </div>
    )

} 
export default connect(null,{reset_password_confirm})(ResetPasswordConfirm)