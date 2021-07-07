import AuthHandler from "../utils/AuthHandler";
import Config from "../utils/Config";
import axios from "axios";

// Setup config with token  - helper funcions

const language = "es";

export const checkLogin = async () => {
  //Get token from state

  if (!AuthHandler.loggedIn()) {
    // redirect to login
    window.location = Config.baseUrl;
  }

  if (AuthHandler.checkAccessTokenExpiry()) {
    if (AuthHandler.checkRefreshTokenExpiry()) {
      AuthHandler.logoutUser()
      window.location = Config.baseUrl;
    }
    try{
        var res = await  axios.post(Config.refreshApiUrl, { refresh: AuthHandler.getRefreshToken() })
        localStorage.setItem("access", res.data.access);

    }catch(error){
        console.log(error);
        if (error.response) {
          // Request made and server responded
          AuthHandler.logoutUser();
          window.location = Config.baseUrl;

        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
    }
  
  }
};

export const getAuthHeader = async () => {
 await checkLogin();
  // Headers
  const token = AuthHandler.getAccessToken();
  const config = {
    headers: {
    //   "Content-Type": "application/json",
      "Accept-Language": language,
      Authorization: `Bearer ${token}`,
    },
  };
  return config;
};

export const getHeader = () => {
  const config = {
    headers: {
      "Accept-Language": language,
    },
  };
  return config;
};
