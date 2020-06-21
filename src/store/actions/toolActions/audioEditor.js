import * as actionTypes from '../actionsTypes';
import axios from 'axios';



// ###################################################################
// ######## jeżeli tuż po zapisaniu zmieniłem coś w polu txt ##########
// ###################################################################

export const transcriptionChanged = () => {
    return {
        type: actionTypes.TRANSCRIPTION_CHANGED,
    }
}


// ###################################################################
// ######## ładowanie transkrypcji do edytora ##########
// ###################################################################

export const loadTranscriptionSuccess = (transcriptData) => {
    return {
        type: actionTypes.LOAD_TRANSCRIPTION,
        transcriptData: transcriptData,
    }
}

export const loadTranscriptionFailed = (error) => {
    return {
        type: actionTypes.LOAD_TRANSCRIPTION_FAILED,
        error: error,
    }
}

export const loadTranscription = (container, toolType, token) => {
return dispatch => {

    axios.get('/recognition/loadTranscription'+"/"+container._id,
        {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then(transcriptData => {
            dispatch(loadTranscriptionSuccess(transcriptData));
        })
        .catch(error =>  {
            dispatch(loadTranscriptionFailed(error));
        })

}
}



// ###################################################################
// ######## zapisywanie segmentów ##########
// ###################################################################

export const saveVADSegmentsSuccess = (message, containerId, toolType) => {
    return {
        type: actionTypes.SAVE_VAD_SEGMENTS_SUCCESS,
        message: message,
        containerId: containerId,
        toolType: toolType,
    }
}

export const saveVADSegmentsFailed = (error, containerId, toolType) => {
    return {
        type: actionTypes.SAVE_VAD_SEGMENTS_FAILED,
        error: error,
        containerId: containerId,
        toolType: toolType,
    }
}

export const saveVADSegments = (container, toolType, token, segments) => {
return dispatch => {

    console.log("zapisuje VAD segmenty")
    axios.put('/vad/saveSegments', {
        segments: segments,
        toolType: toolType,
        container: container,
    },{
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
    .then(response => {
        console.log(response)
        dispatch(saveVADSegmentsSuccess(response.data.message, container._id, toolType));
      //  dispatch(closeModal());
    })
    .catch(error => {
        console.log(error)
       dispatch(saveVADSegmentsFailed(error, container._id, toolType));
    });
}
}


// ###################################################################
// ######## zapisywanie transkrypcji ##########
// ###################################################################

export const saveTranscriptionSuccess = (message, containerId, toolType) => {
        return {
            type: actionTypes.SAVE_TRANSCRIPTION_SUCCESS,
            message: message,
            containerId: containerId,
            toolType: toolType,
        }
}

export const saveTranscriptionFailed = (error, containerId, toolType) => {
        return {
            type: actionTypes.SAVE_TRANSCRIPTION_FAILED,
            error: error,
            containerId: containerId,
            toolType: toolType,
        }
}

export const saveTranscription = (container, toolType, token, transcription) => {
    return dispatch => {

        axios.put('/recognition/saveTranscription', {
            transcription: transcription,
            toolType: toolType,
            container: container,
        },{
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then(response => {
            //console.log("from action:")
            console.log(response)
            dispatch(saveTranscriptionSuccess(response.data.message, container._id, toolType));
          //  dispatch(closeModal());
        })
        .catch(error => {
          //  console.log(error)
           dispatch(saveTranscriptionFailed(error, container._id, toolType));
        });
    }
}

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


