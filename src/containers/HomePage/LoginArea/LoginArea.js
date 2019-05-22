import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import './LoginArea.css';
import {Link} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

const loginArea = (props) => {

    let myclasses = ["container-fluid", "LoginArea"];

    

    return(
        <Aux>
            <div className={myclasses.join(' ')}>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h3>Jeżeli nie posiadasz jeszcze konta</h3>
                           

                            <div className="form-group">
                                <label htmlFor="registerInputEmail">Email address</label>
                                <input type="email" className="form-control" 
                                id="registerInputEmail" 
                                placeholder="Enter email" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="registerInputPassword">Password</label>
                                <input type="password" className="form-control" 
                                id="registerInputPassword" 
                                placeholder="Password" />
                            </div>
                            
                            <button  className="btn btn-primary">
                                <FormattedMessage
                                id="LoginArea.register"
                                defaultMessage="Zarejestruj się"
                                />
                            </button>
                           
                        </div>
                        <div className="col">
                            <h3>Jeżeli posiadasz już konto</h3>
                          
                            <div className="form-group">
                                <label htmlFor="loginInputEmail">Email address</label>
                                <input type="email" className="form-control" 
                                id="loginInputEmail" 
                                placeholder="Enter email" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="loginInputPassword">Password</label>
                                <input type="password" className="form-control" 
                                id="loginInputPassword" 
                                placeholder="Password" />
                            </div>
                        
                            <Link to="/projects">
                                <button className="btn btn-primary">
                                    <FormattedMessage
                                     id="LoginArea.login"
                                     defaultMessage="Zaloguj się"
                                    />

                                </button>
                            </Link>
                            
                        </div>
                    </div>
                </div>
            </div>
        </Aux>
    );
}

export default loginArea;