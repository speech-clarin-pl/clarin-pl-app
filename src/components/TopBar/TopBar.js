import React, { Component } from 'react';
import './TopBar.css';
//import logoBig from '../../images/logo-clarin-pl.png';
import logoShort from '../../images/logo-clarin-pl-short.png';
import { withRouter,Link } from 'react-router-dom';
//import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply, faQuestion, faTerminal, faEnvelope, faFighterJet, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import EditableLabel from 'react-inline-editing';
//import { render } from 'react-dom';
import { connect } from 'react-redux';
import * as projectListActions from '../../store/actions/projectsList';
import * as homeActions from '../../store/actions/home';
import Modal from '../../components/UI/Modal/Modal';
import ContactToAdminFrom from '../../containers/ContactToAdminForm/ContactToAdminForm';
import {injectIntl, FormattedMessage} from 'react-intl';

class topBar extends Component {

    state = {
        modal: false,
        yourAccountModalOpened:false,
        contactAdminModalOpened: false,
    }

    closeModalHandler = () => {
        this.setState({
            modal: false,
            yourAccountModalOpened: false,
            contactAdminModalOpened: false,
        })
    }

    logOut = (event) => {
        event.preventDefault();
        this.props.onLogOut();
        this.props.history.push("/");
    }

    _handleFocus = (text) => {
       // console.log('Focused with text: ' + text);
    }

    openSendToAdminModal = (event) => {
        event.preventDefault();
        this.setState({
            modal: true,
            contactAdminModalOpened: true,
        })
    }

    openYourAccount = (event) => {
        event.preventDefault();
        this.setState({
            modal: true,
            yourAccountModalOpened: true,
        })
    }

    _handleFocusOut = (text) => {
       this.props.onChangeProjectName(this.props.projectID, text, this.props.userId, this.props.token);
    }


    render() {

        //czy poczatkowa wersja topbara czy rozbudowana....
        let czyInit = this.props.version === "init" ? true : false;

        //definicja klas na topbar
        let navClassNames = ["TopBar", "navbar", "navbar-expand"];
        if (czyInit) navClassNames.push("init");

        const fastTourLink = this.props.ifTourLink ?
            <li className="nav-item">

                    <button onClick={(e) => {
                            e.preventDefault();
                            this.props.openTourHandler();
                                }}
                            target="_blank"
                            rel="noopener noreferrer"
                            id="navbarDropdownMenuLinkpomoc"
                            className={["nav-link", "navLink", "buttonaslink"].join(' ')}>
                                <FontAwesomeIcon icon={faFighterJet} className="faIcon" />
                                    <FormattedMessage
                                        id="TopBar-QuickTour"
                                        description="Ikona szybkiego przewodnika" 
                                        defaultMessage="Szybki przewodnik"
                                    />
                    </button>
                
            </li>
            :
            null;

        const contactToAdminBtn = this.props.ifContactToAdmin ?
            <li className="nav-item">
                <button
                    className={["nav-link", "navLink", "buttonaslink"].join(' ')}
                    onClick={this.openSendToAdminModal}>
                    <FontAwesomeIcon icon={faEnvelope} className="faIcon" /> 
                        <FormattedMessage
                            id="TopBar-ZglosToAdminIcon"
                            description="Ikona zgłoś do admina" 
                            defaultMessage="Zgłoś do admina"
                        />
                    </button>
            </li>
            :
            null;

        const logOutLink = this.props.ifLogOut ?
            <li className="nav-item">
                <button className={["nav-link", "navLink","buttonaslink"].join(' ')}
                    id="navbarDropdownMenuLinkkonto"
                    aria-haspopup="true"
                    aria-expanded="false"
                    onClick={this.logOut}>

                    <FontAwesomeIcon icon={faUserCircle} className="faIcon" />
                        <FormattedMessage
                            id="TopBar-LogOutIcon"
                            description="Ikona wylogowania się" 
                            defaultMessage="Wyloguj"
                        />
                    </button>
            </li> : null;

        const apiLink = this.props.ifAPI ?
            <li className="nav-item">
                <a href={process.env.PUBLIC_URL + '/apidoc/index.html'}
                    target="_blank"
                    id="navbarDropdownMenuLinkpomoc"
                    rel="noopener noreferrer"
                    className={["nav-link", "navLink"].join(' ')}>
                    <FontAwesomeIcon icon={faTerminal} className="faIcon" /> API </a>
            </li> : null;

        const dokumentacjaLink = (
            <li className="nav-item">
                <a href={process.env.PUBLIC_URL + '/docs/manual_CLARIN-PL.pdf'}
                    target="_blank"
                    rel="noopener noreferrer"
                    id="navbarDropdownMenuLinkpomoc"
                    className={["nav-link", "navLink"].join(' ')}>
                    <FontAwesomeIcon icon={faQuestion} className="faIcon" /> 
                        <FormattedMessage
                            id="TopBar-documentaionIcon"
                            description="Ikona dokumentacji" 
                            defaultMessage="Dokumentacja"
                        />
                    </a>
            </li>
        )

        let modalTitle = '';

        if(this.state.yourAccountModalOpened){
            modalTitle = "Twoje konto";
        }

        if(this.state.contactAdminModalOpened){
            modalTitle = this.props.intl.formatMessage(
                    {
                      id:"TopBar-contactToAdminHeader",
                      description: 'Nagłówek formularza do kontaktu z administratorem', 
                      defaultMessage: 'Kontakt do administratora strony', 
                    }
                  )

        }

        return (
            <>
                <Modal 
                    show={this.state.modal}
					modalClosed={this.closeModalHandler}
                    modalTitle={modalTitle}
                >
                    {
                        this.state.contactAdminModalOpened?<ContactToAdminFrom />:null
                    }

                    {
                        //póki co nie działa ale zostawiam na przyszłość
                        this.state.yourAccountModalOpened?<h1>Twoje konto</h1>:null
                    }
                </Modal> 

            <nav className={navClassNames.join(' ')}>
    
                {
                    //czy szeroki topBar czy nie
                }
                <div className={this.props.wide === "no" ? "container" : "container-fluid"}>
    
                    {
                        //kliknięcie w logo
                    }
                    <Link to="/" className="navbar-brand" onClick={this.props.clickLogo}>
                        <div className="logoPlace">
                            <img src={czyInit ? logoShort : logoShort} alt="clarin-logo" className="logo" />
                        </div>
                    </Link>
    
    
                    {
                        //czy wyświetlać info o projekcie
                    }
                    <div className="projectTitleEdit">
                        {czyInit ? null : (
                            <div>
                                <div style={{float: 'left'}}>
                                    <Link to="/projectsList">
                                        <FontAwesomeIcon icon={faReply} className="faIcon" />
                                        <i className={["fas", "fa-arrow-left"].join(' ')}></i>
                                    </Link>
                                </div>
                                
                                <div style={{float: 'left'}}>
                                    <EditableLabel text={this.props.projectName}
                                        labelClassName='myLabelClass'
                                        inputClassName='myInputClass'
                                        inputWidth='200px'
                                        isEditing={false}
                                        inputHeight='25px'
                                        inputMaxLength={80}
                                        onFocus={this._handleFocus}
                                        onFocusOut={this._handleFocusOut}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <ul className="navbar-nav" data-tut="topBarIcons">
    
    
                        {
                          
                       
                          <li className={["nav-item", "dropdown"].join(' ')}>
                            <button  className={["nav-link", "dropdown-toggle", "navLink", "buttonaslink"].join(' ')} 
                               
                                id="navbarDropdownMenuLinkjezyk" 
                             
                                data-toggle="dropdown" 
                                aria-haspopup="true" 
                                aria-expanded="false">

                                <i className={["fas", "fa-globe-europe"].join(' ')}></i> {this.props.language}
                            </button>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLinkjezyk">
                                    <button className="dropdown-item buttonaslink" onClick={()=> this.props.onChangeLanguage("pl")}>PL</button>
                                    <button className="dropdown-item buttonaslink" onClick={() => this.props.onChangeLanguage("en")}>EN</button>
                                </div>
                          </li>
                         
                           
                        }
    
                        {
                           this.props.isAuth?apiLink:null
                        }

                        
    
                        {
                            this.props.isAuth?fastTourLink:null
                        }

                        {
                            dokumentacjaLink
                        }

                        {
                            this.props.isAuth?contactToAdminBtn:null
                        }

                        {
                            this.props.isAuth?logOutLink:null
                        }
    
                        
                       
                    </ul>
    
                </div>
    
            </nav>
            </>
        );
    }   
}


const mapStateToProps = state => {
	return {
        isAuth: state.homeR.isAuth,
        projectName: state.projectR.currentProjectName,
        token: state.homeR.token,
        projectID: state.projectR.currentProjectID,
        userId: state.projectR.currentProjectOwner,
        language:state.homeR.language,
	}
}

const mapDispatchToProps = dispatch => {
	return {
       onChangeProjectName: (projectId, newName, userId, token) => dispatch(projectListActions.editName(projectId, newName, userId, token)),
       onChangeLanguage: (language) => dispatch(homeActions.changeLanguage(language)),
       onLogOut: () => dispatch(homeActions.logout()),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(injectIntl(topBar)));