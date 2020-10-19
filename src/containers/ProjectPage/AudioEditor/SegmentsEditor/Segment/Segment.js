import React, { Component } from 'react';
import Aux from '../../../../../hoc/Auxiliary';
import './Segment.css';
import { connect } from 'react-redux';
import { faTrash, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class Segment extends Component {
    
    constructor(props){
        super(props)
        /*
        this.state = {
                labelText: '',
                startTime: 0,
                endTime: 1,
                segmentId: '',
        }
        */
       
    }

    componentDidMount() {
        /*
        this.setState({
            labelText: this.props.labelText,
            startTime: this.props.startTime,
            endTime: this.props.endTime,
            segmentId: this.props.segmentId,
        })
        */
    }


    componentDidUpdate = (prevProps, prevState) => {
       
    }

    updateStartTimeSegment = (e) => {
        let element = e.target;
        if(element){
            let startTime = parseFloat(element.value);

            if (startTime < 0) {
				startTime = 0;
            }
            
            if (startTime >= this.props.endTime) {
				startTime = this.props.endTime - 0.1;
            }

            this.props.onUpdateStartTime(this.props.segmentId, parseFloat(startTime) );
           // this.props.onUpdateStartTime(this.state.segmentId, parseFloat(startTime) );
            
          //  this.setState({
          //      startTime: parseFloat(startTime),
          //  })
        }
    }


    updateEndTimeSegment = (e) => {

        let element = e.target;
        if(element){
            let endTime = parseFloat(element.value);

            if (endTime < 0) {
				endTime = 0.1;
			}

			if (endTime <= this.props.startTime) {
				endTime = this.props.startTime + 0.1;
            }

            this.props.onUpdateEndTime(this.props.segmentId, parseFloat(endTime) );
            
        //    this.props.onUpdateEndTime(this.state.segmentId, parseFloat(endTime) );
            
          //  this.setState({
          //      endTime: parseFloat(endTime),
          //  })
        }
    }

    updateSegmentLabel = (e) => {

        let element = e.target;
     
        if(element){
            var labelText = element.value;

            this.props.onUpdateLabel(this.props.segmentId, labelText );
          //  this.props.onUpdateLabel(this.state.segmentId, labelText );

          //  this.setState({
          //      labelText: labelText,
          //  })
  
        }
    }


    playSegment = () => {
        this.props.onPlaySegment(this.props.segmentId);
    }

    removeSegment = () => {
        this.props.onRemoveSegment(this.props.segmentId);
    }

       
	render() {


        //console.log(this.props.startTime);
       

		return (
			<Aux>
                <tr className="Segment">
                   {
                       /*
                            <td>{this.props.segmentId}</td>
                       */
                   } 
                    <td><input className="szerzej" data-action="update-segment-label" onChange={this.updateSegmentLabel} type="text" value={this.props.labelText} data-id={this.props.segmentId}/></td>
                    <td><input data-action="update-segment-start-time" onChange={this.updateStartTimeSegment} type="number" value={this.props.startTime} data-id={this.props.segmentId}/></td>
                    <td><input data-action="update-segment-end-time" onChange={this.updateEndTimeSegment} type="number" value={this.props.endTime} data-id={this.props.segmentId}/></td>
                    <td><a href={'#'+this.props.segmentId} id="playBtn" data-action="play-segment" data-id={this.props.segmentId}>Play</a></td>
                    <td><a href={'#'+this.props.segmentId} id="removeBtn" data-action="remove-segment" data-id={this.props.segmentId}>Usuń</a></td>
                    
                    
                    {
                      //    <td><a href={'#'+this.props.segmentId} data-action="play-segment" data-id={this.props.segmentId}>Play</a></td>
                  //      <td><FontAwesomeIcon icon={faTrash} className="faIcon" onClick={this.removeSegment} /></td>
                  //       <td><FontAwesomeIcon icon={faPlay} className="faIcon" onClick={this.playSegment}/></td>
                  //  <td><a href={'#'+this.props.segmentId} data-action="play-segment" data-id={this.props.segmentId}><button><FontAwesomeIcon icon={faPlay} className="faIcon" /></button></a></td>
                  //  <td><a href={'#'+this.props.segmentId} data-action="remove-segment" data-id={this.props.segmentId}><button><FontAwesomeIcon icon={faTrash} className="faIcon" /></button></a></td>
                    
                    }
                    
                    </tr>
			</Aux>
		);
	}
}

const mapStateToProps = state => {
	return {



	}
}

const mapDispatchToProps = dispatch => {
	return {

       // onSaveTranscription: (container, toolType, token, transcription) => dispatch(audioEditorActions.saveTranscription(container, toolType, token, transcription)),

	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Segment);