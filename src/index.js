import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import homeReducer from './store/reducers/homeReducer';
import projectsListReducer from './store/reducers/projectsListReducer';
import recognitionReducer from './store/reducers/toolsReducers/recognitionReducer';
import segmentationReducer from './store/reducers/toolsReducers/segmentationReducer';
import previewReducer from './store/reducers/toolsReducers/previewReducer';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";
import 'react-notifications/lib/notifications.css';

// to jest stara wersja repo
//import repoReducer from './store/reducers/repoReducer';

import repoReducer from './store/reducers/repoPanelReducer';

import thunk from 'redux-thunk';
import axios from 'axios';
import projectReducer from './store/reducers/projectReducer';
import vadReducer from './store/reducers/toolsReducers/vadReducer';
import diaReducer from './store/reducers/toolsReducers/diaReducer';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

if (process.env.NODE_ENV !== 'development') {
    console.log = () => {}
}

if (process.env.NODE_ENV === 'production') {
    axios.defaults.baseURL = window.axiosBaseURL;
} else {
    axios.defaults.baseURL = process.env.REACT_APP_API_URL;
}

//console.log(process.env.NODE_ENV)
//console.log(axios.defaults.baseURL)

//axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
//axios.defaults.headers.post['Content-Type'] = 'application/json';


axios.defaults.timeout = 360000000;//100min

// global error handling

axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    
    if(error.response){
        const statusCode = error.response.status;
        const statusText = error.response.statusText;
        const errorData = error.response.data;

        if(statusCode >=500){
            createNotification("error",statusText + ' - ' + errorData.message)
        } else if(statusCode >=300){
            createNotification("warning",statusText + ' - ' + errorData.message)
        }
    } else if (error.request) {
        createNotification("error","The application can not reach the server!")
    }
    
    return Promise.reject(error);
  });



const rootReducer = combineReducers({
    homeR: homeReducer,
    projectR: projectReducer,
    prolistR: projectsListReducer,
    recR: recognitionReducer,
    segR: segmentationReducer,
    vadR: vadReducer,
    diaR: diaReducer,
    repoR: repoReducer,
    previewR: previewReducer,
});


function createNotification (type, value) {
    switch (type) {
        case 'info':
            NotificationManager.info(value,'', 5000);
            break;
        case 'success':
            NotificationManager.success(value, '', 5000);
            break;
        case 'warning':
            NotificationManager.warning(value, '', 5000);
            break;
        case 'error':
            NotificationManager.error(value, '', 5000);
            break;
        default: break;
    }
};


const override = css`
  display: block;
  margin: 0 auto;
`;


const loader = () => {
  
    return (
        <div id="superloader" style={{ position: 'fixed', width: '100%', height: '100%', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255,255,255,0.5)', zIndex: 99999999, cursor:'pointer' }} >
            <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                <RingLoader
                    css={override}
                    size={150}
                    color={"rgb(84, 108, 120)"}
                    loading={true}
                />
            </div>
        </div>
    );
}


// dla asynchronicznych zadan
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
  
    <Provider store={store}>
        <NotificationContainer/>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>

);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


export { createNotification, loader };