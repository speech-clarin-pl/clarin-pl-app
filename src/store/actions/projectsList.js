import * as actionTypes from './actionsTypes';




export const addProject = (projectName) => {
    return {
        type: actionTypes.ADD_PROJECT,
        projectName: projectName
    }
}

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



