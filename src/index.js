import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import {IntlProvider, addLocaleData} from 'react-intl';
import en from 'react-intl/locale-data/en';
import pl from 'react-intl/locale-data/pl';

addLocaleData([...en, ...pl]);

//sets locale from the browser
let locale = (navigator.languages && navigator.languages[0])
               || navigator.language
               || navigator.userLanguage
              || 'en-US';

 
//tymczasowo
locale = "pl"

    const app = (
        <BrowserRouter>
            <IntlProvider locale={locale} defaultLocale={locale}>
                    <App /> 
            </IntlProvider>
        </BrowserRouter>
    );

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
