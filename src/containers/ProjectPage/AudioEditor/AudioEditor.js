import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary';
import './AudioEditor.css';
import { connect } from 'react-redux';
import uuid from 'uuid';
import Modal from '../../../components/UI/Modal/Modal';
import { extensionMapping } from '../../../utils/fileTypes';
import { faMapMarker } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faGripLinesVertical } from '@fortawesome/free-solid-svg-icons';
import { faSearchMinus } from '@fortawesome/free-solid-svg-icons';
import { faExpand } from '@fortawesome/free-solid-svg-icons';
import { faSearchPlus} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {getFileNameWithNoExt, getExt, getFilenameFromURL } from '../../../utils/utils';
import ToolItem from '../ToolItem/ToolItem';
import WaveformData from 'waveform-data';
import TextareaAutosize from 'react-textarea-autosize';
import * as audioEditorActions from '../../../store/actions/index';
import Peaks from 'peaks.js';

import TOLdemo from '../../../utils/TOL_6min_720p_download.json'

class AudioEditor extends Component {

	constructor(props){
		super(props);
		this.audioDOM = React.createRef();
		this.state = {
			audioPath: '',
			datPath: '',
			peaksInstance: null,
		}
	}

	 
	makeEditorFullWidth = () => {
		this.props.editorFullWidth();
	}


	createPeaksInstance = (options, thisComponent) => {
		
		return new Promise(function(resolve, reject) {

	    
			
		  Peaks.init(options, function(err, peaksInstance) {
			if (err) {
			  console.log("uwaga error")
			  reject(err);
			}
			else {
			  console.log('Peaks instance ready');

			  document.querySelector('[data-action="zoom-in"]').addEventListener('click', function() {
				peaksInstance.zoom.zoomIn();
			  });
	
			  document.querySelector('[data-action="zoom-out"]').addEventListener('click', function() {
				peaksInstance.zoom.zoomOut();
			  });

			  var segmentCounter = 1;

				document.querySelector('button[data-action="add-segment"]').addEventListener('click', function() {
					peaksInstance.segments.add({
						startTime: peaksInstance.player.getCurrentTime(),
						endTime: peaksInstance.player.getCurrentTime() + 10,
						labelText: 'Segment ' + segmentCounter++,
						editable: true
					});
				});


				var pointCounter = 1;

				document.querySelector('button[data-action="add-point"]').addEventListener('click', function() {
					peaksInstance.points.add({
						time: peaksInstance.player.getCurrentTime(),
						labelText: 'Point ' + pointCounter++,
						color: '#006eb0',
						editable: true
					});
				});

				document.querySelector('button[data-action="log-data"]').addEventListener('click', function(event) {
					//renderSegments(peaksInstance);
					//renderPoints(peaksInstance);
				  });


				  var amplitudeScales = {
					"0": 0.0,
					"1": 0.1,
					"2": 0.25,
					"3": 0.5,
					"4": 0.75,
					"5": 1.0,
					"6": 1.5,
					"7": 2.0,
					"8": 3.0,
					"9": 4.0,
					"10": 5.0
				  };
		
				  document.getElementById('amplitude-scale').addEventListener('input', function(event) {
					var scale = amplitudeScales[event.target.value];
		
					peaksInstance.views.getView('zoomview').setAmplitudeScale(scale);
					peaksInstance.views.getView('overview').setAmplitudeScale(scale);
				  });

				  document.querySelector('button[data-action="resize"]').addEventListener('click', function(event) {
					var zoomviewContainer = document.getElementById('zoomview-container');
					var overviewContainer = document.getElementById('overview-container');

					thisComponent.makeEditorFullWidth();
				
					//var zoomviewStyle = 'width:600px';
					//var overviewStyle = 'width:600px';
		
					//var zoomviewStyle = zoomviewContainer.offsetHeight === 200 ? 'height:300px' : 'height:200px';
					//var overviewStyle = overviewContainer.offsetHeight === 85  ? 'height:200px' : 'height:85px';
		
					//zoomviewContainer.setAttribute('style', zoomviewStyle);
					//overviewContainer.setAttribute('style', overviewStyle);
		
					var zoomview = peaksInstance.views.getView('zoomview');
					if (zoomview) {
					  zoomview.fitToContainer();
					}
		
					var overview = peaksInstance.views.getView('overview');
					if (overview) {
					  overview.fitToContainer();
					}
				  });

				  // Points mouse events

				  peaksInstance.on('points.mouseenter', function(point) {
					console.log('points.mouseenter:', point);
				  });
		
				  peaksInstance.on('points.mouseleave', function(point) {
					console.log('points.mouseleave:', point);
				  });
		
				  peaksInstance.on('points.dblclick', function(point) {
					console.log('points.dblclick:', point);
				  });
		
				  peaksInstance.on('points.dragstart', function(point) {
					console.log('points.dragstart:', point);
				  });
		
				  peaksInstance.on('points.dragmove', function(point) {
					console.log('points.dragmove:', point);
				  });
		
				  peaksInstance.on('points.dragend', function(point) {
					console.log('points.dragend:', point);
				  });
		
				  // Segments mouse events
		
				  peaksInstance.on('segments.dragstart', function(segment, startMarker) {
					console.log('segments.dragstart:', segment, startMarker);
				  });
		
				  peaksInstance.on('segments.dragend', function(segment, startMarker) {
					console.log('segments.dragend:', segment, startMarker);
				  });
		
				  peaksInstance.on('segments.dragged', function(segment, startMarker) {
					console.log('segments.dragged:', segment, startMarker);
				  });
		
				  peaksInstance.on('segments.mouseenter', function(segment) {
					console.log('segments.mouseenter:', segment);
				  });
		
				  peaksInstance.on('segments.mouseleave', function(segment) {
					console.log('segments.mouseleave:', segment);
				  });
		
				  peaksInstance.on('segments.click', function(segment) {
					console.log('segments.click:', segment);
				  });
		
				  peaksInstance.on('zoomview.dblclick', function(time) {
					console.log('zoomview.dblclick:', time);
				  });
		
				  peaksInstance.on('overview.dblclick', function(time) {
					console.log('overview.dblclick:', time);
				  });
				  


			  return resolve(peaksInstance);
			}
		  });
		});
	  }
	

	errorHandler = (err) => {
		console.error(err.message);
	}


	requestWaveformData = (url) => {
		return fetch(url)
		  .then(function(response) {
			return response.arrayBuffer();
		  });
	  }


	  createSources = (waveformData) => {
		return {
			title: this.props.containerForPreview.containerName,
			mediaUrl: this.state.audioPath,
			waveformData: {
			  arraybuffer: waveformData
			}
		  };
	  }

	
	componentDidMount = () => {

	
	}

	initializePeaksFirstTime = (audioPath, datPath) => {

		//arraybuffer: "http://localhost:1234/repoFiles/5e4b09e086f4ed663259fae9/5e9e175af4192d661ebf49dd/5e9e175af4192d661ebf49de/kleska.dat?api_key="+this.props.token,
	
		this.setState({
			audioPath:audioPath,
			datPath:datPath
		});

		let options = {
			containers: {
				zoomview: document.getElementById('zoomview-container'),
				overview: document.getElementById('overview-container')
			},
			mediaElement: document.querySelector('audio'),
			dataUri: {
			  arraybuffer: datPath,
			},
			zoomWaveformColor: 'rgba(52, 152, 219, 1)',
			overviewWaveformColor: 'rgba(52, 152, 219, 0.3)',
			overviewHighlightColor: 'rgba(52, 152, 219, 0.4)',
			emitCueEvents: true,
			zoomLevels: [128, 256, 512, 1024, 2048, 4096],
			keyboard: true,
			nudgeIncrement: 0.01,
			showPlayheadTime: true,

		  };

		  this.createPeaksInstance(options,this)
          .then(peaksInstance => {
			this.setState({peaksInstance: peaksInstance});
		  }, this.errorHandler);
	}

	
	bindEventHandlers = (peaksInstance, source) => {

		//TO DO: inne połączenia

		peaksInstance.setSource(source, function(error) {
			if (error) {
			  console.error('setSource error', error);
			}
		  });
	}

	componentDidUpdate = (prevProps) => {

		//kiedy tylko zmieni się container, wtedy ładuje audio i binary data z serwera i uruchamiam podgląd
		if(prevProps.containerForPreview !== this.props.containerForPreview){
			//wtedy załaduje z 
			if(this.props.containerForPreview !== undefined){
				//console.log("AAAAAA" +this.props.containerForPreview)
				//this.loadContainerPreview(this.props.containerForPreview, this.props.toolType);
				//this.loadAudioData(this.props.containerForPreview, this.props.toolType);
				//this.props.onLoadAudioForPreview(this.props.containerForPreview, this.props.toolType);

				const userId = this.props.containerForPreview.owner;
				const projectId = this.props.containerForPreview.project;
				const sessionId = this.props.containerForPreview.session;
				const fileName = this.props.containerForPreview.fileName;
				const token = this.props.token;

				let audioPath = "http://localhost:1234/repoFiles/" + userId + "/" + projectId + "/"+sessionId+"/"+fileName+"?api_key="+token;
				let datPath = "http://localhost:1234/repoFiles/" + userId + "/" + projectId + "/"+sessionId+"/"+getFileNameWithNoExt(fileName)+".dat?api_key="+token;
		
				if(this.state.audioPath == '' || this.state.datPath == ''){
					this.initializePeaksFirstTime(audioPath, datPath)
				} else {
					this.setState({
						audioPath:audioPath,
						datPath:datPath
					});
				}
				

				 this.requestWaveformData(datPath)
					.then(waveformData => {
						
						return this.createSources(waveformData);
					})
					.then(sources => {
						console.log(sources)
						console.log(this.state.peaksInstance)
						this.bindEventHandlers(this.state.peaksInstance, sources);
					}, this.errorHandler);

			}
		}
	}



	render() {



		let audioSource = this.state.audioPath;
		let edytor = null;

		if(this.props.containerForPreview == "do wywalenia :) sprawdzam czy puste"){
			edytor = <h3>Wybierz element do edycji</h3>
		} else {
			edytor = (
				<>
					
					<div id="waveform-container">
						<div id="overview-container"></div>
						<div id="zoomview-container"></div>
					</div>

					<div id="demo-controls">
							<audio id="audio" controls="controls">
								<source src={audioSource}/>
								Your browser does not support the audio element.
							</audio>
							<div id="controls">
								<button data-action="zoom-in"><FontAwesomeIcon icon={faSearchPlus} className="faIcon" /></button>
								<button data-action="zoom-out"><FontAwesomeIcon icon={faSearchMinus} className="faIcon" /></button>
								<button data-action="add-segment"><FontAwesomeIcon icon={faGripLinesVertical} className="faIcon" /></button>
								<button data-action="add-point"><FontAwesomeIcon icon={faMapMarker} className="faIcon" /></button>
								<button data-action="log-data"><FontAwesomeIcon icon={faEye} className="faIcon" /></button>
								<button data-action="resize"><FontAwesomeIcon icon={faExpand} className="faIcon" /></button>
								<input type="range" id="amplitude-scale" min="0" max="10" step="1" />
							</div>
					</div>

					
				</>
			);
		}



		return (
			<Aux>
                <div className="AudioEditor">
                  

					{edytor}


                    <TextareaAutosize maxRows={1000} minRows={5} className="textEditor" />
                </div>
				

			</Aux>
		);
	}
}

const mapStateToProps = state => {
	return {

		// DIAItems: state.diaR.filesToUpload,
		//	modalDisplay: state.projectR.modal,
		//	ifRefusedAudio: state.segR.ifRefusedAudio,
		token: state.homeR.token,

		containerBinaryPreviewREC:state.repoR.containerBinaryPreviewREC,
		containerBinaryPreviewVAD:state.repoR.containerBinaryPreviewVAD,
		containerBinaryPreviewDIA:state.repoR.containerBinaryPreviewDIA,
		containerBinaryPreviewSEG:state.repoR.containerBinaryPreviewSEG,

		audioFileREC:state.repoR.containerAudioFileREC,
		audioFileVAD:state.repoR.containerAudioFileVAD,
		audioFileDIA:state.repoR.containerAudioFileDIA,
		audioFileSEG:state.repoR.containerAudioFileSEG,

	}
}

const mapDispatchToProps = dispatch => {
	return {
		 // onLoadAudioForPreview: (container, toolType, token) => dispatch(audioEditorActions.loadAudioForPreview(container, toolType, token)),
         // onLoadBinaryForPreview: (container, toolType, token) => dispatch(audioEditorActions.loadBinaryForPreview(container, toolType, token)),
		//onOpenModalHandler: () => dispatch(segmentActions.openModalProject()),
       // onCloseModalHandler: () => dispatch(segmentActions.closeModalProject()),
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(AudioEditor);