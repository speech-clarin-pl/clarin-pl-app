import * as actionTypes from '../../store/actions/actionsTypes';
//import Moment from 'moment';
import { updateObject, convertArrayToObject, getIdsArray } from '../utility';
import produce from "immer";
//import { loadContainerForPreview } from '../actions';
//import { updateContainerFlag } from '../actions';


// const initialState = {

//     errorMessage: "",
//     iferror: false,


//     currentlySelectedSessions: [],
//     currentlySelectedContainers: [],

//     sessions : {
//         byId : {
//             "idSesji1" : {
//                 id : "idSesji1",
//                 sessionName : "sesja 1",
//                 ifSelected : false,
//                 containers : ["idContainer1", "idContainer2"]
//             },
//             "idSesji2" : {
//                 id : "idSesji2",
//                 sessionName : "sesja 2",
//                 ifSelected : false,
//                 containers : ["idContainer3"]
//             },
//             "idSesji3" : {
//                 id : "idSesji3",
//                 sessionName : "sesja 3",
//                 ifSelected : false,
//                 containers : []
//             },
//         },
//         allIds : ["idSesji1", "idSesji2","idSesji3"]
//     },
//     containers : {
//         byId : {
//             "idContainer1" : {
//                 id : "idContainer1",
//                 containerName: 'jakis plik 1',
//                 size: 1.5 * 1024 * 1024,
//                 ifSelected: false,
//                 session: "idSesji1",
//                 ifAudio: true,
//                 ifVAD: true,
//                 ifDIA: true,
//                 ifREC: true,
//                 ifSEG: true,
//             },
//             "idContainer2" : {
//                 id : "idContainer2",
//                 containerName: 'jakis plik 2',
//                 size: 1.5 * 1024 * 1024,
//                 ifSelected: false,
//                 session: "idSesji1",
//                 ifAudio: true,
//                 ifVAD: true,
//                 ifDIA: true,
//                 ifREC: true,
//                 ifSEG: true,
//             },
//             "idContainer3" : {
//                 id : "idContainer3",
//                 containerName: 'jakis plik 3',
//                 size: 1.5 * 1024 * 1024,
//                 ifSelected: false,
//                 session: "idSesji2",
//                 ifAudio: true,
//                 ifVAD: true,
//                 ifDIA: true,
//                 ifREC: true,
//                 ifSEG: true,
//             },
//         },
//         allIds : ["idContainer1", "idContainer2", "idContainer3"]
//     },
//         txtFiles : {
    //         byId : {
    //             "txtId1" : {
    //                 id : "txtId1",
    //                 txtFileName: 'jakis plik 1',
    //                 size: 1.5 * 1024 * 1024,
    //                 containerId: "idSesji1",
    //             },
    //             "txtId2" : {
    //                 id : "txtId2",
    //                 containerName: 'jakis plik 2',
    //                 size: 1.5 * 1024 * 1024,
    //                 containerId: "idSesji1",
    //             },
    //         },
    //         allIds : ["idContainer1", "idContainer2", "idContainer3"]
    //     },
// }




const initialState = {

    message: "",
    iferror: false,

    currentlySelectedSessions: [],
    currentlySelectedContainers: [],

    sessions : {
        byId : {},
        allIds : []
    },
    containers : {
        byId : {},
        allIds : []
    },
    txtFiles: {
        byId: {},
        allIds: {}
    },

    containerBinaryPreviewREC: null,
    containerBinaryPreviewVAD: null,
    containerBinaryPreviewDIA: null,
    containerBinaryPreviewSEG: null,

    containerAudioFileREC: null,
    containerAudioFileVAD: null,
    containerAudioFileDIA: null,
    containerAudioFileSEG: null,

    exportToEmuReady: false,

}

// ##################################################
// ######### changes the status of given container ##########
// ###############################################
const changeContainerStatus = (state, action) => {
    
        const containerId = action.containerId;
        const toolType = action.toolType; 
        const newStatus = action.status;
    
        const nextState = produce(state, draftState => {
    
            switch(toolType){
                case "DIA":
                    draftState.containers.byId[containerId].statusDIA = newStatus;
                    break;
                case "VAD":
                    draftState.containers.byId[containerId].statusVAD = newStatus;
                    break;
                case "REC":
                    draftState.containers.byId[containerId].statusREC = newStatus;
                    break;
                case "SEG":
                    draftState.containers.byId[containerId].statusSEG = newStatus;
                    break;
                default:
                    console.log("Default"); //to do
            }
    
       })
    
       return nextState;

}


// ##################################################
// ######### it loads binary for preview ##########
// ###############################################

const loadAudioForPreview = (state, action) => {
    
    const containerAudioFile = action.containerAudioFile;
    const toolType = action.toolType;

    const nextState = produce(state, draftState => {
        switch(toolType){
            case "DIA":
                draftState.containerAudioFileDIA = containerAudioFile;
                break;
            case "VAD":
                draftState.containerAudioFileVAD = containerAudioFile;
                break;
            case "REC":
                draftState.containerAudioFileREC = containerAudioFile;
                break;
            case "SEG":
                draftState.containerAudioFileSEG = containerAudioFile;
                break;
            default:
                console.log("Default"); //to do
        }
   })

   return nextState;
    
}





// ##################################################
// ######### it loads binary for preview ##########
// ###############################################

const loadBinaryForPreview = (state, action) => {
    
    const containerBinaryData = action.containerBinaryData;
    const toolType = action.toolType;

    const nextState = produce(state, draftState => {
        switch(toolType){
            case "DIA":
                draftState.containerBinaryPreviewDIA = containerBinaryData;
                break;
            case "VAD":
                draftState.containerBinaryPreviewVAD = containerBinaryData;
                break;
            case "REC":
                draftState.containerBinaryPreviewREC = containerBinaryData;
                break;
            case "SEG":
                draftState.containerBinaryPreviewSEG = containerBinaryData;
                break;
            default:
                console.log("Default"); //to do
        }
   })

   return nextState;
    
}


// #############################################
// #### update Flagi danego kontenera po pomyślnym wykonaniu danej usługi ###########
//##############################################

const speechVADSuccess = (state, action) => {
    const containerId = action.containerId;
    const toolType = action.toolType; 
    const VADSegments = action.VADSegments;

    const nextState = produce(state, draftState => {
        draftState.containers.byId[containerId].ifVAD = true;
        draftState.containers.byId[containerId].statusVAD = 'ready';
        draftState.containers.byId[containerId].VADUserSegments = VADSegments;
   })  

   return nextState;

}


const speechVADFailed = (state, action) => {

    const containerId = action.containerId;
    const toolType = action.toolType; 

    const nextState = produce(state, draftState => {
        draftState.containers.byId[containerId].ifVAD = false;
        draftState.containers.byId[containerId].statusVAD = 'error';

   })

   return nextState;

}

// #############################################
// #### update Flagi danego kontenera po pomyślnym wykonaniu danej usługi ###########
//##############################################

const speechDiarizationSuccess = (state, action) => {
    const containerId = action.containerId;
    const toolType = action.toolType; 

    const nextState = produce(state, draftState => {
        draftState.containers.byId[containerId].ifDIA = true;
        draftState.containers.byId[containerId].statusDIA = 'ready';

   })

   return nextState;

}


const speechDiarizationFailed = (state, action) => {

    const containerId = action.containerId;
    const toolType = action.toolType; 

    const nextState = produce(state, draftState => {
        draftState.containers.byId[containerId].ifDIA = false;
        draftState.containers.byId[containerId].statusDIA = 'error';

   })

   return nextState;

}


// #############################################
// #### update Flagi danego kontenera po pomyślnym wykonaniu danej usługi ###########
//##############################################

const speechSegmentationDone = (state, action) => {
    const containerId = action.containerId;
    const toolType = action.toolType; 
    const message = action.message;

    const nextState = produce(state, draftState => {
        draftState.containers.byId[containerId].ifSEG = true;
        draftState.containers.byId[containerId].statusSEG = 'ready';

   })

   return nextState;

}


const speechSegmentationFailed = (state, action) => {

    const containerId = action.containerId;
    const toolType = action.toolType; 
    const message = action.message;

    const nextState = produce(state, draftState => {
        draftState.containers.byId[containerId].ifSEG = false;
        draftState.containers.byId[containerId].statusSEG = 'error';
        draftState.containers.byId[containerId].errorMessage = message;
   })

   return nextState;

}

const speechRecognitionDone = (state, action) => {
    const containerId = action.containerId;
    const toolType = action.toolType; 

    const nextState = produce(state, draftState => {

        draftState.containers.byId[containerId].ifREC = true;
        draftState.containers.byId[containerId].statusREC = 'ready';

   })

   return nextState;

}


const speechRecognitionFailed = (state, action) => {

    const containerId = action.containerId;
    const toolType = action.toolType; 

    const nextState = produce(state, draftState => {

        draftState.containers.byId[containerId].ifREC = false;
        draftState.containers.byId[containerId].statusREC = 'error';

   })

   return nextState;

}


// #############################################
// #### usuniecie pojedynczego sesji ###########
//##############################################

const repoRemoveSessionSuccess = (state, action) => {
    const message = action.message;
    const sessionId = action.sessionId;  // sesja którą chcemy usunąć

    console.log(sessionId)

    const nextState = produce(state, draftState => {

        //zapisuje liste contenerów które też trzeba usunąć
        let conteneryDoUsuniecia = state.sessions.byId[sessionId].containers;

        console.log(conteneryDoUsuniecia)

        
        //usuwam samą sesje
        let newSessions = Object.keys(state.sessions.byId).reduce((object, key) => {
            if(key !== sessionId){
                object[key] = state.sessions.byId[key];
            }
            return object
        },{});

         draftState.sessions.byId = newSessions;

         console.log(newSessions)

         //usuwam teraz kontenery

          //usuwam kontener z listy kontenerow
        let newContainers = Object.keys(state.containers.byId).reduce((object, key) => {
            if(conteneryDoUsuniecia.includes(key)==false){
                object[key] = state.containers.byId[key];
            }
            return object
          
        },{});

         draftState.containers.byId = newContainers;

         console.log(newContainers)
        
         //jezeli byly zaznaczone to odznaczam
         draftState.currentlySelectedSessions[0] = null;
         draftState.currentlySelectedContainers[0] = null;

   })

   return nextState;
    
}


const repoRemoveSessionFailed = (state, action) => {

    const message = action.error.message;
  
    const nextState = produce(state, draftState => {

        draftState.message = message;
        draftState.iferror = true;
        
   })

   return nextState;
    
}



// #############################################
// #### usuniecie pojedynczego kontenera ###########
//##############################################

const repoRemoveContainerSuccess = (state, action) => {
    const message = action.message;
    const sessionId = action.sessionId;  // sesja z którego jest usuwany
    const containerId = action.containerId; //kontener do usuniecia

    // musze usunac ten kontener z containers oraz znalezc sesje do ktorej naleza i tez tam
    // usunac referencje do tego kontenera

    const nextState = produce(state, draftState => {

        //usuwam ten kontener z listy sesji
        let newlistconts = state.sessions.byId[sessionId].containers.filter((value, index, arr)=>{
           return value != containerId;
         })

         draftState.sessions.byId[sessionId].containers = newlistconts;

         //usuwam kontener z listy kontenerow
        let newContainers = Object.keys(state.containers.byId).reduce((object, key) => {
            if(key !== containerId) {
                object[key] = state.containers.byId[key];
            }
            return object
        },{});

         draftState.containers.byId = newContainers;

         //jezeli byly zaznaczone to odznaczam
         draftState.currentlySelectedSessions[0] = null;
         draftState.currentlySelectedContainers[0] = null;

   })

   return nextState;

    
}


const repoRemoveContainerFailed = (state, action) => {

    const message = action.error.message;
  
    const nextState = produce(state, draftState => {

        draftState.message = message;
        draftState.iferror = true;
        
   })

   return nextState;
    
}

// #############################################
// ############### tworze nową sesje ###########
//##############################################

const repoCreateSession = (state, action) => {
    const sessionName = action.sessionName;
    const sessionId = action.sessionId;

   const nextState = produce(state, draftState => {

        draftState.sessions.byId = {
            ...draftState.sessions.byId,
            [sessionId]: {
                id : sessionId,
                sessionName : sessionName,
                ifSelected : false,
                containers : []
            },
        };
       draftState.sessions.allIds.push(sessionId);

   })

   return nextState;
}

const repoCreateSessionFailes = (state, action) => {
    const message = action.errorMessage;

    const nextState = produce(state, draftState => {
        draftState.ifError = true;
        draftState.message = message;
    })

    return nextState;
}

//######################################################
//########## pobieram liste sesji i kontenerow uzytkownika ################
//######################################################

const repoGetUserProjectFiles = (state, action) => {

    const sessions = action.sessions;
    const containers = action.containers;

    const nextState = produce(state, draftState => {

            draftState.sessions.byId = convertArrayToObject(sessions,'id');
            draftState.sessions.allIds = getIdsArray(sessions);

            draftState.containers.byId = convertArrayToObject(containers,'_id');
            draftState.containers.allIds = getIdsArray(containers);

    })

    return nextState;

}

const repoGetUserProjectFilesFailed = (state, action) => {
     const error = action.error.toString();
     return updateObject(state,
         {message: error,
          iferror: true});
}

const deselectAll = (objects) => {
    for (var item in objects) {
        if (objects.hasOwnProperty(item)) {
            if(item.ifSelected) {
                item.ifSelected = false;
            }
        }
    }
    return objects;
}


const repoSelectContainer = (state,action) => {
    
    // jeżeli jest null to znaczy że chce odznaczyć wszystko
    let containerId = action.containerId;
 
    const nextState = produce(state, draftState => {

        let allContainers = draftState.containers.byId;
        let allSessions = draftState.sessions.byId;

        //zapisuje poprzednio zaznaczony aby odznaczyc
        let previouslySelectedCont = draftState.currentlySelectedContainers[0];

        //jezeli kliknalem to samo to robie toogle
        if(containerId == previouslySelectedCont){
            
            draftState.currentlySelectedContainers[0] = null;
            allContainers[previouslySelectedCont].ifSelected = false;
        } else {
            if(containerId){
                draftState.currentlySelectedContainers[0] = containerId;
                allContainers[containerId].ifSelected = true;
            
                //odznaczam poprzendio zaznaczony o ile nie był pusty
                if(previouslySelectedCont){
                   allContainers[previouslySelectedCont].ifSelected = false;
                }

                //odznaczam również sesje o ile byla jakas zaznaczona
                let ktorasesjazaznaczone = draftState.currentlySelectedSessions[0];
                if(ktorasesjazaznaczone != null){
                     allSessions[ktorasesjazaznaczone].ifSelected = false;
                     draftState.currentlySelectedSessions[0] = null;
                }
               
        
            } else {
                if(previouslySelectedCont){
                    //allContainers[previouslySelectedCont].ifSelected = false;
                    draftState.currentlySelectedContainers[0] = null;
                    allContainers[containerId].ifSelected = false;
                }
            }
        }
    })

    return nextState;
 
}

// do zaznaczania folderów sesji w repo
const repoSelectSession = (state, action) => {

    let sessionId = action.sessionId;

    const nextState = produce(state, draftState => {

        let allContainers = draftState.containers.byId;
        let allSessions = draftState.sessions.byId;

        //zapisuje poprzednio zaznaczony aby odznaczyc

        //if(draftState.currentlySelectedContainers.length > 0){

                let previouslySelectedSess = draftState.currentlySelectedSessions[0];
                let previouslySelectedCont = draftState.currentlySelectedContainers[0];

                //jeżeli kliknąłem z zaznaczoną to odznaczam
                if(sessionId == previouslySelectedSess){
                    allSessions[sessionId].ifSelected = false;
                    draftState.currentlySelectedSessions[0] = null;
                } else {
                    draftState.currentlySelectedSessions[0] = sessionId;
                    allSessions[sessionId].ifSelected = true;

                    //odznaczam również contenery o ile byly jakies zaznaczone
                    let ktorezaznaczonecontenery = draftState.currentlySelectedContainers[0];
                    if(allContainers[ktorezaznaczonecontenery] !== undefined){
                        console.log(ktorezaznaczonecontenery)
                        console.log(allContainers[ktorezaznaczonecontenery])
                        
                        allContainers[ktorezaznaczonecontenery].ifSelected = false;
                        draftState.currentlySelectedContainers[0] = null;
                    }

                    //odznaczam poprzendio zaznaczony o ile nie był pusty
                    if(allSessions[previouslySelectedSess] != null ){
                        allSessions[previouslySelectedSess].ifSelected = false;
                    }
                }
        //}
    })

    return nextState;
    
}


const saveTranscriptionSuccess = (state, action) => {
    
    const containerId = action.containerId;
    const toolType = action.toolType;

    const nextState = produce(state, draftState => {
        draftState.containers.byId[containerId].ifREC = true;
        draftState.containers.byId[containerId].statusREC = 'ready';

   })

   return nextState;  

}

const exportToEmuFailed = (state, action) => {


    const nextState = produce(state, draftState => {
        draftState.exportToEmuReady = false;
   })

   return nextState; 
    
}

const exportToEmuDone = (state, action) => {


    const nextState = produce(state, draftState => {
        draftState.exportToEmuReady = true;
   })

   return nextState; 
    
}

const korpusDownloaded = (state, action) => {

    const nextState = produce(state, draftState => {
        draftState.exportToEmuReady = false;
   })

   return nextState; 
    
}




//############################### pod spodem sa stare akcje
//#############################
//#############################
//#############################
//#############################
//#############################
//#############################
//#############################

//##########################################
//############ tworzenie nowego folderu
//#########################################

const repoCreateFolder = (state, action) => {

    // const key = action.key;

    // const newfiles = state.files.concat([{key: key, }]);

    // return updateObject(state,
    //     {files: newfiles});

    // // handleCreateFolder = (key) => {
    //     //     this.setState(state => {
    //     //       state.files = state.files.concat([{
    //     //         key: key,
    //     //       }])
    //     //       return state
    //     //     })
    //     //   }
}

const repoCreateFiles = (state, action) => {

    // const files = action.files;
    // const prefix = action.prefix;
   
    // return updateObject(state,
    //     {});

         // handleCreateFiles = (files, prefix) => {
	// 	this.setState(state => {
	// 	  const newFiles = files.map((file) => {
	// 		let newKey = prefix
	// 		if (prefix !== '' && prefix.substring(prefix.length - 1, prefix.length) !== '/') {
	// 		  newKey += '/'
	// 		}
	// 		newKey += file.name
	// 		return {
	// 		  key: newKey,
	// 		  size: file.size,
	// 		  modified: +Moment(),
	// 		}
	// 	  })
	
	// 	  const uniqueNewFiles = []
	// 	  newFiles.map((newFile) => {
	// 		let exists = false
	// 		state.files.map((existingFile) => {
	// 		  if (existingFile.key === newFile.key) {
	// 			exists = true
	// 		  }
	// 		})
	// 		if (!exists) {
	// 		  uniqueNewFiles.push(newFile)
	// 		}
	// 	  })
	// 	  state.files = state.files.concat(uniqueNewFiles)
	// 	  return state
	// 	})
	//   }
}


//##########################################
//############ zmiana nazwy folderu w repo
//#########################################

const repoRenameFolder = (state, action) => {

    // const oldKey = action.oldKey;
    // const newKey = action.newKey;

    // console.log('ZMIOANA NAZWY FOLDERU')

    // const newFiles = [];
    // state.files.map((file) => {

    //     if(oldKey !== newKey){
    //         newFiles.push({
    //             ...file,
    //             key: file.key.replace(oldKey, newKey),
    //             modified: +Moment(),
    //         })
    //     }
    // })
    
    // return updateObject(state,
    //     {files: newFiles});
    

    // handleRenameFolder = (oldKey, newKey) => {
	// 	this.setState(state => {
	// 	  const newFiles = []
	// 	  state.files.map((file) => {
	// 		if (file.key.substr(0, oldKey.length) === oldKey) {
	// 		  newFiles.push({
	// 			...file,
	// 			key: file.key.replace(oldKey, newKey),
	// 			modified: +Moment(),
	// 		  })
	// 		} else {
	// 		  newFiles.push(file)
	// 		}
	// 	  })
	// 	  state.files = newFiles
	// 	  return state
	// 	})
	//   }
}

//##########################################
//############ zmiana nazwy pliku w repo
//#########################################

const repoRenameFile = (state, action) => {

    // const oldKey = action.oldKey;
    // const newKey = action.newKey;

    // const newFiles = [];
    
    // state.files.map((file) => {
	// 	if (file.key === oldKey) {
	// 		newFiles.push({
    //             ...file,
    //             key: newKey,
    //             modified: +Moment(),
	// 		})
	// 	} else {
	// 		  newFiles.push(file)
	// 		}
	// 	})
		

    // return updateObject(state,
    //     {files: newFiles});

}

//##########################################
//############ usuwanie folderow z repo
//#########################################

const repoDeleteFolder = (state, action) => {

    // const folderKey = action.folderKey;

    // const newFiles = [];
    // state.files.map((file) => {
    //     if (file.key.substr(0, folderKey.length) !== folderKey) {
    //         newFiles.push(file)
    //     }
    // })
    
    // return updateObject(state,
    //     {files: newFiles});
}


//##########################################
//############ usuwanie plikow z repo ######
//##########################################

const repoDeleteFile = (state, action) => {

    // const fileKey = action.fileKey;

    // const newFiles = [];
    // state.files.map((file) => {
    //     if (file.key !== fileKey) {
    //         newFiles.push(file)
    //     } else {
    //         //jezeli jest usuniety z folderu to musze posotawic folder
    //         let n = fileKey.lastIndexOf("/");
    //         //to oznacza ze plik jest w jakim podfoldrze
    //         if(n > 1){
    //            //wtedy zwracam tylko sam folder - bez pliku w nim
    //            console.log(file)
    //            let onlyFolders = file.key.substring(0,n+1);
    //            console.log(onlyFolders)
    //            file.key = onlyFolders;
    //            newFiles.push(file);
    //         }
    //     }
    // })
  
    // return updateObject(state,
    //     {files: newFiles});
}



const repoDownloadFile = (state,action) => {
    // return updateObject(state,
    //     {downloadedFile: action.downloadedFile});
}

const repoEditFileSuccess = (state,action) => {
    // return updateObject(state,
    //     {editTxtFileOK: true});
}

const repoEditFileFailed = (state,action) => {
    // return updateObject(state,
    //     {editTxtFileOK: false});
}

//###################### upload plikow do repo ################
//##############################################################
const repoUploadFilesFinish = (state,action) => {
    
    // return updateObject(state,
    //     {
    //         uploadFilesDone: false,
    //         //uploadProgress: 0,
    //     });
}

const repoUploadFilesInit = (state,action) => {
    
    // return updateObject(state,
    //     {
    //         uploadFilesDone: false,
    //         uploadBtnDisabled: true,
    //         //uploadProgress: 0,
    //     });
}

const repoUploadFilesSuccess = (state,action) => {
    
    // return updateObject(state,
    //     {
    //         uploadFilesDone: true,
    //         uploadBtnDisabled: false,
    //         //uploadProgress: 0,
    //     });
}

const repoUploadFilesFailed = (state,action) => {
    // return updateObject(state,
    //     {
    //         uploadFilesDone: false,
    //         uploadBtnDisabled: false,
    //        // uploadProgress: 0,
    //     });
}

const repoUploadProgress = (state,action) => {
    // return updateObject(state,
    //     {
    //         uploadProgress: action.percent,
    //     });
}

const repoUploadFilesModalOpen = (state,action) => {
    // return updateObject(state,
    //     {
    //         uploadProgress: 0,
    //     });
}




const repoPanelReducer = (state = initialState, action) => {
    switch(action.type){

        case actionTypes.SET_CONTAINER_STATUS: return changeContainerStatus(state,action);

        case actionTypes.REPO_RUN_SPEECH_RECOGNITION_DONE: return speechRecognitionDone(state,action);
        case actionTypes.REPO_RUN_SPEECH_RECOGNITION_FAILED: return speechRecognitionFailed(state,action);

        case actionTypes.REPO_RUN_SPEECH_SEGMENTATION_DONE: return speechSegmentationDone(state,action);
        case actionTypes.REPO_RUN_SPEECH_SEGMENTATION_FAILED: return speechSegmentationFailed(state,action);

        case actionTypes.REPO_RUN_SPEECH_DIARIZATION_DONE: return speechDiarizationSuccess(state,action);
        case actionTypes.REPO_RUN_SPEECH_DIARIZATION_FAILED: return speechDiarizationFailed(state,action);

        case actionTypes.REPO_RUN_SPEECH_VAD_DONE: return speechVADSuccess(state,action);
        case actionTypes.REPO_RUN_SPEECH_VAD_FAILED: return speechVADFailed(state,action);

        case actionTypes.LOAD_BINARY_FOR_PREVIEW: return loadBinaryForPreview(state,action);
        case actionTypes.LOAD_AUDIO_FOR_PREVIEW: return loadAudioForPreview(state,action);

        case actionTypes.REPO_SELECT_SESSION: return repoSelectSession(state,action);
        case actionTypes.REPO_SELECT_CONTAINER: return repoSelectContainer(state,action);

        case actionTypes.REPO_GET_USER_PROJECT_FILES: return repoGetUserProjectFiles(state,action);
        case actionTypes.REPO_GET_USER_PROJECT_FILES_FAILED: return repoGetUserProjectFilesFailed(state,action);

        case actionTypes.REPO_CREATE_NEW_SESSION: return repoCreateSession(state,action);
        case actionTypes.REPO_CREATE_NEW_SESSION_FAILED: return repoCreateSessionFailes(state,action);

        case actionTypes.REPO_DELETE_CONTAINER_SUCCESS: return repoRemoveContainerSuccess(state,action);
        case actionTypes.REPO_DELETE_CONTAINER_FAILED: return repoRemoveContainerFailed(state,action);

        case actionTypes.REPO_DELETE_SESSION_SUCCESS: return repoRemoveSessionSuccess(state,action);
        case actionTypes.REPO_DELETE_SESSION_FAILED: return repoRemoveSessionFailed(state,action);

        case actionTypes.SAVE_TRANSCRIPTION_SUCCESS: return saveTranscriptionSuccess(state,action);

        case actionTypes.EXPORT_TO_EMU_DONE_SUCCESS: return exportToEmuDone(state,action);

        case actionTypes.EXPORT_TO_EMU_DONE_FAILED: return exportToEmuFailed(state,action);
        

        case actionTypes.KORPUS_DOWNLOADED: return korpusDownloaded(state,action);

        

        //case actionTypes.REPO_UPLOAD_FILE: return repoUploadFile(state,action);
        
        // case actionTypes.REPO_UPLOAD_FILES_PROGRESS: return repoUploadProgress(state,action);
        // case actionTypes.REPO_UPLOAD_FILES_FINISH: return repoUploadFilesFinish(state,action);
        // case actionTypes.REPO_UPLOAD_FILES_INIT: return repoUploadFilesInit(state,action);
        // case actionTypes.REPO_UPLOAD_FILES_SUCCESS: return repoUploadFilesSuccess(state,action); 
        // case actionTypes.REPO_UPLOAD_FILES_FAILED: return repoUploadFilesFailed(state,action); 
        // case actionTypes.REPO_UPLOAD_FILES_MODAL_OPEN: return repoUploadFilesModalOpen(state,action);

        // case actionTypes.REPO_EDIT_TXT_SUCCESS: return repoEditFileSuccess(state,action);
        // case actionTypes.REPO_EDIT_TXT_FAILED: return repoEditFileFailed(state,action);

        // case actionTypes.REPO_CREATE_FOLDER: return repoCreateFolder(state,action);
        // case actionTypes.REPO_CREATE_FILES: return repoCreateFiles(state,action);
        // case actionTypes.REPO_RENAME_FOLDER: return repoRenameFolder(state,action);
        // case actionTypes.REPO_RENAME_FILE: return repoRenameFile(state,action);
        // case actionTypes.REPO_DELETE_FOLDER: return repoDeleteFolder(state,action);
        // case actionTypes.REPO_DELETE_FILE: return repoDeleteFile(state,action);
        
        // case actionTypes.REPO_DOWNLOAD_FILE: return repoDownloadFile(state,action);
    }

    return state;
}

export default repoPanelReducer;