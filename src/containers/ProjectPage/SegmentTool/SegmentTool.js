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
import {getExt} from '../../../utils/utils';
import Modal from '../../../components/UI/Modal/Modal';

class SegmentTool extends Component {

	handleDropAudio = (audiofiles) => {

		let extAudioFiles = [];

		let fileList = [];
        let refusedAudioFileList = [];

        for(var i=0;i<audiofiles.length;i++){
            let file = audiofiles[i];
            let fileExtention = getExt(file.name)[0];
            //rozpoznaje tylko pliki audio
            if(fileExtention === "wav" ||
               fileExtention === "WAV" ||
               fileExtention === "mp3" ||
               fileExtention === "au"){
                fileList.push(file);
            } else {
				refusedAudioFileList.push(file);
            }  
        } 

        if(refusedAudioFileList.length > 0){
            this.props.onSetRefusionAudioFiles(refusedAudioFileList);
			this.props.onOpenModalHandler();
			//console.log(refusedAudioFileList)
        }

		Array.from(fileList).forEach(file => {
			let newFile = Object.assign({}, file);
			newFile.file = file;
			newFile.status = 'toload';
			newFile.loadedperc = 0;
			newFile.id = uuid.v4();
			extAudioFiles.push(newFile);
		});

		//console.log("extAudioFiles")
		//console.log(extAudioFiles)

		this.props.onAudioDrop(extAudioFiles);
	}


	whenAudioFilesChose = (e) => {
		const inputControl = e.currentTarget;
		let extAudioFiles = [];

		let fileList = [];
        let refusedAudioFileList = [];

        for(var i=0;i<inputControl.files.length;i++){
            let file = inputControl.files[i];
            let fileExtention = getExt(file.name)[0];
            //rozpoznaje tylko pliki audio
            if(fileExtention === "wav" ||
               fileExtention === "WAV" ||
               fileExtention === "mp3" ||
               fileExtention === "au"){
                fileList.push(file);
            } else {
				refusedAudioFileList.push(file);
            }  
        } 

        if(refusedAudioFileList.length > 0){
            this.props.onSetRefusionAudioFiles(refusedAudioFileList);
			this.props.onOpenModalHandler();
			//console.log(refusedAudioFileList)
        }


		Array.from(fileList).forEach(file => {
			let newFile = Object.assign({}, file);
			newFile.file = file;
			newFile.status = 'toload';
			newFile.loadedperc = 0;
			newFile.id = uuid.v4();
			extAudioFiles.push(newFile);
		});

		this.props.onAudioDrop(extAudioFiles);
	}

	handleDropTxt = (txtfiles) => {
		let extTxtFiles = [];

		let fileList = [];
        let refusedTxtFileList = [];

        for(var i=0;i<txtfiles.length;i++){
            let file = txtfiles[i];
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


	//otwiera okno modalne
    openModalHandler = () => {
        this.props.onOpenModalHandler();
    }

    //zamyka okno modalne
    closeModalHandler = () => {
        this.props.onCloseModalHandler();
    }






	render() {

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


		return (
			<Aux>

				{

					/*
					<LeftSiteBar czyTopPart="true" desc="Tutaj opis do segmentacji" >
				
								<ButtonLeftBar napis="Rozpocznij segmentacje" iconType="fa-cogs" whenClicked={null} />
								<ButtonLeftBar napis="Zapisz wynik na Twoim dysku" disabled={true} iconType="fa-download" whenClicked={null}/>
								<ButtonLeftBar napis="Zapisz wynik w repozytorium" disabled={true} iconType="fa-cloud-download-alt" whenClicked={null}/>
				
							</LeftSiteBar>
					*/
				}

				<Modal
                    show={this.props.modalDisplay}
                    modalClosed={this.closeModalHandler}
                    >


                        {modalContent}
                    
         
                    
                    <button type="button" 
                        className="btn btn-outline-secondary"
                        onClick={this.closeModalHandler}>OK</button>
                </Modal>


				<LeftSiteBar
					czyTopPart="true"
					desc="Dopasowanie czasowe tekstu do nagrania. Podział nagrania na segmenty (wyrazy i fonemy).
					" />

				<SettingBar />

				<section className="Content" data-scrollbar>

					<div className={["container-fluid", "SegmentTool"].join(' ')}>
						<div className="tool-desc">

							<p>Narzędzie to jest dostosowane do przetwarzania stosunkowo krótkich nagrań (poniżej minuty). Dłuższe nagrania mogą spowodować powstanie błędu.</p>
							<p>Pliki audio przekazywane do tej usługi muszą być w odpowiednim formacie (WAV, 16kHz, mono, 16-bit). Jeśli plik nie jest w odpowiednim formacie, można skorzystać z usługi normalizacji audio do odpowiedniego przekonwertowania pliku znajdujące się na  <a href="http://mowa.clarin-pl.eu/tools/ui/audio/normalize" target="blank">TEJ stronie</a>. 
                        </p>
                        <p>Narzędzie umożliwia wgranie wielu plików jednocześnie i uruchomienie usługi na wszystkich jednocześnie. W trakcie wykonywania usługi nie należy odświeżać strony.</p>
						<p><b>W przypadku wgrania większej ilości plików, pliki audio należy dopasować z plikami tekstowymi</b></p>
					
					
						</div>

						<div className="tool-body">

							<div className="row">
								<div className="col-md">

									<DragAndDrop whenDropped={this.handleDropAudio}>
										<DropFilesArea
											whenFilesChose={this.whenAudioFilesChose}
											mainTitle="Wgraj pliki z audio dysku"
											desc="Pliki zostaną zapisane jedynie tymczasowo na potrzeby przetwarzania. Po tym czasie są one usuwane bezpowrotnie usuwane z serwera"
										/>
									</DragAndDrop>


								</div>
								<div className="col-md">
									<DragAndDrop whenDropped={this.handleDropTxt}>
										<DropFilesArea
											whenFilesChose={this.whenTxtFilesChose}
											mainTitle="Wgraj pliki txt dysku"
											desc="Pliki zostaną zapisane jedynie tymczasowo na potrzeby przetwarzania. Po tym czasie są one usuwane bezpowrotnie usuwane z serwera" />
									</DragAndDrop>
								</div>
							</div>


							<div className="file-list">

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
		segmentEntry: state.segR.segmentEntry,
		audioList: state.segR.audioList,
		txtList: state.segR.txtList,
		refusedAudioFileList: state.segR.refusedAudioFileList,
		refusedTxtFileList: state.segR.refusedTxtFileList,
		modalDisplay: state.projectR.modal,
		ifRefusedAudio: state.segR.ifRefusedAudio,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onAudioDrop: (audioFiles) => dispatch(segmentActions.dropAudioFiles(audioFiles)),
		onTxtDrop: (txtFiles) => dispatch(segmentActions.dropTxtFiles(txtFiles)),
		onChangeAudioListOrder: (idsOrder) => dispatch(segmentActions.changeAudioListOrder(idsOrder)),
		onChangeTxtListOrder: (idsOrder) => dispatch(segmentActions.changeTxtListOrder(idsOrder)),
		onSetRefusionAudioFiles: (refusedFiles) => dispatch(segmentActions.setRefusedSegmentAudioFiles(refusedFiles)),
		onSetRefusionTxtFiles: (refusedFiles) => dispatch(segmentActions.setRefusedSegmentTxtFiles(refusedFiles)),
		onOpenModalHandler: () => dispatch(segmentActions.openModalProject()),
        onCloseModalHandler: () => dispatch(segmentActions.closeModalProject()),
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(SegmentTool);