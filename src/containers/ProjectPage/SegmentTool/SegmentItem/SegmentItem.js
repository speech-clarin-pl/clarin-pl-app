import React, {Component} from 'react';
import Aux from '../../../../hoc/Auxiliary';
import './SegmentItem.css';
import SegmentAudioItem from '../SegmentAudioItem/SegmentAudioItem';

import * as segmentActions from '../../../../store/actions/index';
import {connect} from 'react-redux';
import {withRouter } from 'react-router-dom'

class SegmentItem extends Component {

    removeSegmentItem = (entryId) => {
        console.log(entryId);
        this.props.onRemoveSegmentItem(entryId);
    }

    startSegmentation = (entryId) => {
        console.log(entryId);
        const currentEntry = this.props.segmentEntry.find(entry => entry.id == entryId);
        const audioFile = currentEntry.audioEntry.file;
        const txtFile = currentEntry.txtEntry.file;

        this.props.onInitSegmentProcess(entryId);
        
        this.props.onStartSegmentItem(
            entryId, 
            this.props.userId, 
            this.props.projectId, 
            audioFile, 
            txtFile, 
            this.props.token
            );
    }

    refreshRepo = () => {
        this.props.onRefreshRepo(
            this.props.userId, 
            this.props.projectId, 
            this.props.token)
    }

    render() {

        let statusIcon = null;  //status entry
        let starterIcon = null; //do odpalania segmentacji

        
        
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
        }

        

        

   
        
        return(
            <Aux>
         
                
                <div className={["row", "pairedItem", "SegmentItem"].join(' ')}>
    
                    <div className="col-sm audio-info">
    
                       
                        
                    </div>
                    <div className="col-sm-auto pair-status">
                   
                            {statusIcon}
                     
                    </div>
                    <div className="col-sm txt-info">
                         
                    </div>
    
                    <div className="col-sm-auto pair-icons">

                        { starterIcon}
                         

                            {
                               
                                    <a onClick={()=>this.removeSegmentItem(this.props.entryId)}>
                                            <i className="removeItem fas fa-times" ></i>
                                    </a>

                               
                            }
                        

                    </div>
                </div>
    
    
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        segmentEntry: state.segR.segmentEntry,
        userId: state.projectR.currentProjectOwner,
        projectId: state.projectR.currentProjectID,
        token: state.homeR.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
       onRemoveSegmentItem: (segmentId) => dispatch(segmentActions.removeSegmentItem(segmentId)),
       onStartSegmentItem: (segmentId, userId, projectId, audioFile, txtFile, token) => dispatch(segmentActions.startSegmentItem(segmentId, userId, projectId, audioFile, txtFile, token)),
       onInitSegmentProcess: (entryId) => dispatch(segmentActions.initSegmentProcessing(entryId)),
       onRefreshRepo: (userId, projectId, token) => dispatch(segmentActions.getProjectFilesForUser(userId, projectId, token))
       
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(withRouter(SegmentItem));