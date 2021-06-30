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
import {injectIntl, FormattedMessage} from 'react-intl';


class ProjectPage extends Component {

  state =  {
    isTourOpen: false,
    kleskaContainer: null,
  }

  //dla  reacttour
   steps = [
    {
      selector: '[data-tut="repoPanel"]',
      content: 
        this.props.intl.formatMessage(
            {
              id:"ProjectPage-tour-repoPanel",
              description: 'Tour-repoPanel', 
              defaultMessage:  `Repozytorium to miejsce w którym możesz wgrywać i przechowywać swoje pliki audio. Twoim celem jest ich opis (z pomocą naszych narzędzi automatycznych) oraz ostateczne wygenerowanie anotowanego korpusu.`, 
            }
          )
    },
    {
      selector: '[data-tut="repoSession"]',
      content: this.props.intl.formatMessage(
        {
          id:"ProjectPage-tour-repoSession",
          description: 'Tour-repoSession', 
          defaultMessage:  `Pliki możesz organizować w grupy zwane sesjami. Na początku stworzyliśmy dla Ciebie dwie przykładowe sesje: demo i sesję domyślną.`, 
        }
      ),
       action: () => {
        this.props.onOpenDemoSession();
      }
    },
    {
      selector: '[data-tut="ikonkiRepo"]',
      content: this.props.intl.formatMessage(
        {
          id:"ProjectPage-tour-ikonkiRepo",
          description: 'Tour-ikonkiRepo', 
          defaultMessage:  `Każdy plik posiada ikonki obrazujące status wykonania narzędzia automatycznego, odpowiednio od lewej: detekcja mowy, diaryzacja, rozpoznawanie mowy oraz segmentacja. Klikając w ikonkę, przenosisz dany plik do kolejki danego narzędzia automatycznego.`, 
        }
      ),      
    },
    {
      selector: '[data-tut="toolList"]',
      content: this.props.intl.formatMessage(
        {
          id:"ProjectPage-tour-toolList",
          description: 'Tour-toolList', 
          defaultMessage:  `Dodaliśmy za Ciebie dwa pliki (opowiesci i kleska) do kolejki narzędzia służącego do automatycznego rozpoznawania mowy. Dzięki kolejkowaniu plików, możesz zdecydować którymi plikami chcesz się zajmować i wykonywać ich transkrypcje po koleii, plik po pliku.`,
        }
      ), 
      
      
      action: () => {
        //console.log(this.props.history)
        this.addDemoFilesToReco();
      }
    },
    {
      selector: '[data-tut="wlaczenieNarzedzia"]',
      content: this.props.intl.formatMessage(
        {
          id:"ProjectPage-tour-wlaczenieNarzedzia",
          description: 'Tour-wlaczenieNarzedzia', 
          defaultMessage:  `Klikając ikonkę przy nazwie pliku, możesz uruchomić narzędzie automatyczne. Zielona ikonka oznacza, że dane narzędzie zostało już wykonane. Możesz podejrzeć rezultaty jego działania w oknie edytora i ewentualnie skorygować je ręcznie.`
        }
      ), 
      
    },
    {
      selector: '[data-tut="audioEdytor"]',
      content: this.props.intl.formatMessage(
        {
          id:"ProjectPage-tour-audioEdytor",
          description: 'Tour-audioEdytor', 
          defaultMessage:  `Edytor umożliwia odsłuchanie oraz edycje rezultatów narzędzi automatycznych. W tym przypadku mamy otworzony plik "celnik" oraz transkrypcję która została wykonana automatycznie. Możesz ją poprawić ręcznie i zapisać korekty.`,
        }
      ),
    },
    {
      selector: '[data-tut="edytorControls"]',
      content: this.props.intl.formatMessage(
        {
          id:"ProjectPage-tour-edytorControls",
          description: 'Tour-edytorControls', 
          defaultMessage:  `W tym miejscu możesz kontrolować różne aspekty odtwarzania pliku audio. Oznaczają one odpowiednio od lewej.
        
          - rozszerzenie widoku edytora do całej szerokości dostępnego okna
          - Play/pausa [Alt+l]
          - Odtworzenie ostatnich 3 sekund, począwszy od aktualnej pozycji głowicy [Alt+k]
          - Odtworzenie ostatnich 5 sekund, począwszy od aktualnej pozycji głowicy [Alt+j]
          - Przyśpieszenie odtwarzania [Alt+i]
          - Spowolnienie odtwarzania [Alt+o]
          - Orzybliżenie
          - Oddalenie
          - Dodanie segmentu
        . Warto nauczyć się również skrótów klawiaturowych.`
        }
      ),
      
      
      
    },
    {
      selector: '[data-tut="edytorNavigator"]',
      content: this.props.intl.formatMessage(
        {
          id:"ProjectPage-tour-edytorNavigator",
          description: 'Tour-edytorNavigator', 
          defaultMessage: `W tym miejscu widać podgląd całego pliku dźwiękowego. Dzięki temu możesz szybko nawigować do dowolnego jego fragmentu, bez względu na to jak długe jest nagranie.`
        }
      ),
      
    },
    {
      selector: '[data-tut="edytorWaveform"]',
      content: this.props.intl.formatMessage(
        {
          id:"ProjectPage-tour-edytorWaveform",
          description: 'Tour-edytorWaveform', 
          defaultMessage: `W zależności od powiększenia, w tym miejscu widać fragment nagrania ze szczegółami. To tutaj możesz precyzyjnie ustawić głowicę odtwarzającą oraz granice segmentów.`
        }
      ),
      
      
    },
    {
      selector: '[data-tut="edytorOtworzwEMU"]',
      content: this.props.intl.formatMessage(
        {
          id:"ProjectPage-tour-edytorOtworzwEMU",
          description: 'Tour-edytorOtworzwEMU', 
          defaultMessage: `Jeżeli na pliku jest wykonane narzędzie segmentacji (jak w tym przypadku), możesz otworzyć plik w zewnętrznej aplikacji EMU [Screen] `
        }
      ),
      
      
    },
    {
      selector: '[data-tut="edytorTextField"]',
      content: this.props.intl.formatMessage(
        {
          id:"ProjectPage-tour-edytorTextField",
          description: 'Tour-edytorTextField', 
          defaultMessage: `W tym miejscu dokonujesz korekty narzędzi automatycznych. W tym przypadku jest to transkrypcja. Zmiany możesz zapisać do systemu [Alt+m]. Po zakończeniu transkrypcji, możesz przejść do kolejnego pliku na liścien [Alt+n]`
        }
      ),
      
      
    },
    {
      selector: '[data-tut="edytorUruchomDlaWszystkich"]',
      content: this.props.intl.formatMessage(
        {
          id:"ProjectPage-tour-edytorUruchomDlaWszystkich",
          description: 'Tour-edytorUruchomDlaWszystkich', 
          defaultMessage:  `Zamiast uruchamiać narzędzia pojedynczo, możesz je uruchomić jednocześnie do wszystkich plików znajdujących się w kolejce. W tym celu należy kliknąć w tym miejscu.`
        }
      ),
      
     
    },
    {
      selector: '[data-tut="EdytorPodpowiedzi"]',
      content: this.props.intl.formatMessage(
        {
          id:"ProjectPage-tour-EdytorPodpowiedzi",
          description: 'Tour-EdytorPodpowiedzi', 
          defaultMessage:   `W tym miejscu znajdziesz wskazówki dotyczące zasady działania poszczególnych narzędzi oraz niezbędne skróty klawiaturowe.`
        }
      ),
      
     
    },
    {
      selector: '[data-tut="edytorExportCorpus"]',
      content: this.props.intl.formatMessage(
        {
          id:"ProjectPage-tour-edytorExportCorpus",
          description: 'Tour-edytorExportCorpus', 
          defaultMessage:  `Wszystkie pliki na których zostały wykonane wszystkie poziomy annotacji (i ewentualnie poprawione przez Ciebie), mogą zostać wyeksportowane do gotowego korpusu w formacie EMU-SDMS. Po odczekaniu, będziesz mógł go ściągnąć w formacie ZIP.`
        }
      ),
    },
  ]

  addDemoFilesToReco = () => {

    //znajduje contenery kleska i opowiesci i dodaje je do listy rozpoznawania

    const allContainers =  Object.values(this.props.repoData.containers.byId);
    let kleska = null;
    let opowiesci = null;
    let celnik = null;

    for (let i = 0; i<allContainers.length; i++){
      let currCon =allContainers[i];
      if(currCon.fileName === "kleska-29d61ce0.wav"){
        kleska = currCon;
      }

      if(currCon.fileName === "celnik-1189e21a.wav"){
        celnik = currCon;
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
    }
    if(celnik){
      this.props.addContainerToReco(celnik);
      this.props.openContainerInRecoPreview(celnik); //od razu włączam opowiesci w edytorze
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
    const email = localStorage.getItem('email');
   // const remainingMilliseconds =
    //new Date(expiryDate).getTime() - new Date().getTime();


    this.props.onSetLoggedIn(userId,userName, email,token);    

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
                  ifTourLink={true}
                  ifContactToAdmin={true}
                  ifLogOut={true}
                  ifAPI={true}
                  language="pl" 
                  projectTitle={""+this.props.currentProjectName}
                  changeLn = {this.props.changeLn}
                  currLn = {this.props.currLn}/>
            {/*
            <LeftSiteBar czyTopPart="true" />
            */}
            

            <div className="ProjectPage" id="ProjectPage">
 
              <ul className={["nav nav-tabs", "darkbg"].join(' ')} data-tut="zakladkiNarzedzi" >

                  <Tab  title={
                                  this.props.intl.formatMessage(
                                      {
                                        id:"ProjectPage-dashboard",
                                        description: 'Zakładka dashboard', 
                                        defaultMessage: 'Kokpit', 
                                      }
                                    )
                              }
                              iconType="DASH" whereToLink={'/dashboard'}/>
                    <Tab  title={
                                  this.props.intl.formatMessage(
                                      {
                                        id:"ProjectPage-detekcjamowy",
                                        description: 'Zakładka detekcji movy', 
                                        defaultMessage: 'Detekcja mowy', 
                                      }
                                    )
                              } iconType="VAD" whereToLink={'/vad'}/>
                    <Tab  title={
                                  this.props.intl.formatMessage(
                                      {
                                        id:"ProjectPage-diaryzacja",
                                        description: 'Zakładka diaryzacji', 
                                        defaultMessage: 'Diaryzacja', 
                                      }
                                    )
                              } iconType="DIA" whereToLink={'/dia'}/>
                    <Tab  title={
                                  this.props.intl.formatMessage(
                                      {
                                        id:"ProjectPage-transkrypcje",
                                        description: 'Zakładka transkrypcje', 
                                        defaultMessage: 'Transkrypcje', 
                                      }
                                    )
                              } iconType="REC" whereToLink={'/recognition'}/>
                    <Tab  title={
                                  this.props.intl.formatMessage(
                                      {
                                        id:"ProjectPage-segmentacja",
                                        description: 'Zakładka segmentacja', 
                                        defaultMessage: 'Segmentacja', 
                                      }
                                    )
                              } iconType="SEG" whereToLink={'/segment'}/>        
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
     onSetLoggedIn:(userId, userName, email, token) => dispatch(projectActions.setLoggedIn(userId, userName, email, token)),
     onLogOut: () => dispatch(projectActions.logout()),
     onClearRecoStore: () => dispatch(projectActions.clearRecoStore()),
     onClearSegmentStore: () => dispatch(projectActions.clearSegmentStore()),
     onClearPreviewStore: () => dispatch(projectActions.clearPreviewStore()),
     onOpenDemoSession: () => dispatch(projectActions.openDemoSession()),
     addContainerToReco: (container) => dispatch(projectActions.addContainerToReco(container)),
     openContainerInRecoPreview: (container) => dispatch(projectActions.openContainerInRecoPreview(container)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(ProjectPage));
