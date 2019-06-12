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
import * as segmentActions from '../../../store/actions/index';
import SortableAudioList from './SortableAudioList/SortableAudioList';
import SortableTxtList from './SortableTxtList/SortableTxtList';

class SegmentTool extends Component {

	handleDropAudio = (audiofiles) => {
		
		let extAudioFiles = [];

        Array.from(audiofiles).forEach(file => {
            
            let newFile = Object.assign({},file);
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

	handleDropTxt = (txtfiles) => {
		let extTxtFiles = [];

        Array.from(txtfiles).forEach(file => {
            
            let newFile = Object.assign({},file);
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
	

	render(){


		let entrylist = (
            <h4 style={{marginTop: '10px'}}>Wgraj pliki audio oraz txt do segmentacji</h4>
		)

		if(this.props.segmentEntry.length > 0 ){
        
            entrylist = this.props.segmentEntry.map((entry,i) => 
				<SegmentItem key={entry.id}  />
				
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
		txtList: state.segR.txtList
    }
}

const mapDispatchToProps = dispatch => {
    return {
	   onAudioDrop: (audioFiles) => dispatch(segmentActions.dropAudioFiles(audioFiles)),
	   onTxtDrop: (txtFiles) => dispatch(segmentActions.dropTxtFiles(txtFiles)),
	   onChangeAudioListOrder: (idsOrder) => dispatch(segmentActions.changeAudioListOrder(idsOrder)),
	   onChangeTxtListOrder: (idsOrder) => dispatch(segmentActions.changeTxtListOrder(idsOrder)),

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SegmentTool);