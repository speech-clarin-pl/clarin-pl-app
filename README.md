This project is written in React js with the usage of [Create React App](https://github.com/facebookincubator/create-react-app). It is the view of new speech proccessing platform, developed as a part of CLARIN project. The current deployment of this platform is available at [https://mowa.clarin-pl.eu:8433/](https://mowa.clarin-pl.eu:8433/). This is the beta version of the new platform. The previous platform is available at [https://mowa.clarin-pl.eu/](https://mowa.clarin-pl.eu/). All features are intended to be developed here. Any suggestions and comment are welcomed.

## How to run the app
In order to run the app, clone the repo and:
* `npm install` install all dependencies
* change the .env.example file into .env and edit environmental variables
* `npm start` runs the development environment

Delopyment is described in [Create React App](https://github.com/facebookincubator/create-react-app). The unique part refers to config.js file in public folder. It contains one variable with the url to the API with which this project is going to communicate. The built bundle will be reading this address from the config.js file!

## General Project Structure

The project was logically divided into state-full and state-less components. Its architecture uses REDUX principles. The project includes the following folders:
 * **src/components/** - contains state-less and utility components like UI components or error pages
 * **src/containers/** - contains state-full components with the core components of the app. It contains subfolders: HomePage, ProjectListPage and ProjectPage. The HomePage contains all components for rendering the home page. ProjectListPage is responsible for managing user's projects and displays the list of the project. ProjectPage is the main page with speech tools available for user after authentication. 
* **store/actions/** - every actions that application can understand and which are are dispating to reducers
* **store/reducers/** - The application uses different reducers for each speech tool and three main pages (homePage, ProjectListPage, Project)
* **translations/** - the folder inteded to store translation for the website
* **utils/** - some utils scripts

## Sending Feedback

We are always open to your feedback. Authors:

 * Mariusz Kleć (mklec@pjwstk.edu.pl): the front-end and API part
 * Danijel Korzinek (danijel@pjwstk.edu.pl): the speech processing tools

