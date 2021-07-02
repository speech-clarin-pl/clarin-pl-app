import * as actionTypes from '../../actions/actionsTypes';
//import { runSpeechDiarizationSuccess } from '../../actions/repo';
import produce from "immer";
//import { createNotification, loader } from '../../../index';



const initialState = {
    g2pResults: null,
    g2pInProgress: false,
    ifError: false,
}


const G2PSuccess = (state, action)=>{

    const g2pResults = action.g2pResults;

    console.log(g2pResults)

    const nextState = produce(state, draftState => {
        draftState.g2pResults = g2pResults;
        draftState.g2pInProgress = false;
        draftState.ifError = false;
     })

   return nextState;
}

const G2PInit = (state, action)=>{
    const nextState = produce(state, draftState => {
        draftState.g2pResults = null;
        draftState.g2pInProgress = true;
        draftState.ifError = false;
     })

   return nextState;
}

const G2PError = (state, action)=>{
    const nextState = produce(state, draftState => {
        draftState.g2pResults = null;
        draftState.g2pInProgress = false;
        draftState.ifError = true;
     })
   return nextState;
}


const diaReducer = (state = initialState, action) => {
    switch(action.type){

        case actionTypes.G2P_DONE_SUCCESS: return G2PSuccess(state,action);
        case actionTypes.G2P_INIT: return G2PInit(state,action);
        case actionTypes.G2P_ERROR: return G2PError(state,action);
        default: return state;
    }

  
}



export default diaReducer;