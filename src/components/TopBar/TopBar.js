import React from 'react';
import  './TopBar.css';
import logoBig from '../../images/logo-clarin-pl.png';
import logoShort from '../../images/logo-clarin-pl-short.png';
import {Link} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

const topBar = (props) => {

    //czy poczatkowa wersja topbara czy rozbudowana....
    let czyInit = props.version === "init" ? true : false;

    //definicja klas na topbar
    let navClassNames = ["TopBar", "navbar", "navbar-expand"];
    if(czyInit) navClassNames.push("init");



    return(
        
       
		<nav className={navClassNames.join(' ')}>
		 	
             {
                 //czy szeroki topBar czy nie
             }
            <div className={props.wide==="no" ? "container": "container-fluid"}>

             {
                 //kliknięcie w logo
             }
             <Link to="/" className="navbar-brand" onClick={props.clickLogo}>
                <div className="logoPlace">
                    <img src={czyInit ? logoShort : logoBig} alt="clarin-logo" className="logo"/>
                </div>
             </Link>

            
             {
                 //czy wyświetlać info o projekcie
             }
             <div className="projectTitleEdit">
             { czyInit ? null : (
                <div>
                    <Link to="/projectsList">
                        <i className={["fas",  "fa-arrow-left"].join(' ')}></i>
                    </Link>
                        <span className="editField">{props.projectTitle}</span>
                        {
                            /*
                                <a href="#"><i className={["fas", "fa-edit"].join(' ')}></i></a>
                            */
                        }
                   
                </div>
                ) }
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
                    <Link to="/help" className={["nav-link", "navLink"].join(' ')}
                         
                        id="navbarDropdownMenuLinkpomoc" 
                        role="button" 
                        aria-haspopup="true" 
                        aria-expanded="false">
                            
                        <i className="fas fa-question-circle"></i> 

                            Pomoc
                        
                        </Link>
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

export default topBar;