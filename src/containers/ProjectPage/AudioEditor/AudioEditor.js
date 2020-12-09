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
import ButtonLeftBar from '../../../components/UI/ButtonLeftBar/ButtonLeftBar';


import TextEditor from './TextEditor/TextEditor';
import SegmentEditor from './SegmentsEditor/SegmentsEditor';
import Hotkeys from 'react-hot-keys';

import {createNotification, loader} from '../../../index';


class AudioEditor extends Component {

	constructor(props) {

		super(props);

		this.state = {
			audioPath: '',
			datPath: '',
			segments: [],
			text: '',
			transcriptHasChanged: false,
			isPlaying: false,
			speedFactor: 1,
			odliczanie: null,
			isLoading: false,
			czyZmienionoSegmenty: false,
			currentSegments: [], //w przyjaznej formie
			segmentCounter: 1,
			currentZoom: 1,
		}

		this.audioPlayer = React.createRef();

		this.peaks = null;

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
			case 'alt+o': 
			  this.decreasePlaybackSpeed();
			  break;
			case 'alt+n':
			  this.loadNextElement();
			  break;
			case 'alt+m':
			  this.saveChanges();
			  break;
			default: console.log(e);
		}
	 }

	 saveChanges = () => {

		switch(this.props.toolType){
			case("VAD"):
				console.log('VAD')
				break;
			case("DIA"):
				console.log('DIA')
				break;
			case("REC"):
			    this.props.onSaveTranscription(this.props.containerForPreview, this.props.toolType, this.props.token, this.state.text);
				break;
			case("SEG"):
				console.log('SEG')
				break;
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

	 togglePlaying = () => {
			if(this.state.isPlaying){
				this.peaks.player.pause();
				this.setState({
					isPlaying: false
				})
			} else {
				this.peaks.player.play();
				this.setState({
					isPlaying: true
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

			let currentTime = this.peaks.player.getCurrentTime();
			let timeBack = currentTime - seconds;
			if(timeBack<0){
				timeBack = 0;
			}
			this.peaks.player.seek(timeBack);
			this.peaks.player.play();

			
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
				this.peaks.player.pause();
				this.setState({
					isPlaying: false,
					odliczanie: null,
				})
			},((seconds*1000)+100)/this.state.speedFactor)

			this.setState({
				odliczanie: odliczanieTemp,
			})
	 }




	createPeaksInstance = (options) => {
		
		return new Promise((resolve, reject) => {
		  Peaks.init(options, (err, peaksInstance) => {

			if (err) {
			  console.log("Problem with Peaks initialization")
			  reject(err);
			}
			else {
			  console.log('Peaks instance ready');

				  
			  return resolve(peaksInstance);
			}
		  });
		});
	  }


	  bindEventHandlers = (peaksInstance, options) => {


		

		document.querySelector('body').addEventListener('click', (event) => {
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

			  this.setState({
				  czyZmienionoSegmenty: true,
			  })

			}
		  });


		document.querySelector('[data-action="zoom-in"]').addEventListener('click', () =>{
			peaksInstance.zoom.zoomIn();
			this.setState({
				currentZoom: peaksInstance.zoom.getZoom(),
			})
			console.log(this.state.currentZoom)
		});

		document.querySelector('[data-action="zoom-out"]').addEventListener('click', () =>{
			peaksInstance.zoom.zoomOut();
			this.setState({
				currentZoom: peaksInstance.zoom.getZoom(),
			})
			console.log(this.state.currentZoom)
		});

		document.querySelector('[data-action="resize"]').addEventListener('click', () =>{
			
	
			this.props.editorFullWidth();

			console.log(this.props.ifFullScreen)
		
			let zoomview = peaksInstance.views.getView('zoomview');
			if (zoomview) {
				zoomview.fitToContainer();
			}

			let overview = peaksInstance.views.getView('overview');
			if (overview) {
				overview.fitToContainer();
			}

			
		 });

		 document.querySelector('[data-action="play"]').addEventListener('click', () =>{
			this.togglePlaying();
		 });

		 peaksInstance.on('segments.dragend', (segment, startMarker) => {
			
			this.updateSegment(segment);
			console.log('segments.dragend:', segment, startMarker);
		  });

	  }


	convertPeaksSegments = () => {
		let segmenty = this.peaks.segments.getSegments().map(segment=>{
			return {
				startTime: segment.startTime,
				endTime: segment.endTime,
				color: segment.color,
				labelText: segment.labelText,
				id: segment.id,
				editable: segment.editable,
			}
		})

		return segmenty;
	}


	startPeaksLeaving = (audioPathok, datPathok, segments) => {

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

			mediaUrl: audioPathok,

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
		  };


		  this.createPeaksInstance(options)
          .then(peaksInstance => {

			//ładuje tutaj audio
			peaksInstance.setSource(options, error => {
				if (error) {
				console.error('setSource error', error);
				}


				this.peaks = peaksInstance;

				let segmenty = this.convertPeaksSegments();

				this.setState({
					currentSegments: segmenty,
				})

				
				

				this.bindEventHandlers(this.peaks, options);
			});
		

		  }, this.errorHandler);
	}



	//wydobywa ścieżkę do metadanych, pliku audio i segmentów
	getDataFromContainer = (container) => {
		const userId = container.owner;
		const projectId = container.project;
		const sessionId = container.session;
		const fileName = container.fileName;
		const containerId = container._id;
		const token = this.props.token;

		//pobieram segmenty
		let segments = [];
		switch(this.props.toolType){
			case("VAD"):
				segments = container.VADUserSegments;
				break;
			case("DIA"):
				segments = container.DIAUserSegments;
				break;
			case("REC"):
				segments = container.RECUserSegments;
				break;
			case("SEG"):
				segments = container.RECUserSegments;
				break;
		}

		if(segments==undefined) segments = [];
		

		//plik audio
		//let audioPath = process.env.REACT_APP_API_URL+ "/repoFiles/" + userId + "/" + projectId + "/"+sessionId+"/"+containerId+"/audio?api_key="+token;
		
		let audioPath = process.env.REACT_APP_API_URL+ "/repoFiles/download/"+containerId+"/audio?api_key="+token;
		
		//meta data do renderingu waveform
		//let datPath = process.env.REACT_APP_API_URL + "/repoFiles/" + userId + "/" + projectId + "/"+sessionId+"/"+containerId+"/dat?api_key="+token;
		
		let datPath = process.env.REACT_APP_API_URL + "/repoFiles/download/"+containerId+"/dat?api_key="+token;


		return {
			audioPath: audioPath,
			datPath: datPath,
			segments: segments,
		}
	}



	// ładuje nowy plik do edytora
	loadNewAudioToEditor = (container) => {

		if(container !== undefined){

			let data = this.getDataFromContainer(container);
			console.log(data.audioPath);
			console.log(data.datPath);
			console.log(data.segments);
			this.startPeaksLeaving(data.audioPath, data.datPath, data.segments)

		}
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



	//gdy mamy już instancje zrobioną i tylko aktualizujemy dane
	updateSource = (container) => {
		if(this.peaks){

			let data = this.getDataFromContainer(container);

			//pytam serwer o nowe dane do wyrenderowania - tutaj można uruchomić preloader

			this.setState({
				isLoading: true,
			})
			this.requestWaveformData(data.datPath)
				.then(waveformData => {

					this.setState({
						isLoading: false,
					})

					this.peaks.segments.removeAll();
					

					return {
						title: container.containerName,
						mediaUrl: data.audioPath,
						waveformData: {
						  arraybuffer: waveformData,
						},
					  };
				})
				.then(source => {
					
					this.peaks.setSource(source, error => {
						if(error){
							console.log(error);
						}

						this.peaks.segments.add(data.segments);
						this.setState({
							currentSegments: [...data.segments],
						})
					});

					this.peaks.zoom.setZoom(this.state.currentZoom);

				})

			
		}
	}

	
	componentDidUpdate = (prevProps, prevState) => {

		//kiedy tylko zmieni się container, wtedy ładuje audio i binary data z serwera i uruchamiam podgląd
		if(prevProps.containerForPreview !== this.props.containerForPreview){
			
			//tutaj robie jedynie update po tym jak peaks jest już zainicjowany

			this.setState({
				czyZmienionoSegmenty: false,
				isPlaying: false,
				speedFactor: 1,
				isLoading: false,
			})

			this.updateSource(this.props.containerForPreview);

			switch(this.props.toolType){
				case("VAD"):
					console.log('VAD')
					break;
				case("DIA"):
					console.log('DIA')
					break;
				case("REC"):
				    this.loadTranscription();
					break;
				case("SEG"):
					console.log('SEG')
					break;
			}

		}

		// jeżeli zmieniła się transkrypcja
		if(this.props.transcriptionData){
			if(prevProps.transcriptionData !== this.props.transcriptionData){
						if(this.props.containerForPreview.ifREC){
							this.setState({
								text: this.props.transcriptionData.blocks[0].data.text,
								transcriptHasChanged: false,
							})
						}
			}
		} else {
			this.setState({
				text: '',
				transcriptHasChanged: false,
			})
		}
	}

	componentDidMount = () => {
		this.loadNewAudioToEditor(this.props.containerForPreview);
	}


	updateSegment = (newSegment) => {


		//tutaj sprawdzam czy jakiś segment nie nachodzi już na istniejący.
		
		//iteruje po obecnie istniejących segmentach
		let allsegments = this.peaks.segments.getSegments();

		//iteruje po wszyskich istniejących i porównuje obecny z wszystkimi istniejącymi

		/*
			wstawilem
			{
				startTime: 1.26,
				endTime: 4.08,
				id: peaks.segment.3
			}

			wszystkie inne

			{
				startTime: 11.14
				endTime: 13.01,
				id: peaks.segment.1
			},
			{
				startTime: 13.392
				endTime: 18.77,
				id: peaks.segment.2
			},
			{
				startTime: 1.256 
				endTime: 4.088,
				id: peaks.segment.3
			}
		*/


		//rozpoznaje ktore leza w obrebie modyfikowanego
		let ktoreIstniejaceWModified = [];


		//wyłuskuje to segmenty które nachodzą się ze zmodyfikowany
		for(let currentseg of allsegments){

		   //jeżeli obecny to przeskakuje
		   if(currentseg.id == newSegment.id) continue;

		   if((currentseg.startTime >= newSegment.startTime) && (currentseg.startTime <= newSegment.endTime)){
			   //startTime tego segmentu lezy w zmodyfikownym segmencie
			   ktoreIstniejaceWModified.push({
				startTime: currentseg.startTime,
				endTime: currentseg.endTime,
				labelText: currentseg.labelText,
				id: currentseg.id,
			   });
		   }


		   if(((currentseg.startTime <= newSegment.startTime) && (currentseg.startTime <= newSegment.endTime)) && (currentseg.endTime >= newSegment.startTime && currentseg.endTime >= newSegment.endTime)){
			//startTime tego segmentu lezy w zmodyfikownym segmencie
			ktoreIstniejaceWModified.push({
			 startTime: currentseg.startTime,
			 endTime: currentseg.endTime,
			 labelText: currentseg.labelText,
			 id: currentseg.id,
			});
		}

		 

		   if((currentseg.endTime >= newSegment.startTime) && (currentseg.endTime <= newSegment.endTime)){
			//endTime tego segmentu lezy w zmodyfikownym segmencie
			  ktoreIstniejaceWModified.push({
				startTime: currentseg.startTime,
				endTime: currentseg.endTime,
				labelText: currentseg.labelText,
				id: currentseg.id,
			   });
		   }

		}

		//teraz usuwam wszystkie (łącznie z nowo dodanym) i tworze nowy ktory nachodzi odpowiednio na granice nachodzacych

		if(ktoreIstniejaceWModified.length > 0){

								
			let minTime = 999999999999;
			let maxTime = 0;

			let nowyLabel = "Custom";
			for(let nachodzacy of ktoreIstniejaceWModified){
				if(nachodzacy.startTime <= minTime) minTime = nachodzacy.startTime;
				if(nachodzacy.endTime >= maxTime) maxTime = nachodzacy.endTime;

				//let numerekFromId = nachodzacy.id.substr(nachodzacy.id.lastIndexOf('.')+1,nachodzacy.id.length);
				nowyLabel = "Custom " +this.state.segmentCounter;
				this.peaks.segments.removeById(nachodzacy.id);
			}

			//teraz zajmuje sie modyfikowanym
			if(newSegment.startTime <= minTime) minTime = newSegment.startTime;
			if(newSegment.endTime >= maxTime) maxTime = newSegment.endTime;
			this.peaks.segments.removeById(newSegment.id);

			//dodaje nowy wlasny
			this.peaks.segments.add({
				startTime: minTime,
				endTime: maxTime,
				editable: true,
				color: '#394b55',
				labelText: nowyLabel,
			})
		}

		let segmenty = this.convertPeaksSegments();

		this.setState({
			segments: [...segmenty],
			czyZmienionoSegmenty: true,
		})
	
		
	};



	updateSegmentLabel = (id, label) => {
		let segment = this.peaks.segments.getSegment(id);
		segment.update({labelText: label})

		this.setState({
			czyZmienionoSegmenty: true,
		})


		console.log("update Segment Label " + id + " " + label);
	}

	updateSegmentStartTime = (id, newValue) => {
		let segment = this.peaks.segments.getSegment(id);
		segment.update({startTime: parseFloat(newValue)})

		this.setState({
			czyZmienionoSegmenty: true,
		})


		console.log("update Segment Start Time  " + id + " " + newValue);
	}

	updateSegmentEndTime = (id, newValue) => {
		let segment = this.peaks.segments.getSegment(id);
		segment.update({endTime: parseFloat(newValue)})

		this.setState({
			czyZmienionoSegmenty: true,
		})

		console.log("update Segment End Time " + id + " " + newValue);
	}


	saveSegmentChanges = () => {

		//konwertuje segmenty z peaks js na bardziej uzyteczne
		let simplerSegments = this.convertPeaksSegments();


		switch(this.props.toolType){
			case("VAD"):
				this.props.onSaveVADSegments(this.props.containerForPreview, this.props.toolType, this.props.token, simplerSegments);
				break;
			case("DIA"):
				this.props.onSaveDIASegments(this.props.containerForPreview, this.props.toolType, this.props.token, simplerSegments);
				break;
			case("REC"):
			console.log('REC')
				break;
			case("SEG"):
				console.log('SEG')
				break;
		}


	}

	addSegment = () => {
		if(this.peaks){

			let newSegment = {
				startTime: this.peaks.player.getCurrentTime(),
				endTime: this.peaks.player.getCurrentTime() + 3,
				labelText: 'Segment ' + this.state.segmentCounter,
				editable: true,
			};


			this.peaks.segments.add(newSegment);

			let segmenty = this.convertPeaksSegments();

			this.updateSegment(newSegment);
			
			this.setState({
				segmentCounter: this.state.segmentCounter+1,
				//czyZmienionoSegmenty: true,
				//currentSegments: [...segmenty],
			})

			
		}
	}


	//ładuje kolejny element z listy
	loadNextElement = () => {
		this.props.onLoadNextElement();
	}

	textChanged = (evt) => {
		// console.log(evt.target.value)
	   // console.log(this.state.transcriptionData)
		 this.setState({
			 text: evt.target.value,
			 transcriptHasChanged: true,
		 })
		 this.props.onTranscriptionChanged();
	 }


	 loadTranscription = () => {
        if(this.props.containerForPreview.ifREC){
            this.props.onLoadExistingTranscription(this.props.containerForPreview, this.props.toolType, this.props.token);
        }  else {
            this.setState({
                text: "",
                transcriptHasChanged: false,
            })
        }
        
        if(this.props.containerForPreview.ifDIA){
            //this.props.onLoadExistingTranscription(this.props.container, this.props.toolType, this.props.token);
        } else  if(this.props.containerForPreview.ifSEG){
           // this.props.onLoadExistingTranscription(this.props.container, this.props.toolType, this.props.token);
        } else  if(this.props.containerForPreview.ifVAD){
           // this.props.onLoadExistingTranscription(this.props.container, this.props.toolType, this.props.token);
        }  
	}
	

	openPreviewInEMU = () => {
		//this.props.openPreviewInEMU(this.props.containerForPreview, this.props.token);

		//musze skonstruować coś takiego
		//https://ips-lmu.github.io/EMU-webApp/?audioGetUrl=https:%2F%2Fmowa.clarin-pl.eu%2Ftools%2Fdownload%2F5ee14ac666eca6f9d593b059&labelGetUrl=https:%2F%2Fmowa.clarin-pl.eu%2Ftools%2Fannot%2F5ef6186e66eca66f0d79e978&labelType=annotJSON
	
		let container = this.props.containerForPreview;
		const userId = container.owner;
		const projectId = container.project;
		const sessionId = container.session;
		const fileName = container.fileName;
		const containerId = container._id;
		const token = this.props.token;

		let audioGetUrl = process.env.REACT_APP_API_URL+ "/repoFiles/" + userId + "/" + projectId + "/"+sessionId+"/"+containerId+"/audio?api_key="+token;
		let labelGetUrl = process.env.REACT_APP_API_URL+ "/repoFiles/" + userId + "/" + projectId + "/"+sessionId+"/"+containerId+"/SEGtextGrid?api_key="+token;
		let labelType='TEXTGRID';

		let finalPathToEMU = encodeURI('https://ips-lmu.github.io/EMU-webApp/?audioGetUrl=' + audioGetUrl + '&labelGetUrl=' + labelGetUrl + '&labelType=' + labelType);

		window.open(finalPathToEMU, "_blank");
	
	}



	render() {

		//przycisk przycisku podglądu w EMU
		let previewInEMUBtn = null;
		if(this.props.containerForPreview.ifSEG){
			previewInEMUBtn = <ButtonLeftBar 
                        napis={"Otwórz w EMU"}
                        iconType="file"
                        icon={null}
                        customeStyle={{textAlign:'center', marginBottom: '20px'}}
                        disabled={false}
                        whenClicked={this.openPreviewInEMU}/>
		}


		

		// widok edytora tekstowego
		let transcriptWindow = null;
		if(this.props.toolType == "REC"){
			transcriptWindow = <TextEditor 
			toolType={this.props.toolType} 
			container={this.props.containerForPreview}
			onLoadNextElement={this.loadNextElement}
			text = {this.state.text}
			onTextChanged = {this.textChanged}
			onLoadTranscription ={this.loadTranscription}
			onSaveChanges={this.saveChanges}
			transcriptHasChanged = {this.state.transcriptHasChanged}
			/>		
		}

		// widok segment edytora
		let segmentEditor = null;
		if(this.peaks && (this.props.toolType=='VAD' || this.props.toolType=='DIA')){
			if(this.state.currentSegments.length > 0){
				console.log("UPDATE")
				segmentEditor = <SegmentEditor 
				czyZmieniono={this.state.czyZmienionoSegmenty}
				segments={this.peaks.segments.getSegments()}
				onUpdateSegmentLabel={(id, label)=>this.updateSegmentLabel(id, label)} 
				onUpdateSegmentStartTime={(id, newValue)=>this.updateSegmentStartTime(id, newValue)}
				onUpdateSegmentEndTime={(id, newValue)=>this.updateSegmentEndTime(id, newValue)}
				onSaveSegmentChanges={this.saveSegmentChanges}
				/>
			}	
		}



		//jaką ikonkę wyświetlić na przycisku play
		let playPauseicon = null;
		if(this.state.isPlaying){
			playPauseicon = <FontAwesomeIcon icon={faPause} className="faIcon" />
		} else {
			playPauseicon = <FontAwesomeIcon icon={faPlay} className="faIcon" />
		}


		// widok podglądu audio
		let audioPreview = null;
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

									 
										<button data-tip data-for='playpause' data-action="play" >{playPauseicon}</button>
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
											<span>Wolniej (Alt+o)</span>
										</ReactTooltip>

										<button data-tip data-for='zoomin' data-action="zoom-in"><FontAwesomeIcon icon={faSearchPlus} className="faIcon" /> </button>
										<ReactTooltip id="zoomin" delayShow={500}>
											<span>Przybliż</span>
										</ReactTooltip>

									
										<button data-tip data-for='zoomout' data-action="zoom-out"><FontAwesomeIcon icon={faSearchMinus} className="faIcon" /> </button>
										<ReactTooltip id="zoomout" delayShow={500}>
											<span>Oddal</span>
										</ReactTooltip>

										<button data-tip data-for='addSegment' data-action="add-segment" onClick={this.addSegment}><FontAwesomeIcon icon={faGripLinesVertical} className="faIcon" /></button>
										<ReactTooltip id="addSegment" delayShow={500}>
											<span>Dodaj segment</span>
										</ReactTooltip>
										
										
									</div>
									
									<h3><b>{this.props.containerForPreview.containerName}</b></h3>
									<p style={{fontSize: '11px'}}>{this.props.containerForPreview._id}</p>
								

								</div>
								<div className="col-12">
								
								<audio id="audio" controls={false} ref={this.audioPlayer}>
									<source src={this.state.audioPath} />
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
					keyName=" alt+j, alt+k, alt+l, alt+i, alt+o,alt+n,alt+m" 
					onKeyDown={this.onKeyDown.bind(this)}
					filter={(event) => {
					//	console.log(event)
					   return true;
					 }}
				>
					<Aux>
						{this.state.isLoading ? loader(): null}
						<div className="AudioEditor">
						
							{

								audioPreview
							
							}

							{
								previewInEMUBtn
							}

							{
								segmentEditor
							}

							{
								transcriptWindow
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

		transcriptionSaved: state.projectR.transcriptionSaved,
        transcriptionData: state.recR.transcriptionData,


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

		openPreviewInEMU: (container, token) => dispatch(audioEditorActions.openContainerInEMU(container, token)),

		onSaveVADSegments: (container, toolType, token, segments) => dispatch(audioEditorActions.saveVADSegments(container, toolType, token, segments)),
		onSaveDIASegments: (container, toolType, token, segments) => dispatch(audioEditorActions.saveDIASegments(container, toolType, token, segments)),

		onSaveTranscription: (container, toolType, token, transcription) => dispatch(audioEditorActions.saveTranscription(container, toolType, token, transcription)),
		onTranscriptionChanged: () => dispatch(audioEditorActions.transcriptionChanged()),
		onLoadExistingTranscription: (container, toolType, token) => dispatch(audioEditorActions.loadTranscription(container, toolType, token)),
		// onLoadAudioForPreview: (container, toolType, token) => dispatch(audioEditorActions.loadAudioForPreview(container, toolType, token)),
         // onLoadBinaryForPreview: (container, toolType, token) => dispatch(audioEditorActions.loadBinaryForPreview(container, toolType, token)),
		//onOpenModalHandler: () => dispatch(segmentActions.openModalProject()),
       // onCloseModalHandler: () => dispatch(segmentActions.closeModalProject()),
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AudioEditor));