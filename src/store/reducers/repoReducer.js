import * as actionTypes from '../../store/actions/actionsTypes';

const initialState = {
    files: [],
}

const repoReducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.REPO_UPLOAD_FILE:
            return {

            }
    }

    return state;
}

export default repoReducer;