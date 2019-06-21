import React, {Component} from 'react';
import Aux from '../../../hoc/Auxiliary';
import './RepoBar.css';
import Moment from 'moment';
import FileBrowser, {Icons} from 'react-keyed-file-browser';
// import { FileManager, FileNavigator } from '@opuscapita/react-filemanager';
// import connectorNodeV1 from '@opuscapita/react-filemanager-connector-node-v1';

// const apiOptions = {
// 	...connectorNodeV1.apiOptions,
// 	apiRoot: 'http://127.0.0.1:1234' // Or you local Server Node V1 installation.
//   }

//   const fileManager = (
// 	<div style={{ height: '480px' }}>
// 	   <FileManager>
// 		 <FileNavigator
// 		   id="filemanager-1"
// 		   api={connectorNodeV1.api}
// 		   apiOptions={apiOptions}
// 		   capabilities={connectorNodeV1.capabilities}
// 		   listViewLayout={connectorNodeV1.listViewLayout}
// 		   viewLayoutOptions={connectorNodeV1.viewLayoutOptions}
// 		 />
// 	   </FileManager>
// 	 </div>
//    );

  
class repoBar extends Component  {

	state = {
		files: [
		  {
			key: 'photos/animals/cat in a hat.png',
			modified: +Moment().subtract(1, 'hours'),
			size: 1.5 * 1024 * 1024,
		  },
		  {
			key: 'photos/animals/kitten_ball.png',
			modified: +Moment().subtract(3, 'days'),
			size: 545 * 1024,
		  },
		  {
			key: 'photos/animals/elephants.png',
			modified: +Moment().subtract(3, 'days'),
			size: 52 * 1024,
		  },
		  {
			key: 'photos/funny fall.gif',
			modified: +Moment().subtract(2, 'months'),
			size: 13.2 * 1024 * 1024,
		  },
		  {
			key: 'photos/holiday.jpg',
			modified: +Moment().subtract(25, 'days'),
			size: 85 * 1024,
		  },
		  {
			key: 'documents/letter chunks.doc',
			modified: +Moment().subtract(15, 'days'),
			size: 480 * 1024,
		  },
		  {
			key: 'documents/export.pdf',
			modified: +Moment().subtract(15, 'days'),
			size: 4.2 * 1024 * 1024,
		  },
		],
	  }

	  handleCreateFolder = (key) => {
		this.setState(state => {
		  state.files = state.files.concat([{
			key: key,
		  }])
		  return state
		})
	  }
	  handleCreateFiles = (files, prefix) => {
		this.setState(state => {
		  const newFiles = files.map((file) => {
			let newKey = prefix
			if (prefix !== '' && prefix.substring(prefix.length - 1, prefix.length) !== '/') {
			  newKey += '/'
			}
			newKey += file.name
			return {
			  key: newKey,
			  size: file.size,
			  modified: +Moment(),
			}
		  })
	
		  const uniqueNewFiles = []
		  newFiles.map((newFile) => {
			let exists = false
			state.files.map((existingFile) => {
			  if (existingFile.key === newFile.key) {
				exists = true
			  }
			})
			if (!exists) {
			  uniqueNewFiles.push(newFile)
			}
		  })
		  state.files = state.files.concat(uniqueNewFiles)
		  return state
		})
	  }
	  handleRenameFolder = (oldKey, newKey) => {
		this.setState(state => {
		  const newFiles = []
		  state.files.map((file) => {
			if (file.key.substr(0, oldKey.length) === oldKey) {
			  newFiles.push({
				...file,
				key: file.key.replace(oldKey, newKey),
				modified: +Moment(),
			  })
			} else {
			  newFiles.push(file)
			}
		  })
		  state.files = newFiles
		  return state
		})
	  }
	  handleRenameFile = (oldKey, newKey) => {
		this.setState(state => {
		  const newFiles = []
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
		  state.files = newFiles
		  return state
		})
	  }
	  handleDeleteFolder = (folderKey) => {
		this.setState(state => {
		  const newFiles = []
		  state.files.map((file) => {
			if (file.key.substr(0, folderKey.length) !== folderKey) {
			  newFiles.push(file)
			}
		  })
		  state.files = newFiles
		  return state
		})
	  }
	  handleDeleteFile = (fileKey) => {
		this.setState(state => {
		  const newFiles = []
		  state.files.map((file) => {
			if (file.key !== fileKey) {
			  newFiles.push(file)
			}
		  })
		  state.files = newFiles
		  return state
		})
	  }

	  

	  startResizeRepo=() => {
		window.addEventListener('mousemove', this.Resize, false);
   		window.addEventListener('mouseup', this.stopResize, false);
	  }

	  	

	  //resize the element
		Resize =(e) =>{
			const repoBar = document.getElementById('RepoBar');
			const projectPage = document.getElementById('ProjectPage');
			const leftSiteBar = document.getElementById('LeftSiteBar');
			//console.log(window.innerWidth - e.clientX);
			let szerRepo= window.innerWidth - e.clientX;
			let szerProject = (window.innerWidth-leftSiteBar.offsetWidth) - szerRepo;
			repoBar.style.width = szerRepo + 'px';
			projectPage.style.width = szerProject + 'px';
			//element.style.height = (e.clientY - element.offsetTop) + 'px';
		}
		//on mouseup remove windows functions mousemove & mouseup
		stopResize = (e) => {
			window.removeEventListener('mousemove', this.Resize, false);
			window.removeEventListener('mouseup', this.stopResize, false);
		}

	  
	

	render(){
		window.addEventListener('onresize', this.Resize, false);
	

		const mount = document.querySelectorAll('div.demo-mount-nested-editable');

		return(
			<Aux>
			<div className="RepoBar" id="RepoBar">
				<div className="topPart">
					<div className="repoTab" >
						Repozytorium
					</div>
					<div className="repoNav" >
						Navigation to repo
					</div>
				</div>

				
				<div className="mainRepoContent" data-scrollbar>
					{
						//fileManager
						}

			<div className="scrollStrip"
				onMouseDown={this.startResizeRepo}></div>

			<FileBrowser
				files={this.state.files}
				icons={{
					File: <i className="fas fa-file"></i>,
					Image: <i className="fas fa-image"></i>,
					PDF: <i className="fas fa-file-pdf"></i>,
					Rename: <i className="fas fa-edit"></i>,
					Folder: <i className="fas fa-folder"></i>,
					FolderOpen: <i className="fas fa-folder-open"></i>,
					Delete:<i className="fas fa-trash"></i>,
					Loading: <i className="fas fa-spinner"></i>,
				  }}

				onCreateFolder={this.handleCreateFolder}
				onCreateFiles={this.handleCreateFiles}
				onMoveFolder={this.handleRenameFolder}
				onMoveFile={this.handleRenameFile}
				onRenameFolder={this.handleRenameFolder}
				onRenameFile={this.handleRenameFile}
				onDeleteFolder={this.handleDeleteFolder}
				onDeleteFile={this.handleDeleteFile}
			/>

			{mount[0]}
				
				</div>
			</div>
				
			</Aux>
		);
	}
    
}

export default repoBar;