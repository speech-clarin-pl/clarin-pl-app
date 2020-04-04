import * as actionTypes from '../../actions/actionsTypes';
import {updateObject} from '../../utility';
//import { addContainerToReco } from '../../actions';
//import { removeRecognitionItem } from '../../actions';


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
}

const addContainerToReco = (state,action) => {
   
    const newElementToAdd = action.containerId;
    const newElements = [...state.filesToUpload, newElementToAdd];
   // console.log(newElementToAdd)
    
    return updateObject(state, {
        filesToUpload:newElements, 
    })
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

            const fileID = action.fileID;
            const status = action.status;
            const percLoaded = action.percLoaded;

            let currentfileList = [...state.filesToUpload];

            for (var i = 0; i < currentfileList.length; i++) {
                if (currentfileList[i].id === fileID) {
                    let updatedEntry = Object.assign({},currentfileList.find(obj => obj.id == fileID));
                    updatedEntry.status = status;
                    currentfileList[i] = updatedEntry;
                    break;
                }
            }

    return updateObject(state, { filesToUpload: currentfileList}) ;  
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

const recognitionReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_CONTAINER_TO_RECO: return addContainerToReco(state,action);
        case actionTypes.DROP_FILES: return dropFiles(state, action);
        case actionTypes.INIT_BATCH_RECOGNITION: return initBatchRecognition(state,action);
        case actionTypes.INIT_FILE_RECOGNITION: return initFileRecognition(state,action);
        case actionTypes.UPDATE_FILE_STATE: return updateFileState(state, action);
        case actionTypes.REMOVE_RECOGNITION_ITEM: return removeRecognitionItem(state,action);
        case actionTypes.OPEN_AUDIO_RECOGNITION_PREVIEW: return openAudioRecPreview(state, action);
        case actionTypes.CLEAR_RECO_STORE: return clearRecoStore(state, action);
        case actionTypes.REFUSE_RECO_FILES: return setRefusedFiles(state, action);
    }

    return state;
}



export default recognitionReducer;