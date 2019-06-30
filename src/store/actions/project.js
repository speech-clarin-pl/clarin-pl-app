import * as actionTypes from './actionsTypes';
import axios from 'axios';

//initialization the init properties of the project
export const initProject = (projectId, projectTitle, projectOwner) => {
    return {
        type: actionTypes.INIT_PROJECT,
        projectId: projectId,
        projectTitle: projectTitle,
        projectOwner: projectOwner,
    }
}

export const openModalProject = () => {
    return {
        type: actionTypes.OPEN_MODAL_PROJECT,
    }
}

export const closeModalProject = () => {
    return {
        type: actionTypes.CLOSE_MODAL_PROJECT,
    }
}

export const clearRecoStore = () => {
    return {
        type: actionTypes.CLEAR_RECO_STORE,
    }
}

export const clearSegmentStore = () => {
    return {
        type: actionTypes.CLEAR_SEGMENT_STORE,
    }
}

export const clearPreviewStore = () => {
    return {
        type: actionTypes.CLEAR_PREVIEW_STORE,
    }
}




