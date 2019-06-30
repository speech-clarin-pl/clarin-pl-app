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

export const initSegmentProcessing = (entryId) => {
    return {
        type: actionTypes.INIT_FILE_SEGMENTATION,
        entryId: entryId
    }
}

export const finishFileSegmentationSuccess = (entryId) =>{
    return {
        type: actionTypes.FILE_SEGMENTATION_SUCCESS,
        entryId: entryId
    }
}

export const finishFileSegmentationFailed = (error, entryId) =>{
    return {
        type: actionTypes.FILE_SEGMENTATION_FAILED,
        error: error.toString(),
        entryId: entryId,
    }
}

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

        //dispatch(startSegmentItemAction(entryId));
        
        axios.post('/segmentation/singleFile',data, config)
            .then(response => {
                console.log(response);
                //const message = response.data.message;
                //const entryId = response.data.sentEntryId.sentEntryId;
                //console.log(message)
                //console.log(entryId)
                dispatch(finishFileSegmentationSuccess(entryId));
               
                //console.log(response);
            })
            .catch(error => {
                dispatch(finishFileSegmentationFailed(error, entryId));
                console.log(error);
            })
    }
}



