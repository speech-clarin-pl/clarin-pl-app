import React, { Component } from 'react';
import './App.css';
import HomePage from './containers/HomePage/HomePage';
import RegisterConfirmationPage from './containers/RegisterConfirmationPage/RegisterConfirmationPage';
import { Route, Switch } from 'react-router-dom';
import ProjectPage from './containers/ProjectPage/ProjectPage';
import ProjectsListPage from './containers/ProjectsListPage/ProjectsListPage';
import HelpPage from './components/HelpPage/HelpPage';
import { IntlProvider, addLocaleData } from 'react-intl';
import { connect } from 'react-redux';
import * as homeActions from './store/actions/index';
import NewPasswordPage from './containers/NewPasswordPage/NewPasswordPage';
import { withRouter} from 'react-router-dom';

import en from 'react-intl/locale-data/en';
import pl from 'react-intl/locale-data/pl';

import messages_pl from "./translations/pl.json";
import messages_en from "./translations/en.json";

addLocaleData([...en, ...pl]);

const messages = {
  'pl': messages_pl,
  'en': messages_en
};

//do wywoływania ekstrakcji języka
//npm run extract -- 'src/**/*.js' --out-file src/translations/pl_temp.json --id-interpolation-pattern '[sha512:contenthash:base64:6]'

class App extends Component {

  state = {
    currln: "pl",
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    const email = localStorage.getItem('email');

    if (!token || !expiryDate) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      this.logoutHandler();
      return;
    }
    
    const remainingMilliseconds = new Date(expiryDate).getTime() - new Date().getTime();
    this.props.onSetLoggedIn(userId, userName, email, token)
    //this.setState({ isAuth: true, token: token, userId: userId });
    this.setAutoLogout(remainingMilliseconds);
  }

  logoutHandler = () => {
    this.props.onLogout();
  };

  setAutoLogout = milliseconds => {
    setTimeout(() => {
      this.logoutHandler();
    }, milliseconds);
  };

  changeLnHandler = (ln) => {
    this.setState({
      currln: ln,
    })
  }

  render() {

    return (
      <div className="App">
        <IntlProvider locale={this.props.language} defaultLocale="pl" messages={messages[this.props.language]}>


          <Switch>

            <Route path="/enterNewPass/:userId/:token" render={({match}) => (
              <NewPasswordPage 
                userId={match.params.userId} 
                token={match.params.token}
                currLn={this.state.currln} />
            )} />

            <Route path="/confirmRegistration/:confirmationCode" render={(props) => (
              <RegisterConfirmationPage {...props}
                currLn={this.state.currln} />
            )} />

            <Route path="/projects/:projectID" render={(props) => (
              <ProjectPage {...props}
                changeLn={this.changeLnHandler}
                currLn={this.state.currln} />
            )} />

            <Route path="/projectsList" render={(props) => (
              <ProjectsListPage {...props}
                changeLn={this.changeLnHandler}
                currLn={this.state.currln} />
            )} />

            <Route path="/help" render={(props) => (
              <HelpPage {...props}
                changeLn={this.changeLnHandler}
                currLn={this.state.currln} />
            )} />

            <Route path="/" render={(props) => (
              <HomePage {...props}
                changeLn={this.changeLnHandler}
                currLn={this.state.currln} />
            )} />
          </Switch>
        </IntlProvider>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.homeR.isAuth,
    chosenProjectID: state.prolistR.chosenProjectID,
    language: state.homeR.language,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(homeActions.logout()),
    onSetLoggedIn: (userId, userName, email, token) => dispatch(homeActions.setLoggedIn(userId, userName, email, token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
