import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import ProjectListItem from './ProjectListItem/ProjectListItem';
import LeftSiteBar from '../../components/LeftSiteBar/LeftSiteBar';
import ProjectsList from './ProjectsList/ProjectList';
import TopBar from '../../components/TopBar/TopBar';
import {Route} from 'react-router-dom';
import ProjectPage from '../ProjectPage/ProjectPage';


class ProjectsListPage extends Component {

    state = {
        projects: [
          {
            id: 'p1',
            title: 'Jakiś tytuł projektu 1',
            owner: 'You',
            modified: '22.03.2019'
          },
          {
            id: 'p2',
            title: 'Jakiś tytuł projektu 2 bla bla',
            owner: 'You',
            modified: '23.03.2019'
          },
          {
            id: 'p3',
            title: 'Jakiś tytuł projektu 3',
            owner: 'You',
            modified: '24.03.2019'
          }
        ]
      };


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

    render() {

        let projectList = this.state.projects
            .map((projekt,i) => {
                return  <ProjectListItem 
                            key={projekt.id} 
                            title={projekt.title}
                            owner={projekt.owner}
                            modified={projekt.modified} 
                            wyborprojektu={() => this.wyborProjektuHandler(projekt.id)}
                            duplicateProject={() => this.duplicateProjectHandler(projekt.id)}
                            editName={() =>  this.editNameProjectHandler(projekt.id)}
                            shareProject={()  => this.shareProjectHandler(projekt.id)}
                            deleteProject={()  => this.removeProjectHandler(projekt.id)}
                            />
            })

         

        //console.log(this.state.whichProjectActive);

        return(
            <Aux>
              
                <Route path="/project/" render={(props) => (
                    <ProjectPage {...props}  />
                )} />


                <TopBar 
                    version="init" 
                    wide="yes" 
                    language="pl" 
                    projectTitle=""
                    changeLn = {this.props.changeLn}
                    currLn = {this.props.currLn} />
                
                <LeftSiteBar czyTopPart="false" />

                <ProjectsList>
                
                {projectList}
                
                </ProjectsList>
            </Aux>
        );
    }
}

export default ProjectsListPage;