import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary';
import './RecognitionTool.css';
import SettingBar from '../SettingBar/SettingBar';
import FooterTool from '../FooterTool/FooterTool';
import RecognitionItem from './RecognitionItem/RecognitionItem';
import DropFilesArea from '../../../components/UI/DropFilesArea/DropFilesArea';
import LeftSiteBar from '../LeftSiteBar/LeftSiteBar';
import ButtonLeftBar from '../../../components/UI/ButtonLeftBar/ButtonLeftBar';
import DragAndDrop from '../../../components/UI/DragAndDrop/DragAndDrop';
import { connect } from 'react-redux';
import * as recognitionActions from '../../../store/actions/index';
import Modal from '../../../components/UI/Modal/Modal';
import { getExt, getFilenameFromURL } from '../../../utils/utils';
import uuid from 'uuid';
import { extensionMapping } from '../../../utils/fileTypes';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ToolItem from '../ToolItem/ToolItem';

import AudioEditor from '../AudioEditor/AudioEditor';

class RecognitionTool extends Component {

    state = {
        modal: false,
        editorFullWidth: false,
    }

    // handleDrop = (files) => {
    //     //extending the files by additionnal info about the status and load percentage
    //    // console.log("HANDLE DROP")
    //    // console.log(files)

    //     let extFiles = [];
    //     let fileList = [];
    //     let refusedFileList = [];

    //     //checking if the file/s is from local env
    //     if (files instanceof FileList) {
    //         console.log("rozpoznalem FILELIST")
    //         for (var i = 0; i < files.length; i++) {
    //             let file = files[i];
    //             let fileExtention = getExt(file.name)[0];

    //             //rozpoznaje tylko pliki audio
    //             if (extensionMapping.hasOwnProperty(fileExtention) &&
    //                 (extensionMapping[fileExtention] == "Audio")) {
    //                 fileList.push(file);
    //             } else {
    //                 refusedFileList.push(file);
    //             }
    //         }

    //         //checking if files come from repo
    //     } else if (files instanceof Object && (files["fileId"] != undefined)) {
    //         console.log("rozpoznalem OBJECT")
            
    //         //then the file is comming from the repo...
    //         let f = files; //narazie mozna przeciagnac tylko jeden plik
           
    //         let fileExtention = getExt(f.fileURL)[0];

    //         //rozpoznaje tylko pliki audio
    //         if (extensionMapping.hasOwnProperty(fileExtention) &&
    //             (extensionMapping[fileExtention] == "Audio")) {
    //             fileList.push(f);
    //         } else {
    //             refusedFileList.push(f);
    //         }

    //         //checking if files come from browse btn
    //     } else if ( files.currentTarget != null && files.currentTarget instanceof Element){
    //         console.log("rozpoznalem Element")
            
    //         const inputControl = files.currentTarget;
            
    //         for (var i = 0; i < inputControl.files.length; i++) {
    //             let file = inputControl.files[i];
    //             let fileExtention = getExt(file.name)[0];
    
    //              //rozpoznaje tylko pliki audio
    //              if (extensionMapping.hasOwnProperty(fileExtention) &&
    //                     (extensionMapping[fileExtention] == "Audio")) {
    //                     fileList.push(inputControl.files[i]);
    //                 } else {
    //                     refusedFileList.push(inputControl.files[i]);
    //                 }
    //         }
    //     }


    //     if (refusedFileList.length > 0) {
    //         this.props.onSetRefusionFiles(refusedFileList);
    //         this.setState({
    //             modal: true,
    //         });
    //     }

    //     Array.from(fileList).forEach(file => {
    //         let newFile = Object.assign({}, file);
    //         //musze sprawdzic czy plik pochodzi z repo czy z local
    //         // bo jest inna struktura danych
    //         //z repo
    //         if(file["fileURL"] != undefined){
    //             newFile.file = {
    //                 "name": getFilenameFromURL(file.fileURL),
    //                 "size": file.fileSize,
    //                 "fileId": file.fileId,
    //             };
    //             newFile.from = "repo";
    //             newFile.loadedperc = 100;
    //             newFile.url = file.fileURL;
    //             newFile.status = "loaded";
    //         //z local
    //         } else {
    //             newFile.file = file;
    //             newFile.status = 'toload';
    //             newFile.loadedperc = 0;
    //             newFile.from = 'local';
    //         }

    //         newFile.id = uuid.v4();
    //         extFiles.push(newFile);
    //     });

    //     this.props.onDrop(extFiles);

    // }


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

        //console.log(audioFilesArray)

        this.props.onStartBatchRecognition(audioFilesArray, audioFilesIds);
        this.closeModalHandler();
    }

    //opens given container in preview window
    openContainerInPreview = (container) => {
        //console.log(e)
        this.props.openContainerInRecoPreview(container);
    }

    makeEditorFullWidth = () => {
        if(this.state.editorFullWidth == false){
            this.setState({editorFullWidth: true});
        } else {
            this.setState({editorFullWidth: false});
        }
    }

    runRECinBatch = () => {

		for(let i = 0; i < this.props.containersForREC.length; i++){
			let container = this.props.containersForREC[i];
			this.runSpeechRecognition(container, "REC", this.props.token); 
		}
	}

    runSpeechRecognition = (container, toolType, token) => {
        this.props.setContainerStatus(container._id, toolType, 'progress');
		this.props.runSpeechRecognition(container, toolType, token); 
    }
    

    loadNextElement = () => {
        //przegladam liste dodanych do rozpoznawania i ładuje kolejny o ile nie jest to ostatni
        let foundIdx = 0;
        for(let i=0;i<this.props.containersForREC.length;i++){
            
            let current = this.props.containersForREC[i];
           // console.log(current)
            //sprawdzam ktory obecnie jest edytowany
            if(current._id == this.props.containerForPreview._id){
                foundIdx = i;
            }
        }

       // console.log(foundIdx)

        if(foundIdx < this.props.containersForREC.length-1){
            this.openContainerInPreview(this.props.containersForREC[foundIdx+1]);
        } 

    }

    render() {

        let szer1col = "6 order-1";
        let szer2col = "6 order-2";

        if(this.state.editorFullWidth == true) {
            szer1col = "12 order-2";
            szer2col = "12 order-1";
        } else {
            szer1col = "6 order-1";
            szer2col = "6 order-2";
        }


        let recoIcon = <FontAwesomeIcon icon={faFileAlt} /> ;

        let filelist = null;

        if (this.props.containersForREC.length > 0) {

                filelist = this.props.containersForREC.map((file, i) => {

                    return (
                        <ToolItem 
                            key={"key" + i} 
                            container={file}
                            type="REC"
                            status={file.statusREC}
                            openPreview = {this.openContainerInPreview}
                            runTool={(container, toolType, token) => this.runSpeechRecognition(container, toolType, token)}
                        />
                    //<RecognitionItem key={"key" + i}
                    //    file={file} />
                    //
                    )
                }  
            )
        }


        return (
            <Aux>

                {/*

                                <Modal
                                    show={this.state.modal}
                                    modalClosed={this.closeModalHandler}
                                >

                                    <div className="alert alert-warning" role="alert">
                                        <p>Niektóre z plików nie są plikami audio dlatego nie zostaną dodane do kolejki.</p>

                                    </div>


                                    <button type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={this.closeModalHandler}>OK</button>
                                </Modal>
                */}
                

                {
                    /*
                                <LeftSiteBar czyTopPart="true" desc="Tutaj opis do rozpoznawania" >
                
                                    <ButtonLeftBar 
                                        napis="Rozpocznij rozpoznawanie" 
                                        iconType="fa-comments" 
                                        whenClicked={this.openModalHandler} />
                                    <ButtonLeftBar napis="Zapisz wynik na Twoim dysku" disabled={true} iconType="fa-download" whenClicked={null}/>
                                    <ButtonLeftBar napis="Zapisz wynik w repozytorium" disabled={true} iconType="fa-cloud-download-alt" whenClicked={null}/>
                
                                </LeftSiteBar>
                    */
                }


                <LeftSiteBar
                    czyTopPart="true"
                    desc={(<div>
                        <div>Przydatne skróty klawiaturowe podczas tworzenia transkrypcji to: </div>
                        <div> <b>[Alt+l]</b> - play/pausa </div>
                        <div> <b>[Alt+k]</b> - powtórz 3 sek.</div>
                        <div> <b>[Alt+j]</b> - powtórz 5 sek.</div>
                        <div> <b>[Alt+i]</b> - przyśpiesz.</div>
                        <div> <b>[Alt+,]</b> - zwolnij.</div>
                        <div> <b>[Alt+m]</b> - zapisz transkrypcje.</div>
                        <div> <b>[Alt+n]</b> - załaduj kolejny plik.</div>
                        <div>Możesz transkrybować nie odrywając rąk od pola tekstowego!</div>
                        </div>)
                    } >

                    <ButtonLeftBar 
                        napis="Uruchom rozpoznawanie dla wszystkich"
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
                            <h2>Transkrypcje</h2>
                            <p>Zamiana nagrania mowy na zapis ortograficzny.</p>
                            {
                               // <div className="alert alert-info" role="alert">

                                //<p>Narzędzie umożliwia dodanie z repozytorium wielu plików do kolejki i uruchomienie usługi jednocześnie (przycisk po prawej stronie). 
                                //W trakcie wykonywania usługi nie należy odświeżać strony. </p>

                                //</div>
                            } 
                            

                        </div>

                        <div className="tool-body">
                        {
                        /*   
                          <div className="row">
                                <div className="col-md">
                                        <DragAndDrop whenDropped={this.handleDrop}>
                                            <DropFilesArea
                                                whenFilesChose={this.handleDrop}
                                                mainTitle="Przeciągnij pliki z Repozytorium"
                                                multipleFiles = {true}
                                                allowUploadLocalFiles = {false}
                                                desc="Zawsze możesz zarządzać swoimi plikami" />
                                        </DragAndDrop>
                                </div>
                               
                                <div className="col-md">
                                    <div className="uploadFromRepo">
                                        <h2>Wgraj pliki z repozytorium</h2>
                                        <p>Przeciągnij pliki z repozytorium. Podczas przetwarzania nie bedziesz mógł wykonywać żadnych dodatkowych operacji na tych plikach</p>
                                        <i className="fas fa-cloud-upload-alt"></i>
                                    </div>
                                </div>
                            </div> 
                            */
                            }

                            <div className="row">
                                <div className={"col-md-"+szer1col}>
                                    {
                                        //<h3>Lista plików do przetworzenia</h3>
                                    }
                                   
                                    <div className="file-list">
                                        {filelist}
                                    </div>
                                </div>

                                <div className={"col-md-"+szer2col}>

                                    {
										this.props.containerForPreview != "" ? <AudioEditor
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

        runSpeechRecognition: (container, toolType, token) => dispatch(recognitionActions.runSpeechRecognition(container, toolType, token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecognitionTool);