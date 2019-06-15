import * as actionTypes from '../actions/actionsTypes';
import {updateObject} from '../utility';

const initialState = {
    isAuth: false,
    email: '',
    pass: '',
}

const logIn = (state, action) => {
    //tymczasowo
    if(action.login=='admin' && action.pass =='admin'){
        return updateObject(state,{
            isAuth: true,
            email: action.login,
            pass: action.pass});
    
    } else {
        return updateObject(state,{isAuth: false});
    }
}

const register = (state, action) => {
    return updateObject(state,{isAuth: false});
}


const homeReducer = (state = initialState, action) => {

    switch(action.type){
        case actionTypes.LOG_IN: return logIn(state, action);
        case actionTypes.REGISTER: return register(state,action);           
    }

    return state;
}

export default homeReducer;