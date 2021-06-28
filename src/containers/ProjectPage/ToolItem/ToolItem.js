import React, {Component} from 'react';
import Aux from '../../../hoc/Auxiliary';
import './ToolItem.css';
//import * as actionTypes from '../../../store/actions/actionsTypes';
import {connect} from 'react-redux';
import {withRouter } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
//import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { faComment} from '@fortawesome/free-solid-svg-icons';
//import { faSpinner } from '@fortawesome/free-solid-svg-icons';
//import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
//import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import {ContextMenu, MenuItem, ContextMenuTrigger} from 'react-contextmenu';
import { Tooltip } from '@material-ui/core';
//import { faFileAudio } from '@fortawesome/free-solid-svg-icons';
import { faSurprise } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
//import * as toolItemActions from '../../../store/actions/index';
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";
import Modal from '../../../components/UI/Modal/Modal';
import {injectIntl, FormattedMessage} from 'react-intl';


const override = css`
  display: block;
  margin: 0 auto;
`;

class ToolItem extends Component {

    state = {
        modal: false,
    }

    closeModalHandler = () => {
        this.setState({
            modal:false,
        })
    }

    runPreview = (e) => {
        this.props.openPreview(this.props.container);
    }

    runProcess = (e) => {
        e.preventDefault();
        this.closeModalHandler();
        this.props.runTool(this.props.container, this.props.type, this.props.token)

       
    }

    downloadElement = (action) => {

        const containerId = this.props.container._id;
        const fileType = action;

        let linkToDownload = process.env.REACT_APP_API_URL+ "/repoFiles/download/"+containerId+"/"+fileType+"/?api_key="+this.props.token;
      
        window.open(linkToDownload,"_self");

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
                this.props.onRemoveItem(this.props.container);
                break;
            case 'audio':
                this.downloadElement( action);
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


    removeThisItem = () => {
        this.props.onRemoveItem(this.props.container);
    }

    runProcessAgain = () => {
        this.setState({
            modal:true,
        })
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
        

    

    render(){

        let iconType = faFileAlt;

        //do wskazywania czy obecnie jest edytowany
        let czyEdytowany = '';

        let modalTitle = '';
        let modalContent = '';

        switch(this.props.type){
            case "DIA":
                iconType = faComment;
                if(this.props.container._id===this.props.DIAcontainerInPreview._id){
                    czyEdytowany='editing';
                }
                break;
            case "VAD":
                iconType = faSurprise;
                if(this.props.container._id===this.props.VADcontainerInPreview._id){
                    czyEdytowany='editing';
                }
                break;
            case "REC":
                iconType = faFileAlt;
                if(this.props.container._id===this.props.RECcontainerInPreview._id){
                    czyEdytowany='editing';
                }
                break;
            case "SEG":
                iconType = faClock;
                if(this.props.container._id===this.props.SEGcontainerInPreview._id){
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
            <Tooltip title={this.props.intl.formatMessage(
                {
                    id:"ToolItem-uruchom",
                    description: 'Uruchom narzedzie...', 
                    defaultMessage: 'Uruchom ',
                },
            ) + this.props.type}>
                <button onClick={this.runProcess}>
                    <FontAwesomeIcon icon={iconType} className="faIcon uruchomProcess"/>
                </button>
            </Tooltip>
        );

        
                       

        switch (this.props.status) {
            case 'ready':
                statusIcon = null;
                previewIconAlpha = 1;
                break;
            case 'error':
                statusIcon = (<Tooltip title={this.props.errorMessage}>
                                    <button>
                                        <FontAwesomeIcon icon={faExclamationCircle} className="faIcon" style={{color: 'red'}} /> 
                                    </button>
                            </Tooltip>)
                
                
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
                statusIcon = <FontAwesomeIcon icon={faCheck} className="faIcon " /> ;
                progressBar = null;

                modalTitle = 'Czy na pewno chcesz ponownie uruchomić usługę automatyczną?';
                modalContent = (
                    <div>
                        <p>
                                <FormattedMessage
									id="ToolItem-nadpisanieZmian"
									description="modal informacja" 
									defaultMessage="Wszystkie Twoje ręczne korekty zostaną nadpisane" 
								/>
                        </p>
                        <button type="button" className="btn btn-primary" onClick={this.runProcess}>
                            <FormattedMessage
									id="ToolItem-nadpisanieZmianTak"
									description="modal informacja tak" 
									defaultMessage="Tak" 
							/>
                        </button>
                        <button type="button" className="btn btn-outline-primary" onClick={this.closeModalHandler}>
                            <FormattedMessage
									id="ToolItem-nadpisanieZmianNie"
									description="modal informacja nie" 
									defaultMessage="Anuluj" 
							/>
                        </button>
                    </div>

                    );

                runProcessIcon = (
                    <Tooltip title={this.props.intl.formatMessage(
                        {
                            id:"ToolItem-uruchomv2",
                            description: 'Uruchom narzedzie...', 
                            defaultMessage: 'Uruchom ',
                        },
                    ) + this.props.type}>
                        <button onClick={this.runProcessAgain}>
                              <FontAwesomeIcon icon={iconType} className="faIcon" style={{opacity: 1, color: '#1cce44'}}/>
                        </button>
                    </Tooltip>
                );
                break;
            default:
                statusIcon = null;
        }


        /*
        let previewIcon = (
            <Tooltip title={"Podgląd " + this.props.type}>
                <a href="#" role="button" onClick={previewIconAlpha===1? this.runPreview: null}>
                    <FontAwesomeIcon icon={faEye} className="faIcon" style={{opacity: previewIconAlpha, color: '#3498db'}} />
                </a>
            </Tooltip>
        )
        */

       
        return(

            <Aux>

                <Modal 
                    show={this.state.modal}
					modalClosed={this.closeModalHandler}
                    modalTitle={modalTitle}
                >
                    {modalContent}
                </Modal> 


                <ContextMenuTrigger id={"ToolItemId"+this.props.container._id}>
                <button className="ToolItemWrapper" onClick={previewIconAlpha===1? this.runPreview: null}>
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
                            <div className="col-sm-3 actionIcons align-self-center pl-1 pr-1" data-tut="wlaczenieNarzedzia">
                                {//playIcon
                                }
                                {
                                //previewIcon
                                 }
                                {runProcessIcon} 
                            </div>
                        </div>
                        {progressBar}
                    </div>  
                    </button>    


                </ContextMenuTrigger>


                <ContextMenu id={"ToolItemId"+this.props.container._id}>
                    <MenuItem disabled={false} data={{toolType: this.props.type, action: 'copyId'}} onClick={this.handleClick}>
                            <FormattedMessage
                                id="ToolItem-contextKopijID"
                                description="context menu kopiuj id" 
                                defaultMessage="Kopiuj ID" 
                            />: {this.props.container._id}
                    </MenuItem>
                    <MenuItem divider />
                    <MenuItem disabled={false} data={{toolType: this.props.type, action: 'usun'}} onClick={this.handleClick}>
                            <FormattedMessage
                                id="ToolItem-contextUsunZListy"
                                description="context usun z listy" 
                                defaultMessage="Usuń element z listy" 
                            />
                    </MenuItem>
                    <MenuItem divider />
                    <MenuItem disabled={false} data={{toolType: this.props.type, action: 'audio'}} onClick={this.handleClick}>
                            <FormattedMessage
                                id="ToolItem-contextPobierzPrzekonwertowany"
                                description="context pobierz przekonwertowany" 
                                defaultMessage=" Pobierz plik audio WAV 16000Hz, 16bit" 
                            />
                        
                    </MenuItem>
                    <MenuItem disabled={false} data={{toolType: this.props.type, action: 'oryginalAudio'}} onClick={this.handleClick}>
                            <FormattedMessage
                                id="ToolItem-contextPobierzOryginalny"
                                description="context pobierz oryginalny" 
                                defaultMessage=" Pobierz oryginalny plik audio" 
                            />
                        
                    </MenuItem>
                    <MenuItem divider />
                    <MenuItem disabled={this.props.container.ifVAD? false: true} data={{toolType: this.props.type, action: 'VADctm'}} onClick={this.handleClick}>
                            <FormattedMessage
                                id="ToolItem-contextPobierzVADwCTM"
                                description="context pobierz VADwCTM" 
                                defaultMessage="Pobierz plik detekcji mowy w formacie CTM" 
                            />
                         
                    </MenuItem>
                    <MenuItem disabled={this.props.container.ifVAD? false: true} data={{toolType: this.props.type, action: 'VADtextGrid'}} onClick={this.handleClick}>
                            <FormattedMessage
                                id="ToolItem-contextPobierzVADwTextGrid"
                                description="context pobierz VADwTextGrid" 
                                defaultMessage="Pobierz plik detekcji mowy w formacie TextGrid" 
                            />
                         
                    </MenuItem>
                    <MenuItem disabled={this.props.container.ifDIA? false: true} data={{toolType: this.props.type, action: 'DIActm'}} onClick={this.handleClick}>
                            <FormattedMessage
                                id="ToolItem-contextPobierzDIAwCTM"
                                description="context pobierz DIA w CTM" 
                                defaultMessage=" Pobierz plik diaryzacji w formacie CTM" 
                            />
                        
                    </MenuItem>
                    <MenuItem disabled={this.props.container.ifDIA? false: true} data={{toolType: this.props.type, action: 'DIAtextGrid'}} onClick={this.handleClick}>
                            <FormattedMessage
                                id="ToolItem-contextPobierzDIAwTextGrid"
                                description="context pobierz DIA w TextGrid" 
                                defaultMessage="Pobierz plik diaryzacji mowy w formacie TextGrid" 
                            />
                         
                    </MenuItem>
                    <MenuItem disabled={this.props.container.ifREC? false: true} data={{toolType: this.props.type, action: 'TXTTranscript'}} onClick={this.handleClick}>
                            <FormattedMessage
                                id="ToolItem-contextPobierzRECwTXT"
                                description="context pobierz REC w text" 
                                defaultMessage="Pobierz transkrypcje w formacie txt" 
                            />
                         
                    </MenuItem>
                    <MenuItem disabled={this.props.container.ifREC? false: true} data={{toolType: this.props.type, action: 'JSONTranscript'}} onClick={this.handleClick}>
                            <FormattedMessage
                                id="ToolItem-contextPobierzRECwJson"
                                description="context pobierz REC w json" 
                                defaultMessage=" Pobierz transkrypcje w formacie json" 
                            />
                         
                    </MenuItem>
                    <MenuItem disabled={this.props.container.ifSEG? false: true} data={{toolType: this.props.type, action: 'SEGctm'}} onClick={this.handleClick}>
                            <FormattedMessage
                                id="ToolItem-contextPobierzSEGwCTM"
                                description="context pobierz SEGwCTM" 
                                defaultMessage="Pobierz segmentacje w formacie ctm" 
                            />
                         
                    </MenuItem>
                    <MenuItem disabled={this.props.container.ifSEG? false: true} data={{toolType: this.props.type, action: 'SEGtextGrid'}} onClick={this.handleClick}>
                            <FormattedMessage
                                id="ToolItem-contextPobierzSEGwTextGrid"
                                description="context pobierz SEGwTextGrid" 
                                defaultMessage=" Pobierz segmentacje w formacie TextGrid" 
                            />
                        
                    </MenuItem>
                    <MenuItem disabled={this.props.container.ifSEG? false: true} data={{toolType: this.props.type, action: 'EMUJSON'}} onClick={this.handleClick}>
                            <FormattedMessage
                                id="ToolItem-contextPobierzSEGwjson"
                                description="context pobierz SEGwTextjson" 
                                defaultMessage="Pobierz segmentacje w formacie json" 
                            />
                        
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
        
    }
}

const mapDispatchToProps = dispatch => {
    return {
       // runSpeechRecognition: (containerId, toolType, token) => dispatch(toolItemActions.runSpeechRecognition(containerId, toolType, token)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(injectIntl(ToolItem)));