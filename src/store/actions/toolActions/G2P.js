import * as actionTypes from '../actionsTypes';
import axios from 'axios';


// ###################################################################
// ######## rozpczyna G2P ##########
// ###################################################################
/*
export const startG2P = (alphabet, setOfWords) => {
    return dispatch => {

        dispatch({
            type: actionTypes.G2P_INIT,
        });

        axios.put(('/G2P/makeG2P'), 
        {
            setOfWords: setOfWords,
            alphabet: alphabet
        })
        .then(response => {
            dispatch({
                type: actionTypes.G2P_DONE_SUCCESS,
                alphabet: response.alphabet,
                transcribedWords: response.transcribedWords,
            });
        })
        .catch(error => {
            dispatch({
                type: actionTypes.G2P_ERROR,
            });
        }); 
      
    }
}
*/