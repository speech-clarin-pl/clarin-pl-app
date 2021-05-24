import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import './ContactToAdminForm.css';
import {withRouter, Link} from 'react-router-dom';
//import {FormattedMessage} from 'react-intl';
import {connect} from 'react-redux';
//import * as actionTypes from '../../../store/actions/actionsTypes';
import Input from '../../components/UI/Input/Input';
import * as authActions from '../../store/actions/index';
import {loader} from '../../index';


class ContactToAdminForm extends Component {

    state = {
        contactAdminForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Podaj email na których chcesz aby przyszła odpowiedź.'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 3
                },
                valid: false,
                touched: false
            },
            message: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Wpisz wiadomość dotyczącą sugestii bądź błędu który wystąpił.'
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

        formIsValid:false,
    }


     //updated at every input in register form
     inputChangedHandler = (event) => {

        const updatedForm = {
            ...this.state.contactAdminForm
        }

        switch(event.target.name){
            case 'adresEmail':
                //immutable update
                const updatedEmail = {
                    ...updatedForm.email
                }
                updatedEmail.value = event.target.value;
                updatedEmail.valid = this.checkValidity(updatedEmail.value, updatedEmail.validation);
                updatedEmail.touched = 1;
                //assembling back after update
                updatedForm.email = updatedEmail;
                break;
            case 'wiadomosc':
                //immutable update
                const updatedMessage = {
                    ...updatedForm.message
                }
                updatedMessage.value = event.target.value;
                updatedMessage.valid = this.checkValidity(updatedMessage.value, updatedMessage.validation);
                updatedMessage.touched = 1;
                //assembling back after update
                updatedForm.message = updatedMessage;

                break;
            default: break;
        }

        //sprawdzam czy cały formularz jest poprawny
        let formIsValid = true;
        for (let inputField in updatedForm){
            formIsValid = updatedForm[inputField].valid && formIsValid;
        }
    
        this.setState({contactAdminForm: updatedForm, formIsValid: formIsValid});
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



    sendEmailToAdmin = (event) => {

        event.preventDefault();

        //I am transforming the state to more compact form
        /*
        let registerData = {};
        for (let formRegisterElement in this.state.registerform) {
            registerData[formRegisterElement] = this.state.registerform[formRegisterElement].value;
        }

        this.props.onRegister(registerData.registerName, registerData.registeremail, registerData.registerpass);   
        */     
    }

    
    render() {
       
        let myclasses = ["container-fluid", "LoginArea"];
             
     
        return(
            <Aux>

                <div className={myclasses.join(' ')}>
                    <div className="container">


                            <div className="row">

                            <div className="col" key="a1">

                                <p>Wiadomość zostanie wysłana na adres mklec@pjwstk.edu.pl oraz danijel@pjwstk.edu.pl.</p>
                            
                                <form onSubmit={this.sendEmailToAdmin}>  
                                    <div className="form-group">
                                        <Input 
                                            inputtype="input" 
                                            type="text"
                                            label="Adres Email"
                                            placeholder="Podaj swój adres email"
                                            name="adresEmail"
                                            touched = {this.state.contactAdminForm.email.touched}
                                            invalid={!this.state.contactAdminForm.email.valid}
                                            whenchanged={(event) => this.inputChangedHandler(event)}/>
                                    </div>
                                    <div className="form-group">
                                        <Input 
                                            inputtype="textarea" 
                                            type="text"
                                            label="Wiadomość"
                                            placeholder="Wpisz swoją wiadomość"
                                            name="wiadomosc"
                                            touched = {this.state.contactAdminForm.message.touched}
                                            invalid={!this.state.contactAdminForm.message.valid}
                                            whenchanged={(event) => this.inputChangedHandler(event)}/>
                                    </div>
                                    
                                    <button disabled={!this.state.formIsValid} className="btn btn-primary">
                                        Wyślij wiadomość
                                    </button>
                                </form> 
                            </div>             
                        </div>
                    </div>
                </div>
            </Aux>
        );
    }
   
}

const mapStateToProps = state => {
    return {
      //  isAuth: state.homeR.isAuth,
      //  userToken: state.homeR.token,
        loggedEmail: state.homeR.email,
      //  userName: state.homeR.userName,
      //  registrationMessage: state.homeR.registrationMessage,
      //  loginMessage: state.homeR.loginMessage,
      //  resRegistrationStatus: state.homeR.resRegistrationStatus,
      //  resLoginStatus: state.homeR.resLoginStatus,
      //  forgotPassEmailSent: state.homeR.forgotPassEmailSent,
      //  resForgotPassStatus: state.homeR.resForgotPassStatus,
      //  forgotPassMessage: state.homeR.forgotPassMessage,

      //  isLoading: state.homeR.isLoading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
     //   onForgotPass: (emailaddr) => dispatch(authActions.forgotPass(emailaddr)),
     //   onLogIn: (email, pass) => dispatch(authActions.loginUser(email, pass)),
     //   onRegister: (userName, userEmail, userPass) => dispatch(authActions.registerUser(userName, userEmail, userPass)),
     //   onLogOut: () => dispatch(authActions.logout())
   
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ContactToAdminForm));