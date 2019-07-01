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

        let liczbaPlikowRepo = this.props.repoFiles.length;
        let miejscePlikowRepo = 0;
        this.props.repoFiles.map(file => {
            return miejscePlikowRepo = miejscePlikowRepo + file.size;
        });

        return(
            <Aux>
    
                <LeftSiteBar 
                    czyTopPart="true"
                    desc="Tutaj opis do dashoardu" />
    
                <SettingBar />
    
    
                <section className={"Content"} data-scrollbar>
    
                    <div className={["container-fluid", "Dashboard"].join(' ')}>
                    <div className="tool-desc">
                        <p>Tutaj opis narzędzia. Mauris consequat ipsum fermentum massa finibus condimentum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean maximus tellus consequat, ultrices mi vel, efficitur dui. Quisque at venenatis ante. Nullam luctus dictum odio semper tempus. Proin eu lorem non diam iaculis egestas ac non tortor. Nullam viverra luctus leo in mollis.</p>
                    </div>
    
                    <div className="tool-body">
    
                    
                        <div className="row">
                            <div className="col-md-6">
                                <div className="card mb-3">
                                    <div className={["card-header", "cardHeader"].join(' ')}>Aktualności</div>
                                    <div className="card-body text-dark">
                                    <h5 className="news-title">Wersja beta nowego serwisu </h5>
                                    <div className="news-date">02.07.2019</div>
                                    <p className="news-body">Miło nam przywitać Cię w panelu nowego serwisu który właśnie wystartował. Wszelkie uwagi na temat jego funkcjonowania beda mile widziane. Kontakt do developerow: Danijel Korzinek: danijel@pjwstk.edu.pl, Mariusz KLec: mklec@pjwstk.edu.pl</p>
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
                                            <p>Całkowita licza plików w kolejce: ({this.props.filesToUploadRec.length})</p>
                                            
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
                                                {this.props.segmentEntry.length}))</p>
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
                                        <p> Zajmowana pamiec: ({bytesToSize(miejscePlikowRepo)})</p>
                                     
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
    
                
    
                    <p> Mauris consequat ipsum fermentum massa finibus condimentum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean maximus tellus consequat, ultrices mi vel, efficitur dui. Quisque at venenatis ante. Nullam luctus dictum odio semper tempus. Proin eu lorem non diam iaculis egestas ac non tortor. Nullam viverra luctus leo in mollis.</p>
                                
                    </div>
    
                    <FooterTool />
    
                </section>
    
                
            </Aux>
        );
    }


}

const mapStateToProps = (state) => {
    return {
        filesToUploadRec: state.recR.filesToUpload, //pliki do rozpoznawania
        segmentEntry: state.segR.segmentEntry, //pliko do segmentacji 
        repoFiles: state.repoR.files,
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      //onOpenModalHandler: (actionType,projectId, projectName) => dispatch(projectListActions.openModal(actionType,projectId, projectName)),
 
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dashboard));

