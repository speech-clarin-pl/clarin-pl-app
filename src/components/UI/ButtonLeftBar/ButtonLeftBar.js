import React from 'react';
import './ButtonLeftBar.css';

const buttonLeftBar = (props) => {

    let iconClasses = ["fas", props.iconType];
    const ifdisabled = props.disabled? true:false;
    return (
        <button disabled={ifdisabled} className="btn btn-primary btn-lg btn-block ButtonLeftBar" onClick={props.whenClicked}>
            <i class={iconClasses.join(' ')}></i>
            {props.napis}
        </button>
    );
}

export default buttonLeftBar;