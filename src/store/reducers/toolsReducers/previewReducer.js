import * as actionTypes from '../../actions/actionsTypes';
import {updateObject} from '../../utility';
import { changeAudioDisplayed } from '../../actions';


const initialState = {

    txtContent: '',
    txtDisplayed: false,
    txtfileName: '',
    txtFileUrl: '',

    audiofileName: '',
    audioContent: null,
    audioDisplayed: false,
    audioFileUrl: '',
    waveSurferInitialized: false, //indicates when the waveSurfer is initialized

    playing: false, //if playing....

}

const clearPreviewStore = (state,action) => {
    return updateObject(state, {
        txtContent: '',
        txtDisplayed: false,
        txtfileName: '',
        txtFileUrl: '',
    
        audiofileName: '',
        audioDisplayed: false,
        audioFileUrl: '',
        waveSurferInitialized: false, 
    
        playing: false, 
    }) ; 
}

//zwraca rozszerzenie pliku
const getExt = (path) => {
    return (path.match(/(?:.+..+[^\/]+$)/ig) != null) ? path.split('.').slice(-1)[0]: 'null';
}

const updateAudioPreview = (state, action) => {
    return updateObject(state, {
        //audiofileName: action.fileKey,
        //txtfileName: action.fileName,
        audioDisplayed: true,
    }) ;      
}


const updateTxtPreview = (state, action) => {
    return updateObject(state, {
        txtContent: action.newContent,
        //txtfileName: action.fileName,
        txtDisplayed: true,
    }) ;      
}



const openTxtFilePreview = (state,action) => {

    const fileContent = action.fileContent;
    const fileUrl = action.fileUrl;
    const fileKey = action.fileKey;

    return updateObject(state, {
        txtfileName: fileKey,
        txtFileUrl: fileUrl,
        txtDisplayed: false,
        txtContent: fileContent,
    })

}


const openAudioFilePreview = (state,action) => {

    const fileUrl = action.fileUrl;
    const fileKey = action.fileKey;

    return updateObject(state, {
        audiofileName: fileKey,
        audioDisplayed: false,
        audioFileUrl: fileUrl,
        waveSurferInitialized: false, //indicates when the waveSurfer is initialized
        playing: false, //if playing....
    })

}

const changeAudioDisplay = (state, action) => {
    return updateObject(state, {
        audioDisplayed: action.ifYes,
    })
}

const waveSurferInitialized = (state, action) => {
    return updateObject(state, {
        waveSurferInitialized: action.ifYes,
    })
}

const togglePlayingPreview = (state, action) => {
    if(state.playing){
        return updateObject(state, {
            playing: false
        })
    } else {
        return updateObject(state, {
            playing: true
        })
    }
}

const previewReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.UPDATE_TXT_PREVIEW: return updateTxtPreview(state, action);
        case actionTypes.UPDATE_AUDIO_PREVIEW: return updateAudioPreview(state, action);
        case actionTypes.OPEN_TXT_FILE_PREVIEW: return openTxtFilePreview(state,action);
        case actionTypes.OPEN_AUDIO_FILE_PREVIEW: return openAudioFilePreview(state,action);
        case actionTypes.WAVESURFER_INITIALIZED: return waveSurferInitialized(state,action);
        case actionTypes.TOGGLE_PLAYING_PREVIEW: return togglePlayingPreview(state,action);
        case actionTypes.CLEAR_PREVIEW_STORE: return clearPreviewStore(state, action);
        case actionTypes.CHANGE_AUDIO_DISPLAYED: return changeAudioDisplay(state,action);
    }

    return state;
}



export default previewReducer;