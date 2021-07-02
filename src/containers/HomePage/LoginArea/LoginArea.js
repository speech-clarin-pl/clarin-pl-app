import React, {Component} from 'react';
import Aux from '../../../hoc/Auxiliary';
import './LoginArea.css';
import {withRouter, Link} from 'react-router-dom';
//import {FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
//import * as actionTypes from '../../../store/actions/actionsTypes';
import Input from '../../../components/UI/Input/Input';
import * as authActions from '../../../store/actions/index';
import {loader} from '../../../index';
import {injectIntl, FormattedMessage} from 'react-intl';


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
                    minLength: 7
                },
                valid: false,
                touched: false
            },
        },

        forgotPassForm: {
            forgotPassEmail: {
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
        },


        registerform: {
            registerName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Podaj swoje imie'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 3
                },
                valid: false,
                touched: false
            },
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
                    minLength: 7
                },
                valid: false,
                touched: false
            },
        },

        loginFormIsValid:false,
        forgotPassFormIsValid: false,
        registerFormIsValid: false,
        firstTimeAfterLogin: false,

        showRemindPassView: false,

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

    forgotPassHandler = (event) => {
        event.preventDefault();
       let emailaddr = this.state.forgotPassForm.forgotPassEmail.value;
       this.props.onForgotPass(emailaddr);

    }

    loginHandler = (event) => {
        event.preventDefault();

        //I am transforming the state to more compact form
        let loginData = {};
        for (let formLoginElement in this.state.loginform) {
            loginData[formLoginElement] = this.state.loginform[formLoginElement].value;
        }

        this.props.onLogIn(loginData.loginemail, loginData.loginpass);

        
    }

    registerHandler = (event) => {

        event.preventDefault();

        //I am transforming the state to more compact form
        let registerData = {};
        for (let formRegisterElement in this.state.registerform) {
            registerData[formRegisterElement] = this.state.registerform[formRegisterElement].value;
        }

        this.props.onRegister(registerData.registerName, registerData.registeremail, registerData.registerpass);        
    }


    //updated at every input in register form
    inputRegisterChangedHandler = (event) => {

        const updatedRegisterForm = {
            ...this.state.registerform
        }

        switch(event.target.name){
            case 'registerName':
                //immutable update
                const updatedRegisterName = {
                    ...updatedRegisterForm.registerName
                }
                updatedRegisterName.value = event.target.value;
                updatedRegisterName.valid = this.checkValidity(updatedRegisterName.value, updatedRegisterName.validation);
                updatedRegisterName.touched = 1;
                //assembling back after update
                updatedRegisterForm.registerName = updatedRegisterName;

                break;
            case 'registerEmail':
                //immutable update
                const updatedRegisterEmail = {
                    ...updatedRegisterForm.registeremail
                }
                updatedRegisterEmail.value = event.target.value;
                updatedRegisterEmail.valid = this.checkValidity(updatedRegisterEmail.value, updatedRegisterEmail.validation);
                updatedRegisterEmail.touched = 1;
                //assembling back after update
                updatedRegisterForm.registeremail = updatedRegisterEmail;

                break;
            case 'registerPass':

                const updatedregisterPass = {
                    ...updatedRegisterForm.registerpass
                }
                updatedregisterPass.value = event.target.value;
                updatedregisterPass.valid = this.checkValidity(updatedregisterPass.value, updatedregisterPass.validation);
                updatedregisterPass.touched = 1;
                updatedRegisterForm.registerpass = updatedregisterPass;
                break;
            default: break;
        }

        //sprawdzam czy cały formularz jest poprawny
        let formIsValid = true;
        for (let inputField in updatedRegisterForm){
            formIsValid = updatedRegisterForm[inputField].valid && formIsValid;
        }
    
        this.setState({registerform: updatedRegisterForm, registerFormIsValid: formIsValid});
    }

    //updated at every input in forgotPass form
    inputForgotPassChangedHandler = (event) => {
        const updatedForgotForm = {
            ...this.state.forgotPassForm
        }

        switch(event.target.name){
            case 'forgotPassEmail':

               //immutable update
                const updatedforgotPassEmail = {
                    ...updatedForgotForm.forgotPassEmail
                }
                updatedforgotPassEmail.value = event.target.value;
                updatedforgotPassEmail.valid = this.checkValidity(updatedforgotPassEmail.value, updatedforgotPassEmail.validation);
                updatedforgotPassEmail.touched = 1;
                //assembling back after update
                updatedForgotForm.forgotPassEmail = updatedforgotPassEmail;
                break;
            default: break;
        }

        //sprawdzam czy cały formularz jest poprawny
        let formIsValid = true;
        for (let inputField in updatedForgotForm){
            formIsValid = updatedForgotForm[inputField].valid && formIsValid;
        }

        this.setState({forgotPassForm: updatedForgotForm, forgotPassFormIsValid: formIsValid});


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
                updatedLoginEmail.touched = 1;
                //assembling back after update
                updatedLoginForm.loginemail = updatedLoginEmail;
                break;
            case 'loginPass':

                const updatedLoginPass = {
                    ...updatedLoginForm.loginpass
                }
                updatedLoginPass.value = event.target.value;
                updatedLoginPass.valid = this.checkValidity(updatedLoginPass.value, updatedLoginPass.validation);
                updatedLoginPass.touched = 1;
                //assembling back after update
                updatedLoginForm.loginpass = updatedLoginPass;
                break;
            default:
                console.error("Złe pole logowania")
        }

        //sprawdzam czy cały formularz jest poprawny
        let formIsValid = true;
        for (let inputField in updatedLoginForm){
            formIsValid = updatedLoginForm[inputField].valid && formIsValid;
        }


        this.setState({loginform: updatedLoginForm, loginFormIsValid: formIsValid});
    }


    componentDidUpdate(prevProps, prevState) {

        //sprawdzam czy jestesmy zalogowaniu poraz pierwszy
        //jezeli tak to przechodzimy do listy projektow
        if (this.props.isAuth !== prevProps.isAuth) {
            //this.props.history.push("/projectsList");
        }
      }

      logOutHandler = () => {
        this.props.onLogOut();
        this.props.history.push("/");
      }

      showLoginAreaBack = (e) => {
        e.preventDefault();
         
        this.setState({showRemindPassView: false});
      }

      forgotPass = (e) => {
          e.preventDefault();
         
          this.setState({showRemindPassView: true});
      }

      

    
    render() {
       
        let myclasses = ["container-fluid", "LoginArea"];

        // ######### formatowanie informacji po zalogowaniu się ########
        //let messageForLogin = this.props.isAuth===false?'Zaloguj się':'Jesteś zalogowany jako:';
        

        const registerArea = (
            <div className="col" key="a1">
                            
                            <h3>
                                <FormattedMessage
                                    id="LoginAreaRegisterHeader"
                                    description="Napisz w nagłówku rejestracji" 
                                    defaultMessage="Rejestracja" 
                                />
                            </h3>
                           
                           
                             
                            <form onSubmit={this.registerHandler}>  
                                <div className="form-group">
                                    <Input 
                                        inputtype="input" 
                                        type="text"
                                        label={
                                            this.props.intl.formatMessage(
                                                {
                                                  id:"LoginAreaRegisterNameLabel",
                                                  description: 'Label na polu do podania imienia przy rejestracji', 
                                                  defaultMessage: 'imię', 
                                                }
                                              )
                                        }
                                        placeholder={
                                            this.props.intl.formatMessage(
                                                {
                                                  id:"LoginAreaRegisterNamePlaceholder",
                                                  description: 'Placeholder na polu do podania imienia przy rejestracji', 
                                                  defaultMessage: 'Podaj swoje imię', 
                                                }
                                              )
                                        }
                                        name="registerName"
                                        touched = {this.state.registerform.registerName.touched}
                                        invalid={!this.state.registerform.registerName.valid}
                                        whenchanged={(event) => this.inputRegisterChangedHandler(event)}/>
                                </div> 
                                <div className="form-group">
                                    <Input 
                                        inputtype="input" 
                                        type="text"
                                        label={
                                            this.props.intl.formatMessage(
                                                {
                                                  id:"LoginAreaRegisterEmailLabel",
                                                  description: 'Label na polu do podania email przy rejestracji', 
                                                  defaultMessage: 'Email', 
                                                }
                                              )
                                        }
                                        placeholder={
                                            this.props.intl.formatMessage(
                                                {
                                                  id:"LoginAreaRegisterEmailPlaceholder",
                                                  description: 'Placeholder na polu do podania email przy rejestracji', 
                                                  defaultMessage: 'Podaj swój email', 
                                                }
                                              )
                                        }
                                        name="registerEmail"
                                        touched = {this.state.registerform.registeremail.touched}
                                        invalid={!this.state.registerform.registeremail.valid}
                                        whenchanged={(event) => this.inputRegisterChangedHandler(event)}/>
                                </div>
                                <div className="form-group">
                                    <Input 
                                        inputtype="input" 
                                        type="password"
                                        label={
                                            this.props.intl.formatMessage(
                                                {
                                                  id:"LoginAreaRegisterPasswordLabel",
                                                  description: 'Label na polu do podania hasła przy rejestracji', 
                                                  defaultMessage: 'Hasło', 
                                                }
                                              )
                                        }
                                        placeholder={
                                            this.props.intl.formatMessage(
                                                {
                                                  id:"LoginAreaRegisterPasswordPlaceholder",
                                                  description: 'Placeholder na polu do podania hasła przy rejestracji', 
                                                  defaultMessage: 'Podaj hasło', 
                                                }
                                              )
                                        }
                                        name="registerPass"
                                        touched = {this.state.registerform.registerpass.touched}
                                        invalid={!this.state.registerform.registerpass.valid}
                                        whenchanged={(event) => this.inputRegisterChangedHandler(event)}/>
                                </div>
                                
                                <button disabled={!this.state.registerFormIsValid} className="btn btn-primary">
                                    <FormattedMessage
                                        id="LoginAreaRegisterRegisterBtn"
                                        description="Napisz na przycisku rejestracji" 
                                        defaultMessage="Zarejestruj" 
                                    />
                                </button>
                            </form>
                               
             </div>
        );

        const forgotPassArea = (
            <div className="col" key="a5">
                            
                            {
                            !this.props.isAuth?
                            
                            <form onSubmit={this.forgotPassHandler}> 
                              
                                <h3>
                                    <FormattedMessage
                                        id="LoginAreaForgotPassHeader"
                                        description="Napisz w nagłówku przypomnienia hasła" 
                                        defaultMessage="Zresetowanie hasła" 
                                    />
                                </h3>
                                
                                

                                <div className="form-group">
                                    <Input 
                                        inputtype="input" 
                                        type="text"
                                        label="Email"
                                        placeholder="Email"
                                        name="forgotPassEmail"
                                        touched = {this.state.forgotPassForm.forgotPassEmail.touched}
                                        invalid={!this.state.forgotPassForm.forgotPassEmail.valid}
                                        whenchanged={(event) => this.inputForgotPassChangedHandler(event)}/>
                                </div>
    
                                <button disabled={!this.state.forgotPassFormIsValid} className="btn btn-primary" >
                                    <FormattedMessage
                                        id="LoginAreaForgotPassSendBtn"
                                        description="Napisz na przycisku do resetowania hasła" 
                                        defaultMessage="Wyślij email z linkiem do zresetowania hasła" 
                                    />
                                </button>

                                <br></br>
                                <br></br>

                                <button className="buttonaslink" onClick={this.showLoginAreaBack}>
                                    <FormattedMessage
                                        id="LoginAreaLoginBtnv2"
                                        description="Napisz na przycisku do logowania" 
                                        defaultMessage="Zaloguj się" 
                                    />
                                </button>

                             
                            </form>   
                            
                            : 
                            
                            <div>

                                <h4>
                              
                                    <span className="loggedAs">
                                        {
                                            this.props.intl.formatMessage(
                                                    {
                                                        id:"LoginAreaWelcome",
                                                        description: 'Napis pojawiający się po zalogowaniu się witaj', 
                                                        defaultMessage: 'Witaj {imie}', 
                                                    },
                                                    {
                                                        imie: this.props.userName,
                                                    }
                                                )
                                        }
                                    </span>
                                </h4>

                                <Link to="/projectsList">
                                    <button className="btn btn-primary btn-lg btn-block gotoprojects">
                                        <FormattedMessage
                                            id="LoginAreaGoToProjectList"
                                            description="napisz na przycisku do listy projektow" 
                                            defaultMessage="Przejdź do listy swoich projektów" 
                                        />
                                    </button>
                                </Link>

                                <div> lub </div>

                                <button 
                                    className="btn btn-secondary"
                                    onClick={this.logOutHandler}>

                                        <FormattedMessage
                                            id="LoginAreaLogOutBtn"
                                            description="napisz na przycisku do wylogowania sie " 
                                            defaultMessage="Wyloguj się" 
                                        />
                                
                                </button>

                            </div>

                            }
                                
            </div>
        );

        const loginArea = (
            <div className="col" key="a2">
                            
                            {
                            !this.props.isAuth?
                            
                            <form onSubmit={this.loginHandler}> 
                              
                                <h3>
                                    <FormattedMessage
                                            id="LoginAreaLogInHeader"
                                            description="napisz w nagłówku do formularza logowania sie " 
                                            defaultMessage="Zaloguj się" 
                                    />
                                </h3>
                                
                                
                                <div className="form-group">
                                    <Input 
                                        inputtype="input" 
                                        type="text"
                                        label="Email"
                                        placeholder="email"
                                        name="loginEmail"
                                        touched = {this.state.loginform.loginemail.touched}
                                        invalid={!this.state.loginform.loginemail.valid}
                                        whenchanged={(event) => this.inputLoginChangedHandler(event)}/>
                                    
                                </div>
                                <div className="form-group">
                                    <Input 
                                        inputtype="input" 
                                        type="password"
                                        label={
                                            this.props.intl.formatMessage(
                                                {
                                                  id:"LoginAreaLoginPasswordLabel",
                                                  description: 'Label na polu do podania hasła przy logowaniu', 
                                                  defaultMessage: 'Hasło', 
                                                }
                                              )
                                        }
                                        placeholder={
                                            this.props.intl.formatMessage(
                                                {
                                                  id:"LoginAreaLoginPasswordPlaceholder",
                                                  description: 'Placeholder na polu do podania hasła przy logowaniu', 
                                                  defaultMessage: 'Podaj hasło', 
                                                }
                                              )
                                        }
                                        name="loginPass"
                                        touched = {this.state.loginform.loginpass.touched}
                                        invalid={!this.state.loginform.loginpass.valid}
                                        whenchanged={(event) => this.inputLoginChangedHandler(event)}/>
                                </div>
                            
                              
                                    <button disabled={!this.state.loginFormIsValid} className="btn btn-primary" >

                                        <FormattedMessage
                                            id="LoginAreaLoginBtn"
                                            description="napisz na btn do formularza logowania sie " 
                                            defaultMessage="Zaloguj się" 
                                        />
                                       
                                    </button>

                                    <br></br>
                                    <br></br>

                                    <button className="buttonaslink" onClick={this.forgotPass}>
                                            <FormattedMessage
                                                id="LoginAreaLoginForgottPassBtn"
                                                description="napisz na btn do przypomnienia hasła" 
                                                defaultMessage="Zapomniałem hasła" 
                                            />
                                    </button>
                            </form>   
                            
                            : 
                            
                            <div>

                                <h4>
                                     {
                                            this.props.intl.formatMessage(
                                                    {
                                                        id:"LoginAreaWelcomev2",
                                                        description: 'Napis pojawiający się po zalogowaniu się witaj v2', 
                                                        defaultMessage: 'Witaj {imie}', 
                                                    },
                                                    {
                                                        imie: this.props.userName,
                                                    }
                                                )
                                        }
                                </h4>
                                {
                                    /*
                                <p>Jeżeli chcesz skorzystać z usług z lini poleceń, użyj poniższego klucza API (czytaj więcej <a href="/docs/api.html" target="_blank">TUTAJ</a>):</p>
                                <p style={{fontSize:'10px'}}><b>{this.props.userToken}</b></p>
                                <p>Jeżeli chcesz skorzystać z interfejsu graficznego</p>
                                    */
                                }
                                

                                <Link to="/projectsList">
                                    <button className="btn btn-primary btn-lg btn-block gotoprojects">
                                        <FormattedMessage
                                            id="LoginAreaGotoProjectLists"
                                            description="napisz na przycisku do listy peojektow" 
                                            defaultMessage="Przejdź do listy swoich projektów"
                                        />

                                    </button>
                                </Link>

                                {
                                    /*
                                        <button 
                                            className="btn btn-secondary"
                                            onClick={this.logOutHandler}>

                                            Wyloguj się
                                        
                                        </button>
                                    */
                                }

                                

                            </div>

                            }
                                
                        </div>
        );

        let loginAndForgot = null;

        if(this.state.showRemindPassView){

            loginAndForgot = forgotPassArea;
     
        } else {
            loginAndForgot = loginArea;
        }
        
     
        return(
            <Aux>

                {
                    this.props.isLoading ? loader(): null
                }
                <div className={myclasses.join(' ')}>
                    <div className="container">

                        <div className="row">

                            <div className="col">
                                {this.props.isAuth? null : <p style={{textAlign:'center'}}>
                                    
                                        <FormattedMessage
                                            id="LoginAreaInfoaboutToLogin"
                                            description="Słowo wstępu dlaczego trzeba się zarejestrować" 
                                            defaultMessage="Aby skorzystać z usług serwisu należy się zalogować. Zaloguj się lub załóż konto."
                                        />
                                    
                                </p>
                                //  <div className="alert alert-info" role="alert">
                                //      Aby skorzystać z serwisu należy się zarejestrować
                                // </div>
                                }
                                  
                            </div>
                            
                                        
                        </div>
                        
                        <div className="row">
                            
                            {this.props.isAuth? loginArea : 
                                [registerArea, loginAndForgot]}
                                                
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
        userToken: state.homeR.token,
        loggedEmail: state.homeR.email,
        userName: state.homeR.userName,
        registrationMessage: state.homeR.registrationMessage,
        loginMessage: state.homeR.loginMessage,
        resRegistrationStatus: state.homeR.resRegistrationStatus,
        resLoginStatus: state.homeR.resLoginStatus,
        forgotPassEmailSent: state.homeR.forgotPassEmailSent,
        resForgotPassStatus: state.homeR.resForgotPassStatus,
        forgotPassMessage: state.homeR.forgotPassMessage,

        isLoading: state.homeR.isLoading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onForgotPass: (emailaddr) => dispatch(authActions.forgotPass(emailaddr)),
        onLogIn: (email, pass) => dispatch(authActions.loginUser(email, pass)),
        onRegister: (userName, userEmail, userPass) => dispatch(authActions.registerUser(userName, userEmail, userPass)),
        onLogOut: () => dispatch(authActions.logout())
   
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(injectIntl(LoginArea)));