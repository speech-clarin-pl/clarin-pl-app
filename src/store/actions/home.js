import * as actionTypes from './actionsTypes';
import axios from 'axios';

//######################################################
//##################### rejestracja #######################
//#######################################################

export const registerUserActionFailed = (message) => {
    return {
        type: actionTypes.REGISTER_FAILED,
        message: message,
    }
}

export const registerUserAction = (message, userId) => {
    return {
        type: actionTypes.REGISTER,
        message: message,
        userId: userId,
    }
}
export const registerUser = (userName, userEmail, userPass) => {
    return dispatch => {
        
        axios.put('/auth/registration',{
            name: userName,
            email: userEmail,
            password: userPass,
        })
            .then(response => {
                console.log(response)
                dispatch(registerUserAction(response.message, response.userId));
            })
            .catch(error => {
                console.log(error)
                dispatch(registerUserActionFailed('Niepowodzenie w rejestracji'));
            });
    }

    
}

export const loginUser = (userEmail, userPass) => {
    return {
        type: actionTypes.LOG_IN,
        userEmail: userEmail,
        userPass: userPass
    }
}