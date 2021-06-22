import React, {Component} from 'react';
import Aux from '../../../hoc/Auxiliary';
import SettingBar from '../SettingBar/SettingBar';
import './Dashboard.css';
import FooterTool from '../FooterTool/FooterTool';
import LeftSiteBar from '../LeftSiteBar/LeftSiteBar';
import { connect } from 'react-redux';
import {withRouter, Link } from 'react-router-dom';
import * as projectActions from '../../../store/actions/index';
import {bytesToSize} from '../../../utils/utils';
import G2PTool from '../G2PTool/G2PTool';
import KWSTool from '../KWSTool/KWSTool';
//import {bytesToSize} from '../../../utils/utils';

class Dashboard extends Component {

    componentDidMount(){
        this.props.onGetRepoStats(this.props.projectId, this.props.token);
    }
      
    render(){


        return(
            <Aux>
    
                <LeftSiteBar 
                    czyTopPart="true"
                    desc="W tym miejscu znajdują się statystyki przestrzeni zajmowanej przez wgrane pliki do repozytorium oraz pomocne skróty." />
    
                <SettingBar />
    
    
                <section className={"Content"} data-scrollbar>
    
                    <div className={["container-fluid", "Dashboard"].join(' ')}>
                    <div className="tool-desc">

                       
                        
                    </div>
    
                    <div className="tool-body">
    
                    
                        <div className="row">
                            <div className="col-md-6">
                                <div className="card mb-3">
                                    <div className={["card-header", "cardHeader"].join(' ')}>Aktualności</div>
                                    <div className="card-body text-dark">
                                    <h5 className="news-title">Wersja beta nowego serwisu </h5>
                                    <div className="news-date">01.07.2021</div>
                                    <p className="news-body">
                                        Miło nam przywitać Cię w panelu nowego serwisu. <b>Wszelkie uwagi na temat jego funkcjonowania </b> są mile widziane. Skontaktuj się z nami jeżeli masz jakiekolwiek pytania:
                                    </p>
                                    <p>
                                    Danijel Korzinek: danijel@pjwstk.edu.pl <br></br>
                                    Mariusz Kleć: mklec@pjwstk.edu.pl
                                    </p>
                                    </div>
                                </div>
                            </div>
                            
                            {
                            /*
                            <div className="col-md-6">

                                <div className="card mb-3">
                                    <div className={["card-header", "cardHeader"].join(' ')}>Szybkie linki</div>
                                    <div className="card-body text-dark">
                                        <p> 
                                                <button type="button" className="btn btn-primary btn-block op-btn" onClick={()=>alert("test")}>
                                                    <i className="fas fa-comments"></i> Szybki przewodnik
                                                </button>
                                        </p>
                                        
                                        <p> 
                                            <a href="/docs/doc.html" target="_blank">
                                                <button type="button" className="btn btn-primary btn-block op-btn">
                                                    <i className="fas fa-comments"></i> Instrukcja obsługi
                                                </button>
                                            </a>
                                        </p>
                                        <p> 
                                            <a href="/apidoc/index.html" target="_blank">
                                                <button type="button" className="btn btn-primary btn-block op-btn">
                                                    <i className="fas fa-comments"></i> Dokumentacja API
                                                </button>
                                            </a>
                                        </p>
                                        <p> 
                                                <button type="button" className="btn btn-primary btn-block op-btn" onClick={()=>alert("test")}>
                                                    <i className="fas fa-comments"></i> Zgłoś awarię bądź sugestię
                                                </button>
                                        </p>
                                        <p> 
                                                <button type="button" className="btn btn-primary btn-block op-btn" onClick={()=>alert("test")}>
                                                    <i className="fas fa-comments"></i> Wyloguj
                                                </button>
                                        </p>
                                    </div>
                                </div>      
                                
                            </div>
                            */
                            }

                        

                            <div className="col-md-6">
                                <div className="card mb-3">
                                    <div className={["card-header", "cardHeader"].join(' ')}>Użycie repozytorium</div>
                                    <div className="card-body text-dark">
                                        <p> Liczba kontenerów w repozytorium: {this.props.repoStats? this.props.repoStats.containersNumber: null}</p>
                                        <p> Zajmowana pamiec przez wgrane pliki: {this.props.repoStats? bytesToSize(this.props.repoStats.weightOfOryginal): null}</p>
                                        <p> Zajmowana pamiec przez przekonwertowane pliki: {this.props.repoStats? bytesToSize(this.props.repoStats.weightOfConverted): null}</p>
                                        <p> Całkowieta zajmowana pamięć repozytorium: {this.props.repoStats? bytesToSize(this.props.repoStats.totalWeight): null}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card mb-3">
                                    <div className={["card-header", "cardHeader"].join(' ')}>Transkrypcja Wyrazów</div>
                                    <div className="card-body text-dark">
                                        <G2PTool />
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="card mb-3">
                                    <div className={["card-header", "cardHeader"].join(' ')}>Detekcja Słów Kluczowych</div>
                                    <div className="card-body text-dark">
                                        <KWSTool />
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>

                                
                    </div>
    
                    <FooterTool />
    
                </section>
    
                
            </Aux>
        );
    }


}

const mapStateToProps = (state) => {
    return {
        containersForREC: state.recR.containersForREC, //pliki do rozpoznawania
        containersForSEG: state.segR.containersForSEG, //pliko do segmentacji 
        repoFiles: state.repoR.files,
        repoStats: state.repoR.repoStats,
        token: state.homeR.token,
        projectId: state.projectR.currentProjectID,
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      //onOpenModalHandler: (actionType,projectId, projectName) => dispatch(projectListActions.openModal(actionType,projectId, projectName)),
        onGetRepoStats: (projectId, token) => dispatch(projectActions.getRepoStats(projectId, token)),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dashboard));

