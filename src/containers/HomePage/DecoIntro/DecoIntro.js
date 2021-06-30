import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import './DecoIntro.css';

const decointro = (props) => {

    let myclasses = ["container-fluid", "DecoIntro"];


    return(
        <Aux> 
            <div className={myclasses.join(' ')}>
                <div className="container">
                    
                </div>
            </div>
        </Aux>
    );
}

export default decointro;