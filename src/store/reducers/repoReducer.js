import * as actionTypes from '../../store/actions/actionsTypes';
import Moment from 'moment';
import { updateObject } from '../utility';

const initialState = {
    errorMessage: '',
    error: false,
    files: [],
    // files: [
    //     {
    //       key: 'cat in a hat.mp3',
    //       modified: +Moment().subtract(1, 'hours'),
    //       size: 1.5 * 1024 * 1024,
    //     },
    //     {
    //       key: 'photos/animals/kitten_ball.png',
    //       modified: +Moment().subtract(3, 'days'),
    //       size: 545 * 1024,
    //     },
    //   ],
}

//##########################################
//############ tworzenie nowego folderu
//#########################################

const repoCreateFolder = (state, action) => {

    const key = action.key;

    const newfiles = state.files.concat([{key: key, }]);

    return updateObject(state,
        {files: newfiles});

    // handleCreateFolder = (key) => {
        //     this.setState(state => {
        //       state.files = state.files.concat([{
        //         key: key,
        //       }])
        //       return state
        //     })
        //   }
}

const repoCreateFiles = (state, action) => {

    const files = action.files;
    const prefix = action.prefix;
   
    return updateObject(state,
        {});

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

    const oldKey = action.oldKey;
    const newKey = action.newKey;

    console.log('ZMIOANA NAZWY FOLDERU')

    const newFiles = [];
    state.files.map((file) => {

        if(oldKey !== newKey){
            newFiles.push({
                ...file,
                key: file.key.replace(oldKey, newKey),
                modified: +Moment(),
            })
        }
    })
    
    return updateObject(state,
        {files: newFiles});
    

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

    const oldKey = action.oldKey;
    const newKey = action.newKey;

    const newFiles = [];
    
    state.files.map((file) => {
		if (file.key === oldKey) {
			newFiles.push({
                ...file,
                key: newKey,
                modified: +Moment(),
			})
		} else {
			  newFiles.push(file)
			}
		})
		

    return updateObject(state,
        {files: newFiles});

}

//##########################################
//############ usuwanie folderow z repo
//#########################################

const repoDeleteFolder = (state, action) => {

    const folderKey = action.folderKey;

    const newFiles = [];
    state.files.map((file) => {
        if (file.key.substr(0, folderKey.length) !== folderKey) {
            newFiles.push(file)
        }
    })
    
    return updateObject(state,
        {files: newFiles});
}


//##########################################
//############ usuwanie plikow z repo ######
//##########################################

const repoDeleteFile = (state, action) => {

    const fileKey = action.fileKey;

    const newFiles = [];
    state.files.map((file) => {
        if (file.key !== fileKey) {
            newFiles.push(file)
        } else {
            //jezeli jest usuniety z folderu to musze posotawic folder
            let n = fileKey.lastIndexOf("/");
            //to oznacza ze plik jest w jakim podfoldrze
            if(n > 1){
               //wtedy zwracam tylko sam folder - bez pliku w nim
               console.log(file)
               let onlyFolders = file.key.substring(0,n+1);
               console.log(onlyFolders)
               file.key = onlyFolders;
               newFiles.push(file);
            }
        }
    })
  
    return updateObject(state,
        {files: newFiles});
}

const repoGetUserProjectFiles = (state, action) => {
    const files = action.files;
    return updateObject(state,
        {files: files});
}

const repoGetUserProjectFilesFailed = (state, action) => {
    const error = action.error.toString();
    return updateObject(state,
        {errorMessage: error,
        error: true});
}

const repoReducer = (state = initialState, action) => {
    switch(action.type){
        //case actionTypes.REPO_UPLOAD_FILE: return repoUploadFile(state,action);
        case actionTypes.REPO_CREATE_FOLDER: return repoCreateFolder(state,action);
        case actionTypes.REPO_CREATE_FILES: return repoCreateFiles(state,action);
        case actionTypes.REPO_RENAME_FOLDER: return repoRenameFolder(state,action);
        case actionTypes.REPO_RENAME_FILE: return repoRenameFile(state,action);
        case actionTypes.REPO_DELETE_FOLDER: return repoDeleteFolder(state,action);
        case actionTypes.REPO_DELETE_FILE: return repoDeleteFile(state,action);
        case actionTypes.REPO_GET_USER_PROJECT_FILES: return repoGetUserProjectFiles(state,action);
        case actionTypes.REPO_GET_USER_PROJECT_FILES_FAILED: return repoGetUserProjectFilesFailed(state,action);

    }

    return state;
}

export default repoReducer;