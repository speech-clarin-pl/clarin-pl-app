import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import './RecognitionTool.css';
import SettingBar from '../SettingBar/SettingBar';
import FooterTool from '../FooterTool/FooterTool';
import RecognitionItem from './RecognitionItem/RecognitionItem';

const recognitionTool = (props) => {

    return(
        <Aux>
             <SettingBar />

            <section className="Content" data-scrollbar>

                <div className={["container-fluid", "RecognitionTool"].join(' ')}>
                <div className="tool-desc">
                    <p>Tutaj opis narzędzia. Mauris consequat ipsum fermentum massa finibus condimentum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean maximus tellus consequat, ultrices mi vel, efficitur dui. Quisque at venenatis ante. Nullam luctus dictum odio semper tempus. Proin eu lorem non diam iaculis egestas ac non tortor. Nullam viverra luctus leo in mollis.</p>
                </div>

                <div className="tool-body">

                    <div className="row">
                        <div className="col-md">
                            <div className="uploadFromDiskArea" ondrop="" ondragover="">
                                <h2>Wgraj pliki z dysku</h2>
                                <p>Pliki zostaną zapisane jedynie tymczasowo na potrzeby przetwarzania. Po tym czasie są one usuwane bezpowrotnie usuwane z serwera</p>
                                <i className="fas fa-upload"></i>
                            </div>

                        </div>
                        <div className="col-md">
                                <div className="uploadFromRepo" ondrop="" ondragover="">
                                    <h2>Wgraj pliki z repozytorium</h2>
                                    <p>Przeciągnij pliki z repozytorium. Podczas przetwarzania nie bedziesz mógł wykonywać żadnych dodatkowych operacji na tych plikach</p>
                                    <i className="fas fa-cloud-upload-alt"></i>
                                </div>
                        </div>
                    </div>

                    <div className="file-list">

                        <RecognitionItem status="loaded"/>
                        <RecognitionItem status="ready"/>		
                        <RecognitionItem status="ready"/>
                        <RecognitionItem status="error"/>
                        <RecognitionItem status="progress"/>
                        <RecognitionItem status="progress"/>

					</div>


                </div>

                 
                </div>

                <FooterTool />

            </section>
        </Aux>
    );
}

export default recognitionTool;