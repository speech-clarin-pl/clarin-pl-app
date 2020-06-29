import * as actionTypes from '../actionsTypes';
import axios from 'axios';






// ###################################################################
// ######## dodawanie contanera z podglądu w reco ##########
// ###################################################################

export const openContainerInRecoPreview = (container) => {
    return {
        type: actionTypes.ADD_CONTAINER_TO_PREVIEW_RECO,
        containerForPreview: container,
    }
}


// ###################################################################
// ######## dodawanie contanera z repo do panelu rozpoznawania ##########
// ###################################################################

export const addContainerToReco = (container) => {
    return {
        type: actionTypes.ADD_CONTAINER_TO_RECO,
        container: container,
    }
}


export const dropFiles = (files) => {
    return {
        type: actionTypes.DROP_FILES,
        files: files
    }
}

//################# removing item #################
export const removeRecognitionItem = (container) => {
    //console.log('REMOVING: ' + fileId)
    return {
        type: actionTypes.REMOVE_RECOGNITION_ITEM,
        container: container,
    }
}

//################# updating file state ###########
export const updateFileState = (containerId, status, percLoaded) => {
    return {
        type: actionTypes.UPDATE_FILE_STATE,
        containerId: containerId,
        status: status,
        percLoaded: percLoaded,
    }
}


//########################################
//####### SINGLE FILE RECOGNITION ########
//#########################################

export const finishFileRecognitionAction = (message, entryId) => {
    return updateFileState(entryId, 'done', 100);

}

export const finishFileRecognitionActionFailed = (message, entryId) => {
    return updateFileState(entryId, 'error', 0);
}

export const initFileRecognition = (file, entryId, userId, projectId, audioFrom) => {
    return dispatch => {

        const data = new FormData();

        console.log(file)

        data.append('audioFiles', file);
        data.append('audioFilesIds', entryId);
        data.append('projectId', projectId);
        data.append('userId', userId);
        data.append('audioFrom', audioFrom);

        let config = null;
        if(audioFrom=="repo"){
            config = {
                headers: {
                    'content-type': 'multipart/form-data'
                },
            }
        } else {
            config = {
                headers: {
                    'content-type': 'multipart/form-data'
                },
                onUploadProgress: ProgressEvent => {
                    let percent = ProgressEvent.loaded / ProgressEvent.total*100;
    
                    console.log('wysłano: ' + percent + '%');
                    
                    //dispatch(changeUploadProgress(percent));
    
                    if(percent==100){
                        //dispatch(uploadFilesFinish());
                    }
                }
            }
        }
        

        axios.post('/recognition/singleFile', data, config)
            .then(response => {
                const message = response.data.message;
                const entryId = response.data.sentEntryId.sentEntryId;
                //console.log(message)
                // console.log(entryId)
                dispatch(finishFileRecognitionAction(message, entryId));
                //console.log(response);
            })
            .catch(error => {
                dispatch(finishFileRecognitionActionFailed('Recognition error', entryId));
                // console.log(error);
            })
    }
}

//######### opening file recognition to preview #####
export const openRecognitionAudioPreview = (entryId) => {
    return {
        type: actionTypes.OPEN_AUDIO_RECOGNITION_PREVIEW,
        fileID: entryId,
    }
}


//####### BATCH RECOGNITION ########
export const initBatchRecognition = (audioFilesArray, audioFilesIds) => {
    return dispatch => {

        let data = new FormData();

        for (var i = 0; i < audioFilesArray.length; i++) {
            data.append('audioFiles', audioFilesArray[i]);
        }

        data.append('audioFilesIds', audioFilesIds);

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        axios.post('/recognition/multipleFiles', data, config)
            .then(response => {

                // console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
    }
}

export const setRefusedFiles = (refusedFiled) => {
    return {
        type: actionTypes.REFUSE_RECO_FILES,
        refusedFileList: refusedFiled,
    }
}



//export const INIT_BATCH_RECOGNITION = 'INIT_BATCH_RECOGNITION';
//export const INIT_FILE_RECOGNITION = 'INIT_BATCH_RECOGNITION';
//export const DROP_FILES = 'DROP_FILES';
//export const UPDATE_FILE_STATE = 'UPDATE_FILE_STATE';