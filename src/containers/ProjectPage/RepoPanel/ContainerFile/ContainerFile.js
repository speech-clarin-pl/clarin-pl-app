import React, {Component} from 'react';

import './ContainerFile.css';

import {DragPreviewImage, useDrag} from 'react-dnd';
import ItemTypes from '../../ItemDndTypes';

import {ContextMenu, MenuItem, ContextMenuTrigger} from 'react-contextmenu';
import dragImage from '../../../ProjectPage/dragImage';
import EditableLabel from 'react-inline-editing';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAudio } from '@fortawesome/free-solid-svg-icons';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faSurprise } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from '@material-ui/core';

import {withRouter } from 'react-router-dom';



class ContainerFile extends Component {

    selectContainer = () => {
        this.props.selectContainer(this.props.container._id)
    }

    handleClick = (e, data) => {
        console.log(data.foo);
    }

    componentDidMount = () =>{
       // console.log("ready")
    }

    runVAD = (e) => {
        e.preventDefault();
        this.props.history.push('/projects/' + this.props.container.project +'/vad/');
        this.props.onAddContainerToVAD(this.props.container);
    }


    runDIA = (e) => {
        e.preventDefault();
        this.props.history.push('/projects/' + this.props.container.project +'/dia/');
        this.props.onAddContainerToDIA(this.props.container);
    }

    runRECO = (e) => {
        e.preventDefault();
        this.props.history.push('/projects/' + this.props.container.project +'/recognition/');
        this.props.onAddContainerToReco(this.props.container);
    }

    runALIGN = (e) => {
        e.preventDefault();
        this.props.history.push('/projects/' + this.props.container.project +'/segment/');
        this.props.onAddContainerToAlign(this.props.container);
    }


   
    downloadElement = (action) => {

        const userId = this.props.container.owner;
        const projectId = this.props.container.project;
        const sessionId = this.props.container.session;
        const containerId = this.props.container._id;
        const fileType = action;

        
        //let linkToDownload = process.env.REACT_APP_API_URL+ "/repoFiles/" + userId + "/" + projectId+"/"+sessionId+"/"+containerId+"/"+fileType+"/?api_key="+this.props.token;

        let linkToDownload = process.env.REACT_APP_API_URL+ "/repoFiles/download/"+containerId+"/"+fileType+"/?api_key="+this.props.token;
      

        window.open(linkToDownload,"_self");

       
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
           case 'copyId':
                const theID = this.props.container._id;
                this.copyToClipboard(theID);
                break;
           case 'usun':
                this.props.onRemoveContainer(this.props.container);
                break;
            case 'audio':
                this.downloadElement(action);
                break;
            case 'oryginalAudio':
                this.downloadElement(action);
                break;
            case 'VADctm':
                this.downloadElement(action);
                break;
            case 'VADtextGrid':
                this.downloadElement(action);
                break;
            case 'DIActm':
                this.downloadElement(action);
                break;
            case 'DIAtextGrid':
                this.downloadElement(action);
                break;
            case 'TXTTranscript':
                this.downloadElement(action);
                break;
            case 'JSONTranscript':
                this.downloadElement(action);
                break;
            case 'SEGctm':
                this.downloadElement(action);
                break;
            case 'SEGtextGrid':
                this.downloadElement(action);
                break;
            case 'EMUJSON':
                this.downloadElement(action);
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
        this.props.onChangeContainerName(this.props.container, text, this.props.token);
     }



    render() {

        

        //wyświetlam tylko pierwsze 11 znaków nazwy pliku....
        let contName = this.props.container.containerName;
        //if(contName.length > 11){
        //    contName = contName.substring(1,11) + "...";
        //}

      
        const VADerrorClass = this.props.container.statusVAD=='error'? "error":"";
        const DIAerrorClass = this.props.container.statusDIA=='error'? "error":"";
        const RECerrorClass = this.props.container.statusREC=='error'? "error":"";
        const SEGerrorClass = this.props.container.statusSEG=='error'? "error":"";
 

        

        return(
            <div>
              
                <ContextMenuTrigger id={"ToolItemREPOId"+this.props.container._id}>

                    <div className={this.props.ifSelected? "ContainerFile selected" : "ContainerFile"} 
                        onClick={this.selectContainer}
                        >

                        <div className="row">
                            <div className="col">
                                <div className="containerName">

                                {
                                    //<FontAwesomeIcon icon={faFileAudio} className="repoIconMain" /> 
                                }
                                   
                                
                                     <EditableLabel text={contName}
                                        labelClassName='myLabelContainerClass'
                                        inputClassName='myInputContainerClass'
                                        inputWidth='160px'
                                        isEditing={false}
                                        inputHeight='25px'
                                        inputMaxLength={50}
                                        onFocus={this._handleFocus}
                                        onFocusOut={this._handleFocusOut}
                                    />


                                </div>
                                
                            </div>
                            <div className="col">
                                <div className="repoManageIcons">
                                
                                {
                                    /*
                                    <Tooltip title="Posłuchaj">
                                    <a href="#" role="button" onClick={this.runPlay} >
                                        <FontAwesomeIcon icon={faPlay} className={["repoIcon",this.props.ifAudio? "on": ""].join(" ")} /> 
                                    </a>
                                </Tooltip>
                                    */
                                }
                               

                                <Tooltip title="Detekcja mowy (VAD)">
                                    <a href="#" role="button"  onClick={this.runVAD} >
                                        
                                        <FontAwesomeIcon icon={faSurprise} className={["repoIcon",VADerrorClass, this.props.container.ifVAD? "on": ""].join(" ")}/> 
                                    </a>
                                </Tooltip>

                                <Tooltip title="Diaryzacja (DIA)">
                                    <a href="#" role="button" onClick={this.runDIA} >
                                        <FontAwesomeIcon icon={faComment} className={["repoIcon",DIAerrorClass, this.props.container.ifDIA? "on": ""].join(" ")}/> 
                                    </a>
                                </Tooltip>

                                <Tooltip title="Rozpoznawanie mowy (REC)">
                                    <a href="#" role="button" onClick={this.runRECO} >
                                        <FontAwesomeIcon icon={faFileAlt} className={["repoIcon",RECerrorClass, this.props.container.ifREC? "on": ""].join(" ")}/> 
                                    </a>
                                </Tooltip>

                                <Tooltip title="Segmentacja (SEG)">
                                    <a href="#" role="button"  onClick={this.runALIGN}>
                                        <FontAwesomeIcon icon={faClock} className={["repoIcon",SEGerrorClass, this.props.container.ifSEG? "on": ""].join(" ")}/> 
                                    </a>
                                </Tooltip>
                               
                               </div>

                            </div>
                        </div>
                    </div>
                </ContextMenuTrigger>

                <ContextMenu id={"ToolItemREPOId"+this.props.container._id}>
                    <MenuItem disabled={false} data={{toolType: this.props.type, action: 'copyId'}} onClick={this.handleClick}>
                         Kopiuj ID: {this.props.container._id}
                    </MenuItem>
                    <MenuItem divider />
                    <MenuItem disabled={false} data={{toolType: this.props.type, action: 'usun'}} onClick={this.handleClick}>
                         Usuń z repozytorium
                    </MenuItem>
                    <MenuItem divider />
                    <MenuItem disabled={false} data={{toolType: this.props.type, action: 'audio'}} onClick={this.handleClick}>
                         Pobierz plik audio WAV 16000Hz, 16bit
                    </MenuItem>
                    <MenuItem disabled={false} data={{toolType: this.props.type, action: 'oryginalAudio'}} onClick={this.handleClick}>
                         Pobierz oryginalny plik audio
                    </MenuItem>
                    <MenuItem divider />
                    <MenuItem disabled={this.props.container.ifVAD? false: true} data={{toolType: this.props.type, action: 'VADctm'}} onClick={this.handleClick}>
                         Pobierz plik detekcji mowy w formacie CTM
                    </MenuItem>
                    <MenuItem disabled={this.props.container.ifVAD? false: true} data={{toolType: this.props.type, action: 'VADtextGrid'}} onClick={this.handleClick}>
                         Pobierz plik detekcji mowy w formacie TextGrid
                    </MenuItem>
                    <MenuItem disabled={this.props.container.ifDIA? false: true} data={{toolType: this.props.type, action: 'DIActm'}} onClick={this.handleClick}>
                         Pobierz plik diaryzacji w formacie CTM
                    </MenuItem>
                    <MenuItem disabled={this.props.container.ifDIA? false: true} data={{toolType: this.props.type, action: 'DIAtextGrid'}} onClick={this.handleClick}>
                         Pobierz plik diaryzacji mowy w formacie TextGrid
                    </MenuItem>
                    <MenuItem disabled={this.props.container.ifREC? false: true} data={{toolType: this.props.type, action: 'TXTTranscript'}} onClick={this.handleClick}>
                         Pobierz transkrypcje w formacie txt
                    </MenuItem>
                    <MenuItem disabled={this.props.container.ifREC? false: true} data={{toolType: this.props.type, action: 'JSONTranscript'}} onClick={this.handleClick}>
                          Pobierz transkrypcje w formacie json
                    </MenuItem>
                    <MenuItem disabled={this.props.container.ifSEG? false: true} data={{toolType: this.props.type, action: 'SEGctm'}} onClick={this.handleClick}>
                         Pobierz segmentacje w formacie ctm
                    </MenuItem>
                    <MenuItem disabled={this.props.container.ifSEG? false: true} data={{toolType: this.props.type, action: 'SEGtextGrid'}} onClick={this.handleClick}>
                         Pobierz segmentacje w formacie TextGrid
                    </MenuItem>
                    <MenuItem disabled={this.props.container.ifSEG? false: true} data={{toolType: this.props.type, action: 'EMUJSON'}} onClick={this.handleClick}>
                        Pobierz segmentacje w formacie json
                    </MenuItem>
                </ContextMenu>

             

            </div>

        )
    }
}

export default withRouter(ContainerFile);