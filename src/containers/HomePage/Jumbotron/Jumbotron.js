import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import './Jumbotron.css';
import {FormattedMessage} from 'react-intl';
import {Link} from 'react-router-dom';

const jumbotron = (props) => {

    let myclasses = ["jumbotron", "CustomJumbo"];

    return(
        <Aux>
            <div className={myclasses.join(' ')}>
                <div className="container">
                    <h1 className="display-4">CLARIN-PL</h1>
                    <p className="lead">
                        <FormattedMessage
                                id="Jumbotron.lead"
                                defaultMessage="Łatwa w użyciu platfroma do analizy sygnału mowy w nagraniach dźwiękowych"
                                />
                    </p>
                    <hr className="my-4" />
                    <p>
                         <FormattedMessage
                                id="Jumbotron.sublead"
                                defaultMessage="Znajdziesz tutaj narzędzia do rozpoznawania mowy, transkrypcji, segmentacji, analizy itp."
                                />
                    </p>
                    <p></p>

                    <Link to="/projects/defaultProject">
                          <button className="btn btn-primary btn-lg btn-block gotoprojects">
                              Rozpocznij korzystac z narzedzi
                           </button>
                    </Link>

                    {
                    /*
                    <a className="btn btn-primary btn-lg" href="#" role="button">
                        
                        <FormattedMessage
                                id="Jumbotron.register"
                                defaultMessage="Zarejestruj się"
                                />

                    </a>
                    */
                    }
                </div>
            </div>
        </Aux>
    );
}

export default jumbotron;