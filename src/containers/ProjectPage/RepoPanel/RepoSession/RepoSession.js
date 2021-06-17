import React, {Component} from 'react';
import FileContainer from '../ContainerFile/FileContainer';
import './RepoSession.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import UploadAudio from '../../../../components/UploadAudio/UploadAudio';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import {ContextMenu, MenuItem, ContextMenuTrigger} from 'react-contextmenu';
import EditableLabel from 'react-inline-editing';
import * as repoActions from '../../../../store/actions/index';

class RepoSession extends Component {

    

    state = {
        ifOpened: false,
    }


    clickFolderHandler = () => {
        this.setState({
            ifOpened: this.state.ifOpened? false: true,
        });
    }


    selectTheSession = (event) => {
        event.stopPropagation();

        if(event.ctrlKey){
            this.props.selectTheSession(this.props.sessionId, true);
        } else {
            this.props.selectTheSession(this.props.sessionId, false);
        }
       
    }

    selectTheContainer = (containerId, ifCtrl) => {
       // this.selectTheSession();
        this.props.selectTheContainer(containerId, ifCtrl);
    }

    shouldComponentUpdate(nextProps, nextState){
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


     _handleFocus = (text) => {
        // console.log('Focused with text: ' + text);
     }
 
     _handleFocusOut = (text) => {
        // console.log('Left editor with text: ' + this.props.projectID + " " + text + " " + this.props.userId + " " + this.props.token);
        //this.props.onChangeProjectName(this.props.projectID, text, this.props.userId, this.props.token);
       //console.log(this.props.token)
       this.props.onChangeSessionName(this.props.sessionId, text, this.props.token);
       //alert("dziala")
     }


    render() {

        //sprawdzam czy otworzyc folder demo na potrzeby react tour
        
        let uploadCard = (
            <div className="uploadCard">
                <UploadAudio forSession={this.props.sessionId} />
            </div>
        )

        let containerList = null;

        if(this.props.containers && this.props.containers.length > 0){
            containerList = this.props.containers.map(container => {
                if(container){
                    return   <FileContainer 
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
                 }
             
            });
        }
        

        
        let ifSessionOpened = this.state.ifOpened;
        if(this.props.reactTourOpenDemoSession){
            (this.props.sessionName==="demo" && ifSessionOpened===false)?  ifSessionOpened = true : ifSessionOpened = false;
        }
       

       // this.state.ifOpened || (this.props.reactTourOpenDemoSession && this.props.sessionName==="demo")? 


        return (
            <div className="RepoSession">

                <ContextMenuTrigger id={"ToolItemSESSIONId"+this.props.sessionId}>
                    <div className={this.props.ifSelected? "sessionFolder selected" : "sessionFolder"} onClick={this.selectTheSession} >

                        <FontAwesomeIcon icon={this.state.ifOpened? faChevronDown: faChevronRight} className="repoIcon" style={{fontSize: '0.7em', marginTop: '8px'}} onClick={this.clickFolderHandler}/>
                        <FontAwesomeIcon icon={this.state.ifOpened? faFolderOpen: faFolder} className="repoIcon" style={{marginTop: '5px', marginRight: '5px'}} onClick={this.clickFolderHandler}/> 
                        <div className="sessionName" >
                            {
                               // this.props.sessionName
                            }
                                <div className="edytorNazwySesji">
                                    <EditableLabel text={this.props.sessionName}
                                        labelClassName='myLabelSessionClass'
                                        inputClassName='myInputSessionClass'
                                        inputWidth='160px'
                                        isEditing={false}
                                        inputHeight='25px'
                                        inputMaxLength={50}
                                        onFocus={this._handleFocus}
                                        onFocusOut={this._handleFocusOut}
                                    />
                                </div>
                                
                        </div>

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
                    {ifSessionOpened? uploadCard: null}
                    {ifSessionOpened? containerList: null}
                </div>
                
             </div>
        )
    }
}

const mapStateToProps = (state) => {
	return {
        reactTourOpenDemoSession: state.repoR.reactTourOpenDemoSession,
	}
}



const mapDispatchToProps = dispatch => {
	return {
    //	onUploadFiles: (fileList, folderKey, userId, projectId, token) => dispatch(repoActions.uploadFiles(fileList,folderKey,userId, projectId, token)),
      onChangeSessionName: (sessionId, newText, token) => dispatch(repoActions.changeSessionName(sessionId, newText, token)),
}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RepoSession));



