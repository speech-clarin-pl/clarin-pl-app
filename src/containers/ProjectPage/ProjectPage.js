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

  componentDidMount() {
    //ekstrachuje parametry w URL o id projektu
    const query = new URLSearchParams(this.props.location.search);
    const params = {};

    //niepotrzebnie iteruje po wiekszej liczbie parametrow - na przyszlosc - bo aktualnie przekazywane jest tylko ID
    for (let param of query.entries()){
      params[param[0]] = param[1];
    }

    console.log(params);

    this.setState({
      currentProjectID: params.projectID,
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
           
            <TabContainer listOfTabs={TABS} clickTab={this.switchTabHandler} displayedTab={this.state.currentTab}>

              {displayedTab}
              
            </TabContainer> 

            <RepoBar />

        </Aux>
      
    );
  }
}

export default ProjectPage;
