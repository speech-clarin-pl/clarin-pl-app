import * as actionTypes from '../../actions';
import {connect} from 'react-redux';

const initialState = {
    filesToUpload: [],
}

const recognitionReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.DROP_FILES:

            let fileList = [...state.filesToUpload, ...action.files];
           
            return {
                ...state,
                filesToUpload: fileList,
            }
        case actionTypes.INIT_BATCH_RECOGNITION:
            return {

            }
        case actionTypes.INIT_FILE_RECOGNITION:
            return {

            }
        case actionTypes.UPDATE_FILE_STATE:

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


            return {
                ...state,
                filesToUpload: currentfileList
            }
    }

    return state;
}



export default recognitionReducer;