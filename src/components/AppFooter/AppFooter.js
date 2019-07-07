import React from 'react';
import Aux from '../../hoc/Auxiliary';
import './AppFooter.css';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';

const appfooter = (props) => {

    let myclasses = ["text-muted", "container-fluid", "AppFooter"];
    return (
        <Aux>
            <footer className={myclasses.join(' ')}>
                <div className="container">

                    <div>
                        CLARIN-PL {moment().format('YYYY')}
                    </div>
                    <div className="contactInfo">
                        <div>Main developers: Danijel Korzinek (back-end): danijel@pjwstk.edu.pl, Mariusz Kleć (front-end): mklec@pjwstk.edu.pl </div>
                    </div>
                </div>
            </footer>
        </Aux>
    );
}

export default appfooter;