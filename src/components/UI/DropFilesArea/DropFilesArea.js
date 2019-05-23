import React, {Component} from 'react';
import FileDrop from 'react-file-drop';
import './DropFilesArea.css';

class DropFilesArea extends Component {

      
      render() {

       

        return (
        <div className="DropFilesArea">
          <div id="react-file-drop">
              <FileDrop onDrop={this.props.whenFilesDropped}>
                    <div className="uploadFromDiskArea">
                        <h2>Wgraj pliki z dysku</h2>
                        <p>Pliki zostaną zapisane jedynie tymczasowo na potrzeby przetwarzania. Po tym czasie są one usuwane bezpowrotnie usuwane z serwera</p>
                        <i className="fas fa-upload"></i>
                    </div>
              </FileDrop>
            </div>
         </div>
        );
      }
}

export default DropFilesArea;