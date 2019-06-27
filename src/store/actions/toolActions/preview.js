import * as actionTypes from '../actionsTypes';
import axios from 'axios';

 export const updateTxtPreview = (newContent, fileName) => {
    return {
        type: actionTypes.UPDATE_TXT_PREVIEW,
        newContent: newContent,
        fileName: fileName,
    }
}

export const openFilePreview = (file) => {
    return {
        type: actionTypes.OPEN_FILE_PREVIEW,
        fileKey: file.key,
        fileUrl: file.url,
    }
}