import * as actionTypes from '../actions/actionsTypes';
import {updateObject} from '../utility';

const initialState = {
    isAuth: false,
    email: '',
    pass: '',
    registrationMessage: '',
    loginMessage: '',

    token: '',
    authLoading: false,
    userId: '',
    error: '',

    autoLogoutAfter: 0 //po ilu milisekundach bedzie wylogowanie
}

const logIn = (state, action) => {
        console.log(action)
        return updateObject(state,{
            isAuth: action.isAuth,
            token: action.token,
            authLoading: action.authLoading,
            userId:action.userId
        });
}

const logInFailed = (state, action) => {
    return updateObject(state,{
        isAuth: action.isAuth,
        token: action.token,
        authLoading: action.authLoading,
        userId:action.userId
    });
}

const register = (state, action) => {
    const message = action.message;
    const userId = action.userId;
 

    return updateObject(state,{
        isAuth: false,
        registrationMessage: message
    });
}

const registerFailed = (state, action) => {
    const message = action.message;
    const userId = action.userId;
 
    return updateObject(state,{
        isAuth: false,
        registrationMessage: message
    });
}

const autoLogout = (state,action) => {
    const autoLogoutAfter = action.autoLogoutAfter;
    return updateObject(state,{
        autoLogoutAfter: autoLogoutAfter
    });
}


const homeReducer = (state = initialState, action) => {

    switch(action.type){
        case actionTypes.LOG_IN: return logIn(state, action);
        case actionTypes.LOG_IN_FAILED: return logInFailed(state, action);
        case actionTypes.REGISTER: return register(state,action); 
        case actionTypes.REGISTER_FAILED: return registerFailed(state,action);
        case actionTypes.SET_AUTO_LOGOUT: return autoLogout(state,action);         
    }

    return state;
}

export default homeReducer;