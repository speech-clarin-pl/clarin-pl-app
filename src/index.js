import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import homeReducer from './store/reducers/homeReducer';
import projectsListReducer from './store/reducers/projectsListReducer';
import recognitionReducer from './store/reducers/toolsReducers/recognitionReducer';
import segmentationReducer from './store/reducers/toolsReducers/segmentationReducer';
import repoReducer from './store/reducers/repoReducer';
import thunk from 'redux-thunk';
import axios from 'axios';
import projectReducer from './store/reducers/projectReducer';

//dev tools extensions instalation
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//ustawiam domyslny adres dla API
axios.defaults.baseURL = 'http://localhost:1234';
//axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
//axios.defaults.headers.post['Content-Type'] = 'application/json';

const rootReducer = combineReducers({
    homeR: homeReducer,
    projectR: projectReducer,
    prolistR: projectsListReducer,
    recR: recognitionReducer,
    segR: segmentationReducer,
    repoR: repoReducer
});


// dla asynchronicznych zadan
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
        <Provider store={store}>
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
