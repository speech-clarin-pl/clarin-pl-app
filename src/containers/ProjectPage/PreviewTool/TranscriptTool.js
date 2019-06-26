import React, {Component} from 'react';
import Aux from '../../../hoc/Auxiliary';
import './TranscriptTool.css';
import SettingBar from '../SettingBar/SettingBar';
import FooterTool from '../FooterTool/FooterTool';
import LeftSiteBar from '../LeftSiteBar/LeftSiteBar';
import {withRouter } from 'react-router-dom'


class TranscriptTool extends Component {

   state = {
       txtContent: '',
       txtDisplayed: false,
       fileName: '',
   }

    getExt = (path) => {
        return (path.match(/(?:.+..+[^\/]+$)/ig) != null) ? path.split('.').slice(-1)[0]: 'null';
    }

   

    render() {

       

        console.log(this.props.location.state)
        if(this.props.location.state){
            const urlToFile = this.props.location.state.url;
            const fileExt = this.getExt(urlToFile);
            console.log(urlToFile)
            console.log(fileExt)

            if(this.state.txtDisplayed === false){
                fetch(urlToFile)
                .then((r) => r.text())
                .then(text  => {
    
                    //console.log(text);
                    this.setState({
                        txtContent: text,
                        txtDisplayed: true,
                    })
                })
            }
              
        }


       
        
      
        

        return(
            <Aux>
    
                <LeftSiteBar 
                    czyTopPart="true"
                    desc="Tutaj opis do podglądu plików" />
    
                 <SettingBar />
    
                 <section className="Content" data-scrollbar>
    
                    <div className={["container-fluid", "TranscriptTool"].join(' ')}>
                        <div className="tool-desc">
                            
                            <h4>Podgląd plikow txt</h4>
                        </div>
    
                        <div className="tool-body">
    
            
    
                            <div id="debuginfo"></div>
                            <div id="waveform"></div>	
    
    {
        /*
                            <div class="btn-group" role="group" aria-label="Basic example">
                                <button type="button" className="btn btn-secondary" id="play"><i className="fas fa-play"></i></button>
                                <button type="button" className="btn btn-secondary" id="stop"><i className="fas fa-stop"></i></button>
                                <button type="button" className="btn btn-secondary" id="back"><i className="fas fa-step-backward"></i>
                                <i className="fas fa-stopwatch"></i></button>
    
                                
                                <button type="button" className="btn btn-secondary" id="zoom">
                                    <i className="">+</i>
                                        <input type="range" data-action="zoom" min="1" max="200" value="0" className="form-control-range" id="controlZoom" />
                                    <span id="">-</span>
                                </button>
    
                                <button type="button" className="btn btn-secondary" id="loudness">
                                    <i className="fas fa-volume-up"></i>
                                        <input type="range" className="form-control-range" id="controlLoudness" />
                                    <span id="loudness-value">100%</span>
                                </button>
                                <button type="button" className="btn btn-secondary" id="speed">
                                    <i className="fas fa-running"></i>
                                        <input type="range" data-action="speed" min="25" max="400" value="100" className="form-control-range" id="controlSpeed" />
                                    <span id="speed-value">100%</span>
                                </button>
                            
                            </div>
    
                            */
    }
    
                            <hr/>
    
    {
        /*
                            <div className="btn-group" role="group" aria-label="Basic example">
                                <button type="button" className="btn btn-secondary" id="hmm">hmm...</button>
                                <button type="button" className="btn btn-secondary" id="szum-przerywany">szum przerywany</button>
                                <button type="button" className="btn btn-secondary" id="szum-ciagly">szum ciągły</button>
                                <button type="button" className="btn btn-secondary" id="back-mowcy">szum mówcy</button>
                                <button type="button" className="btn btn-secondary" id="back-mowcy">nierozpoznane słowo</button>
                                <button type="button" className="btn btn-secondary" id="back-mowcy">przerwa</button>
                                <button type="button" className="btn btn-secondary" id="font-up">
                                    <i className="fas fa-font" ></i> <i className="fas fa-font"></i>
                                </button>
                                <button type="button" className="btn btn-secondary" id="font-down">
                                    <i className="fas fa-font" ></i> <i className="fas fa-font" ></i>
                                </button>
                            </div>
    
                    */
    }
    
                            
                            <div className="form-group">
                            
                            <textarea 
                                className="form-control" 
                                className="TranskriptInput" 
                                placeholder="Zaznacz plik txt w repozytorium" 
                                value= {this.state.txtContent}
                                >
                            </textarea>
                                
                            </div>
    
                            
    
    
                        </div>
    
                    </div>
    
                    <FooterTool />
    
    
                </section>
    
    
                 
            </Aux>
        );
    }

}

export default withRouter(TranscriptTool);