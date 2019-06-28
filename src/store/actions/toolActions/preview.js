import * as actionTypes from '../actionsTypes';
import axios from 'axios';

 export const updateTxtPreview = (newContent, fileName) => {
    return {
        type: actionTypes.UPDATE_TXT_PREVIEW,
        newContent: newContent,
        fileName: fileName,
    }
}

export const updateAudioPreview = (fileKey) => {
    return {
        type: actionTypes.UPDATE_AUDIO_PREVIEW,
        fileKey: fileKey,
    }
}

export const weveSurferLoaded = (ifyes) => {
    return {
        type: actionTypes.WAVESURFER_LOADED,
        ifYes:ifyes,
    }
}

export const togglePlaying = () => {
    return {
        type: actionTypes.TOGGLE_PLAYING_PREVIEW,
    }
}




export const openFilePreview = (file) => {
    return {
        type: actionTypes.OPEN_FILE_PREVIEW,
        fileKey: file.key,
        fileUrl: file.url,
    }
}