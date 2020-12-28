import React, {Component} from 'react';
import ContainerFile from '../ContainerFile/ContainerFile';
import './RepoSession.css';

import UploadAudio from '../../../../components/UploadAudio/UploadAudio';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import {ContextMenu, MenuItem, ContextMenuTrigger} from 'react-contextmenu';

class RepoSession extends Component {

    state = {
        ifOpened: false,
    }

    clickFolderHandler = () => {
        this.setState({
            ifOpened: this.state.ifOpened? false: true,
        });
    }

    selectTheSession = () => {
      //  this.props.selectTheContainer(null);
        this.props.selectTheSession(this.props.sessionId);
    }

    selectTheContainer = (containerId) => {
       // this.selectTheSession();
        this.props.selectTheContainer(containerId);
    }

    shouldComponentUpdate(nextProps, nextState){
        //console.log(nextProps)
        return true;
    }

    copyToClipboard = (text) => {
        const str = text;
        const el = document.createElement('textarea');
        el.value = str;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }

    handleClick = (e, data) => {

        //const toolType = data.toolType;
        const action = data.action;
 
        switch(action){
            case 'usun':
                 this.props.onRemoveSession(this.props.sessionId, this.props.sessionName);
                 break;
            case 'kopiujID':
                const theID = this.props.sessionId;
                this.copyToClipboard(theID);
                 break;
             default:
                 console.log("wrong action")
        }
     }


    render() {

        let uploadCard = (
            <div className="uploadCard">
                <UploadAudio forSession={this.props.sessionId} />
            </div>
        )

        let containerList = null;

        containerList = this.props.containers.map(container => {
            return   <ContainerFile 
                            container = {container}
                            onAddContainerToReco = {this.props.onAddContainerToReco}
                            onAddContainerToAlign = {this.props.onAddContainerToAlign}
                            onAddContainerToVAD = {this.props.onAddContainerToVAD}
                            onAddContainerToDIA = {this.props.onAddContainerToDIA}
                            onChangeContainerName = {this.props.onChangeContainerName}
                            key = {container._id}
                            onRemoveContainer = {this.props.onRemoveContainer}
                            token={this.props.token}
                            ifSelected = {container.ifSelected}
                            selectContainer = {this.selectTheContainer}/>
        });

        



        return (
            <div className="RepoSession">

                <ContextMenuTrigger id={"ToolItemSESSIONId"+this.props.sessionId}>
                    <div className={this.props.ifSelected? "sessionFolder selected" : "sessionFolder"} onClick={this.selectTheSession} >

                        <FontAwesomeIcon icon={this.state.ifOpened? faChevronDown: faChevronRight} className="repoIcon" style={{fontSize: '0.7em'}} onClick={this.clickFolderHandler}/>
                        <FontAwesomeIcon icon={this.state.ifOpened? faFolderOpen: faFolder} className="repoIcon" onClick={this.clickFolderHandler}/> 
                        <span className="sessionName" >{this.props.sessionName}</span>

                        {this.props.ifSelected?
                            <FontAwesomeIcon icon={faChevronDown} className="repoIcon" style={{fontSize: '0.7em', float: 'right', margin: '6px'}} onClick={this.clickFolderHandler}/> 
                            :
                            null
                        }
                        

                    </div>
                </ContextMenuTrigger>

                <ContextMenu id={"ToolItemSESSIONId"+this.props.sessionId}>
                    <MenuItem disabled={false} data={{action: 'kopiujID'}} onClick={this.handleClick}>
                         Kopiuj ID sesji: {this.props.sessionId}
                    </MenuItem>
                    <MenuItem disabled={false} data={{action: 'usun'}} onClick={this.handleClick}>
                         Usuń sesje wraz z zawartością
                    </MenuItem>
                </ContextMenu>

                <div className="containerList">
                    {this.state.ifOpened? uploadCard: null}
                    {this.state.ifOpened? containerList: null}
                </div>
                
             </div>
        )
    }
}

export default RepoSession;