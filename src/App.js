import React, {Component} from 'react';
import './App.css';
import HomePage from './containers/HomePage/HomePage';
import {Route, Switch} from 'react-router-dom';
import ProjectPage from './containers/ProjectPage/ProjectPage';
import ProjectsListPage from './containers/ProjectsListPage/ProjectsListPage';
import HelpPage from './components/HelpPage/HelpPage';
import {IntlProvider, addLocaleData} from 'react-intl';

import en from 'react-intl/locale-data/en';
import pl from 'react-intl/locale-data/pl';

import messages_pl from "./translations/pl.json";
import messages_en from "./translations/en.json";

addLocaleData([...en, ...pl]);

const messages = {
  'pl': messages_pl,
  'en': messages_en
};

const language = navigator.language.split(/[-_]/)[0];  // language without region code

class App extends Component{

  state = {
    currln: "pl",
  }

 

  changeLnHandler=(ln)=>{
    this.setState({
      currln: ln,
    })
  }

  render(){

    

    return (
      <div className="App">
        <IntlProvider locale={this.state.currln} defaultLocale="pl" messages={messages[this.state.currln]}>
            <Switch>

                    

                   

                    <Route path="/projects/:projectID" render={(props) => (
                       <ProjectPage {...props} 
                            changeLn={this.changeLnHandler}
                            currLn = {this.state.currln} />
                    )}/>

                  <Route path="/projects" render={(props) => (
                       <ProjectsListPage {...props} 
                            changeLn={this.changeLnHandler} 
                            currLn = {this.state.currln}/>
                    )}/>


                    <Route path="/help" render={(props) => (
                       <HelpPage {...props} 
                            changeLn={this.changeLnHandler}
                            currLn = {this.state.currln} />
                    )}/>
                    <Route path="/" render={(props) => (
                       <HomePage {...props} 
                            changeLn={this.changeLnHandler}
                            currLn = {this.state.currln} />
                    )}/>
            </Switch>
        </IntlProvider>
      </div>
    );
  }

 
}

export default App;
