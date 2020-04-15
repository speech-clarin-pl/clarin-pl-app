import * as actionTypes from '../actionsTypes';
import axios from 'axios';

// ###################################################################
// ######## dodawanie contanera z repo do panelu VAD ##########
// ###################################################################

export const addContainerToVAD = (containerId) => {
    return {
        type: actionTypes.ADD_CONTAINER_TO_VAD,
        containerId: containerId,
    }
}