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


    state = {
        sessions: [
            {
                sessionName: 'Jakaś sesja 1',
                containers: [
                    {
                        containerName: 'nazwa pliku1.mp3',
                        size: 1.5 * 1024 * 1024,
                        id:  'id'+Math.random(),
                        ifAudio: true,
                        ifVAD: true,
                        ifDIA: true,
                        ifREC: true,
                        ifSEG: true,
                    },
                    {
                        containerName: 'nazwa pliku2.mp3',
                        size: 1.5 * 1024 * 1024,
                        id:  'id'+Math.random(),
                        ifAudio: true,
                        ifVAD: true,
                        ifDIA: false,
                        ifREC: false,
                        ifSEG: false,
                    }
                ],
            },
            {
                sessionName: 'Jakaś sesja 2',
                containers: [],
            },
            {
                sessionName: 'Jakaś sesja 3',
                containers: [
                    {
                        containerName: 'nazwa pliku3.mp3',
                        size: 1.5 * 1024 * 1024,
                        id:  'id'+Math.random(),
                        ifAudio: true,
                        ifVAD: true,
                        ifDIA: false,
                        ifREC: false,
                        ifSEG: false,
                    }
                ],
            }
        ],
    }




	render() {

        let listaSesji = null;

        listaSesji = this.state.sessions.map(session => {

            let konteneryDlaSesji = session.containers;
            return  <RepoSession containers={konteneryDlaSesji} />
        });

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
		//currentProjectID: state.projectR.currentProjectID,
	}
}

const mapDispatchToProps = dispatch => {
	return {
	//	onUploadFiles: (fileList, folderKey, userId, projectId, token) => dispatch(repoActions.uploadFiles(fileList,folderKey,userId, projectId, token)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(repoPanel));