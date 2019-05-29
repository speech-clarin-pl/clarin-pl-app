import * as actionTypes from '../../actions';

const initialState = {
    file: null,
}

const recognitionReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.INIT_BATCH_RECOGNITION:
            return {

            }
        case actionTypes.INIT_FILE_RECOGNITION:
            return {

            }
    }

    return state;
}

export default recognitionReducer;