import * as actionTypes from '../../actions/actionsTypes';
import {updateObject} from '../../utility';
//import { runSpeechDiarizationSuccess } from '../../actions/repo';
import produce from "immer";
//import { createNotification, loader } from '../../../index';



const initialState = {
    setOfWords: [],
    transcribedWords: [],
}


const startG2P = (state, action)=>{

    const transcribedWords = action.transcribedWords;

    const nextState = produce(state, draftState => {
        draftState.transcribedWords = transcribedWords;
     })

   return nextState;

}


const diaReducer = (state = initialState, action) => {
    switch(action.type){

        case actionTypes.START_G2P: return startG2P(state,action);
        default: return state;
    }

  
}



export default diaReducer;