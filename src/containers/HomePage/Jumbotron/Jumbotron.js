import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import './Jumbotron.css';

const jumbotron = (props) => {

    let myclasses = ["jumbotron", "CustomJumbo"];

    return(
        <Aux>
            <div className={myclasses.join(' ')}>
                <div className="container">
                    <h1 className="display-4">CLARIN-PL</h1>
                    <p className="lead">Łatwa w użyciu platfroma do analizy sygnału mowy w nagraniach dźwiękowych</p>
                    <hr className="my-4" />
                    <p>Znajdziesz tutaj narzędzia do rozpoznawania mowy, transkrypcji, segmentacji, analizy itp.</p>
                    <a className="btn btn-primary btn-lg" href="#" role="button">Zarejestruj się</a>
                </div>
            </div>
        </Aux>
    );
}

export default jumbotron;