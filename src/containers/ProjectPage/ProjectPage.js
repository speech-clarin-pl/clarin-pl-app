import React, { Component } from 'react';
import './ProjectPage.css';
import Aux from '../../hoc/Auxiliary';

import { connect } from 'react-redux';

import Dashboard from './Dashboard/Dashboard';
import RecognitionTool from './RecognitionTool/RecognitionTool';
import SegmentTool from './SegmentTool/SegmentTool';
import VADTool from './VADTool/VADTool';
import DIATool from './DIATool/DIATool';
import TranscriptionTool from './TranscriptionTool/TranscriptionTool';

import RepoBar from './RepoBar/RepoBar';
import RepoPanel from './RepoPanel/RepoPanel';
import ErrorPage from '../../components/ErrorPage/ErrorPage';

import TopBar from '../../components/TopBar/TopBar';
import { Route, Switch, Redirect } from 'react-router-dom';
import Tab from '../ProjectPage/TabContainer/Tab/Tab';
import * as projectActions from '../../store/actions/index';
import {DndProvider} from 'react-dnd';
import Backend from 'react-dnd-html5-backend';

//import axios from '../../axios-speechtools';



class ProjectPage extends Component {

  componentWillUnmount = () => {
    localStorage.removeItem('projectId');
    localStorage.removeItem('projectTitle');
    localStorage.removeItem('projectOwnerId');
  }


  componentWillMount = () => {

    //pod odświeżeniu strony...

    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');
    if (!token || !expiryDate) {
      return;
    }

    if (new Date(expiryDate) <= new Date()) {
      this.props.onLogOut(); 
      return;
    }
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    const remainingMilliseconds =
    new Date(expiryDate).getTime() - new Date().getTime();

    console.log(userId)
    console.log(userName)
    console.log(token)

    this.props.onSetLoggedIn(userId,userName, token);    

    //laduje podstawowe informacje o projekcie
    //pozostale rzeczy beda pochodzic z serwera i db

    //jezeli user przeszedl do projektu z listy projektow
    //if(this.props.location.state) {
      
    let projectId = this.props.currentProjectID;
    let projectTitle = this.props.currentProjectName;
    let projectOwnerId = this.props.currentProjectOwner;

    if (localStorage["projectId"]) {
        //jeżeli użytkownik odświeżył strone 

        projectId = localStorage.getItem('projectId');
        projectTitle = localStorage.getItem('projectTitle');
        projectOwnerId = localStorage.getItem('projectOwnerId');


    } else {

      localStorage.setItem('projectId',projectId);
      localStorage.setItem('projectTitle', projectTitle);
      localStorage.setItem('projectOwnerId', projectOwnerId);

    }

    console.log(projectId)
    console.log(projectTitle)
    console.log(projectOwnerId)

    this.props.onInitProjectHandler(projectId, projectTitle, projectOwnerId);
    this.props.onClearRecoStore();
    this.props.onClearSegmentStore();
    this.props.onClearPreviewStore();
  
  }

  render() {

    return (
      <DndProvider backend={Backend}>
        <Aux>
         
            <TopBar 
                  version="longinit" 
                  wide="yes" 
                  language="pl" 
                  projectTitle={""+this.props.currentProjectName}
                  changeLn = {this.props.changeLn}
                  currLn = {this.props.currLn}/>
            {/*
            <LeftSiteBar czyTopPart="true" />
            */}
            

            <div className="ProjectPage" id="ProjectPage">
 
              <ul className={["nav nav-tabs", "darkbg"].join(' ')}>


                  <Tab  title="Dashboard" iconType="DASH" whereToLink={'/dashboard'}/>
                  <Tab  title="Detekcja mowy" iconType="VAD" whereToLink={'/vad'}/>
                  <Tab  title="Diaryzacja" iconType="DIA" whereToLink={'/dia'}/>
                  <Tab  title="Rozpoznawanie" iconType="REC" whereToLink={'/recognition'}/>
                  <Tab  title="Segmentacja" iconType="SEG" whereToLink={'/segment'}/>
                  {
                    /*
                    <Tab  title="Transkrypcje" whereToLink={'/transcrypt'}/>   
                    */
                  }            
              </ul>
            
              <Switch>
                <Route path={this.props.match.url + '/recognition'} component={RecognitionTool} />
                <Route path={this.props.match.url + '/segment'} component={SegmentTool} />
                <Route path={this.props.match.url + '/vad'} component={VADTool} />
                <Route path={this.props.match.url + '/dia'} component={DIATool} />
                {
                  /*
                  <Route path={this.props.match.url + '/transcrypt'} component={TranscriptionTool} />
                  */
                }
                
                <Route path={this.props.match.url + '/dashboard'} render={(props)=> {
                  return <Dashboard/>
                }} />

                <Redirect from={this.props.match.url + '/'} to={this.props.match.url + '/dashboard'} />
                <Route component={ErrorPage}/> 
              </Switch>
              
            </div>

           {/*
           <RepoBar />
           */} 
           
           <RepoPanel />
          
        </Aux>
      </DndProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentProjectID: state.prolistR.chosenProjectID,
    //currentProjectID: state.projectR.currentProjectID,
   // currentProjectName: state.prolistR.chosenProjectName,
    currentProjectName: state.projectR.currentProjectName,
    currentProjectOwner: state.prolistR.chosenProjectOwner,
    //currentProjectOwner: state.projectR.currentProjectOwner,

  }
}

const mapDispatchToProps = dispatch => {
  return {
     onInitProjectHandler: (projectId, projectTitle, projectOwner) => dispatch(projectActions.initProject(projectId, projectTitle, projectOwner)),
     onSetLoggedIn:(userId, userName, token) => dispatch(projectActions.setLoggedIn(userId, userName, token)),
     onLogOut: () => dispatch(projectActions.logout()),
     onClearRecoStore: () => dispatch(projectActions.clearRecoStore()),
     onClearSegmentStore: () => dispatch(projectActions.clearSegmentStore()),
     onClearPreviewStore: () => dispatch(projectActions.clearPreviewStore()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPage);
