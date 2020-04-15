import * as actionTypes from '../actionsTypes';
import axios from 'axios';


// ###################################################################
// ######## dodawanie contanera z repo do panelu DIA ##########
// ###################################################################

export const addContainerToDIA = (containerId) => {
    return {
        type: actionTypes.ADD_CONTAINER_TO_DIA,
        containerId: containerId,
    }
}