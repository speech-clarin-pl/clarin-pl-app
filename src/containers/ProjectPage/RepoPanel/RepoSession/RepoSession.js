import React, {Component} from 'react';
import ContainerFile from '../ContainerFile/ContainerFile';
import './RepoSession.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { faFolder } from '@fortawesome/free-solid-svg-icons';

class RepoSession extends Component {

    state = {
        ifOpened: false,
    }

    clickFolderHandler = () => {
        this.setState({
            ifOpened: this.state.ifOpened? false: true,
        });
    }


    render() {

        let containerList = null;

        containerList = this.props.containers.map(session => {
            return   <ContainerFile 
                ifAudio={session.ifAudio}
                ifDIA = {session.ifDIA}
                ifVAD = {session.ifVAD}
                ifREC = {session.ifREC}
                ifSEG = {session.ifSEG}/>
        });



        return (
            <div className="RepoSession">

                <div className="sessionFolder" onClick={this.clickFolderHandler}>
                    
                    <FontAwesomeIcon icon={this.state.ifOpened? faFolderOpen: faFolder} className="repoIcon" /> 
                    <span className="sessionName">Jakaś sesja</span>
                </div>

                <div className="containerList">
                    {this.state.ifOpened? containerList: null}
                </div>
                
             </div>
        )
    }
}

export default RepoSession;