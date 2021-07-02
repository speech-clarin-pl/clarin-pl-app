import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../utility';
//import axios from 'axios';

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

    localAction: '', //po kliknieciu w przycisk wywolujacy okno modalne wiem po co zostalo ono klikniete
    projectId: '',  //wiem ktorego projektu dotyczy kliknieta akcja
    projectName: '',  //oraz jaka jest nazwa obecnego projektu
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

    const projectId = action.projectId;
    //const message = action.message;

    //robie immutable removing project
    const projects = [...state.projects];

    //znajduje index projektu do usuniecia
    let index = 0;
    //eslint-disable-next-line
    let updatedProjects = projects.map((project,i) => {

        if(project._id !== projectId){
            return project;
        } else {
            index = i;
        }
        //jezeli znajdziemy to robimy update
    })

    updatedProjects = [...updatedProjects.slice(0, index), ...updatedProjects.slice(index + 1)]

    return updateObject(state, {
        projects: updatedProjects
    });
}


const editNameFailed = (state, action) => {
   const error = action.error;

   
   return updateObject(state, {errorMessage: error, error: true});
}

const editName = (state, action) => {

    const projectId = action.projectId;
    const newProjectName = action.newProjectName;


    //robie immutable updating projektow
    const projects = [...state.projects];
    const updatedProjects = projects.map(project => {
        if(project._id !== projectId){
            return project;
        }

        //jezeli znajdziemy to robimy update
        return {
            ...project,
            name: newProjectName
        }
    })

    //console.log(state)
    //console.log("Musze updatowac widok teraz!!!! w reducerze")
    
    return updateObject(state, {
        projects: updatedProjects,
        errorMessage: '', 
        error: false});
}

//pobieranie listy projektow
const getProjectsListFailed = (state, action) => {

    return updateObject(state, { 
        error: true, 
        loaded: false,
        errorMessage: action.errorMessage });
}

const getProjectsList = (state, action) => {

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
            modalDisplay: true,
            localAction: action.localActionType,
            projectId: action.projectId,
            projectName: action.projectName
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
        case actionTypes.EDIT_NAME_FAILED: return editNameFailed(state, action);
        case actionTypes.OPEN_MODAL: return openModal(state, action);
        case actionTypes.CLOSE_MODAL: return closeModal(state, action);
        default: return state;
        
    }
}

export default projectsListReducer;

