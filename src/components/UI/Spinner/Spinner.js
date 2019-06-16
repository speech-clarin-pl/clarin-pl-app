import React from 'react';
import './Spinner.css';

const spinner = (props) => {


    return(
        <div className="Spinner">
            <div className="lds-facebook">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default spinner;