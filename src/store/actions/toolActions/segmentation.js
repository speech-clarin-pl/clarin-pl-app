import * as actionTypes from '../actionsTypes';
import axios from 'axios';

//action creator for dropping audio files
export const dropAudioFiles = (audioFiles) => {
    return {
        type: actionTypes.DROP_AUDIO_FILES,
        audioFiles: audioFiles
    }
}


//action creator to dropping txt files
export const dropTxtFiles = (txtFiles) => {
    return {
        type: actionTypes.DROP_TXT_FILES,
        txtFiles: txtFiles
    }
}


//action creatore for changing the order of audio files
export const changeAudioListOrder = (audioIdsOrder) => {
    return {
        type: actionTypes.CHANGE_AUDIO_LIST_ORDER,
        audioIdsOrder: audioIdsOrder
    }
}


//action creators for changing the order of txt files
export const changeTxtListOrder = (txtIdsOrder) => {
    return {
        type: actionTypes.CHANGE_TXT_LIST_ORDER,
        txtIdsOrder: txtIdsOrder
    }
}

export const removeSegmentItem = (entryId) => {
    return {
        type: actionTypes.REMOVE_SEGMENT_ENTRY,
        entryId: entryId
    }
}

//############### start segmentation entry ############
//#################################################
export const startSegmentItem = (entryId, userId, projectId, audioFile, txtFile, token) => {
    //(segmentId, userId, projectId, audioFile, txtFile, token)
    return dispatch => {

        const data = new FormData();
        data.append('entryId',entryId);
        data.append('userId',userId);
        data.append('projectId',projectId);
        data.append('audioFiles',audioFile);
        data.append('audioFiles',txtFile);
        //data.append('txtFile',txtFile);
        //data.append('token', entryId);

        console.log("WYSYLAM")
        console.log(entryId)
        console.log(userId)
        console.log(projectId)
        console.log(audioFile)
        console.log(txtFile)
       
        
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        
        axios.post('/segmentation/singleFile',data, config)
            .then(response => {
                console.log(response);
                //const message = response.data.message;
                //const entryId = response.data.sentEntryId.sentEntryId;
                //console.log(message)
                //console.log(entryId)
                //dispatch(finishFileRecognitionAction(message, entryId));
                //console.log(response);
            })
            .catch(error => {
                //dispatch(finishFileRecognitionActionFailed('Recognition error', entryId));
                console.log(error);
            })
    }
}




//export const INIT_BATCH_SEGMENTATION = 'INIT_BATCH_SEGMENTATION';
//export const INIT_FILE_SEGMENTATION = 'INIT_BATCH_SEGMENTATION';
//export const DROP_AUDIO_FILES = 'DROP_AUDIO_FILES';
//export const DROP_TXT_FILES = 'DROP_TXT_FILES';
//export const CHANGE_AUDIO_LIST_ORDER = 'CHANGE_AUDIO_LIST_ORDER';
//export const CHANGE_TXT_LIST_ORDER = 'CHANGE_TXT_LIST_ORDER';