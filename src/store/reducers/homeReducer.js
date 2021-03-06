import * as actionTypes from '../actions/actionsTypes';
import {updateObject} from '../utility';
//import {createNotification} from '../../index';

const initialState = {
    isAuth: false,
    email: '',
    pass: '',
    userName: '',
    registrationMessage: '',
    loginMessage: '',

    forgotPassMessage: '',
    resRegistrationStatus: 0,
    resLoginStatus: 0,
    resForgotPassStatus: 0,
    forgotPassEmailSent: false,

    isLoading: false, //do pokazywania prelowadera

    language: 'pl',

    token: '',
    authLoading: false,
    userId: '',
    error: '',

    autoLogoutAfter: 0 //po ilu milisekundach bedzie wylogowanie
}

const forgotPassFailed = (state, action) => {
   let message = action.message;
   let resForgotPassStatus = action.resForgotPassStatus;

   
   //createNotification('error',"Serwer error");
  
   return updateObject(state,{
        forgotPassMessage: message,
        resForgotPassStatus: resForgotPassStatus,
        forgotPassEmailSent: false,
    });

}

const forgotPass = (state, action) => {
   let message = action.message;
   let resForgotPassStatus = action.resForgotPassStatus;

   //if(resForgotPassStatus==200){
   //     createNotification('success',"Instrukcje do zresetowania hasła zostały wysłane na podany email");
   // } else {
   //     createNotification('warning',"Nie znaleziono użytkownika o podanym adresie email");
   // }

   return updateObject(state,{
        forgotPassMessage: message,
        resForgotPassStatus: resForgotPassStatus,
        forgotPassEmailSent: true,
    });
}


const logIn = (state, action) => {

        return updateObject(state,{
            isAuth: action.isAuth,
            userName: action.userName,
            email: action.email,
            token: action.token,
            authLoading: action.authLoading,
            userId:action.userId,
            resLoginStatus: action.resLoginStatus,
        });
}

const logInFailed = (state, action) => {

    return updateObject(state,{
        isAuth: action.isAuth,
        token: action.token,
        authLoading: action.authLoading,
        userId:action.userId,
        loginMessage: action.message,
        resLoginStatus: action.resLoginStatus,
    });
}

const register = (state, action) => {
    const message = action.message;
    //const userId = action.userId;
    const resRegistrationStatus = action.resRegistrationStatus;

    return updateObject(state,{
        isAuth: false,
        registrationMessage: message,
        resRegistrationStatus: resRegistrationStatus,
    });
}

const registerFailed = (state, action) => {
    const message = action.message;
 
    return updateObject(state,{
        isAuth: false,
        registrationMessage: message,
        resRegistrationStatus: action.resRegistrationStatus,
    });
}

const autoLogout = (state,action) => {
    const autoLogoutAfter = action.autoLogoutAfter;
    return updateObject(state,{
        autoLogoutAfter: autoLogoutAfter,
    });
}

const logOut = (state,action) => {

    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    
    return updateObject(state,{
        isAuth: false,
        token:'',
        userId:'', 
        email: '',
        pass: '',
        userName: '',
        registrationMessage: '',
        loginMessage: '',
        resRegistrationStatus: 0,
        resLoginStatus: 0,
        authLoading: false,
        error: '',
        autoLogoutAfter: 0 //po ilu milisekundach bedzie wylogowanie


    });
}

const startLoading = (state,action) => {
    return updateObject(state,{
        isLoading: true,
    })
}

const stopLoading = (state,action) => {
    return updateObject(state,{
        isLoading: false,
    })
}

const changeLanguage = (state, action) => {
    const lang = action.language
    return updateObject(state,{
        language: lang,
    })
}


const homeReducer = (state = initialState, action) => {

    switch(action.type){
        case actionTypes.CHANGE_LANGUAGE: return changeLanguage(state,action);
        case actionTypes.LOG_IN: return logIn(state, action);
        case actionTypes.LOG_OUT: return logOut(state, action);
        case actionTypes.LOG_IN_FAILED: return logInFailed(state, action);
        case actionTypes.REGISTER: return register(state,action); 
        case actionTypes.REGISTER_FAILED: return registerFailed(state,action);
        case actionTypes.SET_AUTO_LOGOUT: return autoLogout(state,action); 
        case actionTypes.FORGOT_PASS_FAILED: return forgotPassFailed(state,action);
        case actionTypes.FORGOT_PASS: return forgotPass(state,action);
        case actionTypes.START_LOADING: return startLoading(state,action);
        case actionTypes.STOP_LOADING: return stopLoading(state,action);
        default: return state;
    }
}

export default homeReducer;