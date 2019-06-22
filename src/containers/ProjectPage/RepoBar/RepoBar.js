import React, {Component} from 'react';
import Aux from '../../../hoc/Auxiliary';
import './RepoBar.css';
import Moment from 'moment';
import FileBrowser, {Icons} from 'react-keyed-file-browser';
import { connect } from 'react-redux';
import * as repoActions from '../../../store/actions/index';

class repoBar extends Component  {

	componentDidMount() {
		//wysylam zadanie aby pobrac aktualne pliki w katalogu uzytkownika
		const currentProjectID = this.props.currentProjectID;
		const currentProjectOwner =  this.props.currentProjectOwner; //Owner id
		console.log(currentProjectID)
		console.log(currentProjectOwner)
		this.props.onGetProjectFilesForUser(currentProjectOwner, currentProjectID, this.props.token);
	}

	  handleCreateFolder = (key) => {
		this.props.onHandleCreateFolder(key); 
	  }
	  handleCreateFiles = (files, prefix) => {
		this.props.onHandleCreateFiles(files, prefix); 
	  }
	  handleRenameFolder = (oldKey, newKey) => {
		this.props.onHandleRenameFolder(oldKey, newKey);
	  }
	  handleRenameFile = (oldKey, newKey) => {
		this.props.onHandleRenameFile(oldKey, newKey);
	  }
	  handleDeleteFolder = (folderKey) => {
		this.props.onHandleDeleteFolder(folderKey);
	  }
	  handleDeleteFile = (fileKey) => {
		this.props.onHandleDeleteFile(fileKey);
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
					

			<div className="scrollStrip"
				onMouseDown={this.startResizeRepo}></div>

			<FileBrowser
				files={this.props.files}
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

const mapStateToProps = (state) => {
	return {
	  currentProjectID: state.projectR.currentProjectID,
	  currentProjectName: state.projectR.currentProjectName,
	  currentProjectOwner: state.projectR.currentProjectOwner,
	  files: state.repoR.files,
	  token: state.homeR.token,
	}
  }
  
  const mapDispatchToProps = dispatch => {
	return {
		onHandleCreateFolder: (key) => dispatch(repoActions.handleCreateFolder(key)),
		onHandleCreateFiles: (files, prefix) => dispatch(repoActions.handleCreateFiles(files, prefix)),
		onHandleRenameFolder: (oldKey, newKey) => dispatch(repoActions.handleRenameFolder((oldKey, newKey))),
		onHandleRenameFile: (oldKey, newKey) => dispatch(repoActions.handleRenameFile(oldKey, newKey)),
		onHandleDeleteFolder: (folderKey) => dispatch(repoActions.handleDeleteFolder(folderKey)),
		onHandleDeleteFile: (fileKey) => dispatch(repoActions.handleDeleteFile(fileKey)),
		onGetProjectFilesForUser: (userId, projectId, token) => dispatch(repoActions.getProjectFilesForUser(userId,projectId, token))
	}
  }

export default connect(mapStateToProps, mapDispatchToProps)(repoBar);