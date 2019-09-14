import React, {Component} from 'react';
import './DropFilesArea.css';

class DropFilesArea extends Component {

      
      render() {

        return (
        <div className="DropFilesArea">
          <div id="react-file-drop">
                    <div className="uploadFromDiskArea">
                        <h2>{this.props.mainTitle}</h2>
                        <p>{this.props.desc}</p>
                
                      {
                        this.props.allowUploadLocalFiles?
                          <div> 
                            <input 
                              id="file-input" 
                              type="file"
                              multiple = {this.props.multipleFiles}
                              onChange={this.props.whenFilesChose}
                              />
                            <i className="fas fa-upload"></i>
                          </div>
                          :null
                        }
                    </div>
            </div>
         </div>
        );
      }
}

export default DropFilesArea;