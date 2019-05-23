import React, {Component} from 'react';
import Aux from '../../../../hoc/Auxiliary';
import './RecognitionItem.css';

class RecognitionItem extends Component {

    state = {
        file: this.props.file,
        status: 'loading'
    }

    render(){

        let statusinfo = null;

        // formatowanie wielkosci pliku
        let nBytes = this.state.file.size;
        let filesize = nBytes + " bytes";

        for (let aMultiples = ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"], nMultiple = 0, nApprox = nBytes / 1024; nApprox > 1; nApprox /= 1024, nMultiple++) {
            filesize = nApprox.toFixed(1) + " " + aMultiples[nMultiple];
          }

        switch(this.state.status){
            case ('loading'):
                    statusinfo = (<span className="loading">
                    <div className="spinner-border text-primary" role="status">
                        <span class="sr-only">Ładowanie pliku do pamięci...</span>
                    </div>
    
                     Ładowanie pliku
                </span>);
                break;	
            case ('ready'):
                    statusinfo = <span className="ready"><i className="fas fa-check"></i> Gotowe</span>;
                break;
            case ('loaded'):
                    statusinfo = <span className="uploaded"><i className="fas fa-check"></i> Załadowany</span>;
                break;
            case ('error'):
                    statusinfo = <span className="error"><i className="fas fa-exclamation-triangle"></i> Błąd</span>;
                break;  
            case ('progress'):
                    statusinfo = (<span className="inprogress">
                                <div className="spinner-border text-primary" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
    
                                 Rozpoznawanie
                            </span>);			
                break; 
            default:
                    statusinfo = null;
        }
        
        return(
            <Aux>
                  <div className={["row", "fileItem", "RecognitionItem"].join(' ')}>
                        <div className="col-sm file-info">
                            <i className="fas fa-desktop"></i>
                            <span className={"fileName"}>{this.state.file.name}</span>
                            <span className={"fileSize"}>({filesize})</span>
                        </div>
    
    
                        <div className="col-sm-auto file-status">
                            {statusinfo}
                        </div>
                        <div className={["col-sm", "fileIcons"].join(' ')}>
                            <a href="#" className="preview"><i className="fas fa-eye"></i></a>
                            <a href="#" className="download"><i className="fas fa-download"></i></a>
                            <a href="#" className="downloadRepo"><i className="fas fa-cloud-download-alt"></i></a>
                            <a href="#" className="remove"><i className="fas fa-times"></i></a>
                        </div>
    
    
                    </div>
            </Aux>
        );
    }

   
}

export default RecognitionItem;