import React from 'react';
import Aux from '../../../../hoc/Auxiliary';
import './RecognitionItem.css';

const recognitionItem = (props) => {

    let status = null;

    switch(props.status){
        case ('ready'):
            status = <span className="ready"><i className="fas fa-check"></i> Gotowe</span>;
            break;
        case ('loaded'):
            status = <span className="uploaded"><i className="fas fa-check"></i> Załadowany</span>;
            break;
        case ('error'):
            status = <span className="error"><i className="fas fa-exclamation-triangle"></i> Błąd</span>;
            break;  
        case ('progress'):
            status = (<span className="inprogress">
							<div className="spinner-border text-primary" role="status">
								<span class="sr-only">Loading...</span>
							</div>

                             Rozpoznawanie
                        </span>);			
            break; 
        default:
            status = null;
    }
    
    return(
        <Aux>
              <div className={["row", "fileItem", "RecognitionItem"].join(' ')}>
                    <div className="col-sm file-info">
                        <i className="fas fa-desktop"></i>
                        <span className={"fileName"}>Lorem ipsum dolor.mp3</span>
                        <span className={"fileSize"}>23MB</span>
                    </div>


                    <div className="col-sm-auto file-status">
                        {status}
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

export default recognitionItem;