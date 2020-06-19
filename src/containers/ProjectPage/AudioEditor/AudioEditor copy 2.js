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
import { faAlignJustify} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {getFileNameWithNoExt, getExt, getFilenameFromURL } from '../../../utils/utils';
import ToolItem from '../ToolItem/ToolItem';
import WaveformData from 'waveform-data';
import TextareaAutosize from 'react-textarea-autosize';
import * as audioEditorActions from '../../../store/actions/index';
import Peaks from 'peaks.js';
import Konva from 'konva';
import CustomSegmentMarker from './CustomSegmentMarker';
import CustomPointMarker from './CustomPointMarker';
import SimplePointMarker from './SimplePointMarker';

import TOLdemo from '../../../utils/TOL_6min_720p_download.json'

import TextEditor from './TextEditor/TextEditor';
import SegmentEditor from './SegmentsEditor/SegmentsEditor';


class AudioEditor extends Component {

	state = {
		audioPath: '',
		datPath: '',
		peaksInstance: null,
	}


	 createPointMarker = (options) => {
		if (options.view === 'zoomview') {
		  return new CustomPointMarker(options);
		}
		else {
		  return new SimplePointMarker(options);
		}
	  }

	createSegmentMarker = (options) => {
		if (options.view === 'zoomview') {
			return new CustomSegmentMarker(options);
		}

		return null;
	}

	createSegmentLabel = (options) => {
		if (options.view === 'overview') {
			return null;
		}

		var label = new Konva.Label({
			x: 12,
			y: 16
		});

		label.add(new Konva.Tag({
			fill:             'black',
			pointerDirection: 'none',
			shadowColor:      'black',
			shadowBlur:       10,
			shadowOffsetX:    3,
			shadowOffsetY:    3,
			shadowOpacity:    0.3
		}));

		label.add(new Konva.Text({
			text:       options.segment.labelText,
			fontSize:   14,
			fontFamily: 'Calibri',
			fill:       'white',
			padding:    8
		}));

		return label;
	}


	makeEditorFullWidth = () => {
		this.props.editorFullWidth();
	}


	renderSegments = (peaks) => {
		/*
		var segmentsContainer = document.getElementById('segments');
		var segments = peaks.segments.getSegments();
		var html = '';

		for (var i = 0; i < segments.length; i++) {
			var segment = segments[i];

			var row = '<tr>' +
			'<td>' + segment.id + '</td>' +
			'<td><input data-action="update-segment-label" type="text" value="' + segment.labelText + '" data-id="' + segment.id + '"/></td>' +
			'<td><input data-action="update-segment-start-time" type="number" value="' + segment.startTime + '" data-id="' + segment.id + '"/></td>' +
			'<td><input data-action="update-segment-end-time" type="number" value="' + segment.endTime + '" data-id="' + segment.id + '"/></td>' +
			'<td>' + '<a href="#' + segment.id + '" data-action="play-segment" data-id="' + segment.id + '">Play</a>' + '</td>' +
			'<td>' + '<a href="#' + segment.id + '" data-action="remove-segment" data-id="' + segment.id + '">Remove</a>' + '</td>' +
			'</tr>';

			html += row;
		}

		segmentsContainer.querySelector('tbody').innerHTML = html;

		if (html.length) {
			segmentsContainer.classList.remove('hide');
		}

		document.querySelectorAll('input[data-action="update-segment-start-time"]').forEach(function(inputElement) {
			inputElement.addEventListener('input', function(event) {
			var element = event.target;
			var id = element.getAttribute('data-id');
			var segment = peaks.segments.getSegment(id);

			if (segment) {
				var startTime = parseFloat(element.value);

				if (startTime < 0) {
				startTime = 0;
				element.value = 0;
				}

				if (startTime >= segment.endTime) {
				startTime = segment.endTime - 0.1;
				element.value = startTime;
				}

				segment.update({ startTime: startTime });
			}
			});
		});

		document.querySelectorAll('input[data-action="update-segment-end-time"]').forEach(function(inputElement) {
			inputElement.addEventListener('input', function(event) {
			var element = event.target;
			var id = element.getAttribute('data-id');
			var segment = peaks.segments.getSegment(id);

			if (segment) {
				var endTime = parseFloat(element.value);

				if (endTime < 0) {
				endTime = 0;
				element.value = 0;
				}

				if (endTime <= segment.startTime) {
				endTime = segment.startTime + 0.1;
				element.value = endTime;
				}

				segment.update({ endTime: endTime });
			}
			});
		});

		document.querySelectorAll('input[data-action="update-segment-label"]').forEach(function(inputElement) {
			inputElement.addEventListener('input', function(event) {
			var element = event.target;
			var id = element.getAttribute('data-id');
			var segment = peaks.segments.getSegment(id);
			var labelText = element.labelText;

			if (segment) {
				segment.update({ labelText: labelText });
			}
			});
		});
*/
	
	};



	  renderPoints = (peaks) => {

		/*

		var pointsContainer = document.getElementById('points');
		var points = peaks.points.getPoints();
		var html = '';

		for (var i = 0; i < points.length; i++) {
		  var point = points[i];

		  var row = '<tr>' +
			'<td>' + point.id + '</td>' +
			'<td><input data-action="update-point-label" type="text" value="' + point.labelText + '" data-id="' + point.id + '"/></td>' +
			'<td><input data-action="update-point-time" type="number" value="' + point.time + '" data-id="' + point.id + '"/></td>' +
			'<td>' + '<a href="#' + point.id + '" data-action="remove-point" data-id="' + point.id + '">Remove</a>' + '</td>' +
			'</tr>';

		  html += row;
		}

		pointsContainer.querySelector('tbody').innerHTML = html;

		if (html.length) {
		  pointsContainer.classList.remove('hide');
		}

		document.querySelectorAll('input[data-action="update-point-time"]').forEach(function(inputElement) {
		  inputElement.addEventListener('input', function(event) {
			var element = event.target;
			var id = element.getAttribute('data-id');
			var point = peaks.points.getPoint(id);

			if (point) {
			  var time = parseFloat(element.value);

			  if (time < 0) {
				time = 0;
				element.value = 0;
			  }

			  point.update({ time: time });
			}
		  });
		});

		document.querySelectorAll('input[data-action="update-point-label"]').forEach(function(inputElement) {
		  inputElement.addEventListener('input', function(event) {
			var element = event.target;
			var id = element.getAttribute('data-id');
			var point = peaks.points.getPoint(id);
			var labelText = element.labelText;

			if (point) {
			  point.update({ labelText: labelText });
			}
		  });
		});
		*/
	  };

	// ładuje nowy plik do edytora
	loadNewAudioToEditor = () => {
	if(this.props.containerForPreview !== undefined){

		//console.log("AAAAAA" +this.props.containerForPreview)
		//this.loadContainerPreview(this.props.containerForPreview, this.props.toolType);
		//this.loadAudioData(this.props.containerForPreview, this.props.toolType);
		//this.props.onLoadAudioForPreview(this.props.containerForPreview, this.props.toolType);

		const userId = this.props.containerForPreview.owner;
		const projectId = this.props.containerForPreview.project;
		const sessionId = this.props.containerForPreview.session;
		const fileName = this.props.containerForPreview.fileName;
		const containerId = this.props.containerForPreview._id;
		const token = this.props.token;

		//plik audio
		let audioPath = process.env.REACT_APP_API_URL+ "/repoFiles/" + userId + "/" + projectId + "/"+sessionId+"/"+containerId+"/audio?api_key="+token;
		
		//meta data do renderingu waveform
		let datPath = process.env.REACT_APP_API_URL + "/repoFiles/" + userId + "/" + projectId + "/"+sessionId+"/"+containerId+"/dat?api_key="+token;

		//segments in json
		let segments = [];
		switch(this.props.toolType){
			case 'VAD':
				segments = this.props.containerForPreview.VADUserSegments;
				break;
			case 'DIA':
				console.log('segments IA');
				break;
			case 'REC':
				console.log('segments REC');
				break;
			case 'SEG':
				console.log('segments SEG');
				break;
			default:
				console.log("segments default");
				break;
		}			

		if(this.state.audioPath == '' || this.state.datPath == ''){
			this.initializePeaksFirstTime(audioPath, datPath, segments)
		} else {
			
			this.setState({
				audioPath:audioPath,
				datPath:datPath
			});
		}

		if(this.state.peaksInstance){
			this.requestWaveformData(datPath)
			.then(waveformData => {
				return this.createSources(waveformData, segments);
			})
			.then(sources => {
				console.log(sources)
				console.log(this.state.peaksInstance)
				this.bindEventHandlers(this.state.peaksInstance, sources);
			}, this.errorHandler);
		}
		
		 
	}
}


	initializePeaksFirstTime = (audioPathok, datPathok, segments) => {

		//arraybuffer: "http://localhost:1234/repoFiles/5e4b09e086f4ed663259fae9/5e9e175af4192d661ebf49dd/5e9e175af4192d661ebf49de/kleska.dat?api_key="+this.props.token,
		
		this.setState({
			audioPath:audioPathok,
			datPath:datPathok
		});

		let options = {
			containers: {
				zoomview: document.getElementById('zoomview-container'),
				overview: document.getElementById('overview-container')
			},
			mediaElement: document.querySelector('audio'),
			dataUri: {
			  arraybuffer: datPathok,
			},

			zoomWaveformColor: 'rgba(52, 152, 219, 1)',
			overviewWaveformColor: 'rgba(52, 152, 219, 0.3)',
			overviewHighlightColor: 'rgba(52, 152, 219, 0.4)',
			keyboard: true,
			nudgeIncrement: 0.1,
			zoomLevels: [128, 256, 512, 1024, 2048, 4096],
			showPlayheadTime: true,
			emitCueEvents: true,
			showPlayheadTime: false,
			segments: segments,
		  //	createSegmentMarker: this.createSegmentMarker,
          //  createSegmentLabel: this.createSegmentLabel,
          //  createPointMarker: this.createPointMarker

		  };


		  this.createPeaksInstance(options,this)
          .then(peaksInstance => {
			this.setState({peaksInstance: peaksInstance});
		  }, this.errorHandler);
	}



	createSources = (waveformData, segments) => {
		return {
			title: this.props.containerForPreview.containerName,
			mediaUrl: this.state.audioPath,
			waveformData: {
			  arraybuffer: waveformData
			},
			segments: segments,
		  };
	  }

	  
	
	bindEventHandlers = (peaksInstance, source) => {

		peaksInstance.segments.removeAll();

		if(source.segments){
			console.log(source.segments)
			peaksInstance.segments.add(source.segments);
		}
		

		peaksInstance.setSource(source, function(error) {
			if (error) {
			  console.error('setSource error', error);
			}
		  });
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
						endTime: peaksInstance.player.getCurrentTime() + 3,
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
					console.log("log data")
					thisComponent.makeEditorFullWidth();
					//thisComponent.renderSegments(peaksInstance);
					//thisComponent.renderPoints(peaksInstance);
				  });



				  document.querySelector('body').addEventListener('click', function(event) {
					var element = event.target;
					var action  = element.getAttribute('data-action');
					var id      = element.getAttribute('data-id');
		
					if (action === 'play-segment') {
					  var segment = peaksInstance.segments.getSegment(id);
					  peaksInstance.player.playSegment(segment);
					}
					else if (action === 'remove-point') {
					  peaksInstance.points.removeById(id);
					}
					else if (action === 'remove-segment') {
					  peaksInstance.segments.removeById(id);
					}
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
		
				  //OK
				  peaksInstance.on('segments.mouseenter', function(segment) {
					console.log('segments.mouseenter:', segment);
				  });
		
				  //OK
				  peaksInstance.on('segments.mouseleave', function(segment) {
					console.log('segments.mouseleave:', segment);
				  });
		
				  //OK
				  peaksInstance.on('segments.click', function(segment) {
					console.log('segments.click:', segment);
				  });
		
				  //OK
				  peaksInstance.on('zoomview.dblclick', function(time) {
					console.log('zoomview.dblclick:', time);
				  });
		
				  //OK
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
		  .then((response) => {
			return response.arrayBuffer();
		  });
	  }


	
	componentDidUpdate = (prevProps) => {

		//kiedy tylko zmieni się container, wtedy ładuje audio i binary data z serwera i uruchamiam podgląd
		if(prevProps.containerForPreview !== this.props.containerForPreview){
			
			this.loadNewAudioToEditor();
			
		}
	}

	componentDidMount = () => {
		this.loadNewAudioToEditor();
	}
	

	render() {

		let segmentEditor = null;
		console.log(this.state.peaksInstance)
		if(this.state.peaksInstance){
			segmentEditor = <SegmentEditor peaks={this.state.peaksInstance} />
		}
		

		let transcriptWindow = null;

		if(this.props.toolType == "REC"){
			transcriptWindow = <TextEditor 
			toolType={this.props.toolType} 
			container={this.props.containerForPreview}/>		
		}

		let audioSource = this.state.audioPath;
		let edytor = null;

		if(this.props.containerForPreview == ""){
			edytor = null
		} else {
			edytor = (
				<>
					
					<h3>{this.props.containerForPreview.containerName}</h3>
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

					

					{
						transcriptWindow
					}


					
					{
						segmentEditor
					}

					
					
				</>
			);
		}



		return (
			<Aux>
                <div className="AudioEditor">
                  

					{edytor}


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