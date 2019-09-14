
import React, { Component } from 'react';
import './MultimediaPreview.css';

import 'video.js/dist/video-js.css';
import videojs from 'video.js';

import WaveSurfer from 'wavesurfer.js';

/*
// the following imports are only needed when you're using 
// the microphone plugin
import 'webrtc-adapter';

import MicrophonePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.microphone.js';
WaveSurfer.microphone = MicrophonePlugin;
*/

// register videojs-wavesurfer plugin with this import
import 'videojs-wavesurfer/dist/css/videojs.wavesurfer.css';
import Wavesurfer from 'videojs-wavesurfer/dist/videojs.wavesurfer.js';

const videoJsOptions = {
    controls: true,
    aspectRatio: "32:9",
    fluid: true,
    responsive: true,
    liveui: true,
    scrubbing: true,
    controlBar: {
        // hide fullscreen control
        fullscreenToggle: false,
        currentTimeDisplay: true,
        timeDivider: true,
        durationDisplay: true,
        remainingTimeDisplay: true,
        volumePanel: true
    },
    plugins: {
        wavesurfer: {
            src: '',
            msDisplayMax: 10,
            debug: false,
            waveColor: '#6f8796',
            progressColor: '#394b55',
            cursorColor: '#394b55',
            hideScrollbar: true,
            audioRate: 1,
            partialRender: true,
            responsive: true,
        }
    }
};

class MultimediaPreview extends Component {

    state ={
        fileToPreviewURL: this.props.fileToPreview,
        blokada: false,
    }

    initializePreview = (fileURL) => {
         // instantiate Video.js
         videoJsOptions.plugins.wavesurfer.src =  fileURL;

         this.player = videojs(this.audioNode, { ...videoJsOptions }, () => {
             // print version information at startup
             var version_info = 'Using video.js ' + videojs.VERSION +
                 ' with videojs-wavesurfer ' + videojs.getPluginVersion('wavesurfer') +
                 ' and wavesurfer.js ' + WaveSurfer.VERSION;
             videojs.log(version_info);
         });

         
 
         this.player.on('waveReady', (event) => {
             console.log('waveform: ready!');
         });
 
         this.player.on('ratechange', (event) => {
             console.log('zmienilem speed!');
          
         });
 
         this.player.on('playbackFinish', (event) => {
             console.log('playback finished.');
         });
 
         // error handling
         this.player.on('error', (element, error) => {
             console.error(error);
         }); 
    }


    componentDidMount() {
        console.log("Component Did Mount")
        this.initializePreview(this.state.fileToPreviewURL);
    }

    // destroy player on unmount
    componentWillUnmount() {
        if (this.player) {
            this.player.wavesurfer().destroy();
            this.player.dispose();
        }
    }

    componentWillReceiveProps(props) {
        
      }

    setFileToPreview = (fileURL) => {
        if (this.player) {

            console.log("laduje nowy plik")
            //this.player.wavesurfer().destroy();
            
            this.player.wavesurfer().load(fileURL);

            
            // update src url

             // restore the audio element
            // this.player.wavesurfer().destroy();
            // ReactDOM.unmountComponentAtNode(container),
            //$('body').prepend('<audio id="myAudio_html5_api" class="vjs-tech" tabindex="-1"></audio>');

            //this.setState({ state: this.state });
           // this.initializePreview(fileURL);


            //player = videojs("myAudio", settings);
           //this.player.wavesurfer().surfer.load(fileURL);
            //this.player.load(fileURL)
        }

      
    }

    render() {

        if (this.player != undefined) {
            this.setFileToPreview (this.state.fileToPreviewURL)
        }
    
        return (
        <div data-vjs-player>
            <audio id="myAudio" ref={node => this.audioNode = node} className="video-js vjs-default-skin"></audio>
        </div>
        );
    }
}

export default MultimediaPreview;