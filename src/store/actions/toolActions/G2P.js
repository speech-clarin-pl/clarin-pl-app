import * as actionTypes from '../actionsTypes';
import axios from 'axios';


// ###################################################################
// ######## rozpczyna G2P ##########
// ###################################################################

export const startG2P = (alphabet, setOfWords) => {
    return dispatch => {

        axios.put(('/G2P/makeG2P'), 
        {
            setOfWords: setOfWords,
            alphabet: alphabet
        })
        .then(response => {
            dispatch({
                type: actionTypes.START_G2P,
                alphabet: response.alphabet,
                transcribedWords: response.transcribedWords,
            });
        })
        .catch(error => {
            console.log("Coś poszło nie tak")
        }); 
      
    }
}