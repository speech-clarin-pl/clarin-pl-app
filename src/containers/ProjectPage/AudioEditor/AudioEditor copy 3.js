import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary';
import './AudioEditor.css';
import { connect } from 'react-redux';
import uuid from 'uuid';
import Modal from '../../../components/UI/Modal/Modal';
import { extensionMapping } from '../../../utils/fileTypes';
import { faMapMarker, faPlay } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faGripLinesVertical } from '@fortawesome/free-solid-svg-icons';
import { faSearchMinus } from '@fortawesome/free-solid-svg-icons';
import { faExpand } from '@fortawesome/free-solid-svg-icons';
import { faSearchPlus} from '@fortawesome/free-solid-svg-icons';
import { faHistory} from '@fortawesome/free-solid-svg-icons';
import { faPause} from '@fortawesome/free-solid-svg-icons';
import { faLongArrowAltDown} from '@fortawesome/free-solid-svg-icons';
import { faLongArrowAltUp} from '@fortawesome/free-solid-svg-icons';
import { faAlignJustify} from '@fortawesome/free-solid-svg-icons';
import { faClock} from '@fortawesome/free-solid-svg-icons';
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

import TOLdemo from '../../../utils/TOL_6min_720p_download.json';
import ReactTooltip from "react-tooltip";
import {ContextMenu, MenuItem, ContextMenuTrigger} from 'react-contextmenu';
import {withRouter } from 'react-router-dom';


import TextEditor from './TextEditor/TextEditor';
import SegmentEditor from './SegmentsEditor/SegmentsEditor';
import Hotkeys from 'react-hot-keys';


class AudioEditor extends Component {

	state = {
		audioPath: '',
		datPath: '',
		peaksInstance: null,
		isPlaying: false,
		odliczanie: null,
		speedFactor: 1,
		segmentCounter: 1,
		pointCounter: 1,
		ifSegments: false,
		segments: [],
		czyZmienionoSegmenty: false,
	}


	onKeyDown(keyName, e, handle) {
		//console.log("test:onKeyDown", e, handle)

		switch (handle.key) {
			case 'alt+l': 
			  this.togglePlaying();
			  break;
			case 'alt+k': 
			  this.rewind3secBack();
			  break;
			case 'alt+j': 
			  this.rewind5secBack();
			  break;
			case 'alt+i': 
			  this.increasePlaybackSpeed();
			  break;
			case 'alt+,': 
			  this.decreasePlaybackSpeed();
			  break;
			default: console.log(e);
		}
	 }

	 increasePlaybackSpeed = () => {
		let player = document.getElementById("audio");
		if(this.state.speedFactor < 3){
			player.playbackRate = this.state.speedFactor + 0.5;
			this.setState({
				speedFactor: this.state.speedFactor + 0.5,
			})
		}
	 }

	 decreasePlaybackSpeed = () => {
		let player = document.getElementById("audio");

		if(this.state.speedFactor > 0){
			player.playbackRate = this.state.speedFactor - 0.5;
			this.setState({
				speedFactor: this.state.speedFactor - 0.5,
			})
		}
		
	 }

	 rewind3secBack = () => {
		this.playBack(3);
	 }

	 rewind5secBack = () => {
		this.playBack(5);
	 }

	 playBack = (seconds) => {
		if(this.state.peaksInstance){

			let currentTime = this.state.peaksInstance.player.getCurrentTime();
			let timeBack = currentTime - seconds;
			if(timeBack<0){
				timeBack = 0;
			}
			this.state.peaksInstance.player.seek(timeBack);
			this.state.peaksInstance.player.play();

			
			this.setState({
				isPlaying: true,
			})

			if(this.state.odliczanie){
				clearTimeout(this.state.odliczanie);
				this.setState({
					odliczanie: null,
				})
			}
			
			let odliczanieTemp = this.state.odliczanie;
			odliczanieTemp = setTimeout(()=>{
				this.state.peaksInstance.player.pause();
				this.setState({
					isPlaying: false,
					odliczanie: null,
				})
			},((seconds*1000)+100)/this.state.speedFactor)

			this.setState({
				odliczanie: odliczanieTemp,
			})
		}
	 }

	 togglePlaying = () => {

		if(this.state.peaksInstance){
			if(this.state.isPlaying){
				this.state.peaksInstance.player.pause();
				this.setState({
					isPlaying: false
				})
			} else {
				this.state.peaksInstance.player.play();
				this.setState({
					isPlaying: true
				})
			}
		}
	 }



	makeEditorFullWidth = () => {
		this.props.editorFullWidth();
	}


	initializePeaksFirstTime = (audioPathok, datPathok, segments) => {

		//arraybuffer: "http://localhost:1234/repoFiles/5e4b09e086f4ed663259fae9/5e9e175af4192d661ebf49dd/5e9e175af4192d661ebf49de/kleska.dat?api_key="+this.props.token,
		
		
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
			segmentColor: 'rgba(57, 75, 85, 1)',
			randomizeSegmentColor: false,
  			segmentStartMarkerColor: 'rgba(255, 87, 34, 1)',
  			segmentEndMarkerColor: 'rgba(255, 152, 0, 1)',
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
			this.setState({
				peaksInstance: peaksInstance,
				audioPath:audioPathok,
				datPath:datPathok,
				segments: segments,
				czyZmienionoSegmenty: false,
			});
	
			//this.setState({peaksInstance: peaksInstance, ifSegments: segments.length>0?true: false});
		  }, this.errorHandler);
	}


	// ładuje nowy plik do edytora
	loadNewAudioToEditor = () => {
		if(this.props.containerForPreview !== undefined){

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
					if(this.props.containerForPreview.VADUserSegments){
						segments = this.props.containerForPreview.VADUserSegments;
					}
					break;
				case 'DIA':
					if(this.props.containerForPreview.DIAUserSegments){
						segments = this.props.containerForPreview.DIAUserSegments;
					}
					break;
				case 'REC':
					if(this.props.containerForPreview.RECUserSegments){
						segments = this.props.containerForPreview.RECUserSegments;
					}
					break;
				case 'SEG':
					if(this.props.containerForPreview.SEGUserSegments){
						segments = this.props.containerForPreview.SEGUserSegments;
					}
					break;
				default:
					console.log("segments default");
					break;
			}	
			
			

			if(this.state.audioPath == '' || this.state.datPath == ''){
				this.initializePeaksFirstTime(audioPath, datPath, segments)
			} else {
				
		

				if(this.state.peaksInstance){
					this.requestWaveformData(datPath)
					.then(waveformData => {
						return this.createSources(waveformData, segments);
					})
					.then(source => {

						this.state.peaksInstance.segments.removeAll();
						if(source.segments){
							this.state.peaksInstance.segments.add(source.segments);
						}


						this.state.peaksInstance.setSource(source, function(error){
							if (error) {
							console.error('setSource error', error);
							}
						});

						this.setState({
							audioPath:audioPath,
							datPath:datPath,
							segments: this.state.peaksInstance.segments.getSegments(),
							czyZmienionoSegmenty: false,
						});


						//aby odwswiezyc liste segmentow
						/*
						let newPeaks = Object.assign({},this.state.peaksInstance);
						this.setState({
							peaksInstance: newPeaks,
						})
						*/

					}, this.errorHandler);
				}

			}
		}
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





	addSegment = () => {
		if(this.state.peaksInstance){

			let newSegment = {
				startTime: this.state.peaksInstance.player.getCurrentTime(),
				endTime: this.state.peaksInstance.player.getCurrentTime() + 3,
				labelText: 'Segment ' + this.state.segmentCounter,
				editable: true
			};

			this.state.peaksInstance.segments.add(newSegment);

			this.setState({
				segmentCounter: this.state.segmentCounter+1,
				segments: [...this.state.peaksInstance.segments.getSegments()],
				czyZmienionoSegmenty: true,
			})
		}
	}

	addPoint = () => {
		if(this.state.peaksInstance){
			this.state.peaksInstance.points.add({
				time: this.state.peaksInstance.player.getCurrentTime(),
				labelText: 'Point ' + this.state.pointCounter,
				color: '#006eb0',
				editable: true
			});

			this.setState({
				pointCounter: this.state.pointCounter+1,
			})
		}				
	}




	createPeaksInstance = (options, thisComponent) => {
		
		return new Promise(function(resolve, reject) {
		  Peaks.init(options, (err, peaksInstance) => {

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

		
				/*
				document.querySelector('button[data-action="log-data"]').addEventListener('click', function(event) {
					console.log("log data")
					thisComponent.makeEditorFullWidth();
					//thisComponent.renderSegments(peaksInstance);
					//thisComponent.renderPoints(peaksInstance);
				  });
				  */


		
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
		
				  /*
				  document.getElementById('amplitude-scale').addEventListener('input', function(event) {
					var scale = amplitudeScales[event.target.value];
		
					peaksInstance.views.getView('zoomview').setAmplitudeScale(scale);
					peaksInstance.views.getView('overview').setAmplitudeScale(scale);
				  });
				  */

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
					thisComponent.updateSegment(segment);
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

	
	componentDidUpdate = (prevProps, prevState) => {

		//kiedy tylko zmieni się container, wtedy ładuje audio i binary data z serwera i uruchamiam podgląd
		if(prevProps.containerForPreview !== this.props.containerForPreview){
			
			this.loadNewAudioToEditor();
			
		}

	}

	componentDidMount = () => {
		this.loadNewAudioToEditor();
	}

	updateSegment = (newSegment) => {

		let segmentToUpdate = newSegment;
		//tutaj sprawdzam czy jakiś segment nie nachodzi już na istniejący.
		
		//iteruje po obecnie istniejących segmentach
		let allsegments = this.state.peaksInstance.segments.getSegments();
		let poprzedniseg = null;
		for(let i=0;i<allsegments.length;i++){
			let currentseg = allsegments[i];
			// iteruje po kolei i sprawdzam czy startTime obecnego jest mniejszy niż endTime poprzedniego
			if(i>0){
				if(currentseg.startTime < poprzedniseg.endTime){
					//alert("nachodzą się")
					//tutaj połączyć obecny z poprzednim segmentem
					let startTimeNowy = poprzedniseg.startTime;
					let endTimeNowy = currentseg.endTime;
					let labelNowy = poprzedniseg.labelText + '-' + currentseg.labelText;
					let idNowy = poprzedniseg.id;

					//usuwam poprzedni i obecny segment
					this.state.peaksInstance.segments.removeById(poprzedniseg.id);
					this.state.peaksInstance.segments.removeById(currentseg.id);

					//dodaje jeden dluższy
					this.state.peaksInstance.segments.add({
						startTime: startTimeNowy,
						endTime: endTimeNowy,
						editable: true,
						color: '#394b55',
						labelText: labelNowy,
						id: idNowy,
					})

					segmentToUpdate = this.state.peaksInstance.segments.getSegment(idNowy);

					
					break;
				}
			}

			poprzedniseg = currentseg;
		}

		this.setState({
			segments: [...this.state.peaksInstance.segments.getSegments()],
			czyZmienionoSegmenty: true,
		})


		//------------------------

		//robie kopie pieaksInstance aby odswiezyc
	   // let segment = this.state.peaksInstance.segments.getSegment(segmentToUpdate.id);
		//segment.update({
		//	...segmentToUpdate,
		//	startTime: parseFloat(segmentToUpdate.startTime),
		//	endTime: parseFloat(segmentToUpdate.endTime)})

		/*
		let peaksCopy = Object.assign({},this.state.peaksInstance);
		this.setState({
			peaksInstance: peaksCopy,
		})
		*/
	
		
	};

	updateSegmentLabel = (id, label) => {
		let segment = this.state.peaksInstance.segments.getSegment(id);
		segment.update({labelText: label})

		this.setState({
			segments: [...this.state.peaksInstance.segments.getSegments()],
			czyZmienionoSegmenty: true,
		})

		//robie kopie pieaksInstance aby odswiezyc
	
		/*
		let peaksCopy = Object.assign({},this.state.peaksInstance);
		this.setState({
			peaksInstance: peaksCopy,
		})
		*/
	
		

		console.log("update Segment Label " + id + " " + label);
	}

	updateSegmentStartTime = (id, newValue) => {
		let segment = this.state.peaksInstance.segments.getSegment(id);
		segment.update({startTime: parseFloat(newValue)})

		this.setState({
			segments: [...this.state.peaksInstance.segments.getSegments()],
			czyZmienionoSegmenty: true,
		})


		//robie kopie pieaksInstance aby odswiezyc
		/*
		let peaksCopy = Object.assign({},this.state.peaksInstance);
		this.setState({
			peaksInstance: peaksCopy,
		})
		*/

		console.log("update Segment Start Time  " + id + " " + newValue);
	}

	updateSegmentEndTime = (id, newValue) => {
		let segment = this.state.peaksInstance.segments.getSegment(id);
		segment.update({endTime: parseFloat(newValue)})

		this.setState({
			segments: [...this.state.peaksInstance.segments.getSegments()],
			czyZmienionoSegmenty: true,
		})


		//robie kopie pieaksInstance aby odswiezyc
		/*
		let peaksCopy = Object.assign({},this.state.peaksInstance);
		this.setState({
			peaksInstance: peaksCopy,
		})
		*/

		console.log("update Segment End Time " + id + " " + newValue);
	}

	/*
	playSegment = (id) => {
		console.log("play segment")
		let segment = this.state.peaksInstance.segments.getSegment(id);
		this.state.peaksInstance.player.playSegment(segment);
	}

	removeSegment = (id) => {
		console.log("remove segment")
		let segment = this.state.peaksInstance.segments.getSegment(id);
		this.state.peaksInstance.segments.removeById(segment);

		this.setState({
			segments: [...this.state.peaksInstance.segments.getSegments()],
		})
	}
	*/

	saveSegmentChanges = () => {

		//konwertuje segmenty z peaks js na bardziej uzyteczne

		let simplerSegments = this.state.peaksInstance.segments.getSegments().map((segment,i)=>{
			return {
				startTime: parseFloat(segment.startTime).toFixed(2),
				endTime: parseFloat(segment.endTime).toFixed(2),
				labelText: segment.labelText,
				editable: true,
				color: '#394b55',
			}
		})

		if(this.props.toolType == "VAD"){
			this.props.onSaveVADSegments(this.props.containerForPreview, this.props.toolType, this.props.token, simplerSegments);
		}
	}
	

	render() {

		// widok segment edytora
		let segmentEditor = null;
		if(this.state.peaksInstance && (this.props.toolType=='VAD' || this.props.toolType=='DIA')){
			if(this.state.segments.length > 0){
				console.log("UPDATE")
				segmentEditor = <SegmentEditor 
				czyZmieniono={this.state.czyZmienionoSegmenty}
				segments={this.state.peaksInstance.segments.getSegments()}
				onUpdateSegmentLabel={(id, label)=>this.updateSegmentLabel(id, label)} 
				onUpdateSegmentStartTime={(id, newValue)=>this.updateSegmentStartTime(id, newValue)}
				onUpdateSegmentEndTime={(id, newValue)=>this.updateSegmentEndTime(id, newValue)}
				onSaveSegmentChanges={this.saveSegmentChanges}
				/>
				//onPlaySegment={(id)=>this.playSegment(id)}
				//onRemoveSegment={(id)=>this.removeSegment(id)}

				//segmentEditor = <SegmentEditor 
				//segments={this.state.peaksInstance.segments.getSegments()}
				//onUpdateSegmentLabel={(id, label)=>this.updateSegmentLabel(id, label)} 
				//onUpdateSegmentStartTime={(id, newValue)=>this.updateSegmentStartTime(id, newValue)}
				//onUpdateSegmentEndTime={(id, newValue)=>this.updateSegmentEndTime(id, newValue)} />
			}
			
		}
		
		// widok edytora tekstowego
		let transcriptWindow = null;

		if(this.props.toolType == "REC"){
			transcriptWindow = <TextEditor 
			toolType={this.props.toolType} 
			container={this.props.containerForPreview}/>		
		}


		//przyciski do dodawania semgentow - nie we wszystkich narzedziach sa widoczne
		let addSegmentPointBtns=null;

		if(this.state.peaksInstance && (this.props.toolType=='VAD' || this.props.toolType=="DIA")){
			addSegmentPointBtns = (
				<>
				<button data-tip data-for='addSegment' data-action="add-segment" onClick={this.addSegment}><FontAwesomeIcon icon={faGripLinesVertical} className="faIcon" /></button>
				<ReactTooltip id="addSegment" delayShow={500}>
					<span>Dodaj segment</span>
				</ReactTooltip>
	
				<button data-tip data-for='addPoint' data-action="add-point" onClick={this.addPoint}><FontAwesomeIcon icon={faMapMarker} className="faIcon" /></button>
				<ReactTooltip id="addPoint" delayShow={500}>
					<span>Dodaj punkt</span>
				</ReactTooltip>
				</>
			);
		}

		


		// widok podglądu audio
		let audioPreview = null;
		let audioSource = this.state.audioPath;

		let playPauseicon = null;
		
		if(this.state.isPlaying){
			playPauseicon = <FontAwesomeIcon icon={faPause} className="faIcon" />
		} else {
			playPauseicon = <FontAwesomeIcon icon={faPlay} className="faIcon" />
		}

		if(this.props.containerForPreview == ""){
			audioPreview = null
		} else {
			audioPreview = (
				<>
					
					<div id="demo-controls">
							<div className="row">
								<div className="col-12">
									<div id="controls">

										
										<button data-tip data-for='fullscreen' data-action="resize"><FontAwesomeIcon icon={faExpand} className="faIcon" /></button>
										<ReactTooltip id="fullscreen" delayShow={500}>
											<span>Full screen</span>
										</ReactTooltip>

									 
										<button data-tip data-for='playpause' data-action="play" onClick={this.togglePlaying}>{playPauseicon}</button>
										<ReactTooltip id="playpause" delayShow={500}>
											<span>Play/pause (Alt+l)</span>
										</ReactTooltip>


										<button data-tip data-for='rewind3' data-action="back-3" onClick={this.rewind3secBack}><FontAwesomeIcon icon={faHistory} className="faIcon" /> 3 sec.</button>
										<ReactTooltip id="rewind3" delayShow={500}>
											<span>Powtórz ostatnie 3 sek. (Alt+k)</span>
										</ReactTooltip>

										
										<button data-tip data-for='rewind5' data-action="back-5" onClick={this.rewind5secBack}><FontAwesomeIcon icon={faHistory} className="faIcon" /> 5 sec.</button>
										<ReactTooltip id="rewind5" delayShow={500}>
											<span>Powtórz ostatnie 5 sek. (Alt+j)</span>
										</ReactTooltip>
										
										
										<button data-tip data-for='increaseSpeed' data-action="speed-up" onClick={this.increasePlaybackSpeed}><FontAwesomeIcon icon={faClock} className="faIcon" /> <FontAwesomeIcon icon={faLongArrowAltUp} className="faIcon" /> <span style={{fontSize:'0.7em', width:'25px', display: 'inline-block'}}>x {this.state.speedFactor}</span></button>
										<ReactTooltip id="increaseSpeed" delayShow={500}>
											<span>Szybciej (Alt+i)</span>
										</ReactTooltip>
										
									
										<button data-tip data-for='decreaseSpeed' data-action="slow-down" onClick={this.decreasePlaybackSpeed}><FontAwesomeIcon icon={faClock} className="faIcon" /> <FontAwesomeIcon icon={faLongArrowAltDown} className="faIcon" /><span style={{fontSize:'0.7em', width:'25px', display: 'inline-block'}}> x {this.state.speedFactor}</span></button>
										<ReactTooltip id="decreaseSpeed" delayShow={500}>
											<span>Wolniej (Alt+,)</span>
										</ReactTooltip>

										
										<button data-tip data-for='zoomin' data-action="zoom-in"><FontAwesomeIcon icon={faSearchPlus} className="faIcon" /> </button>
										<ReactTooltip id="zoomin" delayShow={500}>
											<span>Przybliż</span>
										</ReactTooltip>

									
										<button data-tip data-for='zoomout' data-action="zoom-out"><FontAwesomeIcon icon={faSearchMinus} className="faIcon" /> </button>
										<ReactTooltip id="zoomout" delayShow={500}>
											<span>Oddal</span>
										</ReactTooltip>
										
										{
											addSegmentPointBtns
										}
										
										
										

										{

											//<button data-action="log-data"><FontAwesomeIcon icon={faEye} className="faIcon" /></button>
											//<input type="range" id="amplitude-scale" min="0" max="10" step="1" />
										}
										
									</div>
									
									<p><b>{this.props.containerForPreview.containerName}</b></p>
								

								</div>
								<div className="col-12">
								
								<audio id="audio" controls={false}>
									<source src={audioSource}/>
										Your browser does not support the audio element.
									</audio>
								</div>
							</div>
							
							
					</div>

					<div id="waveform-container">
						<div id="overview-container"></div>
						<div id="zoomview-container"></div>
					</div>

					
				</>
			)
		}



		return (
			<Hotkeys 
					keyName=" alt+j, alt+k, alt+l, alt+i, alt+," 
					onKeyDown={this.onKeyDown.bind(this)}
					filter={(event) => {
					//	console.log(event)
					   return true;
					 }}
				>
					<Aux>
						<div className="AudioEditor">
						
							{

								audioPreview
							
							}

							{
								transcriptWindow
							}


							
							{
								segmentEditor
							}


						</div>
					</Aux>
			</Hotkeys>
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

		onSaveVADSegments: (container, toolType, token, segments) => dispatch(audioEditorActions.saveVADSegments(container, toolType, token, segments)),

		 // onLoadAudioForPreview: (container, toolType, token) => dispatch(audioEditorActions.loadAudioForPreview(container, toolType, token)),
         // onLoadBinaryForPreview: (container, toolType, token) => dispatch(audioEditorActions.loadBinaryForPreview(container, toolType, token)),
		//onOpenModalHandler: () => dispatch(segmentActions.openModalProject()),
       // onCloseModalHandler: () => dispatch(segmentActions.closeModalProject()),
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AudioEditor));