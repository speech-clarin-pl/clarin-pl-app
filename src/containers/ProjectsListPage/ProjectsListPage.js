import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import ProjectListItem from './ProjectListItem/ProjectListItem';
import LeftSiteBar from '../ProjectPage/LeftSiteBar/LeftSiteBar';
import ProjectsList from './ProjectsList/ProjectList';
import TopBar from '../../components/TopBar/TopBar';
import { Route } from 'react-router-dom';
import ProjectPage from '../ProjectPage/ProjectPage';
import Modal from '../../components/UI/Modal/Modal';
import { connect } from 'react-redux';
import * as projectListActions from '../../store/actions/index';
import ButtonLeftBar from '../../components/UI/ButtonLeftBar/ButtonLeftBar';
import Spinner from '../../components/UI/Spinner/Spinner';
import SingleInputForm from '../../components/UI/SingleInputForm/SingleInputForm';

class ProjectsListPage extends Component {

  state = {
    modalDisplay: false,
    newProjectName: '',
  }


  componentDidMount = () => {
    this.props.onGetProjectsList("jakisUserId");
    //pobieram z serwera liste projektow
    // axios.get('/userProjest.json')
    //   .then(response => {
    //console.log(response);
    //       this.setState({projects: response.data});
    //   })
    //   .catch(error => {
    // console.log(error);
    //    this.setState({error: true});
    //  });
  }

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

  wyborProjektuHandler = (projektIndex) => {


    //console.log("wybralem projekt" + projektIndex);

    //poszukuje teraz obiektu ze stanu z danym indexem
    /*
    let idxPoszukiwanego = 0;
    this.state.projects.map((projekt,i) => {
      if(projekt.id === projektIndex) return idxPoszukiwanego=i;
    });
 
    //kopiuje teraz do aktywnego wybrany projekt przez usera
    const projects = [...this.state.projects];
    this.setState({
      whichProjectActive: projects[idxPoszukiwanego],
    });
    */

    //const currlocation = this.props.match.url;

    //wrzucam parametry do URL
    const queryParams = [];

    this.props.history.push({
      pathname: "/projects/" + encodeURIComponent(projektIndex),
      search: '',
      key: encodeURIComponent(projektIndex)
    });
  }

  //prosty validator...
  checkValidity = (value) => {
    let isValid = true;

    //bardzo prosta validacja - trzeba napisac lepsza
    //nie moze byc puste i musi miec min. 3 znaki
    isValid = value.trim() !== '' && isValid;

    isValid = value.length >= 3 && isValid;

    return isValid;
  }

  addNewProjectHandler = (event) => {
    event.preventDefault();
    // dodaje nowy projekt tutaj TO DO
    let formIsValid = this.checkValidity(this.state.newProjectName);
    //console.log(formIsValid);
    
    if(formIsValid){
      console.log(this.state.newProjectName)
      this.props.onNewProject(this.state.newProjectName);
      
    } else {
      //wyswietl komunikat
    }
  }

  
  onNewProjectDone = () => {
    this.closeModalHandler()
  }

  newProjectNameChangeHandler = (event) => {
    //console.log(event.target.value)
    this.setState({
      newProjectName: event.target.value,
    })
  }

  openModalHandler = () => {
    this.setState({
      modalDisplay: true,
    })
  }

  closeModalHandler = () => {
    this.setState({
      modalDisplay: false,
    })
  }

  

  render() {

    //formularz dodawania nazwy dla nowego projektu
    const newProjectForm = (
      <Aux>
        <SingleInputForm
          onSubmitHandler={this.addNewProjectHandler}
          onChangeHandler={this.newProjectNameChangeHandler}
          placeholder="Podaj nazwe projektu"
          buttonLabel="Dodaj projekt"
        />
      </Aux>
    );

    //lewy sidebar
    const leftSiteBar = (
      <LeftSiteBar czyTopPart={false} desc="Tutaj opis do listy projektow" >
        <ButtonLeftBar
          customeStyle={{ height: '50px' }}
          napis="Dodaj projekt"
          iconType="fa-plus"
          whenClicked={this.openModalHandler} />
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

        projectList = this.props.projectList
          .map((projekt, i) => {
            //console.log(projekt)
            return <ProjectListItem
              key={projekt._id}
              projektID={projekt.id}
              title={projekt.name}
              owner={projekt.owner}
              modified={projekt.modified}
              wyborprojektu={() => this.props.onProjectChoice(projekt.id)}
              duplicateProject={() => this.props.onDuplicate(projekt.id)}
              editName={() => this.props.onNameEdit(projekt.id)}
              shareProject={() => this.props.onShare(projekt.id)}
              deleteProject={() => this.props.onDelete(projekt.id)}
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
          show={this.state.modalDisplay}
          modalClosed={this.closeModalHandler}
          title="Nowy projekt">
          {newProjectForm}
        </Modal>


        <TopBar
          version="init"
          wide="yes"
          language="pl"
          projectTitle=""
          changeLn={this.props.changeLn}
          currLn={this.props.currLn} />




        {leftSiteBar}

        {toDisplay}

      </Aux>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    newProjectCreated: state.prolistR.loaded,
    projectList: state.prolistR.projects,
    ifError: state.prolistR.error,
    ifProjectsLoading: state.prolistR.projectsLoading,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    
    onNewProjectDone: () => dispatch(projectListActions.addNewProjectDone()),
    onNewProject: (projectName) => dispatch(projectListActions.addNewProject(projectName)),
    onProjectChoice: (projectId) => dispatch(projectListActions.projectChoice(projectId)),
    onDuplicate: (projectId) => dispatch(projectListActions.duplicateProject(projectId)),
    onShare: (projectId) => dispatch(projectListActions.shareProject(projectId)),
    onDelete: (projectId) => dispatch(projectListActions.deleteProject(projectId)),
    onNameEdit: (projectId) => dispatch(projectListActions.editName(projectId)),
    onGetProjectsList: (userId) => dispatch(projectListActions.getProjectsList(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsListPage);

