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
import AudioEditor from '../../ProjectPage/AudioEditor/AudioEditor';

class VADTool extends Component {

	state = {
        modal: false,
        editorFullWidth: false,
    }

	//opens given container in preview window
    openContainerInPreview = (container) => {
        //console.log(e)
        this.props.openContainerInVADPreview(container);
	}
	
	makeEditorFullWidth = () => {
        if(this.state.editorFullWidth == false){
            this.setState({editorFullWidth: true});
        } else {
            this.setState({editorFullWidth: false});
        }
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
						openPreview = {this.openContainerInPreview}
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
					desc="Detekcja mowy" >
						 <ButtonLeftBar 
							napis="Uruchom detekcje mowy dla wszystkich"
							icon={vadIcon}
							customeStyle={null}
							disabled={false}
							whenClicked={null}/>
				</LeftSiteBar>

				<SettingBar />

				<section className="Content" data-scrollbar>

					<div className={["container-fluid", "SegmentTool"].join(' ')}>
						<div className="tool-desc">

							<h2>Detekcja mowy</h2>
							<div className="alert alert-info" role="alert">
								<p>W przypadku wgrania większej ilości plików, pliki audio należy dopasować z plikami tekstowymi</p>
								<p>Narzędzie umożliwia wgranie wielu plików jednocześnie i uruchomienie usługi na wszystkich jednocześnie. W trakcie wykonywania usługi nie należy odświeżać strony.</p>
							</div>
						</div>

						<div className="tool-body">

							<div className="row">
                                <div className={"col-md-"+szer1col}>
                                    <h3>Lista plików do przetworzenia</h3>
                                    <div className="file-list">
                                        {filelist}
                                    </div>
                                </div>

                                <div className={"col-md-"+szer2col}>
									<AudioEditor
											containerForPreview={this.props.containerForPreview}
											editorFullWidth = {this.makeEditorFullWidth}
											toolType="VAD" />
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

        VADItems: state.vadR.filesToUpload,
		modalDisplay: state.projectR.modal,
		ifRefusedAudio: state.segR.ifRefusedAudio,
		containerForPreview: state.vadR.vadContainerForPreview,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		openContainerInVADPreview: (container) => dispatch(vadActions.openContainerInVADPreview(container)),
		//onOpenModalHandler: () => dispatch(segmentActions.openModalProject()),
       // onCloseModalHandler: () => dispatch(segmentActions.closeModalProject()),
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(VADTool);