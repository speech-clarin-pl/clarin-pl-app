import * as actionTypes from '../../actions/actionsTypes';
import {updateObject} from '../../utility';


const initialState = {
    filesToUpload: [],
    modal: false, //controls if modal window is opened
}

const openModal = (state,action) => {
    return updateObject(state, {
        modal: true,
    }) ;  
}

const closeModal = (state,action) => {
    return updateObject(state, {
        modal: false,
    }) ;  
}



const dropFiles = (state, action) => {
    let fileList = [...state.filesToUpload, ...action.files];
    //console.log("DONEEEEE");
    //console.log(fileList);
    return updateObject(state, {filesToUpload: fileList}) ;      
}

const initFileRecognition = (state,action) => {

    // to do
    return updateObject(state, {}) ;  
}

//rozpoczynam wysylke na serwer i przetwarzanie rozpoznawania
const initBatchRecognition = (state,action) => {

    
    console.log("INIT BATCH RECOGNITION")
    //jezali jest jakikolwiek plik do wyslania
    if(state.filesToUpload.length > 0) {
        return updateObject(state, {});
    } else {
        return updateObject(state, {}); 
    }
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