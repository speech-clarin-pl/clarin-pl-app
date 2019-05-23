import React from 'react';
import Aux from '../../../../hoc/Auxiliary';
import './Tab.css';
import { NavLink } from 'react-router-dom';
import {withRouter} from 'react-router-dom';


const tab = (props) => {

    let klasy = ["nav-link", "clarinNavLink"];

 

    return(
        <Aux>
             <li className="nav-item">
                 {
                     /*
                        <a className={klasy.join(' ')} 
                        href="#"
                        onClick = {()=> props.whenClickTab(props.title)}>{props.title}</a>                       
                        */
                 }

                    <NavLink className={klasy.join(' ')} 
                       to={{
                           pathname: props.match.url + '' + props.whereToLink,
                           search: '',
                           activeClassName: 'active' 
                       }}>{props.title}</NavLink>

                    
                
            </li>
        </Aux>
    );
}

export default withRouter(tab);