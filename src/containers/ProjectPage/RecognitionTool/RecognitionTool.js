import React, {Component} from 'react';
import Aux from '../../../hoc/Auxiliary';
import './RecognitionTool.css';
import SettingBar from '../SettingBar/SettingBar';
import FooterTool from '../FooterTool/FooterTool';
import RecognitionItem from './RecognitionItem/RecognitionItem';
import DropFilesArea from '../../../components/UI/DropFilesArea/DropFilesArea';
import LeftSiteBar from '../LeftSiteBar/LeftSiteBar';
import ButtonLeftBar from '../../../components/UI/ButtonLeftBar/ButtonLeftBar';
import DragAndDrop from '../../../components/UI/DragAndDrop/DragAndDrop';
import {connect} from 'react-redux';
import * as recognitionActions from '../../../store/actions/index';
import Modal from '../../../components/UI/Modal/Modal';

import uuid  from 'uuid';

class RecognitionTool extends Component {

    handleDrop = (files) => {
        //extending the files by additionnal info about the status and load percentage
        //console.log("RECI HANDLE DROP")
        //console.log(files)
        let extFiles = [];

        Array.from(files).forEach(file => {
            let newFile = Object.assign({},file);
            newFile.file = file;
            newFile.status = 'toload';
            newFile.loadedperc = 0;
            newFile.id = uuid.v4();
            extFiles.push(newFile);
        });

        this.props.onDrop(extFiles);
    }

    //kiedy uzytkownik recznie wybral pliki
    whenFilesChose = (e) => {
        const inputControl = e.currentTarget;
        let fileList = [];
        for(var i=0;i<inputControl.files.length;i++){
            fileList.push(inputControl.files[i]);
        }
        //console.log(fileList);
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

    render(){

        
        let filelist = (
            <h4 style={{marginTop: '10px'}}>Wgraj pliki do rozpoznawania</h4>
        )

       

        if(this.props.filesToUpload.length > 0 ){
        
            filelist = this.props.filesToUpload.map((file,i) =>
                <RecognitionItem key={"key"+i} 
                fileID={file.id}/>
             )
        }
        

       // console.log(this.state.filesToUpload)
        

        return(
            <Aux>

                <Modal
                    show={this.props.modalDisplay}
                    modalClosed={this.closeModalHandler}
                    title="Czy rozpoczac rozpoznawanie?">
         
                    <button type="button" 
                        className="btn btn-primary"
                        onClick={this.startBatchRecognition}>Tak</button>
                    <button type="button" 
                        className="btn btn-outline-secondary"
                        onClick={this.closeModalHandler}>NIE</button>
                    
                   
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
                desc="Tutaj opis do rozpoznawania" />

                 <SettingBar />
    
                <section className="Content" data-scrollbar>
    
                    <div className={["container-fluid", "RecognitionTool"].join(' ')}>
                    <div className="tool-desc">
                        <p>Tutaj opis narzędzia. Mauris consequat ipsum fermentum massa finibus condimentum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean maximus tellus consequat, ultrices mi vel, efficitur dui. Quisque at venenatis ante. Nullam luctus dictum odio semper tempus. Proin eu lorem non diam iaculis egestas ac non tortor. Nullam viverra luctus leo in mollis.</p>
                    </div>
    
                    <div className="tool-body">
    
                        <div className="row">
                            <div className="col-md">

                                <DragAndDrop whenDropped={this.handleDrop}>
                                       <DropFilesArea 
                                            whenFilesChose={this.whenFilesChose}
                                            mainTitle="Wgraj pliki z dysku"
                                            desc="Pliki zostaną zapisane jedynie tymczasowo na potrzeby przetwarzania. Po tym czasie są one usuwane bezpowrotnie usuwane z serwera"/>
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
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onDrop: (files) => dispatch(recognitionActions.dropFiles(files)),
        onOpenModalHandler: () => dispatch(recognitionActions.openModalProject()),
        onCloseModalHandler: () => dispatch(recognitionActions.closeModalProject()),
        onStartBatchRecognition: (audioFilesArray, audioFilesIds) => dispatch(recognitionActions.initBatchRecognition(audioFilesArray, audioFilesIds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecognitionTool);