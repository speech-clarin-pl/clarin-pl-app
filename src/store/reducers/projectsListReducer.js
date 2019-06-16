import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../utility';
import axios from 'axios';

const initialState = {
    projects: [],
    error: false,          //gdy wystapi error z polaczeniem z api 
    projectsLoading: true, //gdy laduja sie dane z serwera
    chosenProjectID: 'defaultProjectID'
}

const choseProject = (state, action) => {
    return updateObject(state, { chosenProjectID: action.projectId });
}

const addProject = (state, action) => {

    console.log(action.messageFromServer)
    return updateObject(state, {});
}

const duplicateProject = (state, action) => {

    // TO DO
    return updateObject(state, {});
}

const shareProject = (state, action) => {

    // TO DO
    return updateObject(state, {});
}

const removeProject = (state, action) => {

    // TO DO
    return updateObject(state, {});
}

const editName = (state, action) => {

    // TO DO
    return updateObject(state, {});
}

//pobieranie listy projektow
const getProjectsListFailed = (state, action) => {
    // console.log(action)
    return updateObject(state, { error: true });
}

const getProjectsList = (state, action) => {
    //console.log(action)

    return updateObject(state,
        {
            projects: action.projects,
            error: false,
            projectsLoading: false
        });

    // //TO DO: polaczenie z API
    // axios.get('/projectsList')
    //     .then(projects => {
    //         console.log(projects);

    //         return updateObject(state,{
    //             projects: [
    //                 {
    //                     _id: 'p1',
    //                     name: 'Jakiś tytuł projektu 1',
    //                     owner: 'You',
    //                     modified: '22.03.2019'
    //                 },
    //                 {
    //                     _id: 'p2',
    //                     name: 'Jakiś tytuł projektu 2 bla bla',
    //                     owner: 'You',
    //                     modified: '23.03.2019'
    //                 },
    //                 {
    //                     _id: 'p3',
    //                     name: 'Jakiś tytuł projektu 3',
    //                     owner: 'You',
    //                     modified: '24.03.2019'
    //                 }
    //             ],

    //             projectsLoading: false,
    //             error: false
    //         });
    //     })
    //     .catch(error => {
    //         return updateObject(state, {error: true});
    //     });

}



const projectsListReducer = (state = initialState, action) => {

    switch (action.type) {

        case actionTypes.GET_PROJECTS_LIST: return getProjectsList(state, action);
        case actionTypes.GET_PROJECTS_LIST_FAILED: return getProjectsListFailed(state, action);
        case actionTypes.CHOSE_PROJECT: return choseProject(state, action);
        case actionTypes.ADD_PROJECT: return addProject(state, action);
        case actionTypes.DUPLICATE_PROJECT: return duplicateProject(state, action);
        case actionTypes.SHARE_PROJECT: return shareProject(state, action);
        case actionTypes.REMOVE_PROJECT: return removeProject(state, action);
        case actionTypes.EDIT_NAME: return editName(state, action);
    }

    return state;
}

export default projectsListReducer;

