import * as actionTypes from '../../actions';

const initialState = {
    segmentEntry: null,
}

const segmentationReducer = (state = initialState, action) => {
    switch(action.type){
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

