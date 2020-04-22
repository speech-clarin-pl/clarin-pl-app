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


class ToolItem extends Component {

    state = {
        innerStatus:'', //can be error or progress
    }

    runPreview = (e) => {

        // switch(this.props.type){
        //     case "DIA":
        //         console.log("run preview DIA");
        //         break;
        //     case "VAD":
        //         console.log("run preview VAD");
        //         break;
        //     case "RECO":
        //         console.log("run preview RECO");
        //         break;
        //     case "ALIGN":
        //         console.log("run preview ALIGN");
        //         break;
        //     default:
        //         console.log("Default"); //to do
        // }

       // console.log("test")
        this.props.openPreview(this.props.container);
    }

    runProcess = (e) => {
        e.preventDefault();

        this.setState({innerStatus: 'progress'});

        switch(this.props.type){
            case "DIA":
                this.runDIA(e);
                break;
            case "VAD":
                this.runVAD(e);
                break;
            case "RECO":
                this.runRECO(e);
                break;
            case "ALIGN":
                this.runALIGN(e);
                break;
            default:
                console.log("Default"); //to do
        }

         //wysyłam do serwera aby uruchomił usługę i po zakończeniu zaktualizował flage
        this.props.runSpeechService(this.props.container._id, this.props.type, this.props.token);

        //tylko symulacja do zastapienia
        let inprogress = setTimeout(()=> {

          

            this.setState({innerStatus: 'done'});

        }, 2000);
    }

    runALIGN = (e) => {  
        console.log("runALIGN")
    }

    runVAD = (e) => {  
        console.log("runVAD")
    }

    runDIA = (e) => {  
        console.log("runDIA")
    }
    
    runRECO = (e) => {  
        
        console.log("runRECO")
    }
    

    render(){

        let iconType = faFileAlt;

        switch(this.props.type){
            case "DIA":
                iconType = faComment;
                break;
            case "VAD":
                iconType = faSurprise;
                break;
            case "RECO":
                iconType = faFileAlt;
                break;
            case "ALIGN":
                iconType = faClock;
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

        let previewIconAlpha = 0.5;

        let statusIcon = null;
        let progressBar = null;
        let runProcessIcon = (
            <Tooltip title={"Uruchom " + this.props.type}>
                <a href="#" role="button" onClick={this.runProcess}>
                    <FontAwesomeIcon icon={iconType} className="faIcon"/>
                </a>
            </Tooltip>
        );
        
        let playIcon = (
            <Tooltip title="Play audio">
                <a href="#" role="button" disabled>
                    <FontAwesomeIcon icon={faPlay} className="faIcon"/>
                </a>
            </Tooltip>
        );
               


        switch (this.state.innerStatus) {
            case 'error':
                statusIcon = <FontAwesomeIcon icon={faExclamationCircle} className="faIcon" /> ;
                break;
            case 'progress':
                statusIcon = <FontAwesomeIcon icon={faSpinner} className="faIcon" /> ;
                progressBar = (
                    <div className="progress">
                        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{width:'100%'}}></div>
                    </div>
                );

                previewIconAlpha = 0.5;
                runProcessIcon = <FontAwesomeIcon icon={iconType} className="faIcon" style={{opacity: 0.5}}/>
                playIcon = (
                     <FontAwesomeIcon icon={faPlay} className="faIcon" style={{opacity: 0.5}}/>
                );
                break;
            case 'done':

                previewIconAlpha = 1;
                statusIcon = <FontAwesomeIcon icon={faCheck} className="faIcon" /> ;
                progressBar = null;
                playIcon = (
                    <FontAwesomeIcon icon={faPlay} className="faIcon" style={{opacity: 0.5}}/>
                );
                runProcessIcon = <FontAwesomeIcon icon={iconType} className="faIcon" style={{opacity: 0.5}}/>
            default:
                statusIcon = null;
        }


        let previewIcon = (
            <Tooltip title={"Podgląd " + this.props.type}>
                <a href="#" role="button" onClick={previewIconAlpha===1? this.runPreview: null}>
                    <FontAwesomeIcon icon={faEye} className="faIcon" style={{opacity: previewIconAlpha}} />
                </a>
            </Tooltip>
        )

       
        return(

            <Aux>
                <ContextMenuTrigger id="ToolItemId">
                    <div className="ToolItem ">
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
                                {playIcon}
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
    }
}

const mapDispatchToProps = dispatch => {
    return {
        runSpeechService: (containerId, toolType, token) => dispatch(toolItemActions.runSpeechService(containerId, toolType, token)),
     //     openContainerInPreview: (container, openIn) => dispatch(toolItemActions.openContainerInPreview(container, openIn)),
    //    updateFileState: (fileID, status,percLoaded) => dispatch(recognitionActions.updateFileState(fileID, status,percLoaded)),
    //    onGetProjectFilesForUser: (userId, projectId, token) => dispatch(recognitionActions.getProjectFilesForUser(userId,projectId, token)),
    //    onFileRecognition: (file, entryId,userId, projectId, audioFrom) => dispatch(recognitionActions.initFileRecognition(file, entryId, userId, projectId, audioFrom)),
    //    onRemoveItem:(fileId) => dispatch(recognitionActions.removeRecognitionItem(fileId)),
    //    onOpenRecognitionAudioPreview:(entryId) => dispatch(recognitionActions.openRecognitionAudioPreview(entryId))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ToolItem));