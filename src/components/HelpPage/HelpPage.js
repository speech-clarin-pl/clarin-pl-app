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
                
                <p></p>
                <div className="faq">
                    <h5>W jakim celu należy się zarejestrować?</h5>
                    <p>
                        Dzięki rejestracji istnieje możliwość zarządzania swoimi plikami w obrębie tworzonych projektów. Ponadto przydzielana jest prywatna przestrzeń na pliki użytkownika.
                    </p>
                </div>

                <div className="faq">
                    <h5 >Zapomniałem hasło, co robić?</h5>
                    <p>
                        Póki co serwis nie posiada funkcjonalności przypomnienia hasła. Napisz do nas maila (adres w stopce na dole strony) abyśmy mogli zresetować hasło za Ciebie.
                    </p>
                </div>

                <div className="faq">
                    <h5 >Czy moje pliki są bezpieczne?</h5>
                    <p>
                        Pliki są przechowywane w centralnym repozytorium do którego dostęp posiada tylko zarejestrowana osoba. Pliki można ewentualnie usunąć po zapisaniu wyników usług.
                    </p>
                </div>
  
            
            
            </div>

        </Aux>

    );
}

export default helpPage;