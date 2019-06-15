import React, {Component} from 'react';
import Aux from '../../../../hoc/Auxiliary';
import './RecognitionItem.css';
import * as actionTypes from '../../../../store/actions/actionsTypes';
import {connect} from 'react-redux';

 

class RecognitionItem extends Component {

    constructor(props){
        super(props);

        //wszytskie do tej pory wgrane pliki z reducera
        let allFiles =  this.props.allFiles;
        //znajduje plik przekazany jako parametr we wszystkich plikach przekazanych z reducera
        const foundfile = allFiles.find(obj => obj.id == this.props.fileID);
    
        this.state = {
            file: foundfile,
        }

        console.log(foundfile)
    }
    
    

    componentDidMount(){
       // console.log("COMPOJNENT DID MOUNT")
       this.reader = new FileReader(); 
        
       //upload file only if the status is not loaded
       if(this.state.file.status !== 'loaded') {
        this.fileUpload(this.state.file);
       }
    }

    componentWillUnmount(){
       this.reader.abort();
    }

    fileUpload = (file) => {
        
    
        this.reader.onload = (evt) => {

           console.log("ONLOAD");

            //this.props.updateFileState(this.state.file.id, 'loaded', 0);

        };

        this.reader.onprogress = (evt) => {
            console.log("ONPROGRESS");
            if (evt.lengthComputable) {
                var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
                // Increase the progress bar length.
               // console.log("loading...." + percentLoaded + "%");
                if (percentLoaded < 100) {
                 // console.log(percentLoaded + "%");

                    let updatedFile = {
                        ...this.state.file,
                        status: 'toload',
                        loadedperc: percentLoaded
                    };
                    this.setState({
                        file: updatedFile
                    })

                    this.props.updateFileState(this.state.file.id, 'toload', percentLoaded);
                    //this.props.updateFileState(this.state.file.id, 'toload', percentLoaded);

                  
                }
            }
        }

        this.reader.onerror = (evt) => {
            switch(evt.target.error.code) {
                case evt.target.error.NOT_FOUND_ERR:
                  alert('File Not Found!');
                  break;
                case evt.target.error.NOT_READABLE_ERR:
                  alert('File is not readable');
                  break;
                case evt.target.error.ABORT_ERR:
                  break; // noop
                default:
                  alert('An error occurred reading this file.');
              };

              let updatedFile = {
                ...this.state.file,
                status: 'error',
                loadedperc: 0
            };
            this.setState({
                file: updatedFile
            })

            this.props.updateFileState(this.state.file.id, 'error', 0);
              //this.props.updateFileState(this.state.file.id, 'error', 0);
            
        }

        this.reader.onloadend = (evt) => {
            console.log("ONLOADEND");
            let updatedFile = {
                ...this.state.file,
                status: 'loaded',
                loadedperc: 100
            };
            this.setState({
                file: updatedFile
            })
            
            this.props.updateFileState(this.state.file.id, 'loaded', 100);

        }

        this.reader.onloadstart = (evt) => {
            console.log("ONLOADSTART");

            let updatedFile = {
                ...this.state.file,
                status: 'toload',
                loadedperc: 0
            };
            this.setState({
                file: updatedFile
            })

            //console.log("onloadstart");

              this.props.updateFileState(this.state.file.id, 'toload', 0);
        }

        this.reader.readAsBinaryString(file.file);

      }
    

    render(){

        let statusinfo = null;

        let ikonki = null;

        // formatowanie wielkosci pliku
        let nBytes = this.state.file.file.size;
        let filesize = nBytes + " bytes";

        for (let aMultiples = ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"], nMultiple = 0, nApprox = nBytes / 1024; nApprox > 1; nApprox /= 1024, nMultiple++) {
            filesize = nApprox.toFixed(1) + " " + aMultiples[nMultiple];
        }

    

        switch(this.state.file.status){
            case ('toload'):
                    statusinfo = (<span className="loading">
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">loading... </span>
                    </div>
    
                         Ładowanie pliku {this.state.file.loadedperc + '%'}
                    </span>);

                    ikonki = (
                        <Aux>
                        <a href="#" className="remove"><i className="fas fa-times"></i></a>
                        </Aux>
                    )


                break;	
            case ('ready'):
                    statusinfo = <span className="ready"><i className="fas fa-check"></i> Gotowe</span>;
                    ikonki = (
                        <Aux>
                        <a href="#" className="preview"><i className="fas fa-eye"></i></a>
                        <a href="#" className="download"><i className="fas fa-download"></i></a>
                        <a href="#" className="downloadRepo"><i className="fas fa-cloud-download-alt"></i></a>
                        <a href="#" className="remove"><i className="fas fa-times"></i></a>
                        </Aux>
                    )
                break;
            case ('loaded'):
                    statusinfo = <span className="uploaded"><i className="fas fa-check"></i> Załadowany</span>;
                    ikonki = (
                        <>
                        <a href="#" className="preview"><i className="fas fa-eye"></i></a>
                        
                        <a href="#" className="remove"><i className="fas fa-times"></i></a>
                        </>
                    )
                break;
            case ('error'):
                    statusinfo = <span className="error"><i className="fas fa-exclamation-triangle"></i> Błąd</span>;
                    ikonki = (
                        <Aux>
                        
                        <a href="#" className="remove"><i className="fas fa-times"></i></a>

                        </Aux>
                    )
                break;  
            case ('progress'):
                    statusinfo = (<span className="inprogress">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
    
                                 Rozpoznawanie
                            </span>);	
                    ikonki = (
                        <Aux>
                        <a href="#" className="preview"><i className="fas fa-eye"></i></a>
                        
                        <a href="#" className="remove"><i className="fas fa-times"></i></a>
                        </Aux>
                    )		
                break; 
            default:
                    statusinfo = null;
                    ikonki = null;
        }

       // console.log("status: " + this.state.file.status)
        
        return(
            <Aux>
                  <div className={["row", "fileItem", "RecognitionItem"].join(' ')}>
                        <div className="col-sm file-info">
                            <i className="fas fa-desktop"></i>
                            <span className={"fileName"}>{this.state.file.file.name}</span>
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
    }
}

const mapDispatchToProps = dispatch => {
    return {
       updateFileState: (fileID, status,percLoaded) => dispatch({type:actionTypes.UPDATE_FILE_STATE, fileID: fileID, status: status, percLoaded:percLoaded}),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(RecognitionItem);