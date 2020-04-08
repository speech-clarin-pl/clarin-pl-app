import React, {Component} from 'react';
import Aux from '../../../../hoc/Auxiliary';
import './SegmentItem.css';
import SegmentAudioItem from '../SegmentAudioItem/SegmentAudioItem';

import * as segmentActions from '../../../../store/actions/index';
import {connect} from 'react-redux';
import {withRouter } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import {isObjectEmpty} from '../../../../utils/utils';





class SegmentItem extends Component {

/*      removeSegmentItem = (entryId) => {
        this.props.onRemoveSegmentItem(entryId);
    } 

     startSegmentation = (entryId) => {
        const currentEntry = this.props.segmentEntry.find(entry => entry.id == entryId);
        let audioFile = currentEntry.audioEntry.file;
        let txtFile = currentEntry.txtEntry.file;

        console.log(currentEntry)

        //data from repo or local
        const audioFrom = currentEntry.audioEntry.from;
        const txtFrom = currentEntry.txtEntry.from;

        this.props.onInitSegmentProcess(entryId);

        //musze okreslic przed wyslaniem czy jest to BLOB czy JSON
        if(audioFrom=="repo"){
            audioFile = JSON.stringify(audioFile);
            txtFile = JSON.stringify(txtFile);
        } 

       
        

        this.props.onStartSegmentItem(
            entryId, 
            this.props.userId, 
            this.props.projectId, 
            audioFile, 
            txtFile, 
            this.props.token,
            audioFrom,
            txtFrom,
            );
    }

    refreshRepo = () => {
        this.props.onRefreshRepo(
            this.props.userId, 
            this.props.projectId, 
            this.props.token)
    }  */

    render() {

        let statusIcon = this.props.statusSEG;  //status entry

   
        switch(statusIcon) {
            case 'ready':
                statusIcon = (
                    <FontAwesomeIcon icon={faCheck} />
                );
                break;
            case 'inprogress':
                statusIcon = (
                    <FontAwesomeIcon icon={faSpinner} />
                );
                break;
            case 'error':
                statusIcon = (
                    <FontAwesomeIcon icon={faExclamation} />
                );
                break;
            default:
                statusIcon = (
                    <FontAwesomeIcon icon={faQuestion} />
                );
        }

        let txtFileName = 'unknown txt';

        if(isObjectEmpty(this.props.txtFiles)!= true){
            txtFileName = this.props.txtFiles[this.props.txtFileId].txtFileName;
        }
        


  //      let starterIcon = null; //do odpalania segmentacji
/* 
        if(this.props.status === 'valid'){
            statusIcon = (
                <span className="segmenticon ready"><i className="fas fa-check"></i></span>
            );
            starterIcon = (
                <a onClick={()=>this.startSegmentation(this.props.entryId)}>
                    <i className="startSegment fas fa-cogs" ></i>
                </a> 
            );
        } else {
            statusIcon = (
                <span className="segmenticon warning"><i className="fas fa-exclamation"></i></span>
            );
            starterIcon = null;
        }

        //znajduje siebie na liscie
        let foundEntry = this.props.segmentEntry.find(entry => entry.id === this.props.entryId)

        if(foundEntry.processingStatus === 'inProgress'){
            statusIcon = (
                <span className="inprogress">
                        <div className="spinner-border text-primary" role="status">
                            <span className="sr-only">Segmentacja...</span>
                        </div>
                </span>
            );

            starterIcon = null;
        }

        if(foundEntry.processingStatus === 'done'){
            statusIcon = (
                <span className="segmenticon complete"><i className="fas fa-check"></i></span>
            );
            starterIcon = null;

            this.refreshRepo();
        }

        if(foundEntry.processingStatus === 'error'){
            statusIcon = (
                <span className="error"><i className="fas fa-exclamation-triangle"></i> Błąd</span>
            );
            starterIcon = null;
        } */

        
        return(
            <Aux>
         
                
                <div className={["row", "pairedItem", "SegmentItem"].join(' ')}>
    
                    <div className="col-sm audio-info">
    
                            {
                                this.props.audioFileName
                            }
                    </div>
                    <div className="col-sm-auto pair-status">
                   
                            
                            {
                                statusIcon
                            }
                     
                    </div>
                    <div className="col-sm txt-info">

                            {
                                txtFileName
                            }

                    </div>
    
                    <div className="col-sm-auto pair-icons">

                        { 
                        
                        'pairs iceon'

                        //starterIcon
                    
                    }
                         

                            {
                               
                                 //   <a onClick={()=>this.removeSegmentItem(this.props.entryId)}>
                                 //           <i className="removeItem fas fa-times" ></i>
                                 //   </a>

                               
                            }
                        

                    </div>
                </div>
    
    
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        //segmentEntry: state.segR.segmentEntry,
        txtFiles: state.repoR.txtFiles,
        segmentEntry: state.segR.segmentItems,
        userId: state.projectR.currentProjectOwner,
        projectId: state.projectR.currentProjectID,
        token: state.homeR.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
       onRemoveSegmentItem: (segmentId) => dispatch(segmentActions.removeSegmentItem(segmentId)),
       onStartSegmentItem: (segmentId, userId, projectId, audioFile, txtFile, token, dataFrom,dataTxtFrom) => dispatch(segmentActions.startSegmentItem(segmentId, userId, projectId, audioFile, txtFile, token, dataFrom,dataTxtFrom)),
       onInitSegmentProcess: (entryId) => dispatch(segmentActions.initSegmentProcessing(entryId)),
       onRefreshRepo: (userId, projectId, token) => dispatch(segmentActions.getProjectFilesForUser(userId, projectId, token))
       
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(withRouter(SegmentItem));