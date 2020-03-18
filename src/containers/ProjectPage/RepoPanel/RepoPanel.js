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


import ContainerFile from './ContainerFile/ContainerFile';

import { Tooltip } from '@material-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';


class repoPanel extends Component {


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


	render() {

        let listaSesji = null;

        listaSesji = Object.keys(this.props.repoData.sessions.byId).map(sessionId => {
            
        let sId = this.props.repoData.sessions.byId[sessionId].id;
        let sessionName = this.props.repoData.sessions.byId[sessionId].sessionName;
        let ifSelected = this.props.repoData.sessions.byId[sessionId].ifSelected;
        let containersIds = this.props.repoData.sessions.byId[sessionId].containers;

        let containersArray = containersIds.map(containerId => {
            return this.props.repoData.containers.byId[containerId];
        })


            return  <RepoSession 
                            containers={containersArray} 
                            sessionName={sessionName}
                            sessionId = {sId}
                            key = {sId}
                            ifSelected = {ifSelected}
                            selectTheSession = {this.selectSessionHandler}
                            selectTheContainer = {this.selectContainerHandler} />
                 

        })

 

		return (
			<Aux>

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
                                    <FontAwesomeIcon icon={faFolderPlus} /> 
                                </a>
                            </Tooltip>
                            
                            <Tooltip title="Usuń zaznaczony obiekt">
                                <a href="#" role="button">
                                    <FontAwesomeIcon icon={faTrash} /> 
                                </a>
                            </Tooltip>

                            <Tooltip title="Wgraj pliki">
                                <a href="#" role="button">
                                    <FontAwesomeIcon icon={faCloudUploadAlt} /> 
                                </a>
                            </Tooltip>
                            
                        </div>

                        <div className="fileList">
                      
                            
                            {listaSesji}
         
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
        currentProjectID: state.projectR.currentProjectID,
		currentProjectName: state.projectR.currentProjectName,
        currentProjectOwner: state.projectR.currentProjectOwner,
        token: state.homeR.token,
	}
}

const mapDispatchToProps = dispatch => {
	return {
    //	onUploadFiles: (fileList, folderKey, userId, projectId, token) => dispatch(repoActions.uploadFiles(fileList,folderKey,userId, projectId, token)),
    onSelectSession: (sessionId) => dispatch(repoActions.selectSession(sessionId)),
    onSelectContainer: (containerId) => dispatch(repoActions.selectContainer(containerId)),
    onGetProjectFilesForUser: (userId, projectId, token) => dispatch(repoActions.getProjectFilesForUser(userId, projectId, token)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(repoPanel));