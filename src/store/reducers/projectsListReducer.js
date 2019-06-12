import * as actionTypes from '../actions/actionsTypes';
import {updateObject} from '../utility';

const initialState = {
    projects: [
        {
        id: 'p1',
        title: 'Jakiś tytuł projektu 1',
        owner: 'You',
        modified: '22.03.2019'
        },
        {
        id: 'p2',
        title: 'Jakiś tytuł projektu 2 bla bla',
        owner: 'You',
        modified: '23.03.2019'
        },
        {
        id: 'p3',
        title: 'Jakiś tytuł projektu 3',
        owner: 'You',
        modified: '24.03.2019'
        }
    ],
    error: false,
    chosenProjectID: null
}

const choseProject = (state, action) => {
    return updateObject(state,{chosenProjectID: action.projectId});
}

const addProject = (state, action) => {

    // TO DO
    return updateObject(state,{});
}

const duplicateProject = (state, action) => {

    // TO DO
    return updateObject(state,{});
}

const shareProject = (state, action) => {

    // TO DO
    return updateObject(state,{});
}

const removeProject = (state, action) => {

    // TO DO
    return updateObject(state,{});
}

const editName = (state, action) => {

    // TO DO
    return updateObject(state,{});
}



const projectsListReducer = (state = initialState, action) => {

    switch(action.type){
        case actionTypes.CHOSE_PROJECT: return choseProject(state, action);
        case actionTypes.ADD_PROJECT: return addProject(state, action);
        case actionTypes.DUPLICATE_PROJECT: return duplicateProject(state,action);
        case actionTypes.SHARE_PROJECT: return shareProject(state,action);
        case actionTypes.REMOVE_PROJECT: return removeProject(state,action);
        case actionTypes.EDIT_NAME: return editName(state,action);
    }

    return state;
}

export default projectsListReducer;

