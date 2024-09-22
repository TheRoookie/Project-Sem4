import axios from 'axios';
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_FAIL,
    AUTHENTICATED_SUCCESS,
    LOGOUT,
    PASSWORD_RESET_CONFIRM_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_SUCCESS,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATION_FAIL,
    ACTIVATION_SUCCESS,

} from './types';






export const checkAuthenticated=()=>async dispatch=>{
    if(localStorage.getItem('access')){
        const config={
            headers:{
                'content-type':'application/json',
                'Authorization':`jwt ${localStorage.getItem('access')}`,
                'Accept':'application/json'
            }
        }
        const body=JSON.stringify({
            token:localStorage.getItem('access')
        })
        try{
            const res=await axios.post(`http://localhost:8000/auth/jwt/verify/`,body,config)
            console.log(res.data.code);
            
            if(res.data.code !=='token_not_valid'){
                dispatch({
                    type:AUTHENTICATED_SUCCESS
                })
            }else{
                dispatch({
                    type:AUTHENTICATED_FAIL
                })
            }
        }
        catch(err){
            dispatch({
                type:AUTHENTICATED_FAIL
            })
        }
    }
    else{
        dispatch({
            type:AUTHENTICATED_FAIL
        })
    }
}

export const load_user=()=> async dispatch=>{
    if(localStorage.getItem('access')){
        const config={
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }
     
        try{

            const token = localStorage.getItem('access');
            console.log('Access Token:', token);
            const res=await axios.get(`http://localhost:8000/auth/users/me/`,config)
            
            
            dispatch({
                type:USER_LOADED_SUCCESS,
                payload:res.data
            })
            
            
        }catch(err){
            dispatch({
                type:USER_LOADED_FAIL,
            })  
        }
    }else{
        dispatch({
            type:USER_LOADED_FAIL
        })
    }
};

export const login=(email,password)=> async dispatch=>{
    const config={
        headers:{
            'content-type':'application/json'
        }
    }
    const body=JSON.stringify({email,password})

    try{

        const res=await axios.post(`http://localhost:8000/auth/jwt/create/`,body,config)

        dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data
        })

        dispatch(load_user());
    }catch(err){
        dispatch({
            type:LOGIN_FAIL,
        })  
    }
};

export const signup=(name,email,password,re_password)=> async dispatch=>{
    const config={
        headers:{
            'content-type':'application/json',
        }
    }

    const body=JSON.stringify({name,email,password,re_password})

    try{
        console.log(name);
        console.log(email);
        console.log(password);
        console.log(re_password);
        
        const res=await axios.post(`http://localhost:8000/auth/users/`,body,config)

        dispatch({
            type:SIGNUP_SUCCESS,
            payload:res.data
        })

    }catch(err){
        dispatch({
            type:SIGNUP_FAIL,
        })  
    }
};

export const verify=(uid,token)=>async dispatch=>{
    const config={
        headers:{
            'content-type':'application/json',
        }
    }

    const body=JSON.stringify({uid,token})

    try{

        await axios.post(`http://localhost:8000/auth/users/activation/`,body,config)

        dispatch({
            type:ACTIVATION_SUCCESS,
        })

    }catch(err){
        dispatch({
            type:ACTIVATION_FAIL,
        })  
    }
}

export const reset_password=(email)=>async dispatch=>{
    const config={
        headers:{
            'content-type':'application/json',
            
        }
    }

    const body=JSON.stringify({email})

    try{
        await axios.post(`http://localhost:8000/auth/users/reset_password/`,body,config)

        dispatch({
            type:PASSWORD_RESET_SUCCESS
        })
    }catch(err){
        dispatch({
            type:PASSWORD_RESET_FAIL
        })
    }
}

export const reset_password_confirm=(uid,token,new_password,re_new_password)=>async dispatch=>{
    const config={
        headers:{
            'content-type':'application/json',
            
        }
    }
    const body=JSON.stringify({uid,token,new_password,re_new_password})
    try{
        
        await axios.post(`http://localhost:8000/auth/users/reset_password_confirm/`,body,config)
        
        dispatch({
            type:PASSWORD_RESET_CONFIRM_SUCCESS
        })
    }catch(err){
        dispatch({
            type:PASSWORD_RESET_CONFIRM_FAIL
        })
    }
}

export const logout = () =>async dispatch => {
    dispatch({
        type: LOGOUT
    });
};


//    const config={
//         headers:{
//             'content-type':'application/json',
            
//         }
//     }
//     const body=JSON.stringify({country,city,state,address,ph})
//     try{
//         console.log('email',email);
        
//         const res=await axios.post(`http://localhost:8000/user/changeprofile`,body,config)
//         console.log(res.data);
        
//         dispatch({
//             type:CHANGEPROFILE,
            
//         })

//     }catch(err){
//         console.log(err);
        
//     }export const changeprofile=(country,city,state,address,ph)=>async dispatch=>{
    
//  
// }
