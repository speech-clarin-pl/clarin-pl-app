import * as actionTypes from '../../actions/actionsTypes';
import {updateObject} from '../../utility';


const initialState = {

    txtContent: '',
    txtDisplayed: false,
    txtfileName: '',
    txtFileUrl: '',

    audiofileName: '',
    audioDisplayed: false,
    audioFileUrl: '',
    waveSurferLoaded: false, //indicates when the waveSurfer is initialized

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
        waveSurferLoaded: false, 
    
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



const openFilePreview = (state,action) => {

    const fileKey = action.fileKey;
    const fileUrl = action.fileUrl;
    const fileExt = getExt(fileKey);


    if(fileExt === 'txt' ||
       fileExt === 'ctm' ){
        return updateObject(state, {
            txtfileName: fileKey,
            txtFileUrl: fileUrl,
            txtDisplayed: false,
        })
    } else if(fileExt === 'wav' ||
              fileExt === 'mp3' ||
              fileExt === 'au'  ){
        
        return updateObject(state, {
            audiofileName: fileKey,
            audioFileUrl: fileUrl,
            audioDisplayed: false,
        })

    }
}

const waveSurferLoaded = (state, action) => {
    return updateObject(state, {
        waveSurferLoaded: action.ifYes,
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
        case actionTypes.OPEN_FILE_PREVIEW: return openFilePreview(state,action);
        case actionTypes.WAVESURFER_LOADED: return waveSurferLoaded(state,action);
        case actionTypes.TOGGLE_PLAYING_PREVIEW: return togglePlayingPreview(state,action);
        case actionTypes.CLEAR_PREVIEW_STORE: return clearPreviewStore(state, action);
    }

    return state;
}



export default previewReducer;