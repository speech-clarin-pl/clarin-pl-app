import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary';
import SettingBar from '../SettingBar/SettingBar';
import FooterTool from '../FooterTool/FooterTool';
import './DIATool.css';
import LeftSiteBar from '../LeftSiteBar/LeftSiteBar';
import ButtonLeftBar from '../../../components/UI/ButtonLeftBar/ButtonLeftBar';
import { connect } from 'react-redux';
import { faComment} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ToolItem from '../ToolItem/ToolItem';
import * as diaActions from '../../../store/actions/index';
import {injectIntl, FormattedMessage} from 'react-intl';
import AudioEditor from '../AudioEditor/AudioEditor';
import ReactHtmlParser from "react-html-parser";

class DIATool extends Component {


	state = {
        modal: false,
        editorFullWidth: false,
    }
	

	//opens given container in preview window
    openContainerInPreview = (container) => {
        //console.log(e)
        this.props.openContainerInDIAPreview(container);
	}


	makeEditorFullWidth = () => {
        if(this.state.editorFullWidth === false){
            this.setState({editorFullWidth: true});
        } else {
            this.setState({editorFullWidth: false});
        }
	}

	runDIAinBatch = () => {

		for(let i = 0; i < this.props.containersForDIA.length; i++){
			let container = this.props.containersForDIA[i];
			if(container.ifDIA===false){
				this.runSpeechDiarization(container, "DIA",this.props.token); 
			}
			
		}

		//this.props.runVADInBatch(this.props.VADItems);
	}
	
	runSpeechDiarization = (container, toolType, token) => {
		this.props.setContainerStatus(container._id, toolType, 'progress');
		this.props.runSpeechDiarization(container, token); 
	}

	loadNextElement = () => {
        //przegladam liste dodanych do rozpoznawania i ładuje kolejny o ile nie jest to ostatni
        let foundIdx = 0;
        for(let i=0;i<this.props.containersForDIA.length;i++){
            
            let current = this.props.containersForDIA[i];
            //sprawdzam ktory obecnie jest edytowany
            if(current._id === this.props.containerForPreview._id){
                foundIdx = i;
            }
        }



        if(foundIdx < this.props.containersForDIA.length-1){
            this.openContainerInPreview(this.props.containersForDIA[foundIdx+1]);
        } 

	}
	
	removeToolItem = (container) => {
        this.props.onRemoveElementFromDIAList(container);
    }

	render() {

		let szer1col = "6 order-1";
        let szer2col = "6 order-2";

        if(this.state.editorFullWidth === true) {
            szer1col = "12 order-2";
            szer2col = "12 order-1";
        } else {
            szer1col = "6 order-1";
            szer2col = "6 order-2";
        }

		let diaIcon = <FontAwesomeIcon icon={faComment} /> ;


		let filelist = this.props.containersForDIA.map((container, i)=> {

			return (
				<ToolItem 
                        key={"key" + i} 
                        container={container}
						type="DIA"
						status={container.statusDIA}
						openPreview = {this.openContainerInPreview}
						runTool={(container, toolType, token) => this.runSpeechDiarization(container, toolType, token)}
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
					desc={
						
						ReactHtmlParser(
							this.props.intl.formatMessage(
								{
									id:"DIATool-leftSiteBarDesc",
									description: 'przydatne skróty klawiaturowe', 
									defaultMessage: '<div><div>Przydatne skróty klawiaturowe: </div><div> <b>[Alt+l]</b> - play/pausa </div><div> <b>[Alt+k]</b> - powtórz 3 sek.</div><div> <b>[Alt+j]</b> - powtórz 5 sek.</div><div> <b>[Alt+i]</b> - przyśpiesz.</div><div> <b>[Alt+o]</b> - zwolnij.</div><div> <b>[Alt+n]</b> - załaduj kolejny plik.</div></div>',
								},
							)
						)
                    } >
						 <ButtonLeftBar 
							napis={
								this.props.intl.formatMessage(
									{
										id:"DIATool-runDiaForAll",
										description: 'uruchom dia dla wszystkich', 
										defaultMessage: 'Uruchom diaryzację dla wszystkich',
									},
								)
							}
							icon={diaIcon}
							customeStyle={null}
							disabled={false}
							whenClicked={this.runDIAinBatch}/>
				</LeftSiteBar>

				<SettingBar />

				<section className="Content" data-scrollbar>

					<div className={["container-fluid", "SegmentTool"].join(' ')}>
						<div className="tool-desc">

							<h2>
								<FormattedMessage
									id="DIATool-header"
									description="Nagłówek narzedzia" 
									defaultMessage="Diaryzacja" 
								/>
							</h2>
							<p>
								<FormattedMessage
									id="DIATool-description"
									description="Opis narzedzia dia" 
									defaultMessage="Narzędzie dzieli sygnał na segmenty mówione przez poszczególnych mówców. Mówcy nie są identyfikowani, jedynie numerowani." 
								/>
							</p>
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
										{
                                            filelist.length === 0?
                                            <div className="alert alert-primary" role="alert">
												<FormattedMessage
													id="DIATool-addFromRepoToDIA"
													description="Dodaj pliki z repozytorium do listy diaryzacji" 
													defaultMessage="Dodaj pliki z repozytorium do listy diaryzacji" 
												/>
                                            </div>
                                            :filelist
                                        }
                                    </div>
                                </div>

                                <div className={"col-md-"+szer2col}>

									{
										this.props.containerForPreview !== "" ? <AudioEditor
										containerForPreview={this.props.containerForPreview}
										editorFullWidth = {this.makeEditorFullWidth}
										onLoadNextElement = {this.loadNextElement}
										toolType="DIA" /> : null
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

        containersForDIA: state.diaR.containersForDIA,
		modalDisplay: state.projectR.modal,
		ifRefusedAudio: state.segR.ifRefusedAudio,
		containerForPreview: state.diaR.diaContainerForPreview,

		token: state.homeR.token,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		openContainerInDIAPreview: (container) => dispatch(diaActions.openContainerInDIAPreview(container)),
		//runDIAInBatch: (DIAItems) => dispatch(diaActions.runDIAInBatch(DIAItems)),
		//runSpeechDiarization: (container, toolType, token) => dispatch(diaActions.runSpeechDiarization(container, toolType, token)),
		runSpeechDiarization: (container, token) => dispatch(diaActions.runSpeechDiarization(container, token)),
		setContainerStatus:  (containerId, toolType, status) => dispatch(diaActions.setContainerStatus(containerId, toolType, status)),

		onRemoveElementFromDIAList: (container) => dispatch(diaActions.removeFromDIAList(container)),

		//onOpenModalHandler: () => dispatch(segmentActions.openModalProject()),
       // onCloseModalHandler: () => dispatch(segmentActions.closeModalProject()),
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(DIATool));