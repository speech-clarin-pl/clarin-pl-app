import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import './HomeText.css';
import {injectIntl, FormattedMessage} from 'react-intl';

const hometext = (props) => {

    let myclasses = ["container", "HomeText"];
    return(
        <Aux>
            <div className={myclasses.join(' ')}>
                <div className="row">
                    <dir className="col" >
                        <h3>
                            <FormattedMessage
                                id="HomeText-automaticTranscriptionHeader"
                                description="Automatycza transkrypcja nagrań nagłówek" 
                                defaultMessage="Automatyczne rozpoznawanie mowy"
                            />
                        </h3>
                        <p>
                            <FormattedMessage
                                id="HomeText-automaticTranscriptionBody"
                                description="Automatycza transkrypcja nagrań treść" 
                                defaultMessage=" Serwis udostępnia narzędzia do automatycznej konwersji nagrań zawierających mowę na tekst. Użytkownik posiada możliwość dokonywania ręcznych korekt transkrypcji automatycznych bądź tworzenia transkrypcji zupełnie od początku w sposób zoptymalizowany i bez potrzeby odrywania rąk od klawiatury!"
                            />
                            
                        </p>

                        <h3>
                            <FormattedMessage
                                id="HomeText-InneNarzedziaHeader"
                                description="Inne narzędzia nagłówek" 
                                defaultMessage="Pozostałe usługi mowy"
                            />
                        </h3>
                        <p>
                            <FormattedMessage
                                id="HomeText-InneNarzedziaBody"
                                description="Inne narzędzia treść" 
                                defaultMessage="Poza flagowym systemem automatycznego rozpoznawania mowy, serwis udostępnia usługi automatycznego dopasowania tekstu do audio, oddzielenie fragmentów nagrania zawierających mowę od innych, rozpoznawanie mówców, wykrywanie słów kluczowych czy konwersja zapisu ortograficznego na zapis fonetyczny. Narzędzia te mogą być wykorzystywane osobno bądź jako część większego procesu którego celem jest stworzenie korpusów audio na potrzeby badań naukowych."
                            />
                            
                        </p>

                        <h3>
                            <FormattedMessage
                                id="HomeText-corpusCreationHeader"
                                description="Tworzenie korpusów nagłówek nagłówek" 
                                defaultMessage="Tworzenie korpusów audio"
                            />
                        </h3>
                        <p>
                            <FormattedMessage
                                id="HomeText-corpusCreationBody"
                                description="Tworzenie korpusów nagłówek opis" 
                                defaultMessage="Centralne repozytorium plików umożliwia przechowywanie Twoich danych, dostępnych tylko dla Ciebie po zalogowaniu. 
                                Witryna umożliwia tworzenie korpusów, gotowych do dalszej analizy w środowisku EMU-SDMD do badań naukowych."
                            />
                        </p>
                        <h3>
                            <FormattedMessage
                                id="HomeText-EasyUXHeaderHeader"
                                description="Łatwość obslugi header" 
                                defaultMessage="Łatwość obsługi"
                            />
                        </h3>
                        <p>
                            <FormattedMessage
                                id="HomeText-EasyUXHeaderBody"
                                description="Łatwość obslugi body" 
                                defaultMessage="Serwis został tak zaprojektowany aby w maksymalny sposób ułatwić jego obsługę. Interfejs użytkownika przewiduje dostępność wszystkich funkcjonalności w jednym miejscu, bez konieczności nawigowania w strukturze serwisu."
                            />
                        </p>

                    </dir>
                </div>
            </div>
        </Aux>
    );
}

export default injectIntl(hometext);