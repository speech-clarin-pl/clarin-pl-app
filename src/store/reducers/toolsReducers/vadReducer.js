import * as actionTypes from '../../actions/actionsTypes';
import {updateObject} from '../../utility';
import produce from "immer";
import { createNotification, loader } from '../../../index';
import { runVADInBatch } from '../../actions';



const initialState = {
    containersForVAD: [], 
    refusedFileList: [],  //refused files
    //w formacie np. 
    // [{
        // file: File {name: "__mowa16000.wav", lastModified: 1560968256333, lastModifiedDate: Wed Jun 19 2019 20:17:36 GMT+0200 (Central European Summer Time), webkitRelativePath: "", size: 1235820, …}
        // id: "01f0a209-a29f-407a-9b8a-12cdebd1e1fd"
        // loadedperc: 0
        // status: "toload"
    // }]

    vadContainerForPreview: '', //container beeing previewd in recognition
}



// dodaje kontener do podgladu w vad
const addContainerToPreviewVAD = (state,action) => {
    return updateObject(state, {
        vadContainerForPreview:action.containerForPreview, 
    });
}

// ######### dodaje container do listy VAD #########

const addContainerToVAD = (state,action) => {
   
    const newElementToAdd = action.container;

    let newElements = null;
    //dodaje nowy element tylko jeżeli wcześniej nie istniał w bazie
    let found = state.containersForVAD.filter(file => {
        return file._id == newElementToAdd._id
    })

    if(found.length < 1){
        newElements = [newElementToAdd, ...state.containersForVAD];
     } else {
         newElements = [...state.containersForVAD];
     }


     return updateObject(state, {
        containersForVAD:newElements, 
    });
}

const saveVADSegmentsSuccess = (state, action) => {
    const containerId = action.containerId;
    const toolType = action.toolType; 
    const updatedSegments = action.updatedSegments;

    const nextState = produce(state, draftState => {

        //przepisuje wlasciwosci container z preview do odpowiedniego w liscie

        let foundFileIdx = draftState.containersForVAD.findIndex(file => {
            return file._id === containerId;
        })

        draftState.containersForVAD[foundFileIdx].VADUserSegments = updatedSegments;
        draftState.vadContainerForPreview.VADUserSegments = updatedSegments;
       
   })
   

   return nextState; 
}

const speechVADSuccess = (state, action) => {
    const containerId = action.containerId;
    const toolType = action.toolType; 
    const VADSegments = action.VADSegments;


    const nextState = produce(state, draftState => {

        let foundFileIdx = draftState.containersForVAD.findIndex(file => {
            return file._id === containerId;
        })

        draftState.containersForVAD[foundFileIdx].ifVAD = true;
        draftState.containersForVAD[foundFileIdx].statusVAD = 'done';
        draftState.containersForVAD[foundFileIdx].VADUserSegments = VADSegments;

        //sprawdzam czy który miał robione rozpoznawanie był otwarty w preview

        if(draftState.vadContainerForPreview._id == draftState.containersForVAD[foundFileIdx]._id){
            draftState.vadContainerForPreview =  draftState.containersForVAD[foundFileIdx];
        }
       
   })
   

   return nextState;

}


const speechVADFailed = (state, action) => {
    const containerId = action.containerId;
    const toolType = action.toolType; 

    let foundFileIdx = state.containersForVAD.findIndex(file => {
        return file._id === containerId;
    })

    createNotification('error', 'Wystąpił błąd diaryzacji pliku ' + state.containersForVAD[foundFileIdx].containerName);

    const nextState = produce(state, draftState => {
        draftState.containersForVAD[foundFileIdx].ifVAD = false;
        draftState.containersForVAD[foundFileIdx].statusVAD = 'error';
       
   })

   return nextState;

}


const changeToolItemStatus = (state, action) => {
    const containerId = action.containerId;
    const toolType = action.toolType;
    const status = action.status;

     if(toolType == 'VAD') {
        const nextState = produce(state, draftState => {

            let foundFileIdx = draftState.containersForVAD.findIndex(file => {
                return file._id === containerId;
            })
    
            draftState.containersForVAD[foundFileIdx].statusVAD = status;
       })
    
       return nextState;

     } else {
         return state;
     }

}


const removeVADItemFromList = (state, action)=>{

    const containerId = action.container._id;

    const nextState = produce(state, draftState => {
       const nowaLista = state.containersForVAD.filter((container,index)=>{
            if(container._id == containerId){
                return false;
            } else {
                return true;
            }
       })
       draftState.containersForVAD = nowaLista;
     })

   return nextState;

}



const vadReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_CONTAINER_TO_VAD: return addContainerToVAD(state,action);
        case actionTypes.ADD_CONTAINER_TO_PREVIEW_VAD: return addContainerToPreviewVAD(state,action);

        case actionTypes.REPO_RUN_SPEECH_VAD_DONE: return speechVADSuccess(state,action);
        case actionTypes.REPO_RUN_SPEECH_VAD_FAILED: return speechVADFailed(state,action);

        case actionTypes.SET_CONTAINER_STATUS: return changeToolItemStatus(state,action);

        case actionTypes.SAVE_VAD_SEGMENTS_SUCCESS: return saveVADSegmentsSuccess(state,action);

        case actionTypes.REMOVE_VAD_ITEM: return removeVADItemFromList(state,action);

        
        //case actionTypes.ADD_CONTAINER_TO_RECO: return addContainerToReco(state,action);
        //case actionTypes.DROP_FILES: return dropFiles(state, action);
    }

    return state;
}



export default vadReducer;