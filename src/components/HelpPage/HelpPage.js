import React from 'react';
import TopBar from '../TopBar/TopBar';
import Aux from '../../hoc/Auxiliary';

const helpPage = (props) => {
    return (
        <Aux>
            <TopBar 
                    version="init" 
                    wide="no" 
                    language="pl" 
                    projectTitle=""
                    changeLn = {props.changeLn}
                    currLn = {props.currLn}
                    />
            <h2>Tutaj będzie strona pomocy</h2>
        </Aux>
        
    );
}

export default helpPage;