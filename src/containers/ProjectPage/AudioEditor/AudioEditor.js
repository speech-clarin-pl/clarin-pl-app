import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary';
import './AudioEditor.css';
import { connect } from 'react-redux';
import uuid from 'uuid';
import Modal from '../../../components/UI/Modal/Modal';
import { extensionMapping } from '../../../utils/fileTypes';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faComment} from '@fortawesome/free-solid-svg-icons';
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

	 
	/*
	constructor(props) {
		super(props);
		this.mediaElement = React.createRef();

		this.zoomviewcontainer = React.createRef(); 
		this.overviewcontainer = React.createRef(); 

	  }
	  */


	createPeaksInstance = (options) => {
		
		return new Promise(function(resolve, reject) {
			
		  Peaks.init(options, function(err, peaksInstanceok) {
			if (err) {
			  console.log("uwaga error")
			  reject(err);
			}
			else {
			  console.log('Peaks instance ready');

			  return resolve(peaksInstanceok);
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

		let options = {
			containers: {
				zoomview: document.getElementById('zoomview-container'),
				overview: document.getElementById('overview-container')
			},
			mediaElement: document.querySelector('audio'),
			dataUri: {
			  arraybuffer: "http://localhost:1234/repoFiles/5e4b09e086f4ed663259fae9/5e9e175af4192d661ebf49dd/5e9e175af4192d661ebf49de/kleska.dat?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1rbGVjQHBqd3N0ay5lZHUucGwiLCJ1c2VySWQiOiI1ZTRiMDllMDg2ZjRlZDY2MzI1OWZhZTkiLCJpYXQiOjE1ODgxOTQ5NTcsImV4cCI6MTU4ODMwMjk1N30.aTtaogfShae8EnAn-o4gcOZs39l-SFZ9p9IazzAJAEA",
			},
			zoomWaveformColor: 'rgba(52, 152, 219, 1)',
			overviewWaveformColor: 'rgba(52, 152, 219, 0.3)',
		  };

		  this.createPeaksInstance(options)
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
		
				this.setState({
					audioPath:audioPath,
					datPath:datPath
				});


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

		/*
		let containerBinary = null;
		let containerAudio = null;
		switch(this.props.toolType){
            case "DIA":
				if(this.props.containerBinaryPreviewDIA !== null && this.props.audioFileDIA !== null){
					containerBinary = this.props.containerBinaryPreviewDIA;
					containerAudio = this.props.audioFileDIA;
				}
                break;
            case "VAD":
                if(this.props.containerBinaryPreviewVAD!== null && this.props.audioFileVAD !== null){
					containerBinary = this.props.containerBinaryPreviewVAD;
					containerAudio = this.props.audioFileVAD;
				}
                break;
            case "REC":
                if(this.props.containerBinaryPreviewREC!== null && this.props.audioFileRED !== null){
					containerBinary = this.props.containerBinaryPreviewREC;
					containerAudio = this.props.audioFileREC;
				}
                break;
            case "SEG":
				if(this.props.containerBinaryPreviewSEG!== null  && this.props.audioFileSEG !== null){
					containerBinary = this.props.containerBinaryPreviewSEG;
					containerAudio = this.props.audioFileSEG;
				}
                break;
            default:
                console.log("Default"); //to do
		}
		*/




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
							<button data-action="zoom-in">Zoom in</button>
							<button data-action="zoom-out">Zoom out</button>
							<label htmlFor="select-audio">Select audio:</label>
							<select id="select-audio"></select>
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