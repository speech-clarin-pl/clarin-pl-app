import * as actionTypes from '../actions';

const initialState = {
    isAuth: false,
    email: '',
    pass: '',
}

const homeReducer = (state = initialState, action) => {

    switch(action.type){
        case actionTypes.LOG_IN:

            //tymczasowo
            if(action.login=='admin' && action.pass =='admin'){
                return {
                    ...state,
                    isAuth: true,
                    email: action.login,
                    pass: action.pass
                }
            } else {
                return {
                    ...state,
                    isAuth: false,
                }
            }
           
            
        case actionTypes.REGISTER:
            return {
                ...state,
                isAuth: false
            }
    }

    return state;
}

export default homeReducer;