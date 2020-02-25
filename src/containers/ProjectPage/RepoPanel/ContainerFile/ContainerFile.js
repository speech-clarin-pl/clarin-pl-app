import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ContainerFile.css';

import { faFileAudio } from '@fortawesome/free-solid-svg-icons';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faSurprise } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';

class ContainerFile extends Component {

    render() {
        return(
            <div className="ContainerFile">
                <div className="row">
                    <div className="col">
                        <FontAwesomeIcon icon={faFileAudio} className="repoIconMain" /> 
                        nazwa pliku.mp3
                    </div>
                    <div className="col">
                        <FontAwesomeIcon icon={faPlay} className={["repoIcon",this.props.ifAudio? "on": ""].join(" ")} /> 
                        <FontAwesomeIcon icon={faSurprise} className={["repoIcon",this.props.ifVAD? "on": ""].join(" ")}/> 
                        <FontAwesomeIcon icon={faComment} className={["repoIcon",this.props.ifDIA? "on": ""].join(" ")} /> 
                        <FontAwesomeIcon icon={faFileAlt} className={["repoIcon",this.props.ifRECO? "on": ""].join(" ")} /> 
                        <FontAwesomeIcon icon={faClock} className={["repoIcon",this.props.ifALIGN? "on": ""].join(" ")} /> 
                    </div>
                </div>
            </div>
        )
    }
}

export default ContainerFile;