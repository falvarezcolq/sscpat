import {
    USER_LOADED,
    USER_LOADING,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,

    LOGIN_PROGRESS,
} from '../../actions/types';

import AuthHandler from '../../utils/AuthHandler';


const getAuth = () =>{
    const initialState = {
        access:null,
        refresh:null,
        isAuthenticated:false,
        isLoading:false,
        user:null,
        fullName:null,
        type:null
    } 
    
    if (AuthHandler.loggedIn()){
        initialState.access = AuthHandler.getAccessToken();
        initialState.refresh = AuthHandler.getRefreshToken();   
        initialState.isAuthenticated = true;
        initialState.fullName = AuthHandler.getFullName();
        initialState.type = AuthHandler.getType();
    }
    return initialState;
}


const initialState =  getAuth();


export default function auth(state=initialState,action){
    switch(action.type){
        case USER_LOADING:
        case LOGIN_PROGRESS:
            return{
                ...state,
                isLoading:true,
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated:true,
                isLoading:false,
                user:action.payload
            };
        case LOGIN_SUCCESS:
            localStorage.setItem('access',action.payload.access)
            localStorage.setItem('refresh',action.payload.refresh)
            return {
                ...getAuth(),
                ...action.payload,
                // isAuthenticated:true,
                // isLoading:false,
            }
        
        // case AUTH_ERROR:
        case LOGOUT_SUCCESS:
        case LOGIN_FAIL:
            AuthHandler.logoutUser()
            return {
                access:null,
                refresh:null,
                isAuthenticated:false,
                isLoading:false,
                user:null,
                fullName:null,
                type:null
            }
        default:
            return state;
    }
}
