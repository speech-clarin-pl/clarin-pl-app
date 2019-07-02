import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import './HomeText.css';

const hometext = (props) => {

    let myclasses = ["container", "HomeText"];
    return(
        <Aux>
            <div className={myclasses.join(' ')}>
                <div className="row">
                    <dir className="col" >
                        <h3 id="mowa">Narzędzia do rozpoznawania mowy</h3>
                        <p>Serwis udostępnia narzędzia do rozpoznawania mowy z nagrań dźwiękowych. Robi to w sposób automatyczny, wyręczając użytkownika w dokonywaniu transkrypcji w sposób manualny. </p>

                        <h3 id="pliki">Przetwarzanie dużej ilości plików</h3>
                        <p>W przypadku posiadania w swoich zasobach wielu plików które wymagają analizy, istnieje możliwość  uruchomienia zadania rozpoznawania na wszystkich wgranych plikach jednocześnie.</p>
                    </dir>
                    <dir className="col" id="bezpieczenstwo">
                        <h3 id="bezpieczenstwo">Bezpieczeństwo danych</h3>
                        <p>Twoje pliki są chronione a dostęp do nich jest możliwy tylko dla zarejestrowanych użytkowników. Dzięki podglądowi plików w repozytorium, istnieje możliwość ich zarządzania oraz usuwania po wykonaniu zadania. </p>
                        
                        <h3 id="latwosc">Łatwość obsługi</h3>
                        <p>Serwis został tak zaprojektowany aby w maksymalny sposób ułatwić jego obsługę. Nawigacja w serwisie nie sprawi żadnego problemu. Interfejs użytkownika przewiduje dostępność wszystkich funkcjonalności w jednym miejscu, bez konieczności nawigowania w strukturze serwisu.</p>
                    </dir>
                </div>
            </div>
        </Aux>
    );
}

export default hometext;