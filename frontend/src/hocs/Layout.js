import React,{useEffect} from "react";
import Navbar from '../components/Navbar'
import {connect} from 'react-redux'
import { checkAuthenticated,load_user } from "../actions/auth";
import { pink } from "@mui/material/colors";

const Layout=(props)=>{
    useEffect(()=>{
        props.checkAuthenticated();
        props.load_user();
    },[])
    return(
    <div style={{height:"100vh",display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
        <Navbar/>
       {props.children}
    </div>
    )
}
export default connect(null,{checkAuthenticated,load_user})(Layout)