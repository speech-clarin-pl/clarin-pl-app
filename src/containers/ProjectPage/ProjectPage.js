import React, { Component } from 'react';
import './ProjectPage.css';
import Aux from '../../hoc/Auxiliary';
import LeftSiteBar from '../../components/LeftSiteBar/LeftSiteBar';
import TabContainer from './TabContainer/TabContainer';

import Dashboard from './Dashboard/Dashboard';
import RecognitionTool from './RecognitionTool/RecognitionTool';
import SegmentTool from './SegmentTool/SegmentTool';
import TranscriptTool from './TranscriptTool/TranscriptTool';

import RepoBar from './RepoBar/RepoBar';
import ErrorPage from '../../components/ErrorPage/ErrorPage';

import TopBar from '../../components/TopBar/TopBar';
import { Route, Switch, Redirect } from 'react-router-dom';
import Tab from '../ProjectPage/TabContainer/Tab/Tab';

// to do edycji jezykowej

let TABS = {
  dashboard: 'Dashboard', 
  recognition: 'Rozpoznawanie',
  segmentation: 'Segmentacja',
  transcription: 'Transkrypcje'};

class ProjectPage extends Component {

  state = {
    currentProjectID: null,
    currentTab: TABS.dashboard,
  };

  parseQueryParams () {
    console.log(this.props);
    const query = new URLSearchParams(this.props.location.search);
    /*
    for (let param of query.entries()) {
        if (this.state.courseTitle !== param[1]) {
            this.setState({courseTitle: param[1]});
        }
    }
    */
  }

  componentDidMount() {
    //ekstrachuje parametry w URL o id projektu
   // const query = new URLSearchParams(this.props.location.search);
   // const params = {};

    //this.parseQueryParams ();

    //niepotrzebnie iteruje po wiekszej liczbie parametrow - na przyszlosc - bo aktualnie przekazywane jest tylko ID
    //for (let param of query.entries()){
    //  params[param[0]] = param[1];
    //}


    this.setState({
      currentProjectID: this.props.match.params.projectID,
    });
    
  }

  switchTabHandler = (whichTab) => {

    console.log('wybrano tab: '+whichTab);
        this.setState({
          currentTab: whichTab,
    });
  }

  render() {

    let displayedTab = null;

    switch(this.state.currentTab){
      case (TABS.dashboard):
        displayedTab = <Dashboard />
        break;
      case (TABS.recognition):
        displayedTab = <RecognitionTool />
        break;
      case (TABS.segmentation):
        displayedTab = <SegmentTool />
        break;
      case (TABS.transcription):
        displayedTab = <TranscriptTool />
        break;
      default:
        displayedTab = <ErrorPage />
    }

    
   console.log(this.props);

    return (
        <Aux>

            <TopBar 
                  version="longinit" 
                  wide="yes" 
                  language="pl" 
                  projectTitle={""+this.state.currentProjectID}
                  changeLn = {this.props.changeLn}
                  currLn = {this.props.currLn}/>


            <LeftSiteBar czyTopPart="true" />
           
            {
            /*
            <TabContainer listOfTabs={TABS} clickTab={this.switchTabHandler} displayedTab={this.state.currentTab}>
              */
            }

          <div className="ProjectPage">

              <ul className={["nav nav-tabs", "darkbg"].join(' ')}>
                  <Tab  title="Dashboard" whereToLink={'/dashboard'}/>
                  <Tab  title="Rozpoznawanie" whereToLink={'/recognition'}/>
                  <Tab  title="Sementacja" whereToLink={'/segment'}/>
                  <Tab  title="Podgląd" whereToLink={'/preview'}/>                  
              </ul>
            
              <Switch>
                <Route path={this.props.match.url + '/recognition'} component={RecognitionTool} />
                <Route path={this.props.match.url + '/segment'} component={SegmentTool} />
                <Route path={this.props.match.url + '/preview'} component={TranscriptTool} />
                <Route path={this.props.match.url + '/dashboard'} component={Dashboard} />
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
