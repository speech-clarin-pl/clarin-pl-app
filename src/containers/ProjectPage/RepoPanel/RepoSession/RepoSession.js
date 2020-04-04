import React, {Component} from 'react';
import ContainerFile from '../ContainerFile/ContainerFile';
import './RepoSession.css';

import UploadAudio from '../../../../components/UploadAudio/UploadAudio';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

class RepoSession extends Component {

    state = {
        ifOpened: false,
    }

    clickFolderHandler = () => {
        this.setState({
            ifOpened: this.state.ifOpened? false: true,
        });
    }

    selectTheSession = () => {
        this.props.selectTheContainer(null);
        this.props.selectTheSession(this.props.sessionId);
    }

    selectTheContainer = (containerId) => {
        this.selectTheSession();
         console.log(containerId);
        this.props.selectTheContainer(containerId);
    }


    render() {

        let uploadCard = (
            <div className="uploadCard">
                <UploadAudio />
            </div>
        )

        let containerList = null;

        containerList = this.props.containers.map(container => {
            return   <ContainerFile 
                            containerName = {container.containerName}
                            onAddContainerToReco = {this.props.onAddContainerToReco}
                            key = {container._id}
                            containerId = {container._id}
                            projectId = {this.props.projectId}
                            ifAudio={container.ifAudio}
                            ifDIA = {container.ifDIA}
                            ifVAD = {container.ifVAD}
                            ifREC = {container.ifREC}
                            ifSEG = {container.ifSEG}
                            ifSelected = {container.ifSelected}
                            selectContainer = {this.selectTheContainer}/>
        });



        return (
            <div className="RepoSession">

                <div className={this.props.ifSelected? "sessionFolder selected" : "sessionFolder"} onClick={this.selectTheSession} >

                    <FontAwesomeIcon icon={this.state.ifOpened? faChevronDown: faChevronRight} className="repoIcon" style={{fontSize: '0.7em'}} onClick={this.clickFolderHandler}/>
                    <FontAwesomeIcon icon={this.state.ifOpened? faFolderOpen: faFolder} className="repoIcon" onClick={this.clickFolderHandler}/> 
                    <span className="sessionName" >{this.props.sessionName}</span>

                    {this.props.ifSelected?
                        <FontAwesomeIcon icon={faChevronDown} className="repoIcon" style={{fontSize: '0.7em', float: 'right', margin: '6px'}} onClick={this.clickFolderHandler}/> 
                        :
                        null
                    }
                    

                </div>

                <div className="containerList">
                    {this.state.ifOpened? uploadCard: null}
                    {this.state.ifOpened? containerList: null}
                </div>
                
             </div>
        )
    }
}

export default RepoSession;