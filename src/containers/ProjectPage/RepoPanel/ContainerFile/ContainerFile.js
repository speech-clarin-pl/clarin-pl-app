import React, {Component} from 'react';

import './ContainerFile.css';

import {DragPreviewImage, useDrag} from 'react-dnd';
import ItemTypes from '../../ItemDndTypes';

import {ContextMenu, MenuItem, ContextMenuTrigger} from 'react-contextmenu';
import dragImage from '../../../ProjectPage/dragImage';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAudio } from '@fortawesome/free-solid-svg-icons';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faSurprise } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from '@material-ui/core';

import {withRouter } from 'react-router-dom';



class ContainerFile extends Component {

    selectContainer = () => {
        this.props.selectContainer(this.props.container._id)
    }

    handleClick = (e, data) => {
        console.log(data.foo);
    }

    componentDidMount = () =>{
       // console.log("ready")
    }

    runVAD = (e) => {
        e.preventDefault();
        this.props.history.push('/projects/' + this.props.container.project +'/vad/');
        this.props.onAddContainerToVAD(this.props.container);
    }


    runDIA = (e) => {
        e.preventDefault();
        this.props.history.push('/projects/' + this.props.container.project +'/dia/');
        this.props.onAddContainerToDIA(this.props.container);
    }

    runRECO = (e) => {
        e.preventDefault();
        this.props.history.push('/projects/' + this.props.container.project +'/recognition/');
        this.props.onAddContainerToReco(this.props.container);
    }

    runALIGN = (e) => {
        e.preventDefault();
        this.props.history.push('/projects/' + this.props.container.project +'/segment/');
        this.props.onAddContainerToAlign(this.props.container);
    }
       

    render() {

        

        //wyświetlam tylko pierwsze 11 znaków nazwy pliku....
        let contName = this.props.container.containerName;
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
                                
                                {
                                    /*
                                    <Tooltip title="Posłuchaj">
                                    <a href="#" role="button" onClick={this.runPlay} >
                                        <FontAwesomeIcon icon={faPlay} className={["repoIcon",this.props.ifAudio? "on": ""].join(" ")} /> 
                                    </a>
                                </Tooltip>
                                    */
                                }
                               

                                <Tooltip title="Detekcja mowy (VAD)">
                                    <a href="#" role="button"  onClick={this.runVAD} >
                                        <FontAwesomeIcon icon={faSurprise} className={["repoIcon",this.props.container.ifVAD? "on": ""].join(" ")}/> 
                                    </a>
                                </Tooltip>

                                <Tooltip title="Diaryzacja (DIA)">
                                    <a href="#" role="button" onClick={this.runDIA} >
                                        <FontAwesomeIcon icon={faComment} className={["repoIcon",this.props.container.ifDIA? "on": ""].join(" ")}/> 
                                    </a>
                                </Tooltip>

                                <Tooltip title="Rozpoznawanie mowy (REC)">
                                    <a href="#" role="button" onClick={this.runRECO} >
                                        <FontAwesomeIcon icon={faFileAlt} className={["repoIcon",this.props.container.ifREC? "on": ""].join(" ")}/> 
                                    </a>
                                </Tooltip>

                                <Tooltip title="Segmentacja (SEG)">
                                    <a href="#" role="button"  onClick={this.runALIGN}>
                                        <FontAwesomeIcon icon={faClock} className={["repoIcon",this.props.container.ifSEG? "on": ""].join(" ")}/> 
                                    </a>
                                </Tooltip>
                               
                            </div>
                        </div>
                    </div>
                </ContextMenuTrigger>

                <ContextMenu id="uniqueContainer">
                    <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
                         Usuń element z repozytorium
                    </MenuItem>
                    <MenuItem divider />
                    <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
                         Pobierz plik audio
                    </MenuItem>
                    <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
                         Pobierz plik detekcji mowy w formacie CTM
                    </MenuItem>
                    <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
                         Pobierz plik detekcji mowy w formacie TextGrid
                    </MenuItem>
                    <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
                         Pobierz plik diaryzacji w formacie CTM
                    </MenuItem>
                    <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
                         Pobierz plik diaryzacji mowy w formacie TextGrid
                    </MenuItem>
                    <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
                         Pobierz transkrypcje w formacie txt
                    </MenuItem>
                    <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
                          Pobierz transkrypcje w formacie json
                    </MenuItem>
                    <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
                         Pobierz segmentacje w formacie ctm
                    </MenuItem>
                    <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
                        Pobierz segmentacje w formacie json
                    </MenuItem>
                    <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
                         Pobierz segmentacje w formacie ctm
                    </MenuItem>
                    <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
                        Pobierz segmentacje w formacie ctm
                    </MenuItem>
                    <MenuItem divider />
                    <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
                        Wyczyść Detekcje mowy
                    </MenuItem>
                    <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
                        Wyczyść Diaryzację
                    </MenuItem>
                    <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
                        Wyczyść Trankskrypcje
                    </MenuItem>
                    <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
                        Wyczyść Segmentacje
                    </MenuItem>
                </ContextMenu>

             

            </div>

        )
    }
}

export default withRouter(ContainerFile);