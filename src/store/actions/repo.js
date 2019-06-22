import * as actionTypes from './actionsTypes';
import axios from 'axios';

//#################################################################
//############## get user project files ######################
//####################################################

export const getProjectFilesForUserAction = (userId, files) => {
    return {
        type: actionTypes.REPO_GET_USER_PROJECT_FILES,
        files: files,
    }
}

export const getProjectFilesForUserActionFailed = (error) => {
    return {
        type: actionTypes.REPO_GET_USER_PROJECT_FILES_FAILED,
        error: error,
    }
}

// pobieram liste plikow w katalogu uzytkownika dla danego projektu
export const getProjectFilesForUser = (userId, projectId, token) => {
    //console.log(userId)
    //console.log(projectId)
    return dispatch => {
        console.log('getProjectFilesForUser');
        // {
        //     userId: userId,
        //     projectId: projectId,
        // },
         axios.get(('/repoFiles/'+userId),{
                    headers: {
                        Authorization: 'Bearer ' + token
                     },
                     params: {
                        projectId: projectId
                     }
                })
             .then(response => {

                 console.log(response)
                 dispatch(getProjectFilesForUserAction(userId, response.data.files));
             })
            .catch(error => {
                dispatch(getProjectFilesForUserActionFailed(error));
            });
    }
}

//tworzenie nowego folderu
export const handleCreateFolder = (key) => {
    
        console.log('CREATE NEW FOLDER:' + key);
        return {
            type: actionTypes.REPO_CREATE_FOLDER,
            key: key,
        }
  
        
}

//tworzenie nowych plikow
export const handleCreateFiles = (files, prefix) => {
    
    console.log('CREATE NEW FILES:' + files);
    return {
        type: actionTypes.REPO_CREATE_FILES,
        files: files,
        prefix: prefix,
    }
}

//zmiana nazwy folderu
export const handleRenameFolder = (oldKey, newKey) => {
    
    console.log('RENAME FOLDER:' + oldKey + ' into ' + newKey);
    return {
        type: actionTypes.REPO_RENAME_FOLDER,
        oldKey: oldKey,
        newKey: newKey,
    }

}

//zmiana nazwy pliku
export const handleRenameFile = (oldKey, newKey) => {
    console.log('RENAME FILE:' + oldKey + ' into ' + newKey);
    return {
        type: actionTypes.REPO_RENAME_FILE,
        oldKey: oldKey,
        newKey: newKey,
    }

  
}

//usuwanie folderu
export const handleDeleteFolder = (folderKey) => {
    console.log('DELETE FOLDER:' + folderKey);
    return {
        type: actionTypes.REPO_DELETE_FOLDER,
        folderKey: folderKey,
    }

  
}

//usuwanie pliku
export const handleDeleteFile = (fileKey) => {
    console.log('DELETE FILE:' + fileKey);
    return {
        type: actionTypes.REPO_DELETE_FILE,
        fileKey: fileKey,
    }

}

