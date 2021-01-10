import * as actionTypes from '../../actions/actionsTypes';
import {updateObject} from '../../utility';
//import { runSpeechDiarizationSuccess } from '../../actions/repo';
import produce from "immer";
//import { createNotification, loader } from '../../../index';



const initialState = {
    containersForDIA: [], 
    refusedFileList: [],  //refused files
    //w formacie np. 
    // [{
        // file: File {name: "__mowa16000.wav", lastModified: 1560968256333, lastModifiedDate: Wed Jun 19 2019 20:17:36 GMT+0200 (Central European Summer Time), webkitRelativePath: "", size: 1235820, …}
        // id: "01f0a209-a29f-407a-9b8a-12cdebd1e1fd"
        // loadedperc: 0
        // status: "toload"
    // }]
    diaContainerForPreview: '',
}

// dodaje kontener do podgladu w dia
const addContainerToPreviewDIA = (state,action) => {
    return updateObject(state, {
        diaContainerForPreview:action.containerForPreview, 
    });
}

// ######### dodaje container do listy DIA #########

const addContainerToDIA = (state,action) => {

   // console.log('add container to dia')

    const newElementToAdd = action.container;

    let newElements = null;
    //dodaje nowy element tylko jeżeli wcześniej nie istniał w bazie
    let found = state.containersForDIA.filter(file => {
        return file._id === newElementToAdd._id
    })

    if(found.length < 1){
        newElements = [newElementToAdd, ...state.containersForDIA];
     } else {
         newElements = [...state.containersForDIA];
     }


     return updateObject(state, {
        containersForDIA:newElements, 
    });
}

// #############################################
// #### update Flagi danego kontenera po pomyślnym wykonaniu rozpoznawania
//##############################################

const speechDiarizationSuccess = (state, action) => {
    const containerId = action.containerId;
    //const toolType = action.toolType; 
    const DIAsegments = action.DIAsegments;

   // console.log("TUTAJ TEZ POWINIENEM ")
    //console.log(action.containerId)

    const nextState = produce(state, draftState => {

        let foundFileIdx = draftState.containersForDIA.findIndex(file => {
            return file._id === containerId;
        })

        draftState.containersForDIA[foundFileIdx].ifDIA = true;
        draftState.containersForDIA[foundFileIdx].statusDIA = 'done';
        draftState.containersForDIA[foundFileIdx].DIAUserSegments = DIAsegments;
       
        //sprawdzam czy który był otwarty w preview

        if(draftState.diaContainerForPreview._id === draftState.containersForDIA[foundFileIdx]._id){
            draftState.diaContainerForPreview =  draftState.containersForDIA[foundFileIdx];
        }

   })

   return nextState;

}


const speechDiarizationFailed = (state, action) => {
    const containerId = action.containerId;
    //const toolType = action.toolType; 

    let foundFileIdx = state.containersForDIA.findIndex(file => {
        return file._id === containerId;
    })

    //createNotification('error', 'Wystąpił błąd diaryzacji pliku ' + state.containersForDIA[foundFileIdx].containerName);

    const nextState = produce(state, draftState => {
        draftState.containersForDIA[foundFileIdx].ifDIA = false;
        draftState.containersForDIA[foundFileIdx].statusDIA = 'error';
       
 
   })

   return nextState;

}

const changeToolItemStatus = (state, action) => {
    const containerId = action.containerId;
    const toolType = action.toolType;
    const status = action.status;

     if(toolType === 'DIA') {
        const nextState = produce(state, draftState => {

            let foundFileIdx = draftState.containersForDIA.findIndex(file => {
                return file._id === containerId;
            })
    
            draftState.containersForDIA[foundFileIdx].statusDIA = status;
       })
    
       return nextState;

     } else {
         return state;
     }

}

const saveDIASegmentsSuccess = (state, action) => {
    const containerId = action.containerId;
    //const toolType = action.toolType; 
    const updatedSegments = action.updatedSegments;

    const nextState = produce(state, draftState => {

        //przepisuje wlasciwosci container z preview do odpowiedniego w liscie

        let foundFileIdx = draftState.containersForDIA.findIndex(file => {
            return file._id === containerId;
        })

        draftState.containersForDIA[foundFileIdx].DIAUserSegments = updatedSegments;
        draftState.diaContainerForPreview.DIAUserSegments = updatedSegments;  
   })

   return nextState; 
}


const removeFromDIAItems = (state, action)=>{

    const containerId = action.container._id;

    const nextState = produce(state, draftState => {
       const nowaLista = state.containersForDIA.filter((container,index)=>{
            if(container._id === containerId){
                return false;
            } else {
                return true;
            }
       })
       draftState.containersForDIA = nowaLista;
     })

   return nextState;

}


const diaReducer = (state = initialState, action) => {
    switch(action.type){

        case actionTypes.ADD_CONTAINER_TO_DIA: return addContainerToDIA(state,action);
        case actionTypes.ADD_CONTAINER_TO_PREVIEW_DIA: return addContainerToPreviewDIA(state,action);

        case actionTypes.REPO_RUN_SPEECH_DIARIZATION_DONE: return speechDiarizationSuccess(state,action);
        case actionTypes.REPO_RUN_SPEECH_DIARIZATION_FAILED: return speechDiarizationFailed(state,action);

        case actionTypes.SET_CONTAINER_STATUS: return changeToolItemStatus(state,action);

        case actionTypes.SAVE_DIA_SEGMENTS_SUCCESS: return saveDIASegmentsSuccess(state,action);

        case actionTypes.REMOVE_DIA_ITEM: return removeFromDIAItems(state,action);

        //case actionTypes.ADD_CONTAINER_TO_RECO: return addContainerToReco(state,action);
        //case actionTypes.DROP_FILES: return dropFiles(state, action);

        default: return state;
    }

  
}



export default diaReducer;