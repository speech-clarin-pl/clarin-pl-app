import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import SettingBar from '../SettingBar/SettingBar';
import './Dashboard.css';
import FooterTool from '../FooterTool/FooterTool';
import LeftSiteBar from '../LeftSiteBar/LeftSiteBar';


const dashboard = (props) => {

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
                                <h5 className="news-title">Dark card title </h5>
                                <div className="news-date">02.02.2019</div>
                                <p className="news-body">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
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
                                        <div className="progress">
                                            <div className="progress-bar" role="progressbar"  aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col">
                                        <h5 className="news-title">Segmentacja:</h5>
                                        <div className="progress">
                                            <div className="progress-bar" role="progressbar" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100">25%</div>
                                        </div>
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
                                Tutaj jakiś wykres użycia repozytorium TO DO
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card mb-3">
                                <div className={["card-header", "cardHeader"].join(' ')}>Szybkie linki</div>
                                <div className="card-body text-dark">
                                <button type="button" className="btn btn-primary btn-block op-btn"><i className="fas fa-comments"></i> Rozpoznawanie mowy</button>
                                <button type="button" className="btn btn-primary btn-block op-btn"><i className="fas fa-cogs"></i>Segmentacja</button>
                                <button type="button" className="btn btn-primary btn-block op-btn"><i className="fas fa-keyboard"></i>Transkrypcje</button>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>

            

                <p>Tutaj opis narzędzia. Mauris consequat ipsum fermentum massa finibus condimentum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean maximus tellus consequat, ultrices mi vel, efficitur dui. Quisque at venenatis ante. Nullam luctus dictum odio semper tempus. Proin eu lorem non diam iaculis egestas ac non tortor. Nullam viverra luctus leo in mollis.</p>

                <p>Tutaj opis narzędzia. Mauris consequat ipsum fermentum massa finibus condimentum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean maximus tellus consequat, ultrices mi vel, efficitur dui. Quisque at venenatis ante. Nullam luctus dictum odio semper tempus. Proin eu lorem non diam iaculis egestas ac non tortor. Nullam viverra luctus leo in mollis.</p>

                <p>Tutaj opis narzędzia. Mauris consequat ipsum fermentum massa finibus condimentum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean maximus tellus consequat, ultrices mi vel, efficitur dui. Quisque at venenatis ante. Nullam luctus dictum odio semper tempus. Proin eu lorem non diam iaculis egestas ac non tortor. Nullam viverra luctus leo in mollis.</p>

                <p>Tutaj opis narzędzia. Mauris consequat ipsum fermentum massa finibus condimentum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean maximus tellus consequat, ultrices mi vel, efficitur dui. Quisque at venenatis ante. Nullam luctus dictum odio semper tempus. Proin eu lorem non diam iaculis egestas ac non tortor. Nullam viverra luctus leo in mollis.</p>

                <p>Tutaj opis narzędzia. Mauris consequat ipsum fermentum massa finibus condimentum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean maximus tellus consequat, ultrices mi vel, efficitur dui. Quisque at venenatis ante. Nullam luctus dictum odio semper tempus. Proin eu lorem non diam iaculis egestas ac non tortor. Nullam viverra luctus leo in mollis.</p>
                            
                </div>

                <FooterTool />

            </section>

            
        </Aux>
    );
}

export default dashboard;