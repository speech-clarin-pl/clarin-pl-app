import React, { Component } from 'react';
import Aux from '../../../../../hoc/Auxiliary';
import './Segment.css';
import { connect } from 'react-redux';




class Segment extends Component {
    
    constructor(props){
        super(props)
        
        this.state = {
            segment: this.props.segment,
        }
       
    }

    componentDidMount() {

    }


    componentDidUpdate = (prevProps, prevState) => {
        
    }

    updateStartTimeSegment = (e) => {
        let segment = this.state.segment;
        let element = e.target;
        let id = element.getAttribute('data-id');
        if(segment){
            let startTime = parseFloat(element.value);

            if (startTime < 0) {
				startTime = 0;
				element.value = 0;
            }
            
            if (startTime >= segment.endTime) {
				startTime = segment.endTime - 0.1;
				element.value = startTime;
            }
            
           // let updatedSegment = Object.assign({},segment);
           // updatedSegment.update({ startTime: startTime });

           let updatedSegment = {
                ...segment,
                startTime: startTime
            }

            this.setState({
                segment: updatedSegment,
            })
        }
    }


    updateEndTimeSegment = (e) => {
        let segment = this.state.segment;
        let element = e.target;
        let id = element.getAttribute('data-id');
        if(segment){
            let endTime = parseFloat(element.value);

            if (endTime < 0) {
				endTime = 0;
				element.value = 0;
			}

			if (endTime <= segment.startTime) {
				endTime = segment.startTime + 0.1;
				element.value = endTime;
			}
            
            //let updatedSegment = Object.assign({},segment);
            //updatedSegment.update({ endTime: endTime });

            let updatedSegment = {
                ...segment,
                endTime: endTime
            }
            

            this.setState({
                segment: updatedSegment,
            })
        }
    }

    updateSegmentLabel = (e) => {
        let segment = this.state.segment;
        let element = e.target;
        var id = element.getAttribute('data-id');
        var labelText = element.labelText;

        if(segment){
            let updatedSegment = {
                ...segment,
                labelText: labelText
            }
            
            //Object.assign({},segment);
            //updatedSegment.labelText: labelText });
            this.setState({
                segment: updatedSegment,
            })
        }
    }



       
	render() {


		return (
			<Aux>
                <tr className="Segment">
                    <td>{this.state.segment.id}</td>
                    <td><input data-action="update-segment-label" onChange={this.updateSegmentLabel} type="text" value={this.state.segment.labelText} data-id={this.state.segment.id}/></td>
                    <td><input data-action="update-segment-start-time" onChange={this.updateStartTimeSegment} type="number" value={this.state.segment.startTime} data-id={this.state.segment.id}/></td>
                    <td><input data-action="update-segment-end-time" onChange={this.updateEndTimeSegment} type="number" value={this.state.segment.endTime} data-id={this.state.segment.id}/></td>
                    <td><a href={'#'+this.state.segment.id} data-action="play-segment" data-id={this.state.segment.id}>Play</a></td>
                    <td><a href={'#'+this.state.segment.id} data-action="remove-segment" data-id={this.state.segment.id}>Remove</a></td>
                    <td><a href={'#'+this.state.segment.id} data-action="merge-segment" data-id={this.state.segment.id}>Merge</a></td>
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