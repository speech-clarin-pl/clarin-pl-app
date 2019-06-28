import * as actionTypes from '../../actions/actionsTypes';
import {updateObject} from '../../utility';


const initialState = {

    txtContent: '',
    txtDisplayed: false,
    txtfileName: '',
    txtFileUrl: '',

    audiofileName: '',
    audioDisplayed: false,
    audioFileUrl: '',

}

//zwraca rozszerzenie pliku
const getExt = (path) => {
    return (path.match(/(?:.+..+[^\/]+$)/ig) != null) ? path.split('.').slice(-1)[0]: 'null';
}


const updateTxtPreview = (state, action) => {
    return updateObject(state, {
        txtContent: action.newContent,
        //txtfileName: action.fileName,
        txtDisplayed: true,
    }) ;      
}



const openFilePreview = (state,action) => {

    const fileKey = action.fileKey;
    const fileUrl = action.fileUrl;
    const fileExt = getExt(fileKey);

    if(fileExt === 'txt'){
        return updateObject(state, {
            txtfileName: fileKey,
            txtFileUrl: fileUrl,
            txtDisplayed: false,
        })
    }
}



const previewReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.UPDATE_TXT_PREVIEW: return updateTxtPreview(state, action);
        case actionTypes.OPEN_FILE_PREVIEW: return openFilePreview(state,action);
    }

    return state;
}



export default previewReducer;