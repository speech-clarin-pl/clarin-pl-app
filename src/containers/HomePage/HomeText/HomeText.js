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
                        <h3 id="mowa">Przetwarzanie sygnałów mowy</h3>
                        <p>Serwis udostępnia narzędzia do rozpoznawania oraz segmentacji nagrań zawierających mowę. Robi to w sposób automatyczny, wyręczając użytkownika w dokonywaniu transkrypcji w sposób manualny. Istnieje możliwość przetwarzania wsadowego, wielu plików jednocześnie. </p>

                        <h3 id="pliki">Tworzenie korpusów audio</h3>
                        <p>Swoje zasoby dźwiękowe możesz przechowywać w centralnym repozytorium plików, dostępnym tylko dla Ciebie po zalogowaniu. W każdym momencie możesz usunąć pliki z serwera bądź pobrać je na dysk twardy po przetworzeniu.
                        Portal umożliwia tworzenie korpusów, gotowych do dalszej analizy w środowisku EMU-SDMD do badań naukowych.</p>
                    </dir>
                    <dir className="col" id="bezpieczenstwo">
                        <h3 id="bezpieczenstwo">Bezpieczeństwo danych</h3>
                        <p>Twoje pliki są chronione a dostęp do nich jest możliwy tylko dla zarejestrowanych użytkowników. Dzięki podglądowi plików w repozytorium, istnieje możliwość ich zarządzania oraz usuwania w dowolnym momencie. </p>
                        
                        <h3 id="latwosc">Łatwość obsługi</h3>
                        <p>Serwis został tak zaprojektowany aby w maksymalny sposób ułatwić jego obsługę. Nawigacja w serwisie nie powinna sprawiać żadnego problemu. Interfejs użytkownika przewiduje dostępność wszystkich funkcjonalności w jednym miejscu, bez konieczności nawigowania w strukturze serwisu.</p>
                    </dir>
                </div>
            </div>
        </Aux>
    );
}

export default hometext;