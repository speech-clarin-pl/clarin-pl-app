
import WaveSurfer from 'wavesurfer.js';
import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary';
import './TranscriptTool.css';
import SettingBar from '../SettingBar/SettingBar';
import FooterTool from '../FooterTool/FooterTool';
import LeftSiteBar from '../LeftSiteBar/LeftSiteBar';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as previewActions from '../../../store/actions/index';
//import Wavesurfer from 'react-wavesurfer';

//sorry for the name of this class - to be changed...



class TranscriptTool extends Component {

   
    constructor(props){
        super(props);
     
        let wavesurfer = null;
   
        this.handleTogglePlay = this.handleTogglePlay.bind(this);
        this.handlePosChange = this.handlePosChange.bind(this);
        //this.loadAudioFileForPreview = this.loadAudioFileForPreview.bind(this);
      }

      handleTogglePlay = () => {
        //this.wavesurfer.load('http://localhost:1234/repo/5d0e20536c8ef65ef77e7e65/5d0e206f6c8ef65ef77e7e66/test.wav');
        if(this.props.playing){
            this.wavesurfer.pause();
        } else {
            this.wavesurfer.play();
        }

        this.props.onTooglePlaying();
      }

      handlePosChange = (e) => {
        this.setState({
          pos: e.originalArgs[0]
        });
      }


    componentDidMount = () => {

        this.wavesurfer = WaveSurfer.create({
            container: '#waveform',
            waveColor: '#6f8796',
            progressColor: '#3498db',
            responsive: true,
            //backend: 'MediaElement',
            plugins: []
        });

        this.wavesurfer.on('loading', function (e) {
            console.log(e);
        }.bind(this));


        // Time stretcher
        this.wavesurfer.on('ready', function () {
            this.updateAudioArea();
           // this.props.onUpdateAudioArea(this.props.fileKey)
         }.bind(this));

         this.props.onWeveSurferLoaded(true);
        
    }

    componentWillUnmount = () => {
        this.props.onWeveSurferLoaded(false);
        this.wavesurfer.stop();
        this.wavesurfer = null;
    }

    updateAudioArea = () => {
        this.props.onUpdateAudioArea(this.props.fileKey)
    }

    getExt = (path) => {
        return (path.match(/(?:.+..+[^\/]+$)/ig) != null) ? path.split('.').slice(-1)[0] : 'null';
    }

    txtAreaChangedHandler = (e) => {
        // console.log(e.currentTarget.value);
        this.props.onUpdateTxtArea(e.currentTarget.value, null);
    }

    loadAudioFileForPreview = (audioUrl) => {
        console.log('loadAudioFileForPreview')
        if(this.props.waveSurferLoaded){
            console.log(this.testowy)
            this.wavesurfer.load(audioUrl);
        }
    }
   


    render() {

        //obsluga podgladu pliku txt
        if (this.props.txtfileName !== '') {
            if (this.props.txtDisplayed === false) {
                //console.log('AAAAAA')
                fetch(this.props.txtFileUrl)
                    .then((r) => r.text())
                    .then(text => {
                        console.log(text)
                        //console.log(text);
                        this.props.onUpdateTxtArea(text, this.props.txtfileName)
                    })
            }
        }

        //obsluga podgladu pliku audio
        if (this.props.audiofileName !== '') {
            if (this.props.waveSurferLoaded) {
                if(this.props.audioDisplayed === false){
                    console.log("aaaaaaaa")
                    this.loadAudioFileForPreview(this.props.audioFileUrl);
                }
                
            }
        }

        // //to oznacza ze zakladka jest otworzona gdy 
        // //uzytkownik kliknal w plik w repo
        // if(this.props.location.state){
        //     const urlToFile = this.props.location.state.url;
        //     const fileKey = this.props.location.state.key;
        //     const fileExt = this.getExt(urlToFile);
        //     //console.log(urlToFile)
        //     //console.log(fileExt)

        //     //gdy to jest plik txt
        //     if(fileExt === 'txt'){
        //         //aby wykonalo sie tylko raz
        //         if(this.props.txtDisplayed === false){
        //             fetch(urlToFile)
        //             .then((r) => r.text())
        //             .then(text  => {

        //                 //console.log(text);
        //                 this.props.onUpdateTxtArea(text, fileKey)

        //             })
        //         }
        //     } 
        // }


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

        let controlBtns = (
            <button type="button" onClick={this.handleTogglePlay} className="btn btn-primary" id="play">
                {
                this.props.playing? <i className="fas fa-pause"></i>  : <i className="fas fa-play"></i>
                }
                                
            </button>
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

                            {headerAudioField}
                            <div id="debuginfo"></div>
                            <div id="waveform"></div>

                            {this.props.audioDisplayed? controlBtns: null}
                            

                            {
/*
                                <div class="btn-group" role="group">
                                    <button type="button" className="btn btn-secondary" id="play"><i className="fas fa-play"></i></button>
                                    <button type="button" className="btn btn-secondary" id="stop"><i className="fas fa-stop"></i></button>
                                    <button type="button" className="btn btn-secondary" id="back"><i className="fas fa-step-backward"></i>
                                        <i className="fas fa-stopwatch"></i></button>


                                    <button type="button" className="btn btn-secondary" id="zoom">
                                        <i className="">+</i>
                                        <input type="range" data-action="zoom" min="1" max="200" value="0" className="form-control-range" id="controlZoom" />
                                        <span id="">-</span>
                                    </button>

                                    <button type="button" className="btn btn-secondary" id="loudness">
                                        <i className="fas fa-volume-up"></i>
                                        <input type="range" className="form-control-range" id="controlLoudness" />
                                        <span id="loudness-value">100%</span>
                                    </button>
                                    <button type="button" className="btn btn-secondary" id="speed">
                                        <i className="fas fa-running"></i>
                                        <input type="range" data-action="speed" min="25" max="400" value="100" className="form-control-range" id="controlSpeed" />
                                        <span id="speed-value">100%</span>
                                    </button>

                                </div>
*/

                            }

                            <hr />

                            {
                                /*
                                                     <div className="btn-group" role="group" aria-label="Basic example">
                                                         <button type="button" className="btn btn-secondary" id="hmm">hmm...</button>
                                                         <button type="button" className="btn btn-secondary" id="szum-przerywany">szum przerywany</button>
                                                         <button type="button" className="btn btn-secondary" id="szum-ciagly">szum ciągły</button>
                                                         <button type="button" className="btn btn-secondary" id="back-mowcy">szum mówcy</button>
                                                         <button type="button" className="btn btn-secondary" id="back-mowcy">nierozpoznane słowo</button>
                                                         <button type="button" className="btn btn-secondary" id="back-mowcy">przerwa</button>
                                                         <button type="button" className="btn btn-secondary" id="font-up">
                                                             <i className="fas fa-font" ></i> <i className="fas fa-font"></i>
                                                         </button>
                                                         <button type="button" className="btn btn-secondary" id="font-down">
                                                             <i className="fas fa-font" ></i> <i className="fas fa-font" ></i>
                                                         </button>
                                                     </div>
                             
                                            */
                            }


                            <div className="form-group">

                                {headerTxtField}


                                <textarea
                                    className="form-control"
                                    className="TranskriptInput"
                                    placeholder="Zaznacz plik txt w repozytorium"
                                    value={this.props.txtContent}
                                    onChange={this.txtAreaChangedHandler}
                                >
                                </textarea>

                            </div>

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
        waveSurferLoaded: state.previewR.waveSurferLoaded,
        playing: state.previewR.playing,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        //onHandleCreateFolder: (key,projectId, userId, token) => dispatch(repoActions.handleCreateFolder(key, projectId, userId, token)),
        onUpdateTxtArea: (newValue, fileKey) => dispatch(previewActions.updateTxtPreview(newValue, fileKey)),
        onUpdateAudioArea: (fileKey) => dispatch(previewActions.updateAudioPreview(fileKey)),
        onWeveSurferLoaded: (ifyes) => dispatch(previewActions.weveSurferLoaded(ifyes)),
        onTooglePlaying: () => dispatch(previewActions.togglePlaying()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TranscriptTool));