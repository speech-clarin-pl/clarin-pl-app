import * as actionTypes from '../actionsTypes';
import axios from 'axios';


// ###################################################################
// ######## rozpczyna G2P ##########
// ###################################################################

/*
export const startKWS = (containerId, setOfWords) => {
    return dispatch => {

        axios.put(('/KWS/makeKWS'), 
        {
            setOfWords: setOfWords,
            containerId: containerId
        })
        .then(response => {
            dispatch({
                type: actionTypes.KWS_DONE_SUCCESS,
                containerId: response.containerId,
                kwsResults: response.kwsResults,
            });
        })
        .catch(error => {
            console.log("Coś poszło nie tak")
        }); 
      
    }
}
*/