import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import './DecoIntro.css';

const decointro = (props) => {

    let myclasses = ["container-fluid", "DecoIntro"];

    let btnclasses = ["btn", "btn-secondary",  "btn-lg btn-block", "introButton"];

    return(
        <Aux>
            <div className="container-fluid">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <button type="button" 
                                    className={btnclasses.join(' ')}>
                                    Narzędzia do rozpoznawania mowy
                            </button>
                            <button type="button" 
                                    className={btnclasses.join(' ')}>
                                    Przetwarzanie dużej ilości plików
                            </button>
                        </div>
                        <div className="col">
                            <button type="button" 
                                    className={btnclasses.join(' ')}>
                                    Bezpieczeństwo danych
                            </button>
                            <button type="button" 
                                    className={btnclasses.join(' ')}>
                                    Łatwość obsługi
                            </button>
                        </div>
                    </div>
                </div> 
            </div>
            <div className={myclasses.join(' ')}>
                <div className="container">
                    
                </div>
            </div>
        </Aux>
    );
}

export default decointro;