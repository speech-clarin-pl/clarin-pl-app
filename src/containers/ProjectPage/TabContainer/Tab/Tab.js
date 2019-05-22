import React from 'react';
import Aux from '../../../../hoc/Auxiliary';
import './Tab.css';


const tab = (props) => {

    let ifActive = props.ifActive;

    let klasy = ["nav-link", "clarinNavLink"];

    //jeżeli aktywna zakladka to dodaj klase
    if(props.ifActive){
        klasy.push("active")
    };
    

    return(
        <Aux>
             <li className="nav-item">
                <a className={klasy.join(' ')} 
                    href="#"
                    onClick = {()=> props.whenClickTab(props.title)}>{props.title}</a>
            </li>
        </Aux>
    );
}

export default tab;