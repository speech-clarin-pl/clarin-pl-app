import * as actionTypes from './actionsTypes';
import axios from 'axios';

//otwieram okno modalne
export const openModal = () => {
    return {
        type: actionTypes.OPEN_MODAL,
    }
}

//zamykam okno modalne
export const closeModal = () => {
    return {
        type: actionTypes.CLOSE_MODAL,
    }
}



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
export const addNewProjectAction = (projectName, messageFromServer, responsedNewProject) => {
    return {
        type: actionTypes.ADD_PROJECT,
        projectName: projectName,
        messageFromServer: messageFromServer,
        responsedNewProject: responsedNewProject,
        userId: "jakiesIdUsera"
    }
}

export const addNewProjectActionFailed = (error) => {
    return {
        type: actionTypes.ADD_PROJECT_FAILED,
        errorMessage: error
    }
}

export const initNewProjectAction = () => {
    return {
        type: actionTypes.ADD_PROJECT_INIT,
    }
}

export const addNewProjectDone = () => {
    return {
        type: actionTypes.ADD_PROJECT_DONE,
    }
}

export const addNewProject = (projectName) => {
    return dispatch => {
            //ustawiam loaded na false w reducerze aby wylaczyc okienko dopiero gdy sie zaladuje
            dispatch(initNewProjectAction())
        axios.post('/projectsList', {
                projectName: projectName
            })
            .then(response => {
                //console.log("from action:")
                //console.log(response)
                dispatch(addNewProjectAction(projectName, response.data.message, response.data.project));
                dispatch(addNewProjectDone());
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



