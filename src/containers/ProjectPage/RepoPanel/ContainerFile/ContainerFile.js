import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ContainerFile.css';

import {DragPreviewImage, useDrag} from 'react-dnd';
import ItemTypes from '../../ItemDndTypes';

import {ContextMenu, MenuItem, ContextMenuTrigger} from 'react-contextmenu';
import dragImage from '../../../ProjectPage/dragImage';

import { faFileAudio } from '@fortawesome/free-solid-svg-icons';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faSurprise } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';

import {withRouter } from 'react-router-dom';



class ContainerFile extends Component {

    selectContainer = () => {
        this.props.selectContainer(this.props.containerId)
    }

    handleClick = (e, data) => {
        console.log(data.foo);
    }

    componentDidMount = () =>{
       // console.log("ready")
    }

    runRECO = () => {
        this.props.history.push('/projects/' + this.props.projectId +'/recognition/');
        this.props.onAddContainerToReco(this.props.containerId);
    }

    runALIGN = () => {
        this.props.history.push('/projects/' + this.props.projectId +'/segment/');
        this.props.onAddContainerToAlign(this.props.containerId);
    }
       

    render() {

        

        //wyświetlam tylko pierwsze 11 znaków nazwy pliku....
        let contName = this.props.containerName;
        if(contName.length > 11){
            contName = contName.substring(1,11) + "...";
        }

        

        return(
            <div>
              
                <ContextMenuTrigger id="uniqueContainer">

                    <div className={this.props.ifSelected? "ContainerFile selected" : "ContainerFile"} 
                        onClick={this.selectContainer}
                        >

                        <div className="row">
                            <div className="col">
                                <div className="containerName">
                                    <FontAwesomeIcon icon={faFileAudio} className="repoIconMain" /> 
                                    {
                                        contName
                                    }
                                </div>
                                
                            </div>
                            <div className="col">
                                <FontAwesomeIcon icon={faPlay} className={["repoIcon",this.props.ifAudio? "on": ""].join(" ")} onClick={this.runPlay}/> 
                                <FontAwesomeIcon icon={faSurprise} className={["repoIcon",this.props.ifVAD? "on": ""].join(" ")} onClick={this.runVAD}/> 
                                <FontAwesomeIcon icon={faComment} className={["repoIcon",this.props.ifDIA? "on": ""].join(" ")} onClick={this.runDIA}/> 
                                <FontAwesomeIcon icon={faFileAlt} className={["repoIcon",this.props.ifRECO? "on": ""].join(" ")} onClick={this.runRECO}/> 
                                <FontAwesomeIcon icon={faClock} className={["repoIcon",this.props.ifALIGN? "on": ""].join(" ")} onClick={this.runALIGN}/> 
                            </div>
                        </div>
                    </div>
                </ContextMenuTrigger>

                <ContextMenu id="uniqueContainer">
                    <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
                    ContextMenu Item 1
                    </MenuItem>
                    <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
                    ContextMenu Item 2
                    </MenuItem>
                    <MenuItem divider />
                    <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
                    ContextMenu Item 3
                    </MenuItem>
                </ContextMenu>

            </div>

        )
    }
}

export default withRouter(ContainerFile);