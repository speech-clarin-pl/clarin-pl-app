import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import './TabContainer.css';
import Tab from './Tab/Tab';

const tabContainer = (props) => {



    return(
        <Aux>

            <div className="TabContainer">
                <ul className={["nav nav-tabs", "darkbg"].join(' ')}>
                                    
                </ul>

                {props.children}

            </div>
        </Aux>
    );
}

export default tabContainer;