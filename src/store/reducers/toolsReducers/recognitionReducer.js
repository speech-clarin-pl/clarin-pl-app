import * as actionTypes from '../../actions/actionsTypes';
import {updateObject} from '../../utility';
import produce from "immer";
//import { createNotification, loader } from '../../../index';


const initialState = {
    containersForREC: [], 
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

    const nextState = produce(state, draftState => {

        //dodaje nowy element tylko jeżeli wcześniej nie istniał w bazie
        let found = state.containersForREC.filter(file => {
            return file._id === newElementToAdd._id
        })

        if(found.length < 1){
            draftState.containersForREC.unshift(newElementToAdd);
        }
       
   })

   

   return nextState;

}

const setRefusedFiles = (state, action) => {
    return updateObject(state, {
        refusedFileList: action.refusedFileList, 
    });
}

const clearRecoStore = (state,action) => {
    return updateObject(state, {
        containersForREC: [], 
        modal: false, 
        recoFileForPreview: '', 
    });  
}

/*
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
*/



const dropFiles = (state, action) => {
    let fileList = [ ...state.containersForREC,...action.files];
    //console.log("DONEEEEE");
    //console.log(fileList);
    return updateObject(state, {containersForREC: fileList}) ;      
}

const initFileRecognition = (state,action) => {

    // to do
    return updateObject(state, {}) ;  
}

//rozpoczynam wysylke na serwer i przetwarzanie rozpoznawania
const initBatchRecognition = (state,action) => {


    //jezali jest jakikolwiek plik do wyslania
    if(state.containersForREC.length > 0) {
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

       // let foundFileIdx = draftState.containersForREC.findIndex(container => {
       //     return container._id === containerId;
       // })

        draftState.containersForREC[containerId].status = status;
   })

   return nextState;

}

const removeRecognitionItem = (state, action)=>{

    const containerId = action.container._id;

    const nextState = produce(state, draftState => {

       const nowaLista = state.containersForREC.filter((container,index)=>{
            if(container._id === containerId){
                return false;
            } else {
                return true;
            }
       })


       draftState.containersForREC = nowaLista;

     })

   return nextState;

}

const openAudioRecPreview = (state, action) => {
    const entryId = action.fileID;

    //znajduje pozycje w containersForREC aby wyciagnac z niej plik audio

    let foundEntry = state.containersForREC.find(obj => obj.id === entryId);


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
   // const toolType = action.toolType; 

   // console.log("TUTAJ TEZ POWINIENEM ")
    //console.log(action.containerId)

    const nextState = produce(state, draftState => {

        let foundFileIdx = draftState.containersForREC.findIndex(file => {
            return file._id === containerId;
        })

        draftState.containersForREC[foundFileIdx].ifREC = true;
        draftState.containersForREC[foundFileIdx].statusREC = 'done';

        //jeżeli plik był otwarty w preview edytorze

        if(draftState.recoContainerForPreview._id === containerId){
            draftState.recoContainerForPreview.ifREC = true;
            draftState.recoContainerForPreview.statusREC = 'done';
        }
       
   })


   return nextState;

}



const speechRecognitionFailed = (state, action) => {

    const containerId = action.containerId;
    //const toolType = action.toolType; 


    let foundFileIdx = state.containersForREC.findIndex(file => {
        return file._id === containerId;
    })

    //createNotification('error', 'Wystąpił błąd segmentacji pliku ' + state.containersForREC[foundFileIdx].containerName);

    const nextState = produce(state, draftState => {
        draftState.containersForREC[foundFileIdx].ifREC = false;
        draftState.containersForREC[foundFileIdx].statusREC = 'error';
       
 
   })

   return nextState;

}

const saveTranscriptionSuccess = (state, action) => {
    
    const containerId = action.containerId;
    const toolType = action.toolType;

    const nextState = produce(state, draftState => {

        let foundFileIdx = draftState.containersForREC.findIndex(file => {
            return file._id === containerId;
        })
       
        switch(toolType){
            case "DIA":
                draftState.containersForREC[foundFileIdx].ifDIA = true;
                draftState.containersForREC[foundFileIdx].statusDIA = 'done';
                break;
            case "VAD":
                draftState.containersForREC[foundFileIdx].ifVAD = true;
                draftState.containersForREC[foundFileIdx].statusVAD = 'done';
                break;
            case "REC":
                draftState.containersForREC[foundFileIdx].ifREC = true;
                 draftState.containersForREC[foundFileIdx].statusREC = 'done';
                break;
            case "SEG":
                draftState.containersForREC[foundFileIdx].ifSEG = true;
                draftState.containersForREC[foundFileIdx].statusSEG = 'done';
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

     if(toolType === 'REC') {
        const nextState = produce(state, draftState => {

            let foundFileIdx = draftState.containersForREC.findIndex(file => {
                return file._id === containerId;
            })
    
            draftState.containersForREC[foundFileIdx].statusREC = status;
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
        default: return state;
    }
}



export default recognitionReducer;