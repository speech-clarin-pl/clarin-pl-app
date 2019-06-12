import * as actionTypes from '../actionsTypes';


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


//export const INIT_BATCH_SEGMENTATION = 'INIT_BATCH_SEGMENTATION';
//export const INIT_FILE_SEGMENTATION = 'INIT_BATCH_SEGMENTATION';
//export const DROP_AUDIO_FILES = 'DROP_AUDIO_FILES';
//export const DROP_TXT_FILES = 'DROP_TXT_FILES';
//export const CHANGE_AUDIO_LIST_ORDER = 'CHANGE_AUDIO_LIST_ORDER';
//export const CHANGE_TXT_LIST_ORDER = 'CHANGE_TXT_LIST_ORDER';