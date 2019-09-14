
import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary';
import './TranscriptionTool.css';
import SettingBar from '../SettingBar/SettingBar';
import FooterTool from '../FooterTool/FooterTool';
import LeftSiteBar from '../LeftSiteBar/LeftSiteBar';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as previewActions from '../../../store/actions/index';
import DragAndDrop from '../../../components/UI/DragAndDrop/DragAndDrop';
import DropFilesArea from '../../../components/UI/DropFilesArea/DropFilesArea';

import MultimediaPreview from '../MultimediaPreview/MultimediaPreview';

let multimediaPlayer = null;

class TranscriptionTool extends Component {

    state = {
        audioFileURL: null,
        txtFileURL: null,
    }

    componentDidMount = () => { 
       
    }

    componentWillUnmount = () => {

    }

    getExt = (path) => {
        return (path.match(/(?:.+..+[^\/]+$)/ig) != null) ? path.split('.').slice(-1)[0] : 'null';
    }

    txtAreaChangedHandler = (e) => {
        // console.log(e.currentTarget.value);
        this.props.onUpdateTxtArea(e.currentTarget.value, null);
    }

    handleDropAudio = (audioFile) => {
        let audioFileURL = audioFile.fileURL;
        console.log(audioFileURL)
        let audioFileId = audioFile.fileId;
        this.setState({
            audioFileURL: audioFileURL
        })
    }

    handleDropTxt = (txtFile) => {
        let txtFileURL = txtFile.fileURL;
        let txtFileId = txtFile.fileId;

        this.setState({
            txtFileURL: txtFileURL
        })
    }

    shouldComponentUpdate(nextProps, nextState){
        //multimediaPlayer = <MultimediaPreview fileToPreview={this.state.audioFileURL}/>;
        return true;
    }


    render() {
        console.log("RENDER TRANSCRIPTION TOOL");
        multimediaPlayer = <MultimediaPreview fileToPreview={this.state.audioFileURL}/>;

        let headerTxtField = (
            <p style={{ fontWeight: 'bold' }}>
                Podgld pliku txt<span style={{ fontSize: 'bigger' }}>
                    {this.props.txtfileName}
                </span>
            </p>
        );

        let headerAudioField = (
            <p style={{ fontWeight: 'bold' }}>
                Podgld pliku audio <span style={{ fontSize: 'bigger' }}>
                    {this.props.audiofileName}
                </span>
            </p>
        );

        return (
            <Aux>

                <LeftSiteBar
                    czyTopPart="true"
                    desc="W tym miejscu istnieje możliwość podglądu wyniku wykonywanych usług oraz odłuchania plików dźwiękowych z repozytorium" />

                <SettingBar />

                <section className="Content" data-scrollbar>

                    <div className={["container-fluid", "TranscriptTool"].join(' ')}>
                        <div className="tool-desc">

                        </div>

                        <div className="tool-body">

                            <DragAndDrop whenDropped={this.handleDropAudio}>

                                {
                                    this.state.audioFileURL != null?
                                    multimediaPlayer
                                    : 
                                   

                                    <DropFilesArea
                                    whenFilesChose={this.handleDropAudio}
                                    mainTitle="Przeciągnij plik audio z Repozytorium"
                                    multipleFiles = {false}
                                    allowUploadLocalFiles = {false}
                                    desc="aby wyświetlić jego podgląd" />
                                }
                                
                            </DragAndDrop>
                            <hr />

                            <DragAndDrop whenDropped={this.handleDropTxt}>

                            {
                                    this.state.txtFileURL != null ?
                                    <div className="form-group">
                                        <textarea
                                            className="form-control"
                                            className="TranskriptInput"
                                            placeholder="Przeciągnij i upuść plik tekstowy"
                                            value={this.props.txtContent}
                                            onChange={this.txtAreaChangedHandler}
                                        >
                                        </textarea>
                                    </div>
                                    :
                                    <DropFilesArea
                                    whenFilesChose={this.handleDropTxt}
                                    mainTitle="Przeciągnij plik txt z Repozytorium"
                                    multipleFiles = {false}
                                    allowUploadLocalFiles = {false}
                                    desc="aby go edytować" />
                            }
                                

                            </DragAndDrop>

                           

                        </div>

                    </div>

                    <FooterTool />


                </section>



            </Aux>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        txtContent: state.previewR.txtContent,
        txtDisplayed: state.previewR.txtDisplayed,
        txtfileName: state.previewR.txtfileName,
        txtFileUrl: state.previewR.txtFileUrl,

        audiofileName: state.previewR.audiofileName,
        audioDisplayed: state.previewR.audioDisplayed,
        audioFileUrl:  state.previewR.audioFileUrl,
        waveSurferInitialized: state.previewR.waveSurferInitialized,
        playing: state.previewR.playing,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUpdateTxtArea: (newValue, fileKey) => dispatch(previewActions.updateTxtPreview(newValue, fileKey)),
        onUpdateAudioArea: (fileKey) => dispatch(previewActions.updateAudioPreview(fileKey)),
        onWeveSurferInitialized: (ifyes) => dispatch(previewActions.weveSurferInitialized(ifyes)),
        onTooglePlaying: () => dispatch(previewActions.togglePlaying()),
        onAudioDisplayed: (ifYes) => dispatch(previewActions.changeAudioDisplayed(ifYes))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TranscriptionTool));