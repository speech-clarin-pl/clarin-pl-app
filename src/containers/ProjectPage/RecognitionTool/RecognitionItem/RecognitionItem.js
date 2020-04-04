import React, {Component} from 'react';
import Aux from '../../../../hoc/Auxiliary';
import './RecognitionItem.css';
import * as actionTypes from '../../../../store/actions/actionsTypes';
import * as recognitionActions from '../../../../store/actions/index';
import {connect} from 'react-redux';
import {withRouter } from 'react-router-dom'
 

class RecognitionItem extends Component {

    constructor(props){
        super(props);
    }
    
    

    componentWillMount = () => {
       // console.log("COMPOJNENT DID MOUNT")
    //    this.reader = new FileReader(); 

    //     //wszytskie do tej pory wgrane pliki z reducera
    //     let allFiles =  this.props.allFiles;
    //     //znajduje plik przekazany jako parametr we wszystkich plikach przekazanych z reducera
    //     const foundEntry = allFiles.find(obj => obj.id == this.props.fileID);
    // // [{
    //     // file: File {name: "__mowa16000.wav", lastModified: 1560968256333, lastModifiedDate: Wed Jun 19 2019 20:17:36 GMT+0200 (Central European Summer Time), webkitRelativePath: "", size: 1235820, …}
    //     // id: "01f0a209-a29f-407a-9b8a-12cdebd1e1fd"
    //     // loadedperc: 0
    //     // status: "toload"
    // // }]

    //    //upload file only if the status is not loaded
    //    console.log(foundEntry.status)
    //    if(foundEntry.status !== 'loaded' && 
    //       foundEntry.status !== 'done' &&
    //       foundEntry.status !== 'error' &&
    //       foundEntry.status !== 'progress' &&
    //       foundEntry.status !== 'ready') {
    //         console.log("Wlaczam upload pliku")
    //         this.fileUpload(foundEntry.file, foundEntry.id);
    //    }

    }

    componentWillUnmount = () => {
       //this.reader.abort();
    }

    // fileUpload = (file, fileEntryId) => {
        
    //     this.reader.onloadstart = (evt) => {
    //         console.log("ONLOADSTART");

    //         // let updatedFile = {
    //         //     ...this.state.file,
    //         //     status: 'toload',
    //         //     loadedperc: 0
    //         // };
    //         // this.setState({
    //         //     file: updatedFile
    //         // })

    //         //console.log("onloadstart");

    //           this.props.updateFileState(fileEntryId, 'toload', 0);
    //     }
    

    //     this.reader.onprogress = (evt) => {
    //         console.log("ONPROGRESS");
    //         if (evt.lengthComputable) {
    //             var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
    //             // Increase the progress bar length.
    //            // console.log("loading...." + percentLoaded + "%");
    //             if (percentLoaded < 100) {
    //              // console.log(percentLoaded + "%");

    //                 // let updatedFile = {
    //                 //     ...this.state.file,
    //                 //     status: 'toload',
    //                 //     loadedperc: percentLoaded
    //                 // };
    //                 // this.setState({
    //                 //     file: updatedFile
    //                 // })

    //                 this.props.updateFileState(fileEntryId, 'toload', percentLoaded);

    //                 //this.props.updateFileState(this.state.file.id, 'toload', percentLoaded);
    //                 //this.props.updateFileState(this.state.file.id, 'toload', percentLoaded);

                  
    //             }
    //         }
    //     }

    //     // this.reader.onload = (evt) => {
    //     //     console.log("ONLOAD");
    //     //      //this.props.updateFileState(this.state.file.id, 'loaded', 0);
    //     //  };

    //     this.reader.onloadend = (evt) => {
    //         console.log("ONLOADEND");
    //         // let updatedFile = {
    //         //     ...this.state.file,
    //         //     status: 'loaded',
    //         //     loadedperc: 100
    //         // };
    //         // this.setState({
    //         //     file: updatedFile
    //         // })

    //         this.props.updateFileState(fileEntryId, 'loaded', 100);
    //         //this.props.updateFileState(this.state.file.id, 'loaded', 100);
    //     }

    //     this.reader.onerror = (evt) => {
    //         switch(evt.target.error.code) {
    //             case evt.target.error.NOT_FOUND_ERR:
    //               alert('File Not Found!');
    //               break;
    //             case evt.target.error.NOT_READABLE_ERR:
    //               alert('File is not readable');
    //               break;
    //             case evt.target.error.ABORT_ERR:
    //               break; // noop
    //             default:
    //               alert('An error occurred reading this file.');
    //           };

    //         //   let updatedFile = {
    //         //     ...this.state.file,
    //         //     status: 'error',
    //         //     loadedperc: 0
    //         // };
    //         // this.setState({
    //         //     file: updatedFile
    //         // })

    //         this.props.updateFileState(fileEntryId, 'error', 0);
    //         //this.props.updateFileState(this.state.file.id, 'error', 0);
    //           //this.props.updateFileState(this.state.file.id, 'error', 0);
    //     }

    //     console.log("reader zaczyna czytanie pliku: ")
    //     console.log(file)
    //     this.reader.readAsBinaryString(file);

    //   }


      startFileRecognition = (fileId) => {
      
        // let allFiles =  this.props.allFiles;
        // //znajduje plik przekazany jako parametr we wszystkich plikach przekazanych z reducera
        // const foundEntry = allFiles.find(obj => obj.id == this.props.fileID);

        // console.log(foundEntry)

        // //czy audio pochodzi z "repo" czy z "local"
        // const audioFrom = foundEntry.from;

        // this.props.updateFileState(fileId, 'progress', 100);

        // //musze okreslic przed wyslaniem czy jest to BLOB czy JSON
        // let fileToSend = null;
        // if(audioFrom=="repo"){
        //     fileToSend = JSON.stringify(foundEntry.file);
        // } else {
        //     fileToSend = foundEntry.file;
        // }

        // this.props.onFileRecognition(fileToSend, foundEntry.id, this.props.userId, this.props.projectId, audioFrom );
      }

      previewItem = (fileID) => {
       
        // let toURL = this.props.match.url;
        // toURL = toURL.replace('recognition','preview')
        // console.log(toURL)
        // this.props.history.push({
        //     pathname: toURL,
            
        //     });

		// this.props.onOpenRecognitionAudioPreview(fileID);
      }
    

    render(){

        // naprawianie wyświetlania wielkości pliku
        let nBytes = this.props.file.size;
        let filesize = nBytes + " bytes";
        for (let aMultiples = ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"], nMultiple = 0, nApprox = nBytes / 1024; nApprox > 1; nApprox /= 1024, nMultiple++) {
            filesize = nApprox.toFixed(1) + " " + aMultiples[nMultiple];
        }

        // wyswietlanie statusu pliku
         let statusinfo = <span className="uploaded"><i className="fas fa-check"></i> Załadowany</span>;
         let ikonki = <i className="fas fa-comments"></i>;
         
   

        // let ikonki = null;

        // let allFiles =  this.props.allFiles;
        
        // const foundEntry = allFiles.find(obj => obj.id == this.props.fileID);

        // // formatowanie wielkosci pliku
        

        

        // const removeIcon = (
        //     <Aux>
        //         <a className="actionIcon remove" onClick={() => this.props.onRemoveItem(this.props.fileID)}>
        //             <i className="fas fa-times " ></i>
        //         </a>
        //     </Aux>
        // );

        // const previewIcon = null;
        // const previewIcon = (
        //     <Aux>
        //         <a className="actionIcon preview" onClick={() => this.previewItem(this.props.fileID)}>
        //             <i className="fas fa-eye"></i>
        //         </a>
        //     </Aux>
        // );


        // switch(foundEntry.status){
        //     case ('toload'):
        //             statusinfo = (<span className="loading">
        //             <div className="spinner-border text-primary" role="status">
        //                 <span className="sr-only">loading... </span>
        //             </div>
    
        //                  Ładowanie pliku {foundEntry.loadedperc + '%'}
        //             </span>);

        //             ikonki = (
        //                 <Aux>
        //                     {removeIcon}
        //                 </Aux>
        //             )


        //         break;	
        //     case ('ready'):
        //             statusinfo = <span className="ready"><i className="fas fa-check"></i> Gotowe</span>;
        //             ikonki = (
        //                 <Aux>
        //                 {previewIcon}
        //                     <a href="#" className="actionIcon download"><i className="fas fa-download"></i></a>
        //                     <a href="#" className="actionIcon downloadRepo"><i className="fas fa-cloud-download-alt"></i></a>
        //                 {removeIcon}
        //                 </Aux>
        //             )
        //         break;
        //     case ('loaded'):
        //             statusinfo = <span className="uploaded"><i className="fas fa-check"></i> Załadowany</span>;
        //             ikonki = (
        //                 <>
        //                 <a onClick={(fileId)=>this.startFileRecognition(this.props.fileID)} className="actionIcon recognitionIcon"><i className="fas fa-comments"></i></a>
        //                 {previewIcon}
        //                 {removeIcon}
        //                 </>
        //             )
        //         break;
        //     case ('error'):
        //             statusinfo = <span className="error"><i className="fas fa-exclamation-triangle"></i> Błąd</span>;
        //             ikonki = (
        //                 <Aux>
        //                     {removeIcon}
        //                 </Aux>
        //             )
        //         break;  
        //     case ('progress'):
        //             statusinfo = (<span className="inprogress">
        //                         <div className="spinner-border text-primary" role="status">
        //                             <span className="sr-only">Loading...</span>
        //                         </div>
    
        //                          Rozpoznawanie...
        //                     </span>);	
        //             ikonki = (
        //                 <Aux>
                            
                            
        //                     {removeIcon}
        //                 </Aux>
        //             )		
        //         break;
        //     case ('done'):
        //             statusinfo = <span className="done"><i className="fas fa-check"></i> Rozpoznawanie zakonczone</span>;	
        //             this.props.onGetProjectFilesForUser(this.props.userId, this.props.projectId, this.props.token)
        //             ikonki = (
        //                 <Aux>
                            
        //                     {previewIcon}
        //                     {removeIcon}
        //                 </Aux>
        //             )		
        //         break;  
        //     default:
        //             statusinfo = null;
        //             ikonki = null;
        // }

       // console.log("status: " + this.state.file.status)

       /*

       {foundEntry.from === 'local'?
                            <i className="fas fa-desktop"></i>:
                            <i className="fas fa-cloud"></i>}

                            */
        
        return(
            <Aux>
                  <div className={["row", "fileItem", "RecognitionItem"].join(' ')}>
                        <div className="col-sm file-info">

                            
                            
                            <span className={"fileName"}>{this.props.file.containerName}</span>
                            <span className={"fileSize"}>({filesize})</span>
                        </div>
    
    
                        <div className="col-sm-auto file-status">
                            {statusinfo}
                        </div>
                        <div className={["col-sm", "fileIcons"].join(' ')}>
                            {ikonki}
                        </div>
    
    
                    </div>
            </Aux>
        );
    }


}

const mapStateToProps = state => {
    return {
        allFiles: state.recR.filesToUpload,
        userId: state.projectR.currentProjectOwner,
        projectId: state.projectR.currentProjectID,
        token: state.homeR.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
       updateFileState: (fileID, status,percLoaded) => dispatch(recognitionActions.updateFileState(fileID, status,percLoaded)),
       onGetProjectFilesForUser: (userId, projectId, token) => dispatch(recognitionActions.getProjectFilesForUser(userId,projectId, token)),
       onFileRecognition: (file, entryId,userId, projectId, audioFrom) => dispatch(recognitionActions.initFileRecognition(file, entryId, userId, projectId, audioFrom)),
       onRemoveItem:(fileId) => dispatch(recognitionActions.removeRecognitionItem(fileId)),
       onOpenRecognitionAudioPreview:(entryId) => dispatch(recognitionActions.openRecognitionAudioPreview(entryId))
       // onRepoUpdate: (userId, projectId, token) => dispatch(recognitionActions.getProjectFilesForUser(userId,projectId, token))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RecognitionItem));