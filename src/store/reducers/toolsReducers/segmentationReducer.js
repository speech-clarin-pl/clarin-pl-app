import * as actionTypes from '../../actions/actionsTypes';
import uuid from 'uuid';
import { updateObject } from '../../utility';
//import { addContainerToAlign } from '../../actions';
import produce from "immer"


const initialState = {

    segmentItems: [],
                            // poniżej to kopie raczej nie beda uzywane
    segmentEntry: [],
    audioList: [],
    txtList: [],

    refusedAudioFileList: [],  //refused audio files
    refusedTxtFileList: [],  //refused txt files
    ifRefusedAudio: true, //which component refused files - audio or if false will be txt

    alignContainerForPreview: '',
}


const addContainerToPreviewAlign = (state,action) => {
    return updateObject(state, {
        alignContainerForPreview:action.containerForPreview, 
    });
}


//#### dodaje contener do panelu align
const addContainerToAlign  = (state, action) => {


    let containerToAdd = action.container;

    const newElementToAdd = containerToAdd;
    const newElements = [...state.segmentItems, newElementToAdd];
   
    let check = state.segmentItems.filter(file => {
        if(file._id == newElementToAdd._id){
            return true;
        } else {
            return false;
        }
    });

    if(check.length == 0){

        const nextState = produce(state, draftState => {
            draftState.segmentItems = newElements;
        })
    
        return nextState;

        /* return updateObject(state, {
            segmentItems:newElements, 
        }); */
    } else {
        return state
    }


}

const setRefusedTxtFiles = (state, action) => {
    return updateObject(state, {
        refusedTxtFileList: action.refusedFileList, 
        ifRefusedAudio: false,
    });
}

const setRefusedAudioFiles = (state, action) => {
    return updateObject(state, {
        refusedAudioFileList: action.refusedFileList, 
        ifRefusedAudio: true,
    });
}

const clearSegmentStore = (state,action) => {
    return updateObject(state, {
        segmentEntry: [],
        audioList: [],
        txtList: [],
    });
}

const dropAudioFiles = (state, action) => {

    let SegmentEntryList = [];

    const AudioFileList = [...state.audioList, ...action.audioFiles];

    // forming segment Entry as Array of {audioFile, txtfile}

    //OK
    if (AudioFileList.length >= state.txtList.length) {
     
        //make txtArray equally length
        const ilebrakuje = AudioFileList.length - state.txtList.length;
        let txtArray = [...state.txtList, ...new Array(ilebrakuje)];

        SegmentEntryList = AudioFileList.map((audioentry, i) => {

            //status to tell if entry has both audio and txt
            let status = 'novalid';
            let txtItem = txtArray[i];
            //console.log(txtItem)
            if(txtItem===undefined){
                status = 'novalid';
            } else {
                status = 'valid';
            }
            //console.log(status)
            return ({
                audioEntry: Object.assign({}, audioentry),
                txtEntry: Object.assign({}, txtItem),
                status: status, //status if audio and text together
                processingStatus: 'prepared', 
                id: uuid.v4()
            }
            );
        });
    } else {
        
        //make txtArray equally length
        const ilebrakuje = state.txtList.length - AudioFileList.length;
        let audioArray = [...AudioFileList, ...new Array(ilebrakuje)];

        SegmentEntryList = state.txtList.map((txtentry, i) => {

            let status = 'novalid';
            let audioItem = audioArray[i];
            //console.log(txtItem)
            if(audioItem===undefined){
                status = 'novalid';
            } else {
                status = 'valid';
            }

            return ({
                audioEntry: Object.assign({}, audioArray[i]),
                txtEntry: Object.assign({}, txtentry),
                status: status,
                processingStatus: 'prepared', 
                id: uuid.v4()
            }
            );
        });
    }

    //console.log(SegmentEntryList)


    return updateObject(state, {
        audioList: AudioFileList,
        segmentEntry: SegmentEntryList
    });
}


const dropTxtFiles = (state, action) => {

    let SegmentEntryList = [];

    const TxtFileList = [...state.txtList, ...action.txtFiles];

    // forming segment Entry as Array of {audioFile, txtfile}

    if (TxtFileList.length >= state.audioList.length) {

        //make txtArray equally length
        const ilebrakuje = TxtFileList.length - state.audioList.length;
        let audioArray = [...state.audioList, ...new Array(ilebrakuje)];
        

        SegmentEntryList = TxtFileList.map((txtentry, i) => {

            let status = 'novalid';
            let audioItem = audioArray[i];
            //console.log(txtItem)
            if(audioItem===undefined){
                status = 'novalid';
            } else {
                status = 'valid';
            }

            return ({
                audioEntry: Object.assign({}, audioArray[i]),
                txtEntry: Object.assign({}, txtentry),
                status:status,
                processingStatus: 'prepared', 
                id: uuid.v4()
            }
            );
        });
    } else {
        //make txtArray equally length
        const ilebrakuje = state.audioList.length - TxtFileList.length;
        let txtArray = [...TxtFileList, ...new Array(ilebrakuje)];

        SegmentEntryList = state.audioList.map((audioentry, i) => {

            //status to tell if entry has both audio and txt
            let status = 'novalid';
            let txtItem = txtArray[i];
            //console.log(txtItem)
            if(txtItem===undefined){
                status = 'novalid';
            } else {
                status = 'valid';
            }

            return ({
                audioEntry: Object.assign({}, audioentry),
                txtEntry: Object.assign({}, txtArray[i]),
                status: status,
                processingStatus: 'prepared', 
                id: uuid.v4()
            }
            );
        });
    }

    //console.log(SegmentEntryList)



    return updateObject(state, {
        txtList: TxtFileList,
        segmentEntry: SegmentEntryList
    });
}

const changeAudioListOrder = (state, action) => {

    let SegmentEntryList = [];

    //receiving the ids as array in custome order
    const idsAudioOrder = action.audioIdsOrder;

    //not rearrange the audioList according to the idsOrder...
    const newAudioList = idsAudioOrder.map(id => {
        return (
            Object.assign({},
                state.audioList.find(elem => elem.id === id)
            )
        )
    });


    if (newAudioList.length >= state.txtList.length) {

        //make txtArray equally length
        const ilebrakuje = newAudioList.length - state.txtList.length;
        let txtArray = [...state.txtList, ...new Array(ilebrakuje)];

        SegmentEntryList = newAudioList.map((audioentry, i) => {

            //status to tell if entry has both audio and txt
            let status = 'novalid';
            let txtItem = txtArray[i];
            //console.log(txtItem)
            if(txtItem===undefined){
                status = 'novalid';
            } else {
                status = 'valid';
            }

            return ({
                audioEntry: Object.assign({}, audioentry),
                txtEntry: Object.assign({}, txtArray[i]),
                status: status,
                processingStatus: 'prepared', 
                id: uuid.v4()
            }
            );
        });
    } else {
        //make txtArray equally length
        const ilebrakuje = state.txtList.length - newAudioList.length;
        let audioArray = [...newAudioList, ...new Array(ilebrakuje)];

        SegmentEntryList = state.txtList.map((txtentry, i) => {

             //status to tell if entry has both audio and txt
             let status = 'novalid';
             let audioItem = audioArray[i];
            
             if(audioItem===undefined){
                 status = 'novalid';
             } else {
                 status = 'valid';
             }

            return ({
                audioEntry: Object.assign({}, audioArray[i]),
                txtEntry: Object.assign({}, txtentry),
                status: status,
                processingStatus: 'prepared', 
                id: uuid.v4()
            }
            );
        });
    }

    // console.log(SegmentEntryList)


    return updateObject(state, {
        audioList: newAudioList,
        segmentEntry: SegmentEntryList
    });

}



const changeTxtListOrder = (state, action) => {

    let SegmentEntryList = [];
    
    //receiving the ids as array in custome order
    const idsTxtOrder = action.txtIdsOrder;

    //not rearrange the audioList according to the idsOrder...
    const newTxtList = idsTxtOrder.map(id => {
        return (
            Object.assign({},
                state.txtList.find(elem => elem.id === id)
            )
        )
    });


    if (newTxtList.length >= state.audioList.length) {

        //make txtArray equally length
        const ilebrakuje = newTxtList.length - state.audioList.length;
        let audioArray = [...state.audioList, ...new Array(ilebrakuje)];

        SegmentEntryList = newTxtList.map((txtentry, i) => {

            //status to tell if entry has both audio and txt
            let status = 'novalid';
            let audioItem = audioArray[i];
           
            if(audioItem===undefined){
                status = 'novalid';
            } else {
                status = 'valid';
            }

            return ({
                audioEntry: Object.assign({}, audioArray[i]),
                txtEntry: Object.assign({}, txtentry),
                status: status,
                processingStatus: 'prepared', 
                id: uuid.v4()

            }
            );
        });
    } else {
        //make txtArray equally length
        const ilebrakuje = state.audioList.length - newTxtList.length;
        let txtArray = [...newTxtList, ...new Array(ilebrakuje)];

        console.log(txtArray)

        SegmentEntryList = state.audioList.map((audioentry, i) => {

            //status to tell if entry has both audio and txt
            let status = 'novalid';
            let txtItem = txtArray[i];
           
            if(txtItem===undefined){
                status = 'novalid';
            } else {
                status = 'valid';
            }


            return ({
                audioEntry: Object.assign({}, audioentry),
                txtEntry: Object.assign({}, txtArray[i]),
                status: status,
                processingStatus: 'prepared', 
                id: uuid.v4()
            }
            );
        });
    }

    //console.log(SegmentEntryList)
    return updateObject(state, {
        txtList: newTxtList,
        segmentEntry: SegmentEntryList
    });
}



// const initBatchSegmentation = (state,action) => {

//     // to do
//     return updateObject(state, {}) ;  
// }

const initFileSegmentation = (state,action) => {
    const entryId = action.entryId;
 
    let newSegmentEntry = state.segmentEntry.map((entry, i) => {
        //status to tell if entry has both audio and txt
        let newEntry = Object.assign({}, entry);
       if(newEntry.id === entryId){
            newEntry.processingStatus = 'inProgress';
       }

       return newEntry;
    });

    return updateObject(state, {segmentEntry: newSegmentEntry}) ;  
}

const removeSegmentEntry = (state,action) => {
    const entryId = action.entryId;

    let entryAudioId = '';
    let entryTxtId = '';
    
    const newsegmentEntry = state.segmentEntry.filter((item, index) => {
        //zapisuje z jakich elementow sklada sie segmentEntry
        let czyzostawic = true;
        if(item.id !== entryId){
            czyzostawic = true;
        } else {
            //wtedy usuwam ten element
            czyzostawic = false;
            entryAudioId = item.audioEntry.id;
            entryTxtId = item.txtEntry.id;
        }
        return czyzostawic
    })

    //teraz usuwam z listy audio oraz txt elementy o tym id
    const newAudioList = state.audioList.filter((audioItem, index) => {
        return audioItem.id !== entryAudioId;
    });

    const newTxtList = state.txtList.filter((txtItem, index) => {
        return txtItem.id !== entryTxtId;
    });

    console.log(entryId)
    console.log(entryAudioId)
    console.log(entryTxtId)

    return updateObject(state, {
        segmentEntry: newsegmentEntry,
        audioList: newAudioList,
        txtList: newTxtList,
    }) ; 
}

const fileSegmentationSuccess = (state,action) => {
    const entryId = action.entryId;
    //znajduje to entry i ustawiam mu odpowiedni status processingStatus
    console.log(entryId)
    let newSegmentEntry = state.segmentEntry.map((entry, i) => {
        //status to tell if entry has both audio and txt
        let newEntry = Object.assign({}, entry);
       if(newEntry.id === entryId){
            newEntry.processingStatus = 'done';
       }

       return newEntry;
    });

    console.log(newSegmentEntry)

    return updateObject(state, {segmentEntry: newSegmentEntry}) ;  
}

const fileSegmentationFailed = (state,action) => {
    const entryId = action.entryId;
    //znajduje to entry i ustawiam mu odpowiedni status processingStatus

    let newSegmentEntry = state.segmentEntry.map((entry, i) => {
        //status to tell if entry has both audio and txt
        let newEntry = Object.assign({}, entry);
       if(newEntry.id === entryId){
            newEntry.processingStatus = 'error';
       }

       return newEntry;
    });

    return updateObject(state, {segmentEntry: newSegmentEntry}) ;  
}

const segmentationReducer = (state = initialState, action) => {

    switch (action.type) {

        

        case actionTypes.ADD_CONTAINER_TO_PREVIEW_ALIGN: return addContainerToPreviewAlign(state,action);
        case actionTypes.DROP_AUDIO_FILES: return dropAudioFiles(state, action);
        case actionTypes.DROP_TXT_FILES: return dropTxtFiles(state, action);
        case actionTypes.CHANGE_AUDIO_LIST_ORDER: return changeAudioListOrder(state, action);
        case actionTypes.CHANGE_TXT_LIST_ORDER: return changeTxtListOrder(state, action);
        //case actionTypes.INIT_BATCH_SEGMENTATION: return initBatchSegmentation(state, action);
        case actionTypes.INIT_FILE_SEGMENTATION: return initFileSegmentation(state,action);
        case actionTypes.REMOVE_SEGMENT_ENTRY: return removeSegmentEntry(state,action);
        case actionTypes.CLEAR_SEGMENT_STORE: return clearSegmentStore(state, action);
        case actionTypes.FILE_SEGMENTATION_SUCCESS: return fileSegmentationSuccess(state,action);
        case actionTypes.FILE_SEGMENTATION_FAILED: return fileSegmentationFailed(state,action);
        case actionTypes.REFUSE_SEGMENT_AUDIO_FILES: return setRefusedAudioFiles(state, action);
        case actionTypes.REFUSE_SEGMENT_TXT_FILES: return setRefusedTxtFiles(state, action);
        case actionTypes.ADD_CONTAINER_TO_ALIGN: return addContainerToAlign(state,action);
    }

    return state;
}

export default segmentationReducer;

