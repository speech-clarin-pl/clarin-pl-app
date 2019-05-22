import React from 'react';
import Aux from '../../hoc/Auxiliary';
import './AppFooter.css';
import {FormattedMessage} from 'react-intl';

const appfooter = (props) => {

    let myclasses = ["text-muted", "container-fluid", "AppFooter"];
    return(
        <Aux>
            <footer className={myclasses.join(' ')}>
                <div className="container">
                    <p className="float-right">
                        <a href="#">
                            <FormattedMessage
                                id="AppFooter.gobackup"
                                defaultMessage="Wróć na górę"
                                />
                        </a>
                    </p>
                    <p>CLARIN-PL 2019</p>
                </div>
            </footer>
        </Aux>
    );
}

export default appfooter;