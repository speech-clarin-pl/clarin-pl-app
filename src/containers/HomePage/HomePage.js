import React from 'react';
import Jumbotron from './Jumbotron/Jumbotron';
import LoginArea from './LoginArea/LoginArea';
import DecoIntro from './DecoIntro/DecoIntro';
import HomeText from './HomeText/HomeText';
import AppFooter from '../../components/AppFooter/AppFooter';
import TopBar from '../../components/TopBar/TopBar';
import Aux from '../../hoc/Auxiliary';


const homePage = (props) => {
    
    return(
        <Aux>
            <TopBar  
                version="init" 
                wide="no" 
                language="pl" 
                projectTitle=""
                changeLn = {props.changeLn}
                currLn = {props.currLn}
                 />
            <Jumbotron />
           
           {
               // <LoginArea />
           }
            
           
            <DecoIntro />
            <HomeText />
            <AppFooter />
        </Aux>
    );
}



export default homePage;