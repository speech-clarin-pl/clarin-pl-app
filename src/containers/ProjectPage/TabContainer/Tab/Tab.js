import React from 'react';
import Aux from '../../../../hoc/Auxiliary';
import './Tab.css';
import { NavLink } from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAudio } from '@fortawesome/free-solid-svg-icons';
import { faCogs } from '@fortawesome/free-solid-svg-icons';
import { faSurprise } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';

const tab = (props) => {

    let klasy = ["nav-link", "clarinNavLink"];

    let icon = null;

    switch(props.iconType){
        case "DASH":
            icon = faCogs;
            break;
        case "VAD":
            icon = faSurprise;
            break;
        case "DIA":
            icon = faComment;
            break;
        case "REC":
            icon = faFileAlt;
            break;
        case "SEG":
            icon = faClock;
            break;
        default:
            icon = faCogs;
    }

    return(
        <Aux>
             <li className="nav-item Tab">
                
                 

                    <NavLink className={klasy.join(' ')} 
                       to={{
                           pathname: props.match.url + '' + props.whereToLink,
                           search: '',
                           activeClassName: 'active' 
                       }}><FontAwesomeIcon icon={icon} className="tabIcon" />  {props.title}</NavLink>

                    
                
            </li>
        </Aux>
    );
}

export default withRouter(tab);