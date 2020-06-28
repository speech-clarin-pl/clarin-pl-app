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
                            <a href="#mowa" className={btnclasses.join(' ')}>
                                    Wsparcie w transkrypcji kolekcji plików audio
                            </a>
                            <a href="#pliki" className={btnclasses.join(' ')}>
                                    Tworzenie korpusów audio
                            </a>
                        </div>
                        <div className="col">
                            <a href="#bezpieczenstwo" className={btnclasses.join(' ')}>
                                    Bezpieczeństwo danych
                            </a>
                            <a href="#latwosc" className={btnclasses.join(' ')}>
                                    Łatwość obsługi
                            </a>
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