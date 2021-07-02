import React, {Component} from 'react';

import './FileContainer.css';

//import {DragPreviewImage, useDrag} from 'react-dnd';
//import ItemTypes from '../../ItemDndTypes';

import {ContextMenu, MenuItem, ContextMenuTrigger} from 'react-contextmenu';
//import dragImage from '../../../ProjectPage/dragImage';
import EditableLabel from 'react-inline-editing';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faFileAudio } from '@fortawesome/free-solid-svg-icons';
//import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faSurprise } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from '@material-ui/core';

import {withRouter } from 'react-router-dom';
import {injectIntl, FormattedMessage} from 'react-intl';


class FileContainer extends Component {

    selectContainer = (event) => {
        event.stopPropagation();

        if(event.ctrlKey){
            this.props.selectContainer(this.props.container._id, true);
        } else {
            this.props.selectContainer(this.props.container._id, false);
        }
        
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

      
        const VADerrorClass = this.props.container.statusVAD==='error'? "error":"";
        const DIAerrorClass = this.props.container.statusDIA==='error'? "error":"";
        const RECerrorClass = this.props.container.statusREC==='error'? "error":"";
        const SEGerrorClass = this.props.container.statusSEG==='error'? "error":"";


        //na potrzeby instrukcji
        let dataTutValue = "";
        if(this.props.container.fileName==="opowiesci-811cddd0.wav") dataTutValue = "ikonkiRepo";

        let addODoTranskrypcji = "";

        if(this.props.container.fileName==="opowiesci-811cddd0.wav") addODoTranskrypcji = "dodajOpowiesciDoTranskrypcji";
        if(this.props.container.fileName==="kleska-29d61ce0.wav") addODoTranskrypcji = "dodajKleskaDoTranskrypcji";

        

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
                                <div className="repoManageIcons" data-tut={dataTutValue+""}>
                                
                                {
                                    /*
                                    <Tooltip title="Posłuchaj">
                                    <a href="#" role="button" onClick={this.runPlay} >
                                        <FontAwesomeIcon icon={faPlay} className={["repoIcon",this.props.ifAudio? "on": ""].join(" ")} /> 
                                    </a>
                                </Tooltip>
                                    */
                                }
                               

                                <Tooltip title={this.props.intl.formatMessage(
                                                    {
                                                        id:"FileContainer-tooTipvad",
                                                        description: 'tool tip VAD', 
                                                        defaultMessage: "Detekcja mowy (VAD)",
                                                    },
                                                )}>
                                    <button className="buttonaslink" onClick={this.runVAD} style={{padding: '0px'}} >
                                        
                                        <FontAwesomeIcon icon={faSurprise} className={["repoIcon",VADerrorClass, this.props.container.ifVAD? "on": ""].join(" ")}/> 
                                    </button>
                                </Tooltip>

                                <Tooltip title={this.props.intl.formatMessage(
                                                    {
                                                        id:"FileContainer-tooTipDIA",
                                                        description: 'tool tip DIA', 
                                                        defaultMessage: "Diaryzacja (DIA)",
                                                    },
                                                )}>
                                    <button className="buttonaslink" onClick={this.runDIA} style={{padding: '0px'}}>
                                        <FontAwesomeIcon icon={faComment} className={["repoIcon",DIAerrorClass, this.props.container.ifDIA? "on": ""].join(" ")}/> 
                                    </button>
                                </Tooltip>

                                <Tooltip title={this.props.intl.formatMessage(
                                                    {
                                                        id:"FileContainer-tooTipREC",
                                                        description: 'tool tip REC', 
                                                        defaultMessage: "Rozpoznawanie mowy (REC)",
                                                    },
                                                )} data-tut={addODoTranskrypcji+""}>
                                    <button className="buttonaslink" onClick={this.runRECO} style={{padding: '0px'}}>
                                        <FontAwesomeIcon icon={faFileAlt} className={["repoIcon",RECerrorClass, this.props.container.ifREC? "on": ""].join(" ")}/> 
                                    </button>
                                </Tooltip>

                                <Tooltip title={this.props.intl.formatMessage(
                                                    {
                                                        id:"FileContainer-tooTipSEG",
                                                        description: 'tool tip SEG', 
                                                        defaultMessage: "Segmentacja (SEG)",
                                                    },
                                                )}>
                                    <button className="buttonaslink" onClick={this.runALIGN} style={{padding: '0px'}}>
                                        <FontAwesomeIcon icon={faClock} className={["repoIcon",SEGerrorClass, this.props.container.ifSEG? "on": ""].join(" ")}/> 
                                    </button>
                                </Tooltip>
                               
                               </div>

                            </div>
                        </div>
                    </div>
                </ContextMenuTrigger>

                <ContextMenu id={"ToolItemREPOId"+this.props.container._id}>
                    <MenuItem disabled={false} data={{toolType: this.props.type, action: 'copyId'}} onClick={this.handleClick}>
                                <FormattedMessage
									id="FileContainer-contextKopijID"
									description="context menu kopiuj id" 
									defaultMessage="Kopiuj ID" 
								/>: {this.props.container._id}
                    </MenuItem>
                    <MenuItem divider />
                    <MenuItem disabled={false} data={{toolType: this.props.type, action: 'usun'}} onClick={this.handleClick}>
                                <FormattedMessage
									id="FileContainer-contextUsunZRepo"
									description="context menu usun z repo" 
									defaultMessage="Usuń z repozytorium" 
								/>
                    </MenuItem>
                    <MenuItem divider />
                    <MenuItem disabled={false} data={{toolType: this.props.type, action: 'audio'}} onClick={this.handleClick}>
                                <FormattedMessage
									id="FileContainer-contextPobierzConverted"
									description="context pobierz przekonwertowany" 
									defaultMessage="Pobierz plik audio WAV 16000Hz, 16bit" 
								/>
                    </MenuItem>
                    <MenuItem disabled={false} data={{toolType: this.props.type, action: 'oryginalAudio'}} onClick={this.handleClick}>
                                <FormattedMessage
                                        id="FileContainer-contextPobierzOryginalny"
                                        description="context pobierz oryginalny" 
                                        defaultMessage="Pobierz oryginalny plik audio" 
                                />
                    </MenuItem>
                    <MenuItem divider />
                    <MenuItem disabled={this.props.container.ifVAD? false: true} data={{toolType: this.props.type, action: 'VADctm'}} onClick={this.handleClick}>
                                <FormattedMessage
                                        id="FileContainer-contextPobierzVADwCTM"
                                        description="context pobierz VAD w CTM" 
                                        defaultMessage="Pobierz plik detekcji mowy w formacie CTM" 
                                />
                         
                    </MenuItem>
                    <MenuItem disabled={this.props.container.ifVAD? false: true} data={{toolType: this.props.type, action: 'VADtextGrid'}} onClick={this.handleClick}>
                                <FormattedMessage
                                        id="FileContainer-contextPobierzVADwTextGrid"
                                        description="context pobierz VAD w TextGrid" 
                                        defaultMessage="Pobierz plik detekcji mowy w formacie TextGrid" 
                                />
                    </MenuItem>
                    <MenuItem disabled={this.props.container.ifDIA? false: true} data={{toolType: this.props.type, action: 'DIActm'}} onClick={this.handleClick}>
                                <FormattedMessage
                                        id="FileContainer-contextPobierzDIAwCTM"
                                        description="context pobierz DIA w CTM" 
                                        defaultMessage="Pobierz plik diaryzacji w formacie CTM" 
                                />
                        
                    </MenuItem>
                    <MenuItem disabled={this.props.container.ifDIA? false: true} data={{toolType: this.props.type, action: 'DIAtextGrid'}} onClick={this.handleClick}>
                                <FormattedMessage
                                        id="FileContainer-contextPobierzDIAwTextGrid"
                                        description="context pobierz DIA w TextGrid" 
                                        defaultMessage="Pobierz plik diaryzacji mowy w formacie TextGrid" 
                                />
                         
                    </MenuItem>
                    <MenuItem disabled={this.props.container.ifREC? false: true} data={{toolType: this.props.type, action: 'TXTTranscript'}} onClick={this.handleClick}>
                                <FormattedMessage
                                        id="FileContainer-contextPobierzRECwTXT"
                                        description="context pobierz REC w txt" 
                                        defaultMessage="Pobierz transkrypcje w formacie txt" 
                                />
                         
                    </MenuItem>
                    <MenuItem disabled={this.props.container.ifREC? false: true} data={{toolType: this.props.type, action: 'JSONTranscript'}} onClick={this.handleClick}>
                                <FormattedMessage
                                        id="FileContainer-contextPobierzRECwJSON"
                                        description="context pobierz REC w JSON" 
                                        defaultMessage="Pobierz transkrypcje w formacie json" 
                                />
                    </MenuItem>
                    <MenuItem disabled={this.props.container.ifSEG? false: true} data={{toolType: this.props.type, action: 'SEGctm'}} onClick={this.handleClick}>
                                <FormattedMessage
                                        id="FileContainer-contextPobierzSEGwCTM"
                                        description="context pobierz SEG w CTM" 
                                        defaultMessage="Pobierz segmentacje w formacie ctm" 
                                />
                         
                    </MenuItem>
                    <MenuItem disabled={this.props.container.ifSEG? false: true} data={{toolType: this.props.type, action: 'SEGtextGrid'}} onClick={this.handleClick}>
                                <FormattedMessage
                                        id="FileContainer-contextPobierzSEGwTextGrid"
                                        description="context pobierz SEG w TextGrid" 
                                        defaultMessage=" Pobierz segmentacje w formacie TextGrid" 
                                />
                    </MenuItem>
                    <MenuItem disabled={this.props.container.ifSEG? false: true} data={{toolType: this.props.type, action: 'EMUJSON'}} onClick={this.handleClick}>
                            <FormattedMessage
                                        id="FileContainer-contextPobierzSEGwTextjson"
                                        description="context pobierz SEG w json" 
                                        defaultMessage="Pobierz segmentacje w formacie json" 
                                />
                        
                    </MenuItem>
                </ContextMenu>

             

            </div>

        )
    }
}

export default withRouter(injectIntl(FileContainer));