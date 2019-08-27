import * as actionTypes from './actionsTypes';
import axios from 'axios';
import { saveAs } from 'file-saver';
//import { saveSync } from 'save-file';
//import streamSaver from 'StreamSaver';

//#################################################################
//############## edycja pliku txt ######################
//####################################################

export const handleUpdateTxtFileAction = (key, message) => {
    return {
        type: actionTypes.REPO_EDIT_TXT_SUCCESS,
        file: key,
    }
}

export const handleUpdateTxtFileActionFailed = (key, message) => {
    return {
        type: actionTypes.REPO_EDIT_TXT_FAILED,
        file: key,
    }
}

export const handleUpdateTxtFile = (userId, projectId, token, key, newContent) => {
    console.log('UPDATE TXT FILE:' + key);
    return dispatch => {
        axios.put(('/repoFiles/editTxtFile/'), {
            key: key, //np key: "nowyfolder/" lub "nowyfolder/innypodfolder/"
            newContent: newContent,
            userId: userId,
            projectId: projectId,
        }, {
            headers: {
                Authorization: 'Bearer ' + token
            },
        })
            .then(response => {
                console.log(response)
                dispatch(handleUpdateTxtFileAction(response.data.key, response.data.message));
            })
            .catch(error => {
                dispatch(handleUpdateTxtFileActionFailed(error));
            });
    }
}


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
        axios.get(('/repoFiles/' + userId), {
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

//###########################################
//#######   tworzenie nowego folderu
//#########################################

export const handleCreateFolderAction = (key, message) => {
    return {
        type: actionTypes.REPO_CREATE_FOLDER,
        key: key,
        message: message,
    }
}

export const handleCreateFolderActionFailed = (error) => {
    return {
        type: actionTypes.REPO_CREATE_FOLDER_FAILED,
        error: error.toString(),
    }
}

export const handleCreateFolder = (key, projectId, userId, token) => {
    console.log('CREATE NEW FOLDER:' + key);
    return dispatch => {
        axios.post(('/repoFiles/createFolder/'), {
            key: key, //np key: "nowyfolder/" lub "nowyfolder/innypodfolder/"
            projectId: projectId,
            userId: userId,
        }, {
            headers: {
                Authorization: 'Bearer ' + token
            },
        })
            .then(response => {
                console.log(response)
                dispatch(handleCreateFolderAction(response.data.key, response.data.message));
            })
            .catch(error => {
                dispatch(handleCreateFolderActionFailed(error));
            });
    }
}

//############################################
//#########tworzenie nowych plikow
//  TO DO: poki co nie ma mozliwosci wgrania plikow osobno do repo
// tylko przez usluge
//##############################################

export const handleCreateFilesAction = (files, prefix) => {
    return {
        type: actionTypes.REPO_CREATE_FILES,
        files: files,
        prefix: prefix,
    }
}

export const handleCreateFiles = (files, prefix) => {
    console.log('CREATE NEW FILES:' + files);
    return dispatch => {
        dispatch(handleCreateFilesAction(files, prefix));
    }
}

//#############################################
//######### zmiana nazwy folderu
//#############################################
export const handleRenameFolderAction = (oldKey, newKey, message) => {
    return {
        type: actionTypes.REPO_RENAME_FOLDER,
        oldKey: oldKey,
        newKey: newKey,
        message: message,
    }
}

export const handleRenameFolderActionFailed = (error) => {
    return {
        type: actionTypes.REPO_RENAME_FOLDER_FAILED,
        error: error.toString()
    }
}

export const handleRenameFolder = (oldKey, newKey, projectId, userId, token) => {
    //console.log('RENAME FOLDER:' + oldKey + ' into ' + newKey);
    //RENAME FOLDER:alaMaKota/ into alaMaKota222/
    return dispatch => {
        axios.put(('/repoFiles/renameFolder/'), {
            oldKey: oldKey, 
            newKey: newKey,
            userId: userId,
            projectId: projectId,
        }, {
            headers: {
                Authorization: 'Bearer ' + token
            },
        })
            .then(response => {
                console.log(response)
                //this.getProjectFilesForUser(userId, projectId, token);
                dispatch(handleRenameFolderAction(response.data.oldKey, response.data.newKey, response.data.message));
                //dispatch(handleRenameFolderAction(response.data.oldKey, response.data.newKey, response.data.message));
            })
            .catch(error => {
                dispatch(handleRenameFolderActionFailed(error));
            });
    }
}

//#####################################################
//################zmiana nazwy pliku/folderu
//################ takze przenoszenie pliku/folderu
//#####################################################
export const handleRenameFileAction = (oldKey, newKey, message) => {
    return {
        type: actionTypes.REPO_RENAME_FILE,
        oldKey: oldKey,
        newKey: newKey,
        message: message
    }
}

export const handleRenameFileActionFailed = (error) => {
    return {
        type: actionTypes.REPO_RENAME_FILE,
        error: error.toString()
    }
}

export const handleRenameFile = (oldKey, newKey, projectId, userId, token) => {
    console.log('RENAME FILE:' + oldKey + ' into ' + newKey);
    console.log('projectId:' + projectId );
    console.log('token:' + token );
    return dispatch => {
        axios.put(('/repoFiles/renameFile/'), {
            oldKey: oldKey, 
            newKey: newKey,
            projectId: projectId,
            userId: userId,
        }, {
            headers: {
                Authorization: 'Bearer ' + token
            },
        })
            .then(response => {
                console.log(response)
                dispatch(handleRenameFileAction(response.data.oldKey, response.data.newKey, response.data.message));
            })
            .catch(error => {
                dispatch(handleRenameFolderActionFailed(error));
            });
        
    }
}

//############################################
//########### usuwanie folderu ##############
//##########################################
export const handleDeleteFolderAction = (folderKey) => {
    return {
        type: actionTypes.REPO_DELETE_FOLDER,
        folderKey: folderKey,
    }
}

export const handleDeleteFolderActionFailed = (error) => {
    return {
        type: actionTypes.REPO_DELETE_FOLDER_FAILED,
        error: error.toString(),
    }
}
export const handleDeleteFolder = (folderKey, projectId, userId,token) => {
    console.log('DELETE FOLDER:' + folderKey);
    return dispatch => {
        axios.delete('/repoFiles/deleteFolder/', 
        {
            data: { 
                folderKey: folderKey,  
                projectId: projectId,
                userId: userId,
            },
            headers: {
               Authorization: 'Bearer ' + token
           } 
       })

           .then(response => {
               dispatch(handleDeleteFolderAction(response.data.folderKey));
           })
           .catch(error => {
               console.log(error)
               dispatch(handleDeleteFolderActionFailed(error));
           });

      
    }
}

//##############################################
//############# usuwanie pliku
//#############################################
export const handleDeleteFileAction = (fileKey, message) => {
    return {
        type: actionTypes.REPO_DELETE_FILE,
        fileKey: fileKey,
        message: message,
    }
}

export const handleDeleteFileActionFailed = (error) => {
    return {
        type: actionTypes.REPO_DELETE_FILE_FAILED,
        error: error.toString(),
    }
}

// #################################
// ###### Usuwanie pliku
// ############################
export const handleDownloadFileAction = (fileURL) => {
    return {
        type: actionTypes.REPO_DOWNLOAD_FILE,
        downloadedFile: fileURL,
    }
}

export const handleDownloadFile = (fileKey, projectId, userId, token) => {
    console.log(fileKey)
    return dispatch => {
        axios.get('/repoFiles/downloadFile/', {
            headers: {
                Authorization: 'Bearer ' + token
            },
            params: {
                fileKey: fileKey,
                projectId: projectId,
                userId: userId,
            }
        })
               .then(response => {
                    console.log(response)
                    let url = response.data.pathToDownload;
                    let nazwaPliku = url.split('/');
                    nazwaPliku = nazwaPliku[nazwaPliku.length -1];
                    
                    saveAs(url, nazwaPliku, { autoBom: true });

               })
               
               .catch(error => {
                   console.log(error)
                   //dispatch(handleDownloadFileActionError(error));
               });
    }
}

export const handleDeleteFile = (fileKey, projectId, userId, token) => {
    console.log('DELETE FILE:' + fileKey);
    return dispatch => {
            axios.delete('/repoFiles/deleteFile/', 
            {
                data: { 
                    fileKey: fileKey,
                    projectId: projectId,
                    userId: userId,
                 },
                headers: {
                   Authorization: 'Bearer ' + token
               } 
           })
               .then(response => {
                    dispatch(handleDeleteFileAction(response.data.fileKey, response.data.message));
               })
               .catch(error => {
                   console.log(error)
                   dispatch(handleDeleteFileActionFailed(error));
               });
    }
}

