import React, { Component } from 'react';
import './ProjectPage.css';
import Aux from '../../hoc/Auxiliary';

import { connect } from 'react-redux';

import Dashboard from './Dashboard/Dashboard';
import RecognitionTool from './RecognitionTool/RecognitionTool';
import SegmentTool from './SegmentTool/SegmentTool';
import TranscriptTool from './PreviewTool/TranscriptTool';

import RepoBar from './RepoBar/RepoBar';
import ErrorPage from '../../components/ErrorPage/ErrorPage';

import TopBar from '../../components/TopBar/TopBar';
import { Route, Switch, Redirect } from 'react-router-dom';
import Tab from '../ProjectPage/TabContainer/Tab/Tab';
import * as projectActions from '../../store/actions/index';

//import axios from '../../axios-speechtools';

class ProjectPage extends Component {



  componentWillMount() {
    //laduje podstawowe informacje o projekcie
    //pozostale rzeczy beda pochodzic z serwera i db

    //jezeli user przeszedl do projektu z listy projektow
    if(this.props.location.state) {
      const projectId = this.props.match.params.projectID;
      const projectTitle = this.props.location.state.projectTitle;
      const projectOwner = this.props.location.state.projectOwner;

      this.props.onInitProjectHandler(projectId, projectTitle, projectOwner);
    }

  }

  render() {

    return (
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
            

            <div className="ProjectPage">
 
              <ul className={["nav nav-tabs", "darkbg"].join(' ')}>
                  <Tab  title="Dashboard" whereToLink={'/dashboard'}/>
                  <Tab  title="Rozpoznawanie" whereToLink={'/recognition'}/>
                  <Tab  title="Sementacja" whereToLink={'/segment'}/>
                  <Tab  title="Podgląd plików" whereToLink={'/preview'}/>                  
              </ul>
            
              <Switch>
                <Route path={this.props.match.url + '/recognition'} component={RecognitionTool} />
                <Route path={this.props.match.url + '/segment'} component={SegmentTool} />
                <Route path={this.props.match.url + '/preview'} component={TranscriptTool} />
                <Route path={this.props.match.url + '/dashboard'} render={(props)=> {
                  return <Dashboard/>
                }} />
                <Redirect from={this.props.match.url + '/'} to={this.props.match.url + '/dashboard'} />
                <Route component={ErrorPage}/> 
              </Switch>
              

            </div>

            <RepoBar />
          
        </Aux>
      
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentProjectID: state.projectR.currentProjectID,
    currentProjectName: state.projectR.currentProjectName,
    currentProjectOwner: state.projectR.currentProjectOwner,
    
  }
}

const mapDispatchToProps = dispatch => {
  return {
     onInitProjectHandler: (projectId, projectTitle, projectOwner) => dispatch(projectActions.initProject(projectId, projectTitle, projectOwner)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPage);
