import * as actionTypes from '../../actions/actionsTypes';
//import { runSpeechDiarizationSuccess } from '../../actions/repo';
import produce from "immer";
//import { createNotification, loader } from '../../../index';


const initialState = {
    kwsResults: null,
    kwsInProgress: false,
    iferror: false,
}


const kwsDoneSuccess = (state, action)=>{
    const kwsResults = action.kwsResults;
    const nextState = produce(state, draftState => {
        draftState.kwsResults = kwsResults;
        draftState.kwsInProgress = false;
        draftState.iferror = false;
     })

   return nextState;
}

const kwsInit = (state, action)=>{
    const nextState = produce(state, draftState => {
        draftState.kwsInProgress = true;
        draftState.iferror = false;
     })

   return nextState;
}

const kwsError = (state, action)=>{
    const nextState = produce(state, draftState => {
        draftState.kwsInProgress = false;
        draftState.iferror = true;
     })

   return nextState;
}


const KWSReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.KWS_DONE_SUCCESS: return kwsDoneSuccess(state,action);
        case actionTypes.KWS_INIT: return kwsInit(state,action);
        case actionTypes.KWS_ERROR: return kwsError(state,action);
        default: return state;
    }

  
}



export default KWSReducer;