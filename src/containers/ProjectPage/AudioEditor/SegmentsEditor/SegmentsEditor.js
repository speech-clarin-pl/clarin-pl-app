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


    componentDidUpdate = (prevProps, prevState) => {
 
     
    }

       
    componentDidMount() {


    }

    updateStartTime = (updatedSegment) => {
        console.log(updatedSegment)
        let segment = this.props.peaks.segments.getSegment(updatedSegment.id);
        segment.update({ endTime: segment.endTime });
    }


    renderSegments = () => {
		//var segmentsContainer = document.getElementById('segments');
		let segments = this.props.peaks.segments.getSegments();
		let segmentList = segments.map((segment,i) => {
            return <Segment segment={segment} key={segment.id} onUpdateStartTime={(updatedSegment) => this.updateStartTime(updatedSegment)} />
        });

        return segmentList;
    };
    

       
	render() {

        let segments = this.renderSegments();

       
		return (
			<Aux>


              <h1>AAAAA</h1>
                <div className="SegmentsEditor">
                    <div className="log">
                        <div id="segments">
                            <h2>Segmenty</h2>
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