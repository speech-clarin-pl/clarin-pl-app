import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary';
import './RepoPanel.css';
import { connect } from 'react-redux';
import * as repoActions from '../../../store/actions/index';
import { withRouter } from 'react-router-dom';
//import { getExt } from '../../../utils/utils';
import Modal from '../../../components/UI/Modal/Modal';
//import Preview from '../../../components/Preview/Preview';
//import {getFileKeyFromURL} from '../../../utils/utils';
//import DragAndDrop from '../../../components/UI/DragAndDrop/DragAndDrop';
//import DropFilesArea from '../../../components/UI/DropFilesArea/DropFilesArea';
//import uuid from 'uuid';
//import { extensionMapping } from '../../../utils/fileTypes';
//import {Alert, Progress} from 'reactstrap';
//import UploadAudio from '../../../components/UploadAudio/UploadAudio';
import RepoSession from './RepoSession/RepoSession';
import SingleInputForm from '../../../components/UI/SingleInputForm/SingleInputForm';
import ButtonLeftBar from '../../../components/UI/ButtonLeftBar/ButtonLeftBar';
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";



//import ContainerFile from './ContainerFile/ContainerFile';

import { Tooltip } from '@material-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import { faFolderMinus } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
//import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';


const override = css`
  display: block;
  margin: 0 auto;
`;

class repoPanel extends Component {

    state = {
        clickCreateSession: false,
        clickExportToMenu: false,
        clickRemoveItem: false,
        newSessionName: "",

        modal: false,
        whatClicked: '',

        waitingForCorpus: false,

        whichContainersToRemove: null,
        whichSessionIdToRemove: null,
    }

    //removeObjectFromRepo = () => {
        //let selectedSession = this.props.currentlySelectedSessions;
        //let selectedContainers = this.props.currentlySelectedContainers;

        /*
        if(selectedSession[0] !== null && selectedSession.length > 0) {
            const sessionIdToRemove = selectedSession[0];

            //dowiaduje się nazwy sesji
            const sessionNameToRemove = this.props.repoData.sessions.byId[sessionIdToRemove].sessionName?this.props.repoData.sessions.byId[sessionIdToRemove].sessionName:"unknown";

            
            this.removeSession(sessionIdToRemove,sessionNameToRemove);
        } else {
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
        */

        //usuwam zaznaczone containery
      //  this.removeContainers();
    //}


    removeContainers = () => {

        //robie liste kontenerow do usuniecia
        const selectedContainers = this.props.currentlySelectedContainers;

        this.setState({
            modal: true,
            whatClicked: 'removeContainer',
            whichContainersToRemove: selectedContainers,
        })
        
    }


    finallyRemoveContainers = () => {

        const selectedContainers = this.props.currentlySelectedContainers;

        for (let i = 0; i < selectedContainers.length; i++) {
            let containerId = selectedContainers[i];
            this.props.removeContainerFromRepo(
                this.props.currentProjectOwner,
                this.props.currentProjectID,
                this.props.repoData.containers.byId[containerId].session,
                containerId,
                this.props.token);
        }

        this.closeModalHandler();
    }

   
    removeSessions = (sessionId,sessionName) => {

        let selectedSession = this.props.currentlySelectedSessions;
       this.setState({
            modal: true,
            whatClicked: 'removeSession',
            whichSessionIdToRemove: selectedSession,
           // whichSessionNameToRemove: sessionName,
        })
    }

    finallyRemoveSession = () => {
        const selectedSessions = this.props.currentlySelectedSessions;

        for (let i = 0; i < selectedSessions.length; i++) {
            let sessionId = selectedSessions[i];
            this.props.removeSessionFromRepo(
                this.props.currentProjectOwner, 
                this.props.currentProjectID, 
                sessionId,
                this.props.token)
        }

        this.closeModalHandler();
        

    }




    selectSessionHandler = (sessionId, ifCtrl) => {
        this.props.onSelectSession(sessionId, ifCtrl);
    }

    selectContainerHandler = (containerId, ifCtrl) => {
        this.props.onSelectContainer(containerId, ifCtrl);
    }

    componentDidMount() {
		this.refreshRepo();
    }

    componentDidUpdate = (prevProps) => {
        if(prevProps.exportToEmuReady !== this.props.exportToEmuReady){
            this.setState({
                waitingForCorpus: false,
            })
        }
    }
    

	refreshRepo() {
		//wysylam zadanie aby pobrac aktualne pliki w katalogu uzytkownika
		const currentProjectID = this.props.currentProjectID;
		const currentProjectOwner = this.props.currentProjectOwner; //Owner id

		this.props.onGetProjectFilesForUser(currentProjectOwner, currentProjectID, this.props.token);
    }
    
    addSession = () => {
        //this.setState({clickCreateSession: true});
        //this.props.onOpenModalHandler();
        this.setState({
            modal: true,
            whatClicked: 'addSession',
        })
    }

    closeModalHandler = () => {
        this.setState({
            modal:false,
            whatClicked: '',
            whichContainerToRemove: null,
            whichSessionIdToRemove: null,
            whichSessionNameToRemove: '',
        })
		//this.props.onCloseModalHandler();
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
       // this.props.onCloseModalHandler();
       this.setState({
           modal:false,
       })
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

   

    openConfirmExportToEmu = () => {
        this.setState({
            modal: true,
            whatClicked: 'EMUexport',
        })
        //this.props.onOpenModalHandler();
    }



    runEMUExport = () => {
        this.setState({
            waitingForCorpus: true
        });
        this.props.onExportToEMU(this.props.currentProjectID, this.props.currentProjectOwner, this.props.token);
    }

    


    downloadCorpus = () => {

        let projectId = this.props.currentProjectID;
        let userId = this.props.currentProjectOwner;

        //let audioGetUrl = process.env.REACT_APP_API_URL+ "/repoFiles/" + userId + "/" + projectId + "/"+sessionId+"/"+containerId+"/audio?api_key="+token;
		
        let corpusPath = process.env.REACT_APP_API_URL+ "/repoFiles/downloadCorpus/" + projectId+"/?api_key="+this.props.token;;
		
        window.open(corpusPath);

        this.props.onKorpusDownloaded();
    }

    modalContentEMUExport = () => {

        let content = null;
        let akcjaKorpus = <button type="button" className="btn btn-primary" onClick={this.runEMUExport}>Ok</button>;

        //sprawdzam czy przynajmniej jeden jest gotowy do eks
        if(this.props.exportToEmuReady){
            akcjaKorpus = <button type="button" className="btn btn-primary" onClick={this.downloadCorpus}>Pobierz korpus</button>;
        } else {
            if(this.state.waitingForCorpus){
                akcjaKorpus = <RingLoader
                css={override}
                size={'40px'}
                color={"rgb(52, 152, 219)"}
                loading={true}
                />;
            }
        }

        content = (
            <div>
                <p>Zostaną wyeksportowane tylko te pliki dla których zostały wykonane wszystkie poziomy annotacji.</p>
                <p>Podcas tego procesu nie wykonuj żadnych czynności</p>
                {
                    akcjaKorpus
                }                   
                
            </div>
            
        );

        return content;
    }


    modalContentRemoveContainer = () => {
        const containersToRemove = this.state.whichContainersToRemove;

        //przekształcam identyfikatory na nazwy
        const containerNames = containersToRemove.map(conId => {
            return (
                <span style={{marginRight:'8px'}}>{this.props.repoData.containers.byId[conId].containerName}</span>
            )
        })
     

            let content = (
                <div>
                    <p>
                        {containerNames}
                    </p>
                 
                    <button type="button" className="btn btn-primary" onClick={this.finallyRemoveContainers}>TAK</button>
                     <button type="button" className="btn btn-outline-primary" onClick={this.closeModalHandler}>NIE</button>
                </div>
            )

            return content;
    }

    modalContentRemoveSession = () => {
        let sessionIds = this.state.whichSessionIdToRemove;

        //przekształcam identyfikatory na nazwy
        const sessionNames = sessionIds.map(conId => {
            return (
                <span style={{marginRight:'8px'}}>{this.props.repoData.sessions.byId[conId].sessionName}</span>
            )
        })

            let content = (
                <div>
                    <p>
                        {sessionNames}
                    </p>
                 
                    <button type="button" className="btn btn-primary" onClick={this.finallyRemoveSession}>TAK</button>
                     <button type="button" className="btn btn-outline-primary" onClick={this.closeModalHandler}>NIE</button>
                </div>
            )

            return content;
    }

    modalContentAddSession = () => {
        let lebelButton  = "Stwórz sesje";

        let content = (
            <SingleInputForm 
                placeholder={"Podaj nazwe sesji"}
                onChangeHandler={this.newSessionChangeHandler}
                value={this.state.newSessionName}
                buttonLabel={lebelButton}
                onSubmitHandler={this.onSubmitNewSessionHandler}/>
        );

        return content;
    }



	render() {

        //############## zawartość okna modalnego

        let modalTitle = "";
        let modalContent = null;
        

        switch(this.state.whatClicked){
            case 'EMUexport':
                modalTitle = "Czy jesteś pewien że chcesz eksportować korpus do EMU?";
                modalContent = this.modalContentEMUExport();
                break;
            case 'removeContainer':
                modalTitle = "Czy jesteś pewien że chcesz usunąć następujące kontenery ?";
                modalContent = this.modalContentRemoveContainer();
                break;
            case 'removeSession':
                modalTitle = "Czy jesteś pewien że chcesz usunąć całą sesję wraz z zawartością?";
                modalContent = this.modalContentRemoveSession();
                break;
            case 'addSession':
                modalTitle = "Tworzenie nowej sesji";
                modalContent = this.modalContentAddSession();
                break;
            default:
                // cos
        }
     

        //########### rendering listy sesji i contenerow
        let listaSesji = null;
   
        listaSesji = Object.keys(this.props.repoData.sessions.byId).map(sessionId => {

            //console.log(sessionId)
            
            let sId = this.props.repoData.sessions.byId[sessionId].id;

            //console.log(sId)

            let sessionName = this.props.repoData.sessions.byId[sessionId].sessionName;
            let ifSelected = this.props.repoData.sessions.byId[sessionId].ifSelected;
            let containersIds = this.props.repoData.sessions.byId[sessionId].containers; //tylko dla tej sesji

            //przekształcam...
            let containersArray = containersIds.map(containerId => {
                return this.props.repoData.containers.byId[containerId];
            })

            console.log(containersArray)

                return  <RepoSession 
                                containers={containersArray} 
                                initSessionOpen={false}
                                sessionName={sessionName}
                                sessionId = {sId}
                                projectId = {this.props.currentProjectID}
                                key = {sId}
                                token={this.props.token}
                                ifSelected = {ifSelected}
                                selectTheSession = {this.selectSessionHandler}
                                selectTheContainer = {this.selectContainerHandler} 
                                onRemoveContainer = {(container => this.removeContainer(container))}
                                onRemoveSession = {(sessionId,sessionName) => this.removeSession(sessionId,sessionName)}
                                onChangeContainerName = {(container, text, token) => this.props.changeContainerName(container, text, token)}
                                onAddContainerToDIA = {(container) => this.addContainerToDIAList(container)}
                                onAddContainerToVAD = {(container) => this.addContainerToVADList(container)}
                                onAddContainerToReco = {(container) => this.addContainerToRecoList(container)}
                                onAddContainerToAlign = {(container) => this.addContainerToAlignList(container)}/>
        })

        const trachIcon = <Tooltip title="Usuń zaznaczone kontenery">
                                        <a href="#" role="button" >
                                            <FontAwesomeIcon icon={faTrash} onClick={this.removeContainers}/> 
                                        </a>
                                    </Tooltip>

        const removeSessionIcon = <Tooltip title="Usuń zaznaczone sesje">
                                    <a href="#" role="button" >
                                        <FontAwesomeIcon icon={faFolderMinus} onClick={this.removeSessions}/> 
                                    </a>
                                 </Tooltip>

        let trashIconContainer = null;
        let trashIconSession = null

        //jeżeli jest zaznaczona jakaś sesja
        if((this.props.currentlySelectedSessions[0] !== null && this.props.currentlySelectedSessions.length > 0)){
            trashIconSession = removeSessionIcon;
        } 

        //jeżeli jest zaznaczony jakiś kontener
        if(this.props.currentlySelectedContainers[0] !== null && this.props.currentlySelectedContainers.length > 0){
            trashIconContainer = trachIcon;
        } 


		return (
			<Aux>
                <Modal 
                    show={this.state.modal}
					modalClosed={this.closeModalHandler}
                    modalTitle={modalTitle}
                >
                    {modalContent}
                </Modal> 

				<div className="RepoPanel" id="RepoPanel" data-tut="repoPanel">
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
                            {
                                trashIconSession
                            }
                            {
                               
                               trashIconContainer
                            }
                        
                            
                        </div>

                        <div className="fileList" data-tut="repoSession">
                      
                            {listaSesji}
         
                        </div>

                        <div className="exportToEmu" data-tut="edytorExportCorpus">
                            <ButtonLeftBar 
                                    napis="Eksportuj korpus do EMU-SDMS"
                                    icon={null}
                                    customeStyle={{height:'50px'}}
                                    disabled={false}
                                    whenClicked={this.openConfirmExportToEmu}/>
                        </div>
					</div>
				</div>

			</Aux>
		);
	}

}

const mapStateToProps = (state) => {
    return {
        repoData: state.repoR,
        currentlySelectedSessions: state.repoR.currentlySelectedSessions,
        currentlySelectedContainers: state.repoR.currentlySelectedContainers,
        currentProjectID: state.projectR.currentProjectID,
        currentProjectName: state.projectR.currentProjectName,
        currentProjectOwner: state.projectR.currentProjectOwner,
        token: state.homeR.token,
        modal: state.projectR.modal,
        exportToEmuReady: state.repoR.exportToEmuReady,
    }
}

const mapDispatchToProps = dispatch => {
    return {

        onExportToEMU: (projectId, userId, token) => dispatch(repoActions.exportToEMU(projectId, userId, token)),
        onSelectSession: (sessionId, ifCtrl) => dispatch(repoActions.selectSession(sessionId, ifCtrl)),
        onSelectContainer: (containerId, ifCtrl) => dispatch(repoActions.selectContainer(containerId, ifCtrl)),
        onGetProjectFilesForUser: (userId, projectId, token) => dispatch(repoActions.getProjectFilesForUser(userId, projectId, token)),
        removeContainerFromRepo: (userId, projectId, sessionId, containerId, token) => dispatch(repoActions.removeContainerFromRepo(userId, projectId, sessionId, containerId, token)),
        onOpenModalHandler: () => dispatch(repoActions.openModalProject()),
        onCloseModalHandler: () => dispatch(repoActions.closeModalProject()),
        addContainerToDIA: (container) => dispatch(repoActions.addContainerToDIA(container)),
        addContainerToVAD: (container) => dispatch(repoActions.addContainerToVAD(container)),
        addContainerToReco: (container) => dispatch(repoActions.addContainerToReco(container)),
        addContainerToAlign: (container) => dispatch(repoActions.addContainerToAlign(container)),
        onKorpusDownloaded: () => dispatch(repoActions.korpusDownloaded()),
        createNewSession: (sessionName, projectId, userId, token) => dispatch(repoActions.createNewSession(sessionName, projectId, userId, token)),
        removeSessionFromRepo: (userId, projectId, sessionId, token) => dispatch(repoActions.removeSessionFromRepo(userId, projectId, sessionId, token)),
        changeContainerName: (container, text, token) => dispatch(repoActions.changeContainerName(container, text, token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(repoPanel));