import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary';
import './RepoPanel.css';
import { connect } from 'react-redux';
import * as repoActions from '../../../store/actions/index';
import { Redirect, withRouter } from 'react-router-dom';
import { getExt } from '../../../utils/utils';
import Modal from '../../../components/UI/Modal/Modal';
import Preview from '../../../components/Preview/Preview';
import {getFileKeyFromURL} from '../../../utils/utils';
import DragAndDrop from '../../../components/UI/DragAndDrop/DragAndDrop';
import DropFilesArea from '../../../components/UI/DropFilesArea/DropFilesArea';
import uuid from 'uuid';
import { extensionMapping } from '../../../utils/fileTypes';
import {Alert, Progress} from 'reactstrap';
import UploadAudio from '../../../components/UploadAudio/UploadAudio';
import RepoSession from './RepoSession/RepoSession';
import SingleInputForm from '../../../components/UI/SingleInputForm/SingleInputForm';
import ButtonLeftBar from '../../../components/UI/ButtonLeftBar/ButtonLeftBar';



import ContainerFile from './ContainerFile/ContainerFile';

import { Tooltip } from '@material-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';


class repoPanel extends Component {

    state = {
        clickCreateSession: false,
        clickRemoveItem: false,
        newSessionName: "",
    }

    removeObjectFromRepo = () => {
        let selectedSession = this.props.currentlySelectedSessions;
        let selectedContainers = this.props.currentlySelectedContainers;

        if(selectedSession[0] !== null && selectedSession.length > 0) {
            alert("Czy chcesz usunąć sesję wraz ze wszystkimi plikami w tej sesji?")
        } else {
            //usuwam zaznaczone containery
            for(let i=0;i<selectedContainers.length;i++){
                let containerId = selectedContainers[i];
                this.props.removeContainerFromRepo(
                    this.props.currentProjectOwner,
                    this.props.currentProjectID,
                    this.props.repoData.containers.byId[containerId].session,
                    containerId,
                    this.props.token);
            }

        }
    }


    selectSessionHandler = (sessionId) => {
        this.props.onSelectSession(sessionId);
    }

    selectContainerHandler = (containerId) => {
        this.props.onSelectContainer(containerId);
    }

    componentDidMount() {
		this.refreshRepo();
    }
    

	refreshRepo() {
		//wysylam zadanie aby pobrac aktualne pliki w katalogu uzytkownika
		const currentProjectID = this.props.currentProjectID;
		const currentProjectOwner = this.props.currentProjectOwner; //Owner id

		this.props.onGetProjectFilesForUser(currentProjectOwner, currentProjectID, this.props.token);
    }
    
    addSession = () => {
        this.setState({clickCreateSession: true});
        this.props.onOpenModalHandler();
    }

    closeModalHandler = () => {
		this.props.onCloseModalHandler();
    }

    //zajmuje się obsługą updatu inputa dla nazwy nowego projektu
    newSessionChangeHandler = (event) => {
        event.preventDefault();
        this.setState({
          newSessionName: event.target.value,
        })
    }

    // wysyła tworzenie nowego projektu
    onSubmitNewSessionHandler = (event) => {
        event.preventDefault();
        this.props.createNewSession(this.state.newSessionName, 
            this.props.currentProjectID, 
            this.props.currentProjectOwner,
            this.props.token
            );
        this.props.onCloseModalHandler();
    }


    // dodaje contener do listy Rozpoznawania
    addContainerToRecoList = (container) => {
       // console.log(this.props.repoData.containers.byId[containerId])
        this.props.addContainerToReco(container);
    }

    // dodaje contaner do listy Align
    addContainerToAlignList = (container) => {
        this.props.addContainerToAlign(container);
    }

    // dodaje contaner do listy DIaryzacji
    addContainerToDIAList = (container) => {
        this.props.addContainerToDIA(container);
    }

    // dodaje contaner do listy voice activity detection
    addContainerToVADList = (container) => {
        this.props.addContainerToVAD(container);
    }

    runEMUExport = () => {
        alert('EMU EXPORT TO DO')
    }



	render() {

        //############## zawartość okna modalnego

        let modalTitle = "";
        let modalContent = null;
        let lebelButton = "";


        if(this.state.clickCreateSession){
            modalTitle = "Tworzenie nowej sesji";

            lebelButton = "Stwórz sesje";

            modalContent = (
                <SingleInputForm 
                    placeholder={"Podaj nazwe sesji"}
                    onChangeHandler={this.newSessionChangeHandler}
                    value={this.state.newSessionName}
                    buttonLabel={lebelButton}
                    onSubmitHandler={this.onSubmitNewSessionHandler}/>
            );
        }

     

        //########### rendering listy sesji i contenerow
        let listaSesji = null;
        listaSesji = Object.keys(this.props.repoData.sessions.byId).map(sessionId => {
            
            let sId = this.props.repoData.sessions.byId[sessionId].id;
            let sessionName = this.props.repoData.sessions.byId[sessionId].sessionName;
            let ifSelected = this.props.repoData.sessions.byId[sessionId].ifSelected;
            let containersIds = this.props.repoData.sessions.byId[sessionId].containers; //tylko dla tej sesji

            //przekształcam...
            let containersArray = containersIds.map(containerId => {
                return this.props.repoData.containers.byId[containerId];
            })


                return  <RepoSession 
                                containers={containersArray} 
                                sessionName={sessionName}
                                sessionId = {sId}
                                projectId = {this.props.currentProjectID}
                                key = {sId}
                                ifSelected = {ifSelected}
                                selectTheSession = {this.selectSessionHandler}
                                selectTheContainer = {this.selectContainerHandler} 
                                onAddContainerToDIA = {(container) => this.addContainerToDIAList(container)}
                                onAddContainerToVAD = {(container) => this.addContainerToVADList(container)}
                                onAddContainerToReco = {(container) => this.addContainerToRecoList(container)}
                                onAddContainerToAlign = {(container) => this.addContainerToAlignList(container)}/>
        })

        //onAddContainerToDIA = {(containerId) => this.addContainerToDIAList(containerId)}
        //onAddContainerToVAD = {(containerId) => this.addContainerToVADList(containerId)}
        //onAddContainerToReco = {(containerId) => this.addContainerToRecoList(containerId)}
       //onAddContainerToAlign = {(containerId) => this.addContainerToAlignList(containerId)}/>



 

		return (
			<Aux>

                <Modal 
                    show={this.props.modal}
					modalClosed={this.closeModalHandler}
                    modalTitle={modalTitle}
                >
                    {modalContent}
                </Modal> 

				<div className="RepoPanel" id="RepoPanel">
					<div className="topPart">
						<div className="repoTab" >
							Repozytorium
					    </div>
					</div>

                    {
                        // pasek settings 
                    }
                    <div className="SettingBarRepo">
                        
                    </div>


					<div className="mainRepoContent">

                        <div className="operatingIcons">

                            <Tooltip title="Dodaj sesję">
                                <a href="#" role="button">
                                        <FontAwesomeIcon icon={faFolderPlus} onClick={this.addSession} /> 
                                </a> 
                            </Tooltip>
                            
                            <Tooltip title="Usuń zaznaczony obiekt">
                                <a href="#" role="button" onClick={this.removeObjectFromRepo}>
                                    <FontAwesomeIcon icon={faTrash} /> 
                                </a>
                            </Tooltip>

                            

                            
                            
                        </div>

                        <div className="fileList">
                      
                            
                            {listaSesji}
         
                        </div>

                        <div className="exportToEmu">
                            <ButtonLeftBar 
                                    napis="Eksportuj korpus do EMU-SDMS"
                                    icon={null}
                                    customeStyle={{height:'50px'}}
                                    disabled={false}
                                    whenClicked={this.runEMUExport}/>
                        </div>

                        

                        {
                            //<div className="CardRepo">
                           //     <UploadAudio />
                           // </div>
                        }
                        
					</div>
				</div>

			</Aux>
		);
	}

}

const mapStateToProps = (state) => {
	return {
        //repoSessions: state.repoR,
        repoData: state.repoR,
        currentlySelectedSessions: state.repoR.currentlySelectedSessions,
        currentlySelectedContainers: state.repoR.currentlySelectedContainers,
        currentProjectID: state.projectR.currentProjectID,
		currentProjectName: state.projectR.currentProjectName,
        currentProjectOwner: state.projectR.currentProjectOwner,
        token: state.homeR.token,
        modal: state.projectR.modal,
	}
}

const mapDispatchToProps = dispatch => {
	return {
    //	onUploadFiles: (fileList, folderKey, userId, projectId, token) => dispatch(repoActions.uploadFiles(fileList,folderKey,userId, projectId, token)),
    onSelectSession: (sessionId) => dispatch(repoActions.selectSession(sessionId)),
    onSelectContainer: (containerId) => dispatch(repoActions.selectContainer(containerId)),
    onGetProjectFilesForUser: (userId, projectId, token) => dispatch(repoActions.getProjectFilesForUser(userId, projectId, token)),

    removeContainerFromRepo: (containerId, userId, projectId, sessionId,token) => dispatch(repoActions.removeContainerFromRepo(containerId, userId, projectId, sessionId,token)),

    onOpenModalHandler: () => dispatch(repoActions.openModalProject()),

    onCloseModalHandler: () => dispatch(repoActions.closeModalProject()),

    addContainerToDIA: (container) => dispatch(repoActions.addContainerToDIA(container)),
    addContainerToVAD: (container) => dispatch(repoActions.addContainerToVAD(container)),
    addContainerToReco: (container) => dispatch(repoActions.addContainerToReco(container)),
    addContainerToAlign: (container) => dispatch(repoActions.addContainerToAlign(container)),
    
    createNewSession: (sessionName, projectId, userId, token) => dispatch(repoActions.createNewSession(sessionName, projectId, userId, token)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(repoPanel));