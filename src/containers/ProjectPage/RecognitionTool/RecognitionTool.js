import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary';
import './RecognitionTool.css';
import SettingBar from '../SettingBar/SettingBar';
import FooterTool from '../FooterTool/FooterTool';
import LeftSiteBar from '../LeftSiteBar/LeftSiteBar';
import ButtonLeftBar from '../../../components/UI/ButtonLeftBar/ButtonLeftBar';
import { connect } from 'react-redux';
import * as recognitionActions from '../../../store/actions/index';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ToolItem from '../ToolItem/ToolItem';
import {injectIntl, FormattedMessage} from 'react-intl';
import ReactHtmlParser from "react-html-parser";
import AudioEditor from '../AudioEditor/AudioEditor';


class RecognitionTool extends Component {

    state = {
        modal: false,
        editorFullWidth: false,
    }


    //otwiera okno modalne
    openModalHandler = () => {
        this.props.onOpenModalHandler();
    }

    //zamyka okno modalne
    closeModalHandler = () => {
        //this.props.onCloseModalHandler();
        this.setState({
            modal: false,
        })
    }

    //rozpoczynam rozpoznawanie 
    startBatchRecognition = () => {

        //wydobywam sama tablica plikow z entry 
        //bo entry to moja struktura danych
        const audioFilesArray = this.props.containersForREC.map(entry => {
            return entry.file;
        })

        const audioFilesIds = this.props.containersForREC.map(entry => {
            return entry.id;
        })


        this.props.onStartBatchRecognition(audioFilesArray, audioFilesIds);
        this.closeModalHandler();
    }

    //opens given container in preview window
    openContainerInPreview = (container) => {
        //console.log(e)
        this.props.openContainerInRecoPreview(container);
    }

    makeEditorFullWidth = () => {
        if(this.state.editorFullWidth === false){
            this.setState({editorFullWidth: true});
        } else {
            this.setState({editorFullWidth: false});
        }
    }

    runRECinBatch = () => {

		for(let i = 0; i < this.props.containersForREC.length; i++){
            let container = this.props.containersForREC[i];
            if(container.ifREC === false){
                this.runSpeechRecognition(container, "REC", this.props.token); 
            }
		}
	}

    runSpeechRecognition = (container, toolType, token) => {
        this.props.setContainerStatus(container._id, toolType, 'progress');
		this.props.runSpeechRecognition(container, token); 
    }
    

    loadNextElement = () => {
        //przegladam liste dodanych do rozpoznawania i ładuje kolejny o ile nie jest to ostatni
        let foundIdx = 0;
        for(let i=0;i<this.props.containersForREC.length;i++){
            
            let current = this.props.containersForREC[i];
           // console.log(current)
            //sprawdzam ktory obecnie jest edytowany
            if(current._id === this.props.containerForPreview._id){
                foundIdx = i;
            }
        }

        if(foundIdx < this.props.containersForREC.length-1){
            this.openContainerInPreview(this.props.containersForREC[foundIdx+1]);
        } 

    }

    removeToolItem = (container) => {
        this.props.onRemoveElementFromRECList(container);
    }

    render() {

        let szer1col = "6 order-1";
        let szer2col = "6 order-2";

        if(this.state.editorFullWidth === true) {
            szer1col = "12 order-2";
            szer2col = "12 order-1";
        } else {
            szer1col = "6 order-1";
            szer2col = "6 order-2";
        }


        let recoIcon = <FontAwesomeIcon icon={faFileAlt} /> ;

        let filelist = null;

       // if (this.props.containersForREC.length > 0) {

                filelist = this.props.containersForREC.map((file, i) => {

                    return (
                        <ToolItem 
                            key={"key" + i} 
                            container={file}
                            type="REC"
                            status={file.statusREC}
                            openPreview = {this.openContainerInPreview}
                            runTool={(container, toolType, token) => this.runSpeechRecognition(container, toolType, token)}
                            onRemoveItem={this.removeToolItem}
                            errorMessage={file.errorMessage}
                        />
                    )
                }  
            )
      //  }


        return (
            <Aux>

                <LeftSiteBar
                    czyTopPart="true"
                    desc={
						
						ReactHtmlParser(
							this.props.intl.formatMessage(
								{
									id:"RecoTool-toolDesc",
									description: 'Reco opis skrótów', 
									defaultMessage: '<div><div>Przydatne skróty klawiaturowe podczas tworzenia transkrypcji to: </div><div> <b>[Alt+l]</b> - play/pausa </div><div> <b>[Alt+k]</b> - powtórz 3 sek.</div><div> <b>[Alt+j]</b> - powtórz 5 sek.</div><div> <b>[Alt+i]</b> - przyśpiesz.</div> <div> <b>[Alt+o]</b> - zwolnij.</div><div> <b>[Alt+m]</b> - zapisz transkrypcje.</div><div> <b>[Alt+n]</b> - załaduj kolejny plik.</div><div>Możesz transkrybować nie odrywając rąk od pola tekstowego!</div></div>',
								},
							)
						)
                    }
                     >

                    
                    <ButtonLeftBar 
                        napis={
                            this.props.intl.formatMessage(
								{
									id:"RecoTool-runForAll",
									description: 'Reco uruchom dla wszystkich przycisk', 
									defaultMessage: 'Uruchom rozpoznawanie dla wszystkich',
								},
							)
                        }
                        iconType="file"
                        icon={recoIcon}
                        customeStyle={null}
                        disabled={false}
                        whenClicked={this.runRECinBatch}/>
               

                </LeftSiteBar>

                <SettingBar />

                <section className="Content" data-scrollbar>

                    <div className={["container-fluid", "RecognitionTool"].join(' ')}>
                        <div className="tool-desc">
                            <h2>
                                <FormattedMessage
									id="RecoTool-header"
									description="Nagłówek narzedzia" 
									defaultMessage="Transkrypcje" 
								/>
                            </h2>
                            <p>
                                <FormattedMessage
									id="RecoTool-opisNarzedzia"
									description="opis narzedzia" 
									defaultMessage="Zamiana nagrania mowy na zapis ortograficzny." 
								/>
                            </p>
                            

                        </div>

                        <div className="tool-body">
                     

                            <div className="row">
                                <div className={"col-md-"+szer1col} data-tut="toolList">
                                    {
                                        //<h3>Lista plików do przetworzenia</h3>
                                    }
                                   
                                    <div className="file-list" >
                                
                                        {
                                            filelist.length === 0?
                                            <div className="alert alert-primary" role="alert">
                                                <FormattedMessage
                                                    id="RecoTool-dodajPlikiZRepo"
                                                    description="komunikat o dodaniu plikow z repo" 
                                                    defaultMessage="Dodaj pliki z repozytorium do listy transkrypcji." 
                                                />
                                                
                                            </div>
                                            :filelist
                                        }

                                    </div>
                                </div>

                                <div className={"col-md-"+szer2col} data-tut="audioEdytor">

                                    {
										this.props.containerForPreview !== "" ? <AudioEditor
										containerForPreview={this.props.containerForPreview}
                                        editorFullWidth = {this.makeEditorFullWidth}
                                        onLoadNextElement = {this.loadNextElement}
										toolType="REC" /> : null
									}


                                
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


const mapStateToProps = state => {
    return {
        containersForREC: state.recR.containersForREC,
        modalDisplay: state.projectR.modal,
        refusedFileList: state.recR.refusedFileList,
        containerForPreview: state.recR.recoContainerForPreview,

        token: state.homeR.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {

        openContainerInRecoPreview: (container) => dispatch(recognitionActions.openContainerInRecoPreview(container)),
        onDrop: (files) => dispatch(recognitionActions.dropFiles(files)),
        onOpenModalHandler: () => dispatch(recognitionActions.openModalProject()),
        onCloseModalHandler: () => dispatch(recognitionActions.closeModalProject()),
        onStartBatchRecognition: (audioFilesArray, audioFilesIds) => dispatch(recognitionActions.initBatchRecognition(audioFilesArray, audioFilesIds)),
        onSetRefusionFiles: (refusedFiles) => dispatch(recognitionActions.setRefusedFiles(refusedFiles)),
        setContainerStatus:  (containerId, toolType, status) => dispatch(recognitionActions.setContainerStatus(containerId, toolType, status)),
        runSpeechRecognition: (container, token) => dispatch(recognitionActions.runSpeechRecognition(container, token)),
        onRemoveElementFromRECList: (container) => dispatch(recognitionActions.removeRecognitionItem(container)),
    
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(RecognitionTool));