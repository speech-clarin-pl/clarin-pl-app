import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary';
import './TranscriptTool.css';
import SettingBar from '../SettingBar/SettingBar';
import FooterTool from '../FooterTool/FooterTool';
import LeftSiteBar from '../LeftSiteBar/LeftSiteBar';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as previewActions from '../../../store/actions/index';

//sorry for the name of this class - to be changed...
class TranscriptTool extends Component {

    state = {
        debugInfo: '',
    }

    // componentWillMount = () => {

    //     let wavesurfer = WaveSurfer.create({
    //         container: '#waveform',
    //         waveColor: '#6f8796',
    //         progressColor: '#3498db',
    //         responsive: true,
    //         backend: 'MediaElement',
    //         plugins: []
    //     });

    //     this.wavesurfer.on('loading', function (e) {
    //         console.log(e);
    //         //$('#debuginfo').html('Ladowanie pliku: ' + e + ' %');
    //     });


    //     // Time stretcher
    //     wavesurfer.on('ready', function () {
    //         var st = new window.soundtouch.SoundTouch(
    //             wavesurfer.backend.ac.sampleRate
    //         );
    //         var buffer = wavesurfer.backend.buffer;
    //         var channels = buffer.numberOfChannels;
    //         var l = buffer.getChannelData(0);
    //         var r = channels > 1 ? buffer.getChannelData(1) : l;
    //         var length = buffer.length;
    //         var seekingPos = null;
    //         var seekingDiff = 0;

    //         var source = {
    //             extract: function (target, numFrames, position) {
    //                 if (seekingPos != null) {
    //                     seekingDiff = seekingPos - position;
    //                     seekingPos = null;
    //                 }

    //                 position += seekingDiff;

    //                 for (var i = 0; i < numFrames; i++) {
    //                     target[i * 2] = l[i + position];
    //                     target[i * 2 + 1] = r[i + position];
    //                 }

    //                 return Math.min(numFrames, length - position);
    //             }
    //         };

    //         var soundtouchNode;

    //         wavesurfer.on('play', function () {
    //             seekingPos = ~~(wavesurfer.backend.getPlayedPercents() * length);
    //             st.tempo = wavesurfer.getPlaybackRate();

    //             if (st.tempo === 1) {
    //                 wavesurfer.backend.disconnectFilters();
    //             } else {
    //                 if (!soundtouchNode) {
    //                     var filter = new window.soundtouch.SimpleFilter(source, st);
    //                     soundtouchNode = window.soundtouch.getWebAudioNode(
    //                         wavesurfer.backend.ac,
    //                         filter
    //                     );
    //                 }
    //                 wavesurfer.backend.setFilter(soundtouchNode);
    //             }
    //         });

    //         wavesurfer.on('pause', function () {
    //             soundtouchNode && soundtouchNode.disconnect();
    //         });

    //         wavesurfer.on('seek', function () {
    //             seekingPos = ~~(wavesurfer.backend.getPlayedPercents() * length);
    //         });
    //     });

    // }


    getExt = (path) => {
        return (path.match(/(?:.+..+[^\/]+$)/ig) != null) ? path.split('.').slice(-1)[0] : 'null';
    }

    txtAreaChangedHandler = (e) => {
        // console.log(e.currentTarget.value);
        this.props.onUpdateTxtArea(e.currentTarget.value, null);
    }



    render() {

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
                Podgld pliku <span style={{ fontSize: 'bigger' }}>
                    {this.props.txtfileName}
                </span>
            </p>
        );


        return (
            <Aux>

                <LeftSiteBar
                    czyTopPart="true"
                    desc="Tutaj opis do podglądu plików" />

                <SettingBar />

                <section className="Content" data-scrollbar>

                    <div className={["container-fluid", "TranscriptTool"].join(' ')}>
                        <div className="tool-desc">

                            <h4>Podgląd plikow</h4>
                        </div>

                        <div className="tool-body">



                            <div id="debuginfo"></div>
                            <div id="waveform"></div>

                            {

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

    }
}

const mapDispatchToProps = dispatch => {
    return {
        //onHandleCreateFolder: (key,projectId, userId, token) => dispatch(repoActions.handleCreateFolder(key, projectId, userId, token)),
        onUpdateTxtArea: (newValue, fileKey) => dispatch(previewActions.updateTxtPreview(newValue, fileKey)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TranscriptTool));