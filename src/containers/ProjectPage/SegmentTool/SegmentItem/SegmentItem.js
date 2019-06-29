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
        
        this.props.onStartSegmentItem(
            entryId, 
            this.props.userId, 
            this.props.projectId, 
            audioFile, 
            txtFile, 
            this.props.token
            );

    }

    render() {

        let statusIcon = null;
        
        if(this.props.status === 'valid'){
            statusIcon = (
                <span className="segmenticon preview"><i className="fas fa-check"></i></span>
            );
        } else {
            statusIcon = (
                <span className="segmenticon warning"><i className="fas fa-exclamation"></i></span>
            );
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
                        
                         <a onClick={()=>this.startSegmentation(this.props.entryId)}>
                            <i className="startSegment fas fa-cogs" ></i>
                        </a>

                            {
                                /*
                                    <a onClick={()=>this.removeSegmentItem(this.props.entryId)}>
                                            <i className="removeItem fas fa-times" ></i>
                                    </a>

                                */
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
       onStartSegmentItem: (segmentId, userId, projectId, audioFile, txtFile, token) => dispatch(segmentActions.startSegmentItem(segmentId, userId, projectId, audioFile, txtFile, token))
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(withRouter(SegmentItem));