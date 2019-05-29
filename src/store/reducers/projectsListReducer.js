import * as actionTypes from '../actions'

const initialState = {
    projects: [],
}

const projectsListReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_PROJECT:
            return {

            }
        case actionTypes.DUPLICATE_PROJECT:
            return {

            }
        case actionTypes.SHARE_PROJECT:
            return {

            }
        case actionTypes.REMOVE_PROJECT:
            return {

            }
        case actionTypes.EDIT_PROJECT:
            return {

            }
    }

    return state;
}

export default projectsListReducer;

