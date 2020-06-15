import * as actionTypes from '../actionsTypes';
import axios from 'axios';

// ###################################################################
// ######## urucamianie wszystkich items w batchu ##########
// ###################################################################

export const runVADInBatch = (VADItems) => {
    return {
        type: actionTypes.RUN_VAD_IN_BATCH,
        items: VADItems,
    }
}

// ###################################################################
// ######## dodawanie contanera z podglądu w vad ##########
// ###################################################################

export const openContainerInVADPreview = (container) => {
    return {
        type: actionTypes.ADD_CONTAINER_TO_PREVIEW_VAD,
        containerForPreview: container,
    }
}


// ###################################################################
// ######## dodawanie contanera z repo do panelu VAD ##########
// ###################################################################

export const addContainerToVAD = (container) => {
    return {
        type: actionTypes.ADD_CONTAINER_TO_VAD,
        container: container,
    }
}