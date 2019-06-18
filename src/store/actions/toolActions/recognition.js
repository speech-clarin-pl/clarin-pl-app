import * as actionTypes from '../actionsTypes';
import axios from 'axios';

export const dropFiles = (files) => {
    return {
        type: actionTypes.DROP_FILES,
        files: files
    }
}

//####### SINGLE FILE RECOGNITION ########
export const initFileRecognition = (file, entryId) =>{
    return dispatch => {
        const data = new FormData();
        
      

        data.append('entryId',entryId);
        data.append('audioFile',file);

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        

        axios.post('/recognition/singleFile',data, config)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
    }
}


//####### BATCH RECOGNITION ########
export const initBatchRecognition = () => {
    return {
        type: actionTypes.INIT_BATCH_RECOGNITION,
    }
}


//export const INIT_BATCH_RECOGNITION = 'INIT_BATCH_RECOGNITION';
//export const INIT_FILE_RECOGNITION = 'INIT_BATCH_RECOGNITION';
//export const DROP_FILES = 'DROP_FILES';
//export const UPDATE_FILE_STATE = 'UPDATE_FILE_STATE';