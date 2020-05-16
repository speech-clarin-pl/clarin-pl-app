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

import TOLdemo from '../../../utils/TOL_6min_720p_download.json'


class SimplePointMarker {
	constructor(options) {
		console.log('[SimplePointMarker] constructor')
		this._options = options;
	}

	init(group) {
		this._group = group;

		// Vertical Line - create with default y and points, the real values
		// are set in fitToView().
		this._line = new Konva.Line({
		  x:           0,
		  y:           0,
		  stroke:      this._options.color,
		  strokeWidth: 1
		});

		group.add(this._line);

		this.fitToView();
	  };

	  fitToView() {
		var height = this._options.layer.getHeight();

		this._line.points([0.5, 0, 0.5, height]);
	  };

}

class CustomPointMarker {

	constructor(options) {
		console.log('[CustomPointMarker] constructor')
		this._options = options;
	}

	init(group) {


		this._group = group;

		this._label = new Konva.Label({
		  x: 0.5,
		  y: 0.5
		});

		this._tag = new Konva.Tag({
		  fill:             this._options.color,
		  stroke:           this._options.color,
		  strokeWidth:      1,
		  pointerDirection: 'down',
		  pointerWidth:     10,
		  pointerHeight:    10,
		  lineJoin:         'round',
		  shadowColor:      'black',
		  shadowBlur:       10,
		  shadowOffsetX:    3,
		  shadowOffsetY:    3,
		  shadowOpacity:    0.3
		});

		this._label.add(this._tag);

		this._text = new Konva.Text({
		  text:       this._options.point.labelText,
		  fontFamily: 'Calibri',
		  fontSize:   14,
		  padding:    5,
		  fill:       'white'
		});

		this._label.add(this._text);

		// Vertical Line - create with default y and points, the real values
		// are set in fitToView().
		this._line = new Konva.Line({
		  x:           0,
		  y:           0,
		  stroke:      this._options.color,
		  strokeWidth: 1
		});

		group.add(this._label);
		group.add(this._line);

		this.fitToView();

		this.bindEventHandlers();
	  };

	  bindEventHandlers() {
		var container = document.getElementById('zoomview-container');

		this._group.on('mouseenter', function() {

		 // console.log("CustomPointMarker mouseenter")

		  container.style.cursor = 'move';
		});

		this._group.on('mouseleave', function() {

		  //console.log("CustomPointMarker mouseleave")

		  container.style.cursor = 'default';
		});
	  };

	  fitToView() {
		var height = this._options.layer.getHeight();

		var labelHeight = this._text.height() + 2 * this._text.padding();
		var offsetTop = 14;
		var offsetBottom = 26;

		this._group.y(offsetTop + labelHeight + 0.5);

		this._line.points([0.5, 0, 0.5, height - labelHeight - offsetTop - offsetBottom]);
	  };


}

class CustomSegmentMarker {

	constructor(options) {
		console.log('[CustomSegmentMarker] constructor')
		this._options = options;
	}
  
	init(group) {
		this._group = group;

		this._label = new Konva.Label({
		  x: 0.5,
		  y: 0.5
		});

		var color = this._options.segment.color;

		this._tag = new Konva.Tag({
		fill:             color,
		stroke:           color,
		strokeWidth:      1,
		pointerDirection: 'down',
		pointerWidth:     10,
		pointerHeight:    10,
		lineJoin:         'round',
		shadowColor:      'black',
		shadowBlur:       10,
		shadowOffsetX:    3,
		shadowOffsetY:    3,
		shadowOpacity:    0.3
		});

		this._label.add(this._tag);

		var labelText = this._options.segment.labelText +
                          (this._options.startMarker ? ' start' : ' end');

          this._text = new Konva.Text({
            text:       labelText,
            fontFamily: 'Calibri',
            fontSize:   14,
            padding:    5,
            fill:       'white'
          });

		this._label.add(this._text);

		// Vertical Line - create with default y and points, the real values
          // are set in fitToView().
          this._line = new Konva.Line({
            x:           0,
            y:           0,
            stroke:      color,
            strokeWidth: 1
          });

		group.add(this._label);
		group.add(this._line);

		this.fitToView();

		this.bindEventHandlers();
		
	}
  
	fitToView() {
		var height = this._options.layer.getHeight();

		var labelHeight = this._text.height() + 2 * this._text.padding();
		var offsetTop = 14;
		var offsetBottom = 26;

		this._group.y(offsetTop + labelHeight + 0.5);

		this._line.points([0.5, 0, 0.5, height - labelHeight - offsetTop - offsetBottom]);
	}
  
	//timeUpdated() {
	  // (optional)
	//}
  
	//destroy() {
	//  // (optional )
	//}

	bindEventHandlers() {

		var container = document.getElementById('zoomview-container');

		this._group.on('mouseenter', function() {
            container.style.cursor = 'move';
          });

          this._group.on('mouseleave', function() {
            container.style.cursor = 'default';
          });

	  };

  };

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


	createPointMarker = (options) => {
		if (options.view === 'zoomview') {
		  return new CustomPointMarker(options);
		}
		else {
		  return new SimplePointMarker(options);
		}
	  }


	  renderSegments = (peaks) => {
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
	  };



	  renderPoints = (peaks) => {

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
	  };



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
			nudgeIncrement: 0.01,

			keyboard: true,
			showPlayheadTime: false,
			createPointMarker: this.createPointMarker,
			createSegmentMarker: this.createSegmentMarker,
			createSegmentLabel: this.createSegmentLabel,

		  };

		  this.createPeaksInstance(options,this)
          .then(peaksInstance => {
			this.setState({peaksInstance: peaksInstance});
		  }, this.errorHandler);
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
					console.log("log data")
					thisComponent.renderSegments(peaksInstance);
					thisComponent.renderPoints(peaksInstance);
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
					
					<div id="test">DUBUG: TEST</div>
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

					<div className="log">
						<div id="segments" className="hide">
							<h2>Segments</h2>
							<table>
							<thead>
								<tr>
								<th>ID</th>
								<th>Label</th>
								<th>Start time</th>
								<th>End time</th>
								<th></th>
								</tr>
							</thead>
							<tbody>
							</tbody>
							</table>
						</div>

						<div id="points" className="hide">
							<h2>Points</h2>
							<table>
							<thead>
								<tr>
								<th>ID</th>
								<th>Label</th>
								<th>Time</th>
								</tr>
							</thead>
							<tbody>
							</tbody>
							</table>
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