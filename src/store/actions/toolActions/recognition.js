import * as actionTypes from '../actionsTypes';
import axios from 'axios';

export const dropFiles = (files) => {
    return {
        type: actionTypes.DROP_FILES,
        files: files
    }
}

//################# updating file state ###########
export const updateFileState = (fileID, status,percLoaded) => {
    return {
            type: actionTypes.UPDATE_FILE_STATE, 
            fileID: fileID, 
            status: status, 
            percLoaded:percLoaded,
        }
}


//########################################
//####### SINGLE FILE RECOGNITION ########
//#########################################

export const finishFileRecognitionAction = (message, entryId) => {
    return updateFileState(entryId, 'done',100);
        
}

export const finishFileRecognitionActionFailed = (message, entryId) => {
    return updateFileState(entryId, 'error',0);
}

export const initFileRecognition = (file, entryId, userId,projectId) =>{
    return dispatch => {

        const data = new FormData();

        data.append('audioFiles',file);
        data.append('audioFilesIds',entryId);
        data.append('projectId', projectId);
        data.append('userId', userId);
        
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        

        axios.post('/recognition/singleFile',data, config)
            .then(response => {
                const message = response.data.message;
                const entryId = response.data.sentEntryId.sentEntryId;
                console.log(message)
                console.log(entryId)
                dispatch(finishFileRecognitionAction(message, entryId));
                console.log(response);
            })
            .catch(error => {
                dispatch(finishFileRecognitionActionFailed('Recognition error', entryId));
                console.log(error);
            })
    }
}


//####### BATCH RECOGNITION ########
export const initBatchRecognition = (audioFilesArray, audioFilesIds) => {
    return dispatch => {

        let data = new FormData();
        
        for(var i = 0; i<audioFilesArray.length; i++) {
            data.append('audioFiles', audioFilesArray[i]);
        }

        data.append('audioFilesIds',audioFilesIds);
       
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        
        
        axios.post('/recognition/multipleFiles',data, config)
            .then(response => {
               
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
    }
}


//export const INIT_BATCH_RECOGNITION = 'INIT_BATCH_RECOGNITION';
//export const INIT_FILE_RECOGNITION = 'INIT_BATCH_RECOGNITION';
//export const DROP_FILES = 'DROP_FILES';
//export const UPDATE_FILE_STATE = 'UPDATE_FILE_STATE';