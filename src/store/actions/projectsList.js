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

export const getProjectsList = (userId, token) => {
    return dispatch => {
        //const header = Authorization: `Bearer-${token}`;
        //return axios.get(URLConstants.USER_URL, { headers: { header } });
        axios.get('/projectsList',{
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(response => {
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
export const addNewProjectAction = (projectName, messageFromServer, responsedNewProject, userId, token) => {
    return {
        type: actionTypes.ADD_PROJECT,
        projectName: projectName,
        messageFromServer: messageFromServer,
        responsedNewProject: responsedNewProject,
        userId: userId,
        token: token,
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

export const addNewProject = (projectName, userId, token) => {
    return dispatch => {
        //ustawiam loaded na false w reducerze aby wylaczyc okienko dopiero gdy sie zaladuje
        dispatch(initNewProjectAction())

        axios.post('/projectsList/addProject', {
                projectName: projectName,
            },{
                headers: {
                    Authorization: 'Bearer ' + token
            }})
            .then(response => {
                //console.log("from action:")
                //console.log(response)
                dispatch(addNewProjectAction(projectName, response.data.message, response.data.project, userId, token));
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

export const deleteProjectAction = (projectId, message,userId, token) => {
    return {
        type: actionTypes.REMOVE_PROJECT,
        projectId: projectId,
        message: message,
        userId: userId,
        token: token,
    }
}

export const deleteProject = (projectId, userId, token) => {
    return dispatch => {
     
        axios.delete('/projectsList/removeProject/' + projectId, {
             //data: { idprojektu: projectId },
             headers: {
                Authorization: 'Bearer ' + token
            } 
        })
            .then(response => {
                if(response.status !== 200 && response.status !== 201){
                    throw new Error('Deleting a project failed');
                }
                dispatch(deleteProjectAction(response.data.projectId, response.data.message, userId, token));
                dispatch(closeModal());
            })
            .catch(error => {
                //console.log(error)
               // dispatch(editNameProjectActionFailed(error));
            });
    }
}

//################################################
//################## EDYCJA NAZWY ###############
//################################################

export const editNameProjectAction = (projectId, newProjectName, messageFromServer, userId, token) => {
    return {
        type: actionTypes.EDIT_NAME,
        projectId: projectId,
        newProjectName: newProjectName,
        message: messageFromServer,
        userId: userId,
        token: token,
    }
}

export const editNameProjectActionFailed = (error) => {
    return {
        type: actionTypes.EDIT_NAME_FAILED,
        error: error.message
    }
}

export const editName = (projectId, newName, userId, token) => {
    return dispatch => {

        //console.log('EDIT NAME')
        axios.put('/projectsList/updateProjectName/' + projectId, {
            newProjectName: newName,
        },{
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(response => {
                //console.log("from action:")
                //console.log(response)
                dispatch(editNameProjectAction(response.data.projectId, response.data.newName, response.data.message, userId, token));
                dispatch(closeModal());
            })
            .catch(error => {
               // console.log(error)
                dispatch(editNameProjectActionFailed(error));
            });
    }

}



