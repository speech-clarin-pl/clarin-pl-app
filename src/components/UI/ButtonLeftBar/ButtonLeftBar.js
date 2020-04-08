import React from 'react';
import './ButtonLeftBar.css';

const buttonLeftBar = (props) => {

   
    const ifdisabled = props.disabled? true:false;
    return (
        <button disabled={ifdisabled} 
            className="btn btn-primary btn-lg btn-block ButtonLeftBar" 
            onClick={props.whenClicked}
            style={props.customeStyle}>
            <span className="icon">
                {props.icon}
            </span>
            {props.napis}
        </button>
    );
}

export default buttonLeftBar;