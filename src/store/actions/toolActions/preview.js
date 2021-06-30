import * as actionTypes from '../actionsTypes';
//import axios from 'axios';

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

export const changeAudioDisplayed = (ifyes) => {
    return {
        type: actionTypes.CHANGE_AUDIO_DISPLAYED,
        ifYes: ifyes,
    }
}


export const weveSurferInitialized = (ifyes) => {
    return {
        type: actionTypes.WAVESURFER_INITIALIZED,
        ifYes: ifyes,
    }
}

export const togglePlaying = () => {
    return {
        type: actionTypes.TOGGLE_PLAYING_PREVIEW,
    }
}


//############### Txt File Preview ##############

export const openTxtFileToPreviewAction = (key, url, content) => {
    return {
        type: actionTypes.OPEN_TXT_FILE_PREVIEW,
        fileUrl: url,
        fileContent: content,
        fileKey: key,
    }
}


export const openTxtFileToPreview = (file) => {
    return dispatch => {
        fetch(file.url)
            .then(response => {
                response.text().then(content => {
                    dispatch(openTxtFileToPreviewAction(file.key, file.url, content));
                })
            })
            .catch(error => {
                //console.log(error)
            })
    }
}

//############### Audio File Preview ##############

export const openAudioFileToPreviewAction = (key, url, waveSurferInitialized) => {
    return {
        type: actionTypes.OPEN_AUDIO_FILE_PREVIEW,
        fileUrl: url,
        fileKey: key,
        waveSurferInitialized: waveSurferInitialized,
    }
}


export const openAudioFileToPreview = (file, waveSurferInitialized) => {

    return dispatch => {

        dispatch(openAudioFileToPreviewAction(file.key, file.url, waveSurferInitialized));

        // const ctx = new AudioContext();
        // let audio;

        // fetch(file.url)
        // .then(response => {
        //     response.arrayBuffer().then(arrayBuffer => {
        //         ctx.decodeAudioData(arrayBuffer).then(decodedAudio => {
        //             audio = decodedAudio;
        //             dispatch(openAudioFileToPreviewAction(file.key, file.url, audio));
        //         })
        //     })
        // })
        // .catch(error => {
        //     console.log(error)
        // })
    }

}

