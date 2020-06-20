import React, { Component } from 'react';
import Aux from '../../../../hoc/Auxiliary';
import './SegmentsEditor.css';
import { connect } from 'react-redux';

import Segment from "./Segment/Segment";


class SegmentsEditor extends Component {
    
    constructor(props){
        super(props)
        
        this.state = {

        }
       
    }



    updateLabel = (id, newLabel) => {
        this.props.onUpdateSegmentLabel(id, newLabel);
    }

    updateStartTime = (id, newValue) => {
        this.props.onUpdateSegmentStartTime(id, newValue);
    }

    updateEndTime = (id, newValue) => {
        this.props.onUpdateSegmentEndTime(id, newValue);
    }

    componentDidUpdate = () => {
       
    }



    renderSegments = () => {
		let segmentList = this.props.segments.map((segment,i) => {
            return <Segment 
                labelText={segment.labelText} 
                startTime={segment.startTime}
                endTime={segment.endTime}
                segmentId={segment.id}
                key={segment.id}
                onUpdateLabel={(id, newLabel)=>this.updateLabel(id, newLabel)}
                onUpdateStartTime={(id, newValue)=>this.updateStartTime(id, newValue)}
                onUpdateEndTime={(id, newValue)=>this.updateEndTime(id, newValue)}/>
        });

        return segmentList;
    };
    

       
	render() {

        let segments = this.renderSegments();

        
		return (
			<Aux>

                <div className="SegmentsEditor">
                    <div className="log">
                        <div id="segments">
                            <h3>Segmenty</h3>
                            <table>
                            <thead>
                                <tr>
                                <th>ID</th>
                                <th>Etykieta</th>
                                <th>Początek</th>
                                <th>Koniec</th>
                                <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {segments}
                            </tbody>
                            </table>
                        </div>
                    </div>
                </div>
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


export default connect(mapStateToProps, mapDispatchToProps)(SegmentsEditor);