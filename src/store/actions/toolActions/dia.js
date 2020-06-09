import * as actionTypes from '../actionsTypes';
import axios from 'axios';


// ###################################################################
// ######## dodawanie contanera z podglądu w dia ##########
// ###################################################################

export const openContainerInDIAPreview = (container) => {
    return {
        type: actionTypes.ADD_CONTAINER_TO_PREVIEW_DIA,
        containerForPreview: container,
    }
}

// ###################################################################
// ######## dodawanie contanera z repo do panelu DIA ##########
// ###################################################################

export const addContainerToDIA = (container) => {
    return {
        type: actionTypes.ADD_CONTAINER_TO_DIA,
        container: container,
    }
}