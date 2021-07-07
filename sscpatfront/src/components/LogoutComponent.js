
import React from 'react';
// import { Redirect } from 'react-router-dom';
import AuthHandler from '../utils/AuthHandler';
import Config from '../utils/Config';



class LogoutComponent extends React.Component{
    render(){
        AuthHandler.logoutUser();
        return window.location = Config.baseUrl;
    }
}

export default LogoutComponent;