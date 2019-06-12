import * as actionTypes from '../../actions/actionsTypes';
import uuid from 'uuid';
import { updateObject } from '../../utility';


const initialState = {
    segmentEntry: [],
    audioList: [],
    txtList: [],
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
            return ({
                audioEntry: Object.assign({}, audioentry),
                txtEntry: Object.assign({}, txtArray[i]),
                id: uuid.v4()
            }
            );
        });
    } else {
        //make txtArray equally length
        const ilebrakuje = state.txtList.length - AudioFileList.length;
        let audioArray = [...AudioFileList, ...new Array(ilebrakuje)];

        SegmentEntryList = state.txtList.map((txtentry, i) => {
            return ({
                audioEntry: Object.assign({}, audioArray[i]),
                txtEntry: Object.assign({}, txtentry),
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
            return ({
                audioEntry: Object.assign({}, audioArray[i]),
                txtEntry: Object.assign({}, txtentry),
                id: uuid.v4()
            }
            );
        });
    } else {
        //make txtArray equally length
        const ilebrakuje = state.audioList.length - TxtFileList.length;
        let txtArray = [...TxtFileList, ...new Array(ilebrakuje)];

        console.log(txtArray)

        SegmentEntryList = state.audioList.map((audioentry, i) => {
            return ({
                audioEntry: Object.assign({}, audioentry),
                txtEntry: Object.assign({}, txtArray[i]),
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
            return ({
                audioEntry: Object.assign({}, audioentry),
                txtEntry: Object.assign({}, txtArray[i]),
                id: uuid.v4()
            }
            );
        });
    } else {
        //make txtArray equally length
        const ilebrakuje = state.txtList.length - newAudioList.length;
        let audioArray = [...newAudioList, ...new Array(ilebrakuje)];

        SegmentEntryList = state.txtList.map((txtentry, i) => {
            return ({
                audioEntry: Object.assign({}, audioArray[i]),
                txtEntry: Object.assign({}, txtentry),
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
            return ({
                audioEntry: Object.assign({}, audioArray[i]),
                txtEntry: Object.assign({}, txtentry),
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
            return ({
                audioEntry: Object.assign({}, audioentry),
                txtEntry: Object.assign({}, txtArray[i]),
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



const initBatchSegmentation = (state,action) => {

    // to do
    return updateObject(state, {}) ;  
}

const initFileSegmentation = (state,action) => {

    // to do
    return updateObject(state, {}) ;  
}

const segmentationReducer = (state = initialState, action) => {



    switch (action.type) {
        case actionTypes.DROP_AUDIO_FILES: return dropAudioFiles(state, action);
        case actionTypes.DROP_TXT_FILES: return dropTxtFiles(state, action);
        case actionTypes.CHANGE_AUDIO_LIST_ORDER: return changeAudioListOrder(state, action);
        case actionTypes.CHANGE_TXT_LIST_ORDER: return changeTxtListOrder(state, action);
        case actionTypes.INIT_BATCH_SEGMENTATION: return initBatchSegmentation(state, action);
        case actionTypes.INIT_FILE_SEGMENTATION: return initFileSegmentation(state,action);
    }

    return state;
}

export default segmentationReducer;

