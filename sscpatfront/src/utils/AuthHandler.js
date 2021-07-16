import { ADMIN, TUTOR,EXTERNAL_TUTOR,STUDENT} from "../actions/types";


var ACCCESS ="access";
var REFRESH ="refresh";

class AuthHandler {
 
    static loggedIn (){
        return ( localStorage.getItem(ACCCESS) && localStorage.getItem(REFRESH))
    }

    static getAccessToken = () => localStorage.getItem(ACCCESS);
    static getRefreshToken = () => localStorage.getItem(REFRESH);

    static logoutUser = ()=>{
        localStorage.removeItem(ACCCESS)
        localStorage.removeItem(REFRESH)
    }

    static checkAccessTokenExpiry(){
        var expire = false;
        var token = this.getAccessToken();
        var tokenArray = token.split(".")
        var jwt = JSON.parse(atob(tokenArray[1]))
        if(jwt && jwt.exp && Number.isFinite(jwt.exp)){
            expire = jwt.exp * 1000
        }else{
            expire = false
        }
        if (!expire){
            return false
        }
        return Date.now() > expire;
    }

    static checkRefreshTokenExpiry(){
        var expire = false;
        var token = this.getRefreshToken();
        var tokenArray = token.split(".")
        var jwt = JSON.parse(atob(tokenArray[1]))
        if(jwt && jwt.exp && Number.isFinite(jwt.exp)){
            expire = jwt.exp * 1000
        }else{
            expire = false
        }

        if (!expire){
            return false
        }

        return Date.now() > expire;
    }

    static getFullName(){
        var token = this.getAccessToken();
        var tokenArray = token.split(".");
        var jwt = JSON.parse(atob(tokenArray[1]))
        return jwt.full_name;
    } 

    static getUserId(){
        var token = this.getAccessToken();
        var tokenArray = token.split(".");
        var jwt = JSON.parse(atob(tokenArray[1]))
       
        return jwt.user_id;
    } 

    static getType(){
        var token = this.getAccessToken();
        var tokenArray = token.split(".");
        var jwt = JSON.parse(atob(tokenArray[1]))
        return jwt.type;
    } 

    static  isAdmin(){
        return this.getType() === ADMIN;
    }

    static isTutor(){
        var type = this.getType();
        return type === TUTOR  ||  type === EXTERNAL_TUTOR;
    }
    static isInternalTutor(){
        var type = this.getType();
        return type === TUTOR ;
    }
    static isExternalTutor(){
        var type = this.getType();
        return  type === EXTERNAL_TUTOR;
    }

    static isStudent(){
        var type = this.getType();
        return type === STUDENT;
    }

}

export default AuthHandler;