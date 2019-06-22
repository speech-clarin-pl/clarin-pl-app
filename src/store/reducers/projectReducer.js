import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../utility';

const initialState = {
    currentProjectID: '',
    currentProjectName: '',
    currentProjectOwner: '',

    modal: false,  // keeps if moda should be opened
}

const initProject = (state, action) => {
    return updateObject(state,
        {
            currentProjectID: action.projectId,
            currentProjectName: action.projectTitle,
            currentProjectOwner: action.projectOwner,
        });
}

const openModalProject = (state, action) => {
    return updateObject(state,
        {
            modal: true
        });
}

const closeModalProject = (state, action) => {
    return updateObject(state,
        {
            modal: false
        });
}



const projectReducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.INIT_PROJECT: return initProject(state, action);
        case actionTypes.OPEN_MODAL_PROJECT: return openModalProject(state, action);
        case actionTypes.CLOSE_MODAL_PROJECT: return closeModalProject(state, action);
    }

    return state;
}

export default projectReducer;

