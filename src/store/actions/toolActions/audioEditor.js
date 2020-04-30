import * as actionTypes from '../actionsTypes';
import axios from 'axios';


// ###################################################################
// ######## ładowanie pliku audio do edytora audio ##########
// ###################################################################

export const loadAudioForPreviewSuccess = (audioFile, toolType) => {
    return {
        type: actionTypes.LOAD_AUDIO_FOR_PREVIEW,
        containerAudioFile: audioFile,
        toolType: toolType,
    }
}

export const loadAudioForPreviewFailed = (error) => {
    return {
        type: actionTypes.LOAD_AUDIO_FOR_PREVIEW_FAILED,
        error: error,
    }
}

export const loadAudioForPreview = (container, toolType, token) => {
    return dispatch => {

        
        axios.get('/repoFiles/loadAudioFile/'+toolType+"/"+container._id,
        {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then( audioFile => {
            dispatch(loadAudioForPreviewSuccess(audioFile, toolType));
        })
        .catch(error =>  {
            dispatch(loadAudioForPreviewFailed(error));
        })

        
    }
}



// ###################################################################
// ######## ładowanie binary DAT do edytora audio ##########
// ###################################################################

export const loadBinaryForPreviewSuccess = (containerBinaryData, toolType) => {
    return {
        type: actionTypes.LOAD_BINARY_FOR_PREVIEW,
        containerBinaryData: containerBinaryData,
        toolType: toolType,
    }
}

export const loadBinaryForPreviewFailed = (error) => {
    return {
        type: actionTypes.LOAD_BINARY_FOR_PREVIEW_FAILED,
        error: error,
    }
}

export const loadBinaryForPreview = (container, toolType, token) => {
    return dispatch => {

        
        axios.get('/repoFiles/loadBinaryAudio/'+toolType+"/"+container._id,
        {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then( containerBinaryData => {
            dispatch(loadBinaryForPreviewSuccess(containerBinaryData, toolType));
        })
        .catch(error =>  {
            dispatch(loadBinaryForPreviewFailed(error));
        })

        
    }
}


