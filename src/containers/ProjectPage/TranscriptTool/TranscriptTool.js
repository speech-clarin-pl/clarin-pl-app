import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import './TranscriptTool.css';
import SettingBar from '../SettingBar/SettingBar';
import FooterTool from '../FooterTool/FooterTool';


const transcriptTool = (props) => {

    return(
        <Aux>
             <SettingBar />

             <section className={"Content"} data-scrollbar>

                <div className={["container-fluid", "TranscriptTool"].join(' ')}>
                    <div className="tool-desc">
                        
                        <p>Tutaj opis narzędzia. Mauris consequat ipsum fermentum massa finibus condimentum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean maximus tellus consequat, ultrices mi vel, efficitur dui. Quisque at venenatis ante. Nullam luctus dictum odio semper tempus. Proin eu lorem non diam iaculis egestas ac non tortor. Nullam viverra luctus leo in mollis.</p>
                    </div>

                    <div className="tool-body">

                        <div id="debuginfo"></div>
                        <div id="waveform"></div>	

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

                        <hr/>

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

                        <div className="form-group">
                            
                            <textarea className="form-control" className="TranskriptInput" placeholder="Tutaj wpisz transkrypcje"></textarea> 
                        </div>

                        


                    </div>

                </div>

                <FooterTool />


            </section>


             
        </Aux>
    );
}

export default transcriptTool;