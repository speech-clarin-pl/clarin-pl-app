import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary';
import SettingBar from '../SettingBar/SettingBar';
import FooterTool from '../FooterTool/FooterTool';
import './VADTool.css';
import LeftSiteBar from '../LeftSiteBar/LeftSiteBar';
import ButtonLeftBar from '../../../components/UI/ButtonLeftBar/ButtonLeftBar';
import DragAndDrop from '../../../components/UI/DragAndDrop/DragAndDrop';
import DropFilesArea from '../../../components/UI/DropFilesArea/DropFilesArea';
import { connect } from 'react-redux';
import uuid from 'uuid';
import * as segmentActions from '../../../store/actions/index';
import Modal from '../../../components/UI/Modal/Modal';
import { extensionMapping } from '../../../utils/fileTypes';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faComment} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getExt, getFilenameFromURL } from '../../../utils/utils';
import ToolItem from '../ToolItem/ToolItem';
import TextareaAutosize from 'react-textarea-autosize';
import { faSurprise } from '@fortawesome/free-solid-svg-icons';
import * as vadActions from '../../../store/actions/index';
import AudioEditor from '../AudioEditor/AudioEditor';

class VADTool extends Component {

	state = {
        modal: false,
        editorFullWidth: false,
    }

	//opens given container in preview window
    openContainerInPreview = (container) => {
		//console.log(e)
		
		//uruchomienie full screen
		//if(this.state.editorFullWidth == false){
       //     this.setState({editorFullWidth: true});
		//} 
		
        this.props.openContainerInVADPreview(container);
	}
	
	makeEditorFullWidth = () => {
        if(this.state.editorFullWidth == false){
            this.setState({editorFullWidth: true});
        } else {
            this.setState({editorFullWidth: false});
        }
	}
	
	runVADinBatch = () => {

		for(let i = 0; i < this.props.VADItems.length; i++){
			let container = this.props.VADItems[i];
			if(container.ifVAD==false){
				this.runSpeechVoiceActivityDetection(container, "VAD", this.props.token); 
			}
			
		}

		//this.props.runVADInBatch(this.props.VADItems);
	}

	runSpeechVoiceActivityDetection = (container, toolType, token) => {
		this.props.setContainerStatus(container._id, toolType, 'progress');
		this.props.runSpeechVoiceActivityDetection(container, toolType, token); 
	}


	loadNextElement = () => {
        //przegladam liste dodanych do rozpoznawania i ładuje kolejny o ile nie jest to ostatni
        let foundIdx = 0;
        for(let i=0;i<this.props.VADItems.length;i++){
            
            let current = this.props.VADItems[i];
           // console.log(current)
            //sprawdzam ktory obecnie jest edytowany
            if(current._id == this.props.containerForPreview._id){
                foundIdx = i;
            }
        }

       // console.log(foundIdx)

        if(foundIdx < this.props.VADItems.length-1){
            this.openContainerInPreview(this.props.VADItems[foundIdx+1]);
        } 

	}
	
	removeToolItem = (container) => {
        this.props.onRemoveElementFromVADList(container);
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

		let vadIcon = <FontAwesomeIcon icon={faSurprise} /> ;


		let filelist = this.props.VADItems.map((container, i)=> {

			return (
                    <ToolItem 
                        key={"key" + i} 
                        container={container}
						type="VAD"
						status={container.statusVAD}
						openPreview = {this.openContainerInPreview}
						runTool={(container, toolType, token) => this.runSpeechVoiceActivityDetection(container, toolType, token)}
						onRemoveItem={this.removeToolItem}
						errorMessage={container.errorMessage}
                    />
			)
			
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
							napis="Uruchom detekcje mowy dla wszystkich"
							icon={vadIcon}
							customeStyle={null}
							disabled={false}
							whenClicked={this.runVADinBatch}/>
				</LeftSiteBar>

				<SettingBar />

				<section className="Content" data-scrollbar>

					<div className={["container-fluid", "SegmentTool"].join(' ')}>
						<div className="tool-desc">

							<h2>Detekcja mowy</h2>
							<p>Narzędzie zaznacza w sygnale segmenty zawierające mowę.</p>
							{
								//<div className="alert alert-info" role="alert">
								//	<p>Narzędzie zaznacza w sygnale segmenty zawierające mowę.</p>
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
										toolType="VAD" /> : null
									}


									
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


        VADItems: state.vadR.containersForVAD,
		modalDisplay: state.projectR.modal,
		ifRefusedAudio: state.segR.ifRefusedAudio,
		containerForPreview: state.vadR.vadContainerForPreview,

		token: state.homeR.token,

	}
}

const mapDispatchToProps = dispatch => {
	return {
		openContainerInVADPreview: (container) => dispatch(vadActions.openContainerInVADPreview(container)),
		//runVADInBatch: (VADItems) => dispatch(vadActions.runVADInBatch(VADItems)),
		runSpeechVoiceActivityDetection: (container, toolType, token) => dispatch(vadActions.runSpeechVoiceActivityDetection(container, toolType, token)),
		setContainerStatus:  (containerId, toolType, status) => dispatch(vadActions.setContainerStatus(containerId, toolType, status)),
		
		onRemoveElementFromVADList: (container) => dispatch(vadActions.removeElementFromVADList(container)),
		//onOpenModalHandler: () => dispatch(segmentActions.openModalProject()),
       // onCloseModalHandler: () => dispatch(segmentActions.closeModalProject()),
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(VADTool);