import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../utility';
//import { transcriptionChanged } from '../actions';
//import { saveTranscription } from '../actions';
//import { saveTranscriptionFailed } from '../actions/toolActions/audioEditor';

const initialState = {
    currentProjectID: '',
    currentProjectName: '',
    currentProjectOwner: '',
    modal: false,  // keeps if moda should be opened,
    errorMessage: '',
    error: false,

    transcriptionSaved: false,
    transcriptionSavedMessage: '',
}

const editNameFailed = (state, action) => {
    const error = action.error;
 
    
    return updateObject(state, {errorMessage: error, error: true});
 }
 
 const editName = (state, action) => {
 
     //const projectId = action.projectId;
     const newProjectName = action.newProjectName;
     //const message = action.message;
 
     return updateObject(state, {
         currentProjectName: newProjectName,
         errorMessage: '', 
         error: false});
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

const saveTranscription = (state,action) => {
    return updateObject(state,
        {
            transcriptionSaved: true,
            transcriptionSavedMessage: action.message,
        })
}

const saveTranscriptionFailed = (state,action) => {
    return updateObject(state,
        {
            transcriptionSaved: false,
        })
}

const transcriptionChanged = (state,action)=>{
    return updateObject(state,
        {
            transcriptionSaved: false,
            transcriptionSavedMessage: '',
        })
}



const projectReducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.INIT_PROJECT: return initProject(state, action);
        case actionTypes.OPEN_MODAL_PROJECT: return openModalProject(state, action);
        case actionTypes.CLOSE_MODAL_PROJECT: return closeModalProject(state, action);
        case actionTypes.EDIT_NAME: return editName(state, action);
        case actionTypes.EDIT_NAME_FAILED: return editNameFailed(state, action);
        case actionTypes.SAVE_TRANSCRIPTION_SUCCESS: return saveTranscription(state,action);
        case actionTypes.SAVE_TRANSCRIPTION_FAILED: return saveTranscriptionFailed(state,action);
        case actionTypes.TRANSCRIPTION_CHANGED: return transcriptionChanged(state,action);
        default: return state;
        
    }
}

export default projectReducer;

