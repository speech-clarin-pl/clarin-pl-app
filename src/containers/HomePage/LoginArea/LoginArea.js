import React, {Component} from 'react';
import Aux from '../../../hoc/Auxiliary';
import './LoginArea.css';
import {Route} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
import * as actionTypes from '../../../store/actions';
import Input from '../../../components/UI/Input/Input';

class LoginArea extends Component {

    state = {
        loginform: {
            loginemail: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Podaj swój email'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5
                },
                valid: false,
                touched: false
            },
            loginpass: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Wpisz hasło'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5
                },
                valid: false,
                touched: false
            },
        },
        registerform: {
            registeremail: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Podaj swój email'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5
                },
                valid: false,
                touched: false
            },
            registerpass: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Wpisz hasło'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5
                },
                valid: false,
                touched: false
            },
        },
        loginFormIsValid:false,
        registerFormIsValid: false,
        
        
    }

    //simple validator....
    checkValidity(value, rules){
        let isValid = true;

       
        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength  && isValid;
        }

        return isValid;

    }

    loginHandler = (event) => {
        event.preventDefault();

        //I am transforming the state to more compact form
        let loginData = {};
        for (let formLoginElement in this.state.loginform) {
            loginData[formLoginElement] = this.state.loginform[formLoginElement].value;
        }

        //console.log(loginData);

        this.props.onLogIn(loginData.loginemail, loginData.loginpass);
    }

    registerHandler = (event) => {

        event.preventDefault();

        //I am transforming the state to more compact form
        let registerData = {};
        for (let formRegisterElement in this.state.registerform) {
            registerData[formRegisterElement] = this.state.registerform[formRegisterElement].value;
        }

        //console.log(registerData);

        this.props.onRegister(registerData.registeremail, registerData.registerpass);


    }


    //updated at every input in register form
    inputRegisterChangedHandler = (event) => {

        const updatedRegisterForm = {
            ...this.state.registerform
        }

        switch(event.target.name){
            case 'registerEmail':
                //immutable update
                const updatedRegisterEmail = {
                    ...updatedRegisterForm.registeremail
                }
                updatedRegisterEmail.value = event.target.value;
                updatedRegisterEmail.valid = this.checkValidity(updatedRegisterEmail.value, updatedRegisterEmail.validation);
                updatedRegisterEmail.touched = true;
                //assembling back after update
                updatedRegisterForm.registeremail = updatedRegisterEmail;

                break;
            case 'registerPass':

                const updatedregisterPass = {
                    ...updatedRegisterForm.registerpass
                }
                updatedregisterPass.value = event.target.value;
                updatedregisterPass.valid = this.checkValidity(updatedregisterPass.value, updatedregisterPass.validation);
                updatedregisterPass.touched = true;
                updatedRegisterForm.registerpass = updatedregisterPass;
                break;
        }

        //sprawdzam czy cały formularz jest poprawny
        let formIsValid = true;
        for (let inputField in updatedRegisterForm){
            formIsValid = updatedRegisterForm[inputField].valid && formIsValid;
        }
    
        this.setState({registerform: updatedRegisterForm, registerFormIsValid: formIsValid});
    }


    //updated at every input in login form
    inputLoginChangedHandler = (event) => {

        const updatedLoginForm = {
            ...this.state.loginform
        }

        switch(event.target.name){
            case 'loginEmail':

               //immutable update
                const updatedLoginEmail = {
                    ...updatedLoginForm.loginemail
                }
                updatedLoginEmail.value = event.target.value;
                updatedLoginEmail.valid = this.checkValidity(updatedLoginEmail.value, updatedLoginEmail.validation);
                updatedLoginEmail.touched = true;
                //assembling back after update
                updatedLoginForm.loginemail = updatedLoginEmail;
                break;
            case 'loginPass':

                const updatedLoginPass = {
                    ...updatedLoginForm.loginpass
                }
                updatedLoginPass.value = event.target.value;
                updatedLoginPass.valid = this.checkValidity(updatedLoginPass.value, updatedLoginPass.validation);
                updatedLoginPass.touched = true;
                //assembling back after update
                updatedLoginForm.loginpass = updatedLoginPass;
                break;
        }

        //sprawdzam czy cały formularz jest poprawny
        let formIsValid = true;
        for (let inputField in updatedLoginForm){
            formIsValid = updatedLoginForm[inputField].valid && formIsValid;
        }


        console.log(formIsValid)

        this.setState({loginform: updatedLoginForm, loginFormIsValid: formIsValid});
    }

    
    render() {



   
        //console.log(this.state.registerform)
       
        let myclasses = ["container-fluid", "LoginArea"];


        let messageForLogin = '';
        if(this.props.isAuth==false){
            messageForLogin = 'Zaloguj się testowo jako admin, admin';
        } else {
            messageForLogin = 'Jesteś zalogowany jako:';
        }

        const registerArea = (
            <div className="col">
                                
                            <h3>Zarejestruj się</h3>
                            <form onSubmit={this.registerHandler}>   
                                <div className="form-group">
                                    <Input 
                                        inputtype="input" 
                                        type="text"
                                        label="Adres Email"
                                        placeholder="Podaj adres email"
                                        name="registerEmail"
                                        touched = {this.state.registerform.registeremail.touched}
                                        invalid={!this.state.registerform.registeremail.valid}
                                        whenchanged={(event) => this.inputRegisterChangedHandler(event)}/>
                                </div>
                                <div className="form-group">
                                    <Input 
                                        inputtype="input" 
                                        type="password"
                                        label="Hasło"
                                        placeholder="Podaj hasło"
                                        name="registerPass"
                                        touched = {this.state.registerform.registerpass.touched}
                                        invalid={!this.state.registerform.registerpass.valid}
                                        whenchanged={(event) => this.inputRegisterChangedHandler(event)}/>
                                </div>
                                
                                <button disabled={!this.state.registerFormIsValid} className="btn btn-primary">
                                    Zarejestruj się
                                </button>
                            </form>
                               
                        </div>
        );

        const loginArea = (
            <div className="col">
                            <h3>{messageForLogin}</h3>

                            {!this.props.isAuth? 

                            <form onSubmit={this.loginHandler}> 
                                <div className="form-group">
                                    <Input 
                                        inputtype="input" 
                                        type="text"
                                        label="Adres Email"
                                        placeholder="Wpisz adres email"
                                        name="loginEmail"
                                        touched = {this.state.loginform.loginemail.touched}
                                        invalid={!this.state.loginform.loginemail.valid}
                                        whenchanged={(event) => this.inputLoginChangedHandler(event)}/>
                                    
                                </div>
                                <div className="form-group">
                                    <Input 
                                        inputtype="input" 
                                        type="password"
                                        label="Hasło"
                                        placeholder="Podaj hasło"
                                        name="loginPass"
                                        touched = {this.state.loginform.loginpass.touched}
                                        invalid={!this.state.loginform.loginpass.valid}
                                        whenchanged={(event) => this.inputLoginChangedHandler(event)}/>
                                </div>
                            
                              
                                    <button disabled={!this.state.loginFormIsValid} className="btn btn-primary" >

                                        Zaloguj się
                                       
                                    </button>
                            </form>   
                            
                            : 
                            <div>
                                <h5>{this.props.loggedEmail}</h5>

                                <button className="btn btn-primary">

                                    Wyloguj się
                                
                                </button>
                            </div>

                            }
                                
                        </div>
        );
     
        return(
            <Aux>

                
                <div className={myclasses.join(' ')}>
                    <div className="container">
                        <div className="row">

                        {this.props.isAuth? loginArea : [registerArea, loginArea]}
                                                
                        </div>
                    </div>
                </div>
            </Aux>
        );
    }
   
}

const mapStateToProps = state => {
    return {
        isAuth: state.homeR.isAuth,
        loggedEmail: state.homeR.email,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogIn: (login, pass) => dispatch({type:actionTypes.LOG_IN, login: login, pass: pass}),
        onRegister: (email, pass) => dispatch({type:actionTypes.REGISTER, email: email, pass: pass}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginArea);