import * as actionTypes from '../../actions/actionsTypes';
import {updateObject} from '../../utility';



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
   
    const newElementToAdd = action.containerId;
    const newElements = [...state.filesToUpload, newElementToAdd];
   
    let check = state.filesToUpload.filter(file => {
        if(file._id == newElementToAdd._id){
            return true;
        } else {
            return false;
        }
    });

    if(check.length == 0){
        return updateObject(state, {
            filesToUpload:newElements, 
        });
    } else {
        return state
    }
}





const diaReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_CONTAINER_TO_DIA: return addContainerToDIA(state,action);
        case actionTypes.ADD_CONTAINER_TO_PREVIEW_DIA: return addContainerToPreviewDIA(state,action);
        //case actionTypes.ADD_CONTAINER_TO_RECO: return addContainerToReco(state,action);
        //case actionTypes.DROP_FILES: return dropFiles(state, action);
    }

    return state;
}



export default diaReducer;