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

class RecognitionTool extends Component {

    handleDrop = (files) => {
        //extending the files by additionnal info about the status and load percentage
        console.log("HANDLE DROP")
        console.log(files)
        let extFiles = [];

        let fileList = [];
        let refusedFileList = [];

        console.log(typeof files)

        //checking if the file/s is from repo or from local env
        if (typeof files == "object") {
            for (var i = 0; i < files.length; i++) {
                let file = files[i];
                let fileExtention = getExt(file.name)[0];
                //rozpoznaje tylko pliki audio

                //console.log(extensionMapping)

                if (extensionMapping.hasOwnProperty(fileExtention)) {
                    fileList.push(file);
                } else {
                    refusedFileList.push(file);
                }
            }

            if (refusedFileList.length > 0) {
                this.props.onSetRefusionFiles(refusedFileList);
                this.props.onOpenModalHandler();
            }

            Array.from(fileList).forEach(file => {
                let newFile = Object.assign({}, file);
                newFile.file = file;
                newFile.status = 'toload';
                newFile.loadedperc = 0;
                newFile.id = uuid.v4();
                newFile.from = 'local';
                extFiles.push(newFile);
            });

            this.props.onDrop(extFiles);
        } else if (typeof files == "string") {
            //then the file is comming from the repo...
            let f = files; //narazie mozna przeciagnac tylko jeden plik
            let fileExtention = getExt(f)[0];
            //console.log(fileExtention)
            //rozpoznaje tylko pliki audio
            if (extensionMapping.hasOwnProperty(fileExtention)) {
                fileList.push(f);
            } else {
                refusedFileList.push(f);
            }

            if (refusedFileList.length > 0) {
                this.props.onSetRefusionFiles(refusedFileList);
                this.props.onOpenModalHandler();
            }


            let newFile = {
                "file": {
                    "name": getFilenameFromURL(f)
                },
                "status": "loaded",
                "loadedperc": 100,
                "id": uuid.v4(),
                "url": f,
                "from": "repo",
            }


            console.log(newFile)

            extFiles.push(newFile);

            this.props.onDrop(extFiles);

        }
    }

    //kiedy uzytkownik recznie wybral pliki
    whenFilesChose = (e) => {
        const inputControl = e.currentTarget;
        let fileList = [];
        let refusedFileList = [];
        for (var i = 0; i < inputControl.files.length; i++) {
            let file = inputControl.files[i];
            let fileExtention = getExt(file.name)[0];
            //rozpoznaje tylko pliki audio
            if (fileExtention === "wav" ||
                fileExtention === "WAV" ||
                fileExtention === "mp3" ||
                fileExtention === "au") {
                fileList.push(inputControl.files[i]);
            } else {
                refusedFileList.push(inputControl.files[i]);
            }
        }

        if (refusedFileList.length > 0) {
            this.props.onSetRefusionFiles(refusedFileList);
            this.props.onOpenModalHandler();
        }


        this.handleDrop(fileList);
    }


    //otwiera okno modalne
    openModalHandler = () => {
        this.props.onOpenModalHandler();
    }

    //zamyka okno modalne
    closeModalHandler = () => {
        this.props.onCloseModalHandler();
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

    render() {

        let refusedFileNames = null;
        if (this.props.refusedFileList.length > 0) {
            refusedFileNames = this.props.refusedFileList.map(file => {
                return <div>{file.name}</div>;
            })
        }


        let filelist = (
            <h4 style={{ marginTop: '10px' }}>Wgraj pliki do rozpoznawania</h4>
        )



        if (this.props.filesToUpload.length > 0) {

            filelist = this.props.filesToUpload.map((file, i) =>
                <RecognitionItem key={"key" + i}
                    fileID={file.id} />
            )
        }


        // console.log(this.state.filesToUpload)


        return (
            <Aux>

                <Modal
                    show={this.props.modalDisplay}
                    modalClosed={this.closeModalHandler}
                >

                    <div className="alert alert-warning" role="alert">
                        <p>Ponizsze pliki nie sa plikami audio.
                                <br></br>Nie zostana one dodane do kolejki rozpoznawania
                            </p>
                        {refusedFileNames}
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
                    desc="W tym miejscu istnieje możliwość wykonywania automatycznego rozpoznawania mowy z nagrań dźwiękowych" />
                <SettingBar />

                <section className="Content" data-scrollbar>

                    <div className={["container-fluid", "RecognitionTool"].join(' ')}>
                        <div className="tool-desc">
                            <p>Zamiana nagrania mowy na zapis ortograficzny. Pliki audio przekazywane do tej usługi muszą być w odpowiednim formacie (WAV, 16kHz, mono, 16-bit). Jeśli plik nie jest w odpowiednim formacie, można skorzystać z usługi normalizacji audio do odpowiedniego przekonwertowania pliku znajdujące się na  <a href="http://mowa.clarin-pl.eu/tools/ui/audio/normalize" target="blank">TEJ stronie</a>.
                        </p>
                            <p>Narzędzie umożliwia wgranie wielu plików jednocześnie i uruchomienie usługi na wszystkich jednocześnie. W trakcie wykonywania usługi nie należy odświeżać strony.</p>

                        </div>

                        <div className="tool-body">
                            <div className="row">
                                <div className="col-md">

                                    <DragAndDrop whenDropped={this.handleDrop}>
                                        <DropFilesArea
                                            whenFilesChose={this.whenFilesChose}
                                            mainTitle="Wgraj pliki z dysku"
                                            desc="Pliki zostaną zapisane jedynie tymczasowo na potrzeby przetwarzania. Po tym czasie są one usuwane bezpowrotnie usuwane z serwera" />
                                    </DragAndDrop>

                                </div>
                                {
                                    /*
                                    <div className="col-md">
                                    <div className="uploadFromRepo">
                                        <h2>Wgraj pliki z repozytorium</h2>
                                        <p>Przeciągnij pliki z repozytorium. Podczas przetwarzania nie bedziesz mógł wykonywać żadnych dodatkowych operacji na tych plikach</p>
                                        <i className="fas fa-cloud-upload-alt"></i>
                                    </div>
                                    </div>
                                    */
                                }

                            </div>

                            <div className="file-list">
                                {filelist}
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
        refusedFileList: state.recR.refusedFileList
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onDrop: (files) => dispatch(recognitionActions.dropFiles(files)),
        onOpenModalHandler: () => dispatch(recognitionActions.openModalProject()),
        onCloseModalHandler: () => dispatch(recognitionActions.closeModalProject()),
        onStartBatchRecognition: (audioFilesArray, audioFilesIds) => dispatch(recognitionActions.initBatchRecognition(audioFilesArray, audioFilesIds)),
        onSetRefusionFiles: (refusedFiles) => dispatch(recognitionActions.setRefusedFiles(refusedFiles))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecognitionTool);