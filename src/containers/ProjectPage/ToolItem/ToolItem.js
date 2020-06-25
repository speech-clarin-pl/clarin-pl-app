import React, {Component} from 'react';
import Aux from '../../../hoc/Auxiliary';
import './ToolItem.css';
import * as actionTypes from '../../../store/actions/actionsTypes';
import {connect} from 'react-redux';
import {withRouter } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { faComment} from '@fortawesome/free-solid-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import {ContextMenu, MenuItem, ContextMenuTrigger} from 'react-contextmenu';
import { Tooltip } from '@material-ui/core';
import { faFileAudio } from '@fortawesome/free-solid-svg-icons';
import { faSurprise } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import * as toolItemActions from '../../../store/actions/index';
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";

const override = css`
  display: block;
  margin: 0 auto;
`;

class ToolItem extends Component {


    componentDidUpdate = (prevProps,prevState) => {

    }


    componentDidMount = () => {
     
    }

    runPreview = (e) => {
        this.props.openPreview(this.props.container);
    }

    runProcess = (e) => {
        e.preventDefault();

        //this.props.setToolItemStatus(this.props.container._id, this.props.type, 'progress');
        //this.setState({innerStatus: 'progress'});

        //this.props.setContainerStatus(this.props.container._id, this.props.type, 'progress');

        this.props.runTool(this.props.container, this.props.type, this.props.token)

        /*
        switch(this.props.type){
            case "DIA":
                //this.props.runSpeechDiarization(this.props.container._id, this.props.type, this.props.token); 
                break;
            case "VAD":
                //this.props.runSpeechVoiceActivityDetection(this.props.container._id, this.props.type, this.props.token); 
                this.props.runTool(this.props.container, this.props.type, this.props.token)
                break;
            case "REC":
                this.props.runSpeechRecognition(this.props.container._id, this.props.type, this.props.token); 
                break;
            case "SEG":
                this.props.runSpeechSegmentation(this.props.container._id, this.props.type, this.props.token); 
                break;
            default:
                console.log("Default"); //to do
        }
        */


       
    }

    

    render(){

        let iconType = faFileAlt;

        //do wskazywania czy obecnie jest edytowany
        let czyEdytowany = '';

        switch(this.props.type){
            case "DIA":
                iconType = faComment;
                if(this.props.container._id==this.props.DIAcontainerInPreview._id){
                    czyEdytowany='editing';
                }
                break;
            case "VAD":
                iconType = faSurprise;
                if(this.props.container._id==this.props.VADcontainerInPreview._id){
                    czyEdytowany='editing';
                }
                break;
            case "REC":
                iconType = faFileAlt;
                if(this.props.container._id==this.props.RECcontainerInPreview._id){
                    czyEdytowany='editing';
                }
                break;
            case "SEG":
                iconType = faClock;
                if(this.props.container._id==this.props.SEGcontainerInPreview._id){
                    czyEdytowany='editing';
                }
                break;
            default:
                console.log("Default"); //to do
        }

        // naprawianie wyświetlania wielkości pliku
        let nBytes = this.props.container.size;
        let filesize = nBytes + " bytes";
        for (let aMultiples = ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"], nMultiple = 0, nApprox = nBytes / 1024; nApprox > 1; nApprox /= 1024, nMultiple++) {
            filesize = nApprox.toFixed(1) + " " + aMultiples[nMultiple];
        }

        let previewIconAlpha = 1;

        let statusIcon = null;
        let progressBar = null;
        let runProcessIcon = (
            <Tooltip title={"Uruchom " + this.props.type}>
                <a href="#" role="button" onClick={this.runProcess}>
                    <FontAwesomeIcon icon={iconType} className="faIcon"/>
                </a>
            </Tooltip>
        );

        
                       

        switch (this.props.status) {
            case 'ready':
                statusIcon = null;
                previewIconAlpha = 1;
                break;
            case 'error':
                statusIcon = <FontAwesomeIcon icon={faExclamationCircle} className="faIcon" style={{color: 'red'}} /> ;
                break;
            case 'progress':
                //statusIcon = <FontAwesomeIcon icon={faSpinner} className="faIcon" /> ;
                statusIcon = <RingLoader
                    css={override}
                    size={'25px'}
                    color={"rgb(52, 152, 219)"}
                    loading={true}
                />
                progressBar = (
                    <div className="progress">
                        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{width:'100%'}}></div>
                    </div>
                );

                previewIconAlpha = 0.5;
                runProcessIcon = <FontAwesomeIcon icon={iconType} className="faIcon" style={{opacity: 0.5, color: '#3498db'}}/>

                break;
            case 'done':

                previewIconAlpha = 1;
                statusIcon = <FontAwesomeIcon icon={faCheck} className="faIcon" /> ;
                progressBar = null;

                runProcessIcon = <FontAwesomeIcon icon={iconType} className="faIcon" style={{opacity: 0.5, color: '#1cce44'}}/>
            default:
                statusIcon = null;
        }


        let previewIcon = (
            <Tooltip title={"Podgląd " + this.props.type}>
                <a href="#" role="button" onClick={previewIconAlpha===1? this.runPreview: null}>
                    <FontAwesomeIcon icon={faEye} className="faIcon" style={{opacity: previewIconAlpha, color: '#3498db'}} />
                </a>
            </Tooltip>
        )

        



       
        return(

            <Aux>
                <ContextMenuTrigger id="ToolItemId">
                    <div className={"ToolItem " + czyEdytowany}>
                        <div className={["row", "toolItem"].join(' ')}>
                            <div className="col-sm-6 file-info align-self-center pr-1">
                                <span className={"fileName"}>{this.props.container.containerName}</span>
                            </div>
                            <div className="col-sm-2 filesize align-self-center pl-1 pr-1 pl-1">
                                {filesize}
                            </div>
                            <div className="col-sm-1 status align-self-center pl-1 pr-1">
                                {statusIcon}
                            </div>
                            <div className="col-sm-3 actionIcons align-self-center pl-1 pr-1">
                                {//playIcon
                                }
                                {previewIcon}
                                {runProcessIcon} 
                            </div>
                        </div>
                        {progressBar}
                    </div>
                </ContextMenuTrigger>

                <ContextMenu id="ToolItemId">
                    <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
                    ContextMenu Item 1
                    </MenuItem>
                    <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
                    ContextMenu Item 2
                    </MenuItem>
                    <MenuItem divider />
                    <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
                    ContextMenu Item 3
                    </MenuItem>
                </ContextMenu>

            </Aux>
        );
    }


}

const mapStateToProps = state => {
    return {
        userId: state.projectR.currentProjectOwner,
        projectId: state.projectR.currentProjectID,
        token: state.homeR.token,

        RECcontainerInPreview: state.recR.recoContainerForPreview,
        VADcontainerInPreview: state.vadR.vadContainerForPreview,
        DIAcontainerInPreview: state.diaR.diaContainerForPreview,
        SEGcontainerInPreview: state.segR.alignContainerForPreview,

        //containersForRECO: state.recR.filesToUpload,
        //containersFor
        
    }
}

const mapDispatchToProps = dispatch => {
    return {
       // runSpeechRecognition: (containerId, toolType, token) => dispatch(toolItemActions.runSpeechRecognition(containerId, toolType, token)),
       // runSpeechSegmentation: (containerId, toolType, token) => dispatch(toolItemActions.runSpeechSegmentation(containerId, toolType, token)),
       // runSpeechDiarization: (containerId, toolType, token) => dispatch(toolItemActions.runSpeechDiarization(containerId, toolType, token)),
        //runSpeechVoiceActivityDetection: (containerId, toolType, token) => dispatch(toolItemActions.runSpeechVoiceActivityDetection(containerId, toolType, token)),

        
       // setContainerStatus:  (containerId, toolType, status) => dispatch(toolItemActions.setContainerStatus(containerId, toolType, status)),
       // setToolItemStatus: (containerId, toolType, status) => dispatch(toolItemActions.setToolItemStatus(containerId, toolType, status)),
       // updateFileState: (fileID, status,percLoaded) => dispatch(toolItemActions.updateFileState(fileID, status,percLoaded)),
     //     openContainerInPreview: (container, openIn) => dispatch(toolItemActions.openContainerInPreview(container, openIn)),
     
    //    onGetProjectFilesForUser: (userId, projectId, token) => dispatch(recognitionActions.getProjectFilesForUser(userId,projectId, token)),
    //    onFileRecognition: (file, entryId,userId, projectId, audioFrom) => dispatch(recognitionActions.initFileRecognition(file, entryId, userId, projectId, audioFrom)),
    //    onRemoveItem:(fileId) => dispatch(recognitionActions.removeRecognitionItem(fileId)),
    //    onOpenRecognitionAudioPreview:(entryId) => dispatch(recognitionActions.openRecognitionAudioPreview(entryId))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ToolItem));