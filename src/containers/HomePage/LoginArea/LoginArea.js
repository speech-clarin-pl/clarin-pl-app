import React, {Component} from 'react';
import Aux from '../../../hoc/Auxiliary';
import './LoginArea.css';
import {withRouter, Link} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
import * as actionTypes from '../../../store/actions/actionsTypes';
import Input from '../../../components/UI/Input/Input';
import * as authActions from '../../../store/actions/index';
import {createNotification, loader} from '../../../index';


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
                    minLength: 6
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
                    minLength: 6
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
        }

        //sprawdzam czy cały formularz jest poprawny
        let formIsValid = true;
        for (let inputField in updatedLoginForm){
            formIsValid = updatedLoginForm[inputField].valid && formIsValid;
        }


        console.log(formIsValid)

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
        let messageForLogin = '';
        if(this.props.isAuth==false){
            messageForLogin = 'Zaloguj się';
        } else {
            messageForLogin = 'Jesteś zalogowany jako:';
        }


        // ######### formatowanie informacji error Register ########
        let errorRegisterInfo = null;
        if(this.props.resRegistrationStatus === 201 || this.props.resRegistrationStatus === 200){
            errorRegisterInfo = (
                <div className="alert alert-success" role="alert">
                     {this.props.registrationMessage}
                </div>
            )
        } else if(this.props.resRegistrationStatus !== 0){
                 errorRegisterInfo = (
                    <div className="alert alert-warning" role="alert">
                         {this.props.registrationMessage}
                    </div>
                )
        }


        // ######### formatowanie informacji error Login ########
        let errorLoginInfo = null;
        if(this.props.resLoginStatus === 201 || this.props.resLoginStatus === 200){
            errorLoginInfo = (
                <div className="alert alert-success" role="alert">
                     {this.props.loginMessage}
                </div>
            )
        } else if(this.props.resLoginStatus !== 0){

            let message = this.props.loginMessage;

            if(typeof message === 'undefined' || message === null){
                errorLoginInfo = (
                    <div className="alert alert-danger" role="alert">
                         Wystąpił problem z serwerem
                    </div>
                )
            } else {
                errorLoginInfo = (
                    <div className="alert alert-warning" role="alert">
                         {message}
                    </div>
                )
            }
        }


         // ######### formatowanie informacji forgot Pass########
        let errorForgotPassInfo = null;
        /*
        if(this.props.resForgotPassStatus === 201 || this.props.resForgotPassStatus === 200){
            errorForgotPassInfo = (
                <div className="alert alert-success" role="alert">
                     {this.props.forgotPassMessage}
                </div>
            )
        } else if(this.props.resForgotPassStatus !== 0){

            let message = this.props.forgotPassMessage;

            if(typeof message === 'undefined' || message === null){
                errorForgotPassInfo = (
                    <div className="alert alert-danger" role="alert">
                         Wystąpił problem z serwerem
                    </div>
                )
            } else {
                errorForgotPassInfo = (
                    <div className="alert alert-warning" role="alert">
                         {message}
                    </div>
                )
            }
        }
        */

        

        const registerArea = (
            <div className="col" key="a1">
                            
                            <h3>Zarejestruj się</h3>
                           
                            {
                               // this.props.registrationMessage !== ''?
                               // errorRegisterInfo : null
                            }
                             
                            <form onSubmit={this.registerHandler}>  
                                <div className="form-group">
                                    <Input 
                                        inputtype="input" 
                                        type="text"
                                        label="Imie"
                                        placeholder="Podaj swoje imie"
                                        name="registerName"
                                        touched = {this.state.registerform.registerName.touched}
                                        invalid={!this.state.registerform.registerName.valid}
                                        whenchanged={(event) => this.inputRegisterChangedHandler(event)}/>
                                </div> 
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

        const forgotPassArea = (
            <div className="col" key="a5">
                            
                            {
                            !this.props.isAuth?
                            
                            <form onSubmit={this.forgotPassHandler}> 
                              
                                <h3>Przypomnienie hasła</h3>
                                
                                {
                                  //  this.props.forgotPassMessage !== ''?
                                  //  errorForgotPassInfo: null 
                                }

                                <div className="form-group">
                                    <Input 
                                        inputtype="input" 
                                        type="text"
                                        label="Adres Email"
                                        placeholder="Wpisz adres email"
                                        name="forgotPassEmail"
                                        touched = {this.state.forgotPassForm.forgotPassEmail.touched}
                                        invalid={!this.state.forgotPassForm.forgotPassEmail.valid}
                                        whenchanged={(event) => this.inputForgotPassChangedHandler(event)}/>
                                </div>
    
                                <button disabled={!this.state.forgotPassFormIsValid} className="btn btn-primary" >

                                    Wyślij email z linkiem do zresetowania hasła
                                    
                                </button>

                                <br></br>
                                <br></br>

                                <a href="#" onClick={this.showLoginAreaBack}>Zaloguj się</a>

                             
                            </form>   
                            
                            : 
                            
                            <div>

                                <h4>Witaj: <span className="loggedAs">{this.props.userName}</span></h4>

                                <Link to="/projectsList">
                                    <button className="btn btn-primary btn-lg btn-block gotoprojects">
                                        Przejdź do listy swoich korpusów
                                    </button>
                                </Link>

                                <div> lub </div>

                                <button 
                                    className="btn btn-secondary"
                                    onClick={this.logOutHandler}>

                                    Wyloguj się
                                
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
                              
                                <h3>Zaloguj się</h3>
                                
                                {
                                    
                                    //this.props.loginMessage !== ''? createNotification('warning', this.props.loginMessage) : null
                                   // this.props.loginMessage != ''? errorLoginInfo: null
                                   // errorLoginInfo: null 
                                }
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

                                    <br></br>
                                    <br></br>

                                    <a href="#" onClick={this.forgotPass}>Zapomniałem hasła</a>
                            </form>   
                            
                            : 
                            
                            <div>

                                <h4>Witaj: <span className="loggedAs">{this.props.userName}</span></h4>

                                <Link to="/projectsList">
                                    <button className="btn btn-primary btn-lg btn-block gotoprojects">
                                        Przejdź do listy swoich korpusów
                                    </button>
                                </Link>

                                <div> lub </div>

                                <button 
                                    className="btn btn-secondary"
                                    onClick={this.logOutHandler}>

                                    Wyloguj się
                                
                                </button>

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
                                {this.props.isAuth? null : <p style={{textAlign:'center'}}>Aby skorzystać z serwisu należy być zalogowanym. Załóż konto poniżej</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginArea));