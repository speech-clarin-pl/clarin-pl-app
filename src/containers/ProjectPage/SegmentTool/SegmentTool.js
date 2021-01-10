import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary';
import SettingBar from '../SettingBar/SettingBar';
import FooterTool from '../FooterTool/FooterTool';
import './SegmentTool.css';
import LeftSiteBar from '../LeftSiteBar/LeftSiteBar';
import ButtonLeftBar from '../../../components/UI/ButtonLeftBar/ButtonLeftBar';
import { connect } from 'react-redux';
import * as segmentActions from '../../../store/actions/index';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ToolItem from '../ToolItem/ToolItem';
import AudioEditor from '../AudioEditor/AudioEditor';

class SegmentTool extends Component {


	state = {
        modal: false,
        editorFullWidth: false,
	}

	//opens given container in preview window
	openContainerInPreview = (container) => {
		//console.log(e)
		this.props.openContainerInAlignPreview(container);
	}

	makeEditorFullWidth = () => {
        if(this.state.editorFullWidth === false){
            this.setState({editorFullWidth: true});
        } else {
            this.setState({editorFullWidth: false});
        }
	}

	runSEGinBatch = () => {
		for(let i = 0; i < this.props.containersForSEG.length; i++){
			let container = this.props.containersForSEG[i];
			if(container.ifSEG === false){
				this.runSpeechSegmentation(container, "SEG", this.props.token); 
			}
		}
	}
	
	runSpeechSegmentation = (container, toolType, token) => {
		this.props.setContainerStatus(container._id, toolType, 'progress');
		this.props.runSpeechSegmentation(container, token); 
	}

	loadNextElement = () => {
        //przegladam liste dodanych do rozpoznawania i ładuje kolejny o ile nie jest to ostatni
        let foundIdx = 0;
        for(let i=0;i<this.props.containersForSEG.length;i++){
            
            let current = this.props.containersForSEG[i];
           // console.log(current)
            //sprawdzam ktory obecnie jest edytowany
            if(current._id === this.props.containerForPreview._id){
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

        if(this.state.editorFullWidth === true) {
            szer1col = "12 order-2";
            szer2col = "12 order-1";
        } else {
            szer1col = "6 order-1";
            szer2col = "6 order-2";
        }


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
						errorMessage={container.errorMessage}
                    />
			)
		})




		return (
			<Aux>

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
						
						</div>

						<div className="tool-body">

							<div className="row">
                                <div className={"col-md-"+szer1col}>
                                    <div className="file-list">
                                        {filelist}
                                    </div>
                                </div>

                                <div className={"col-md-"+szer2col}>

									{
										this.props.containerForPreview !== "" ? <AudioEditor
										containerForPreview={this.props.containerForPreview}
										editorFullWidth = {this.makeEditorFullWidth}
										onLoadNextElement = {this.loadNextElement}
										toolType="SEG" /> : null
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

		containersForSEG: state.segR.containersForSEG,
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
		runSpeechSegmentation: (container, token) => dispatch(segmentActions.runSpeechSegmentation(container, token)),
		setContainerStatus:  (containerId, toolType, status) => dispatch(segmentActions.setContainerStatus(containerId, toolType, status)),
		openContainerInAlignPreview: (container) => dispatch(segmentActions.openContainerInAlignPreview(container)),
		onRemoveSegmentationItem: (container) => dispatch(segmentActions.removeSegmentationItem(container)),
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(SegmentTool);