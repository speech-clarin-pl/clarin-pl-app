import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import ProjectListItem from './ProjectListItem/ProjectListItem';
import LeftSiteBar from '../ProjectPage/LeftSiteBar/LeftSiteBar';
import ProjectsList from './ProjectsList/ProjectList';
import TopBar from '../../components/TopBar/TopBar';
import {withRouter, Route } from 'react-router-dom';
import ProjectPage from '../ProjectPage/ProjectPage';
import Modal from '../../components/UI/Modal/Modal';
import { connect } from 'react-redux';
import * as projectListActions from '../../store/actions/index';
import ButtonLeftBar from '../../components/UI/ButtonLeftBar/ButtonLeftBar';
import Spinner from '../../components/UI/Spinner/Spinner';
import SingleInputForm from '../../components/UI/SingleInputForm/SingleInputForm';
import ConfirmationForm from '../../components/UI/ConfirmationForm/ConfirmationForm';

import {injectIntl, FormattedMessage} from 'react-intl';

const localActions = {
  CREATE_NEW_PROJECT: 'CREATE_NEW_PROJECT',
  EDIT_NAME_PROJECT: 'EDIT_NAME_PROJECT',
  DELETE_PROJECT: 'DELETE_PROJECT',
}

class ProjectsListPage extends Component {

  state = {
    modalDisplay: false,
    newProjectName: '',
    modalTitle: '', //tytutl okna modalnego
    currentValue: '', //wpisywany do okna modalnego
  }


  componentDidMount = () => {
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
    const remainingMilliseconds =
    new Date(expiryDate).getTime() - new Date().getTime();

    this.props.onSetLoggedIn(userId,userName, email, token);
    //this.setState({ isAuth: true, token: token, userId: userId });
    //this.setAutoLogout(remainingMilliseconds);
    
    this.props.onGetProjectsList(userId, token);

  }

  // logoutHandler = () => {
  //   this.props.onLogout();
  // };

  // setAutoLogout = milliseconds => {
  //   setTimeout(() => {
  //     this.logoutHandler();
  //   }, milliseconds);
  // };

  duplicateProjectHandler = (projectIndex) => {
    alert('duplicate');
  }

  editNameProjectHandler = (projectIndex) => {
    alert('edit');
  }

  shareProjectHandler = (projectIndex) => {
    alert('share');
  }

  removeProjectHandler = (projectIndex) => {
    alert('remove');
  }

  // wyborProjektuHandler = (projektIndex, projectName) => {
  //   //const currlocation = this.props.match.url;
  //   //wrzucam parametry do URL
  //   const queryParams = [];
  //   this.props.history.push({
  //     pathname: "/projects/" + encodeURIComponent(projektIndex),
  //     search: '',
  //     key: encodeURIComponent(projektIndex)
  //   });
  // }

  //prosty validator...
  checkValidity = (value) => {
    let isValid = true;

    //bardzo prosta validacja po stronie przegladarki
    //taka sama jest po stronie serwera
    //nie moze byc puste i musi miec min. 3 znaki
    isValid = value.trim() !== '' && isValid;
    //isValid = value.length >= 3 && isValid;

    return isValid;
  }

  addNewProjectHandler = (event) => {
   
    event.preventDefault();
    // dodaje nowy projekt tutaj TO DO
    let formIsValid = this.checkValidity(this.state.newProjectName);

    
    if(formIsValid){
      this.props.onNewProject(this.state.newProjectName, this.props.userId, this.props.token);
    } 
  }


  newProjectNameChangeHandler = (event) => {
    event.preventDefault();
    this.setState({
      newProjectName: event.target.value,
    })
  }

  editProjectNameSubmitHandler = (event) => {
    event.preventDefault();
    this.props.onNameEdit(
      this.props.projectId, 
      this.state.newProjectName,
      this.props.userId,
      this.props.token)
  }

  
  onNewProjectDone = () => {
    this.closeModalHandler()
  }


  //otwiera okno modalne
  openModalHandler = (actionType, projectId, projectName) => {
    this.setState({
      newProjectName: projectName,
    })
    this.props.onOpenModalHandler(actionType,projectId, projectName);
  }

  //zamyka okno modalne
  closeModalHandler = () => {
    this.props.onCloseModalHandler();
  }

  removeProjectHandler = (projectId) => {
    this.props.onDelete(projectId, this.props.userId, this.props.token);
  }

  wyborProjektuOK = (projektId, projektName, projektOwner) => {

    this.props.onProjectChoice(projektId, projektName, projektOwner);
    this.props.onInitProjectHandler(projektId,projektName,projektOwner);

   
    this.props.history.push("/projects/"+projektId);
  }

  
  render() {

    //tworze formularz ktory pokaze sie w oknie modalnym
    //w zaleznosci ktory przycisk zostal wcisniety

    //formularz dodawania nazwy dla nowego projektu
    const newProjectForm = (
      <Aux>
        <SingleInputForm
          onSubmitHandler={this.addNewProjectHandler}
          onChangeHandler={this.newProjectNameChangeHandler}
          title={
            this.props.intl.formatMessage(
                {
                  id:"ProjectsListPage-AddProjectHeaderInput",
                  description: 'Nagłówek w oknie do wpisywania nazwy projektu', 
                  defaultMessage: 'Stwórz nowy projekt', 
                }
              )
          }
          placeholder={
            this.props.intl.formatMessage(
                {
                  id:"ProjectsListPage-AddProjectFormPlaceholder",
                  description: 'Placeholder w oknie do wpisywania nazwy projektu', 
                  defaultMessage: 'Podaj nazwę projektu', 
                }
              )
          }
          buttonLabel={
            this.props.intl.formatMessage(
                {
                  id:"ProjectsListPage-AddProjectButtonForm",
                  description: 'Button w oknie do wpisywania nazwy projektu', 
                  defaultMessage: 'Stwórz projekt', 
                }
              )
          }
          value = {this.state.newProjectName}
          errorMessage = {this.props.errorMessage}
        />
      </Aux>
    );

    //formularz edycji nazwy projektu
    const editProjectName = (
      <Aux>
        <SingleInputForm
          onSubmitHandler={this.editProjectNameSubmitHandler}
         // onSubmitHandler={this.props.onNameEdit(this.props.projectId, this.state.newProjectName)}
          //onSubmitHandler={this.props.onNameEdit(this.props.projectId, this.state.newProjectName)}
          onChangeHandler={this.newProjectNameChangeHandler}
          title="Edytuj nazwe projektu"
          placeholder="Zmie nazwe projektu"
          buttonLabel="Zmien"
          value = {this.state.newProjectName}
          errorMessage = {this.props.errorMessage}
        />
      </Aux>
    );

    const deleteProject = (
      <Aux>
        <ConfirmationForm
          messageQuestion={
            this.props.intl.formatMessage(
                {
                  id:"ProjectsListPage-RemoveProjectQuestion",
                  description: 'Pytanie czy na pewno chcesz usunac projekt', 
                  defaultMessage: 'Czy na pewno chcesz usunac poniższy projekt? Wraz z nim zostaną usunięte wszystkie pliki audio oraz transkrypcje!', 
                }
              )
          }
          onCancel={this.closeModalHandler}
          onOk = {()=>this.props.onDelete(this.props.projectId, this.props.userId, this.props.token)}

          projectName = {this.props.projectName}
        />
      </Aux>
    );

    let modalContent = null;
  

    switch(this.props.localAction){
      case(localActions.CREATE_NEW_PROJECT):
        modalContent = newProjectForm;
        break;
      case(localActions.EDIT_NAME_PROJECT):
        modalContent = editProjectName;
        break;
      case(localActions.DELETE_PROJECT):
        modalContent = deleteProject;
        break;
      default:
        modalContent = <p>Bledny typ akcji lokalnej</p>
    }
    

    //lewy sidebar
    const leftSiteBar = (
      <LeftSiteBar czyTopPart={false} 
        desc={
          this.props.intl.formatMessage(
              {
                id:"ProjectsListPage-description",
                description: 'Opis widoku dodawania projektow', 
                defaultMessage: 'W tym miejscu można tworzyć własne projekty które stanowią przestrzeń roboczą dla wgranych plików. UWAGA! w przypadku usunięcia projektu, zostaną usunięte wszystkie wgrane do niego pliki!', 
              }
            )
        }
        
       
         >
        <ButtonLeftBar
          customeStyle={{ height: '50px' }}
          napis={
            this.props.intl.formatMessage(
                {
                  id:"ProjectsListPage-addProjectBtn",
                  description: 'Opis w przycisku do dodawania korpusu', 
                  defaultMessage: 'Stwórz projekt', 
                }
              )
          }
          iconType="fa-plus"
          whenClicked={(actionType)=>this.openModalHandler(localActions.CREATE_NEW_PROJECT,'','')} />
      </LeftSiteBar>
    )

    //co wyswietlic
    let toDisplay = null;

    //sama lista projektow
    let projectList = null;

    if (!this.props.ifError) {
      //console.log(this.props.ifProjectsLoading)
      //jak nie ma error to sprawdzam czy sie laduja dane
      if (this.props.ifProjectsLoading) {
        toDisplay = <Spinner />
      } else {

       // console.log(this.props.projectList);

        projectList = this.props.projectList
          .map((projekt, i) => {
            //console.log(projekt)
            return <ProjectListItem
              key={projekt._id}
              projektID={projekt._id}
              title={projekt.name}
              owner={projekt.owner}
              modified={projekt.projectCreated}
              deleteProject={(actionType,projectId, projectName)=>this.openModalHandler(localActions.DELETE_PROJECT, projekt._id, projekt.name)}
              //deleteProject={(actionType,projectId, projectName)=>this.openModalHandler(localActions.DELETE_PROJECT, projekt._id, projekt.name)}
              wyborprojektu = {(projektId, projektName, projektOwner)=>this.wyborProjektuOK(projekt._id, projekt.name, projekt.owner)}
              //wyborprojektu={() => this.props.onProjectChoice(projekt._id, projekt.name, projekt.owner)}
              //duplicateProject={() => this.props.onDuplicate(projekt._id)}
              editName={(actionType,projectId, projectName)=>this.openModalHandler(localActions.EDIT_NAME_PROJECT,projekt._id, projekt.name)}
   
              //shareProject={() => this.props.onShare(projekt._id)}
             // deleteProject={() => this.props.onDelete(projekt._id, this.props.userId, this.props.token)}
            />
          });

        toDisplay = (
          <ProjectsList siteBar={leftSiteBar}>

            {projectList}

          </ProjectsList>
        );

      }

    } else {
      //kiedy jest error
      toDisplay = <p className="error">Error with connecting to server</p>;
    }


    return (
      <Aux>

        <Route path="/project/" render={(props) => (
          <ProjectPage {...props} />
        )} />


        <Modal
          show={this.props.modalDisplay}
          modalClosed={this.closeModalHandler}
          >
            {modalContent}
        </Modal>


        <TopBar
          version="init"
          wide="yes"
          language="pl"
          projectTitle=""
          ifTourLink={false}
          ifContactToAdmin={true}
          ifLogOut={true}
          ifAPI={true}
          changeLn={this.props.changeLn}
          currLn={this.props.currLn} />

          {
          //leftSiteBar
          }

          {
            toDisplay
          }

      </Aux>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    userId: state.homeR.userId,
    userName: state.homeR.userName,
    token: state.homeR.token,
    localAction: state.prolistR.localAction,
    modalDisplay: state.prolistR.modalDisplay,
    newProjectCreated: state.prolistR.loaded,
    projectList: state.prolistR.projects,
    ifError: state.prolistR.error,
    errorMessage: state.prolistR.errorMessage,
    ifProjectsLoading: state.prolistR.projectsLoading,
    projectId: state.prolistR.projectId,  //wiem ktorego projektu dotyczy kliknieta akcja
    projectName: state.prolistR.projectName,  //oraz jaka jest nazwa obecnego projektu
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onInitProjectHandler: (projectId, projectTitle, projectOwner) => dispatch(projectListActions.initProject(projectId, projectTitle, projectOwner)),
    onOpenModalHandler: (actionType,projectId, projectName) => dispatch(projectListActions.openModal(actionType,projectId, projectName)),
    onCloseModalHandler: () => dispatch(projectListActions.closeModal()),
    onNewProjectDone: () => dispatch(projectListActions.addNewProjectDone()),
    onNewProject: (projectName, userId, token) => dispatch(projectListActions.addNewProject(projectName, userId, token)),
    onProjectChoice: (projectId, projectName, projectOwner) => dispatch(projectListActions.projectChoice(projectId, projectName, projectOwner)),
   // onDuplicate: (projectId) => dispatch(projectListActions.duplicateProject(projectId)),
   // onShare: (projectId) => dispatch(projectListActions.shareProject(projectId)),
    onDelete: (projectId, userId, token) => dispatch(projectListActions.deleteProject(projectId, userId, token)),
    onNameEdit: (projectId, newProjectName,userId, token) => dispatch(projectListActions.editName(projectId, newProjectName,userId, token)),
    onGetProjectsList: (userId, token) => dispatch(projectListActions.getProjectsList(userId, token)),
    onSetLoggedIn:(userId, userName, email, token) => dispatch(projectListActions.setLoggedIn(userId, userName, email, token)),
    onLogOut: () => dispatch(projectListActions.logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(injectIntl(ProjectsListPage)));

