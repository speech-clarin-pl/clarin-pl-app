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

//######################### logowanie ################
//########################################


export const loginUserAction = (isAuth, token, authLoading, userId,userName) => {
    return {
        type: actionTypes.LOG_IN,
        isAuth: isAuth,
        token: token,
        authLoading: authLoading,
        userId: userId,
        userName: userName,

    }
}

export const loginUserActionFailed = (isAuth, authLoading, error) => {
    return {
        type: actionTypes.LOG_IN_FAILED,
        isAuth: isAuth,
        authLoading: authLoading,
        error: error

    }
}

export const setAutoLogout = (aftermilliseconds) => {
    console.log('setAutoLogout! after:' + aftermilliseconds);
    return {
        type: actionTypes.SET_AUTO_LOGOUT,
        autoLogoutAfter: aftermilliseconds,
    }
}

export const logout = () => {
    console.log('LOG OUT');
    return {
        type: actionTypes.LOG_OUT
    }
}

// wywolywane pod odwiezeniu strony gdy token jest jeszcze w przegladarce
export const setLoggedIn = (userId, userName, token) => {
    return loginUserAction(true,token,false,userId,userName)
}

export const loginUser = (userEmail, userPass) => {
    return dispatch => {
        
        axios.post('/auth/login',{
            email: userEmail,
            password: userPass
        })
            .then(response => {
                if(response.status === 422){
                    throw new Error('Validation failed.');
                }

                if(response.status !== 200 & response.status !== 201){
                    console.log('Error');
                    throw new Error('Could not authenticate')
                }

                console.log(response);
                //ustawic state na auth false i authloading na false
                //przekierowanie
                dispatch(loginUserAction(true, response.data.token,false,response.data.userId,response.data.userName));
                localStorage.setItem('token',response.data.token);
                localStorage.setItem('userId', response.data.userId);
                localStorage.setItem('userName', response.data.userName);
                //gasnie za 10h
                const remainingMilliseconds = 60 * 60 * 10000;
                const expiryDate = new Date(
                    new Date().getTime() + remainingMilliseconds
                );
                localStorage.setItem('expiryDate', expiryDate.toISOString());
                dispatch(setAutoLogout(remainingMilliseconds));
                //this.props.history.replace('/projectsList');

            })
            .catch(error => {
                console.log(error)
                dispatch(loginUserActionFailed(false,false,error));
            });
    }
   
}