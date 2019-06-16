import * as actionTypes from './actionsTypes';
import axios from 'axios';

//#########  pobieram liste projektow #########
export const getProjectsListAction = (userId, projects) => {
    //console.log(projects)
    return {
        type: actionTypes.GET_PROJECTS_LIST,
        userId: userId,
        projects: projects,
    }
}

export const getProjectsListFailed = (error) => {
    return {
        type: actionTypes.GET_PROJECTS_LIST_FAILED,
        error: error
    }
}

export const getProjectsList = (userId) => {
    return dispatch => {
        axios.get('/projectsList')
            .then(response => {
                //console.log(response)
                dispatch(getProjectsListAction(userId, response.data.projects));
            })
            .catch(error => {
                dispatch(getProjectsListFailed(error));
            });
    }
}

//#########  dodaje projekt ##########
export const addNewProjectAction = (projectName, messageFromServer) => {
    return {
        type: actionTypes.ADD_PROJECT,
        projectName: projectName,
        messageFromServer: messageFromServer,
        userId: "jakiesIdUsera"
    }
}

export const addNewProjectActionFailed = (error) => {
    return {
        type: actionTypes.ADD_PROJECT_FAILED,
        error: error
    }
}

export const addNewProject = (projectName) => {
    return dispatch => {
        axios.post('/projectsList')
            .then(response => {
                console.log(response)
                dispatch(addNewProjectAction(projectName, response.data.message));
            })
            .catch(error => {
                dispatch(addNewProjectActionFailed(error));
            });
    }
}


//#########  wybieram  projekt ##########
export const projectChoice = (projectId) => {
    return {
        type: actionTypes.CHOSE_PROJECT,
        projectId: projectId
    }
}

export const duplicateProject = (projectId) => {
    return {
        type: actionTypes.DUPLICATE_PROJECT,
        projectId: projectId
    }
}

export const shareProject = (projectId) => {
    return {
        type: actionTypes.SHARE_PROJECT,
        projectId: projectId
    }
}

export const deleteProject = (projectId) => {
    return {
        type: actionTypes.REMOVE_PROJECT,
        projectId: projectId
    }
}

export const editName = (projectId, newName) => {
    return {
        type: actionTypes.EDIT_NAME,
        projectId: projectId,
        newName: newName
    }
}



