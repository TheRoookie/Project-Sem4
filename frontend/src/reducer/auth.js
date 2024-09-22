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
} from '../actions/types';

const initialState = {
   access: localStorage.getItem('access'),
   refresh: localStorage.getItem('refresh'),
   isAuthenticated: null,
   user: null
};

export default function(state = initialState,action) {
   const { type, payload } = action;

   switch (type) {
       case LOGIN_SUCCESS:
           localStorage.setItem('access', payload.access);  // Added value argument
           localStorage.setItem('refresh', payload.refresh);  // Store refresh token as well
           return {
               ...state,
               isAuthenticated: true,
               access: payload.access,
               refresh: payload.refresh
           };
        case SIGNUP_SUCCESS:
            return{
                ...state,
                isAuthenticated:false
            }

       case AUTHENTICATED_SUCCESS:
        return {
            ...state,
            isAuthenticated:true
        }
        case AUTHENTICATED_FAIL:
        return {
            ...state,
            isAuthenticated:false
        }     
       case USER_LOADED_SUCCESS:
           return {
               ...state,
               user: payload
           };
       case USER_LOADED_FAIL:
           return {
               ...state,
               user: null
           };
       
           case LOGIN_FAIL:
           case SIGNUP_FAIL:
           case LOGOUT:
                localStorage.removeItem('access');
                localStorage.removeItem('refresh');
                return {
                    ...state,
                    access: null,
                    refresh: null,
                    isAuthenticated: false,
                    user: null
                }
        
        case PASSWORD_RESET_CONFIRM_FAIL:
        case PASSWORD_RESET_CONFIRM_SUCCESS:
        case PASSWORD_RESET_FAIL:
        case PASSWORD_RESET_SUCCESS:
        case ACTIVATION_SUCCESS:
        case ACTIVATION_FAIL:
            return{
                ...state
            }
         
         
       default:
           return state;  // Added default case to return current state
   }
}
