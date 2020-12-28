import * as actionTypes from './actionsTypes';
import axios from 'axios';
import { saveAs } from 'file-saver';
//import { saveSync } from 'save-file';
//import streamSaver from 'StreamSaver';

// ############################################################
// ############## użytkownik pobrał korpus i można obliczyć go od nowa #################
// ###########################################################

export const korpusDownloaded = () => {
    return {
        type: actionTypes.KORPUS_DOWNLOADED,
    }
}

// ############################################################
// ############## Speech VAD #################
// ###########################################################

export const runSpeechVoiceActivityDetectionSuccess = (containerId, toolType, VADSegments) => {
    return {
        type: actionTypes.REPO_RUN_SPEECH_VAD_DONE,
        containerId: containerId,
        toolType: toolType,
        VADSegments: VADSegments,
    }
}

export const runSpeechVoiceActivityDetectionFailed = (containerId, toolType, message) => {
    return {
        type: actionTypes.REPO_RUN_SPEECH_VAD_FAILED,
        containerId: containerId,
        toolType: toolType,
        message: message,
    }
}

export const runSpeechVoiceActivityDetection = (container, token) => {
    
    return dispatch => {

        axios.put(('/repoFiles/runSpeechVAD/'+container._id), 
        {
           // containerId: container._id,
           // toolType: toolType,
        }, 
        {
            headers: {
                Authorization: 'Bearer ' + token
            },
        })
        .then(response => {
            dispatch(runSpeechVoiceActivityDetectionSuccess(response.data.containerId, response.data.toolType, response.data.VADSegments, response.data.message));
        })
        .catch(error => {
            const errorMessage = error.response.data.message;
            const containerId = error.response.data.containerId;
            const toolType = error.response.data.toolType;
            dispatch(runSpeechVoiceActivityDetectionFailed(containerId, toolType,errorMessage));
        }); 
    }
}

// ############################################################
// ############## Speech diarization #################
// ###########################################################

export const runSpeechDiarizationSuccess = (containerId, toolType, DIAsegments) => {
    return {
        type: actionTypes.REPO_RUN_SPEECH_DIARIZATION_DONE,
        containerId: containerId,
        toolType: toolType,
        DIAsegments: DIAsegments,
    }
}

export const runSpeechDiarizationFailed = (containerId, toolType, message) => {
    return {
        type: actionTypes.REPO_RUN_SPEECH_DIARIZATION_FAILED,
        containerId: containerId,
        toolType: toolType,
        message: message,
    }
}

export const runSpeechDiarization = (container, token) => {
    
    return dispatch => {

        axios.put(('/repoFiles/runSpeechDiarization/'+container._id), 
        {
            containerId: container._id,
            //toolType: toolType,
        }, 
        {
            headers: {
                Authorization: 'Bearer ' + token
            },
        })
        .then(response => {
            dispatch(runSpeechDiarizationSuccess(response.data.containerId, response.data.toolType, response.data.DIAsegments));
        })
        .catch(error => {
            const errorMessage = error.response.data.message;
            const containerId = error.response.data.containerId;
            const toolType = error.response.data.toolType;
            dispatch(runSpeechDiarizationFailed(containerId, toolType,errorMessage));
        }); 
    }
}


// ############################################################
// ############## Speech segmentation #################
// ###########################################################

export const runSpeechSegmentationSuccess = (message,containerId, toolType) => {
    return {
        type: actionTypes.REPO_RUN_SPEECH_SEGMENTATION_DONE,
        containerId: containerId,
        toolType: toolType,
        message: message,
    }
}

export const runSpeechSegmentationFailed = (message,containerId, toolType) => {


    return {
        type: actionTypes.REPO_RUN_SPEECH_SEGMENTATION_FAILED,
        containerId: containerId,
        toolType: toolType,
        message: message,
    }
}

export const runSpeechSegmentation = (container, token) => {
    
    return dispatch => {

        axios.put(('/repoFiles/runSpeechSegmentation/'+container._id), 
        {
            containerId: container._id,
           // toolType: toolType,
        }, 
        {
            headers: {
                Authorization: 'Bearer ' + token
            },
        })
        .then(response => {
            dispatch(runSpeechSegmentationSuccess(response.message,container._id, response.data.toolType));
        })
        .catch((error) => {
            const errorMessage = error.response.data.message;
            const containerId = error.response.data.containerId;
            const toolType = error.response.data.toolType;

            dispatch(runSpeechSegmentationFailed(errorMessage,containerId, toolType));
        }); 
    }
}


// ############################################################
// ############## Ukończenie wykonywania speech recognition #################
// ###########################################################

export const runSpeechRecognitionSuccess = (containerId, toolType) => {
    return {
        type: actionTypes.REPO_RUN_SPEECH_RECOGNITION_DONE,
        containerId: containerId,
        toolType: toolType,
    }
}

export const runSpeechRecognitionFailed = (containerId, toolType, messsage) => {
    return {
        type: actionTypes.REPO_RUN_SPEECH_RECOGNITION_FAILED,
        containerId: containerId,
        toolType: toolType,
        messsage: messsage,
    }
}

export const runSpeechRecognition = (container, token) => {
    
    return dispatch => {


        axios.put(('/repoFiles/runSpeechRecognition/'+container._id), 
        {
            containerId: container._id,
            //toolType: toolType,
        }, 
        {
            headers: {
                Authorization: 'Bearer ' + token
            },
        })
        .then(response => {
            dispatch(runSpeechRecognitionSuccess(container._id, response.data.toolType));
        })
        .catch(error => {
            let errorMessage;
            let containerId;
            let toolType;
            if(error.response){
                errorMessage = error.response.data.message;
                containerId = error.response.data.containerId;
                toolType = error.response.data.toolType;
            } else {
                errorMessage = "Coś poszło nie tak z rozpoznawaniem mowy";
                containerId = container._id;
                toolType = "REC";
            }
            dispatch(runSpeechRecognitionFailed(containerId, toolType, errorMessage));
        }); 
    }
}

//############################################################
// ############## zmienia status contanera #################
// ###########################################################

export const setContainerStatus = (containerId, toolType, status) => {


    return {
        type: actionTypes.SET_CONTAINER_STATUS,
        containerId: containerId,
        toolType: toolType,
        status: status,
    }
}


//############################################################
// ############## zmienia status wpisu contanera dodanego do reco #################
// ###########################################################

/*
export const setToolItemStatus = (containerId, toolType, status) => {
    return {
        type: actionTypes.SET_TOOL_ITEM_STATUS,
        containerId: containerId,
        toolType: toolType,
        status: status,
    }
}
*/


//############################################################
// ############## usuwanie containera z repo #################
// ###########################################################

export const removeContainerFromRepoSuccess = (message, sessionId, containerId) => {
    return {
        type: actionTypes.REPO_DELETE_CONTAINER_SUCCESS,
        message: message,
        sessionId: sessionId,
        containerId: containerId,
    }
}

export const removeContainerFromRepoFailed = (error) => {
    return {
        type: actionTypes.REPO_DELETE_CONTAINER_FAILED,
        error: error,
    }
}

export const removeContainerFromRepo = (userId, projectId, sessionId, containerId,token) => {
    return dispatch => {

        axios.delete(('/repoFiles/delete/'+containerId), 
        {
            headers: {
                Authorization: 'Bearer ' + token
            },
        })
        .then(response => {
            dispatch(removeContainerFromRepoSuccess(response.data.message, response.data.sessionId, response.data.containerId));
        })
        .catch(error => {
            dispatch(removeContainerFromRepoFailed(error));
        }); 
    }
}

// ###########################################################
// ############## zmiana nazwy contenera w repo ############## OK
// ###########################################################

export const changeContainerNameSuccess = (containerId) => {
    return {
        type: actionTypes.REPO_CHANGE_CONTAINER_NAME_SUCCESS,
        containerId: containerId,
    }
}

export const changeContainerNameFailed = (error) => {
    return {
        type: actionTypes.REPO_CHANGE_CONTAINER_NAME_FAILED,
        error: error,
    }
}


export const changeContainerName = (container, text, token) => {
    return dispatch => {

        //const projectId = container.project;
        //const userId = container.owner;
        const containerId = container._id;

        axios.put(('/repoFiles/changeContainerName/'+containerId), 
        {
            newName: text
        },
        {
            headers: {
                Authorization: 'Bearer ' + token
            },
        })
        .then(response => {
            dispatch(changeContainerNameSuccess(response.data.containerId));
        })
        .catch(error => {
            dispatch(changeContainerNameFailed(error));
        }); 
      
    }
}


//############################################################
// ############## usuwanie sesji z repo #################
// ###########################################################

export const removeSessionFromRepoSuccess = (message, sessionId) => {
    return {
        type: actionTypes.REPO_DELETE_SESSION_SUCCESS,
        message: message,
        sessionId: sessionId,
    }
}

export const removeSessionFromRepoFailed = (error) => {
    return {
        type: actionTypes.REPO_DELETE_SESSION_FAILED,
        error: error,
    }
}

export const removeSessionFromRepo = (userId, projectId, sessionId,token) => {
    return dispatch => {

        axios.delete(('/repoFiles/deleteSession/'+sessionId), 
        {
            headers: {
                Authorization: 'Bearer ' + token
            },
        })
        .then(response => {
            dispatch(removeSessionFromRepoSuccess(response.data.message, response.data.sessionId));
        })
        .catch(error => {
            dispatch(removeSessionFromRepoFailed(error));
        }); 
    }
}






// ############################################################
// ################ pobieranie sesji projektu #################
// ############################################################
/*
export const getRepoAssetsSuccess = (userId, sessions, containers) => {
    return {
        type: actionTypes.REPO_GET_USER_PROJECT_FILES,
        sessions: sessions,
        containers: containers,
    }
}

export const getRepoAssetsFailed = (error) => {
    return {
        type: actionTypes.REPO_GET_USER_PROJECT_FILES_FAILED,
        error: error,
    }
}

// pobieram liste plikow w katalogu uzytkownika dla danego projektu
export const getRepoAssets = (userId, projectId, token) => {
    return dispatch => {

        //console.log("wysyłam getProjectAssets")
        axios.get(('/repoFiles/getProjectAssets/' + projectId), {
            headers: {
                Authorization: 'Bearer ' + token
            },
        })
        .then(response => {
            dispatch(getRepoAssetsSuccess(userId, response.data.sessions, response.data.containers));
        })
        .catch(error => {
            dispatch(getRepoAssetsFailed(error));
        });
    }
}
*/


// ############################################################
// ####################### tworzenie nowej sesji ##############
// ############################################################

export const createNewSession = (sessionName, projectId, userId, token) => {
    return dispatch => {

        axios.put('/repoFiles/createNewSession',
            {
                sessionName: sessionName,
                projectId: projectId,
                userId: userId,
            }, 
            {
                headers: {
                    Authorization: 'Bearer ' + token
                
                },
            }
        )
        .then(sessionData => {
           let createdSessionName = sessionData.data.sessionName;
           let createdSessionId = sessionData.data.id;
           dispatch(createNewSessionDone(createdSessionName,createdSessionId));
        })
        .catch(error => {
            dispatch(createNewSessionFailed(error));
        });
    }
}

export const createNewSessionDone = (sessionName, sessionId) => {
    return {
        type: actionTypes.REPO_CREATE_NEW_SESSION,
        sessionName: sessionName,
        sessionId: sessionId,
    }
}

export const createNewSessionFailed = (error) => {
    return {
        type: actionTypes.REPO_CREATE_NEW_SESSION_FAILED,
        errorMessage: error,
    }
}


// ########################################################
// ################## zazbaczanie w repo #####################
// ##########################################################

export const selectSession = (sessionId) =>{
    return {
        type: actionTypes.REPO_SELECT_SESSION,
        sessionId: sessionId,
    }
}

export const selectContainer = (containerId) => {
    return {
        type: actionTypes.REPO_SELECT_CONTAINER,
        containerId: containerId,
    }
}



//#################################################################
//############## get user project files ######################
//####################################################

export const getProjectFilesForUserAction = (userId, sessions, containers) => {
    return {
        type: actionTypes.REPO_GET_USER_PROJECT_FILES,
        sessions: sessions,
        containers: containers,
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
    return dispatch => {
       
        axios.get(('/repoFiles/getProjectAssets/' + projectId ), {
            headers: {
                Authorization: 'Bearer ' + token
            },
        })
            .then(response => {
                dispatch(getProjectFilesForUserAction(userId, response.data.sessions, response.data.containers));
            })
            .catch(error => {
                dispatch(getProjectFilesForUserActionFailed(error));
            });
    }
}



// #################################
// ###### Export To EMU
// ############################

export const exportToEMUFailed = (message) => {
    return {
        type: actionTypes.EXPORT_TO_EMU_DONE_FAILED,
        message: message,
    }
}

export const exportToEMUSuccess = (message) => {
    return {
        type: actionTypes.EXPORT_TO_EMU_DONE_SUCCESS,
        message: message,
    }
}


//it initializes creating corpus on the serwer
export const exportToEMU = (projectId, userId, token) => {
    console.log("Export to emu");
    return dispatch => {
        axios.get('/repoFiles/exportToEmu/'+userId+'/'+projectId, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then(response => {
            console.log(response)

            //jak jest gotowy to go ściągam
           // this.downloadCorpus(projectId, userId, token);

            dispatch(exportToEMUSuccess(response.data.message));
        })
        .catch(error => {
            console.log(error)
            dispatch(exportToEMUFailed(error.message));
        });
    }
}


//#####################################################################################
//#####################################################################################
//#####################################################################################
//#####################################################################################
//#####################################################################################
//####################### to pod spodem to kopia ze starej biblioteki ###############
//#####################################################################################





//#################################################################
//############# upload plików do repo ############################
//################################################################



export const uploadFilesFinish = () =>{
    return {
        type: actionTypes.REPO_UPLOAD_FILES_FINISH,
    }
}

export const uploadFilesInit = () =>{
    return {
        type: actionTypes.REPO_UPLOAD_FILES_INIT,
    }
}

export const uploadFilesFailed = (message) =>{
    return {
        type: actionTypes.REPO_UPLOAD_FILES_FAILED,
        message: message
    }
}

export const uploadFilesSuccess = (message) =>{
    return {
        type: actionTypes.REPO_UPLOAD_FILES_SUCCESS,
        message: message,
    }
}

export const changeUploadProgress = (percent) => {
    return {
        type: actionTypes.REPO_UPLOAD_FILES_PROGRESS,
        percent: percent,
    }
}

export const uploadFilesModalOpen = () => {
    return {
        type: actionTypes.REPO_UPLOAD_FILES_MODAL_OPEN,
    }
}

export const uploadFiles = (fileList,folderKey,userId, projectId, token) => {
    return dispatch => {

        
        const data = new FormData()

        for(var x = 0; x < fileList.length; x++){
            data.append('audioFiles', fileList[x]);
        }

       // console.log(userId)
       // console.log(projectId)

        data.append('folderKey', folderKey);
        data.append('userId', userId);
        data.append('projectId', projectId);

        dispatch(uploadFilesInit());
        

        axios.post('/repoFiles/uploadFiles', data, 
        {
            headers: {
                Authorization: 'Bearer ' + token,
                'content-type': 'multipart/form-data',
            },

            onUploadProgress: ProgressEvent => {
                let percent = ProgressEvent.loaded / ProgressEvent.total*100;

                dispatch(changeUploadProgress(percent));

                if(percent===100){
                    dispatch(uploadFilesFinish());
                }
            }
        })
        .then(response => {
            console.log(response)
            dispatch(uploadFilesSuccess(response.message));
        })
        .catch(error => {
            console.log(error)
            dispatch(uploadFilesFailed(error.message));
        });

        //tutaj powinniśmy zwrócić z serwera listę plikow z serwera któ©e zostały dodane
        // let files = [
        //         {
        //         key: '/lalala/test.wav',
        //         modified: 1567318077468,
        //         size: 250496,
        //         url: 'http://localhost:1234/5d1db8a1ceb24447d9cdda0c/5d6b603c5be78a2d10b5f2a7/demo_files/test.wav',
        //         relativeKey: '/lalala/test.wav'
        //       },
        //       {
        //         key: '/koty/',
        //         modified: 1567318077404,
        //         size: 4096,
        //         url: 'http://localhost:1234/5d1db8a1ceb24447d9cdda0c/5d6b603c5be78a2d10b5f2a7/my_files/',
        //         relativeKey: '/koty/'
        //       }

        //     ];

        // dispatch(uploadFilesSuccess(files));
    }
}



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



//#########################################
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



