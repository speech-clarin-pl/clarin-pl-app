import React, { Component } from 'react';
import Aux from '../../../../hoc/Auxiliary';
import './SegmentsEditor.css';
import { connect } from 'react-redux';

import Segment from "./Segment/Segment";
import ButtonLeftBar from '../../../../components/UI/ButtonLeftBar/ButtonLeftBar';
import {injectIntl, FormattedMessage} from 'react-intl';

class SegmentsEditor extends Component {
    

    updateLabel = (id, newLabel) => {
        this.props.onUpdateSegmentLabel(id, newLabel);

    }

    updateStartTime = (id, newValue) => {
        this.props.onUpdateSegmentStartTime(id, newValue);
    }

    updateEndTime = (id, newValue) => {
        this.props.onUpdateSegmentEndTime(id, newValue);

    }


    playSegment = (id) => {
        this.props.onPlaySegment(id);
    }

    removeSegment = (id) => {
        this.props.onRemoveSegment(id);
 
    }


    renderSegments = () => {

        //tutaj musze je posortować względem czasu
        this.props.segments.sort((s1,s2)=>{
            return s1.startTime - s2.startTime;
        });

		let segmentList = this.props.segments.map((segment,i) => {
            return <Segment 
                labelText={segment.labelText} 
                startTime={parseFloat(segment.startTime.toFixed(2))}
                endTime={parseFloat(segment.endTime.toFixed(2))}
                segmentId={segment.id}
                key={segment.id}
                onUpdateLabel={(id, newLabel)=>this.updateLabel(id, newLabel)}
                onUpdateStartTime={(id, newValue)=>this.updateStartTime(id, newValue)}
                onUpdateEndTime={(id, newValue)=>this.updateEndTime(id, newValue)}
                onPlaySegment={(id)=>this.playSegment(id)}
                onRemoveSegment={(id)=>this.removeSegment(id)}/>
        });

        return segmentList;
    };
    
    saveSegments = () => {
        this.props.onSaveSegmentChanges();
    }

       
	render() {

        let segments = this.renderSegments();

        let czyDisabled = !this.props.czyZmieniono; 
        
		return (
			<Aux>

                <div className="SegmentsEditor">
                    <div className="log">
                        <div id="segments">
                            <h3>
                                <FormattedMessage
                                    id="SegmentsEditor-segmentyLabel"
                                    description="Etykieta Segmenty" 
                                    defaultMessage="Segmenty" 
                                />
                            </h3>
                            <table>
                            <thead>
                                <tr>
                                <th>
                                    <FormattedMessage
                                        id="SegmentsEditor-etykietaLabel"
                                        description="Etykieta Etykieta" 
                                        defaultMessage="Etykieta" 
                                    />
                                </th>
                                <th>
                                    <FormattedMessage
                                        id="SegmentsEditor-poczatekLabel"
                                        description="Etykieta początek" 
                                        defaultMessage="Początek" 
                                    />
                                </th>
                                <th>
                                    <FormattedMessage
                                        id="SegmentsEditor-koniecLabel"
                                        description="Etykieta koniec" 
                                        defaultMessage="Koniec" 
                                    />
                                </th>
                                <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {segments}
                            </tbody>
                            </table>
                        </div>
                    </div>

                    {
                        this.props.czyZmieniono? <ButtonLeftBar 
                        napis={
                            this.props.intl.formatMessage(
                                {
                                    id:"SegmentEditor-zapiszZmiany",
                                    description: 'Przycisk o zapisanie zmian segmentów', 
                                    defaultMessage:"Zapisz zmiany segmentów",
                                }
                            )
                        }
                        iconType="file"
                        icon={null}
                        customeStyle={{textAlign:'center', marginBottom: '20px'}}
                        disabled={czyDisabled}
                        whenClicked={this.saveSegments}/> : null
                    }
                    
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

       // onSaveSegments: (container, toolType, token, segments) => dispatch(audioEditorActions.saveTranscription(container, toolType, token, transcription)),

	}
}


export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(SegmentsEditor));