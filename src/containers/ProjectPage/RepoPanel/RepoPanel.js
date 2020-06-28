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
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";



import ContainerFile from './ContainerFile/ContainerFile';

import { Tooltip } from '@material-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';


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

    runEMUExport = () => {
        this.setState({
            waitingForCorpus: true
        });
        this.props.onExportToEMU(this.props.currentProjectID, this.props.currentProjectOwner, this.props.token);
    }

    openConfirmExportToEmu = () => {
        this.setState({
            modal: true,
            whatClicked: 'EMUexport',
        })
        //this.props.onOpenModalHandler();
    }


    downloadCorpus = () => {

        let projectId = this.props.currentProjectID;
        let userId = this.props.currentProjectOwner;

        //let audioGetUrl = process.env.REACT_APP_API_URL+ "/repoFiles/" + userId + "/" + projectId + "/"+sessionId+"/"+containerId+"/audio?api_key="+token;
		
        let corpusPath = process.env.REACT_APP_API_URL+ "/repoFiles/downloadKorpus/" + userId + "/" + projectId+"/?api_key="+this.props.token;;
		
        window.open(corpusPath);

        this.props.onKorpusDownloaded();
    }



	render() {

        //############## zawartość okna modalnego

        let modalTitle = "";
        let modalContent = null;
        let lebelButton = "";


        //jeżeli kliknięto w przycisk exportujący do EMU
        if(this.state.whatClicked == 'EMUexport'){
            modalTitle = "Czy jesteś pewien że chcesz eksportować korpus do EMU?";

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



            modalContent = (
                <div>
                    <p>Zostaną wyeksportowane tylko te pliki dla których zostały wykonane wszystkie poziomy annotacji.</p>
                    <p>Podcas tego procesu nie wykonuj żadnych czynności</p>
                    {
                        akcjaKorpus
                    }                   
                    
                </div>
                
            );
        }

        //jeżeli kliknięto ikonkę do stworzenia sesji
        if(this.state.whatClicked == 'addSession'){
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
                    show={this.state.modal}
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
                                    whenClicked={this.openConfirmExportToEmu}/>
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
        exportToEmuReady: state.repoR.exportToEmuReady,
	}
}

const mapDispatchToProps = dispatch => {
	return {
    //	onUploadFiles: (fileList, folderKey, userId, projectId, token) => dispatch(repoActions.uploadFiles(fileList,folderKey,userId, projectId, token)),
    
    onExportToEMU: (projectId, userId, token) => dispatch(repoActions.exportToEMU(projectId, userId, token)),

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

    onKorpusDownloaded: () => dispatch(repoActions.korpusDownloaded()),
    
    createNewSession: (sessionName, projectId, userId, token) => dispatch(repoActions.createNewSession(sessionName, projectId, userId, token)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(repoPanel));