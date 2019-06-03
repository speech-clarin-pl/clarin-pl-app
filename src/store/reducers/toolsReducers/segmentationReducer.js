import * as actionTypes from '../../actions';

const initialState = {
    segmentEntry: [],
    audioList: [],
    txtList: [],
}

const segmentationReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.DROP_AUDIO_FILES:

            let fileList = [...state.audioList, ...action.audioFiles];
           
            return {
                ...state,
                audioList: fileList,
                segmentEntry: fileList
            }
        case actionTypes.INIT_BATCH_SEGMENTATION:
            return {

            }
        case actionTypes.INIT_FILE_SEGMENTATION:
            return {

            }
    }

    return state;
}

export default segmentationReducer;

