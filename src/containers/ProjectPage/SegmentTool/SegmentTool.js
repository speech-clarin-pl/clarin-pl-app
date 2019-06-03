import React, {Component} from 'react';
import Aux from '../../../hoc/Auxiliary';
import SettingBar from '../SettingBar/SettingBar';
import FooterTool from '../FooterTool/FooterTool';
import './SegmentTool.css';
import SegmentItem from './SegmentItem/SegmentItem';
import LeftSiteBar from '../LeftSiteBar/LeftSiteBar';
import ButtonLeftBar from '../../../components/UI/ButtonLeftBar/ButtonLeftBar';
import DragAndDrop from '../../../components/UI/DragAndDrop/DragAndDrop';
import DropFilesArea from '../../../components/UI/DropFilesArea/DropFilesArea';
import {connect} from 'react-redux';
import uuid  from 'uuid';
import * as actionTypes from '../../../store/actions';
import SortableList from '../../../components/UI/SortableList/SortableList';

class SegmentTool extends Component {

	handleDropAudio = (files) => {
		let extFiles = [];

        Array.from(files).forEach(file => {
            
            let newFile = Object.assign({},file);
            newFile.file = file;
            newFile.status = 'toload';
            newFile.loadedperc = 0;
            newFile.id = uuid.v4();
            extFiles.push(newFile);

		});

		console.log("extFiles")
		console.log(extFiles)
		
	

        this.props.onAudioDrop(extFiles);
	}

	componentDidMount() {
	
	}

	handleDropTxt = (files) => {

	}

	render(){


		let entrylist = (
            <h3>Wgraj pliki audio oraz txt do segmentacji</h3>
		)

		if(this.props.segmentEntry.length > 0 ){
        
            entrylist = this.props.segmentEntry.map((entry,i) =>
				<SegmentItem key={entry.id} audioFileName={entry.file.name} />
             )
        }
		

		return(
			<Aux>
	
				<LeftSiteBar czyTopPart="true" desc="Tutaj opis do segmentacji" >
	
					<ButtonLeftBar napis="Rozpocznij segmentacje" iconType="fa-cogs" whenClicked={null} />
					<ButtonLeftBar napis="Zapisz wynik na Twoim dysku" disabled={true} iconType="fa-download" whenClicked={null}/>
					<ButtonLeftBar napis="Zapisz wynik w repozytorium" disabled={true} iconType="fa-cloud-download-alt" whenClicked={null}/>
	
				</LeftSiteBar>
	
				<SettingBar />
				
				<section className="Content" data-scrollbar>
	
							<div className={["container-fluid", "SegmentTool"].join(' ')}>
								<div className="tool-desc">
									
									<p>Tutaj opis narzędzia. Mauris consequat ipsum fermentum massa finibus condimentum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean maximus tellus consequat, ultrices mi vel, efficitur dui. Quisque at venenatis ante. Nullam luctus dictum odio semper tempus. Proin eu lorem non diam iaculis egestas ac non tortor. Nullam viverra luctus leo in mollis.</p>
								</div>
	
								<div className="tool-body">

								<div className="row">
									<div className="col-md">
	
										<DragAndDrop handleDrop={this.handleDropAudio}>
											<DropFilesArea  
													mainTitle="Wgraj pliki z audio dysku"
													desc="Pliki zostaną zapisane jedynie tymczasowo na potrzeby przetwarzania. Po tym czasie są one usuwane bezpowrotnie usuwane z serwera"
													/>
										</DragAndDrop>
	
	
									</div>
									<div className="col-md">
										<DragAndDrop handleDrop={this.handleDropTxt}>
											<DropFilesArea  
													mainTitle="Wgraj pliki txt dysku"
													desc="Pliki zostaną zapisane jedynie tymczasowo na potrzeby przetwarzania. Po tym czasie są one usuwane bezpowrotnie usuwane z serwera"/>
										</DragAndDrop>
									</div>
								</div>
	
	
								<div className="file-list">
	
									<div className={["row", "pairedItem", "header-pair"].join(' ')}>
	
										<div className="col-sm-auto pair-order">
	
												
										</div>
	
										<div className="col-sm audio-info">
	
											<h3>Lista plików audio</h3>
										</div>
										<div className="col-sm-auto pair-status">
											
										</div>
										<div className="col-sm txt-info">
	
											<h3>Lista plików tekstowych</h3>
										</div>
	
										<div className="col-sm-auto pair-icons">
											
											
										</div>
									</div>

									
									<SortableList
										items={this.props.audioList}
										onChange={(items) => {
											//this.setState({ items });
											//this.props.onAudioDrop(items);
											//{console.log(items)}
											this.props.onChangeAudioListOrder(items);
										}}
									>
									</SortableList>


									{entrylist}
	
								
	
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
		txtList: state.segR.txtList
    }
}

const mapDispatchToProps = dispatch => {
    return {
	   onAudioDrop: (audioFiles) => dispatch({type:actionTypes.DROP_AUDIO_FILES, audioFiles: audioFiles}),
	   onTxtDrop: (txtFiles) => dispatch({type:actionTypes.DROP_TXT_FILES, txtFiles: txtFiles}),
	   onChangeAudioListOrder: (idsOrder) => dispatch({type:actionTypes.CHANGE_AUDIO_LIST_ORDER, audioIdsOrder: idsOrder}),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SegmentTool);