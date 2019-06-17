import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../utility';
import axios from 'axios';

const initialState = {
    projects: [],
    error: false,          //gdy wystapi error z polaczeniem z api 
    projectsLoading: true, //gdy laduja sie dane z serwera

    chosenProjectID: '',    //dane wybranego projektu
    chosenProjectName: '',
    chosenProjectOwner: '',

    loaded: false, //gdy projekt z serwera juz sie zaladowal
    errorMessage: '',   //gdy nie przejdzie validacji po stronie serwera
    modalDisplay: false, //czy pokazywac modal
}

const choseProject = (state, action) => {
  
    return updateObject(state, { 
        chosenProjectID: action.projectId, 
        chosenProjectName: action.projectName,
        chosenProjectOwner: action.projectOwner,
     });
}

const addProject = (state, action) => {
    let newProjectsList = [action.responsedNewProject, ...state.projects];
    //console.log(newProjectsList)
   // console.log(action.responsedNewProject)

    return updateObject(state, {projects: newProjectsList, loaded: true });
}

const addProjectInit = (state, action) => {
    return updateObject(state, {loaded: false});
}

const addProjectDone = (state, action) => {
    return updateObject(state, {
        loaded: true, 
        errorMessage:'',
        modalDisplay: false});
}

const addProjectFailed = (state,action) => {
    //console.log(action.errorMessage.response.data.message)
    return updateObject(state, {
        errorMessage: action.errorMessage.response.data.message,
    })
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
     console.log(action)
    return updateObject(state, { 
        error: true, 
        loaded: false,
        errorMessage: action.errorMessage });
}

const getProjectsList = (state, action) => {
    //console.log(action)

    return updateObject(state,
        {
            projects: action.projects,
            error: false,
            projectsLoading: false,
        });

}

const openModal = (state, action) => {
    return updateObject(state,
        {
            modalDisplay: true
        });
}

const closeModal = (state, action) => {
    return updateObject(state,
        {
            modalDisplay: false
        });
}



const projectsListReducer = (state = initialState, action) => {

    switch (action.type) {

        case actionTypes.GET_PROJECTS_LIST: return getProjectsList(state, action);
        case actionTypes.GET_PROJECTS_LIST_FAILED: return getProjectsListFailed(state, action);
        case actionTypes.CHOSE_PROJECT: return choseProject(state, action);
        case actionTypes.ADD_PROJECT_INIT: return addProjectInit(state, action);
        case actionTypes.ADD_PROJECT_DONE: return addProjectDone(state, action);
        case actionTypes.ADD_PROJECT: return addProject(state, action);
        case actionTypes.ADD_PROJECT_FAILED: return addProjectFailed(state, action);
        case actionTypes.DUPLICATE_PROJECT: return duplicateProject(state, action);
        case actionTypes.SHARE_PROJECT: return shareProject(state, action);
        case actionTypes.REMOVE_PROJECT: return removeProject(state, action);
        case actionTypes.EDIT_NAME: return editName(state, action);
        case actionTypes.OPEN_MODAL: return openModal(state, action);
        case actionTypes.CLOSE_MODAL: return closeModal(state, action);
    }

    return state;
}

export default projectsListReducer;

