import * as actionTypes from './actionsTypes';
import axios from 'axios';
import {
    createNotification
} from '../../index';





//######################################################
//##################### przypomnienie hasła #######################
//#######################################################

export const forgotPassFailed = (error) => {

    let finalMessage = error.response.data.message;
    let status = error.response.status;

    /*
    if(status >= 500){
        createNotification('error',finalMessage);
    } else {
        createNotification('warning',finalMessage);
    }
    */


    return {
        type: actionTypes.FORGOT_PASS_FAILED,
        message: finalMessage,
        resForgotPassStatus: status,
    }
}

export const forgotPassAction = (message, resStatus) => {

    createNotification('success', message);

    return {
        type: actionTypes.FORGOT_PASS,
        message: message,
        resForgotPassStatus: resStatus,
    }
}
export const forgotPass = (emailaddr) => {
    return dispatch => {
        dispatch(startLoading());
        axios.post('/auth/forgotPass', {
                email: emailaddr
            })
            .then(response => {
                dispatch(stopLoading());
                dispatch(forgotPassAction(response.data.message, response.status));
            })
            .catch(error => {
                dispatch(stopLoading());
                dispatch(forgotPassFailed(error));
            });
    }
}

export const sendEmailToAdmin = (email, message, loggedEmail, token) => {
    return dispatch => {
        dispatch(startLoading());
        axios.post('/auth/sendEmailToAdmin', {
                email,
                message,
                loggedEmail
            }, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            .then(response => {
                dispatch(stopLoading());
                createNotification('success', response.data.message);
            })
            .catch(error => {
                dispatch(stopLoading());
                createNotification('error', "Błąd wysłania wiadomości");
            });
    }
}


//######################################################
//##################### rejestracja #######################
//#######################################################

export const registerUserActionFailed = (error) => {

    let finalMessage = error.response.data.message;
    let status = error.response.status;

    if (error.response.data.data.length >= 1) {
        for (let i = 0; i < error.response.data.data.length; i++) {
            finalMessage = finalMessage + '\n';
            finalMessage = finalMessage + error.response.data.data[i].msg;
        }
    }

    return {
        type: actionTypes.REGISTER_FAILED,
        message: finalMessage,
        resRegistrationStatus: status,
    }
}

export const registerUserAction = (response) => {

    const message = response.data.message;
    const userId = response.data.userId;
    const status = response.status;

    createNotification('success', message);

    return {
        type: actionTypes.REGISTER,
        message: message,
        userId: userId,
        resRegistrationStatus: status,
    }
}
export const registerUser = (userName, userEmail, userPass) => {
    return dispatch => {
        dispatch(startLoading());
        axios.put('/auth/registration', {
                name: userName,
                email: userEmail,
                password: userPass,
            })
            .then(response => {
                dispatch(stopLoading());
                dispatch(registerUserAction(response));
            })
            .catch(error => {
                dispatch(stopLoading());
                dispatch(registerUserActionFailed(error));
            });
    }
}




//####################################################
//######################### logowanie ################
//####################################################


export const loginUserAction = (isAuth, token, authLoading, userId, userName, email, resStatus) => {

    //createNotification('success','Welcome '+userName);

    return {
        type: actionTypes.LOG_IN,
        isAuth: isAuth,
        token: token,
        authLoading: authLoading,
        userId: userId,
        userName: userName,
        resLoginStatus: resStatus,
        email: email,
    }
}

export const loginUserActionFailed = (error) => {

    let finalMessage = error.response.data.message;
    let status = error.response.status;

    return {
        type: actionTypes.LOG_IN_FAILED,
        isAuth: false,
        authLoading: false,
        message: finalMessage,
        resLoginStatus: status,
    }
}

export const setAutoLogout = (aftermilliseconds) => {
    return {
        type: actionTypes.SET_AUTO_LOGOUT,
        autoLogoutAfter: aftermilliseconds,
    }
}

export const logout = () => {
    //  console.log('LOG OUT');
    createNotification('success', 'Zostałeś wylogowany!');
    return {
        type: actionTypes.LOG_OUT
    }
}

// wywolywane pod odwiezeniu strony gdy token jest jeszcze w przegladarce
export const setLoggedIn = (userId, userName, email, token) => {
    return loginUserAction(true, token, false, userId, userName, email)
}



export const loginUser = (userEmail, userPass) => {


    return dispatch => {

        dispatch(startLoading());

        axios.post('/auth/login', {
                email: userEmail,
                password: userPass
            }).then(response => {

                dispatch(stopLoading());

                if (response.status === 422) {
                    throw new Error('Validation failed.');
                }

                if (response.status === 404) {

                    throw new Error('Page not found')
                }

                if (response.status !== 200 & response.status !== 201) {
                    throw new Error('Could not authenticate')
                }

                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userId', response.data.userId);
                localStorage.setItem('userName', response.data.userName);
                localStorage.setItem('email', response.data.email);

                dispatch(loginUserAction(true, response.data.token, false, response.data.userId, response.data.userName, response.data.email, response.status));

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
                dispatch(stopLoading());

                dispatch(loginUserActionFailed(error));
            });
    }

}



//####################################################
//######################### preloader ################
//####################################################

export const startLoading = () => {
    return {
        type: actionTypes.START_LOADING,
    }
}

export const stopLoading = () => {

    return {
        type: actionTypes.STOP_LOADING,
    }
}