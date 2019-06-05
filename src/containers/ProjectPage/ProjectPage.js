import React, { Component } from 'react';
import './ProjectPage.css';
import Aux from '../../hoc/Auxiliary';

import Dashboard from './Dashboard/Dashboard';
import RecognitionTool from './RecognitionTool/RecognitionTool';
import SegmentTool from './SegmentTool/SegmentTool';
import TranscriptTool from './PreviewTool/TranscriptTool';

import RepoBar from './RepoBar/RepoBar';
import ErrorPage from '../../components/ErrorPage/ErrorPage';

import TopBar from '../../components/TopBar/TopBar';
import { Route, Switch, Redirect } from 'react-router-dom';
import Tab from '../ProjectPage/TabContainer/Tab/Tab';

class ProjectPage extends Component {

  state = {
    currentProjectID: null,
  };

  componentDidMount() {
    this.setState({
      currentProjectID: this.props.match.params.projectID,
    });
    
  }

  render() {

  

    return (
        <Aux>

            <TopBar 
                  version="longinit" 
                  wide="yes" 
                  language="pl" 
                  projectTitle={""+this.state.currentProjectID}
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

export default ProjectPage;
