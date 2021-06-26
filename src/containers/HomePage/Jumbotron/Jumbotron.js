import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import './Jumbotron.css';
import {injectIntl, FormattedMessage} from 'react-intl';
//import {FormattedMessage} from 'react-intl';
//import {Link} from 'react-router-dom';

const jumbotron = (props) => {

    let myclasses = ["jumbotron", "CustomJumbo"];

    return(
        <Aux>
            <div className={myclasses.join(' ')}>
                <div className="container">
                    <h1 className="display-4">CLARIN-PL</h1>
                    <p className="lead">
                        <FormattedMessage
                            id="Jumbotron-subTitle1"
                            description="Pierwszy podpis pod logiem clarin" 
                            defaultMessage="Platforma do tworzenia korpusów i analizy sygnałów mowy."
                        />
                    </p>
                    <hr className="my-4" />
                    <p>
                        <FormattedMessage
                            id="Jumbotron-subTitle2"
                            description="Drugi podpis pod logiem clarin" 
                            defaultMessage="Automatyczne rozpoznawanie mowy z plików dźwiękowych, segmentacja, tworzenie korpusów audio."
                        />
                    </p>
                </div>
            </div>
        </Aux>
    );
}

export default injectIntl(jumbotron);