import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import { getExt } from '../../utils/utils';
import { extensionMapping } from '../../utils/fileTypes';
import ReactPlayer from 'react-player'
import Duration from '../../utils/Duration'
import './AudioPlayer.css'


class AudioPlayer extends Component {

    state = {
        url: null,
        pip: false,
        playing: true,
        controls: false,
        light: false,
        volume: 0.8,
        muted: false,
        played: 0,
        loaded: 0,
        duration: 0,
        playbackRate: 1.0,
        loop: false
    }

    load = url => {
        this.setState({
            url: url,
            played: 0,
            loaded: 0,
            pip: false
        })
    }

    handlePlayPause = () => {
        this.setState({ playing: !this.state.playing })
    }

    handleStop = () => {
        this.setState({ url: null,playing: false })
    }

    componentWillUnmount = () => {
        this.setState({ url: null, playing: false })
    }

    handleToggleControls = () => {
        const url = this.state.url
        this.setState({
            controls: !this.state.controls,
            url: null
        }, () => this.load(url))
    }

    handleToggleLight = () => {
        this.setState({ light: !this.state.light })
    }

    handleToggleLoop = () => {
        this.setState({ loop: !this.state.loop })
    }

    handleVolumeChange = e => {
        this.setState({ volume: parseFloat(e.target.value) })
    }

    handleToggleMuted = () => {
        this.setState({ muted: !this.state.muted })
    }

    handleSetPlaybackRate = e => {
        this.setState({ playbackRate: parseFloat(e.target.value) })
    }

    handleTogglePIP = () => {
        this.setState({ pip: !this.state.pip })
    }

    handlePlay = () => {
        console.log('onPlay')
        this.setState({ playing: true })
    }

    handleEnablePIP = () => {
        console.log('onEnablePIP')
        this.setState({ pip: true })
    }

    handleDisablePIP = () => {
        console.log('onDisablePIP')
        this.setState({ pip: false })
    }

    handlePause = () => {
        console.log('onPause')
        this.setState({ playing: false })
    }

    handleSeekMouseDown = e => {
        this.setState({ seeking: true })
    }

    handleSeekChange = e => {
        this.setState({ played: parseFloat(e.target.value) })
    }

    handleSeekMouseUp = e => {
        this.setState({ seeking: false })
        this.player.seekTo(parseFloat(e.target.value))
    }

    handleProgress = state => {
        console.log('onProgress', state)
        // We only want to update time slider if we are not currently seeking
        if (!this.state.seeking) {
            this.setState(state)
        }
    }

    handleEnded = () => {
        console.log('onEnded')
        this.setState({ playing: this.state.loop })
    }

    handleDuration = (duration) => {
        console.log('onDuration', duration)
        this.setState({ duration })
    }


    renderLoadButton = (url, label) => {
        return (
            <button onClick={() => this.load(url)}>
                {label}
            </button>
        )
    }

    ref = player => {
        this.player = player
    }

    loadAudioFile = (audioURL) => {
        this.load(audioURL)
    }

    
    componentDidMount = () => {
        console.log("AUDIO PLAYER")
        this.loadAudioFile(this.props.audioURL)
    }
    



    render() {

        const { url, playing, controls, light, volume, muted, loop, played, loaded, duration, playbackRate, pip } = this.state


        return (
            <Aux>
                <div className='player-wrapper'>
                    <ReactPlayer
                        ref={this.ref}
                        className='react-player'
                        width='100%'
                        height='100%'
                        url={url}
                        pip={pip}
                        playing={playing}
                        controls={controls}
                        light={light}
                        loop={loop}
                        playbackRate={playbackRate}
                        volume={volume}
                        muted={muted}
                        onReady={() => console.log('onReady')}
                        onStart={() => console.log('onStart')}
                        onPlay={this.handlePlay}
                        onEnablePIP={this.handleEnablePIP}
                        onDisablePIP={this.handleDisablePIP}
                        onPause={this.handlePause}
                        onBuffer={() => console.log('onBuffer')}
                        onSeek={e => console.log('onSeek', e)}
                        onEnded={this.handleEnded}
                        onError={e => console.log('onError', e)}
                        onProgress={this.handleProgress}
                        onDuration={this.handleDuration}
                    />
                </div>

                <div className="row" id="audioPlayerControls">
                    <div className="col">
                        <button className="btn btn-primary" onClick={this.handlePlayPause}>{playing ? 'Pause' : 'Play'}</button>
                        <button className="btn btn-info" onClick={this.handleSetPlaybackRate} value={1}>1x</button>
                        <button className="btn btn-info" onClick={this.handleSetPlaybackRate} value={1.5}>1.5x</button>
                        <button className="btn btn-info" onClick={this.handleSetPlaybackRate} value={2}>2x</button>
                    
                        <div className="audioPlayerStats">
                            <div><b>played:</b> {(played*100).toFixed(0)} %</div>
                            <div><b>loaded:</b> {(loaded*100).toFixed(0)} %</div>
                            <div><b>duration:</b> <Duration seconds={duration} /></div>
                            <div><b>elapsed:</b> <Duration seconds={duration * played} /></div>
                            <div><b>remaining:</b> <Duration seconds={duration * (1 - played)} /></div>
                        </div>

                    </div>
                    <div className="col">
                        <div>
                            <input
                                            type='range' min={0} max={1} step='any'
                                            value={played}
                                            onMouseDown={this.handleSeekMouseDown}
                                            onChange={this.handleSeekChange}
                                            onMouseUp={this.handleSeekMouseUp}
                                            className="suwak"
                            />
                        </div>
                        <div>
                            Played: <progress max={1} value={played} className="progressBar" />
                        </div>
                        <div>
                            Loaded: <progress max={1} value={loaded} className="progressBar"/>
                        </div>
                    

                    </div>

                </div>
                
            </Aux>
        )
    }
}

export default AudioPlayer;