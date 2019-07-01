import React from 'react';
import TopBar from '../TopBar/TopBar';
import Aux from '../../hoc/Auxiliary';
import './HelpPage.css';

const helpPage = (props) => {
    return (
        <Aux>
            <TopBar
                version="init"
                wide="no"
                language="pl"
                projectTitle=""
                changeLn={props.changeLn}
                currLn={props.currLn}
            />

            <div className="container HelpPage">
                
                <h2>Najczesciej zadawane pytania</h2>
                <p></p>
                <div className="faq">
                    <h5>Jak zalozyc konto</h5>
                    <p>
                        Some quick example text to build on the card title and make up the bulk of the card's content.
                    </p>
                </div>

                <div className="faq">
                    <h5 >Zapomnialem hasla</h5>
                    <p>
                        Some quick example text to build on the card title and make up the bulk of the card's content.
                    </p>
                </div>

                <div className="faq">
                    <h5 > Card title</h5>
                    <p>
                        Some quick example text to build on the card title and make up the bulk of the card's content.
                    </p>
                </div>
  
            
            
            </div>

        </Aux>

    );
}

export default helpPage;