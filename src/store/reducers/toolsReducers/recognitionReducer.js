import * as actionTypes from '../../actions/actionsTypes';
import {updateObject} from '../../utility';
import produce from "immer";
import { createNotification, loader } from '../../../index';


const initialState = {
    filesToUpload: [], 
    refusedFileList: [],  //refused files
    //w formacie np. 
    // [{
        // file: File {name: "__mowa16000.wav", lastModified: 1560968256333, lastModifiedDate: Wed Jun 19 2019 20:17:36 GMT+0200 (Central European Summer Time), webkitRelativePath: "", size: 1235820, …}
        // id: "01f0a209-a29f-407a-9b8a-12cdebd1e1fd"
        // loadedperc: 0
        // status: "toload"
    // }]
    modal: false, //controls if modal window is opened
    recoFileForPreview: '', //indicates which file is chosen for preview
    recoContainerForPreview: '', //container beeing previewd in recognition

  //  transcriptData: {},

    transcriptionData: {
        "blocks" : [
            {
                "starttime" : 1,
                "stoptime" : 2,
                "data" : {
                    "text": "",
                    "type": "speech",
                 }
            },
        ],
    }, 

    //error: false,
    //errorMessage: '',
}


// dodaje kontener do podgladu w reco
const addContainerToPreviewReco = (state,action) => {
    return updateObject(state, {
        recoContainerForPreview:action.containerForPreview, 
    });
}


// ######### dodaje container do listy rozpoznawania #########

const addContainerToReco = (state,action) => {
   
    const newElementToAdd = action.container;
    let newElements = null;

    //dodaje nowy element tylko jeżeli wcześniej nie istniał w bazie
    let found = state.filesToUpload.filter(file => {
        return file._id == newElementToAdd._id
    })


    if(found.length < 1){
       newElements = [newElementToAdd, ...state.filesToUpload];
    } else {
        newElements = [...state.filesToUpload];
    }

    return updateObject(state, {
        filesToUpload:newElements, 
    });

}

const setRefusedFiles = (state, action) => {
    return updateObject(state, {
        refusedFileList: action.refusedFileList, 
    });
}

const clearRecoStore = (state,action) => {
    return updateObject(state, {
        filesToUpload: [], 
        modal: false, 
        recoFileForPreview: '', 
    });  
}

const openModal = (state,action) => {
    return updateObject(state, {
        modal: true,
    }) ;  
}

const closeModal = (state,action) => {
    return updateObject(state, {
        modal: false,
    }) ;  
}



const dropFiles = (state, action) => {
    let fileList = [ ...state.filesToUpload,...action.files];
    //console.log("DONEEEEE");
    //console.log(fileList);
    return updateObject(state, {filesToUpload: fileList}) ;      
}

const initFileRecognition = (state,action) => {

    // to do
    return updateObject(state, {}) ;  
}

//rozpoczynam wysylke na serwer i przetwarzanie rozpoznawania
const initBatchRecognition = (state,action) => {

    
    console.log("INIT BATCH RECOGNITION")
    //jezali jest jakikolwiek plik do wyslania
    if(state.filesToUpload.length > 0) {
        return updateObject(state, {});
    } else {
        return updateObject(state, {}); 
    }
}

const updateFileState = (state,action) => {

    const containerId = action.containerId;
    const status = action.status;
    //const percLoaded = action.percLoaded;
            
    const nextState = produce(state, draftState => {

        let foundFileIdx = draftState.filesToUpload.findIndex(container => {
            return container._id === containerId;
        })

        draftState.filesToUpload[containerId].status = status;
   })

   return nextState;

}

const removeRecognitionItem = (state, action)=>{
    const itemId = action.fileId;

    //const tempftu = Array.from(state.filesToUpload);

    const newFilesToUpload = state.filesToUpload.filter((item, index) => {
        if(item.id !== itemId){
            //item.file = null;
            //item.id = null;
            return true;
        }
    })
    
    return updateObject(state, { filesToUpload: newFilesToUpload}) ; 

}

const openAudioRecPreview = (state, action) => {
    const entryId = action.fileID;

    //znajduje pozycje w filesToUpload aby wyciagnac z niej plik audio

    let foundEntry = state.filesToUpload.find(obj => obj.id == entryId);
    console.log(foundEntry.file)

    return updateObject(state, { recoFileForPreview: foundEntry.file}) ; 

}

const loadTranscription = (state, action) => {
    return updateObject(state,{
        transcriptionData: action.transcriptData.data,
    })
}

// #############################################
// #### update Flagi danego kontenera po pomyślnym wykonaniu rozpoznawania
//##############################################

const speechRecognitionSuccess = (state, action) => {
    const containerId = action.containerId;
    const toolType = action.toolType; 

   // console.log("TUTAJ TEZ POWINIENEM ")
    //console.log(action.containerId)

    const nextState = produce(state, draftState => {

        let foundFileIdx = draftState.filesToUpload.findIndex(file => {
            return file._id === containerId;
        })

        draftState.filesToUpload[foundFileIdx].ifREC = true;
        draftState.filesToUpload[foundFileIdx].statusREC = 'done';
       
   })

   return nextState;

}


const speechRecognitionFailed = (state, action) => {
    const containerId = action.containerId;
    const toolType = action.toolType; 

    let foundFileIdx = state.filesToUpload.findIndex(file => {
        return file._id === containerId;
    })

    createNotification('error', 'Wystąpił błąd segmentacji pliku ' + state.filesToUpload[foundFileIdx].containerName);

    const nextState = produce(state, draftState => {
        draftState.filesToUpload[foundFileIdx].ifREC = false;
        draftState.filesToUpload[foundFileIdx].statusREC = 'error';
       
 
   })

   return nextState;

}

const saveTranscriptionSuccess = (state, action) => {
    
    const containerId = action.containerId;
    const toolType = action.toolType;

    const nextState = produce(state, draftState => {

        let foundFileIdx = draftState.filesToUpload.findIndex(file => {
            return file._id === containerId;
        })
       
        switch(toolType){
            case "DIA":
                draftState.filesToUpload[foundFileIdx].ifDIA = true;
                draftState.filesToUpload[foundFileIdx].statusDIA = 'done';
                break;
            case "VAD":
                draftState.filesToUpload[foundFileIdx].ifVAD = true;
                draftState.filesToUpload[foundFileIdx].statusVAD = 'done';
                break;
            case "REC":
                draftState.filesToUpload[foundFileIdx].ifREC = true;
                 draftState.filesToUpload[foundFileIdx].statusREC = 'done';
                break;
            case "SEG":
                draftState.filesToUpload[foundFileIdx].ifSEG = true;
                draftState.filesToUpload[foundFileIdx].statusSEG = 'done';
                break;
            default:
                console.log("Default"); //to do
        }
 

   })

   return nextState;
  

}



const changeToolItemStatus = (state, action) => {
    const containerId = action.containerId;
    const toolType = action.toolType;
    const status = action.status;

     if(toolType == 'REC') {
        const nextState = produce(state, draftState => {

            let foundFileIdx = draftState.filesToUpload.findIndex(file => {
                return file._id === containerId;
            })
    
            draftState.filesToUpload[foundFileIdx].statusREC = status;
       })
    
       return nextState;

     } else {
         return state;
     }

}

const recognitionReducer = (state = initialState, action) => {
    switch(action.type){

        case actionTypes.ADD_CONTAINER_TO_PREVIEW_RECO: return addContainerToPreviewReco(state,action);
        case actionTypes.ADD_CONTAINER_TO_RECO: return addContainerToReco(state,action);
        case actionTypes.DROP_FILES: return dropFiles(state, action);
        case actionTypes.INIT_BATCH_RECOGNITION: return initBatchRecognition(state,action);
        case actionTypes.INIT_FILE_RECOGNITION: return initFileRecognition(state,action);
        case actionTypes.UPDATE_FILE_STATE: return updateFileState(state, action);
        case actionTypes.REMOVE_RECOGNITION_ITEM: return removeRecognitionItem(state,action);
        case actionTypes.OPEN_AUDIO_RECOGNITION_PREVIEW: return openAudioRecPreview(state, action);
        case actionTypes.CLEAR_RECO_STORE: return clearRecoStore(state, action);
        case actionTypes.REFUSE_RECO_FILES: return setRefusedFiles(state, action);
        case actionTypes.LOAD_TRANSCRIPTION: return loadTranscription(state, action);

        case actionTypes.REPO_RUN_SPEECH_RECOGNITION_DONE: return speechRecognitionSuccess(state,action);
        case actionTypes.REPO_RUN_SPEECH_RECOGNITION_FAILED: return speechRecognitionFailed(state,action);

       // case actionTypes.SET_TOOL_ITEM_STATUS: return changeToolItemStatus(state,action);

        case actionTypes.SET_CONTAINER_STATUS: return changeToolItemStatus(state,action);

        case actionTypes.SAVE_TRANSCRIPTION_SUCCESS: return saveTranscriptionSuccess(state,action);
    }

    return state;
}



export default recognitionReducer;