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
import { getExt, getFilenameFromURL } from '../../../utils/utils';
import ToolItem from '../ToolItem/ToolItem';
import WaveformData from 'waveform-data';
import TextareaAutosize from 'react-textarea-autosize';

class AudioEditor extends Component {

	
	render() {

	
		return (
			<Aux>
                <div className="AudioEditor">
                    Tutaj będzie audio editor
					{console.log(this.props.containerForPreview)}
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
	}
}

const mapDispatchToProps = dispatch => {
	return {

		//onOpenModalHandler: () => dispatch(segmentActions.openModalProject()),
       // onCloseModalHandler: () => dispatch(segmentActions.closeModalProject()),
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(AudioEditor);