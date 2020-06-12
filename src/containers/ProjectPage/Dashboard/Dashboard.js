import React, {Component} from 'react';
import Aux from '../../../hoc/Auxiliary';
import SettingBar from '../SettingBar/SettingBar';
import './Dashboard.css';
import FooterTool from '../FooterTool/FooterTool';
import LeftSiteBar from '../LeftSiteBar/LeftSiteBar';
import { connect } from 'react-redux';
import {withRouter, Link } from 'react-router-dom';
import {bytesToSize} from '../../../utils/utils';

class Dashboard extends Component {

      

    render(){

        //let liczbaPlikowRepo = this.props.repoFiles.length;
        let liczbaPlikowRepo = 0;
        let miejscePlikowRepo = 0;
       // this.props.repoFiles.map(file => {
       //     return miejscePlikowRepo = miejscePlikowRepo + file.size;
       // });

        return(
            <Aux>
    
                <LeftSiteBar 
                    czyTopPart="true"
                    desc="W tym miejscu znajdują się statystyki aktualnie wykonywanych usług oraz przestrzeni zajmowanej przez wgrane pliki do repozytorium." />
    
                <SettingBar />
    
    
                <section className={"Content"} data-scrollbar>
    
                    <div className={["container-fluid", "Dashboard"].join(' ')}>
                    <div className="tool-desc">

                        <div className="alert alert-info" role="alert">
                            Obecnie funkcjonują dwie usługi: rozpoznawanie mowy oraz segmentacja. Eksportowanie do środowiska EMU-SDMS jest w fazie rozwoju. Wszystkie usługi dostępne są jednak w obecnie funkcjonującej ("starszej") stronie  <a href="http://mowa.clarin-pl.eu/tools/" target="blank">http://mowa.clarin-pl.eu</a>.
                        </div>
                        
                    </div>
    
                    <div className="tool-body">
    
                    
                        <div className="row">
                            <div className="col-md-6">
                                <div className="card mb-3">
                                    <div className={["card-header", "cardHeader"].join(' ')}>Aktualności</div>
                                    <div className="card-body text-dark">
                                    <h5 className="news-title">Wersja beta nowego serwisu </h5>
                                    <div className="news-date">02.07.2019</div>
                                    <p className="news-body">
                                        Miło nam przywitać Cię w panelu nowego serwisu. <b>Wszelkie uwagi na temat jego funkcjonowania </b> są mile widziane. Skontaktuj się z nami jeżeli masz jakiekolwiek pytania:
                                    </p>
                                    <p>
                                    Danijel Korzinek: danijel@pjwstk.edu.pl <br></br>
                                    Mariusz KLec: mklec@pjwstk.edu.pl
                                    </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card mb-3">
                                    <div className={["card-header", "cardHeader"].join(' ')}>Aktualnie działające procesy</div>
                                    <div className="card-body text-dark">
    
                                    <div className="row mb-3">
                                        <div className="col">
                                            <h5 className="news-title">Rozpoznawanie:</h5>
                                            <p>Całkowita licza plików w kolejce: ({this.props.containersForREC.length})</p>
                                            
                                            {
                                                /*
                                            <p>Procent przetworzonych plików:</p>
                                            <div className="progress">
                                                <div className="progress-bar" role="progressbar"  aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
                                            </div>
                                                */
                                            }
                                            
                                        </div>
                                    </div>
    
                                    <div className="row">
                                        <div className="col">
                                            <h5 className="news-title">Segmentacja:</h5>
                                            <p>Całkowita licza plików w kolejce: (
                                                {this.props.containersForSEG.length}))</p>
                                            {
                                                /*
                                                <p>Procent przetworzonych plików:</p>
                                                <div className="progress">
                                                    <div className="progress-bar" role="progressbar" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100">25%</div>
                                                </div>
                                                */
                                            }
                                            
                                        </div>
                                    </div>
                                    
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
    
                        <div className="row">
                            <div className="col-md-6">
                                <div className="card mb-3">
                                    <div className={["card-header", "cardHeader"].join(' ')}>Użycie repozytorium</div>
                                    <div className="card-body text-dark">
                                        <p> Liczba plikow w repozytorium: ({liczbaPlikowRepo})</p>
                                        {
                                        
                                        //<p> Zajmowana pamiec: ({bytesToSize(miejscePlikowRepo)})</p>

                                        }
                                     
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card mb-3">
                                    <div className={["card-header", "cardHeader"].join(' ')}>Szybkie linki</div>
                                    <div className="card-body text-dark">
                                      
                                      <p> 
                                        <Link to={this.props.location.pathname.replace('dashboard','recognition')}>
                                            <button type="button" className="btn btn-primary btn-block op-btn">
                                                <i className="fas fa-comments"></i> Rozpoznawanie mowy
                                            </button>
                                        </Link>
                                      </p>
                                      <p>
                                        <Link to={this.props.location.pathname.replace('dashboard','segment')}>
                                            <button type="button" className="btn btn-primary btn-block op-btn">
                                                <i className="fas fa-cogs"></i> Segmentacja</button>
                                        </Link>
                                      </p>
                                      <p>
                                        <Link to="/help"> 
                                             <button type="button" className="btn btn-primary btn-block op-btn"><i className="fas fa-question-circle"></i> Pomoc</button>
                                        </Link>
                                     </p>
                                    </div>
                                </div>
                            </div>
                        </div>
    
    
                    </div>
    
                
    
                    <p> </p>
                                
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
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      //onOpenModalHandler: (actionType,projectId, projectName) => dispatch(projectListActions.openModal(actionType,projectId, projectName)),
 
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dashboard));

