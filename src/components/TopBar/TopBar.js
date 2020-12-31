import React, { Component } from 'react';
import './TopBar.css';
import logoBig from '../../images/logo-clarin-pl.png';
import logoShort from '../../images/logo-clarin-pl-short.png';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply, faQuestion, faTerminal } from '@fortawesome/free-solid-svg-icons';
import EditableLabel from 'react-inline-editing';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import * as projectListActions from '../../store/actions/projectsList';

class topBar extends Component {

  
    _handleFocus = (text) => {
       // console.log('Focused with text: ' + text);
    }

    _handleFocusOut = (text) => {
       // console.log('Left editor with text: ' + this.props.projectID + " " + text + " " + this.props.userId + " " + this.props.token);
       this.props.onChangeProjectName(this.props.projectID, text, this.props.userId, this.props.token);
    }

    render() {

            //czy poczatkowa wersja topbara czy rozbudowana....
        let czyInit = this.props.version === "init" ? true : false;

        //definicja klas na topbar
        let navClassNames = ["TopBar", "navbar", "navbar-expand"];
        if (czyInit) navClassNames.push("init");

        return (


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
    
                               
                                {
                                    /*

                                     <span className="editField">{this.props.projectTitle}</span>
                                        <a href="#"><i className={["fas", "fa-edit"].join(' ')}></i></a>
                                    */
                                }
    
                            </div>
                        )}
                    </div>
    
    
    
    
                    <ul className="navbar-nav">
    
    
                        {
                            /*
                          
                          <li className={["nav-item", "dropdown"].join(' ')}>
                          <a  className={["nav-link", "dropdown-toggle", "navLink"].join(' ')} 
                              href="#" 
                              id="navbarDropdownMenuLinkjezyk" 
                              role="button" 
                              data-toggle="dropdown" 
                              aria-haspopup="true" 
                              aria-expanded="false">
                              <i className={["fas", "fa-globe-europe"].join(' ')}></i> {props.currLn}
                          </a>
                          <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLinkjezyk">
                              <a className="dropdown-item" onClick={()=> props.changeLn("pl")}>PL</a>
                              <a className="dropdown-item" onClick={() => props.changeLn("en")}>EN</a>
                          </div>
                          </li>
                              */
                        }
    
                        {
                            // pomoc 
                        }

                        

                        <li className="nav-item">
                            <a href={process.env.PUBLIC_URL + '/apidoc/index.html'} 
                                    target="_blank" 
                                    id="navbarDropdownMenuLinkpomoc" 
                                    className={["nav-link", "navLink"].join(' ')}>
                                    <FontAwesomeIcon icon={faTerminal} className="faIcon" /> API doc
                            </a>
                        </li>
    
                        <li className="nav-item">
                            {
                                /*
                            <Link to="/help" className={["nav-link", "navLink"].join(' ')}
    
                                id="navbarDropdownMenuLinkpomoc"
                                role="button"
                                aria-haspopup="true"
                                aria-expanded="false">
    
                                <i className="fas fa-question-circle"></i>
    
                                Pomoc
    
                            </Link>
                                */
                            }
                            

                            
    
                            <a href={process.env.PUBLIC_URL + '/docs/doc.html'} 
                                target="_blank" 
                                id="navbarDropdownMenuLinkpomoc" 
                                className={["nav-link", "navLink"].join(' ')}>
                                <FontAwesomeIcon icon={faQuestion} className="faIcon" /> Pomoc
                            </a>
    
                  
                        </li>
    
    
                        {
                            // konto 
    
    
                            /*
            
                            { czyInit ? null : (
                            <li className="nav-item">
                                <a className={["nav-link", "navLink"].join(' ')}
                                   href="#" 
                                   id="navbarDropdownMenuLinkkonto" 
                                   role="button" 
                                   aria-haspopup="true" 
                                   aria-expanded="false">
                                   <i className="fas fa-user-circle"></i> 
                                    
                                   <FormattedMessage
                                        id="TopBar.konto"
                                        defaultMessage=" Konto"
                                        />
                                        
                                        </a>
                            </li>
                            )}
                                    */
    
                        }
                    </ul>
    
                </div>
    
            </nav>
        );
    }   
}


const mapStateToProps = state => {
	return {
        projectName: state.projectR.currentProjectName,
        token: state.homeR.token,
        projectID: state.projectR.currentProjectID,
        userId: state.projectR.currentProjectOwner,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		 // onLoadAudioForPreview: (container, toolType, token) => dispatch(audioEditorActions.loadAudioForPreview(container, toolType, token)),
         // onLoadBinaryForPreview: (container, toolType, token) => dispatch(audioEditorActions.loadBinaryForPreview(container, toolType, token)),
		//onOpenModalHandler: () => dispatch(segmentActions.openModalProject()),
       // onCloseModalHandler: () => dispatch(segmentActions.closeModalProject()),
       onChangeProjectName: (projectId, newName, userId, token) => dispatch(projectListActions.editName(projectId, newName, userId, token))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(topBar);