import * as actionTypes from '../../actions/actionsTypes';
import {updateObject} from '../../utility';


const initialState = {
    filesToUpload: [],
}

const dropFiles = (state, action) => {
    let fileList = [...state.filesToUpload, ...action.files];
    return updateObject(state, {filesToUpload: fileList}) ;      
}

const initFileRecognition = (state,action) => {

    // to do
    return updateObject(state, {}) ;  
}

const initBatchRecognition = (state,action) => {

    // to do
    return updateObject(state, {}) ;  
}

const updateFileState = (state,action) => {

    const fileID = action.fileID;
            const status = action.status;
            const percLoaded = action.percLoaded;

            let currentfileList = [...state.filesToUpload];

            for (var i = 0; i < currentfileList.length; i++) {
                if (currentfileList[i].id === fileID) {
                    let updatedEntry = Object.assign({},currentfileList.find(obj => obj.id == fileID));
                    updatedEntry.status = status;
                    currentfileList[i] = updatedEntry;
                    break;
                }
            }

    return updateObject(state, { filesToUpload: currentfileList}) ;  
}

const recognitionReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.DROP_FILES: return dropFiles(state, action);
        case actionTypes.INIT_BATCH_RECOGNITION: return initBatchRecognition(state,action);
        case actionTypes.INIT_FILE_RECOGNITION: return initFileRecognition(state,action);
        case actionTypes.UPDATE_FILE_STATE: return updateFileState(state, action);
    }

    return state;
}



export default recognitionReducer;