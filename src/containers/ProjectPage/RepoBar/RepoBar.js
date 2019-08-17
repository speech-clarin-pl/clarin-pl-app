import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary';
import './RepoBar.css';
import Moment from 'moment';
import FileBrowser, { Icons } from 'react-keyed-file-browser-clarin';
import { connect } from 'react-redux';
import * as repoActions from '../../../store/actions/index';
import { Redirect, withRouter } from 'react-router-dom';
import { getExt } from '../../../utils/utils';
  
class repoBar extends Component {

	state = {
		openPreview: false,
	}

	componentDidMount() {
		//wysylam zadanie aby pobrac aktualne pliki w katalogu uzytkownika
		const currentProjectID = this.props.currentProjectID;
		const currentProjectOwner = this.props.currentProjectOwner; //Owner id
		//console.log(currentProjectID)
		//console.log(currentProjectOwner)
		this.props.onGetProjectFilesForUser(currentProjectOwner, currentProjectID, this.props.token);
	}

	handleCreateFolder = (key) => {
		this.props.onHandleCreateFolder(key, this.props.currentProjectID, this.props.currentProjectOwner, this.props.token);
	}
	handleCreateFiles = (files, prefix) => {
		this.props.onHandleCreateFiles(files, prefix);
	}
	handleRenameFolder = (oldKey, newKey) => {
		this.props.onHandleRenameFolder(oldKey, newKey, this.props.currentProjectID, this.props.currentProjectOwner, this.props.token);
	}
	handleRenameFile = (oldKey, newKey) => {
		this.props.onHandleRenameFile(oldKey, newKey, this.props.currentProjectID, this.props.currentProjectOwner, this.props.token);
	}
	handleDeleteFolder = (folderKey) => {
		this.props.onHandleDeleteFolder(folderKey, this.props.currentProjectID, this.props.currentProjectOwner, this.props.token);
	}
	handleDeleteFile = (fileKey) => {
		this.props.onHandleDeleteFile(fileKey, this.props.currentProjectID, this.props.currentProjectOwner, this.props.token);
	}

	handleDownloadFile = (fileKey) => {
		this.props.onHandleDownloadFile(fileKey, this.props.currentProjectID, this.props.currentProjectOwner, this.props.token);
	}

	handleSelect = (key) => {
		console.log("handleSelect")
		console.log(key)
	}

	// Called after onSelect, only on file selection
	handleSelectFile = (file) => {
		console.log("handleSelectFile")
		console.log(file)
	}

	// Called after onSelect, only on folder selection
	handleSelectFolder = (folder) => {
		console.log("handleSelectFolder")
		console.log(folder)
	}

	//dwukrotne klikniecie powoduje uruchomienie w podgladzie
	handlePreviewOpen = (file) => {

		//sprawdzam czy juz jestem na stronie podgladu.
		//jak nie to tam przechodze

		let czyjestem = true;

		if (!this.props.location.pathname.includes('preview')) {
		
			let toURL = this.props.match.url + '/preview';
			czyjestem = false;
			this.props.history.push({
				pathname: toURL,
			});
		}

		//czytam rozszerzenie pliku
		const ext = getExt(file.url)[0];

		//wtedy jest to plik txt
		if (ext === 'txt' || ext === 'ctm' || ext === 'zip' || ext === 'json' ||
		ext === 'TXT' || ext === 'CTM' || ext === 'ZIP' || ext === 'JSON') {

			if(file.url !== this.props.txtFileUrl){
				this.props.onOpenTxtFileToPreview(file, czyjestem);
			}

		} else if (ext === 'wav' || ext === 'mp3' || ext === 'au' ||
			ext === 'WAV' || ext === 'MP3' || ext === 'AU' ) {

				if(file.url !== this.props.audioFileUrl){
					this.props.onOpenAudioFileToPreview(file, czyjestem);
				}

		}

	}

	handlePreviewClose = (file) => {
		console.log("handlePreviewClose")
		console.log(file)
	}

	

	handleFolderOpen = (folder) => {
		console.log("handleFolderOpen")
		console.log(folder)
	}

	handleFolderClose = (folder) => {
		console.log("handleFolderClose")
		console.log(folder)
	}


	startResizeRepo = () => {
		window.addEventListener('mousemove', this.Resize, false);
		window.addEventListener('mouseup', this.stopResize, false);
	}


	//resize the element
	Resize = (e) => {
		const repoBar = document.getElementById('RepoBar');
		const projectPage = document.getElementById('ProjectPage');
		const leftSiteBar = document.getElementById('LeftSiteBar');
		//console.log(window.innerWidth - e.clientX);
		let szerRepo = window.innerWidth - e.clientX;
		let szerProject = (window.innerWidth - leftSiteBar.offsetWidth) - szerRepo;
		repoBar.style.width = szerRepo + 'px';
		projectPage.style.width = szerProject + 'px';
		//element.style.height = (e.clientY - element.offsetTop) + 'px';
	}
	//on mouseup remove windows functions mousemove & mouseup
	stopResize = (e) => {
		window.removeEventListener('mousemove', this.Resize, false);
		window.removeEventListener('mouseup', this.stopResize, false);
	}

	render() {
		window.addEventListener('onresize', this.Resize, false);


		const mount = document.querySelectorAll('div.demo-mount-nested-editable');

		return (
			<Aux>
				<div className="RepoBar" id="RepoBar">
					<div className="topPart">
						<div className="repoTab" >
							<div className="scrollStrip"
								onMouseDown={this.startResizeRepo}>
								<i className="fas fa-arrows-alt-h"></i>
							</div>
							Repozytorium
					</div>
						{
							/*
						<div className="repoNav" >
							
						</div>
							*/
						}

					</div>


					<div className="mainRepoContent" data-scrollbar>



						<FileBrowser
							files={this.props.files}
							icons={{
								File: <i className="fas fa-file"></i>,
								Image: <i className="fas fa-image"></i>,
								PDF: <i className="fas fa-file-pdf"></i>,
								Rename: <i className="fas fa-edit"></i>,
								Folder: <i className="fas fa-folder"></i>,
								FolderOpen: <i className="fas fa-folder-open"></i>,
								Delete: <i className="fas fa-trash"></i>,
								Loading: <i className="fas fa-spinner"></i>,
								Download: <i className="fas fa-download"></i>,
							}}

							onCreateFolder={this.handleCreateFolder}
							onCreateFiles={this.handleCreateFiles}
							onMoveFolder={this.handleRenameFolder}
							onMoveFile={this.handleRenameFile}
							onRenameFolder={this.handleRenameFolder}
							onRenameFile={this.handleRenameFile}
							onDeleteFolder={this.handleDeleteFolder}
							onDeleteFile={this.handleDeleteFile}
							onDownloadFile={this.handleDownloadFile}

							// Always called when a file or folder is selected
							onSelect={this.handleSelect}
							// Called after onSelect, only on file selection
							onSelectFile={this.handleSelectFile}
							// Called after onSelect, only on folder selection
							onSelectFolder={this.handleSelectFolder}
							onPreviewOpen={this.handlePreviewOpen}
							onPreviewClose={this.handlePreviewClose}
							onFolderOpen={this.handleFolderOpen}
							onFolderClose={this.handleFolderClose}

						// 			onSelect: (fileOrFolder) => {}, // Always called when a file or folder is selected
						// onSelectFile: (file) => {}, //    Called after onSelect, only on file selection
						// onSelectFolder: (folder) => {}, //    Called after onSelect, only on folder selection

						// onPreviewOpen: (file) => {}, // File opened
						// onPreviewClose: (file) => {}, // File closed

						// onFolderOpen: (folder) => {}, // Folder opened
						// onFolderClose: (folder) => {}, // Folder closed


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


        txtDisplayed: state.previewR.txtDisplayed,
        txtfileName: state.previewR.txtfileName,
        txtFileUrl: state.previewR.txtFileUrl,

        audiofileName: state.previewR.audiofileName,
        audioDisplayed: state.previewR.audioDisplayed,
        audioFileUrl:  state.previewR.audioFileUrl,
        waveSurferInitialized: state.previewR.waveSurferInitialized,
        playing: state.previewR.playing,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onHandleCreateFolder: (key, projectId, userId, token) => dispatch(repoActions.handleCreateFolder(key, projectId, userId, token)),
		onHandleCreateFiles: (files, prefix) => dispatch(repoActions.handleCreateFiles(files, prefix)),
		onHandleRenameFolder: (oldKey, newKey, projectId, userId, token) => dispatch(repoActions.handleRenameFolder(oldKey, newKey, projectId, userId, token)),
		onHandleRenameFile: (oldKey, newKey, projectId, userId, token) => dispatch(repoActions.handleRenameFile(oldKey, newKey, projectId, userId, token)),
		onHandleDeleteFolder: (folderKey, projectId, userId, token) => dispatch(repoActions.handleDeleteFolder(folderKey, projectId, userId, token)),
		onHandleDeleteFile: (fileKey, projectId, userId, token) => dispatch(repoActions.handleDeleteFile(fileKey, projectId, userId, token)),
		onGetProjectFilesForUser: (userId, projectId, token) => dispatch(repoActions.getProjectFilesForUser(userId, projectId, token)),
		onOpenTxtFileToPreview: (file, ifWaveSurferIsInitialized) => dispatch(repoActions.openTxtFileToPreview(file,ifWaveSurferIsInitialized)),
		onOpenAudioFileToPreview: (file,ifWaveSurferIsInitialized) => dispatch(repoActions.openAudioFileToPreview(file,ifWaveSurferIsInitialized)),
		onHandleDownloadFile: (fileKey, projectId, userId, token) => dispatch(repoActions.handleDownloadFile(fileKey, projectId, userId, token))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(repoBar));