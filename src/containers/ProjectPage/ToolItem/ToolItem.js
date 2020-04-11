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
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import {ContextMenu, MenuItem, ContextMenuTrigger} from 'react-contextmenu';
import { Tooltip } from '@material-ui/core';


class ToolItem extends Component {

    state = {

    }
    
    

    render(){

        // naprawianie wyświetlania wielkości pliku
        let nBytes = this.props.container.size;
        let filesize = nBytes + " bytes";
        for (let aMultiples = ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"], nMultiple = 0, nApprox = nBytes / 1024; nApprox > 1; nApprox /= 1024, nMultiple++) {
            filesize = nApprox.toFixed(1) + " " + aMultiples[nMultiple];
        }

       
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
                                <FontAwesomeIcon icon={faCheck} className="faIcon" /> 
                            </div>
                            <div className="col-sm-3 actionIcons align-self-center pl-1 pr-1">

                                <Tooltip title="Play audio">
                                    <a href="#" role="button" >
                                        <FontAwesomeIcon icon={faPlay} className="faIcon"/>
                                    </a>
                                </Tooltip>

                                <Tooltip title="Otwórz txt">
                                    <a href="#" role="button" >
                                        <FontAwesomeIcon icon={faFileAlt} className="faIcon" />
                                    </a>
                                </Tooltip>  
                            </div>
                        </div>
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
    //    updateFileState: (fileID, status,percLoaded) => dispatch(recognitionActions.updateFileState(fileID, status,percLoaded)),
    //    onGetProjectFilesForUser: (userId, projectId, token) => dispatch(recognitionActions.getProjectFilesForUser(userId,projectId, token)),
    //    onFileRecognition: (file, entryId,userId, projectId, audioFrom) => dispatch(recognitionActions.initFileRecognition(file, entryId, userId, projectId, audioFrom)),
    //    onRemoveItem:(fileId) => dispatch(recognitionActions.removeRecognitionItem(fileId)),
    //    onOpenRecognitionAudioPreview:(entryId) => dispatch(recognitionActions.openRecognitionAudioPreview(entryId))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ToolItem));