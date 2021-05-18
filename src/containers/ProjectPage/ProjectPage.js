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
import Tour from 'reactour';

//import axios from '../../axios-speechtools';

class ProjectPage extends Component {

  state =  {
    isTourOpen: false,
    kleskaContainer: null,
  }

  //dla  reacttour
   steps = [
    {
      selector: '[data-tut="repoPanel"]',
      content: `Repozytorium to miejsce w którym możesz wgrywać i przechowywać swoje pliki audio. Twoim celem jest ich opis (z pomocą naszych narzędzi automatycznych) oraz ostateczne wygenerowanie anotowanego korpusu.`
    },
    {
      selector: '[data-tut="repoSession"]',
      content: `Pliki możesz organizować w grupy zwane sesjami. Na początku stworzyliśmy dla Ciebie dwie przykładowe sesje: demo i sesję domyślną.`,
       action: () => {
        this.props.onOpenDemoSession();
      }
    },
    {
      selector: '[data-tut="ikonkiRepo"]',
      content: `Każdy plik posiada ikonki obrazujące status wykonania narzędzia automatycznego, odpowiednio od lewej: detekcja mowy, diaryzacja, rozpoznawanie mowy oraz segmentacja. Klikając w ikonkę, przenosisz dany plik do kolejki danego narzędzia automatycznego.`
    },
    {
      selector: '[data-tut="toolList"]',
      content: `Dodaliśmy za Ciebie dwa pliki (opowiesci i kleska) do kolejki narzędzia służącego do automatycznego rozpoznawania mowy. Dzięki kolejkowaniu plików, możesz zdecydować którymi plikami chcesz się zajmować i wykonywać ich transkrypcje po koleii, plik po pliku.`,
      action: () => {
        //console.log(this.props.history)
        this.addDemoFilesToReco();
      }
    },
    {
      selector: '[data-tut="wlaczenieNarzedzia"]',
      content: `Klikając ikonkę przy nazwie pliku, możesz uruchomić np. automatyczne rozpoznawanie mowy. Po zakończeniu działania możesz podejrzeć rezultaty w oknie edytora oraz skorygować je ręcznie.`
    },
    {
      selector: '[data-tut="audioEdytor"]',
      content: `Klikając w wybrany plik z listy, możesz otworzyć go w edytorze. Umożliwia od odsłuchanie oraz edycje rezultatów narzędzi automatycznych. W tym przypadku istnieje możliwość włączenia automatycznego rozpoznawania mowy.`,
    },
    {
      selector: '[data-tut="zakladkiNarzedzi"]',
      content: `Zwróć uwagę żę ikonki przy plikach w repozytorium odpowiadają zakładkom narzędzi automatycznych w tym miejscu. `
    },
    {
      selector: '[data-tut="dodajOpowiesciDoTranskrypcji"]',
      content: `Klikając w ikonki dodajesz odpowiedni plik do kolejki przetwarzania określonego narzędzia. Dla przykładu, klikając w ikonkę ?? dodajesz plik do kolejki automatycznego rozpoznawania mowy.`
    },
    {
      selector: '[data-tut="dodajKleskaDoTranskrypcji"]',
      content: `Możesz dodać wiele plików do dowolnego narzędzia np. do przetranskrybowania. Dodaj jeszcze plik "kleska" do listy "Transkrypcje".`
    },
  ]

  addDemoFilesToReco = () => {

    //znajduje contenery kleska i opowiesci i dodaje je do listy rozpoznawania

    const allContainers =  Object.values(this.props.repoData.containers.byId);
    let kleska = null;
    let opowiesci = null;

    for (let i = 0; i<allContainers.length; i++){
      let currCon =allContainers[i];
      if(currCon.fileName === "kleska-29d61ce0.wav"){
        kleska = currCon;
      }
      
      if(currCon.fileName === "opowiesci-811cddd0.wav"){
        opowiesci = currCon;
      }
    }

    if(kleska) {
      
      this.props.addContainerToReco(kleska);
      
    }
    if(opowiesci) {
      this.props.addContainerToReco(opowiesci);
      this.props.openContainerInRecoPreview(opowiesci); //od razu włączam opowiesci w edytorze
    }
    
  }



  setIsTourOpen = (ifOpen) => {

    if(ifOpen){
      //przechodze do zakładki Transkrypcje
      const currLocation = this.props.history.location.pathname;
      const splittedLoc = currLocation.split("/");
      splittedLoc[splittedLoc.length-1] = "recognition";
      let finalPathTo = '';
      for (let j=0;j<splittedLoc.length;j++){
        if(j===0){
          finalPathTo = splittedLoc[j];
        } else {
          finalPathTo = finalPathTo + "/" + splittedLoc[j];
        }
        
      }

      this.props.history.push(finalPathTo);
    }
    this.setState({
      isTourOpen: ifOpen
    })
  }

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

                  openTourHandler={()=>this.setIsTourOpen(true)}
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
 
              <ul className={["nav nav-tabs", "darkbg"].join(' ')} data-tut="zakladkiNarzedzi" >

                  <Tab  title="Dashboard" iconType="DASH" whereToLink={'/dashboard'}/>
                    <Tab  title="Detekcja mowy" iconType="VAD" whereToLink={'/vad'}/>
                    <Tab  title="Diaryzacja" iconType="DIA" whereToLink={'/dia'}/>
                    <Tab  title="Transkrypcje" iconType="REC" whereToLink={'/recognition'}/>
                    <Tab  title="Segmentacja" iconType="SEG" whereToLink={'/segment'}/>          
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
           
           <RepoPanel/>
          
           <Tour 
              steps={this.steps}
              isOpen={this.state.isTourOpen}
              onRequestClose={()=>this.setIsTourOpen(false)}  
              rounded={5}

            />
        </Aux>
      </DndProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentProjectID: state.prolistR.chosenProjectID,
    repoData: state.repoR,
    currentProjectName: state.projectR.currentProjectName,
    currentProjectOwner: state.prolistR.chosenProjectOwner,
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
     onOpenDemoSession: () => dispatch(projectActions.openDemoSession()),
     addContainerToReco: (container) => dispatch(projectActions.addContainerToReco(container)),
     openContainerInRecoPreview: (container) => dispatch(projectActions.openContainerInRecoPreview(container)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPage);
