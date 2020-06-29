import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary';
import SettingBar from '../SettingBar/SettingBar';
import FooterTool from '../FooterTool/FooterTool';
import './SegmentTool.css';
import SegmentItem from './SegmentItem/SegmentItem';
import LeftSiteBar from '../LeftSiteBar/LeftSiteBar';
import ButtonLeftBar from '../../../components/UI/ButtonLeftBar/ButtonLeftBar';
import DragAndDrop from '../../../components/UI/DragAndDrop/DragAndDrop';
import DropFilesArea from '../../../components/UI/DropFilesArea/DropFilesArea';
import { connect } from 'react-redux';
import uuid from 'uuid';
import * as segmentActions from '../../../store/actions/index';
import SortableAudioList from './SortableAudioList/SortableAudioList';
import SortableTxtList from './SortableTxtList/SortableTxtList';
import Modal from '../../../components/UI/Modal/Modal';
import { extensionMapping } from '../../../utils/fileTypes';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getExt, getFilenameFromURL } from '../../../utils/utils';
import ToolItem from '../ToolItem/ToolItem';
import TextareaAutosize from 'react-textarea-autosize';

import AudioEditor from '../AudioEditor/AudioEditor';

class SegmentTool extends Component {


	state = {
        modal: false,
        editorFullWidth: false,
	}
	
	/* state = {
        modal: false,
    }

	handleDropAudio = (audiofiles) => {

		let extAudioFiles = [];
		let fileList = [];
		let refusedAudioFileList = [];
		
		//checking if the file/s is from local env
        if (audiofiles instanceof FileList) {

			console.log("rozpoznalem FILELIST")

			for(var i=0;i<audiofiles.length;i++){
				let file = audiofiles[i];
                let fileExtention = getExt(file.name)[0];

                //rozpoznaje tylko pliki audio
                if (extensionMapping.hasOwnProperty(fileExtention) &&
                    (extensionMapping[fileExtention] == "Audio")) {
                    fileList.push(file);
                } else {
                    refusedAudioFileList.push(file);
				}
			} 

		 //checking if files come from repo
		} else if (audiofiles instanceof Object && (audiofiles["fileId"] != undefined)) {
			console.log("rozpoznalem OBJECT")
            
            //then the file is comming from the repo...
            let f = audiofiles; //narazie mozna przeciagnac tylko jeden plik
           
            let fileExtention = getExt(f.fileURL)[0];

            //rozpoznaje tylko pliki audio
            if (extensionMapping.hasOwnProperty(fileExtention) &&
                (extensionMapping[fileExtention] == "Audio")) {
                fileList.push(f);
            } else {
                refusedAudioFileList.push(f);
            }

		//checking if files come from browse btn
		} else if ( audiofiles.currentTarget != null && audiofiles.currentTarget instanceof Element){
			console.log("rozpoznalem Element")
            
            const inputControl = audiofiles.currentTarget;
            
            for (var i = 0; i < inputControl.files.length; i++) {
                let file = inputControl.files[i];
                let fileExtention = getExt(file.name)[0];
    
                 //rozpoznaje tylko pliki audio
                 if (extensionMapping.hasOwnProperty(fileExtention) &&
                        (extensionMapping[fileExtention] == "Audio")) {
                        fileList.push(inputControl.files[i]);
                    } else {
                        refusedAudioFileList.push(inputControl.files[i]);
                    }
            }
		}


		// if(refusedAudioFileList.length > 0){
		// 	this.props.onSetRefusionAudioFiles(refusedAudioFileList);
		// 	this.props.onOpenModalHandler();
		// 	//console.log(refusedAudioFileList)
		// }

		if (refusedAudioFileList.length > 0) {
            this.props.onSetRefusionAudioFiles(refusedAudioFileList);
            this.setState({
                modal: true,
            });
        }

		Array.from(fileList).forEach(file => {

			let newFile = Object.assign({}, file);
			
            //musze sprawdzic czy plik pochodzi z repo czy z local
			// bo jest inna struktura danych
			
            //z repo
            if(file["fileURL"] != undefined){
                newFile.file = {
                    "name": getFilenameFromURL(file.fileURL),
                    "size": file.fileSize,
                    "fileId": file.fileId,
                };
                newFile.from = "repo";
                newFile.loadedperc = 100;
                newFile.url = file.fileURL;
                newFile.status = "loaded";
            //z local
            } else {
                newFile.file = file;
                newFile.status = 'toload';
                newFile.loadedperc = 0;
                newFile.from = 'local';
            }

            newFile.id = uuid.v4();
            extAudioFiles.push(newFile);
        });

		this.props.onAudioDrop(extAudioFiles);
       
	}


	handleDropTxt = (txtfiles) => {
		let extTxtFiles = [];
		let fileList = [];
		let refusedTxtFileList = [];
		
		//checking if the file/s is from local env
        if (txtfiles instanceof FileList) {

			for(var i=0;i<txtfiles.length;i++){
			
				let file = txtfiles[i];
				let fileExtention = getExt(file.name)[0];

				//rozpoznaje tylko pliki txt
				if (extensionMapping.hasOwnProperty(fileExtention) &&
					(extensionMapping[fileExtention] == "Text")) {
					fileList.push(file);
				} else {
					refusedTxtFileList.push(file);
				}
			
			} 

		 //checking if files come from repo
		} else if (txtfiles instanceof Object && (txtfiles["fileId"] != undefined)) {

			//then the file is comming from the repo...
            let f = txtfiles; //narazie mozna przeciagnac tylko jeden plik
           
            let fileExtention = getExt(f.fileURL)[0];

            //rozpoznaje tylko pliki audio
            if (extensionMapping.hasOwnProperty(fileExtention) &&
                (extensionMapping[fileExtention] == "Text")) {
                fileList.push(f);
            } else {
                refusedTxtFileList.push(f);
            }

		//checking if files come from browse btn
		} else if (txtfiles.currentTarget != null && txtfiles.currentTarget instanceof Element){
			
			const inputControl = txtfiles.currentTarget;
            
            for (var i = 0; i < inputControl.files.length; i++) {
                let file = inputControl.files[i];
                let fileExtention = getExt(file.name)[0];
    
                 //rozpoznaje tylko pliki audio
                 if (extensionMapping.hasOwnProperty(fileExtention) &&
                        (extensionMapping[fileExtention] == "Text")) {
                        fileList.push(inputControl.files[i]);
                    } else {
                        refusedTxtFileList.push(inputControl.files[i]);
                    }
            }
		}

        

        // if(refusedTxtFileList.length > 0){
        //     this.props.onSetRefusionTxtFiles(refusedTxtFileList);
		// 	this.props.onOpenModalHandler();
		// 	//console.log(refusedAudioFileList)
		// }

		if (refusedTxtFileList.length > 0) {
            this.props.onSetRefusionTxtFiles(refusedTxtFileList);
            this.setState({
                modal: true,
            });
        }
		

		Array.from(fileList).forEach(file => {

			let newFile = Object.assign({}, file);
			
            //musze sprawdzic czy plik pochodzi z repo czy z local
			// bo jest inna struktura danych
			
            //z repo
            if(file["fileURL"] != undefined){
                newFile.file = {
                    "name": getFilenameFromURL(file.fileURL),
                    "size": file.fileSize,
                    "fileId": file.fileId,
                };
                newFile.from = "repo";
                newFile.loadedperc = 100;
                newFile.url = file.fileURL;
                newFile.status = "loaded";
            //z local
            } else {
                newFile.file = file;
                newFile.status = 'toload';
                newFile.loadedperc = 0;
                newFile.from = 'local';
            }

            newFile.id = uuid.v4();
            extTxtFiles.push(newFile);
        });


		//console.log("extTxtFiles")
		//console.log(extTxtFiles)

		this.props.onTxtDrop(extTxtFiles);
	} */

	
	/*
	whenTxtFilesChose = (e) => {
		const inputControl = e.currentTarget;

		let extTxtFiles = [];

		let fileList = [];
        let refusedTxtFileList = [];

        for(var i=0;i<inputControl.files.length;i++){
            let file = inputControl.files[i];
            let fileExtention = getExt(file.name)[0];
            //rozpoznaje tylko pliki audio
            if(fileExtention === "txt"){
                fileList.push(file);
            } else {
				refusedTxtFileList.push(file);
            }  
        } 

        if(refusedTxtFileList.length > 0){
            this.props.onSetRefusionTxtFiles(refusedTxtFileList);
			this.props.onOpenModalHandler();
			//console.log(refusedAudioFileList)
        }

		Array.from(fileList).forEach(file => {
			let newFile = Object.assign({}, file);
			newFile.file = file;
			newFile.status = 'toload';
			newFile.loadedperc = 0;
			newFile.id = uuid.v4();
			extTxtFiles.push(newFile);
		});

		//console.log("extTxtFiles")
		//console.log(extTxtFiles)

		this.props.onTxtDrop(extTxtFiles);
	}

	*/


/* 	//otwiera okno modalne
    openModalHandler = () => {
        this.props.onOpenModalHandler();
    }

    //zamyka okno modalne
    closeModalHandler = () => {
		//this.props.onCloseModalHandler();
		this.setState({
            modal: false,
        })
    }
 */

	//opens given container in preview window
	openContainerInPreview = (container) => {
		//console.log(e)
		this.props.openContainerInAlignPreview(container);
	}

	makeEditorFullWidth = () => {
        if(this.state.editorFullWidth == false){
            this.setState({editorFullWidth: true});
        } else {
            this.setState({editorFullWidth: false});
        }
	}

	runSEGinBatch = () => {
		for(let i = 0; i < this.props.containersForSEG.length; i++){
			let container = this.props.containersForSEG[i];
			if(container.ifSEG == false){
				this.runSpeechSegmentation(container, "SEG", this.props.token); 
			}
		}
	}
	
	runSpeechSegmentation = (container, toolType, token) => {
		this.props.setContainerStatus(container._id, toolType, 'progress');
		this.props.runSpeechSegmentation(container, toolType, token); 
	}

	loadNextElement = () => {
        //przegladam liste dodanych do rozpoznawania i ładuje kolejny o ile nie jest to ostatni
        let foundIdx = 0;
        for(let i=0;i<this.props.containersForSEG.length;i++){
            
            let current = this.props.containersForSEG[i];
           // console.log(current)
            //sprawdzam ktory obecnie jest edytowany
            if(current._id == this.props.containerForPreview._id){
                foundIdx = i;
            }
        }

       // console.log(foundIdx)

        if(foundIdx < this.props.containersForSEG.length-1){
            this.openContainerInPreview(this.props.containersForSEG[foundIdx+1]);
        } 

	}

	removeToolItem = (container) => {
        this.props.onRemoveSegmentationItem(container);
    }
	
	

	render() {

		let szer1col = "6 order-1";
        let szer2col = "6 order-2";

        if(this.state.editorFullWidth == true) {
            szer1col = "12 order-2";
            szer2col = "12 order-1";
        } else {
            szer1col = "6 order-1";
            szer2col = "6 order-2";
        }

/* 		
		let entrylist = (
			<h4 style={{ marginTop: '10px' }}>Wgraj pliki audio oraz txt do segmentacji</h4>
		)


		if (this.props.segmentEntry.length > 0) {

			entrylist = this.props.segmentEntry.map((entry, i) =>
				<SegmentItem key={entry.id} entryId={entry.id} status={entry.status} />
			)
		}

		let refusedAudioFileNames = null;
		refusedAudioFileNames = this.props.refusedAudioFileList.map((file,i)=>{
			return <div key={i}>{file.name}</div>
		})

		let refusedTxtFileNames = null;
		refusedTxtFileNames = this.props.refusedTxtFileList.map((file,i)=>{
			return <div key={i}>{file.name}</div>
		})

		let modalContent = null;

		if(this.props.ifRefusedAudio)
		{
			modalContent = (
				<div className="alert alert-warning" role="alert">
					<p>Ponizsze pliki nie sa plikami audio. 
						<br></br>Nie zostana one dodane do kolejki segmentacji
					</p>
					{refusedAudioFileNames }
				</div>
			)
		} else {
			modalContent = (
				<div className="alert alert-warning" role="alert">
					<p>Ponizsze pliki nie sa plikami txt. 
						<br></br>Nie zostana one dodane do kolejki segmentacji
					</p>
					{refusedTxtFileNames }
				</div>
			)
		}
 */

		let alignIcon = <FontAwesomeIcon icon={faClock} /> ;


		let filelist = this.props.containersForSEG.map((container, i)=> {

			return (
                    <ToolItem 
                        key={"key" + i} 
						container={container}
						type="SEG"
						status={container.statusSEG}
						openPreview = {this.openContainerInPreview}
						runTool={(container, toolType, token) => this.runSpeechSegmentation(container, toolType, token)}
						onRemoveItem={this.removeToolItem}
                    />

					

					
			)
			
			// (<SegmentItem 
			// 	key={container._id} 
			// 	entryId={container._id} 
			// 	audioFileName={container.containerName}
			// 	txtFileId={container.txtFileId}
			// 	status={container.statusSEG} 
			// 	/>;)
		})




		return (
			<Aux>

				{/* <Modal
                    show={this.state.modal}
                    modalClosed={this.closeModalHandler}
                    >

                        {modalContent}
                    
                    <button type="button" 
                        className="btn btn-outline-secondary"
                        onClick={this.closeModalHandler}>OK</button>
                </Modal> */}


				<LeftSiteBar
					czyTopPart="true"
					desc={(<div>
                        <div>Przydatne skróty klawiaturowe: </div>
                        <div> <b>[Alt+l]</b> - play/pausa </div>
                        <div> <b>[Alt+k]</b> - powtórz 3 sek.</div>
                        <div> <b>[Alt+j]</b> - powtórz 5 sek.</div>
                        <div> <b>[Alt+i]</b> - przyśpiesz.</div>
                        <div> <b>[Alt+o]</b> - zwolnij.</div>
                        <div> <b>[Alt+n]</b> - załaduj kolejny plik.</div>
                        </div>)
                    } >
						 <ButtonLeftBar 
							napis="Uruchom segmentacje dla wszystkich"
							icon={alignIcon}
							customeStyle={null}
							disabled={false}
							whenClicked={this.runSEGinBatch}/>
				</LeftSiteBar>

				<SettingBar />

				<section className="Content" data-scrollbar>

					<div className={["container-fluid", "SegmentTool"].join(' ')}>
						<div className="tool-desc">

							<h2>Segmentacja plików audio</h2>
							<p>Dopasowanie czasowe tekstu do nagrania. Podział nagrania na segmenty (wyrazy i fonemy).</p>
							{
								//<div className="alert alert-info" role="alert">
								//	<p>W przypadku wgrania większej ilości plików, pliki audio należy dopasować z plikami tekstowymi</p>
								//	<p>Narzędzie umożliwia wgranie wielu plików jednocześnie i uruchomienie usługi na wszystkich jednocześnie. W trakcie wykonywania usługi nie należy odświeżać strony.</p>
								//</div>
							}
							

					
						</div>

						<div className="tool-body">

							<div className="row">
                                <div className={"col-md-"+szer1col}>
                                    {
										//<h3>Lista plików do przetworzenia</h3>
									}
                                    <div className="file-list">
                                        {filelist}
                                    </div>
                                </div>

                                <div className={"col-md-"+szer2col}>

									{
										this.props.containerForPreview != "" ? <AudioEditor
										containerForPreview={this.props.containerForPreview}
										editorFullWidth = {this.makeEditorFullWidth}
										onLoadNextElement = {this.loadNextElement}
										toolType="SEG" /> : null
									}


                                </div>
                            </div>


							{/* 
							<div className="row">
								<div className="col-md">

									<DragAndDrop whenDropped={this.handleDropAudio}>
										<DropFilesArea
											whenFilesChose={this.handleDropAudio}
											mainTitle="Przeciągnij pliki audio z Repozytorium"
											multipleFiles = {true}
											allowUploadLocalFiles = {false}
											desc=""
										/>
									</DragAndDrop> 


								</div>
								<div className="col-md">
									 <DragAndDrop whenDropped={this.handleDropTxt}>
										<DropFilesArea
											whenFilesChose={this.handleDropTxt}
											mainTitle="Przeciągnij pliki tekstowe z Repozytorium"
											multipleFiles = {true}
											allowUploadLocalFiles = {false}
											desc="" />
									</DragAndDrop> 
								</div>
							</div>
							*/}

							{/* 
							<div className="file-list">
								{entrylist}

								<div className={["row", "pairedItem", "header-pair"].join(' ')}>

									<div className="col-sm-auto pair-order">


									</div>

									<div className="col-sm audio-info">
										<h4></h4>
									</div>
									<div className="col-sm-auto pair-status">

									</div>
									<div className="col-sm txt-info">
										<h4></h4>
									</div>

									<div className="col-sm-auto pair-icons">

									</div>
								</div>

								<div className="row commonParent">
									<div className="segmentEntriesBG">

										{entrylist}

									</div>

									<div className="col">
										<SortableAudioList
											items={this.props.audioList}
											onChange={(items) => {
												//this.setState({ items });
												//this.props.onAudioDrop(items);
												//{console.log(items)}
												this.props.onChangeAudioListOrder(items);
											}} />
									</div>
									<div className="col">
										<SortableTxtList
											items={this.props.txtList}
											onChange={(items) => {
												//this.setState({ items });
												//this.props.onAudioDrop(items);
												//{console.log(items)}
												this.props.onChangeTxtListOrder(items);
											}} />
									</div>

								</div> 



							</div>

							*/}

						</div>

					</div>
					<FooterTool />

				</section>
			</Aux>
		);
	}
}

const mapStateToProps = state => {
	return {

		containersForSEG: state.segR.containersForSEG,

		//containers: state.segR.segmentEntry,

		audioList: state.segR.audioList,
		txtList: state.segR.txtList,
		refusedAudioFileList: state.segR.refusedAudioFileList,
		refusedTxtFileList: state.segR.refusedTxtFileList,
		modalDisplay: state.projectR.modal,
		ifRefusedAudio: state.segR.ifRefusedAudio,


		containerForPreview: state.segR.alignContainerForPreview,

		token: state.homeR.token,
	}
}

const mapDispatchToProps = dispatch => {
	return {

		runSpeechSegmentation: (container, toolType, token) => dispatch(segmentActions.runSpeechSegmentation(container, toolType, token)),

		setContainerStatus:  (containerId, toolType, status) => dispatch(segmentActions.setContainerStatus(containerId, toolType, status)),

		openContainerInAlignPreview: (container) => dispatch(segmentActions.openContainerInAlignPreview(container)),

		onRemoveSegmentationItem: (container) => dispatch(segmentActions.removeSegmentationItem(container)),
		//onAudioDrop: (audioFiles) => dispatch(segmentActions.dropAudioFiles(audioFiles)),
		//onTxtDrop: (txtFiles) => dispatch(segmentActions.dropTxtFiles(txtFiles)),
		//onChangeAudioListOrder: (idsOrder) => dispatch(segmentActions.changeAudioListOrder(idsOrder)),
		//onChangeTxtListOrder: (idsOrder) => dispatch(segmentActions.changeTxtListOrder(idsOrder)),
		//onSetRefusionAudioFiles: (refusedFiles) => dispatch(segmentActions.setRefusedSegmentAudioFiles(refusedFiles)),
		//onSetRefusionTxtFiles: (refusedFiles) => dispatch(segmentActions.setRefusedSegmentTxtFiles(refusedFiles)),
		//onOpenModalHandler: () => dispatch(segmentActions.openModalProject()),
        //onCloseModalHandler: () => dispatch(segmentActions.closeModalProject()),
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(SegmentTool);