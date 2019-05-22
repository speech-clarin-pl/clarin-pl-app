import React from 'react';
import Jumbotron from './Jumbotron/Jumbotron';
import LoginArea from './LoginArea/LoginArea';
import DecoIntro from './DecoIntro/DecoIntro';
import HomeText from './HomeText/HomeText';
import AppFooter from '../../components/AppFooter/AppFooter';
import TopBar from '../../components/TopBar/TopBar';

const homePage = (props) => {
    return(
        <>
            <TopBar 
                version="init" 
                wide="no" 
                language="pl" 
                projectTitle=""
                 />
            <Jumbotron />
            <LoginArea />
            <DecoIntro />
            <HomeText />
            <AppFooter />
        </>
    );
}

export default homePage;