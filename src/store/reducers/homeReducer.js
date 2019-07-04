import * as actionTypes from '../actions/actionsTypes';
import {updateObject} from '../utility';

const initialState = {
    isAuth: false,
    email: '',
    pass: '',
    userName: '',
    registrationMessage: '',
    loginMessage: '',
    resRegistrationStatus: 0,
    resLoginStatus: 0,
    

    token: '',
    authLoading: false,
    userId: '',
    error: '',

    autoLogoutAfter: 0 //po ilu milisekundach bedzie wylogowanie
}

const logIn = (state, action) => {
       // console.log(action)
        return updateObject(state,{
            isAuth: action.isAuth,
            userName: action.userName,
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
    const userId = action.userId;
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
        token: '',
        authLoading: false,
        error: '',
        autoLogoutAfter: 0 //po ilu milisekundach bedzie wylogowanie
    });
}


const homeReducer = (state = initialState, action) => {

    switch(action.type){
        case actionTypes.LOG_IN: return logIn(state, action);
        case actionTypes.LOG_OUT: return logOut(state, action);
        case actionTypes.LOG_IN_FAILED: return logInFailed(state, action);
        case actionTypes.REGISTER: return register(state,action); 
        case actionTypes.REGISTER_FAILED: return registerFailed(state,action);
        case actionTypes.SET_AUTO_LOGOUT: return autoLogout(state,action);         
    }

    return state;
}

export default homeReducer;