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

import AudioEditor from '../../ProjectPage/AudioEditor/AudioEditor';

class RecognitionTool extends Component {

    state = {
        modal: false,
    }

    handleDrop = (files) => {
        //extending the files by additionnal info about the status and load percentage
       // console.log("HANDLE DROP")
       // console.log(files)

        let extFiles = [];
        let fileList = [];
        let refusedFileList = [];

        //checking if the file/s is from local env
        if (files instanceof FileList) {
            console.log("rozpoznalem FILELIST")
            for (var i = 0; i < files.length; i++) {
                let file = files[i];
                let fileExtention = getExt(file.name)[0];

                //rozpoznaje tylko pliki audio
                if (extensionMapping.hasOwnProperty(fileExtention) &&
                    (extensionMapping[fileExtention] == "Audio")) {
                    fileList.push(file);
                } else {
                    refusedFileList.push(file);
                }
            }

            //checking if files come from repo
        } else if (files instanceof Object && (files["fileId"] != undefined)) {
            console.log("rozpoznalem OBJECT")
            
            //then the file is comming from the repo...
            let f = files; //narazie mozna przeciagnac tylko jeden plik
           
            let fileExtention = getExt(f.fileURL)[0];

            //rozpoznaje tylko pliki audio
            if (extensionMapping.hasOwnProperty(fileExtention) &&
                (extensionMapping[fileExtention] == "Audio")) {
                fileList.push(f);
            } else {
                refusedFileList.push(f);
            }

            //checking if files come from browse btn
        } else if ( files.currentTarget != null && files.currentTarget instanceof Element){
            console.log("rozpoznalem Element")
            
            const inputControl = files.currentTarget;
            
            for (var i = 0; i < inputControl.files.length; i++) {
                let file = inputControl.files[i];
                let fileExtention = getExt(file.name)[0];
    
                 //rozpoznaje tylko pliki audio
                 if (extensionMapping.hasOwnProperty(fileExtention) &&
                        (extensionMapping[fileExtention] == "Audio")) {
                        fileList.push(inputControl.files[i]);
                    } else {
                        refusedFileList.push(inputControl.files[i]);
                    }
            }
        }


        if (refusedFileList.length > 0) {
            this.props.onSetRefusionFiles(refusedFileList);
            this.setState({
                modal: true,
            });
        }

        Array.from(fileList).forEach(file => {

            let newFile = Object.assign({}, file);
            //musze sprawdzic czy plik pochodzi z repo czy z local
            // bo jest inna struktura danych
            //z repo
            if(file["fileURL"] != undefined){
                newFile.file = {
                    "name": getFilenameFromURL(file.fileURL),
                    "size": file.fileSize,
                    "fileId": file.fileId,
                };
                newFile.from = "repo";
                newFile.loadedperc = 100;
                newFile.url = file.fileURL;
                newFile.status = "loaded";
            //z local
            } else {
                newFile.file = file;
                newFile.status = 'toload';
                newFile.loadedperc = 0;
                newFile.from = 'local';
            }

            newFile.id = uuid.v4();
            extFiles.push(newFile);
        });

        this.props.onDrop(extFiles);

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
        const audioFilesArray = this.props.filesToUpload.map(entry => {
            return entry.file;
        })

        const audioFilesIds = this.props.filesToUpload.map(entry => {
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

    render() {


        let recoIcon = <FontAwesomeIcon icon={faFileAlt} /> ;

        let filelist = (
            <h4 style={{ marginTop: '10px' }}>Wgraj pliki do rozpoznawania</h4>
        )

        if (this.props.filesToUpload.length > 0) {

            filelist = this.props.filesToUpload.map((file, i) => {

                return (
                    <ToolItem 
                        key={"key" + i} 
                        container={file}
                        type="RECO"
                        openPreview = {this.openContainerInPreview}
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
                    desc="W tym miejscu istnieje możliwość wykonywania automatycznego rozpoznawania mowy z nagrań dźwiękowych" >

                    <ButtonLeftBar 
                        napis="Uruchom rozpoznawanie"
                        iconType="file"
                        icon={recoIcon}
                        customeStyle={null}
                        disabled={false}
                        whenClicked={null}/>

                </LeftSiteBar>

                <SettingBar />

                <section className="Content" data-scrollbar>

                    <div className={["container-fluid", "RecognitionTool"].join(' ')}>
                        <div className="tool-desc">
                            <h2>Zamiana nagrania mowy na zapis ortograficzny</h2>
                        <div className="alert alert-info" role="alert">

                            <p>Narzędzie umożliwia wgranie wielu plików jednocześnie i uruchomienie usługi jednocześnie na wielu plikach. W trakcie wykonywania usługi nie należy odświeżać strony. Pliki powinny zostać najpierw wgrane do repozytorium</p>
                        
                        </div>
                            

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
                                <div className="col-md-6">
                                    <h3>Lista plików do przetworzenia</h3>
                                    <div className="file-list">
                                        {filelist}
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <AudioEditor
                                        containerForPreview={this.props.containerForPreview}
                                        toolType="REC" />
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
        filesToUpload: state.recR.filesToUpload,
        modalDisplay: state.projectR.modal,
        refusedFileList: state.recR.refusedFileList,
        containerForPreview: state.recR.recoContainerForPreview,
    }
}

const mapDispatchToProps = dispatch => {
    return {

        openContainerInRecoPreview: (container) => dispatch(recognitionActions.openContainerInRecoPreview(container)),
        onDrop: (files) => dispatch(recognitionActions.dropFiles(files)),
        onOpenModalHandler: () => dispatch(recognitionActions.openModalProject()),
        onCloseModalHandler: () => dispatch(recognitionActions.closeModalProject()),
        onStartBatchRecognition: (audioFilesArray, audioFilesIds) => dispatch(recognitionActions.initBatchRecognition(audioFilesArray, audioFilesIds)),
        onSetRefusionFiles: (refusedFiles) => dispatch(recognitionActions.setRefusedFiles(refusedFiles))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecognitionTool);