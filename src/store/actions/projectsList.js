import * as actionTypes from './actionsTypes';
import axios from 'axios';

//otwieram okno modalne
export const openModal = (actionType, projectId, projectName) => {
    return {
        type: actionTypes.OPEN_MODAL,
        localActionType: actionType,
        projectId: projectId,
        projectName: projectName
    }
}

//zamykam okno modalne
export const closeModal = () => {
    return {
        type: actionTypes.CLOSE_MODAL,
    }
}


//###########################################
//#########  pobieram liste projektow #########
//###########################################

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
                console.log(response)
                dispatch(getProjectsListAction(userId, response.data.projects));
            })
            .catch(error => {
                dispatch(getProjectsListFailed(error));
            });
    }
}

//##################################################
//#########  dodaje projekt ##########
//##################################################
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

//########################################
//#########  wybieram  projekt ##########
//########################################
export const projectChoice = (projectId, projectName, projectOwner) => {
    return {
        type: actionTypes.CHOSE_PROJECT,
        projectId: projectId,
        projectName: projectName,
        projectOwner: projectOwner,
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

//################################################
//################## USUWANIE PROJEKTU ###############
//################################################

export const deleteProjectAction = (projectId, message) => {
    return {
        type: actionTypes.REMOVE_PROJECT,
        projectId: projectId,
        message: message
    }
}

export const deleteProject = (projectId) => {
    return dispatch => {
     
        axios.delete('/projectsList/' + projectId, {
             data: { idprojektu: projectId } 
        })
            .then(response => {
                if(response.status !== 200 && response.status !== 201){
                    throw new Error('Deleting a project failed');
                }
                dispatch(deleteProjectAction(response.data.projectId, response.data.message));
                dispatch(closeModal());
            })
            .catch(error => {
                console.log(error)
               // dispatch(editNameProjectActionFailed(error));
            });
    }
}

//################################################
//################## EDYCJA NAZWY ###############
//################################################

export const editNameProjectAction = (projectId, newProjectName, messageFromServer) => {
    return {
        type: actionTypes.EDIT_NAME,
        projectId: projectId,
        newProjectName: newProjectName,
        message: messageFromServer,
    }
}

export const editNameProjectActionFailed = (error) => {
    return {
        type: actionTypes.EDIT_NAME_FAILED,
        error: error
    }
}

export const editName = (projectId, newName) => {
    return dispatch => {

        //console.log('EDIT NAME')
        axios.put('/projectsList/' + projectId, {
            newProjectName: newName,
            projectId: projectId
        })
            .then(response => {
                //console.log("from action:")
                //console.log(response)
                dispatch(editNameProjectAction(response.data.projectEntry._id, response.data.projectEntry.name, response.data.message));
                dispatch(closeModal());
            })
            .catch(error => {
                console.log(error)
                dispatch(editNameProjectActionFailed(error));
            });
    }

}



