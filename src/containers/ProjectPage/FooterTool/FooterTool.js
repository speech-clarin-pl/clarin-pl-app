import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import './FooterTool.css';
import moment from 'moment';

const footerTool = (props) => {
    return(
        <Aux>
            <div className="FooterTool">
                
                <div>
                CLARIN-PL {moment().format('YYYY')}
                </div>
                <div className="contactInfo">
                    Main developers: <br></br>
                    Danijel Korzinek: danijel@pjwstk.edu.pl<br></br>
                    Mariusz Kleć: mklec@pjwstk.edu.pl<br></br>
                </div>
                
                
            </div>
        </Aux>
    );
}

export default footerTool;